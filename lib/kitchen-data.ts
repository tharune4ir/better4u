export interface MenuItem {
  id: string;
  name: string;
  category: string;
  badges: string[];
  description: string;
  pairsWith: string;
  price: number;
  image: string;
}

export const KITCHEN_INTRO = {
  title: "The Kitchen",
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
    image: "/all_image_files/kitchen/Bowl_of_beans_and_vegetables_202607060118.jpeg"
  },
  {
    id: "sprout-seed-salad",
    name: "Sprout & Seed Superfood Salad",
    category: "Superfood Salads",
    badges: ["High-Protein", "Plant-Diverse", "Fermented", "Polyphenol-Rich", "Gluten-Free", "No Added Sugar", "Vegan"],
    description: "Living sprouts and five toasted seeds tossed with crunchy rainbow veg, jewel-bright pomegranate, fresh herbs and house-fermented pickled vegetables in a bright lemon dressing. Light, alive and quietly protein-packed.",
    pairsWith: "ALIVE · Lime",
    price: 210,
    image: "/all_image_files/kitchen/Bowl_of_sprouts_with_vegetables_202607060118.jpeg"
  },
  {
    id: "ferment-crust-pizza",
    name: "Ferment-Crust Deep-Dish Pizza",
    category: "Pizza",
    badges: ["Fermented", "High-Fibre", "Plant-Diverse", "Gluten-Free", "No Added Sugar", "Veg"],
    description: "A slow, naturally fermented gluten-free deep-dish base with real sourdough-style tang, a no-sugar slow-roasted tomato sauce, a generous load of colourful vegetables and mushrooms, cultured cheese, and a finish of house-pickled onion and chilli. Deep-dish indulgence, built to feed your good bacteria.",
    pairsWith: "ALIVE · Ginger",
    price: 360,
    image: "/all_image_files/kitchen/Pizza_in_cast-iron_pan_202607060118.jpeg"
  },
  {
    id: "paneer-tikka-pizza",
    name: "Paneer Tikka Superfood Pizza",
    category: "Pizza",
    badges: ["High-Protein", "Fermented", "Plant-Diverse", "Gluten-Free", "No Added Sugar", "Veg"],
    description: "Smoky curd-marinated paneer tikka over the fermented gluten-free base, loaded with capsicum, onion and greens, a no-sugar tomato-masala sauce, mint-coriander drizzle and pickled onion. India's favourite flavour, engineered clean and protein-rich.",
    pairsWith: "JOSH · Masala Cola",
    price: 340,
    image: "/all_image_files/kitchen/Gluten-free_pizza_with_paneer_tikka_202607060118.jpeg"
  },
  {
    id: "kraut-cheese-melt",
    name: "Kraut & Cheese Melt",
    category: "Toasties & Sandwiches",
    badges: ["Fermented", "High-Fibre", "Gluten-Free", "No Added Sugar", "Veg"],
    description: "Melty cultured cheese and our house turmeric-kraut pressed golden in fermented gluten-free bread with fresh greens. The perfect pairing — molten cheese and live, sour crunch.",
    pairsWith: "BATCH · Jamun-Lime Kombucha",
    price: 210,
    image: "/all_image_files/kitchen/Grilled_sandwich_with_cheese_pull_202607060118.jpeg"
  },
  {
    id: "smashed-chickpea-sandwich",
    name: "Smashed Chickpea & Avocado Sandwich",
    category: "Toasties & Sandwiches",
    badges: ["High-Protein", "High-Fibre", "Fermented", "Gluten-Free", "No Added Sugar", "Vegan"],
    description: "Creamy smashed chickpeas and avocado bound with cultured cashew, fresh herbs and house-pickled carrot in soft gluten-free bread. Filling, protein-dense and genuinely crave-able.",
    pairsWith: "ALIVE · Lime",
    price: 220,
    image: "/all_image_files/kitchen/Gluten-free_sandwich_with_chickp…_202607060118.jpeg"
  },
  {
    id: "cultured-alfredo-pasta",
    name: "Cultured Alfredo Pasta",
    category: "Pasta",
    badges: ["High-Protein", "High-Fibre", "Fermented", "Gluten-Free", "No Added Sugar", "Veg"],
    description: "Legume pasta in a silky alfredo of overnight-cultured cashew cream (all the richness, zero dairy cream or maida), loaded with mushrooms, greens and roasted garlic. Comfort-food creamy, secretly full of fibre and live cultures.",
    pairsWith: "BATCH · Coconut Water Kefir",
    price: 300,
    image: "/all_image_files/kitchen/Legume_pasta_with_mushrooms_spinach_202607060118.jpeg"
  },
  {
    id: "masala-marinara-pasta",
    name: "Masala Marinara Protein Pasta",
    category: "Pasta",
    badges: ["High-Protein", "High-Fibre", "Plant-Diverse", "Gluten-Free", "No Added Sugar", "Veg"],
    description: "Legume pasta in a rich, slow-cooked no-sugar tomato-masala sauce with olives, paneer and a spoon of house-fermented chilli, finished with fresh basil and coriander. Bold, saucy and protein-loaded.",
    pairsWith: "JOSH · Kala Khatta",
    price: 290,
    image: "/all_image_files/kitchen/Bowl_of_pasta_in_sauce_202607060118.jpeg"
  },
  {
    id: "loaded-bean-minestrone",
    name: "Loaded Bean Minestrone",
    category: "Soups",
    badges: ["High-Fibre", "High-Protein", "Plant-Diverse", "Fermented", "Gluten-Free", "No Added Sugar", "Veg"],
    description: "A thick, hearty five-bean and vegetable minestrone finished with a swirl of cultured curd and toasted seeds. A whole meal in a bowl — enormous fibre, real plant variety, deep comfort.",
    pairsWith: "STEEP · Golden Turmeric",
    price: 200,
    image: "/all_image_files/kitchen/Bowl_of_five-bean_minestrone_202607060118.jpeg"
  },
  {
    id: "roasted-tomato-soup",
    name: "Roasted Tomato–Pepper Rasam Soup",
    category: "Soups",
    badges: ["Polyphenol-Rich", "Plant-Diverse", "Gluten-Free", "No Added Sugar", "Vegan"],
    description: "Fire-roasted tomatoes and red peppers blended with warming rasam spices and roasted garlic — a South-Indian-meets-comfort polyphenol powerhouse, served with fermented gluten-free toast soldiers.",
    pairsWith: "STEEP · Gut Chai",
    price: 190,
    image: "/all_image_files/kitchen/Roasted_tomato-pepper_soup_with_…_202607060118.jpeg"
  },
  {
    id: "ferment-shakshuka",
    name: "Ferment Shakshuka",
    category: "Egg Specials",
    badges: ["High-Protein", "Polyphenol-Rich", "Fermented", "Gluten-Free", "No Added Sugar", "Contains Egg"],
    description: "Eggs gently poached in a rich, smoky fermented tomato-and-pepper base with herbs and seeds, served bubbling with fermented gluten-free bread to mop it all up. Protein-packed, deeply savoury, alive.",
    pairsWith: "JOSH · Masala Cola",
    price: 250,
    image: "/all_image_files/kitchen/Pan_of_sauce_with_eggs_202607060118.jpeg"
  },
  {
    id: "smoothie-bowl-grit",
    name: "PULP Smoothie Bowl + GRIT Crumble",
    category: "Smoothie Bowls",
    badges: ["High-Fibre", "Plant-Diverse", "No Added Sugar", "Gluten-Free", "Veg"],
    description: "A thick PULP smoothie served in a bowl, crowned with our GRIT whole-food crumble, fresh fruit and seeds. Product Lab, on a spoon — cool, creamy and fibre-loaded, sweetened by fruit alone.",
    pairsWith: "STEEP · Filter Kaapi",
    price: 240,
    image: "/all_image_files/kitchen/Smoothie_bowl_with_toppings_202607060118.jpeg"
  }
];
