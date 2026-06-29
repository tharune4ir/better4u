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
    shelfLife: string;
  };
  ingredients: string[];
  scienceHighlight: string;
  replaces: string;
}

// 4 Flagship Probiotic Soda SKUs (Simple English Flavour Names & Value-Premium Pricing)
export const MOCK_PRODUCTS: ProductSKU[] = [
  {
    id: "soda-lime",
    name: "Lime",
    category: "Probiotic Soda",
    tagline: "Lime & Roasted Cumin Live Sparkler",
    description: "Our crisp, refreshing reimagination of the classic Indian Nimbu Soda. Brewed with a ginger-bug base, real lime juice, and a finishing pinch of roasted cumin and black salt.",
    badge: "1.2B CFU Probiotics",
    price: 60,
    imagePlaceholder: "lime",
    glowColor: "rgba(163, 230, 53, 0.15)", // pale lime yellow-teal
    accentColor: "#A3E635",
    specs: {
      cfu: "1.2 Billion CFU Bacillus coagulans MTCC 5856",
      sugar: "4.8g per 100ml (60% less than standard cola)",
      calories: "22 kcal per 100ml",
      shelfLife: "12 Months (Shelf-Stable, No Fridge Needed)"
    },
    ingredients: [
      "Dechlorinated Filtered Water",
      "Fresh Squeezed Organic Lime Juice (8%)",
      "Raw Sugar (fed to starter cultures)",
      "Ginger Bug Starter Culture",
      "Roasted Cumin (Jeera) Powder",
      "Black Salt (Kala Namak)",
      "Bacillus Coagulans Spore Probiotics"
    ],
    scienceHighlight: "Lime is low-sugar by nature. When cultured with spore-forming Bacillus coagulans, it maintains perfect structural stability and a clean, refreshing pH level.",
    replaces: "Nimbu Soda / Fresh Lime Soda"
  },
  {
    id: "soda-ginger",
    name: "Ginger",
    category: "Probiotic Soda",
    tagline: "Bold Ginger & Citrus Infused Elixir",
    description: "A fiery, full-bodied ginger soda built to replace traditional sweet ginger ales. Real organic ginger root meets lime zest, delivering a warm, throat-soothing bite that lingers.",
    badge: "1.5B CFU Probiotics",
    price: 60,
    imagePlaceholder: "ginger",
    glowColor: "rgba(245, 158, 11, 0.15)", // warm amber
    accentColor: "#F59E0B",
    specs: {
      cfu: "1.5 Billion CFU Bacillus coagulans MTCC 5856",
      sugar: "5.2g per 100ml (55% less than standard ginger beer)",
      calories: "25 kcal per 100ml",
      shelfLife: "12 Months (Shelf-Stable, No Fridge Needed)"
    },
    ingredients: [
      "Dechlorinated Filtered Water",
      "Organic Grated Ginger Root extract (12%)",
      "Raw Sugar (microbe food)",
      "Ginger Bug Starter Culture",
      "Fresh Organic Lime Juice",
      "Bacillus Coagulans Spore Probiotics"
    ],
    scienceHighlight: "Gingerol compounds from organic ginger root act as a natural digestive catalyst, pairing synergistically with active spore probiotics to comfort the gut lining.",
    replaces: "Goli Soda / Sweet Ginger Beer"
  },
  {
    id: "soda-spice",
    name: "Spice",
    category: "Probiotic Soda",
    tagline: "Jaljeera Masala Botanical Digestif",
    description: "An earthy, complex botanical soda blending dry mango, mint, black pepper, and roasted cumin. Instantly familiar, refreshing, and crafted specifically to enjoy post-meals.",
    badge: "1.2B CFU Probiotics",
    price: 60,
    imagePlaceholder: "spice",
    glowColor: "rgba(180, 83, 9, 0.15)", // copper brown
    accentColor: "#B45309",
    specs: {
      cfu: "1.2 Billion CFU Bacillus coagulans MTCC 5856",
      sugar: "4.5g per 100ml (65% less than standard sweet sodas)",
      calories: "19 kcal per 100ml",
      shelfLife: "12 Months (Shelf-Stable, No Fridge Needed)"
    },
    ingredients: [
      "Dechlorinated Filtered Water",
      "Raw Sugar (used during fermentation)",
      "Ginger Bug Starter Culture",
      "Roasted Cumin (Jeera)",
      "Dry Mango (Amchur) Powder",
      "Black Pepper",
      "Fresh Mint Extract",
      "Black Salt",
      "Bacillus Coagulans Spore Probiotics"
    ],
    scienceHighlight: "Traditional carminative spices like black pepper and mint work alongside Bacillus coagulans to reduce bloating and support active post-meal digestion.",
    replaces: "Masala Soda / Jaljeera"
  },
  {
    id: "soda-berry",
    name: "Berry",
    category: "Probiotic Soda",
    tagline: "Wild Jamun & Purple Fruit Tonic",
    description: "A gorgeous deep purple fruit soda made from hand-harvested wild jamun berries. Tangy, slightly astringent, and rich in natural polyphenols that glow through frosted glass.",
    badge: "1.3B CFU Probiotics",
    price: 60,
    imagePlaceholder: "berry",
    glowColor: "rgba(139, 92, 246, 0.15)", // deep purple-violet
    accentColor: "#8B5CF6",
    specs: {
      cfu: "1.3 Billion CFU Bacillus coagulans MTCC 5856",
      sugar: "5.5g per 100ml (natural fruit sugars + 50% less raw sugar)",
      calories: "26 kcal per 100ml",
      shelfLife: "12 Months (Shelf-Stable, No Fridge Needed)"
    },
    ingredients: [
      "Dechlorinated Filtered Water",
      "Wild Jamun Berry Pulp (10%)",
      "Fresh Organic Lime Juice",
      "Raw Sugar (starter culture food)",
      "Ginger Bug Starter Culture",
      "Bacillus Coagulans Spore Probiotics"
    ],
    scienceHighlight: "Jamun berries contain anthocyanins (potent dark pigments) that offer high antioxidant capacity while providing a balanced, low-glycemic fruit sugar profile.",
    replaces: "Sugary Colas / Sweet Berry Sodas"
  }
];
