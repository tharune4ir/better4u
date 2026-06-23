"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Search, 
  Clock, 
  Flame, 
  BookOpen, 
  Heart, 
  AlertTriangle, 
  Eye, 
  Sparkles,
  ChevronRight,
  X,
  Check
} from "lucide-react";

// Recipe interfaces
interface RecipeItem {
  id: string;
  title: string;
  category: "breakfast" | "mains" | "smoothies" | "ferments";
  tags: string[];
  prepTime: string;
  ingredients: string[];
  steps: string[];
  whyHeals: string;
  sensoryCues?: string;
  troubleshooting?: string;
  comingSoon?: boolean;
}

const RECIPES_DATA: RecipeItem[] = [
  // Ferments 1-8 (New)
  {
    id: "F1",
    title: "Fermented Kanji Rice (Pazhaya Sadam)",
    category: "ferments",
    tags: ["No-cook", "Beginner-proof", "Ferments", "Live Probiotics"],
    prepTime: "10 min + overnight",
    ingredients: [
      "½ cup cooked parboiled or brown rice (cooled)",
      "1.5 cups filtered water",
      "1 green chilli, sliced (optional, feeds wild yeast)",
      "2 tbsp homemade dahi/curd (optional starter)",
      "Pinch of unrefined salt"
    ],
    steps: [
      "Place cooled leftover cooked rice into a clean glass jar or clay pot.",
      "Pour filtered water over the rice until it is fully submerged.",
      "Drop in the sliced green chilli or stir in the curd starter if using.",
      "Cover the mouth of the container with a clean, breathable muslin cloth and secure it with a rubber band.",
      "Let it sit undisturbed overnight (8–12 hours) at room temperature.",
      "In the morning, strain the tangy probiotic water into a cup, mash the rice slightly with your hand, add salt, and consume together."
    ],
    sensoryCues: "Should smell mildly sour, clean, and refreshing, with tiny bubbles visible at the edges.",
    troubleshooting: "If it smells putrid, cheesy, or foul, discard immediately. This happens if the jar wasn't clean or the room was too hot. Sterilize the container and try again.",
    whyHeals: "Provides a powerful dose of live lactic acid bacteria and organic acids to kickstart morning digestion."
  },
  {
    id: "F2",
    title: "Cabbage Sauerkraut",
    category: "ferments",
    tags: ["No-cook", "Ferments", "Live Probiotics"],
    prepTime: "20 min + 5-10 days",
    ingredients: [
      "1 medium green cabbage (approx. 1kg, outer leaves removed)",
      "1.5 tbsp non-iodized sea salt or pink salt"
    ],
    steps: [
      "Shred the cabbage very thinly, discarding the tough inner core.",
      "Place the shredded cabbage in a large, clean mixing bowl and sprinkle the salt evenly over it.",
      "Using clean hands, massage and squeeze the cabbage firmly for 10 minutes. A pool of liquid (brine) will start forming at the bottom.",
      "Pack the massaged cabbage tightly into a clean glass jar, pressing down hard with your fist or a wooden spoon so the brine rises above the cabbage level.",
      "Weight the cabbage down (using a clean glass weight or a smaller jar filled with water) to keep it submerged. Seal the jar loosely.",
      "Keep the jar in a dark cupboard for 5–10 days. Burp the jar daily to release built-up gas. Taste after day 5. Once tangy, seal tightly and store in the fridge."
    ],
    sensoryCues: "Crisp, tangy flavor. You should see bubbles rising when you tap the glass jar.",
    troubleshooting: "A white film on the surface (Kahm yeast) is harmless; simply scrape it off. If you see fuzzy green, black, or blue mold, or if the smell is rotten, discard and start fresh.",
    whyHeals: "One of the most concentrated sources of diverse plant-based lactobacilli, loaded with prebiotic cabbage fiber."
  },
  {
    id: "F3",
    title: "Lacto-Fermented Root Vegetables",
    category: "ferments",
    tags: ["No-cook", "Ferments", "Live Probiotics"],
    prepTime: "15 min + 5-7 days",
    ingredients: [
      "2 cups vegetable batons (carrots, beetroot, radish, turnip)",
      "2 cups filtered water",
      "1 tbsp unrefined sea salt"
    ],
    steps: [
      "Whisk the sea salt into the water until completely dissolved to create a 3% salt brine.",
      "Pack the vegetable batons tightly into a clean glass jar, leaving 1 inch of headspace at the top.",
      "Pour the brine over the vegetables, ensuring they are completely submerged. Use a weight to keep them down.",
      "Cover the jar with a lid, closed loosely to allow gas to escape.",
      "Place the jar in a cool, dark corner for 5–7 days. When it tastes pleasantly sour, transfer to the refrigerator."
    ],
    sensoryCues: "The brine will turn cloudy and magenta (from the beetroot), and the vegetables will retain a sour crunch.",
    troubleshooting: "If the vegetables turn mushy, either the brine was too weak, or the room temperature was too hot. Discard and use slightly more salt next time.",
    whyHeals: "Provides soil-based and lactic acid bacteria while preserving the crunch and raw prebiotic starch of root vegetables."
  },
  {
    id: "F4",
    title: "Simple Water Kefir",
    category: "ferments",
    tags: ["No-cook", "Ferments", "Live Probiotics"],
    prepTime: "10 min + 24-48 hr",
    ingredients: [
      "¼ cup water kefir grains (active)",
      "¼ cup raw organic sugar or jaggery",
      "4 cups filtered water (chlorine-free)"
    ],
    steps: [
      "Dissolve the sugar in 1 cup of warm water, then stir in 3 cups of cold water to bring the liquid to room temperature.",
      "Pour the sugar water into a clean glass jar and add the water kefir grains.",
      "Cover the jar with a breathable cloth or coffee filter, secured with a rubber band.",
      "Let it sit at room temperature out of direct sunlight for 24–48 hours.",
      "Strain the liquid through a plastic strainer (avoid metal, which degrades kefir grains) to separate the grains. Bottle the liquid and store in the fridge, or set aside for a second fermentation."
    ],
    sensoryCues: "Sweet-tart flavor, bubbly, with a mild yeasty and fruity aroma.",
    troubleshooting: "If the grains turn slimy, they are stressed. Rinse them in clean water and let them rest in a weak sugar-water solution in the fridge for a week before brewing again.",
    whyHeals: "A yeast-and-bacteria ferment that introduces diverse probiotic strains not found in dairy ferments."
  },
  {
    id: "F5",
    title: "Steamed Besan Dhokla",
    category: "ferments",
    tags: ["One-pot", "Beginner-proof", "Ferments"],
    prepTime: "15 min + 8-12 hr ferment",
    ingredients: [
      "1.5 cups chickpea flour (besan)",
      "1 cup lukewarm water",
      "2 tbsp active curd or liquid whey",
      "½ tsp turmeric powder",
      "½ tsp salt",
      "1 tsp fruit salt (Eno)",
      "1 tbsp mustard seeds & curry leaves for tempering"
    ],
    steps: [
      "Whisk chickpea flour, water, curd/whey, turmeric, and salt into a smooth, lump-free batter.",
      "Cover and place in a warm spot for 8–12 hours to ferment until slightly aerated and sour-smelling.",
      "Grease a steaming tin. Prepare your steamer.",
      "Just before steaming, add the fruit salt (Eno) to the batter and stir gently in one direction. The batter will double in volume and foam up.",
      "Immediately pour the batter into the greased tin and steam for 15 minutes.",
      "Cool slightly, cut into squares, and pour a hot tempering of mustard seeds and curry leaves over the top."
    ],
    sensoryCues: "Spongy, light texture with a clean, savory aroma.",
    troubleshooting: "If the dhokla turns out dense or flat, either the batter did not ferment long enough, or it sat too long after adding the Eno before steaming.",
    whyHeals: "Natural fermentation breaks down the hard-to-digest starches and phytates in chickpea flour, preventing gas."
  },
  {
    id: "F6",
    title: "Millet Idli & Dosa Batter",
    category: "ferments",
    tags: ["Ferments", "Beginner-proof"],
    prepTime: "30 min + 8-12 hr ferment",
    ingredients: [
      "3 cups foxtail or proso millet",
      "1 cup whole skinless urad dal (black gram)",
      "1 tsp fenugreek seeds (methi)",
      "1.5 tsp rock salt",
      "Water for grinding"
    ],
    steps: [
      "Rinse and soak the millet in one bowl, and the urad dal + fenugreek seeds in another bowl, for 5–6 hours.",
      "Drain the dal, grind in a blender with ice-cold water (poured in splashes) until it becomes a light, fluffy, volume-dense paste.",
      "Drain and grind the millet separately with minimal water to a slightly coarse, semolina-like consistency.",
      "Mix both batters together in a large vessel using your hands (the warmth and natural flora of your hands aid the fermentation process).",
      "Add salt, cover, and let ferment in a warm spot for 8–12 hours until the batter has risen and is frothy. Use to steam idlis or pan-fry dosas."
    ],
    sensoryCues: "The batter should rise to double its volume, look aerated with bubbles, and have a fresh, sour scent.",
    troubleshooting: "In cold weather, the batter won't rise. Place the bowl inside a shut oven with the light bulb turned ON to keep it warm.",
    whyHeals: "Unlocks the nutrients in millets and urad dal, creating an easily absorbable source of protein and complex carbs."
  },
  {
    id: "F7",
    title: "Spiced Beet-Carrot Kanji",
    category: "ferments",
    tags: ["No-cook", "Ferments", "Live Probiotics"],
    prepTime: "15 min + 4-5 days",
    ingredients: [
      "2 medium carrots (preferably black carrots, or orange ones)",
      "1 small beetroot",
      "5 cups filtered water",
      "2 tbsp yellow mustard seeds (ground coarsely)",
      "1.5 tsp black salt or rock salt"
    ],
    steps: [
      "Peel the carrots and beetroot, and cut them into thick batons (finger-sized pieces).",
      "In a clean glass jar, combine the vegetable batons, ground mustard, black salt, and filtered water.",
      "Stir with a dry wooden spoon. Cover the jar mouth with a muslin cloth and tie it securely.",
      "Place the jar in a sunny window or warm spot for 4–5 days, stirring once daily.",
      "Once it tastes sharp, tangy, and slightly pungent, strain the liquid and store it in the fridge."
    ],
    sensoryCues: "Intense magenta color, tangy taste, with a pleasant mustard heat.",
    troubleshooting: "If a thin white film forms on top, scrape it off (it is Kahm yeast). If fuzzy, colored mold grows, discard the batch.",
    whyHeals: "Rich in anthocyanin and betalain antioxidants (polyphenols) that selectively feed anti-inflammatory gut microbes."
  },
  {
    id: "F8",
    title: "Traditional Ragi Koozh",
    category: "ferments",
    tags: ["Ferments", "Cooling"],
    prepTime: "15 min + overnight",
    ingredients: [
      "½ cup ragi (finger millet) flour",
      "2 cups water",
      "½ cup fresh buttermilk (chaas)",
      "Pinch of salt",
      "1 tbsp raw red onion, finely chopped"
    ],
    steps: [
      "In a pot, whisk the ragi flour into 1.5 cups of cold water until completely lump-free.",
      "Cook on low heat, stirring constantly. It will thicken into a glossy, dark chocolate-colored paste in 8–10 minutes. Turn off heat.",
      "Let it cool completely. Transfer the porridge to a clay pot, cover, and let it ferment overnight (12 hours).",
      "The next morning, whisk in the buttermilk, salt, and enough water to bring it to a thick drinking consistency.",
      "Garnish with chopped raw onion and sip cold."
    ],
    sensoryCues: "Tangy, earthy, and highly cooling to the throat and stomach.",
    troubleshooting: "To prevent lumps, always whisk the flour thoroughly in cold water before turning on the heat.",
    whyHeals: "Highly cooling for body heat, rich in iron, calcium, and active lactic cultures from the buttermilk + fermentation."
  },

  // R1-R12 (Core Recipes)
  {
    id: "R1",
    title: "Foxtail–Moong Khichdi",
    category: "mains",
    tags: ["One-pot", "Soothing", "Mains", "Warm"],
    prepTime: "30 min",
    ingredients: [
      "½ cup foxtail millet",
      "½ cup split yellow moong dal",
      "1 cup chopped soft vegetables (bottle gourd/carrot/spinach)",
      "1 tbsp cow ghee",
      "1 tsp cumin seeds",
      "Pinch of hing (asafoetida)",
      "1 tsp fresh ginger, grated",
      "¼ tsp turmeric powder",
      "½ tsp rock salt",
      "4 cups water"
    ],
    steps: [
      "Rinse the millet and dal together 3 times; soak in water for 20 minutes, then drain.",
      "Heat ghee in a pressure cooker on medium; add cumin seeds and let them sizzle for 15 seconds.",
      "Stir in hing and grated ginger; sauté for 10 seconds.",
      "Add the chopped vegetables and sauté for 1 minute.",
      "Add the drained millet and dal, turmeric, salt, and water. Stir well.",
      "Close the pressure cooker lid. Cook for 3–4 whistles, then turn off heat. Let the pressure release naturally.",
      "Open, mash slightly with a ladle, and serve warm with a drizzle of ghee."
    ],
    whyHeals: "Moong is the gentlest protein on a healing gut; ghee supports the gut lining, and the spices prevent gas."
  },
  {
    id: "R2",
    title: "Moong Pesarattu Crepe",
    category: "breakfast",
    tags: ["High Protein", "Breakfast", "Crispy"],
    prepTime: "25 min + soaking",
    ingredients: [
      "1 cup whole green moong (soaked 5–6 hours)",
      "1 inch ginger piece",
      "1 green chilli",
      "½ tsp salt",
      "½ raw onion, finely chopped (for topping)",
      "1 tsp oil/ghee for the pan"
    ],
    steps: [
      "Drain the soaked moong; blend in a mixer with ginger, chilli, salt, and ~½ cup water to a smooth, pourable batter.",
      "Heat a cast-iron skillet on medium; splash a few drops of water to check heat (it should sizzle).",
      "Pour a ladle of batter in the center. Using the back of the ladle, spread it in a spiral outward into a thin circle.",
      "Drizzle a few drops of oil/ghee around the edges. Scatter chopped onion on top and press gently.",
      "Cook for 2–3 minutes until the bottom turns golden-brown. Flip and cook for 1 minute more. Fold and serve."
    ],
    whyHeals: "Whole moong contains high prebiotic fiber and complete plant proteins without inducing bloating."
  },
  {
    id: "R3",
    title: "Universal Dal + Brown Rice",
    category: "mains",
    tags: ["Mains", "Warm", "Beginner-proof"],
    prepTime: "35 min",
    ingredients: [
      "1 cup split moong dal",
      "1 cup brown rice",
      "1 tbsp ghee",
      "1 tsp cumin seeds",
      "1 tsp ginger, grated",
      "Pinch of hing",
      "½ tsp turmeric & salt",
      "½ raw onion & lemon wedge (for serving)"
    ],
    steps: [
      "Soak brown rice for 30 minutes, then cook in 2.5 cups water (simmer covered for 25–30 minutes).",
      "Pressure-cook moong dal with water, turmeric, and salt for 3 whistles. Mash slightly.",
      "Prepare a Tadka: heat ghee, add cumin, hing, and ginger. Sauté till golden and pour sizzling over the dal.",
      "Serve the warm dal over brown rice, finished with a squeeze of lemon and raw onion slices on the side."
    ],
    whyHeals: "The classic comforting complete protein pair. Cumin and ginger neutralize bean gas, while raw onion feeds beneficial bacteria."
  },
  {
    id: "R4",
    title: "Gongura Pappu (Andhra Sorrel Dal)",
    category: "mains",
    tags: ["Mains", "Warm", "Polyphenol"],
    prepTime: "30 min",
    ingredients: [
      "¾ cup toor dal (pigeon peas)",
      "2 cups gongura (sorrel) leaves, washed",
      "¼ tsp turmeric powder",
      "½ tsp salt",
      "1 tbsp ghee",
      "3 cloves garlic, crushed",
      "1 dry red chilli"
    ],
    steps: [
      "Pressure-cook the toor dal in 2 cups of water with turmeric for 4 whistles until completely soft, then mash.",
      "In a separate pan, cook the washed gongura leaves with a splash of water for 3-4 minutes until they wilt into a sour pulp.",
      "Stir the gongura pulp and salt into the mashed dal. Simmer on low heat for 3 minutes.",
      "In a small tempering pan, heat ghee. Add garlic and red chilli. Sauté until garlic is golden, then pour over the dal."
    ],
    whyHeals: "Gongura leaves are exceptionally rich in gut-loving polyphenols; garlic provides strong prebiotics."
  },
  {
    id: "R5",
    title: "Any-Vegetable Sabzi",
    category: "mains",
    tags: ["Mains", "Beginner-proof", "Quick <20 min"],
    prepTime: "20 min",
    ingredients: [
      "2 cups chopped vegetables of choice (pumpkin/okra/beetroot/lauki/cabbage)",
      "1 tbsp cold-pressed oil",
      "½ tsp cumin & mustard seeds",
      "½ onion, chopped",
      "1 tomato, chopped",
      "¼ tsp turmeric, salt, & coriander powder",
      "Fresh coriander leaves"
    ],
    steps: [
      "Heat oil in a pan on medium. Add cumin and mustard seeds. Let them pop.",
      "Add onion and sauté for 3 minutes until soft.",
      "Add tomato and cook for 3 minutes until mushy.",
      "Add the spices (turmeric, salt, coriander powder) and stir.",
      "Toss in the chopped vegetables. Splash with water, cover, and cook on low heat for 10–12 minutes until tender. Garnish with coriander."
    ],
    whyHeals: "Rotating your daily vegetables is the easiest way to hit the target of 30+ different plant species per week."
  },
  {
    id: "R6",
    title: "Curd–Berry–Seed Bowl",
    category: "breakfast",
    tags: ["No-cook", "Breakfast", "Live Probiotics", "Polyphenol"],
    prepTime: "5 min",
    ingredients: [
      "¾ cup fresh home-set curd (dahi)",
      "½ cup fresh pomegranate seeds or jamun",
      "1 tbsp ground flaxseeds",
      "1 tsp chia seeds",
      "1 tbsp raw pumpkin seeds"
    ],
    steps: [
      "Spoon the fresh home-set curd into a serving bowl.",
      "Top with the fresh berries, pomegranate, or jamun.",
      "Sprinkle the flaxseeds, chia seeds, and pumpkin seeds over the top. Eat immediately."
    ],
    whyHeals: "Combines live gut-friendly bacteria with seed mucilage to coat and heal the stomach lining."
  },
  {
    id: "R7",
    title: "Ragi Ambali Porridge",
    category: "breakfast",
    tags: ["Breakfast", "Cooling", "Live Probiotics"],
    prepTime: "10 min + cooling",
    ingredients: [
      "3 tbsp ragi (finger millet) flour",
      "1.5 cups water",
      "¼ cup spiced buttermilk (chaas)",
      "4 curry leaves",
      "Pinch of salt"
    ],
    steps: [
      "Whisk ragi flour and 1 cup of cold water in a bowl until free of lumps.",
      "Bring the remaining ½ cup of water to a boil, then pour in the ragi mixture.",
      "Cook on low heat, stirring continuously, for 5 minutes until it thickens into a porridge. Let it cool completely.",
      "Stir in the buttermilk, curry leaves, and a pinch of salt. Serve cool."
    ],
    whyHeals: "Fermented ragi delivers highly bioavailable minerals alongside live cultures in a cooling format."
  },
  {
    id: "R8",
    title: "Spiced Neer-Mor (Buttermilk)",
    category: "smoothies",
    tags: ["No-cook", "Smoothies", "Live Probiotics", "Quick <20 min"],
    prepTime: "5 min",
    ingredients: [
      "½ cup fresh curd",
      "1.5 cups cold water",
      "½ tsp fresh ginger juice",
      "¼ tsp roasted cumin powder",
      "4 curry leaves, chopped",
      "Pinch of black salt"
    ],
    steps: [
      "Add the curd and water to a pitcher. Whisk or blend for 20 seconds until frothy.",
      "Stir in the ginger juice, cumin powder, black salt, and chopped curry leaves.",
      "Serve chilled after lunch."
    ],
    whyHeals: "Replenishes beneficial gut flora while cumin and ginger prevent post-meal bloating."
  },
  {
    id: "R9",
    title: "Purple Polyphenol Smoothie",
    category: "smoothies",
    tags: ["No-cook", "Smoothies", "Polyphenol"],
    prepTime: "5 min",
    ingredients: [
      "1 cup coconut milk (unsweetened)",
      "¼ cooked beetroot",
      "½ cup blueberries or jamun",
      "1 tsp chia seeds",
      "2 dates, pitted and soaked"
    ],
    steps: [
      "Add the coconut milk, beetroot, berries, chia seeds, and soaked dates to a high-speed blender.",
      "Blend on high for 60 seconds until creamy and smooth. Serve immediately."
    ],
    whyHeals: "Beetroot and dark berries contain rich pigments (polyphenols) that specifically feed and multiply beneficial Bifidobacteria."
  },
  {
    id: "R10",
    title: "Sattu Sharbat Tonic",
    category: "smoothies",
    tags: ["No-cook", "Smoothies", "Quick <20 min"],
    prepTime: "5 min",
    ingredients: [
      "3 tbsp roasted chana (sattu) flour",
      "1.5 cups cold water",
      "Juice of ½ lemon",
      "¼ tsp roasted cumin powder",
      "4 mint leaves, crushed",
      "Pinch of pink salt"
    ],
    steps: [
      "Add sattu flour and water to a glass. Whisk vigorously until smooth and lump-free.",
      "Stir in the lemon juice, roasted cumin, pink salt, and crushed mint leaves.",
      "Serve cool."
    ],
    whyHeals: "High-protein, highly soluble plant fiber that digests easily and supports the gut lining."
  },
  {
    id: "R11",
    title: "Probiotic Beet Kanji",
    category: "smoothies",
    tags: ["No-cook", "Smoothies", "Live Probiotics"],
    prepTime: "10 min + ferment",
    ingredients: [
      "1 beetroot, cut into batons",
      "4 cups filtered water",
      "2 tsp ground mustard seeds",
      "1 tsp rock salt"
    ],
    steps: [
      "Place beetroot batons in a clean glass jar.",
      "Add water, ground mustard seeds, and salt. Stir well.",
      "Cover the mouth with a clean cloth. Let ferment in a sunny window for 3–5 days, stirring once daily.",
      "Refrigerate and drink ½ cup daily."
    ],
    whyHeals: "A living probiotic liquid that seeds diverse bacterial strains into the gut."
  },
  {
    id: "R12",
    title: "Jeera–Ajwain–Saunf Tea",
    category: "smoothies",
    tags: ["No-cook", "Smoothies", "Quick <20 min"],
    prepTime: "10 min",
    ingredients: [
      "½ tsp cumin seeds (jeera)",
      "½ tsp carom seeds (ajwain)",
      "½ tsp fennel seeds (saunf)",
      "2 cups water"
    ],
    steps: [
      "Combine all seeds and water in a saucepan.",
      "Bring to a boil, then simmer on low heat for 5 minutes.",
      "Turn off the heat, cover, and let steep for 5 minutes.",
      "Strain and sip warm after heavy meals."
    ],
    whyHeals: "Classic herbal carminatives that relax gut muscles and immediately calm bloating, gas, or cramps."
  },
  
  // Future Items (Coming Soon placeholders)
  {
    id: "COMING1",
    title: "Rejuvelac",
    category: "ferments",
    tags: ["Ferments", "Live Probiotics"],
    prepTime: "Coming Soon",
    ingredients: ["Sprouted wheatberries or quinoa", "Filtered water"],
    steps: ["Recipe currently in testing phase. Coming soon!"],
    whyHeals: "Living enzymatic wild ferment.",
    comingSoon: true
  },
  {
    id: "COMING2",
    title: "Apple Cider Vinegar (ACV with Mother)",
    category: "ferments",
    tags: ["Ferments", "Live Probiotics"],
    prepTime: "Coming Soon",
    ingredients: ["Organic apples", "Sugar", "Water"],
    steps: ["Recipe currently in testing phase. Coming soon!"],
    whyHeals: "Acidity regulator and digestive stimulant.",
    comingSoon: true
  },
  {
    id: "COMING3",
    title: "Wild Tea Kombucha",
    category: "ferments",
    tags: ["Ferments", "Live Probiotics"],
    prepTime: "Coming Soon",
    ingredients: ["SCOBY culture", "Black tea", "Sugar"],
    steps: ["Recipe currently in testing phase. Coming soon!"],
    whyHeals: "Effervescent probiotic tea.",
    comingSoon: true
  }
];

