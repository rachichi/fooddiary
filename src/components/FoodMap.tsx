import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import { pins } from "../data/pins";
import type { FoodPin, Ingredient } from "../data/pins";
import { arcPoints } from "../utils/arc";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface FoodMapProps {
  selectedPin: FoodPin | null;
  selectedIngredient: Ingredient | null;
  onPinClick: (pin: FoodPin) => void;
}

function MapController({
  selectedPin,
  selectedIngredient,
}: {
  selectedPin: FoodPin | null;
  selectedIngredient: Ingredient | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!selectedPin) {
      // Home: Europe view
      map.flyTo([50, 10], 5, { duration: 1 });
      return;
    }

    if (selectedIngredient) {
      // Zoom to fit the active ingredient's route
      const bounds = L.latLngBounds(
        [selectedIngredient.originLat, selectedIngredient.originLng],
        [selectedPin.lat, selectedPin.lng]
      );
      map.flyToBounds(bounds.pad(0.3), { duration: 1.2 });
      return;
    }

    // Food selected, no ingredient: zoom out to world view to show all routes
    const allPoints: L.LatLng[] = [L.latLng(selectedPin.lat, selectedPin.lng)];
    for (const ing of selectedPin.ingredients) {
      allPoints.push(L.latLng(ing.originLat, ing.originLng));
    }
    const bounds = L.latLngBounds(allPoints);
    map.flyToBounds(bounds.pad(0.3), { duration: 1.2 });
  }, [selectedPin, selectedIngredient, map]);

  return null;
}

export default function FoodMap({ selectedPin, selectedIngredient, onPinClick }: FoodMapProps) {
  return (
    <MapContainer
      center={[50, 10]}
      zoom={5}
      className="h-full w-full"
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController selectedPin={selectedPin} selectedIngredient={selectedIngredient} />

      {/* Food location pins */}
      {pins.map((pin) => (
        <Marker
          key={pin.id}
          position={[pin.lat, pin.lng]}
          eventHandlers={{ click: () => onPinClick(pin) }}
        />
      ))}

      {/* Ingredient route lines — shown when a food item is selected */}
      {selectedPin?.ingredients.map((ing) => {
        const isActive = selectedIngredient?.id === ing.id;
        const points = arcPoints(
          [ing.originLat, ing.originLng],
          [selectedPin.lat, selectedPin.lng]
        );
        return (
          <Polyline
            key={ing.id}
            positions={points}
            pathOptions={{
              color: isActive ? "#2563eb" : "#9ca3af",
              weight: isActive ? 3 : 2,
              opacity: isActive ? 0.9 : 0.5,
              dashArray: isActive ? undefined : "6 4",
            }}
          />
        );
      })}
    </MapContainer>
  );
}
