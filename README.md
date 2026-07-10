# Food Diary

An interactive map tracking traditional foods from places I've traveled, with ingredient trade route visualizations. Toggle between a flat 2D Google Maps view and a 3D globe view.

## Architecture

```
src/
├── components/
│   ├── Navbar.tsx          # Top navigation bar with portfolio links
│   ├── Sidebar.tsx         # Right panel — food details, ingredient tabs, hover state
│   ├── FoodMap2D.tsx       # Google Maps + Deck.gl overlay (flat map view)
│   ├── FoodMap3D.tsx       # Deck.gl GlobeView (3D globe view)
│   └── FoodMap.tsx         # Thin re-export of FoodMap3D (backward compat)
├── data/
│   └── pins.ts             # *** ALL food and route data lives here (see below) ***
├── assets/                 # Ingredient and food images
│   ├── currypowder.png
│   ├── ketchup.png
│   └── porksausage.png
├── utils/
│   └── arc.ts              # Great-circle arc interpolation for curved routes
├── App.tsx                 # Root layout, state management
├── main.tsx                # App entry point
└── index.css               # Tailwind base styles
```

### How it works

1. **`pins.ts`** is the single source of truth — typed data only, no logic. Both views consume it identically.
2. **`App.tsx`** holds four pieces of state: `selectedPin`, `selectedIngredient`, `hoveredIngredient`, and `mode` (`"2d" | "3d"`). A floating toggle in the bottom-left of the map switches between views.
3. **`FoodMap2D.tsx`** (Google Maps view):
   - Loads the Google Maps JS API via `@googlemaps/js-api-loader`
   - Renders food pins as `AdvancedMarkerElement` (flag emoji in a grey circle)
   - Renders trade route arcs via a `GoogleMapsOverlay` wrapping a Deck.gl `PathLayer`
   - Invisible `google.maps.Polyline` objects (strokeWeight 12, opacity 0) sit on top as click and hover hit targets — needed because deck.gl events don't fire reliably through the Maps overlay
4. **`FoodMap3D.tsx`** (Globe view):
   - Deck.gl `_GlobeView` with OpenStreetMap raster tiles via `TileLayer` + `BitmapLayer`
   - Trade route arcs are 3D paths with altitude that peaks at the arc midpoint (scales with distance, up to 2,500 km high)
   - Food pins are HTML `div`s positioned via `GlobeView.makeViewport().project()` — necessary because emoji don't render in Deck.gl's `TextLayer` font atlas
   - A hemisphere dot-product check hides pins on the back side of the globe
5. **`Sidebar.tsx`** renders food details, ingredient image tabs, and the ingredient history panel. Tabs fire `onIngredientHover` on mouse enter/leave and `onIngredientClick` on click — both feed back to the map to highlight the corresponding route.

### Hover behavior

Hovering an ingredient tab or a route path highlights the corresponding route in blue and the ingredient tab in grey. This is bidirectional:
- **Sidebar → Map**: `onMouseEnter`/`onMouseLeave` on ingredient tabs set `hoveredIngredient` state, which is passed down to both map components as a color input to the route layers
- **Map → Sidebar**: In 3D, Deck.gl `PathLayer.onHover` fires. In 2D, `mouseover`/`mouseout` on the invisible hit polylines fire — the invisible polylines intercept all mouse events so the deck.gl layer events never reach the map in 2D mode

### Branches

| Branch | Description |
|---|---|
| `main` | Current version — 2D/3D toggle, Google Maps + Deck.gl GlobeView |
| `20260708-leaflet` | Archived Leaflet version (no API key required) |

---

## Adding new content

> **`src/data/pins.ts` is the only file you need to edit** when adding food locations, ingredients, and routes.

### Adding a food pin

Add an entry to the `pins` array in `src/data/pins.ts`:

```ts
{
  id: "unique-id",           // kebab-case, used internally
  name: "Dish Name",
  city: "City",
  country: "Country",        // must match a key in countryFlags (see below) to get a flag marker
  lat: 00.000,               // decimal latitude
  lng: 00.000,               // decimal longitude
  image: myFoodImage,        // optional — import the image at the top of pins.ts
  videoId: "youtubeVideoId", // optional — YouTube video ID for autoplay embed
  review: "Your review...",
  history: "History of the dish...",
  ingredients: [ ... ],
}
```

### Adding a country flag marker

If the food is in a country not yet mapped, add the flag emoji to `countryFlags` in **both** map components:

- `src/components/FoodMap2D.tsx`
- `src/components/FoodMap3D.tsx`

```ts
const countryFlags: Record<string, string> = {
  Germany: "🇩🇪",
  Italy: "🇮🇹",
  // add your country here:
  France: "🇫🇷",
};
```

### Adding a video

Each food pin has an optional `videoId` field. When set, the sidebar shows a YouTube embed that autoplays, mutes, and loops. When empty, a grey placeholder is shown.

1. Upload your video to YouTube (set visibility to **Unlisted**)
2. Copy the video ID from the URL — e.g. `youtube.com/watch?v=dQw4w9WgXcQ` → ID is `dQw4w9WgXcQ`
3. Add it to the pin in `pins.ts`:

```ts
{
  id: "currywurst",
  videoId: "dQw4w9WgXcQ",
  ...
}
```

> **Why YouTube?** 10–15 second clips add significant binary weight to git and Netlify deploys. YouTube is free, handles transcoding, and unlisted videos stay off your public channel.

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
  routes: [                   // optional — omit for a simple 2-point arc from origin to food pin
    [
      { name: "Origin City, Country", lat: 00.000, lng: 00.000 },
      { name: "Intermediate Stop",    lat: 00.000, lng: 00.000 },
      { name: "Destination City",     lat: 00.000, lng: 00.000 },
    ],
  ],
}
```

- If `routes` is omitted, a single arc is drawn from `originLat/originLng` to the food pin.
- `routes` is an array of arrays — use multiple inner arrays for branching/alternative origins (e.g. pork sausage from both Thuringia and Franconia).

### Adding ingredient images

1. Drop the PNG into `src/assets/`
2. Import it at the top of `pins.ts`: `import myImg from "../assets/myimage.png";`
3. Set `image: myImg` on the ingredient

---

## Notes

- **Google Maps API key** — the 2D view uses the Google Maps JavaScript API. A valid key must be set in `src/components/FoodMap2D.tsx`. The 3D globe uses OpenStreetMap tiles and requires no key.
- **Billing** — Google provides $200/month in free credits (~28,000 map loads). A personal portfolio will never exceed this, but a credit card must be on file. Set a $0 budget alert under Billing → Budgets & alerts to get notified of any unexpected charges.
- **Map ID** — the 2D view uses `DEMO_MAP_ID`. Replace with a real Map ID from Google Cloud Console to apply a custom map style.
- **Leaflet fallback** — the `20260708-leaflet` branch has a fully working version using Leaflet (no API key). Use it if you want zero-cost deployment.

---

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
```

Deployed on Netlify — pushes to `main` auto-deploy.