export default function RecipesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeItem | null>(null);

  // Filter logic
  const filteredRecipes = useMemo(() => {
    return RECIPES_DATA.filter(recipe => {
      // Search match
      const matchesSearch = 
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        recipe.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      // Filter match
      if (activeFilter === "all") return true;
      if (activeFilter === "breakfast") return recipe.category === "breakfast";
      if (activeFilter === "mains") return recipe.category === "mains";
      if (activeFilter === "smoothies") return recipe.category === "smoothies";
      if (activeFilter === "ferments") return recipe.category === "ferments";
      if (activeFilter === "quick") return recipe.tags.includes("Quick <20 min");
      if (activeFilter === "one-pot") return recipe.tags.includes("One-pot");
      if (activeFilter === "no-cook") return recipe.tags.includes("No-cook");
      if (activeFilter === "beginner") return recipe.tags.includes("Beginner-proof");

      return true;
    });
  }, [searchQuery, activeFilter]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F2] relative overflow-hidden">
      
      {/* Background blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#2A7F7F]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-45 w-full h-20 border-b border-black/[0.03] bg-[#F7F6F2]/75 backdrop-blur-md flex items-center justify-between px-6 md:px-12 select-none">
        <button 
          onClick={() => router.push("/food")}
          className="flex items-center gap-2 text-sm font-semibold text-[#2A7F7F] hover:opacity-80 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Food Wing</span>
        </button>
        <div className="text-right">
          <span className="text-sm tracking-widest text-[#2A7F7F] font-bold uppercase bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-3 py-1 rounded-full">
            Phase 3 Draft
          </span>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-28 md:pb-16 z-10 relative">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl font-extralight text-slate-900 tracking-tight">
            The Gut-Healing <span className="font-semibold text-slate-950">Recipe Hub</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-500 font-light mt-2 max-w-2xl leading-relaxed">
            Simple, gluten-free, vegetarian recipes structured to make gut-friendly cooking completely automatic and beginner-proof.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-4.5 w-4.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search recipes, ingredients, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-black/[0.04] rounded-2xl text-base font-light text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2A7F7F]/40 focus:bg-white transition-all shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
            />
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: "all", label: "All Recipes" },
              { id: "breakfast", label: "Breakfasts" },
              { id: "mains", label: "Lunch & Dinner" },
              { id: "smoothies", label: "Smoothies & Tonics" },
              { id: "ferments", label: "Ferments" },
              { id: "beginner", label: "Beginner-proof" },
              { id: "quick", label: "Quick (<20 min)" },
              { id: "one-pot", label: "One-pot" },
              { id: "no-cook", label: "No-cook" }
            ].map(chip => (
              <button
                key={chip.id}
                onClick={() => setActiveFilter(chip.id)}
                className={`px-3.5 py-1.5 rounded-xl text-sm font-medium tracking-wide transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === chip.id
                    ? "bg-[#2A7F7F] text-white shadow-sm"
                    : "bg-white/60 border border-black/[0.03] text-slate-600 hover:bg-white"
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Recipe Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredRecipes.map(recipe => (
              <motion.div
                layout
                key={recipe.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedRecipe(recipe)}
                className={`glassmorphic rounded-3xl p-6 border border-black/[0.03] hover:border-[#2A7F7F]/30 hover:shadow-[0_8px_30px_rgba(42,127,127,0.02)] transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  recipe.comingSoon ? "opacity-60 bg-white/20 hover:border-black/[0.04]" : "bg-white/40"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="text-sm font-bold text-[#2A7F7F] bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-2.5 py-0.5 rounded-md">
                      {recipe.id}
                    </span>
                    <span className="text-sm text-slate-400 font-light flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {recipe.prepTime}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-slate-900 mb-2.5">
                    {recipe.title} {recipe.comingSoon && <span className="text-sm font-normal text-amber-600">(Soon)</span>}
                  </h3>
                  <p className="text-base text-slate-500 font-light leading-relaxed mb-4 line-clamp-2">
                    {recipe.ingredients.slice(0, 3).join(", ")}...
                  </p>
                </div>

                <div className="mt-4 pt-3.5 border-t border-black/[0.02] flex items-center justify-between">
                  <div className="flex gap-1 overflow-hidden">
                    {recipe.tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="text-sm text-slate-400 bg-slate-100 border border-slate-200/50 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-[#2A7F7F] font-semibold flex items-center gap-0.5 hover:translate-x-0.5 transition-transform">
                    {recipe.comingSoon ? "Locked" : "Cook"}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-16">
            <p className="text-base text-slate-400 font-light">No recipes found matching your query.</p>
          </div>
        )}
      </main>

      {/* Recipe Detail Modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRecipe(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* Content Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-[#F7F6F2] w-full max-w-2xl rounded-3xl border border-black/[0.05] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Modal Header */}
              <div className="px-6 py-5 border-b border-black/[0.03] flex items-center justify-between bg-white/40">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-bold text-[#2A7F7F] bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-2.5 py-0.5 rounded-md">
                    {selectedRecipe.id}
                  </span>
                  <span className="text-sm text-slate-400 font-light flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {selectedRecipe.prepTime}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="p-1.5 rounded-full hover:bg-slate-200/50 transition-colors"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-slate-955 mb-3">{selectedRecipe.title}</h2>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedRecipe.tags.map((tag, i) => (
                      <span key={i} className="text-sm font-bold uppercase tracking-wider text-[#2A7F7F] bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-2.5 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedRecipe.comingSoon ? (
                  <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-6 text-center">
                    <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                    <h4 className="text-base font-bold text-slate-800 uppercase tracking-wider">Formula Under Active Testing</h4>
                    <p className="text-base text-slate-500 font-light mt-1.5 max-w-sm mx-auto leading-relaxed">
                      We are currently tuning hydration ratios and fermentation times for this live prebiotic culture. Draft will unlock in the next system push.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Ingredients & Steps */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                      <div className="md:col-span-2 space-y-3">
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" />
                          Ingredients
                        </h4>
                        <ul className="space-y-2">
                          {selectedRecipe.ingredients.map((ing, i) => (
                            <li key={i} className="text-base text-slate-700 font-light leading-relaxed flex items-start gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#2A7F7F]/30 mt-1.5 flex-shrink-0" />
                              <span>{ing}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="md:col-span-3 space-y-3">
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                          <Flame className="w-3.5 h-3.5" />
                          Instructions
                        </h4>
                        <ol className="space-y-3">
                          {selectedRecipe.steps.map((step, i) => (
                            <li key={i} className="text-base text-slate-700 font-light leading-relaxed flex items-start gap-2.5">
                              <span className="font-semibold text-[#2A7F7F] text-base w-4 flex-shrink-0">
                                {i + 1}.
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>

                    {/* Sensory Cues & Troubleshooting if present */}
                    {(selectedRecipe.sensoryCues || selectedRecipe.troubleshooting) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-black/[0.03] pt-5">
                        {selectedRecipe.sensoryCues && (
                          <div className="bg-slate-100/50 border border-black/[0.02] rounded-2xl p-4">
                            <h5 className="text-sm font-bold text-slate-505 uppercase tracking-widest flex items-center gap-1 mb-1.5">
                              <Eye className="w-3.5 h-3.5 text-slate-400" />
                              Sensory Cues
                            </h5>
                            <p className="text-base text-slate-600 font-light leading-relaxed">
                              {selectedRecipe.sensoryCues}
                            </p>
                          </div>
                        )}
                        {selectedRecipe.troubleshooting && (
                          <div className="bg-amber-500/[0.03] border border-amber-500/10 rounded-2xl p-4">
                            <h5 className="text-sm font-bold text-amber-700 uppercase tracking-widest flex items-center gap-1 mb-1.5">
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                              If it goes wrong
                            </h5>
                            <p className="text-base text-amber-800 font-light leading-relaxed">
                              {selectedRecipe.troubleshooting}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Why this heals */}
                    <div className="bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 rounded-2xl p-4 sm:p-5 flex gap-3.5 items-start">
                      <div className="p-2 rounded-xl bg-white/60 border border-[#2A7F7F]/10 flex-shrink-0">
                        <Heart className="w-4 h-4 text-[#2A7F7F] fill-[#2A7F7F]/10" />
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-[#2A7F7F] uppercase tracking-widest mb-1">
                          Why this heals
                        </h5>
                        <p className="text-base text-[#2A7F7F] font-medium leading-relaxed italic">
                          "{selectedRecipe.whyHeals}"
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="w-full text-center py-8 pb-10 text-sm tracking-widest text-slate-400 font-light select-none border-t border-black/[0.02] bg-white/20 mt-auto">
        BUILT IN THE OPEN. ONE REP AT A TIME.
      </footer>
    </div>
  );
}
