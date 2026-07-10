# Food Diary

An interactive map tracking traditional foods from places I've traveled, with ingredient trade route visualizations.

## Architecture

```
src/
├── components/
│   ├── Navbar.tsx          # Top navigation bar with portfolio links
│   ├── Sidebar.tsx         # Right panel — food pin details, ingredient tabs, history
│   └── FoodMap.tsx         # Google Maps + Deck.gl map, route arcs, markers
├── data/
│   └── pins.ts             # *** ALL food and route data lives here (see below) ***
├── assets/                 # Ingredient and food images
│   ├── currypowder.png
│   ├── ketchup.png
│   └── porksausage.png
├── utils/
│   └── arc.ts              # Great-circle arc interpolation for curved routes
├── App.tsx                 # Root layout, state management (selected pin/ingredient)
├── main.tsx                # App entry point
└── index.css               # Tailwind base styles
```

### How it works

1. **`pins.ts`** defines every food location and its ingredients as typed data — no logic, just content.
2. **`App.tsx`** holds two pieces of state: which food pin is selected, and which ingredient is active.
3. **`FoodMap.tsx`** renders the Google Maps base with:
   - `AdvancedMarkerElement` for food destination pins (flag emoji in a circle)
   - `PathLayer` (Deck.gl) for great-circle arc routes
   - `ScatterplotLayer` (Deck.gl) for route stop dots
   - Invisible `google.maps.Polyline` objects as click hit targets over each route
4. **`Sidebar.tsx`** reads from the selected pin and renders the food details, ingredient tabs, and ingredient history panel.

### Branches

| Branch | Description |
|---|---|
| `main` | Current version — Google Maps + Deck.gl |
| `20260708-leaflet` | Archived Leaflet version (no API key required) |
| `3d-migration` | Working branch for the Google Maps migration |

---

## Adding new content

> When you have the final list of foods, locations, and ingredients, **`src/data/pins.ts` is the only file you need to edit.**

### Adding a food pin

Add an entry to the `pins` array in `src/data/pins.ts`:

```ts
{
  id: "unique-id",           // kebab-case, used internally
  name: "Dish Name",
  city: "City",
  country: "Country",        // must match a key in countryFlags in FoodMap.tsx to get a flag marker
  lat: 00.000,               // decimal latitude of the city
  lng: 00.000,               // decimal longitude
  image: myFoodImage,        // optional — import the image at the top of pins.ts
  review: "Your review...",
  history: "History of the dish...",
  ingredients: [ ... ],
}
```

### Adding a country flag marker

If the food is in a country not yet in the `countryFlags` map, add it in `src/components/FoodMap.tsx`:

```ts
const countryFlags: Record<string, string> = {
  Germany: "🇩🇪",
  Italy: "🇮🇹",
  // add your country here
};
```

### Adding a video

Each food pin has an optional `videoId` field. When set, the sidebar shows a YouTube embed that autoplays, mutes, and loops. When empty, a grey placeholder box is shown.

1. Upload your video to YouTube (set visibility to **Unlisted** so it doesn't appear on your channel publicly)
2. Copy the video ID from the URL — e.g. for `youtube.com/watch?v=dQw4w9WgXcQ` the ID is `dQw4w9WgXcQ`
3. Add it to the pin in `pins.ts`:

```ts
{
  id: "currywurst",
  name: "Currywurst",
  videoId: "dQw4w9WgXcQ",   // YouTube video ID
  ...
}
```

> **Why YouTube and not direct upload?** 10–15 second video files (even compressed) add significant binary weight to the git repo and Netlify deploy. YouTube is free, handles transcoding across devices, and unlisted videos are private enough for a portfolio.

### Adding an ingredient

Add to the `ingredients` array inside a food pin:

```ts
{
  id: "unique-ingredient-id",
  name: "Ingredient Name",
  image: myIngredientImage,   // optional — import PNG from src/assets/
  originCity: "City",
  originCountry: "Country",
  originLat: 00.000,
  originLng: 00.000,
  history: "History of this ingredient...",
  routes: [                   // optional — omit for a simple 2-point arc
    [
      { name: "Origin City, Country", lat: 00.000, lng: 00.000 },
      { name: "Stop 2, Country",      lat: 00.000, lng: 00.000 },
      { name: "Destination City",     lat: 00.000, lng: 00.000 },
    ],
  ],
}
```

- If `routes` is omitted, a single arc is drawn from `originLat/originLng` to the food pin location.
- `routes` is an array of arrays — use multiple inner arrays to show branching/alternative origin routes (e.g. pork sausage from both Thuringia and Franconia).

### Adding ingredient images

1. Drop the PNG into `src/assets/`
2. Import it at the top of `pins.ts`: `import myImg from "../assets/myimage.png";`
3. Set `image: myImg` on the ingredient

---

## Notes

- **Google Maps API key required** — the map is built on the Google Maps JavaScript API + Deck.gl overlay. A valid API key must be set in `src/components/FoodMap.tsx`. The key requires a Google Cloud billing account to be active.
- **Billing** — Google provides $200/month in free credits, which covers ~28,000 map loads. A personal portfolio will never exceed this, but a credit card must be on file in Google Cloud Console. Set a $0 budget alert under Billing → Budgets & alerts to get notified of any unexpected charges.
- **Leaflet fallback** — the `20260708-leaflet` branch contains a fully working version using Leaflet (OpenStreetMap tiles) with no API key or billing required. Merge it into main if you want a zero-cost deployment.
- **Map ID** — the code currently uses `DEMO_MAP_ID` for the Google Maps map style. This works but you can replace it with a real Map ID from Google Cloud Console if you want to apply a custom map style.

---

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
```

Deployed on Netlify — pushes to `main` auto-deploy.
