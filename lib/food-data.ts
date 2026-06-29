export interface PlantCategory {
  id: string;
  name: string;
  pointsRule: string;
  iconName: string;
  description: string;
  items: string[];
}

export interface FermentCategory {
  id: string;
  name: string;
  iconName: string;
  description: string;
  items: {
    name: string;
    details: string;
    isLive: boolean;
  }[];
}

export interface Recipe {
  name: string;
  description: string;
  tags: string[];
  gutBenefits: string[];
}

export interface MealCategory {
  id: string;
  name: string;
  iconName: string;
  recipes: Recipe[];
}

export interface GutPrinciple {
  title: string;
  metric: string;
  description: string;
  iconName: string;
}

export const GUT_PRINCIPLES: GutPrinciple[] = [
  {
    title: "The 30+ Plants Engine",
    metric: "30+ types / week",
    description: "Consume at least 30 different whole plants weekly (veg, grains, legumes, nuts, seeds, spices) to optimize microbiome diversity.",
    iconName: "Leaf"
  },
  {
    title: "The 3-Ferments Rhythm",
    metric: "3 servings / day",
    description: "Incorporate three servings of live culture fermented foods (curd, chaas, kanji, ambali, kraut) daily to lower inflammatory markers.",
    iconName: "Waves"
  },
  {
    title: "Polyphenol Shield",
    metric: "Dark & Bitter",
    description: "Prioritize bitter and colorful polyphenol-rich foods (amla, jamun, beetroot, dark chocolate >=70%, EVOO) which act as fuel for gut bacteria.",
    iconName: "Sparkles"
  },
  {
    title: "The Overnight Gap",
    metric: "12-14 hr fast",
    description: "Keep a 12-14 hour overnight fast to allow the gut lining and migratory motor complex (MMC) time to rest and repair.",
    iconName: "Clock"
  }
];

