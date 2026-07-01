import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { pins, FoodPin } from "../data/pins";

// Fix default marker icons broken by Vite's asset handling
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
  onPinClick: (pin: FoodPin) => void;
  selectedPin: FoodPin | null;
}

function RecenterOnSelect({ pin }: { pin: FoodPin | null }) {
  const map = useMap();
  if (pin) {
    map.setView([pin.lat, pin.lng], map.getZoom(), { animate: true });
  }
  return null;
}

export default function FoodMap({ onPinClick, selectedPin }: FoodMapProps) {
  return (
    <MapContainer
      center={[50, 10]}
      zoom={5}
      className="h-full w-full"
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RecenterOnSelect pin={selectedPin} />
      {pins.map((pin) => (
        <Marker
          key={pin.id}
          position={[pin.lat, pin.lng]}
          eventHandlers={{ click: () => onPinClick(pin) }}
        >
          <Popup>
            <strong>{pin.city}, {pin.country}</strong>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
