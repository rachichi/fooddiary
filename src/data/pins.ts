export interface FoodPin {
  id: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  foods: FoodEntry[];
}

export interface FoodEntry {
  name: string;
  description: string;
  emoji?: string;
}

export const pins: FoodPin[] = [
  {
    id: "netherlands",
    city: "Amsterdam",
    country: "Netherlands",
    lat: 52.37,
    lng: 4.9,
    foods: [
      { name: "Stroopwafel", description: "Two thin waffles sandwiched with a caramel syrup filling.", emoji: "🧇" },
      { name: "Bitterballen", description: "Deep-fried ragout balls served with mustard.", emoji: "🟤" },
    ],
  },
  {
    id: "berlin",
    city: "Berlin",
    country: "Germany",
    lat: 52.52,
    lng: 13.405,
    foods: [
      { name: "Currywurst", description: "Steamed and fried pork sausage sliced and seasoned with curry ketchup.", emoji: "🌭" },
      { name: "Döner Kebab", description: "Berlin's iconic street food — meat roasted on a spit, served in flatbread.", emoji: "🥙" },
    ],
  },
  {
    id: "munich",
    city: "Munich",
    country: "Germany",
    lat: 48.137,
    lng: 11.576,
    foods: [
      { name: "Weißwurst", description: "White veal sausage traditionally eaten before noon with sweet mustard and pretzels.", emoji: "🥨" },
      { name: "Obatzda", description: "Bavarian cheese spread made with camembert, butter, paprika and onions.", emoji: "🧀" },
    ],
  },
  {
    id: "rome",
    city: "Rome",
    country: "Italy",
    lat: 41.9,
    lng: 12.5,
    foods: [
      { name: "Cacio e Pepe", description: "Roman pasta dish of spaghetti with pecorino romano and black pepper.", emoji: "🍝" },
      { name: "Supplì", description: "Fried rice croquettes stuffed with tomato sauce and mozzarella.", emoji: "🍱" },
    ],
  },
  {
    id: "barcelona",
    city: "Barcelona",
    country: "Spain",
    lat: 41.385,
    lng: 2.173,
    foods: [
      { name: "Pan con Tomate", description: "Toasted bread rubbed with ripe tomato and drizzled with olive oil.", emoji: "🍅" },
      { name: "Patatas Bravas", description: "Fried potatoes served with a spicy tomato sauce and aioli.", emoji: "🥔" },
    ],
  },
];