export const PLANT_CATEGORIES: PlantCategory[] = [
  {
    id: "gourds",
    name: "Gourds & Pumpkins",
    pointsRule: "1 point per different type",
    iconName: "Droplet",
    description: "Gentle on a healing gut and highly hydrating.",
    items: [
      "Bottle Gourd (Lauki)",
      "Ridge Gourd (Turai)",
      "Snake Gourd",
      "Ash Gourd (Petha)",
      "Pointed Gourd (Parwal)",
      "Ivy Gourd (Tindora)",
      "Apple Gourd (Tinda)",
      "Bitter Gourd (Karela)",
      "Pumpkin (Kaddu)",
      "Sponge Gourd (Gilki)",
      "Spiny Gourd (Kantola)"
    ]
  },
  {
    id: "cruciferous",
    name: "Cruciferous & Radish",
    pointsRule: "1 point per different type",
    iconName: "Activity",
    description: "Contain glucosinolates, supporting cellular repair processes.",
    items: [
      "Cauliflower",
      "Cabbage",
      "Broccoli",
      "Knol-Khol (Kohlrabi)",
      "Radish (Mooli)",
      "Turnip (Shalgam)",
      "Mustard Greens (Sarson)"
    ]
  },
  {
    id: "greens",
    name: "Leafy Greens",
    pointsRule: "1 point per type",
    iconName: "Leaf",
    description: "Packed with iron, magnesium, and prebiotic fiber.",
    items: [
      "Spinach (Palak)",
      "Amaranth Leaves (Chaulai)",
      "Fenugreek (Methi)",
      "Drumstick / Moringa Leaves",
      "Colocasia Leaves (Arbi Patta)",
      "Cowpea Leaves",
      "Dill (Sua)",
      "Malabar Spinach (Poi)",
      "Curry Leaves",
      "Coriander & Mint",
      "Gongura (Andhra sorrel)",
      "Ponnanganni Greens"
    ]
  },
  {
    id: "other-veg",
    name: "Other Colorful Vegetables",
    pointsRule: "1 point per color / type",
    iconName: "Paintbrush",
    description: "Colors signify different polyphenol profiles.",
    items: [
      "Okra (Bhindi)",
      "Brinjal (purple / green)",
      "Tomato",
      "Red & Spring Onion",
      "Capsicum (Green / Red / Yellow)",
      "Carrot (Orange / Black)",
      "Beetroot",
      "French & Cluster Beans",
      "Green Peas",
      "Raw Banana / Plantain",
      "Sweet Potato",
      "Colocasia (Arbi)",
      "Lotus Stem",
      "Zucchini",
      "Mushrooms"
    ]
  },
  {
    id: "legumes",
    name: "Legumes, Dals & Pulses",
    pointsRule: "1 point per type",
    iconName: "Layers",
    description: "The primary source of protein and high-power prebiotic fiber.",
    items: [
      "Whole & Split Moong Dal",
      "Masoor Dal (Red Lentil)",
      "Toor / Arhar Dal",
      "Urad Dal",
      "Chana Dal & Kala Chana",
      "Kabuli Chana (Chickpeas)",
      "Rajma (Kidney Beans)",
      "Lobia (Black-eyed Peas)",
      "Soybean / Edamame",
      "Horse Gram (Kulthi)",
      "Moth Beans (Matki)"
    ]
  },
  {
    id: "grains",
    name: "GF Whole Grains & Millets",
    pointsRule: "1 point per grain type",
    iconName: "Globe",
    description: "Gluten-free grains that replace refined wheat or processed carbs.",
    items: [
      "Ragi (Finger Millet)",
      "Jowar (Sorghum)",
      "Bajra (Pearl Millet)",
      "Foxtail Millet",
      "Little Millet (Samai)",
      "Kodo Millet",
      "Barnyard Millet (Sanwa)",
      "Proso & Browntop Millet",
      "Brown, Red & Black Rice",
      "Hand-pounded Rice",
      "Quinoa",
      "Buckwheat (Kuttu)",
      "Amaranth (Rajgira)"
    ]
  },
  {
    id: "nuts-seeds",
    name: "Nuts, Seeds & Spices",
    pointsRule: "1 point / nut, ¼ point / spice",
    iconName: "Sparkles",
    description: "Provide healthy fats (Omega-3 ALA) and digestion-supporting phytochemicals.",
    items: [
      "Almonds & Walnuts",
      "Cashews & Pistachios",
      "Flaxseeds & Chia Seeds",
      "Pumpkin & Sunflower Seeds",
      "White & Black Sesame (Til)",
      "Melon Seeds (Magaz)",
      "Garden Cress & Basil Seeds",
      "Turmeric, Cumin & Mustard Seeds",
      "Fennel, Ajwain & Hing",
      "Ginger, Garlic & Cloves",
      "Cinnamon, Cardamom & Pepper"
    ]
  },
  {
    id: "hidden",
    name: "Hidden Polyphenols",
    pointsRule: "¼ point each",
    iconName: "Heart",
    description: "Rich botanical extracts that support microbial growth.",
    items: [
      "Filter Coffee",
      "Green & Black Tea",
      "Dark Chocolate (>=70% Cacao)",
      "Cold Pressed EVOO",
      "Raw Cacao Nibs"
    ]
  }
];

