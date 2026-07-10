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

      {/* Photo, Review, History, Ingredients label */}
      <div className="flex flex-col gap-4 px-5 pb-0">
        {/* Video embed or placeholder */}
        {selectedPin.videoId ? (
          <div className="w-full aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${selectedPin.videoId}?autoplay=1&mute=1&loop=1&playlist=${selectedPin.videoId}&controls=0&modestbranding=1&rel=0`}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="w-full aspect-video bg-warm-black/10 flex items-center justify-center">
            <span className="text-xs text-warm-black/30 uppercase tracking-widest">Video</span>
          </div>
        )}

        {selectedPin.image && (
          <img
            src={selectedPin.image}
            alt={selectedPin.name}
            className="w-full object-cover"
            style={{ maxHeight: 200 }}
          />
        )}

        <div>
          <p className="text-xs italic font-semibold mb-1">MY REVIEW</p>
          <p className="text-xs leading-relaxed">{selectedPin.review}</p>
        </div>

        <div>
          <p className="text-xs italic font-semibold mb-1">HISTORY</p>
          <p className="text-xs leading-relaxed">{selectedPin.history}</p>
        </div>

        <div>
          <p className="text-xs italic font-semibold mb-1">INGREDIENTS</p>
          <p className="text-xs text-warm-black/70">
            Click on an ingredient to trace how it made its way here.
          </p>
        </div>
      </div>

      {/* Ingredient tabs — full width, flush to sidebar edges */}
      <div className="flex mt-4">
        {selectedPin.ingredients.map((ing) => {
          const isActive = selectedIngredient?.id === ing.id;
          return (
            <button
              key={ing.id}
              onClick={() => onIngredientClick(ing)}
              className="flex-1 flex flex-col items-center cursor-pointer group"
            >
              <div
                className={`w-full flex flex-col items-center gap-1.5 py-3 transition-colors ${
                  isActive ? "bg-warm-black/10" : "bg-transparent group-hover:bg-warm-black/5"
                }`}
              >
                {ing.image ? (
                  <img src={ing.image} alt={ing.name} className="w-14 h-14 object-contain" />
                ) : (
                  <span className="text-3xl">🍽️</span>
                )}
                <span className="text-[10px] text-center leading-tight px-1">
                  {ing.name.toLowerCase()}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active ingredient description — flush, full width */}
      {selectedIngredient ? (
        <div className="bg-warm-black/10 px-5 py-4">
          <p className="text-xs italic font-semibold mb-2 uppercase">{selectedIngredient.name}</p>
          <p className="text-xs leading-relaxed">{selectedIngredient.history}</p>
        </div>
      ) : (
        <div className="pb-6" />
      )}
    </div>
  );
}
