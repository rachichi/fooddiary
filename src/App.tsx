import { useState } from "react";
import Navbar from "./components/Navbar";
import FoodMap from "./components/FoodMap";
import Sidebar from "./components/Sidebar";
import type { FoodPin, Ingredient } from "./data/pins";

export default function App() {
  const [selectedPin, setSelectedPin] = useState<FoodPin | null>(null);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);

  function handlePinClick(pin: FoodPin) {
    setSelectedPin(pin);
    setSelectedIngredient(null);
  }

  function handleIngredientClick(ingredient: Ingredient) {
    // Toggle off if already selected
    setSelectedIngredient((prev) => (prev?.id === ingredient.id ? null : ingredient));
  }

  return (
    <div className="flex flex-col h-full text-warm-black" style={{ fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif" }}>
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1">
          <FoodMap
            selectedPin={selectedPin}
            selectedIngredient={selectedIngredient}
            onPinClick={handlePinClick}
          />
        </div>
        <div className="w-72 shrink-0 border-l border-warm-black/20 overflow-y-auto">
          <Sidebar
            selectedPin={selectedPin}
            selectedIngredient={selectedIngredient}
            onIngredientClick={handleIngredientClick}
          />
        </div>
      </div>
    </div>
  );
}
