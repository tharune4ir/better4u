export interface ProductSKU {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  badge: string; // e.g. "Live Probiotic", "Low Sugar"
  price: number; // in INR (₹)
  imagePlaceholder: string; // "lime" | "ginger" | "spice" | "berry"
  glowColor: string; // css gradient/color for visual ambience
  accentColor: string; // hex color for theme matching
  specs: {
    cfu: string;
    sugar: string;
    calories: string;
    benefits: string;
  };
  ingredients: string[];
  tasteHighlight: string;
  replaces: string;
}

// 4 Flagship Probiotic Soda SKUs (Simple English Flavour Names & Value-Premium Pricing)
export const MOCK_PRODUCTS: ProductSKU[] = [
  {
    id: "soda-lime",
    name: "Lime",
    category: "Probiotic Soda",
    tagline: "Lime & Roasted Cumin Sparkler",
    description: "A crisp, refreshing reimagination of the classic fresh lime soda. Blended with real organic lime juice, a touch of dark raw sweetness, and a finishing pinch of roasted cumin and black salt.",
    badge: "1.2 Billion Active Cultures",
    price: 60,
    imagePlaceholder: "lime",
    glowColor: "rgba(163, 230, 53, 0.15)", // pale lime yellow-teal
    accentColor: "#A3E635",
    specs: {
      cfu: "1.2 Billion Live Gut Cultures",
      sugar: "4.8g per 100ml (60% less than standard soda)",
      calories: "22 kcal per 100ml",
      benefits: "Supports digestive balance & post-meal comfort"
    },
    ingredients: [
      "Pure Spring Water",
      "Organic Lime Juice (8%)",
      "Raw Sugar (microbe food)",
      "Traditional Live Starter",
      "Roasted Cumin (Jeera)",
      "Black Salt (Kala Namak)",
      "Natural Active Probiotics"
    ],
    tasteHighlight: "Bright, zesty citrus notes upfront with an earthy, warm cumin finish. Perfectly carbonated for a refreshing post-meal palette cleanser.",
    replaces: "Nimbu Soda / Fresh Lime Soda"
  },
  {
    id: "soda-ginger",
    name: "Ginger",
    category: "Probiotic Soda",
    tagline: "Bold Ginger & Citrus Infused Tonic",
    description: "A throat-soothing ginger soda built to replace sweet carbonated ginger beers. Organic ginger root meets zesty lime oil, delivering a sharp, spicy bite that feels warm and comforting.",
    badge: "1.5 Billion Active Cultures",
    price: 60,
    imagePlaceholder: "ginger",
    glowColor: "rgba(245, 158, 11, 0.15)", // warm amber
    accentColor: "#F59E0B",
    specs: {
      cfu: "1.5 Billion Live Gut Cultures",
      sugar: "5.2g per 100ml (55% less than standard ginger beer)",
      calories: "25 kcal per 100ml",
      benefits: "Soothes the stomach & aids natural digestion"
    },
    ingredients: [
      "Pure Spring Water",
      "Organic Ginger Root Extract (12%)",
      "Raw Sugar (fed to cultures)",
      "Traditional Live Starter",
      "Fresh Citrus Oils",
      "Natural Active Probiotics"
    ],
    tasteHighlight: "Fiery ginger spice that hits the back of the throat, balanced by clean carbonation and a refreshing citrus lift.",
    replaces: "Goli Soda / Ginger Beer"
  },
  {
    id: "soda-spice",
    name: "Spice",
    category: "Probiotic Soda",
    tagline: "Earthy Cumin & Mint Digestif",
    description: "An aromatic botanical soda inspired by traditional spice-based digestifs. Blends roasted cumin, dry mango, mint, and black pepper for a complex, savory finish.",
    badge: "1.2 Billion Active Cultures",
    price: 60,
    imagePlaceholder: "spice",
    glowColor: "rgba(180, 83, 9, 0.15)", // copper brown
    accentColor: "#B45309",
    specs: {
      cfu: "1.2 Billion Live Gut Cultures",
      sugar: "4.5g per 100ml (65% less than sweet carbonated drinks)",
      calories: "19 kcal per 100ml",
      benefits: "Relieves bloating & helps process heavy meals"
    },
    ingredients: [
      "Pure Spring Water",
      "Raw Sugar (fermentation base)",
      "Traditional Live Starter",
      "Roasted Cumin Powder",
      "Dry Mango (Amchur)",
      "Black Pepper Extract",
      "Fresh Mint oil",
      "Black Salt",
      "Natural Active Probiotics"
    ],
    tasteHighlight: "Intensely savory, cooling mint aroma, followed by a tangy cumin and peppery pop. Designed to be enjoyed chilled right after a heavy lunch.",
    replaces: "Masala Soda / Jaljeera"
  },
  {
    id: "soda-berry",
    name: "Berry",
    category: "Probiotic Soda",
    tagline: "Wild Jamun & Purple Fruit Sparkler",
    description: "A gorgeous, deep purple fruit soda crafted with hand-harvested wild jamun berries. Rich, tangy, slightly dry, and packed with natural fruit antioxidants that glow through glass.",
    badge: "1.3 Billion Active Cultures",
    price: 60,
    imagePlaceholder: "berry",
    glowColor: "rgba(139, 92, 246, 0.15)", // deep purple-violet
    accentColor: "#8B5CF6",
    specs: {
      cfu: "1.3 Billion Live Gut Cultures",
      sugar: "5.5g per 100ml (pure fruit sugars + minimal raw sugar)",
      calories: "26 kcal per 100ml",
      benefits: "High in antioxidants & supports overall gut balance"
    },
    ingredients: [
      "Pure Spring Water",
      "Wild Jamun Berry Pulp (10%)",
      "Fresh Organic Lime Juice",
      "Raw Sugar (microbe food)",
      "Traditional Live Starter",
      "Natural Active Probiotics"
    ],
    tasteHighlight: "A juicy jamun flavor with a sophisticated, slightly astringent berry finish that leaves you craving the next sip.",
    replaces: "Sugary Colas / Sweet Berry Sodas"
  }
];