export const FERMENT_CATEGORIES: FermentCategory[] = [
  {
    id: "dairy-ferments",
    name: "Beneficial Dairy Ferments",
    iconName: "Compass",
    description: "Home-cultured dairy that provides convenient live-culture probiotics (plain fluid milk is excluded).",
    items: [
      {
        name: "Homemade Set Curd / Dahi",
        details: "Live culture set fresh at home; left a bit longer for rich lactobacillus counts.",
        isLive: true
      },
      {
        name: "Spiced Buttermilk / Chaas",
        details: "Dahi thinned with water, seasoned with ginger, green chilli, jeera, and curry leaves.",
        isLive: true
      },
      {
        name: "Savory Lassi",
        details: "Whipped set curd, salt-spiced with fresh mint and roasted cumin.",
        isLive: true
      },
      {
        name: "Traditional Kadhi / Raita",
        details: "Curd cooked gently with besan or served raw with grated cucumber or beetroot.",
        isLive: false
      },
      {
        name: "Fresh Paneer",
        details: "Home-set milk solids providing easily digestible protein and calcium (non-live).",
        isLive: false
      }
    ]
  },
  {
    id: "non-dairy-ferments",
    name: "Non-Dairy Live Ferments",
    iconName: "Activity",
    description: "Indigenous fermented drinks and foods packed with diverse wild yeast and bacterial strains.",
    items: [
      {
        name: "Kanji",
        details: "Fermented black carrot or beetroot water seasoned with mustard powder and sea salt.",
        isLive: true
      },
      {
        name: "Neer-Aagaram / Pazhaya Sadam",
        details: "Leftover parboiled rice soaked overnight in water, creating a rich prebiotic/probiotic broth.",
        isLive: true
      },
      {
        name: "Ragi Ambali",
        details: "Fermented finger-millet porridge cooled and set with a spoonful of raw curd.",
        isLive: true
      },
      {
        name: "Sauerkraut & Kimchi",
        details: "Salted cabbage fermented in its own juices; rich in lactic acid bacteria.",
        isLive: true
      },
      {
        name: "Kombucha & Water Kefir",
        details: "Effervescent fermented tea or sugar-water using symbiotic cultures.",
        isLive: true
      }
    ]
  },
  {
    id: "cooked-ferments",
    name: "Cooked Fermented Batters",
    iconName: "Flame",
    description: "Naturally wild-fermented batters that support gut health (note: cooking reduces live counts, pair with raw curd).",
    items: [
      {
        name: "Millet & Urad Idli",
        details: "Rice or foxtail/proso millet ground with urad dal and fermented 8-12 hours before steaming.",
        isLive: false
      },
      {
        name: "Dosa & Uttapam",
        details: "Fermented millet-lentil griddle cakes; easily digestible due to phytate breakdown.",
        isLive: false
      },
      {
        name: "Moong Dal Pesarattu",
        details: "Fermented whole green gram batter made crispy on the iron tawa.",
        isLive: false
      },
      {
        name: "Besan Dhokla / Khaman",
        details: "Steamed fermented chickpea flour sponge (avoiding wheat/semolina).",
        isLive: false
      }
    ]
  }
];

