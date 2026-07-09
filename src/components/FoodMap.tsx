import { useEffect, useRef, useState } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import { PathLayer, ScatterplotLayer } from "@deck.gl/layers";
import { pins } from "../data/pins";
import type { FoodPin, Ingredient } from "../data/pins";
import { arcPoints } from "../utils/arc";

setOptions({ key: "AIzaSyBuSrK3nhDKPLFe0bcGWOFPJMQ-giGyl_U", v: "beta" });

const countryFlags: Record<string, string> = {
  Germany: "🇩🇪",
  Italy: "🇮🇹",
  Netherlands: "🇳🇱",
  Spain: "🇪🇸",
};

type RGBA = [number, number, number, number];

interface PathDatum {
  path: [number, number][];
  color: RGBA;
  width: number;
  ingredientId: string;
}

interface DotDatum {
  position: [number, number];
  color: RGBA;
}

function buildLayers(
  selectedPin: FoodPin | null,
  selectedIngredient: Ingredient | null,
  onIngredientClick: (ing: Ingredient) => void
) {
  if (!selectedPin) return [];

  const sorted = [...selectedPin.ingredients].sort((a, b) =>
    selectedIngredient?.id === a.id ? 1 : selectedIngredient?.id === b.id ? -1 : 0
  );

  const paths: PathDatum[] = [];
  const dots: DotDatum[] = [];

  for (const ing of sorted) {
    const isActive = selectedIngredient?.id === ing.id;
    const color: RGBA = isActive ? [37, 99, 235, 230] : [156, 163, 175, 140];

    if (ing.routes && ing.routes.length > 0) {
      for (const route of ing.routes) {
        for (let i = 0; i < route.length - 1; i++) {
          const from = route[i];
          const to = route[i + 1];
          const pts = arcPoints([from.lat, from.lng], [to.lat, to.lng]);
          paths.push({
            path: pts.map(([lat, lng]) => [lng, lat]),
            color,
            width: isActive ? 3 : 2,
            ingredientId: ing.id,
          });
        }
        for (const stop of route) {
          dots.push({ position: [stop.lng, stop.lat], color });
        }
      }
    } else {
      const pts = arcPoints([ing.originLat, ing.originLng], [selectedPin.lat, selectedPin.lng]);
      paths.push({
        path: pts.map(([lat, lng]) => [lng, lat]),
        color,
        width: isActive ? 3 : 2,
        ingredientId: ing.id,
      });
      dots.push({ position: [ing.originLng, ing.originLat], color });
      dots.push({ position: [selectedPin.lng, selectedPin.lat], color });
    }
  }

  return [
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
    }),
    new ScatterplotLayer<DotDatum>({
      id: "dots",
      data: dots,
      getPosition: (d) => d.position,
      getRadius: 5,
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
  onPinClick: (pin: FoodPin) => void;
  onIngredientClick: (ingredient: Ingredient) => void;
}

export default function FoodMap({
  selectedPin,
  selectedIngredient,
  onPinClick,
  onIngredientClick,
}: FoodMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const overlayRef = useRef<GoogleMapsOverlay | null>(null);
  const pinMarkersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const [mapReady, setMapReady] = useState(false);

  // Initialize map once
  useEffect(() => {
    if (!containerRef.current) return;

    Promise.all([
      importLibrary("maps"),
      importLibrary("marker"),
    ]).then(([{ Map }]) => {
      if (!containerRef.current) return;

      const map = new Map(containerRef.current, {
        center: { lat: 50, lng: 10 },
        zoom: 5,
        mapId: "DEMO_MAP_ID",
        gestureHandling: "greedy",
      });

      mapRef.current = map;

      const overlay = new GoogleMapsOverlay({ layers: [] });
      overlay.setMap(map);
      overlayRef.current = overlay;

      setMapReady(true);
    });

    return () => {
      pinMarkersRef.current.forEach((m) => (m.map = null));
      pinMarkersRef.current = [];
    };
  }, []);

  // Update food pin markers
  useEffect(() => {
    if (!mapReady || !mapRef.current) return;

    pinMarkersRef.current.forEach((m) => (m.map = null));
    pinMarkersRef.current = [];

    const visiblePins = pins.filter((pin) => !selectedPin || pin.id === selectedPin.id);

    for (const pin of visiblePins) {
      const flag = countryFlags[pin.country] ?? "📍";
      const el = document.createElement("div");
      el.style.cssText =
        "width:26px;height:26px;border-radius:50%;background:#efefef;display:flex;align-items:center;" +
        "justify-content:center;font-size:20px;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.22);" +
        "line-height:1;cursor:pointer";
      el.textContent = flag;

      el.addEventListener("click", () => onPinClick(pin));

      const marker = new google.maps.marker.AdvancedMarkerElement({
        map: mapRef.current,
        position: { lat: pin.lat, lng: pin.lng },
        content: el,
      });

      pinMarkersRef.current.push(marker);
    }
  }, [mapReady, selectedPin, onPinClick]);

  // Update route layers
  useEffect(() => {
    if (!mapReady || !overlayRef.current) return;
    overlayRef.current.setProps({
      layers: buildLayers(selectedPin, selectedIngredient, onIngredientClick),
    });
  }, [mapReady, selectedPin, selectedIngredient, onIngredientClick]);

  // Camera transitions
  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    const map = mapRef.current;

    if (!selectedPin) {
      map.panTo({ lat: 50, lng: 10 });
      map.setZoom(5);
      return;
    }

    const bounds = new google.maps.LatLngBounds();

    if (selectedIngredient) {
      const stops = selectedIngredient.routes
        ? selectedIngredient.routes.flat()
        : [
            { lat: selectedIngredient.originLat, lng: selectedIngredient.originLng },
            { lat: selectedPin.lat, lng: selectedPin.lng },
          ];
      stops.forEach((s) => bounds.extend({ lat: s.lat, lng: s.lng }));
    } else {
      bounds.extend({ lat: selectedPin.lat, lng: selectedPin.lng });
      selectedPin.ingredients.forEach((ing) =>
        bounds.extend({ lat: ing.originLat, lng: ing.originLng })
      );
    }

    map.fitBounds(bounds, 80);
  }, [mapReady, selectedPin, selectedIngredient]);

  return <div ref={containerRef} className="h-full w-full" />;
}
