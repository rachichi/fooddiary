import type { FoodPin, Ingredient } from "../data/pins";

interface SidebarProps {
  selectedPin: FoodPin | null;
  selectedIngredient: Ingredient | null;
  onIngredientClick: (ingredient: Ingredient) => void;
  onClose: () => void;
}

export default function Sidebar({ selectedPin, selectedIngredient, onIngredientClick, onClose }: SidebarProps) {
  if (!selectedPin) {
    return (
      <div className="flex flex-col gap-4 p-6 text-sm leading-relaxed text-warm-black">
        <p>Welcome to my food diary, where I try traditional foods from the places I've traveled and log their history.</p>
        <p>Click on a pin to get started.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col text-sm leading-relaxed text-warm-black overflow-y-auto h-full">
      {/* Header row: title + X */}
      <div className="flex items-start justify-between gap-2 p-5 pb-3">
        <div>
          <h2 className="text-sm font-bold uppercase leading-tight">{selectedPin.name}</h2>
          <p className="text-xs text-warm-black/50 uppercase mt-0.5 tracking-wide">
            {selectedPin.city}, {selectedPin.country}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-warm-black hover:opacity-50 transition-opacity text-xl leading-none mt-0.5 shrink-0 font-bold"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <div className="flex flex-col gap-4 px-5 pb-6">
        {/* Photo */}
        {selectedPin.image && (
          <img
            src={selectedPin.image}
            alt={selectedPin.name}
            className="w-full object-cover"
            style={{ maxHeight: 200 }}
          />
        )}

        {/* Review */}
        <div>
          <p className="text-xs italic font-semibold mb-1">MY REVIEW</p>
          <p className="text-xs leading-relaxed">{selectedPin.review}</p>
        </div>

        {/* History */}
        <div>
          <p className="text-xs italic font-semibold mb-1">HISTORY</p>
          <p className="text-xs leading-relaxed">{selectedPin.history}</p>
        </div>

        {/* Ingredients */}
        <div>
          <p className="text-xs italic font-semibold mb-1">INGREDIENTS</p>
          <p className="text-xs text-warm-black/70 mb-4">
            Click on an ingredient to trace how it made its way here.
          </p>
          <div className="flex gap-4">
            {selectedPin.ingredients.map((ing) => {
              const isActive = selectedIngredient?.id === ing.id;
              return (
                <button
                  key={ing.id}
                  onClick={() => onIngredientClick(ing)}
                  className="flex flex-col items-center gap-1.5 cursor-pointer group"
                >
                  <div
                    className={`w-16 h-16 flex items-center justify-center transition-colors ${
                      isActive ? "bg-warm-black/10" : "bg-transparent group-hover:bg-warm-black/5"
                    }`}
                  >
                    {ing.image ? (
                      <img src={ing.image} alt={ing.name} className="w-14 h-14 object-contain" />
                    ) : (
                      <span className="text-3xl">🍽️</span>
                    )}
                  </div>
                  <span className="text-[10px] text-center leading-tight max-w-[64px]">
                    {ing.name.toLowerCase()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active ingredient history — grey block flush to sidebar edges */}
      {selectedIngredient && (
        <div className="bg-warm-black/5 px-5 py-4 mt-auto">
          <p className="text-xs italic font-semibold mb-2 uppercase">{selectedIngredient.name}</p>
          <p className="text-xs leading-relaxed">{selectedIngredient.history}</p>
        </div>
      )}
    </div>
  );
}
