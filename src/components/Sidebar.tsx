import { FoodPin } from "../data/pins";

interface SidebarProps {
  selectedPin: FoodPin | null;
}

export default function Sidebar({ selectedPin }: SidebarProps) {
  if (!selectedPin) {
    return (
      <div className="flex flex-col gap-4 p-6 text-sm leading-relaxed text-warm-black">
        <p>Welcome to my food diary, where I try traditional foods from the places I've traveled and log their history.</p>
        <p>Click on a pin to get started.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6 text-sm leading-relaxed text-warm-black overflow-y-auto">
      <div>
        <h2 className="text-lg font-bold tracking-wide uppercase">{selectedPin.city}</h2>
        <p className="text-xs tracking-widest text-warm-black/50 uppercase">{selectedPin.country}</p>
      </div>
      <div className="flex flex-col gap-5">
        {selectedPin.foods.map((food, i) => (
          <div key={i} className="border-t border-warm-black/10 pt-4">
            <p className="font-bold mb-1">{food.emoji && <span className="mr-1">{food.emoji}</span>}{food.name}</p>
            <p className="text-warm-black/70">{food.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
