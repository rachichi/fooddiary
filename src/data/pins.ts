import porkSausageImg from "../assets/porksausage.png";
import ketchupImg from "../assets/ketchup.png";
import curryPowderImg from "../assets/currypowder.png";

export interface RouteStop {
  name: string;
  lat: number;
  lng: number;
  emoji?: string;
}

export interface Ingredient {
  id: string;
  name: string;
  image?: string;
  originCity: string;
  originCountry: string;
  originLat: number;
  originLng: number;
  history: string;
  routes?: RouteStop[][];
}

export interface FoodPin {
  id: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  image?: string;
  videoId?: string;
  review: string;
  history: string;
  ingredients: Ingredient[];
}

export const pins: FoodPin[] = [
  {
    id: "currywurst",
    name: "Currywurst",
    city: "Berlin",
    country: "Germany",
    lat: 52.52,
    lng: 13.405,
    review:
      "Ordered for €10 at Berlin Food Market. I liked this dish a lot. Savory, flavorful, spicy with a great texture. Fries could be crunchier.",
    history:
      "Invented in West Berlin in 1949 by Herta Heuwer, who obtained ketchup and curry powder from British soldiers. It became a staple of post-war street food culture.",
    ingredients: [
      {
        id: "pork-sausage",
        name: "Pork Sausage",
        image: porkSausageImg,
        originCity: "Thuringia",
        originCountry: "Germany",
        originLat: 50.93,
        originLng: 11.03,
        routes: [
          [
            { name: "Thuringia, Germany", lat: 50.93, lng: 11.03 },
            { name: "Berlin, Germany", lat: 52.52, lng: 13.405 },
          ],
          [
            { name: "Franconia, Germany", lat: 49.45, lng: 11.08 },
            { name: "Berlin, Germany", lat: 52.52, lng: 13.405 },
          ],
        ],
        history:
          "The history of the pork sausage dates back to 1404 CE and is entirely domestic to Germany. Two regions (Thuringia and Franconia) both claim credit for the bratwurst, and the rivalry is still heated today.",
      },
      {
        id: "ketchup",
        name: "Ketchup",
        image: ketchupImg,
        originCity: "Fujian",
        originCountry: "China",
        originLat: 26.07,
        originLng: 119.3,
        routes: [
          [
            { name: "Southern China", lat: 23.13, lng: 113.26 },
            { name: "United Kingdom", lat: 51.507, lng: -0.127 },
            { name: "H.J. Heinz Company, Sharpsburg, Pennsylvania", lat: 40.497, lng: -79.924 },
            { name: "Berlin, Germany", lat: 52.52, lng: 13.405 },
          ],
        ],
        history:
          "The history of ketchup dates back to 300 BCE and spans across China, Southeast Asia, Britain, and the Americas. It began as a fermented fish paste in southern China, picked up the tomato in the New World, and was standardized as we know it by Heinz in 1876.",
      },
      {
        id: "curry-powder",
        name: "Curry Powder",
        image: curryPowderImg,
        originCity: "Chennai",
        originCountry: "India",
        originLat: 20.59,
        originLng: 78.96,
        routes: [
          [
            { name: "South Asia (India)", lat: 20.59, lng: 78.96 },
            { name: "East India Company, London, England", lat: 51.514, lng: -0.081 },
            { name: "Berlin, Germany", lat: 52.52, lng: 13.405 },
          ],
        ],
        history:
          "The history of curry powder dates back to 1784 and spans across South Asia and the British Empire. Indian cooks had blended fresh spices for thousands of years, but curry powder as a packaged product was a British colonial invention — a simplified blend for export.",
      },
    ],
  },
  {
    id: "stroopwafel",
    name: "Stroopwafel",
    city: "Amsterdam",
    country: "Netherlands",
    lat: 52.37,
    lng: 4.9,
    review:
      "Bought fresh at the Albert Cuyp market for €1.50. Warm, gooey, and perfectly sweet. Nothing like the packaged supermarket version.",
    history:
      "The stroopwafel was created in Gouda around 1810 by baker Gerard Kamphuisen. He baked thin waffle cookies and filled them with syrup made from leftovers. By the late 19th century, there were over 100 waffle bakeries in Gouda alone.",
    ingredients: [
      {
        id: "wheat",
        name: "Wheat",
        originCity: "Fertile Crescent",
        originCountry: "Iraq",
        originLat: 33.3,
        originLng: 44.4,
        history:
          "Wheat was first domesticated around 10,000 BCE in the Fertile Crescent (modern-day Iraq and Syria). It spread westward through trade routes across thousands of years to become the backbone of European baking.",
      },
      {
        id: "cane-sugar",
        name: "Cane Sugar",
        originCity: "Colombo",
        originCountry: "Sri Lanka",
        originLat: 6.93,
        originLng: 79.85,
        history:
          "Sugarcane was first cultivated in New Guinea around 8000 BCE and spread to India and Southeast Asia. Dutch colonial traders brought refined sugar from their colonies in Sri Lanka and the Caribbean to the Netherlands in the 17th century.",
      },
      {
        id: "cinnamon",
        name: "Cinnamon",
        originCity: "Kandy",
        originCountry: "Sri Lanka",
        originLat: 7.29,
        originLng: 80.63,
        history:
          "True cinnamon (Ceylon cinnamon) originates from Sri Lanka, where it has been harvested for over 2,000 years. The Dutch East India Company (VOC) controlled the Sri Lankan cinnamon trade throughout the 17th and 18th centuries, making it one of the most prized Dutch imports.",
      },
    ],
  },
  {
    id: "weisswurst",
    name: "Weißwurst",
    city: "Munich",
    country: "Germany",
    lat: 48.137,
    lng: 11.576,
    review:
      "Had it at the Viktualienmarkt at 9am with a pretzel and wheat beer, exactly as tradition demands. Mild, delicate, and nothing like I expected. The sweet mustard is essential.",
    history:
      "Weißwurst was accidentally invented on February 22, 1857 by butcher Josef Moser at the Gasthaus Zum Ewigen Licht in Munich. Running out of sheep intestine casings, he used pork casings — boiling them to prevent bursting. The dish became a Bavarian icon overnight.",
    ingredients: [
      {
        id: "veal",
        name: "Veal",
        originCity: "Bavaria",
        originCountry: "Germany",
        originLat: 48.7,
        originLng: 11.5,
        history:
          "Veal has been central to Bavarian cuisine since medieval times. Bavarian cattle farming traditions date to at least the 8th century, when monasteries maintained large herds. The tender meat of young calves became a prized ingredient in Alpine cooking.",
      },
      {
        id: "parsley",
        name: "Parsley",
        originCity: "Sardinia",
        originCountry: "Italy",
        originLat: 39.2,
        originLng: 9.1,
        history:
          "Parsley originated in the central Mediterranean — likely Sardinia — and was cultivated by the ancient Greeks and Romans. It spread throughout Europe in the Middle Ages via monastic gardens and had reached German-speaking lands by the 12th century.",
      },
      {
        id: "lemon",
        name: "Lemon Zest",
        originCity: "Assam",
        originCountry: "India",
        originLat: 26.2,
        originLng: 92.9,
        history:
          "Lemons originated in Assam, northeastern India, and were introduced to Europe by Arab traders around 700 CE. They spread to Italy and from there northward, becoming a luxury flavoring in German cooking by the Renaissance period.",
      },
    ],
  },
  {
    id: "cacio-e-pepe",
    name: "Cacio e Pepe",
    city: "Rome",
    country: "Italy",
    lat: 41.9,
    lng: 12.5,
    review:
      "€12 at a tiny trattoria near Trastevere. Perfectly emulsified — no clumps, no grease. The simplicity is deceptive. This is harder to make than it looks.",
    history:
      "Cacio e pepe originates from the Lazio region and was historically a shepherd's dish. Roman shepherds traveling the countryside needed non-perishable food: hard pecorino and dried black pepper kept for weeks. The pasta was added as shepherds settled closer to Rome.",
    ingredients: [
      {
        id: "pecorino",
        name: "Pecorino Romano",
        originCity: "Lazio",
        originCountry: "Italy",
        originLat: 41.9,
        originLng: 12.7,
        history:
          "Pecorino Romano is one of Italy's oldest cheeses, dating back over 2,000 years. Roman soldiers were given a ration of it daily — roughly 27 grams — as it was packed with protein and salt. It has been produced in the Lazio hills outside Rome since antiquity.",
      },
      {
        id: "black-pepper",
        name: "Black Pepper",
        originCity: "Kerala",
        originCountry: "India",
        originLat: 10.85,
        originLng: 76.27,
        history:
          "Black pepper comes from Kerala, India's Malabar Coast, and has been traded for over 4,000 years. Ancient Romans used it as currency. The desire to control the pepper trade was a primary driver of European exploration — Vasco da Gama's 1498 voyage to India was explicitly for pepper.",
      },
      {
        id: "pasta",
        name: "Pasta (Durum Wheat)",
        originCity: "Sicily",
        originCountry: "Italy",
        originLat: 37.6,
        originLng: 14.0,
        history:
          "Durum wheat pasta was introduced to Sicily by Arab traders during their rule of the island (9th–11th centuries CE). Dried pasta production expanded throughout Italy in the following centuries, with Rome becoming a center of pasta culture by the 16th century.",
      },
    ],
  },
  {
    id: "pan-con-tomate",
    name: "Pan con Tomate",
    city: "Barcelona",
    country: "Spain",
    lat: 41.385,
    lng: 2.173,
    review:
      "Had it at a corner bar in the Eixample for €3. Just bread, tomato, oil, and salt — but it was somehow perfect. The quality of the tomato makes all the difference.",
    history:
      "Pan con tomate (pa amb tomàquet in Catalan) dates to the 19th century in Catalonia. The practice of rubbing stale bread with ripe tomato to soften and flavor it was a practical peasant solution. It is now considered the cornerstone of Catalan culinary identity.",
    ingredients: [
      {
        id: "tomato",
        name: "Tomato",
        originCity: "Cusco",
        originCountry: "Peru",
        originLat: -13.53,
        originLng: -71.97,
        history:
          "Tomatoes were domesticated in Peru and Mexico by indigenous peoples thousands of years before European contact. Spanish conquistadors brought them to Europe in the 16th century, but they were initially treated as ornamental and feared as poisonous. Catalonia adopted the tomato enthusiastically by the 1800s.",
      },
      {
        id: "olive-oil",
        name: "Olive Oil",
        originCity: "Athens",
        originCountry: "Greece",
        originLat: 37.97,
        originLng: 23.72,
        history:
          "Olive cultivation dates back 6,000 years across the Mediterranean. Ancient Greeks spread olive culture throughout the region; the Romans expanded it to Spain (Hispania), which became the empire's largest olive oil producer. Spain remains the world's top producer today.",
      },
      {
        id: "sourdough",
        name: "Sourdough Bread",
        originCity: "Mesopotamia",
        originCountry: "Iraq",
        originLat: 32.5,
        originLng: 45.0,
        history:
          "Leavened bread using wild fermentation originates from Mesopotamia around 3700 BCE. The technique spread westward through Egypt, Greece, and Rome, carried by trade routes. Catalonia developed its own bread-making traditions during the medieval period, favoring dense rustic loaves ideal for the pa amb tomàquet technique.",
      },
    ],
  },
];
