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
    videoId: "Jf8Mu6tpv2w",
    review:
      "Purchased at Nante-Eck, a fancy restaurant in Berlin. I'm pretty certain they bamboozled us with a vegan wurst, though being my first wurst, I didn't complain. Had some much better ones in the next few days, though throughout my time in Germany I've confirmed my affinity to mustard paired wursts over ketchup paired wursts (currywursts are a ketchup drenched wurst).",
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
    id: "weisswurst",
    name: "Weißwurst",
    city: "Munich",
    country: "Germany",
    lat: 48.137,
    lng: 11.576,
    review:
      "Ordered this from a jolly lady in the Viktualienmarkt at the Wurstimbiss Teltschik stand. Sausage was good, pretzel was meh. Wish I had a bit of saukraut and potato cucumber salad on the side but made do with two massive servings of sweet mustard. Apparently you're not supposed to eat the skin on these sausages, and zuzeln (suck) it out but shoot me for loving a little bit of bite. My favorite sausages are the chili spiced rote bratwurst and big ol' cheese filled käsekrainer.",
    history:
      "Weißwurst was accidentally invented on February 22, 1857 by butcher Josef Moser at the Gasthaus Zum Ewigen Licht in Munich. Running out of sheep intestine casings, he used pork casings, boiling them to prevent bursting.",
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
          "Parsley originated in the central Mediterranean and was cultivated by the ancient Greeks and Romans. It spread throughout Europe in the Middle Ages via monastic gardens and had reached German-speaking lands by the 12th century.",
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
    id: "gemuese-kebab",
    name: "Gemüse Kebab",
    city: "Berlin",
    country: "Germany",
    lat: 52.5405,
    lng: 13.4126,
    videoId: "v7XsU1I-Ntk",
    review:
      "Ordered from a crowded takeaway restaurant called Rüyam Gemüse Kebab 2. This is my ideal stuffing to bread ratio. Döner was filled to the point I had to keep packing ingredients back in. The bread could be more flavorful but everything else was perfect. Apologies for how long it took to eat, I'm a yapper when friends are around.",
    history:
      "The döner kebab sandwich was invented by Turkish immigrants in West Berlin in the early 1970s, adapting spit-roasted meat into a portable street-food sandwich. The Gemüse (vegetable-loaded) variant became a popular staple of Berlin's large Turkish community and is now considered a quintessential Berlin dish.",
    ingredients: [
      {
        id: "spit-roasted-meat",
        name: "Spit-Roasted Meat",
        originCity: "Bursa",
        originCountry: "Turkey",
        originLat: 40.18,
        originLng: 29.06,
        history:
          "Vertical spit-roasting of meat developed in the Ottoman Empire in the 19th century, later evolving into the modern döner and eventually the Berlin sandwich format.",
      },
      {
        id: "flatbread-pide",
        name: "Flatbread",
        originCity: "Anatolia",
        originCountry: "Turkey",
        originLat: 39.0,
        originLng: 35.0,
        history:
          "Unleavened and semi-leavened flatbreads have been a staple of Anatolian cuisine for millennia, forming the base for the modern döner sandwich.",
      },
      {
        id: "garlic-yogurt-sauce",
        name: "Garlic Yogurt Sauce",
        originCity: "Central Asia",
        originCountry: "Turkey",
        originLat: 38.96,
        originLng: 35.24,
        history:
          "Yogurt-based sauces have roots in Central Asian and Anatolian pastoral traditions, brought to Berlin by Turkish guest-worker communities from the 1960s onward.",
      },
    ],
  },
  {
    id: "flammkuchen",
    name: "Flammkuchen",
    city: "Berlin",
    country: "Germany",
    lat: 52.4893,
    lng: 13.3954,
    videoId: "QQCZCMLt46I",
    review:
      "One of my new favorite dishes. Kind of like flatbread pizza but with a pastry crust (how can you go wrong with cream and meat and bread?). Traditional German toppings are onions, bacon, and sour cream. Go here for the weekday lunch special. (By the way, did you see my Berghain wristband? Did I tell you that I got into Berghain? Did you know it lived up to the hype and that I want nothing more than to go back and relive it all over it again?)",
    history:
      "Flammkuchen originated in the Alsace/southwestern German border region, traditionally baked by farmers' wives as a quick way to test a wood-fired oven's temperature before baking bread, using thin dough topped with crème fraîche, onion, and bacon.",
    ingredients: [
      {
        id: "thin-dough",
        name: "Thin Bread Dough",
        originCity: "Strasbourg",
        originCountry: "France",
        originLat: 48.58,
        originLng: 7.75,
        history:
          "The thin, cracker-like dough base is characteristic of Alsatian baking traditions dating back centuries.",
      },
      {
        id: "creme-fraiche",
        name: "Crème Fraîche",
        originCity: "Normandy",
        originCountry: "France",
        originLat: 49.18,
        originLng: 0.37,
        history:
          "Cultured cream traditions in northern France date to at least the medieval period, later spreading into Alsace and southwestern Germany.",
      },
      {
        id: "smoked-bacon",
        name: "Smoked Bacon",
        originCity: "Black Forest",
        originCountry: "Germany",
        originLat: 48.0,
        originLng: 8.15,
        history:
          "Smoked pork belly (Speck) has long been a preservation staple across southern Germany.",
      },
    ],
  },
  {
    id: "kaesekuchen",
    name: "Käsekuchen",
    city: "Berlin",
    country: "Germany",
    lat: 52.4921,
    lng: 13.4207,
    videoId: "Cw4V18rXQLQ",
    review:
      "Ordered at ZAZZA Kaffeehaus nearby my friends apartment. Unlike the typical New York cheesecake, the crust of a Käsekuchen is a pastry crust rather than graham crackers, less sweet, and more airy. Like the love child of Parisian flan and NY cheesecake. Not my taste but glad I tried it.",
    history:
      "German Käsekuchen is typically made with quark rather than cream cheese, giving it a lighter, less dense texture than American-style cheesecake; quark-based cakes have German roots going back to at least the 18th century.",
    ingredients: [
      {
        id: "quark",
        name: "Quark",
        originCity: "Central Europe",
        originCountry: "Germany",
        originLat: 51.0,
        originLng: 10.0,
        history:
          "Quark, a fresh curdled dairy product, has been a staple of Central European cooking since at least the Middle Ages.",
      },
      {
        id: "shortcrust-pastry",
        name: "Shortcrust Pastry",
        originCity: "Central Europe",
        originCountry: "Germany",
        originLat: 50.0,
        originLng: 10.0,
        history:
          "Butter-based shortcrust doughs became common in German baking by the early modern period, used as a base for many fruit and cheese tarts.",
      },
    ],
  },
  {
    id: "moehrenkuchen",
    name: "Möhrenkuchen",
    city: "Berlin",
    country: "Germany",
    lat: 52.4921,
    lng: 13.4207,
    videoId: "mo7yKp9w98A",
    review:
      "Ordered at ZAZZA Kaffeehaus nearby my friends apartment. I fought with a wasp for every bite then waved my takeaway bag in surrender once he recruited his friends. I get it. This cake was great. More savory, chrstmassy, nutmeggy, walnutty than most American carrot cakes, though I do wish the cream cheese frosting was denser.",
    history:
      "German carrot cake traces back to Swiss and German baking traditions using ground nuts and grated carrots as a moist, dense cake base, popularized partly by wartime sugar rationing that favored naturally sweet vegetables.",
    ingredients: [
      {
        id: "cream-cheese-frosting",
        name: "Cream Cheese",
        originCity: "New York",
        originCountry: "United States",
        originLat: 40.71,
        originLng: -74.0,
        history:
          "Modern cream cheese was standardized in the U.S. in the late 19th century and later adopted into European bakeries as a frosting base for cakes like this one.",
      },
    ],
  },
  {
    id: "krustenbraten-semmel",
    name: "Krustenbraten-Semmel",
    city: "Munich",
    country: "Germany",
    lat: 48.1358,
    lng: 11.5764,
    videoId: "t68rZKi2-0g",
    review:
      "Purchased at the Landmetzgerei Friedl butcher shop in the Viktualienmarkt. The most traditional advertisement I saw was the Leberkässemmel, with a slice of meatloaf in between the bun, but the crispy pork belly looked much too juicy to pass up. I dare say I made the right choice, though I wish I doused it in mustard and that the sauerkraut had a little more flavor. As you probably noticed, I removed the top bun. Needed to amend the filling to bread ratio.",
    history:
      "Krustenbraten (crispy roast pork with crackling) is a Bavarian butcher-shop staple, traditionally sold by weight and served on a bread roll (Semmel) as an inexpensive, hearty market lunch.",
    ingredients: [
      {
        id: "pork-belly",
        name: "Pork Belly",
        originCity: "Bavaria",
        originCountry: "Germany",
        originLat: 48.7,
        originLng: 11.5,
        history:
          "Pork roasting traditions are central to Bavarian cuisine, with crackling-skin roasts documented in regional cookbooks since at least the 19th century.",
      },
      {
        id: "bread-roll-semmel",
        name: "Bread Roll (Semmel)",
        originCity: "Vienna",
        originCountry: "Austria",
        originLat: 48.21,
        originLng: 16.37,
        history:
          "The Semmel roll has roots in Viennese baking traditions that spread throughout the Austro-Bavarian region by the 18th century.",
      },
      {
        id: "sauerkraut",
        name: "Sauerkraut",
        originCity: "Northern China",
        originCountry: "China",
        originLat: 39.9,
        originLng: 116.4,
        history:
          "Fermented cabbage traditions trace back over two thousand years to China, later spreading to Europe via Central Asia and becoming a German staple by the medieval period.",
      },
    ],
  },
  {
    id: "rhubarb-bread-pudding",
    name: "Rhubarb",
    city: "Munich",
    country: "Germany",
    lat: 48.1345,
    lng: 11.578,
    review:
      "Purchased at Café Fräulein nearby the Viktualienmarkt. Germans love their rhubarb. This one was baked into bread pudding and sat in a pool of vanilla custard. I still don't really get the draw of rhubarb, though I never was a soggy fruit girl, and never understood an ingredient that needs to be paired with loads of sugar to be edible. The cashier complimented my dress twice even though I wore it inside out (once in german).",
    history:
      "Rhubarb was introduced to European kitchens as a food (rather than only medicine) in the 18th century once sugar became more affordable, and became a popular spring baking ingredient across Germany, often paired with custard or bread pudding.",
    ingredients: [
      {
        id: "rhubarb-stalk",
        name: "Rhubarb",
        originCity: "Western China",
        originCountry: "China",
        originLat: 35.0,
        originLng: 103.0,
        history:
          "Rhubarb originated in Asia, initially valued in China for medicinal root use, before spreading to Europe and being adopted as a culinary ingredient by the 1700s.",
      },
      {
        id: "vanilla-custard",
        name: "Vanilla",
        originCity: "Papantla",
        originCountry: "Mexico",
        originLat: 20.45,
        originLng: -97.32,
        history:
          "Vanilla was first cultivated by the Totonac people of eastern Mexico and brought to Europe by Spanish colonizers in the 16th century.",
      },
      {
        id: "stale-bread-pudding",
        name: "Stale Bread",
        originCity: "Central Europe",
        originCountry: "Germany",
        originLat: 51.0,
        originLng: 10.0,
        history:
          "Bread pudding-style dishes developed across Europe as a way to use up stale bread, a frugal tradition dating to the medieval period.",
      },
    ],
  },
  {
    id: "schnitzel",
    name: "Schweineschnitzel Wiener Art",
    city: "Tegernsee",
    country: "Germany",
    lat: 47.7078,
    lng: 11.7562,
    review:
      "Ordered at the Bräustüberl Tegernsee. This was incredible. A simply pork cutlet perfectly breaded, fried, salted and lemoned, though I wish I asked for another lemon slice and some mustard packets. Unfortunately, I was too busy eating. Paired with a scrumptilious cucumber potato salad.",
    history:
      "Schweineschnitzel (breaded, pan-fried pork cutlet) is closely associated with Wiener Schnitzel from Vienna, which must be made with veal. Origins may trace back to breaded cutlet dishes from Northern Italy (cotoletta alla milanese); it became a broader Central European staple by the 19th century.",
    ingredients: [
      {
        id: "veal-cutlet",
        name: "Veal Cutlet",
        originCity: "Vienna",
        originCountry: "Austria",
        originLat: 48.21,
        originLng: 16.37,
        history:
          "Thin-pounded veal cutlets became standardized as Wiener Schnitzel in Vienna by the 19th century, spreading throughout Bavaria and the wider Alpine region.",
      },
      {
        id: "breadcrumbs",
        name: "Breadcrumbs",
        originCity: "Milan",
        originCountry: "Italy",
        originLat: 45.46,
        originLng: 9.19,
        history:
          "Breading and pan-frying cutlets is often traced to Milanese cotoletta, with a popular (if disputed) legend that the technique traveled north into Austria and Bavaria.",
      },
    ],
  },
  {
    id: "kaiserschmarrn",
    name: "Kaiserschmarrn",
    city: "Munich",
    country: "Germany",
    lat: 48.137,
    lng: 11.5753,
    videoId: "VuMkKBZ8dsc",
    review:
      "Purchased at Wildmosers Restaurant-Cafe am Marienplatz. This was a delicious dish consumed in perfect view of the Marienplatz glockenspiel. Purchased some regional strawberries earlier that day, washed them in a public fountain, then poured them onto this dish. These are the superior pancakes. Light, fluffy, each scrambled piece fried golden-brown in butter, sprinkled with powder sugar and served with sweetened apple sauce. Will be recreating this at home.",
    history:
      "Kaiserschmarrn (shredded caramelized pancake) is an Austro-Bavarian dish said to date to the late 19th-century Habsburg court, with a popular legend crediting Emperor Franz Joseph I's chefs; it spread widely into Bavaria given the shared Alpine culinary culture.",
    ingredients: [
      {
        id: "pancake-batter",
        name: "Pancake Batter",
        originCity: "Vienna",
        originCountry: "Austria",
        originLat: 48.21,
        originLng: 16.37,
        history:
          "The light, souffléd pancake batter style is associated with 19th-century Viennese imperial kitchens before spreading into Bavaria.",
      },
      {
        id: "applesauce",
        name: "Apple Sauce",
        originCity: "Central Asia",
        originCountry: "Kazakhstan",
        originLat: 43.2,
        originLng: 76.9,
        history:
          "Apples originated in the wild forests of Central Asia and were cultivated across Europe for centuries, becoming a common accompaniment to German and Austrian sweet dishes.",
      },
    ],
  },
  {
    id: "panini-mortadella",
    name: "Panini",
    city: "Bologna",
    country: "Italy",
    lat: 44.493,
    lng: 11.3423,
    review:
      "Purchased at Pan 8, through a friend's recommendation. I've since realized that I am not a big fan of Italian sandwich bread or grilled, thick cut mortadella but the fig jam and crispy onions and burrata were good. I will always prefer a wet, saucy cheesy sandwich.",
    history:
      "Mortadella is a Bologna specialty with origins tracing to Roman-era cured pork preparations, refined into its modern form by Bolognese butchers by the Renaissance.",
    ingredients: [
      {
        id: "mortadella",
        name: "Mortadella",
        originCity: "Bologna",
        originCountry: "Italy",
        originLat: 44.49,
        originLng: 11.34,
        history:
          "Mortadella has been produced in Bologna since at least the Middle Ages, protected today under EU geographic indication as Mortadella Bologna.",
      },
      {
        id: "fig-jam",
        name: "Fig Jam",
        originCity: "Anatolia",
        originCountry: "Turkey",
        originLat: 38.0,
        originLng: 30.0,
        history:
          "Figs have been cultivated across the Mediterranean and Near East for thousands of years, with fig preserves a long-standing Italian pantry staple.",
      },
      {
        id: "burrata",
        name: "Burrata",
        originCity: "Andria",
        originCountry: "Italy",
        originLat: 41.23,
        originLng: 16.3,
        history:
          "Burrata cheese was developed in Puglia, southern Italy, in the early 20th century as a way to use up scraps of mozzarella curd.",
      },
    ],
  },
  {
    id: "lampredotto",
    name: "Lampredotto",
    city: "Florence",
    country: "Italy",
    lat: 43.7699,
    lng: 11.254,
    videoId: "DcO3bN2Jzi4",
    review:
      "Purchased from a street vendor called Chiosco del Lampredotto. This is a Florence special. Lampredotto is made from the cows fourth stomach while tripe is made from the first three chambers (the more you know!). I had the sandwich after visiting the Uffitzi museum. They gut out the bread to fit more meat in it. Took one bite and decided I needed straight lampredotto for dinner. I love the texture, the juiciness, and the green sauce they put on top of it but you can tell this was a grease monster and my stomach was struggling.",
    history:
      "Lampredotto is a Florentine street-food dish dating to at least the medieval period, when nose-to-tail cooking made use of the cow's fourth stomach (abomasum), historically sold by street vendors to the city's working class.",
    ingredients: [
      {
        id: "beef-abomasum",
        name: "Beef Stomach (Abomasum)",
        originCity: "Florence",
        originCountry: "Italy",
        originLat: 43.77,
        originLng: 11.26,
        history:
          "Florentine offal cookery developed as a practical, low-waste tradition, with lampredotto stands documented in the city since at least the 1800s.",
      },
      {
        id: "salsa-verde",
        name: "Green Sauce (Salsa Verde)",
        originCity: "Tuscany",
        originCountry: "Italy",
        originLat: 43.5,
        originLng: 11.0,
        history:
          "Tuscan salsa verde, made from parsley, capers, and garlic, has long accompanied boiled and offal meats in regional cuisine.",
      },
      {
        id: "panino-roll",
        name: "Bread Roll",
        originCity: "Tuscany",
        originCountry: "Italy",
        originLat: 43.5,
        originLng: 11.0,
        history:
          "Tuscan bread, traditionally unsalted, forms the base of the lampredotto panino, hollowed out to hold more filling.",
      },
    ],
  },
  {
    id: "tortellini-en-brodo",
    name: "Tortellini en Brodo",
    city: "Bologna",
    country: "Italy",
    lat: 44.4971,
    lng: 11.3475,
    review:
      "This was my second meal at Osteria dell'Orsa. You can always trust Italians to cook their pasta al dente. These tortellini had the most incredible bounce, filled with meat, in a broth of soup. Dumped a pile of Parmesan onto every spoonful and it was deeelightful. Me and Fern finished this meal is no time.",
    history:
      "Tortellini in brodo is a signature dish of Emilia-Romagna, with legend tracing the pasta's navel-like shape to a 12th-14th century tale of an innkeeper inspired by a goddess's navel; it's traditionally served during winter holidays in Bologna and Modena.",
    ingredients: [
      {
        id: "tortellini-pasta",
        name: "Tortellini Pasta",
        originCity: "Bologna",
        originCountry: "Italy",
        originLat: 44.49,
        originLng: 11.34,
        history:
          "Stuffed ring-shaped pasta developed in Emilia-Romagna, with the earliest documented recipes dating to the Renaissance period.",
      },
      {
        id: "meat-broth",
        name: "Meat Broth",
        originCity: "Emilia-Romagna",
        originCountry: "Italy",
        originLat: 44.6,
        originLng: 10.9,
        history:
          "Slow-simmered capon or beef broth has long been a base for regional Emilian soups, especially served at winter and holiday meals.",
      },
      {
        id: "parmesan",
        name: "Parmesan",
        originCity: "Parma",
        originCountry: "Italy",
        originLat: 44.8,
        originLng: 10.33,
        history:
          "Parmigiano-Reggiano cheese has been produced in the Parma/Reggio Emilia area since roughly the 13th century by Benedictine monks.",
      },
    ],
  },
  {
    id: "crema-catalana",
    name: "Crema Catalana",
    city: "Barcelona",
    country: "Spain",
    lat: 41.3874,
    lng: 2.1686,
    videoId: "WUO6JM0H4b4",
    review:
      "Stumbled on Sucre Cremat in a Barcelona alleyway. A sweet pudding not so dissimilar from crème brûlée, however much silkier, with more complex flavor profiles such as lemon, orange, and cinnamon. Feels a bit less sweet as well. I prefer a thick crème brûlée but this was certainly an enjoyable experience.",
    history:
      "Crema catalana is considered one of Europe's oldest custard desserts, with recipes documented in Catalonia since at least the medieval period — likely predating French crème brûlée, which some food historians believe was influenced by it.",
    ingredients: [
      {
        id: "milk-custard",
        name: "Milk & Egg Custard Base",
        originCity: "Catalonia",
        originCountry: "Spain",
        originLat: 41.5,
        originLng: 1.5,
        history:
          "Egg-and-milk custard desserts have roots across medieval Europe, with Catalonia developing its own citrus-and-cinnamon-spiced version by at least the 14th century.",
      },
      {
        id: "citrus-zest",
        name: "Lemon & Orange Zest",
        originCity: "Valencia",
        originCountry: "Spain",
        originLat: 39.47,
        originLng: -0.38,
        history:
          "Citrus cultivation was introduced to Spain by Arab traders and cultivated widely by the medieval period.",
      },
      {
        id: "cinnamon-crema",
        name: "Cinnamon",
        originCity: "Kandy",
        originCountry: "Sri Lanka",
        originLat: 7.29,
        originLng: 80.63,
        history:
          "Cinnamon reached medieval Iberia via Arab and Mediterranean spice trade routes.",
      },
    ],
  },
  {
    id: "patatas-bravas",
    name: "Patatas Bravas",
    city: "Barcelona",
    country: "Spain",
    lat: 41.3812,
    lng: 2.1811,
    review:
      "Ordered at Bo de B. Consumed these patatas bravas alongside some 5 euro loaded Mediterranean bocadillos. These potatoes were crisped by a pan stove, rather than a deep fryer and doused with a few incredible sauces. Still prefer a curly fry as my method of fried potato consumption but with the sauces this comes in a close 2nd.",
    history:
      "Patatas bravas emerged in Madrid tapas bars in the mid-20th century as fried potatoes served with a spicy tomato-paprika sauce, later spreading nationwide (including Barcelona), where an aioli or spicy mayo topping is also common.",
    ingredients: [
      {
        id: "potato-bravas",
        name: "Potato",
        originCity: "Lake Titicaca",
        originCountry: "Peru",
        originLat: -15.9,
        originLng: -69.3,
        history:
          "Potatoes were domesticated in the Andes and brought to Spain by the 16th century.",
      },
      {
        id: "brava-sauce",
        name: "Spicy Tomato Sauce (Salsa Brava)",
        originCity: "Madrid",
        originCountry: "Spain",
        originLat: 40.42,
        originLng: -3.7,
        history:
          "The paprika-spiced tomato sauce was popularized in Madrid tapas culture in the 1950s-60s, with paprika itself introduced from the Americas.",
      },
      {
        id: "aioli",
        name: "Aioli",
        originCity: "Catalonia",
        originCountry: "Spain",
        originLat: 41.5,
        originLng: 1.5,
        history:
          "Garlic-and-oil aioli has ancient Mediterranean roots and is a staple Catalan condiment.",
      },
    ],
  },
  {
    id: "pan-amb-tomaquet-sabadell",
    name: "Pan Amb Tomàquet",
    city: "Sabadell",
    country: "Spain",
    lat: 41.5483,
    lng: 2.1075,
    videoId: "J4seDl1Oh8Y",
    review:
      "Prepared by my friend Andrés family in Sabadell. They treated me so well, insisting on cooking every meal during my stay so that I could experience traditional Catalan cuisine. We made our own breakfast this morning. Rub a bit of tomato on a piece of toast, drizzle with a bit of olive oil and a pinch of salt and that's the dish. Also the egg seems to always be in pancake form but the catalonians call it a tortilla. Super into it.",
    history:
      "Pa amb tomàquet is a 19th-century Catalan tradition of rubbing toasted bread with ripe tomato, oil, and salt — a practical way to soften stale bread that became a beloved daily staple across Catalonia.",
    ingredients: [
      {
        id: "tomato-sabadell",
        name: "Tomato",
        originCity: "Cusco",
        originCountry: "Peru",
        originLat: -13.53,
        originLng: -71.97,
        history:
          "Tomatoes were domesticated in the Andes/Mesoamerica and brought to Spain in the 16th century, adopted enthusiastically in Catalonia by the 1800s.",
      },
      {
        id: "olive-oil-sabadell",
        name: "Olive Oil",
        originCity: "Athens",
        originCountry: "Greece",
        originLat: 37.97,
        originLng: 23.72,
        history:
          "Olive cultivation spread from Greece through Roman-era Hispania, with Spain becoming the world's largest olive oil producer today.",
      },
      {
        id: "spanish-tortilla",
        name: "Spanish Tortilla (Egg & Potato)",
        originCity: "Navarre",
        originCountry: "Spain",
        originLat: 42.7,
        originLng: -1.6,
        history:
          "The potato-and-egg tortilla española is believed to have originated in early 19th-century Spain, becoming a nationwide breakfast and tapas staple.",
      },
    ],
  },
  {
    id: "pasteis-de-nata",
    name: "Pastéis de Nata",
    city: "Lisboa",
    country: "Portugal",
    lat: 38.7788,
    lng: -9.132,
    review:
      "Purchased a few minutes before boarding. Obviously I've had better, in the heart of Portugal, but I was craving a sweet treat on my layover in Lisboa. The cinnamon blanket covered up the staleness and over-sweetness and it wasn't half bad. I do prefer a shortcrust casing, though (Asian egg tarts FTW).",
    history:
      "Pastéis de nata were created by Catholic monks at the Jerónimos Monastery in Belém, Lisbon, before the 18th century, using egg yolks left over from convent laundry starching; the recipe was later commercialized and sold outside the monastery after Portugal's 1820 liberal revolution.",
    ingredients: [
      {
        id: "egg-custard-nata",
        name: "Egg Custard",
        originCity: "Belém, Lisbon",
        originCountry: "Portugal",
        originLat: 38.7,
        originLng: -9.2,
        history:
          "The rich egg-yolk custard filling reflects a convent-kitchen tradition of using surplus egg yolks, a common practice across 18th-century Portuguese monasteries.",
      },
      {
        id: "puff-pastry",
        name: "Puff Pastry",
        originCity: "Lisbon",
        originCountry: "Portugal",
        originLat: 38.72,
        originLng: -9.14,
        history:
          "Laminated puff pastry techniques, likely influenced by broader European (possibly French/Moorish-influenced Iberian) baking traditions, form the crisp shell of the tart.",
      },
      {
        id: "cinnamon-nata",
        name: "Cinnamon",
        originCity: "Kandy",
        originCountry: "Sri Lanka",
        originLat: 7.29,
        originLng: 80.63,
        history:
          "Portugal's maritime spice trade brought Ceylon cinnamon directly from its colonial holdings in Sri Lanka, making it a defining garnish for the tart.",
      },
    ],
  }
];
