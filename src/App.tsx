import { useState } from "react";
import Navbar from "./components/Navbar";
import FoodMap from "./components/FoodMap";
import Sidebar from "./components/Sidebar";
import { FoodPin } from "./data/pins";

export default function App() {
  const [selectedPin, setSelectedPin] = useState<FoodPin | null>(null);

  return (
    <div className="flex flex-col h-full text-warm-black" style={{ fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif" }}>
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1">
          <FoodMap onPinClick={setSelectedPin} selectedPin={selectedPin} />
        </div>
        <div className="w-72 shrink-0 border-l border-warm-black/20 overflow-y-auto">
          <Sidebar selectedPin={selectedPin} />
        </div>
      </div>
    </div>
  );
}