export const MEALS_RECIPES: MealCategory[] = [
  {
    id: "breakfast",
    name: "Nourishing Breakfasts",
    iconName: "Sun",
    recipes: [
      {
        name: "Ragi & Urad Idli",
        description: "Finger millet and split black lentil batter, wild-fermented overnight and steam-cooked.",
        tags: ["Gluten-Free", "Fermented", "Warm"],
        gutBenefits: ["Low phytate", "Easy digestive baseline", "Calcium-rich ragi"]
      },
      {
        name: "Millet Pesarattu with Ginger Chutney",
        description: "Crisp crepe made of whole green moong batter, topped with minced ginger and onions.",
        tags: ["High Protein", "Prebiotic", "Crispy"],
        gutBenefits: ["Prebiotic onion & ginger", "Stable glucose release", "Complete amino profile"]
      },
      {
        name: "Ragi Ambali Porridge",
        description: "Traditional fermented finger millet gruel, thinned with fresh buttermilk and curry leaves.",
        tags: ["Live Probiotics", "Hydrating", "Cooling"],
        gutBenefits: ["Direct live cultures", "High mineral availability", "Anti-bloating jeera"]
      },
      {
        name: "Curd, Berries & Seed Bowl",
        description: "Thick home-set curd layered with jamun/pomegranate, toasted flax, chia, and pumpkin seeds.",
        tags: ["Polyphenol", "Omega-3 ALA", "Raw Ferment"],
        gutBenefits: ["Rich lactobacillus load", "Polyphenol defense", "High soluble fibers"]
      }
    ]
  },
  {
    id: "lunch-dinner",
    name: "Lunch & Dinner Mains",
    iconName: "Moon",
    recipes: [
      {
        name: "Foxtail Millet & Moong Khichdi",
        description: "One-pot pressure-cooked split yellow moong and foxtail millet, tempered in pure cow ghee with jeera and ginger.",
        tags: ["Soothing", "Warm", "Monotarget"],
        gutBenefits: ["Butyrate support from ghee", "Gentle on intestinal lining", "Highly bioavailable minerals"]
      },
      {
        name: "Gongura Pappu with Red Rice",
        description: "Tangy Andhra sorrel leaves cooked with toor dal, served with hand-pounded red rice and raw onion slices.",
        tags: ["Acidic / Bitter", "Prebiotic", "High Fiber"],
        gutBenefits: ["Polyphenols from gongura", "Resistant starch from parboiled rice", "Soluble fiber fuel"]
      },
      {
        name: "Palak Paneer Tikka Grid",
        description: "Tender cubes of home-set paneer marinated in fresh curd and mustard oil, grilled with spinach puree.",
        tags: ["High Protein", "Calcium", "Savory"],
        gutBenefits: ["Microbiome-soothing spices", "No fluid dairy bloat", "Muscle-maintaining protein"]
      },
      {
        name: "Jowar Bhakri & Karela Fry",
        description: "Flatbread made from sorghum flour, paired with thinly sliced bitter gourd pan-fried in cold-pressed mustard oil.",
        tags: ["Bitter", "Complex Carbs", "Gluten-Free"],
        gutBenefits: ["Stimulates digestive juices", "Polyphenol load", "Resistant starch scaffold"]
      }
    ]
  },
  {
    id: "beverages",
    name: "Gut Smoothies & Tonics",
    iconName: "GlassWater",
    recipes: [
      {
        name: "Spiced Neer-Mor (Buttermilk)",
        description: "Churned curd diluted with ice-cold water, blended with fresh ginger juice, curry leaves, coriander, and black salt.",
        tags: ["Cooling", "Probiotic", "Post-Meal"],
        gutBenefits: ["Replenishes gut flora", "Ajwain/jeera stops bloating", "Improves hydration state"]
      },
      {
        name: "Purple Polyphenol Shake",
        description: "Gluten-free coconut milk blended with fresh beetroot extract, wild blueberries, chia seeds, and dates.",
        tags: ["Vegan", "Antioxidant", "Polyphenol-Dense"],
        gutBenefits: ["Nitric oxide booster", "Mucilage coating from chia", "Feeds Bifidobacteria"]
      },
      {
        name: "Sattu Sharbat",
        description: "Roasted chickpea flour stirred in water with lemon juice, fresh mint, roasted jeera, and pink salt.",
        tags: ["Protein Drink", "Carminative", "Low Glycemic"],
        gutBenefits: ["Soothing sattu fiber", "Stomach acid support from lemon", "Anti-inflammatory mint"]
      }
    ]
  }
];

export interface KitchenFoundation {
  id: string;
  title: string;
  instruction: string;
}

export interface CoreRecipe {
  id: string;
  title: string;
  ingredients: string[];
  steps: string[];
  whyHeals: string;
}

