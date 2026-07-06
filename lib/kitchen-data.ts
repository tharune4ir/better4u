export interface MenuItem {
  id: string;
  name: string;
  category: string;
  badges: string[];
  description: string;
  pairsWith: string;
  price: number;
  image: string;
  recipe?: {
    yield?: string;
    ingredients: string[];
    steps: string[];
    notes?: string;
  };
}

export const KITCHEN_INTRO = {
  title: "Second Batch",
  subtitle: "Comfort food, engineered for your microbiome. High protein, high fibre, always fermented.",
  standards: [
    {
      title: "Engineered by the Science",
      desc: "Every dish is built to be high-protein, high-fibre, plant-diverse (chasing 30 different plants a week), and polyphenol-rich."
    },
    {
      title: "Every Dish is Alive",
      desc: "Each item carries a live ferment or prebiotic layer made in-house—the same cultures, krauts, and kanjis that power BATCH."
    },
    {
      title: "The Hard Rules",
      desc: "No refined sugar. No wheat / maida (gluten-free). No fluid milk. No ultra-processed ingredients. Vegetarian + egg only."
    },
    {
      title: "Food + Drink, Together",
      desc: "Every dish is crafted to match its perfect Product Lab drink pairing for a complete prebiotic and probiotic experience."
    }
  ]
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "thirty-plant-bowl",
    name: "The 30-Plant Bowl",
    category: "Superfood Salads",
    badges: ["20+ Plants", "High-Protein", "High-Fibre", "Fermented", "Gluten-Free", "No Added Sugar", "Vegan"],
    description: "Our signature — seven slow-cooked beans and legumes over a rainbow of fresh and roasted vegetables, greens, herbs, five seeds and pomegranate, finished with a live kanji-kefir dressing. One bowl, twenty-plus different plants, serious plant protein and fibre — the most microbiome-loaded meal in the city, and it actually tastes incredible.",
    pairsWith: "BATCH · Kanji",
    price: 260,
    image: "/all_image_files/kitchen/Bowl_of_beans_and_vegetables_202607060118.jpeg",
    recipe: {
      yield: "~400g. ~20+ plant points; high plant protein + fibre.",
      ingredients: [
        "Legume base (soak overnight, boil each separately, dry well — dryness = freshness): kabuli chana, rajma, lobia, whole moong, black chana, peanuts, sweet corn (~2 tbsp each)",
        "Fresh + roasted veg: carrot, cabbage, capsicum, cherry tomato, beetroot, cucumber (only to order), plus roasted pumpkin/sweet potato",
        "Greens/herbs: lettuce/spinach, coriander, mint",
        "Seeds: sesame, flax, pumpkin, sunflower, chia (toasted)",
        "Pomegranate",
        "Dressing: kanji brine + lemon + cold-pressed oil + cultured cashew + roasted cumin + pepper + salt"
      ],
      steps: [
        "Soak + boil each legume, dry thoroughly, chill.",
        "Roast the roastable veg; toast seeds.",
        "To order: bed of greens, scoop legumes, pile fresh + roasted veg, pomegranate, seeds; dress with the kanji-kefir dressing; toss."
      ],
      notes: "Storage: dried legumes + roasted veg hold 1 day chilled; dress and add cucumber only at serving."
    }
  },
  {
    id: "sprout-seed-salad",
    name: "Sprout & Seed Superfood Salad",
    category: "Superfood Salads",
    badges: ["High-Protein", "Plant-Diverse", "Fermented", "Polyphenol-Rich", "Gluten-Free", "No Added Sugar", "Vegan"],
    description: "Living sprouts and five toasted seeds tossed with crunchy rainbow veg, jewel-bright pomegranate, fresh herbs and house-fermented pickled vegetables in a bright lemon dressing. Light, alive and quietly protein-packed.",
    pairsWith: "ALIVE · Lime",
    price: 210,
    image: "/all_image_files/kitchen/Bowl_of_sprouts_with_vegetables_202607060118.jpeg",
    recipe: {
      yield: "~320g",
      ingredients: [
        "1 cup mixed sprouts (steamed 3–4 min)",
        "cucumber, carrot, red cabbage, cherry tomato, pomegranate",
        "5 toasted seeds",
        "house pickled veg",
        "mint + coriander",
        "lemon dressing"
      ],
      steps: [
        "Toss all ingredients to order, top with seeds + pickled vegetables."
      ],
      notes: "Storage: keep components separate/chilled; dress at serving."
    }
  },
  {
    id: "ferment-crust-pizza",
    name: "Ferment-Crust Deep-Dish Pizza",
    category: "Pizza",
    badges: ["Fermented", "High-Fibre", "Plant-Diverse", "Gluten-Free", "No Added Sugar", "Veg"],
    description: "A slow, naturally fermented gluten-free deep-dish base with real sourdough-style tang, a no-sugar slow-roasted tomato sauce, a generous load of colourful vegetables and mushrooms, cultured cheese, and a finish of house-pickled onion and chilli. Deep-dish indulgence, built to feed your good bacteria.",
    pairsWith: "ALIVE · Ginger",
    price: 360,
    image: "/all_image_files/kitchen/Pizza_in_cast-iron_pan_202607060118.jpeg",
    recipe: {
      yield: "1 personal deep-dish",
      ingredients: [
        "GF ferment crust: 1 cup GF flour blend (jowar + foxtail + rice) + 2 tbsp psyllium + ½ tsp yeast (or curd) + water + salt + oil",
        "Sauce (no sugar): slow-roasted tomato + garlic + herbs, blended",
        "Load: capsicum, onion, mushroom, sweet corn, olives, cultured cheese",
        "Finish: house pickled onion/chilli"
      ],
      steps: [
        "Pre-bake risen base at 220°C for 8–10 min (or in a covered tawa).",
        "Spread sauce, add toppings, and top with cheese.",
        "Bake for 10–12 min until cheese is melted and crust is crisp; finish with fresh pickled onions/chilli."
      ],
      notes: "Storage: fermented dough holds 2 days cold; pre-baked bases hold 2 days."
    }
  },
  {
    id: "paneer-tikka-pizza",
    name: "Paneer Tikka Superfood Pizza",
    category: "Pizza",
    badges: ["High-Protein", "Fermented", "Plant-Diverse", "Gluten-Free", "No Added Sugar", "Veg"],
    description: "Smoky curd-marinated paneer tikka over the fermented gluten-free base, loaded with capsicum, onion and greens, a no-sugar tomato-masala sauce, mint-coriander drizzle and pickled onion. India's favourite flavour, engineered clean and protein-rich.",
    pairsWith: "JOSH · Masala Cola",
    price: 340,
    image: "/all_image_files/kitchen/Gluten-free_pizza_with_paneer_tikka_202607060118.jpeg",
    recipe: {
      yield: "1 pizza",
      ingredients: [
        "Ferment crust (same as Deep-Dish Pizza)",
        "Tomato-masala (no-sugar) sauce",
        "Paneer tikka cubes (paneer marinated in curd + turmeric + mild tikka spices + lemon, seared/grilled till charred)",
        "Load: capsicum, onion, greens, cheese",
        "Finish: mint-coriander drizzle + pickled onion"
      ],
      steps: [
        "Cube paneer, marinate in curd, turmeric, mild tikka spices, and lemon. Sear or grill until charred.",
        "Prepare the ferment crust and spread the tomato-masala sauce.",
        "Add paneer tikka, capsicum, onion, greens, and cheese.",
        "Bake, and finish with a fresh mint-coriander drizzle and pickled onion."
      ],
      notes: "Storage: grill paneer fresh; keep marinade/base prepped."
    }
  },
  {
    id: "kraut-cheese-melt",
    name: "Kraut & Cheese Melt",
    category: "Toasties & Sandwiches",
    badges: ["Fermented", "High-Fibre", "Gluten-Free", "No Added Sugar", "Veg"],
    description: "Melty cultured cheese and our house turmeric-kraut pressed golden in fermented gluten-free bread with fresh greens. The perfect pairing — molten cheese and live, sour crunch.",
    pairsWith: "BATCH · Jamun-Lime Kombucha",
    price: 210,
    image: "/all_image_files/kitchen/Grilled_sandwich_with_cheese_pull_202607060118.jpeg",
    recipe: {
      yield: "1 melt",
      ingredients: [
        "2 slices fermented GF bread",
        "Cultured cheese",
        "¼ cup house turmeric kraut (drained)",
        "Fresh greens",
        "Ghee for the press"
      ],
      steps: [
        "Layer cheese, kraut, and fresh greens between slices of fermented GF bread.",
        "Close and press-toast in ghee till golden and molten.",
        "Note: Add kraut after grilling starts so its live cultures aren't fully cooked out."
      ],
      notes: "Storage: kraut keeps weeks; grill sandwich to order."
    }
  },
  {
    id: "smashed-chickpea-sandwich",
    name: "Smashed Chickpea & Avocado Sandwich",
    category: "Toasties & Sandwiches",
    badges: ["High-Protein", "High-Fibre", "Fermented", "Gluten-Free", "No Added Sugar", "Vegan"],
    description: "Creamy smashed chickpeas and avocado bound with cultured cashew, fresh herbs and house-pickled carrot in soft gluten-free bread. Filling, protein-dense and genuinely crave-able.",
    pairsWith: "ALIVE · Lime",
    price: 220,
    image: "/all_image_files/kitchen/Gluten-free_sandwich_with_chickp…_202607060118.jpeg",
    recipe: {
      yield: "1 sandwich",
      ingredients: [
        "¾ cup cooked chickpeas + ½ avocado (smashed)",
        "2 tbsp cultured cashew cream",
        "Lemon + herbs + salt",
        "House pickled carrot",
        "2 slices GF bread"
      ],
      steps: [
        "Smash the chickpeas and avocado, and bind them with cultured cashew cream, lemon, herbs, and salt.",
        "Spread thick on bread, top with pickled carrot and greens.",
        "Close sandwich (toasting is optional)."
      ],
      notes: "Storage: filling holds 1 day chilled (lemon keeps avocado fresh); assemble to order."
    }
  },
  {
    id: "cultured-alfredo-pasta",
    name: "Cultured Alfredo Pasta",
    category: "Pasta",
    badges: ["High-Protein", "High-Fibre", "Fermented", "Gluten-Free", "No Added Sugar", "Veg"],
    description: "Legume pasta in a silky alfredo of overnight-cultured cashew cream (all the richness, zero dairy cream or maida), loaded with mushrooms, greens and roasted garlic. Comfort-food creamy, secretly full of fibre and live cultures.",
    pairsWith: "BATCH · Coconut Water Kefir",
    price: 300,
    image: "/all_image_files/kitchen/Legume_pasta_with_mushrooms_spinach_202607060118.jpeg",
    recipe: {
      yield: "1 plate",
      ingredients: [
        "80g legume/GF pasta",
        "¾ cup cultured cashew cream loosened with pasta water",
        "Sautéed mushroom + garlic + spinach",
        "Pepper",
        "Nutritional yeast/cheese",
        "Herbs"
      ],
      steps: [
        "Boil pasta al dente.",
        "Sauté mushrooms, garlic, and spinach.",
        "Fold in cultured cashew cream and a splash of pasta water to create a silky sauce. Don't boil hard to keep it cultured. Toss pasta and finish with pepper and herbs."
      ],
      notes: "Storage: cashew cream holds 3 days chilled; cook pasta to order."
    }
  },
  {
    id: "masala-marinara-pasta",
    name: "Masala Marinara Protein Pasta",
    category: "Pasta",
    badges: ["High-Protein", "High-Fibre", "Plant-Diverse", "Gluten-Free", "No Added Sugar", "Veg"],
    description: "Legume pasta in a rich, slow-cooked no-sugar tomato-masala sauce with olives, paneer and a spoon of house-fermented chilli, finished with fresh basil and coriander. Bold, saucy and protein-loaded.",
    pairsWith: "JOSH · Kala Khatta",
    price: 290,
    image: "/all_image_files/kitchen/Bowl_of_pasta_in_sauce_202607060118.jpeg",
    recipe: {
      yield: "1 plate",
      ingredients: [
        "80g legume pasta",
        "1 cup no-sugar tomato-masala sauce (slow-cooked tomato + onion + garlic + mild spices)",
        "Olives",
        "Cubed paneer",
        "1 tsp fermented chilli",
        "Basil + coriander"
      ],
      steps: [
        "Boil pasta according to package directions.",
        "Warm the tomato-masala sauce with paneer, olives, and fermented chilli.",
        "Toss the pasta through the sauce and finish with fresh basil and coriander."
      ],
      notes: "Storage: sauce holds 3 days chilled or can be frozen; assemble to order."
    }
  },
  {
    id: "loaded-bean-minestrone",
    name: "Loaded Bean Minestrone",
    category: "Soups",
    badges: ["High-Fibre", "High-Protein", "Plant-Diverse", "Fermented", "Gluten-Free", "No Added Sugar", "Veg"],
    description: "A thick, hearty five-bean and vegetable minestrone finished with a swirl of cultured curd and toasted seeds. A whole meal in a bowl — enormous fibre, real plant variety, deep comfort.",
    pairsWith: "STEEP · Golden Turmeric",
    price: 200,
    image: "/all_image_files/kitchen/Bowl_of_five-bean_minestrone_202607060118.jpeg",
    recipe: {
      yield: "1 large bowl",
      ingredients: [
        "1 cup mixed cooked beans (rajma, kabuli, moong, lobia, black chana)",
        "Diced carrot, beans, tomato, zucchini, spinach",
        "Garlic",
        "Herbs",
        "GF pasta bits (optional)",
        "Cultured curd swirl",
        "Toasted seeds"
      ],
      steps: [
        "Sauté garlic and vegetables. Add tomato, cooked beans, and water. Simmer for 15–20 minutes until hearty.",
        "Season with salt and pepper, then wilt the spinach into the soup.",
        "Serve hot with a swirl of cultured curd and toasted seeds."
      ],
      notes: "Storage: soup holds 3 days chilled or can be frozen; swirl curd fresh at serving."
    }
  },
  {
    id: "roasted-tomato-soup",
    name: "Roasted Tomato–Pepper Rasam Soup",
    category: "Soups",
    badges: ["Polyphenol-Rich", "Plant-Diverse", "Gluten-Free", "No Added Sugar", "Vegan"],
    description: "Fire-roasted tomatoes and red peppers blended with warming rasam spices and roasted garlic — a South-Indian-meets-comfort polyphenol powerhouse, served with fermented gluten-free toast soldiers.",
    pairsWith: "STEEP · Gut Chai",
    price: 190,
    image: "/all_image_files/kitchen/Roasted_tomato-pepper_soup_with_…_202607060118.jpeg",
    recipe: {
      yield: "1 bowl",
      ingredients: [
        "4 tomatoes + 1 red pepper + 4 garlic (roasted)",
        "Rasam spices (pepper, cumin, coriander, curry leaf, tamarind bit)",
        "Coriander",
        "Fermented GF toast soldiers"
      ],
      steps: [
        "Roast the tomatoes, red pepper, and garlic till charred.",
        "Blend with a little water, rasam spices, and the tamarind. Simmer for 8–10 minutes.",
        "Season and serve warm with fermented GF toast soldiers on the side."
      ],
      notes: "Storage: soup holds 3 days chilled or can be frozen."
    }
  },
  {
    id: "ferment-shakshuka",
    name: "Ferment Shakshuka",
    category: "Egg Specials",
    badges: ["High-Protein", "Polyphenol-Rich", "Fermented", "Gluten-Free", "No Added Sugar", "Contains Egg"],
    description: "Eggs gently poached in a rich, smoky fermented tomato-and-pepper base with herbs and seeds, served bubbling with fermented gluten-free bread to mop it all up. Protein-packed, deeply savoury, alive.",
    pairsWith: "JOSH · Masala Cola",
    price: 250,
    image: "/all_image_files/kitchen/Pan_of_sauce_with_eggs_202607060118.jpeg",
    recipe: {
      yield: "1 pan (1–2 eggs)",
      ingredients: [
        "1 cup fermented tomato-chilli base + fresh tomato + onion + capsicum + garlic",
        "Mild spices",
        "1–2 eggs",
        "Seeds",
        "Herbs",
        "Fermented GF bread"
      ],
      steps: [
        "Simmer the fermented and fresh tomato-pepper base to a thick sauce.",
        "Make wells in the sauce, crack in the eggs, cover, and cook until whites are set but yolks remain soft.",
        "Top with seeds and herbs. Serve with warm fermented GF bread."
      ],
      notes: "Storage: base holds 3 days chilled; poach eggs fresh to order."
    }
  },
  {
    id: "smoothie-bowl-grit",
    name: "PULP Smoothie Bowl + GRIT Crumble",
    category: "Smoothie Bowls",
    badges: ["High-Fibre", "Plant-Diverse", "No Added Sugar", "Gluten-Free", "Veg"],
    description: "A thick PULP smoothie served in a bowl, crowned with our GRIT whole-food crumble, fresh fruit and seeds. Product Lab, on a spoon — cool, creamy and fibre-loaded, sweetened by fruit alone.",
    pairsWith: "STEEP · Filter Kaapi",
    price: 240,
    image: "/all_image_files/kitchen/Smoothie_bowl_with_toppings_202607060118.jpeg",
    recipe: {
      yield: "1 bowl",
      ingredients: [
        "1 PULP smoothie base (frozen fruit + vegetable + curd/coconut blended thick, no sugar)",
        "GRIT crumble (broken whole-food bar)",
        "Fresh fruit",
        "Seeds",
        "Coconut"
      ],
      steps: [
        "Blend PULP base thick using minimal liquid and frozen fruit.",
        "Pour into a chilled bowl and top with GRIT crumble, fresh fruit, and seeds in neat rows."
      ],
      notes: "Storage: blend fresh to order; pre-portion and freeze fruit in advance."
    }
  }
];
