export interface ProductSKU {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  badge: string;
  price: number;
  imagePlaceholder: string;
  glowColor: string;
  accentColor: string;
  specs: {
    cfu?: string;
    fiber?: string;
    sugar: string;
    calories: string;
    benefits: string;
  };
  ingredients: string[];
  tasteHighlight: string;
  replaces: string;
  brandId: string;
}

export const MOCK_PRODUCTS: ProductSKU[] = [
  // ==================== BRAND 1: ALIVE ====================
  {
    id: "alive-lime",
    name: "Lime",
    category: "Probiotic Soda",
    tagline: "Lime & Roasted Cumin Sparkler",
    description: "A crisp, refreshing reimagination of the classic fresh lime soda. Blended with real organic lime juice, a touch of dark raw sweetness, and a finishing pinch of roasted cumin and black salt.",
    badge: "1.2 Billion Active Cultures",
    price: 60,
    imagePlaceholder: "lime",
    glowColor: "rgba(163, 230, 53, 0.15)",
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
    replaces: "nimbu/goli soda & sweet colas",
    brandId: "alive"
  },
  {
    id: "alive-ginger",
    name: "Ginger",
    category: "Probiotic Soda",
    tagline: "Bold Ginger & Citrus Infused Tonic",
    description: "A throat-soothing ginger soda built to replace sweet carbonated ginger beers. Organic ginger root meets zesty lime oil, delivering a sharp, spicy bite that feels warm and comforting.",
    badge: "1.5 Billion Active Cultures",
    price: 60,
    imagePlaceholder: "ginger",
    glowColor: "rgba(245, 158, 11, 0.15)",
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
    replaces: "nimbu/goli soda & sweet colas",
    brandId: "alive"
  },
  {
    id: "alive-spice",
    name: "Spice",
    category: "Probiotic Soda",
    tagline: "Earthy Cumin & Mint Digestif",
    description: "An aromatic botanical soda inspired by traditional spice-based digestifs. Blends roasted cumin, dry mango, mint, and black pepper for a complex, savory finish.",
    badge: "1.2 Billion Active Cultures",
    price: 60,
    imagePlaceholder: "spice",
    glowColor: "rgba(180, 83, 9, 0.15)",
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
    replaces: "nimbu/goli soda & sweet colas",
    brandId: "alive"
  },
  {
    id: "alive-berry",
    name: "Berry",
    category: "Probiotic Soda",
    tagline: "Wild Jamun & Purple Fruit Sparkler",
    description: "A gorgeous, deep purple fruit soda crafted with hand-harvested wild jamun berries. Rich, tangy, slightly dry, and packed with natural fruit antioxidants that glow through glass.",
    badge: "1.3 Billion Active Cultures",
    price: 60,
    imagePlaceholder: "berry",
    glowColor: "rgba(139, 92, 246, 0.15)",
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
    replaces: "nimbu/goli soda & sweet colas",
    brandId: "alive"
  },

  // ==================== BRAND 2: JOSH ====================
  {
    id: "josh-kala-khatta",
    name: "Kala Khatta",
    category: "Prebiotic Soda",
    tagline: "Street-gola tang, grown-up.",
    description: "A bold prebiotic soda capturing the nostalgic, sweet-tangy street-gola feel. Infused with natural plant fibers and botanical extracts for a healthy digestive upgrade.",
    badge: "7g Plant Fibre",
    price: 60,
    imagePlaceholder: "kala-khatta",
    glowColor: "rgba(142, 124, 150, 0.15)",
    accentColor: "#8E7C96",
    specs: {
      fiber: "7g Chicory Root & Apple Fiber",
      sugar: "4.5g per 100ml (pure fruit juices + chicory)",
      calories: "18 kcal per 100ml (approx 45 kcal per can)",
      benefits: "Promotes growth of healthy gut bacteria & regulates blood sugar"
    },
    ingredients: [
      "Carbonated Spring Water",
      "Chicory Root Inulin",
      "Apple Pectin",
      "Organic Jamun Juice",
      "Blackcurrant Concentrate",
      "Black Salt",
      "Lemon Juice",
      "Stevia Extract"
    ],
    tasteHighlight: "Tangy blackcurrant-meets-jamun with a salty-spiced edge, finished with a clean, lively fizz.",
    replaces: "cola, kala-khatta gola, orange/rose pops",
    brandId: "josh"
  },
  {
    id: "josh-masala-cola",
    name: "Masala Cola",
    category: "Prebiotic Soda",
    tagline: "The cola your gut forgives.",
    description: "A rich, spiced cola brewed with natural kola nut extracts and warm Indian spices. Delivers that classic cola satisfaction without the blood sugar spike or artificial chemicals.",
    badge: "7g Plant Fibre",
    price: 60,
    imagePlaceholder: "masala-cola",
    glowColor: "rgba(164, 145, 124, 0.15)",
    accentColor: "#A4917C",
    specs: {
      fiber: "7g prebiotic plant fiber",
      sugar: "5.0g per 100ml (low glycemic raw sugar)",
      calories: "20 kcal per 100ml (approx 50 kcal per can)",
      benefits: "Low glycemic response, supports daily fiber goals"
    },
    ingredients: [
      "Carbonated Spring Water",
      "Prebiotic Plant Inulin",
      "Organic Kola Nut Extract",
      "Cinnamon Extract",
      "Clove Oil",
      "Vanilla Bean Pods",
      "Black Salt",
      "Lemon Juice"
    ],
    tasteHighlight: "Dark caramel cola spine lifted with warm Indian spices; deep, earthy, and satisfyingly low in sugar.",
    replaces: "cola, kala-khatta gola, orange/rose pops",
    brandId: "josh"
  },
  {
    id: "josh-gulab",
    name: "Gulab",
    category: "Prebiotic Soda",
    tagline: "Rose, but make it fizz.",
    description: "A delicate, floral botanical soda capturing Kashmiri rose petals and warm cardamom. Light, fizzy, and packed with digestive prebiotic fibers.",
    badge: "7g Plant Fibre",
    price: 60,
    imagePlaceholder: "gulab",
    glowColor: "rgba(203, 169, 176, 0.15)",
    accentColor: "#CBA9B0",
    specs: {
      fiber: "7g chicory root & citrus fiber",
      sugar: "4.0g per 100ml (natural rose sugar base)",
      calories: "16 kcal per 100ml (approx 40 kcal per can)",
      benefits: "Calming post-meal digestif, reduces inflammation"
    },
    ingredients: [
      "Carbonated Spring Water",
      "Soluble Chicory Fiber",
      "Kash Kashmiri Rose Distillate",
      "Organic Cardamom Extract",
      "Lemon Extract",
      "Natural Beet Juice (for color)"
    ],
    tasteHighlight: "Delicate Kashmiri rose with a hint of warm cardamom over bright carbonation; floral, soft, and fragrant.",
    replaces: "cola, kala-khatta gola, orange/rose pops",
    brandId: "josh"
  },
  {
    id: "josh-santra",
    name: "Santra",
    category: "Prebiotic Soda",
    tagline: "Sunshine, sorted.",
    description: "A vibrant orange citrus soda inspired by nostalgic sweet pops. Infused with cold-pressed orange peel extracts and dietary prebiotic plant fiber.",
    badge: "7g Plant Fibre",
    price: 60,
    imagePlaceholder: "santra",
    glowColor: "rgba(210, 166, 132, 0.15)",
    accentColor: "#D2A684",
    specs: {
      fiber: "7g prebiotic orange and root fiber",
      sugar: "4.8g per 100ml (organic orange juice base)",
      calories: "19 kcal per 100ml (approx 48 kcal per can)",
      benefits: "Rich in Vitamin C, supports metabolic digestion"
    },
    ingredients: [
      "Carbonated Spring Water",
      "Soluble Root Fiber",
      "Cold-Pressed Nagpur Orange Juice (10%)",
      "Mandarin Peel Oil",
      "Citric Acid",
      "Beta-Carotene (for color)"
    ],
    tasteHighlight: "Bright Nagpur-orange zest with a gentle bitter-peel lift and a crisp, clean fizz.",
    replaces: "cola, kala-khatta gola, orange/rose pops",
    brandId: "josh"
  },

  // ==================== BRAND 3: BATCH ====================
  {
    id: "batch-kanji",
    name: "Kanji",
    category: "Fresh Ferment",
    tagline: "India's original gut tonic, reborn.",
    description: "Heritage North Indian winter tonic fermented locally. Organic black carrots and beets are wild-fermented with crushed mustard seeds for a tangy, savory digestive powerhouse.",
    badge: "2B Live Cultures",
    price: 60,
    imagePlaceholder: "kanji",
    glowColor: "rgba(160, 126, 140, 0.15)",
    accentColor: "#A07E8C",
    specs: {
      cfu: "2 Billion Live Probiotic Cultures",
      sugar: "3.0g per 100ml (fermented carrot base)",
      calories: "10 kcal per 100ml (approx 30 kcal per cup)",
      benefits: "Traditional probiotic starter, enhances mineral absorption"
    },
    ingredients: [
      "Filtered Spring Water",
      "Fermented Black Carrots",
      "Red Beetroot Pulp",
      "Crushed Yellow Mustard Seeds",
      "Black Salt",
      "Natural Cultures"
    ],
    tasteHighlight: "Tangy, earthy, mustard-bright fermented black-carrot & beet; brisk, savory, and bracingly probiotic.",
    replaces: "sugary tonics, store kombucha, lassi",
    brandId: "batch"
  },
  {
    id: "batch-strawberry-kefir",
    name: "Strawberry Kefir",
    category: "Fresh Ferment",
    tagline: "Creamy, cultured — nothing like buttermilk.",
    description: "A thick, creamy fermented milk-based drink cultured with genuine live kefir grains. Loaded with twelve diverse probiotic strains and organic strawberry puree.",
    badge: "12 Live Strains",
    price: 60,
    imagePlaceholder: "strawberry-kefir",
    glowColor: "rgba(205, 160, 146, 0.15)",
    accentColor: "#CDA092",
    specs: {
      cfu: "5 Billion Live Cultures (12+ Strains)",
      sugar: "6.0g per 100ml (natural milk lactose + strawberry)",
      calories: "30 kcal per 100ml (approx 90 kcal per cup)",
      benefits: "High-density multi-strain probiotic, highly lactose-friendly"
    },
    ingredients: [
      "Pasteurized Cream Milk",
      "Live Kefir Grains Starter",
      "Organic Strawberry Puree (12%)",
      "Natural Vanilla Extract",
      "Lactobacillus rhamnosus",
      "Bifidobacterium bifidum"
    ],
    tasteHighlight: "Creamy, lightly tart kefir with ripe strawberry; soft blush-pink, refreshing, and alive.",
    replaces: "sugary tonics, store kombucha, lassi",
    brandId: "batch"
  },
  {
    id: "batch-jamun-lime-kombucha",
    name: "Jamun-Lime Kombucha",
    category: "Fresh Ferment",
    tagline: "Fresh-brewed, jamun-lime.",
    description: "An artisanal kombucha brewed locally in small batches using premium black tea. Double-fermented with organic wild jamun berries and fresh lime for a sparkling, dry finish.",
    badge: "2B Live Cultures",
    price: 60,
    imagePlaceholder: "jamun-lime-kombucha",
    glowColor: "rgba(140, 124, 160, 0.15)",
    accentColor: "#8C7CA0",
    specs: {
      cfu: "2 Billion Live Probiotic Cultures",
      sugar: "4.0g per 100ml (consumed during fermentation)",
      calories: "13 kcal per 100ml (approx 40 kcal per cup)",
      benefits: "Contains organic acids & antioxidants to assist liver digestion"
    },
    ingredients: [
      "Fermented Black Tea Leaf Extract",
      "Wild Jamun Berry Pulp (10%)",
      "Lime Juice",
      "Organic Cane Sugar (starter food)",
      "SCOBY Culture"
    ],
    tasteHighlight: "Lively, lightly tart jamun-and-lime; gently sparkling, dry, and sophisticated.",
    replaces: "sugary tonics, store kombucha, lassi",
    brandId: "batch"
  },

  // ==================== BRAND 4: PULP ====================
  {
    id: "pulp-green-reset",
    name: "Green Reset",
    category: "Gut Smoothie",
    tagline: "Your gut's morning reset.",
    description: "A thick, rich, fiber-dense green smoothie blended with spinach, cucumber, mint, banana, and functional seeds. Sourced with a live yogurt ferment for a double gut impact.",
    badge: "+Fibre +Ferment",
    price: 60,
    imagePlaceholder: "green-reset",
    glowColor: "rgba(157, 174, 140, 0.15)",
    accentColor: "#9DAE8C",
    specs: {
      fiber: "9g Dietary Insoluble Fiber (approx 9g per cup)",
      sugar: "4.8g per 100ml (pure vegetable & banana sugar)",
      calories: "48 kcal per 100ml (approx 190 kcal per cup)",
      benefits: "High fiber prebiotic loader & probiotics in one meal"
    },
    ingredients: [
      "Fresh Spinach",
      "Organic Cucumber Juice",
      "Fresh Mint Leaf",
      "Organic Banana Pulp",
      "Chia Seeds",
      "Flaxseed Meal",
      "Cultured Probiotic Yogurt Base"
    ],
    tasteHighlight: "Thick, matte, opaque vivid green whole-food smoothie with a thin scatter of crunchy chia seeds at the top.",
    replaces: "green juice, mango shakes, skipped breakfasts",
    brandId: "pulp"
  },
  {
    id: "pulp-cacao-daily",
    name: "Cacao Daily",
    category: "Gut Smoothie",
    tagline: "Dessert that loves you back.",
    description: "An indulgent, velvety chocolate smoothie made with raw organic cacao, oats, almond butter, dates, and live probiotic kefir. Satisfies sweet cravings while feeding gut bacteria.",
    badge: "+Fibre +Ferment",
    price: 60,
    imagePlaceholder: "cacao-daily",
    glowColor: "rgba(168, 146, 126, 0.15)",
    accentColor: "#A8927E",
    specs: {
      fiber: "8g Dietary Insoluble Fiber (approx 8g per cup)",
      sugar: "6.5g per 100ml (sweetened with whole dates)",
      calories: "67 kcal per 100ml (approx 270 kcal per cup)",
      benefits: "Packed with polyphenols, provides sustained daily energy"
    },
    ingredients: [
      "Pure Spring Water",
      "Raw Organic Cacao Powder",
      "Cultured Probiotic Kefir",
      "Organic Dates (for sweetness)",
      "Rolled Oats",
      "Almond Butter",
      "Cacao Nibs"
    ],
    tasteHighlight: "Thick, matte, opaque rich cacao-brown whole-food smoothie with a few cacao nibs scattered on top.",
    replaces: "green juice, mango shakes, skipped breakfasts",
    brandId: "pulp"
  },
  {
    id: "pulp-papaya-sunrise",
    name: "Papaya Sunrise",
    category: "Gut Smoothie",
    tagline: "Sunshine, in any season.",
    description: "A smooth, tropical papaya smoothie designed for year-round digestive comfort. Blended with sweet papaya, banana, lime zest, and active live starter.",
    badge: "+Fibre +Ferment",
    price: 60,
    imagePlaceholder: "papaya-sunrise",
    glowColor: "rgba(221, 176, 127, 0.15)",
    accentColor: "#DDB07F",
    specs: {
      fiber: "8g Dietary Insoluble Fiber (approx 8g per cup)",
      sugar: "5.0g per 100ml (tropical fruit pulp sugars)",
      calories: "50 kcal per 100ml (approx 200 kcal per cup)",
      benefits: "Papain enzyme aids in heavy protein breakdown"
    },
    ingredients: [
      "Fresh Papaya Pulp (15%)",
      "Organic Banana",
      "Fresh Lime Juice",
      "Rolled Oats",
      "Chia Seeds",
      "Cultured Yogurt Ferment Base"
    ],
    tasteHighlight: "Silky tropical papaya with a bright lime lift; naturally sweet, soft golden-orange, and smooth.",
    replaces: "green juice, mango shakes, skipped breakfasts",
    brandId: "pulp"
  },
  {
    id: "pulp-berry-beet",
    name: "Berry Beet",
    category: "Gut Smoothie",
    tagline: "Deep colour, deep good.",
    description: "An antioxidant-rich crimson smoothie combining organic berries and fresh beetroot. Grounded with flax seeds and probiotic curd for comprehensive gut support.",
    badge: "+Fibre +Ferment",
    price: 60,
    imagePlaceholder: "berry-beet",
    glowColor: "rgba(188, 133, 144, 0.15)",
    accentColor: "#BC8590",
    specs: {
      fiber: "9g Dietary Insoluble Fiber (approx 9g per cup)",
      sugar: "5.2g per 100ml (berry sugars + natural beet beet)",
      calories: "52 kcal per 100ml (approx 210 kcal per cup)",
      benefits: "High in polyphenol antioxidants & liver-supportive betalains"
    },
    ingredients: [
      "Organic Mixed Berries (Strawberry, Blueberry)",
      "Fresh Red Beetroot Juice",
      "Organic Banana",
      "Flaxseed Meal",
      "Rolled Oats",
      "Probiotic Curd Culture"
    ],
    tasteHighlight: "Berry-sweet over an earthy beet base; rich crimson, lightly tart, satisfying.",
    replaces: "green juice, mango shakes, skipped breakfasts",
    brandId: "pulp"
  },
  {
    id: "batch-coconut-water-kefir",
    name: "Coconut Water Kefir",
    category: "Fresh Ferment",
    tagline: "Tender coconut, gently alive.",
    description: "A light, gently sparkling water kefir made fresh from tender coconut water and live kefir grains. Crisp, clean, and naturally fizzy — a vegan living ferment that drinks like a treat, not a tonic.",
    badge: "2B Live Cultures",
    price: 60,
    imagePlaceholder: "coconut-water-kefir",
    glowColor: "rgba(220, 230, 225, 0.15)",
    accentColor: "#DCE6E1",
    specs: {
      cfu: "2 Billion Live Probiotic Cultures",
      sugar: "3.5g per 100ml (natural coconut sugars, mostly consumed in fermentation)",
      calories: "16 kcal per 100ml (approx 48 kcal per cup)",
      benefits: "Light, hydrating vegan ferment that is gentle on the gut"
    },
    ingredients: [
      "Tender Coconut Water",
      "Live Water-Kefir Grains",
      "Fresh Lime",
      "Natural Coconut Solids"
    ],
    tasteHighlight: "Crisp tender-coconut with a soft natural fizz and a clean lime lift; pale, light, and refreshing.",
    replaces: "Sugary packaged coconut drinks / Sweetened tender-coconut waters",
    brandId: "batch"
  },

  // ==================== BRAND 5: STEEP ====================
  {
    id: "steep-kahwa",
    name: "Kahwa",
    category: "Hot Brew",
    tagline: "The mountain digestif.",
    description: "A fragrant Kashmiri green-tea kahwa brewed with saffron, cardamom, cinnamon, and crushed almond. A light, golden, after-meal brew that feels like a warm exhale.",
    badge: "Polyphenol-Rich",
    price: 60,
    imagePlaceholder: "kahwa",
    glowColor: "rgba(218, 165, 32, 0.15)",
    accentColor: "#DAA520",
    specs: {
      sugar: "1.5g per 100ml (lightly honeyed)",
      calories: "12 kcal per 100ml (approx 30 kcal per cup)",
      benefits: "Antioxidant-rich; soothing after heavy meals"
    },
    ingredients: [
      "Brewed Kashmiri Green Tea",
      "Saffron",
      "Green Cardamom",
      "Cinnamon Bark",
      "Crushed Almonds",
      "Raw Honey"
    ],
    tasteHighlight: "Delicate floral-saffron green tea with warm spice and a soft nutty finish; light, fragrant, golden.",
    replaces: "Sugary green-tea sachets / After-dinner sweets",
    brandId: "steep"
  },
  {
    id: "steep-gut-chai",
    name: "Gut Chai",
    category: "Hot Brew",
    tagline: "Chai that's kind to your stomach.",
    description: "A warming spiced chai brewed with whole spices over a prebiotic chicory-root base, with just a touch of jaggery instead of heavy sugar and milk. Familiar masala-chai comfort, gentler on digestion.",
    badge: "5g Plant Fibre",
    price: 60,
    imagePlaceholder: "gut-chai",
    glowColor: "rgba(205, 133, 63, 0.15)",
    accentColor: "#CD853F",
    specs: {
      fiber: "5g Prebiotic Chicory Fiber",
      sugar: "3.0g per 100ml (lightly jaggery-sweetened)",
      calories: "22 kcal per 100ml (approx 55 kcal per cup)",
      benefits: "Warming carminative spices ease digestion"
    },
    ingredients: [
      "Brewed Assam Black Tea",
      "Chicory Root Inulin",
      "Fresh Ginger",
      "Green Cardamom",
      "Cinnamon",
      "Clove",
      "Black Pepper",
      "A2 Milk (light)",
      "Jaggery"
    ],
    tasteHighlight: "Warm, spiced, lightly sweet masala chai with a clean finish; comforting, never cloying.",
    replaces: "Sugary milk chai / Instant tea premixes",
    brandId: "steep"
  },
  {
    id: "steep-golden-turmeric",
    name: "Golden Turmeric",
    category: "Hot Brew",
    tagline: "The everyday comfort brew.",
    description: "A soothing turmeric-and-ginger brew with black pepper and a prebiotic fibre base — the classic haldi comfort, modernised and lightly sweetened.",
    badge: "Curcumin + Fibre",
    price: 60,
    imagePlaceholder: "golden-turmeric",
    glowColor: "rgba(255, 165, 0, 0.15)",
    accentColor: "#FFA500",
    specs: {
      fiber: "Fresh Curcumin + Prebiotic Fiber",
      sugar: "2.5g per 100ml (light jaggery)",
      calories: "20 kcal per 100ml (approx 50 kcal per cup)",
      benefits: "Warming spices for everyday post-meal comfort"
    },
    ingredients: [
      "Fresh Turmeric",
      "Ginger",
      "Black Pepper",
      "Cinnamon",
      "Chicory Fiber",
      "A2 / Plant Milk",
      "Light Jaggery"
    ],
    tasteHighlight: "Earthy turmeric-ginger warmth with a peppery edge; creamy, golden, soothing.",
    replaces: "Sugary haldi-doodh mixes / Hot chocolate",
    brandId: "steep"
  },
  {
    id: "steep-filter-kaapi",
    name: "Filter Kaapi",
    category: "Hot Brew",
    tagline: "Your kaapi, polyphenol-loaded.",
    description: "Slow-brewed South Indian filter-coffee decoction, naturally polyphenol-rich, finished with a lighter milk-and-jaggery profile for everyday gut-friendly comfort.",
    badge: "Polyphenol-Rich",
    price: 60,
    imagePlaceholder: "filter-kaapi",
    glowColor: "rgba(139, 69, 19, 0.15)",
    accentColor: "#8B4513",
    specs: {
      sugar: "2.0g per 100ml (light jaggery)",
      calories: "24 kcal per 100ml (approx 60 kcal per cup)",
      benefits: "Natural coffee polyphenols feed gut bacteria"
    },
    ingredients: [
      "South Indian Filter Coffee Decoction (Arabica/Robusta + Chicory)",
      "A2 Milk",
      "Light Jaggery"
    ],
    tasteHighlight: "Bold, aromatic filter-coffee depth with a smooth, lightly sweet milk finish.",
    replaces: "Instant coffee / Sugary café lattes",
    brandId: "steep"
  },
  {
    id: "steep-cocoa-spice",
    name: "Cocoa Spice",
    category: "Hot Brew",
    tagline: "The hot chocolate your gut craves.",
    description: "A rich, dark hot chocolate made with raw cacao — one of the most polyphenol-dense foods there is — plus warming spices and a prebiotic fibre base. Deep chocolate comfort with a fraction of the sugar of a sachet.",
    badge: "Polyphenol-Rich",
    price: 60,
    imagePlaceholder: "cocoa-spice",
    glowColor: "rgba(105, 105, 105, 0.15)",
    accentColor: "#696969",
    specs: {
      fiber: "Polyphenol-Rich Raw Cacao",
      sugar: "4.5g per 100ml (date + light jaggery)",
      calories: "38 kcal per 100ml (approx 95 kcal per cup)",
      benefits: "Cacao polyphenols feed gut bacteria; warming spices aid post-meal comfort"
    },
    ingredients: [
      "Raw Cacao Powder",
      "A2 / Plant Milk",
      "Chicory Root Fiber",
      "Dates",
      "Cinnamon",
      "A Pinch of Cardamom",
      "A Pinch of Sea Salt",
      "Light Jaggery"
    ],
    tasteHighlight: "Deep, dark, velvety chocolate with warm cinnamon and a whisper of sea salt; rich but clean, never sugary.",
    replaces: "Sugary instant hot chocolate / Drinking-chocolate sachets",
    brandId: "steep"
  },

  // ==================== BRAND 6: GRIT ====================
  {
    id: "grit-millet-date",
    name: "Millet & Date",
    category: "Gut Bar",
    tagline: "The bar your gut actually wants.",
    description: "A chewy whole-food bar of toasted millets, dates, and seeds, bound with prebiotic fibre. No refined sugar, no junk — just slow, real fuel for the hunger gap.",
    badge: "7g Plant Fibre",
    price: 60,
    imagePlaceholder: "millet-date",
    glowColor: "rgba(205, 170, 125, 0.15)",
    accentColor: "#CDAA7D",
    specs: {
      fiber: "7g Dietary Fibre per bar",
      sugar: "9g per bar (whole-date sugars)",
      calories: "approx 180 kcal per 40g bar",
      benefits: "Slow-release energy that feeds gut bacteria"
    },
    ingredients: [
      "Foxtail & Ragi Millet",
      "Dates",
      "Almonds",
      "Pumpkin Seeds",
      "Flaxseed",
      "Chicory Fibre",
      "Cinnamon"
    ],
    tasteHighlight: "Chewy, nutty, date-sweet with a toasted-millet crunch.",
    replaces: "Sugary granola/protein bars / Biscuits",
    brandId: "grit"
  },
  {
    id: "grit-cacao-nib",
    name: "Cacao Nib",
    category: "Gut Bar",
    tagline: "Chocolate that feeds the good guys.",
    description: "A rich dark-cacao bar with oats, almond butter, and crunchy cacao nibs — dessert satisfaction with real fibre and polyphenols.",
    badge: "6g Plant Fibre",
    price: 60,
    imagePlaceholder: "cacao-nib",
    glowColor: "rgba(139, 69, 19, 0.15)",
    accentColor: "#8B4513",
    specs: {
      fiber: "6g Dietary Fibre per bar",
      sugar: "8g per bar (date + minimal jaggery)",
      calories: "approx 200 kcal per 40g bar",
      benefits: "Polyphenol-rich; satisfies sweet cravings"
    },
    ingredients: [
      "Rolled Oats",
      "Dates",
      "Raw Cacao",
      "Cacao Nibs",
      "Almond Butter",
      "Flaxseed",
      "Sea Salt"
    ],
    tasteHighlight: "Deep dark-chocolate over a salted-nutty base with crunchy nibs.",
    replaces: "Chocolate bars / Sugary desserts",
    brandId: "grit"
  },
  {
    id: "grit-seed-spice",
    name: "Seed & Spice",
    category: "Gut Bar",
    tagline: "Crunch with a conscience.",
    description: "A crisp savory seed cracker baked with whole grains and digestive spices — the gut-friendly answer to fried namkeen and chips.",
    badge: "Whole-Grain Fibre",
    price: 60,
    imagePlaceholder: "seed-spice",
    glowColor: "rgba(218, 165, 32, 0.15)",
    accentColor: "#DAA520",
    specs: {
      fiber: "5g Dietary Fibre per pack",
      sugar: "1g sugar per pack",
      calories: "approx 150 kcal per pack",
      benefits: "Whole-grain fibre with digestion-friendly spices"
    },
    ingredients: [
      "Foxtail Millet",
      "Flaxseed",
      "Sesame",
      "Cumin",
      "Ajwain",
      "Black Pepper",
      "Cold-Pressed Oil",
      "Rock Salt"
    ],
    tasteHighlight: "Crisp, savory, and seedy with warm cumin-ajwain spice.",
    replaces: "Fried namkeen / Potato chips",
    brandId: "grit"
  },
  {
    id: "grit-sattu-bite",
    name: "Sattu Bite",
    category: "Gut Bar",
    tagline: "Old-school protein, gut-tuned.",
    description: "A pressed bite of roasted chana (sattu), peanuts, and jaggery — high plant protein and fibre in a familiar Indian format.",
    badge: "+Protein +Fibre",
    price: 60,
    imagePlaceholder: "sattu-bite",
    glowColor: "rgba(210, 180, 140, 0.15)",
    accentColor: "#D2B48C",
    specs: {
      fiber: "4g Fibre per bite",
      sugar: "7g per bite (jaggery)",
      calories: "approx 170 kcal per 40g",
      benefits: "Plant protein + fibre for steady energy"
    },
    ingredients: [
      "Roasted Chana (Sattu)",
      "Peanuts",
      "Jaggery",
      "Sesame",
      "Cardamom"
    ],
    tasteHighlight: "Toasty, nutty, lightly sweet with a hint of cardamom.",
    replaces: "Sugary protein bars / Fried snacks",
    brandId: "grit"
  },
  {
    id: "grit-choc-hazelnut",
    name: "Choc Hazelnut",
    category: "Gut Bar",
    tagline: "Fudgy, dark, and secretly good for you.",
    description: "A fudgy, indulgent dark-chocolate and roasted-hazelnut bar bound with dates and prebiotic fibre, finished in a 70% dark-chocolate shell with flaky sea salt. Tastes like a treat, built like a gut food.",
    badge: "6g Plant Fibre",
    price: 60,
    imagePlaceholder: "choc-hazelnut",
    glowColor: "rgba(105, 105, 105, 0.15)",
    accentColor: "#696969",
    specs: {
      fiber: "6g Dietary Fibre per bar",
      sugar: "9g per bar (date sugars + minimal jaggery)",
      calories: "approx 210 kcal per 40g bar",
      benefits: "Polyphenol-rich dark cacao; satisfies the deepest chocolate craving"
    },
    ingredients: [
      "Dates",
      "Roasted Hazelnuts",
      "Almond Butter",
      "Raw Cacao",
      "70% Dark Chocolate (coating)",
      "Chicory Fibre",
      "Flaxseed",
      "Sea Salt"
    ],
    tasteHighlight: "A fudgy date-caramel centre with roasted-hazelnut crunch and the snap of a dark-chocolate shell finished with flaky sea salt.",
    replaces: "Chocolate-hazelnut bars / Sugary candy bars",
    brandId: "grit"
  }
];
