export interface HomeLogItem {
  id: string;
  category: "handyman" | "kitchen" | "runway-admin";
  title: string;
  status: "completed" | "in-progress" | "pending";
  date: string;
  description: string;
  details?: string[];
}

export interface FutureProduct {
  id: string;
  name: string;
  tagline: string;
  description: string;
  ingredients: string[];
  patentStatus: string;
}

export const HOME_LOGS: HomeLogItem[] = [
  {
    id: "h1",
    category: "handyman",
    title: "Living Room Window Seal Repair",
    status: "completed",
    date: "2026-06-18",
    description: "Re-siliconed drafts to reduce ambient dust and sound pollution, improving sleep metrics.",
    details: [
      "Removed degraded 5-year-old caulk using manual scraper",
      "Sanitized track with isopropyl alcohol to prevent mold growth",
      "Applied uniform bead of weather-resistant clear silicone",
      "Note: Structural/electrical tasks left to licensed technicians"
    ]
  },
  {
    id: "h2",
    category: "handyman",
    title: "Kitchen Overhead Lighting Calibration",
    status: "in-progress",
    date: "2026-06-20",
    description: "Swapping harsh cool LEDs for high-CRI warm bulbs to support circadian rhythm wind-down.",
    details: [
      "Measured kitchen ceiling dimensions for ideal lux levels",
      "Sourced 2700K warm bulbs to replace standard 6500K blue-heavy lights",
      "Planning installation during weekly downtime hours"
    ]
  },
  {
    id: "k1",
    category: "kitchen",
    title: "Wild Water-Kefir Culture",
    status: "completed",
    date: "2026-06-15",
    description: "Established active lactobacillus water kefir culture using organic dried fruits and wild water-kefir grains for high fiber diversity.",
    details: [
      "Day 1-7: Feed sequence using organic cane sugar and spring water",
      "Confirmed active carbonation at room temperature (~26°C)",
      "Portioned starter into clean glass jar with breathable mesh cover",
      "Ties directly into Gut Bible recipe workflows"
    ]
  },
  {
    id: "k2",
    category: "kitchen",
    title: "Family Gut-Friendly Dinner Arc",
    status: "in-progress",
    date: "2026-06-22",
    description: "Co-cooking gut-friendly meals for parents, introducing prebiotics without medical pretense.",
    details: [
      "Slow-cooked ginger dal with cumin and ghee base",
      "Incorporated 6 distinct plant species in one meal (Principle of 30)",
      "Kept texture soft and easily digestible for parental stomach linings"
    ]
  },
  {
    id: "r1",
    category: "runway-admin",
    title: "GST Sole Proprietorship Re-Naming",
    status: "completed",
    date: "2026-06-12",
    description: "Re-purposed the existing legal sole proprietorship trade name for bootstrapped activities.",
    details: [
      "Updated business registration documents to reflect Trelis Life activities",
      "Confirmed active tax status with local accounting filing",
      "Clean financial ledger separate from personal accounts"
    ]
  },
  {
    id: "r2",
    category: "runway-admin",
    title: "Runway Calculation & Finite Slicer",
    status: "in-progress",
    date: "2026-06-22",
    description: "Tracking the 8-month financial floor (~₹5L interest-free runway) to ensure zero stress drift.",
    details: [
      "Calculated fixed overhead baseline (rent, utilities, basic food components)",
      "Set strict weekly cap of ₹12,000 for all activities",
      "Runway protection shield: active remoteness backup rules"
    ]
  }
];

export const FUTURE_PRODUCTS: FutureProduct[] = [
  {
    id: "p1",
    name: "Trelis Gut-Spark",
    tagline: "Slow-fermented botanical tonic",
    description: "A living, premium glass-bottled probiotic drink utilizing wild water-kefir culture, cold-pressed ginger roots, and native herbal infusions. Crafted with zero artificial additives, thickeners, or pasteurization.",
    ingredients: ["Wild Water-Kefir Culture", "Ginger Juice", "Cumin Seed Infusion", "Raw Forest Honey", "Spring Water"],
    patentStatus: "Formulation Locked • Private Blueprint"
  },
  {
    id: "p2",
    name: "Prebiotic Flour Blend 01",
    tagline: "High-diversity grain base",
    description: "A meticulously balanced flour mixture containing 12 distinct sprouted grains, seeds, and root starches, designed to optimize short-chain fatty acid production in the lower bowel.",
    ingredients: ["Sprouted Ragi", "Sprouted Jowar", "Foxtail Flour", "Sorghum", "Ground Flax", "Psyllium", "Inulin"],
    patentStatus: "Formulation Locked • Private Blueprint"
  }
];