export const KITCHEN_FOUNDATIONS: KitchenFoundation[] = [
  {
    id: "F1",
    title: "Prep & knife safety",
    instruction: "Claw-grip (fingertips curled under), damp cloth under the board so it can't slip, chop everything before the pan is hot."
  },
  {
    id: "F2",
    title: "Cook millet/brown rice",
    instruction: "1 cup grain : 2.5 cups water. Soak 20–30 min, drain. Pressure cook 3–4 whistles (natural release) OR simmer covered 25–35 min till water gone."
  },
  {
    id: "F3",
    title: "The Tadka (flavour base)",
    instruction: "Heat 1 tbsp ghee/oil on medium → 1 tsp cumin → when it sizzles (~15 sec) add a pinch hing, 1 tsp grated ginger, optional 1 clove chopped garlic, 1 dry red chilli, 1 sprig curry leaves → 20–30 sec."
  },
  {
    id: "F4",
    title: "Universal Dal",
    instruction: "1 cup split moong + 3 cups water + ¼ tsp turmeric + ½ tsp salt → pressure cook 3–4 whistles → mash lightly → finish with a Tadka + lemon + coriander."
  },
  {
    id: "F5",
    title: "Universal Sabzi",
    instruction: "Tadka → ½ onion (soften) → 1 tomato (melt) → ¼ tsp turmeric + ½ tsp salt + ½ tsp coriander powder → 2 cups chopped veg → splash water, cover, low heat 8–15 min → coriander."
  },
  {
    id: "F6",
    title: "Set curd (dahi)",
    instruction: "Warm 500 ml milk to finger-warm (not hot) → stir in 1 tsp old curd → cover, undisturbed, warm spot, 6–8 hr."
  },
  {
    id: "F7",
    title: "Chaas",
    instruction: "½ cup curd + 1.5 cups water + ¼ tsp roasted cumin + pinch salt + 4 curry leaves → whisk 20 sec."
  },
  {
    id: "F8",
    title: "Smoothie",
    instruction: "1 cup liquid + 1 fruit + 1 tbsp seeds + optional greens + pinch cinnamon → blend 60 sec."
  },
  {
    id: "F9",
    title: "Legume safety",
    instruction: "Rajma/chickpeas: soak 8 hr, boil hard ≥10 min, then pressure cook 5–6 whistles till fully soft. (Undercooked kidney beans are toxic.)"
  },
  {
    id: "F10",
    title: "One-pot Khichdi",
    instruction: "See full recipe R1 below for detailed one-pot pressure cooking."
  },
  {
    id: "F11",
    title: "Fermented batter",
    instruction: "3 parts rice/foxtail : 1 part urad, soak 5 hr, grind smooth, add salt, ferment 8–12 hr till risen. (Beginner: buy fresh GF batter, build up.)"
  },
  {
    id: "F12",
    title: "The Plate Formula",
    instruction: "1 ferment + 1 dal/legume + 1 millet/grain + 2 colourful veg + 1 seed sprinkle + spices = ~8–12 plant-points + 1 ferment in one plate."
  }
];

