export interface ProductSKU {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  badge: string; // e.g. "Prebiotic Rich", "Cultured", "Gluten Free"
  price: number; // in INR (₹)
  imagePlaceholder: string; // simple icon representation
}

// MOCK DATA — Placeholder SKUs for public brand presentation
export const MOCK_PRODUCTS: ProductSKU[] = [
  {
    id: "fmcg-01",
    name: "Trelis Cultured Kanji Tonic",
    category: "Ferments",
    tagline: "Probiotic Black Carrot & Beet Nectar",
    description: "Traditionally wild-fermented over 7 days in stone jars. Crisp, tangy, and bursting with live cultures and polyphenols.",
    badge: "Live Culture",
    price: 180,
    imagePlaceholder: "Droplet"
  },
  {
    id: "fmcg-02",
    name: "Millet & Seed Crunch Bar",
    category: "Snacks",
    tagline: "Slow-roasted ragi, flax, and sesame",
    description: "A taste-first energy bar rich in soluble fiber and healthy fats. Sweeteened gently with dark wild honey.",
    badge: "High Fiber",
    price: 90,
    imagePlaceholder: "Leaf"
  },
  {
    id: "fmcg-03",
    name: "Golden Ghee Savory Bites",
    category: "Snacks",
    tagline: "Spiced chickpea & sesame crunch",
    description: "Slow-baked in pure cow ghee and spiced with gut-soothing cumin, ginger, and black pepper. Clean indulgence.",
    badge: "Ghee Baked",
    price: 120,
    imagePlaceholder: "Flame"
  },
  {
    id: "fmcg-04",
    name: "Spiced Neer-Mor Buttermilk Powder",
    category: "Ferments",
    tagline: "Instant traditional digestive mix",
    description: "Freeze-dried live curd blended with ginger, curry leaves, and carom seeds. Just add cold water and stir.",
    badge: "Digestive Aid",
    price: 240,
    imagePlaceholder: "Activity"
  },
  {
    id: "fmcg-05",
    name: "Ambali Malt Mix",
    category: "Pantry",
    tagline: "Fermented finger millet breakfast base",
    description: "Sprouted, sun-dried, and naturally fermented ragi meal. Rich in calcium and ready to brew into a warm, soothing morning bowl.",
    badge: "Gluten Free",
    price: 320,
    imagePlaceholder: "Sparkles"
  }
];
