import { useState, useEffect, useMemo, useRef } from "react";
import DeckGL from "@deck.gl/react";
import { _GlobeView as GlobeView, LinearInterpolator } from "@deck.gl/core";
import type { Viewport, GlobeViewState } from "@deck.gl/core";
import { TileLayer } from "@deck.gl/geo-layers";
import { BitmapLayer, PathLayer, ScatterplotLayer } from "@deck.gl/layers";
import { arcPoints } from "../utils/arc";
import { pins } from "../data/pins";
import type { FoodPin, Ingredient } from "../data/pins";

const countryFlags: Record<string, string> = {
  Germany: "🇩🇪",
  Italy: "🇮🇹",
  Netherlands: "🇳🇱",
  Spain: "🇪🇸",
};

type RGBA = [number, number, number, number];

const INITIAL_VIEW_STATE: GlobeViewState = {
  longitude: 10,
  latitude: 45,
  zoom: 1.5,
};

function arc3D(from: [number, number], to: [number, number]): [number, number, number][] {
  const pts = arcPoints(from, to, 80);
  const toRad = (d: number) => (d * Math.PI) / 180;
  const φ1 = toRad(from[0]), λ1 = toRad(from[1]);
  const φ2 = toRad(to[0]), λ2 = toRad(to[1]);
  const dist = 2 * Math.asin(
    Math.sqrt(
      Math.sin((φ2 - φ1) / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin((λ2 - λ1) / 2) ** 2
    )
  );
  const maxAlt = Math.min(dist * 6_371_000 * 0.5, 2_500_000);
  return pts.map(([lat, lng], i) => {
    const t = pts.length <= 1 ? 0 : i / (pts.length - 1);
    return [lng, lat, Math.sin(t * Math.PI) * maxAlt];
  });
}

function boundsViewState(points: { lat: number; lng: number }[]): GlobeViewState | null {
  if (points.length === 0) return null;
  const lats = points.map((p) => p.lat);
  const lngs = points.map((p) => p.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const span = Math.max(maxLat - minLat, maxLng - minLng, 5);
  return {
    longitude: (minLng + maxLng) / 2,
    latitude: (minLat + maxLat) / 2,
    zoom: Math.max(0.5, Math.min(4, Math.log2(160 / span))),
    transitionDuration: 800,
    transitionInterpolator: new LinearInterpolator(),
  };
}

function isVisible(viewLng: number, viewLat: number, pointLng: number, pointLat: number): boolean {
  const r = Math.PI / 180;
  const vx = Math.cos(viewLat * r) * Math.cos(viewLng * r);
  const vy = Math.cos(viewLat * r) * Math.sin(viewLng * r);
  const vz = Math.sin(viewLat * r);
  const px = Math.cos(pointLat * r) * Math.cos(pointLng * r);
  const py = Math.cos(pointLat * r) * Math.sin(pointLng * r);
  const pz = Math.sin(pointLat * r);
  return vx * px + vy * py + vz * pz > 0;
}

interface PathDatum {
  path: [number, number, number][];
  color: RGBA;
  width: number;
  ingredientId: string;
}

interface DotDatum {
  position: [number, number, number];
  color: RGBA;
}

function buildLayers(
  selectedPin: FoodPin | null,
  selectedIngredient: Ingredient | null,
  hoveredIngredient: Ingredient | null,
  onIngredientClick: (ing: Ingredient) => void,
  onIngredientHover: (ing: Ingredient | null) => void
) {
  const tileLayer = new TileLayer({
    id: "base-tiles",
    data: [
      "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
      "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
      "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
    ],
    maxZoom: 19,
    minZoom: 0,
    tileSize: 256,
    renderSubLayers: (props) => {
      const bbox = props.tile.bbox as { west: number; south: number; east: number; north: number };
      return new BitmapLayer(props, {
        data: undefined,
        image: props.data as string,
        bounds: [bbox.west, bbox.south, bbox.east, bbox.north],
      });
    },
  });

  if (!selectedPin) return [tileLayer];

  const sorted = [...selectedPin.ingredients].sort((a, b) => {
    const aScore = (selectedIngredient?.id === a.id ? 2 : 0) + (hoveredIngredient?.id === a.id ? 1 : 0);
    const bScore = (selectedIngredient?.id === b.id ? 2 : 0) + (hoveredIngredient?.id === b.id ? 1 : 0);
    return aScore - bScore;
  });

  const paths: PathDatum[] = [];
  const dots: DotDatum[] = [];

  for (const ing of sorted) {
    const isActive = selectedIngredient?.id === ing.id;
    const isHovered = hoveredIngredient?.id === ing.id;
    const color: RGBA = (isActive || isHovered) ? [37, 99, 235, 230] : [156, 163, 175, 140];

    if (ing.routes && ing.routes.length > 0) {
      for (const route of ing.routes) {
        for (let i = 0; i < route.length - 1; i++) {
          paths.push({
            path: arc3D([route[i].lat, route[i].lng], [route[i + 1].lat, route[i + 1].lng]),
            color,
            width: isActive ? 3 : 2,
            ingredientId: ing.id,
          });
        }
        for (const stop of route) {
          dots.push({ position: [stop.lng, stop.lat, 0], color });
        }
      }
    } else {
      paths.push({
        path: arc3D([ing.originLat, ing.originLng], [selectedPin.lat, selectedPin.lng]),
        color,
        width: isActive ? 3 : 2,
        ingredientId: ing.id,
      });
      dots.push({ position: [ing.originLng, ing.originLat, 0], color });
      dots.push({ position: [selectedPin.lng, selectedPin.lat, 0], color });
    }
  }

  return [
    tileLayer,
    new PathLayer<PathDatum>({
      id: "routes",
      data: paths,
      getPath: (d) => d.path,
      getColor: (d) => d.color,
      getWidth: (d) => d.width,
      widthUnits: "pixels",
      widthMinPixels: 1,
      pickable: true,
      onClick: ({ object }) => {
        if (!object) return;
        const ing = selectedPin.ingredients.find((i) => i.id === object.ingredientId);
        if (ing) onIngredientClick(ing);
      },
      onHover: ({ object }) => {
        if (!object) { onIngredientHover(null); return; }
        const ing = selectedPin.ingredients.find((i) => i.id === object.ingredientId);
        onIngredientHover(ing ?? null);
      },
    }),
    new ScatterplotLayer<DotDatum>({
      id: "route-dots",
      data: dots,
      getPosition: (d) => d.position,
      getRadius: 4,
      radiusUnits: "pixels",
      getFillColor: (d) => d.color,
      getLineColor: [255, 255, 255, 255],
      lineWidthMinPixels: 1.5,
      stroked: true,
      filled: true,
    }),
  ];
}

interface FoodMapProps {
  selectedPin: FoodPin | null;
  selectedIngredient: Ingredient | null;
  hoveredIngredient: Ingredient | null;
  onPinClick: (pin: FoodPin) => void;
  onIngredientClick: (ingredient: Ingredient) => void;
  onIngredientHover: (ingredient: Ingredient | null) => void;
}

export default function FoodMap3D({ selectedPin, selectedIngredient, hoveredIngredient, onPinClick, onIngredientClick, onIngredientHover }: FoodMapProps) {
  const [viewState, setViewState] = useState<GlobeViewState>(INITIAL_VIEW_STATE);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setDims({ width, height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!selectedPin) {
      setViewState({ ...INITIAL_VIEW_STATE, transitionDuration: 1000, transitionInterpolator: new LinearInterpolator() });
      return;
    }
    const points: { lat: number; lng: number }[] = [];
    if (selectedIngredient) {
      if (selectedIngredient.routes) {
        selectedIngredient.routes.flat().forEach((s) => points.push({ lat: s.lat, lng: s.lng }));
      } else {
        points.push({ lat: selectedIngredient.originLat, lng: selectedIngredient.originLng });
        points.push({ lat: selectedPin.lat, lng: selectedPin.lng });
      }
    } else {
      points.push({ lat: selectedPin.lat, lng: selectedPin.lng });
      selectedPin.ingredients.forEach((ing) => points.push({ lat: ing.originLat, lng: ing.originLng }));
    }
    const vs = boundsViewState(points);
    if (vs) setViewState(vs);
  }, [selectedPin, selectedIngredient]);

  const globeView = useMemo(() => new GlobeView({ resolution: 5 }), []);

  const viewport = useMemo((): Viewport | null => {
    if (!dims.width) return null;
    return globeView.makeViewport({
      width: dims.width,
      height: dims.height,
      viewState,
    }) as Viewport;
  }, [globeView, dims, viewState]);

  const visiblePins = selectedPin ? pins.filter((p) => p.id === selectedPin.id) : pins;

  const projectedPins = useMemo(() => {
    if (!viewport) return [];
    const viewLng = viewState.longitude;
    const viewLat = viewState.latitude ?? 0;
    return visiblePins.flatMap((pin) => {
      if (!isVisible(viewLng, viewLat, pin.lng, pin.lat)) return [];
      const [x, y] = viewport.project([pin.lng, pin.lat]) as [number, number];
      return [{ pin, x, y }];
    });
  }, [viewport, visiblePins, viewState]);

  const layers = buildLayers(selectedPin, selectedIngredient, hoveredIngredient, onIngredientClick, onIngredientHover);

  return (
    <div ref={containerRef} className="h-full w-full relative" style={{ background: "#aad3df" }}>
      <DeckGL
        views={globeView}
        viewState={viewState}
        onViewStateChange={({ viewState: vs }) => setViewState(vs as GlobeViewState)}
        controller
        layers={layers}
      />
      {projectedPins.map(({ pin, x, y }) => (
        <div
          key={pin.id}
          onClick={() => onPinClick(pin)}
          style={{
            position: "absolute",
            left: x,
            top: y,
            transform: "translate(-50%, -50%)",
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "rgba(239,239,239,0.92)",
            border: "2px solid white",
            boxShadow: "0 1px 4px rgba(0,0,0,0.22)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            cursor: "pointer",
            userSelect: "none",
            zIndex: 1,
          }}
        >
          {countryFlags[pin.country] ?? "📍"}
        </div>
      ))}
    </div>
  );
}
