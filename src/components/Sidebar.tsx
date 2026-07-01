import type { FoodPin, Ingredient } from "../data/pins";

interface SidebarProps {
  selectedPin: FoodPin | null;
  selectedIngredient: Ingredient | null;
  onIngredientClick: (ingredient: Ingredient) => void;
}

export default function Sidebar({ selectedPin, selectedIngredient, onIngredientClick }: SidebarProps) {
  if (!selectedPin) {
    return (
      <div className="flex flex-col gap-4 p-6 text-sm leading-relaxed text-warm-black">
        <p>Welcome to my food diary, where I try traditional foods from the places I've traveled and log their history.</p>
        <p>Click on a pin to get started.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 p-6 text-sm leading-relaxed text-warm-black overflow-y-auto h-full">
      {/* Header */}
      <div>
        <h2 className="text-base font-bold tracking-widest uppercase">
          {selectedPin.name}
          {selectedIngredient ? ` — ${selectedPin.city}, ${selectedPin.country}` : ""}
        </h2>
        {!selectedIngredient && (
          <p className="text-xs tracking-widest text-warm-black/40 uppercase mt-0.5">
            {selectedPin.city}, {selectedPin.country}
          </p>
        )}
      </div>

      {/* Photo */}
      {selectedPin.image && (
        <img
          src={selectedPin.image}
          alt={selectedPin.name}
          className="w-full object-cover border border-warm-black/10"
          style={{ maxHeight: 180 }}
        />
      )}

      {/* Review */}
      <div>
        <p className="text-xs font-bold tracking-widest uppercase italic mb-1">My Review</p>
        <p className="text-xs leading-relaxed text-warm-black/80">{selectedPin.review}</p>
      </div>

      {/* History */}
      <div>
        <p className="text-xs font-bold tracking-widest uppercase italic mb-1">History</p>
        <p className="text-xs leading-relaxed text-warm-black/80">{selectedPin.history}</p>
      </div>

      {/* Ingredients */}
      <div>
        <p className="text-xs font-bold tracking-widest uppercase italic mb-1">Ingredients</p>
        <p className="text-xs text-warm-black/60 mb-3">
          Click on an ingredient to trace its historical trade route.
        </p>
        <div className="flex flex-wrap gap-3">
          {selectedPin.ingredients.map((ing) => {
            const isActive = selectedIngredient?.id === ing.id;
            return (
              <button
                key={ing.id}
                onClick={() => onIngredientClick(ing)}
                className={`flex flex-col items-center gap-1 p-2 border transition-all cursor-pointer ${
                  isActive
                    ? "border-warm-black bg-warm-black/5"
                    : "border-warm-black/20 hover:border-warm-black/50"
                }`}
              >
                {ing.image ? (
                  <img src={ing.image} alt={ing.name} className="w-14 h-14 object-cover" />
                ) : (
                  <div className="w-14 h-14 bg-warm-black/5 flex items-center justify-center text-2xl">
                    🍽️
                  </div>
                )}
                <span className="text-[10px] tracking-wide text-center leading-tight">{ing.name.toLowerCase()}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active ingredient detail */}
      {selectedIngredient && (
        <div className="border-t border-warm-black/10 pt-4">
          <p className="text-xs font-bold tracking-widest uppercase italic mb-2">
            {selectedIngredient.name}
          </p>
          <p className="text-xs leading-relaxed text-warm-black/80">{selectedIngredient.history}</p>
          <p className="text-xs text-warm-black/40 mt-2 italic">
            Origin: {selectedIngredient.originCity}, {selectedIngredient.originCountry}
          </p>
        </div>
      )}
    </div>
  );
}
