import { useState } from "react";
import Navbar from "./components/Navbar";
import FoodMap2D from "./components/FoodMap2D";
import FoodMap3D from "./components/FoodMap3D";
import Sidebar from "./components/Sidebar";
import type { FoodPin, Ingredient } from "./data/pins";

type MapMode = "2d" | "3d";

export default function App() {
  const [selectedPin, setSelectedPin] = useState<FoodPin | null>(null);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [hoveredIngredient, setHoveredIngredient] = useState<Ingredient | null>(null);
  const [mode, setMode] = useState<MapMode>("2d");

  function handlePinClick(pin: FoodPin) {
    setSelectedPin(pin);
    setSelectedIngredient(null);
  }

  function handleIngredientClick(ingredient: Ingredient) {
    setSelectedIngredient((prev) => (prev?.id === ingredient.id ? null : ingredient));
  }

  function handleClose() {
    setSelectedPin(null);
    setSelectedIngredient(null);
  }

  const mapProps = {
    selectedPin,
    selectedIngredient,
    hoveredIngredient,
    onPinClick: handlePinClick,
    onIngredientClick: handleIngredientClick,
    onIngredientHover: setHoveredIngredient,
  };

  return (
    <div className="flex flex-col h-full text-warm-black" style={{ fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif" }}>
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 relative">
          {mode === "2d" ? <FoodMap2D {...mapProps} /> : <FoodMap3D {...mapProps} />}

          {/* Map mode toggle */}
          <div className="absolute bottom-4 left-4 z-10 flex overflow-hidden border border-warm-black/20 text-[10px] tracking-widest font-bold uppercase" style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(4px)" }}>
            <button
              onClick={() => setMode("2d")}
              className={`px-3 py-1.5 transition-colors ${mode === "2d" ? "bg-warm-black text-white" : "text-warm-black/40 hover:text-warm-black"}`}
            >
              2D
            </button>
            <div className="w-px bg-warm-black/20" />
            <button
              onClick={() => setMode("3d")}
              className={`px-3 py-1.5 transition-colors ${mode === "3d" ? "bg-warm-black text-white" : "text-warm-black/40 hover:text-warm-black"}`}
            >
              3D
            </button>
          </div>
        </div>

        <div className="w-72 shrink-0 border-l border-warm-black/20 overflow-y-auto">
          <Sidebar
            selectedPin={selectedPin}
            selectedIngredient={selectedIngredient}
            hoveredIngredient={hoveredIngredient}
            onIngredientClick={handleIngredientClick}
            onIngredientHover={setHoveredIngredient}
            onClose={handleClose}
          />
        </div>
      </div>
    </div>
  );
}