export const CORE_RECIPES: CoreRecipe[] = [
  {
    id: "R1",
    title: "Foxtail–Moong Khichdi (the 'tired day' healer)",
    ingredients: [
      "½ cup foxtail millet",
      "½ cup split moong dal",
      "1 cup soft veg chopped (lauki/carrot/spinach)",
      "1 tbsp ghee",
      "1 tsp cumin",
      "pinch hing",
      "1 tsp grated ginger",
      "¼ tsp turmeric",
      "½ tsp salt",
      "4 cups water"
    ],
    steps: [
      "Rinse millet + dal together 3 times; soak 20 min; drain.",
      "In the pressure cooker, heat ghee on medium; add cumin → wait till it sizzles (~15 sec); add hing + ginger; stir 10 sec.",
      "Add the chopped veg; stir 1 min.",
      "Add drained millet+dal, turmeric, salt, water; stir.",
      "Close lid; pressure cook 3–4 whistles; turn off; let pressure release on its own.",
      "Open, stir; add water if you want it looser."
    ],
    whyHeals: "Moong is the gentlest protein on an inflamed gut; ghee supports the gut lining; one bowl = soft, soothing, complete protein + several plants."
  },
  {
    id: "R2",
    title: "Moong Pesarattu (high-protein crepe)",
    ingredients: [
      "1 cup whole green moong (soaked 5–6 hr)",
      "1\" ginger",
      "1 green chilli",
      "½ tsp salt",
      "½ chopped onion",
      "oil for the pan"
    ],
    steps: [
      "Drain soaked moong; blend with ginger, chilli, salt, and ~½ cup water to a smooth, pourable batter (like thick cream).",
      "Heat a non-stick/iron pan on medium; sprinkle a few drops water — it should sizzle.",
      "Pour a ladle of batter in the centre; using the ladle's back, spread in a spiral into a thin circle.",
      "Drizzle a few drops oil round the edge; scatter chopped onion on top; press lightly.",
      "Cook 2–3 min till the underside is golden and edges lift; flip; 1–2 min more.",
      "Fold and serve with chaas (F7)."
    ],
    whyHeals: "Whole moong = prebiotic fibre + complete protein with no bloat; raw onion + ginger feed good bacteria."
  },
  {
    id: "R3",
    title: "Universal Dal + Brown Rice (the daily anchor)",
    ingredients: [
      "dal per F4",
      "rice per F2",
      "½ raw onion",
      "lemon wedge"
    ],
    steps: [
      "Cook rice (F2).",
      "Cook dal (F4): pressure-cook moong + water + turmeric + salt 3–4 whistles; mash.",
      "Make a Tadka (F3) and pour it sizzling over the dal; stir.",
      "Finish with lemon + coriander.",
      "Serve over rice with raw onion slices."
    ],
    whyHeals: "Dal+rice = complete protein; the tadka spices (cumin, ginger, hing) are anti-bloat; raw onion = prebiotic."
  },
  {
    id: "R4",
    title: "Gongura Pappu (Andhra polyphenol dal)",
    ingredients: [
      "¾ cup toor dal",
      "2 cups gongura (sorrel) leaves washed",
      "¼ tsp turmeric",
      "½ tsp salt",
      "Tadka (F3) with extra garlic + 1 dry red chilli"
    ],
    steps: [
      "Pressure-cook toor dal + 2 cups water + turmeric 4 whistles; mash.",
      "In a pan, wilt the gongura leaves with a splash of water 3–4 min till soft and pulpy.",
      "Stir the wilted gongura into the dal + salt; simmer 3 min.",
      "Make a garlicky Tadka (F3); pour over.",
      "Serve with red rice + raw onion."
    ],
    whyHeals: "Gongura is intensely polyphenol-rich (gut-bacteria fuel); toor dal adds fibre + protein; red rice adds resistant starch."
  },
  {
    id: "R5",
    title: "Any-Vegetable Sabzi (rotate the veg daily)",
    ingredients: [
      "2 cups chopped veg of choice (bhindi / beetroot / pumpkin / lauki-chana / cabbage-carrot / methi-aloo / mixed gourd / drumstick)",
      "1 tbsp oil/ghee",
      "Tadka ingredients per F3",
      "½ onion",
      "1 tomato",
      "¼ tsp turmeric",
      "½ tsp salt",
      "½ tsp coriander powder",
      "splash water",
      "coriander leaves"
    ],
    steps: [
      "Heat ghee/oil and make the Tadka (F3) on medium.",
      "Add ½ onion and sauté until soft.",
      "Add 1 chopped tomato and cook until it melts into the base.",
      "Add ¼ tsp turmeric, ½ tsp salt, and ½ tsp coriander powder.",
      "Add 2 cups chopped vegetables of choice and stir to coat.",
      "Splash with water, cover, and cook on low heat for 8–15 minutes until vegetables are cooked through.",
      "Garnish with fresh coriander leaves."
    ],
    whyHeals: "A different vegetable each day is the single biggest lever for 30+ plants/week = microbiome diversity."
  },
  {
    id: "R6",
    title: "Curd–Berry–Seed Bowl (raw-ferment breakfast)",
    ingredients: [
      "¾ cup home-set curd (F6)",
      "½ cup pomegranate or jamun",
      "1 tbsp ground flaxseed",
      "1 tsp chia seeds",
      "1 tbsp pumpkin seeds"
    ],
    steps: [
      "Spoon home-set curd into a clean bowl.",
      "Top with fresh pomegranate seeds or jamun.",
      "Sprinkle ground flaxseed, chia seeds, and pumpkin seeds on top.",
      "Eat fresh."
    ],
    whyHeals: "Live lactobacillus (raw ferment) + polyphenols + soluble fibre + omega-3 ALA, no cooking."
  },
  {
    id: "R7",
    title: "Ragi Ambali (live, cooling porridge)",
    ingredients: [
      "3 tbsp ragi flour",
      "1.5 cups water",
      "¼ cup chaas (F7)",
      "4 curry leaves",
      "pinch salt"
    ],
    steps: [
      "Whisk ragi flour into 1 cup cold water ensuring zero lumps.",
      "Simmer on low heat, stirring continuously, for 5–6 min until thick.",
      "Remove from heat and let it cool completely to warm/room temp.",
      "Stir in chaas, curry leaves, and a pinch of salt. (Best version: ferment the cooked-and-cooled ragi overnight before adding chaas.)"
    ],
    whyHeals: "Fermented ragi = live cultures + high minerals + gentle fibre."
  },
  {
    id: "R8",
    title: "Spiced Neer-Mor / Buttermilk (post-meal digestive)",
    ingredients: [
      "½ cup curd",
      "1.5 cups cold water",
      "½ tsp ginger juice",
      "¼ tsp roasted cumin",
      "4 curry leaves chopped",
      "fresh coriander",
      "pinch black salt"
    ],
    steps: [
      "Whisk the curd and water together until smooth.",
      "Stir in the ginger juice, roasted cumin, chopped curry leaves, fresh coriander, and a pinch of black salt.",
      "Drink cool after lunch."
    ],
    whyHeals: "Replenishes gut flora; cumin/ginger stop bloating."
  },
  {
    id: "R9",
    title: "Purple Polyphenol Smoothie",
    ingredients: [
      "1 cup coconut milk",
      "¼ cooked beetroot",
      "½ cup blueberries or jamun",
      "1 tsp chia seeds",
      "2 soaked dates"
    ],
    steps: [
      "Add all ingredients to a blender.",
      "Blend on high for 60 seconds until completely smooth.",
      "Serve immediately."
    ],
    whyHeals: "Beetroot + dark berries = dense polyphenols that feed Bifidobacteria; chia mucilage soothes the lining."
  },
  {
    id: "R10",
    title: "Sattu Sharbat (protein + carminative drink)",
    ingredients: [
      "3 tbsp roasted chana (sattu) flour",
      "1.5 cups water",
      "juice of ½ lemon",
      "¼ tsp roasted cumin",
      "few fresh mint leaves",
      "pinch pink salt"
    ],
    steps: [
      "Whisk roasted chana (sattu) flour into cold water until there are no lumps.",
      "Add lemon juice, roasted cumin, pink salt, and crushed mint leaves.",
      "Stir well and serve chilled."
    ],
    whyHeals: "High plant protein + soluble fibre that soothes; lemon + mint aid digestion."
  },
  {
    id: "R11",
    title: "Kanji (homemade probiotic drink)",
    ingredients: [
      "1 black carrot (cut into batons)",
      "¼ beetroot (cut into batons)",
      "4 cups water",
      "2 tsp ground mustard seeds",
      "1 tsp salt"
    ],
    steps: [
      "Place black carrot and beetroot batons in a clean glass jar.",
      "Add water, ground mustard seeds, and salt; stir well.",
      "Cover the jar mouth with a breathable clean cloth secured with a band.",
      "Keep in mild sunlight for 3–5 days, stirring once daily, until it turns pleasantly tangy.",
      "Refrigerate and drink ½ cup daily."
    ],
    whyHeals: "A living vegan ferment seeding diverse bacteria."
  },
  {
    id: "R12",
    title: "Jeera–Ajwain–Saunf Water (the bloat fix)",
    ingredients: [
      "½ tsp cumin seeds (jeera)",
      "½ tsp carom seeds (ajwain)",
      "½ tsp fennel seeds (saunf)",
      "2 cups water"
    ],
    steps: [
      "Combine all seeds with 2 cups of water in a pan.",
      "Boil for 5 minutes, then turn off heat.",
      "Steep for 5 minutes.",
      "Strain and sip warm."
    ],
    whyHeals: "Classic carminatives that calm gas and cramping."
  }
];

export interface FlattenedFoodItem {
  id: string;
  name: string;
  local_name?: string;
  role?: string;
  category: string;
}

export function getPublicFoodUniverse(): FlattenedFoodItem[] {
  const result: FlattenedFoodItem[] = [];
  for (const cat of PLANT_CATEGORIES) {
    for (const item of cat.items) {
      const match = item.match(/^([^(]+)\s*(?:\(([^)]+)\))?$/);
      const name = match ? match[1].trim() : item;
      const local_name = match && match[2] ? match[2].trim() : undefined;
      result.push({
        id: item.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name,
        local_name,
        category: cat.name
      });
    }
  }
  return result;
}

export function resolvePublicRecipe(id: string): CoreRecipe | undefined {
  return CORE_RECIPES.find(r => r.id === id);
}

