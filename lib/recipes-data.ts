export interface Recipe {
  number: string;
  slug: string;
  title: string;
  group: string;
  why: string;
  plantPoints: number;
  ingredients: string;
  steps: string[];
  hacks: string;
  swaps: string;
  image: string;
  tags: string[];
}

export const GROUP_ORDER = [
  "Your Rice Base",
  "Dals",
  "Khichdi & One-Pot",
  "Fermented & Curd-Based",
  "Gentle Vegetables",
  "Soups & Rasam",
  "Breakfast & Porridge",
  "Chutneys & Podis",
  "Gut Tonics"
] as const;

export const RECIPES: Recipe[] = [
  {
    number: "01",
    slug: "red-matta-rice",
    title: "Perfect Red Matta Rice",
    group: "Your Rice Base",
    why: "Kerala Red Matta is a parboiled red rice — gentle to digest, higher in fibre and minerals than white rice, and the calm, steady base every meal is built on.",
    plantPoints: 1,
    ingredients: "1 cup Red Matta rice · 3½ cups water · pinch salt.",
    steps: [
      "Rinse the rice in 2–3 changes of water. Soak 20–30 min if you can.",
      "Add rice + water + salt to the pressure cooker.",
      "Cook on medium for 4–5 whistles (red rice is tougher than white).",
      "Let the pressure drop on its own, open, fluff gently."
    ],
    hacks: "cook a double batch and fridge it — it reheats in a minute with a splash of water, and cooled-then-reheated rice is actually better for your gut (resistant starch).",
    swaps: "mix in a handful of soaked foxtail millet for variety.",
    image: "/all_image_files/journal/first-batch/recipe-01-red-matta-rice.jpg",
    tags: ["G"]
  },
  {
    number: "02",
    slug: "curd-rice",
    title: "Soft Curd Rice",
    group: "Your Rice Base",
    why: "curd + soft rice is the most soothing meal there is — cooling, probiotic, and easy on the calmest or crankiest gut.",
    plantPoints: 4,
    ingredients: "1½ cups cooked Red Matta rice (soft) · 1 cup curd · tadka: 1 tsp ghee, ½ tsp mustard + cumin, curry leaves, pinch hing, grated ginger · grated carrot + pomegranate to top.",
    steps: [
      "Lightly mash the cooked rice so it's soft; let it cool to warm (not hot).",
      "Mix in the curd + a little salt.",
      "Make the tadka (see Master Techniques) and pour over.",
      "Top with carrot and pomegranate."
    ],
    hacks: "add curd only when the rice is warm, not hot, so the good bacteria survive.",
    swaps: "grated cucumber instead of carrot on a hot day.",
    image: "/all_image_files/journal/first-batch/recipe-02-curd-rice.jpg",
    tags: ["F", "A"]
  },
  {
    number: "03",
    slug: "moong-dal",
    title: "Everyday Moong Dal",
    group: "Dals",
    why: "split moong is the easiest lentil to digest — smooth, light, low on gas — and your reliable daily protein.",
    plantPoints: 4,
    ingredients: "¾ cup moong dal (split yellow) · 2½ cups water · ½ tsp turmeric · tadka: ghee, cumin, garlic, curry leaves, hing · coriander.",
    steps: [
      "Rinse dal well.",
      "Pressure-cook dal + water + turmeric + salt for 3–4 whistles till soft.",
      "Whisk smooth, add water for a pourable consistency, simmer 2 min.",
      "Pour over the tadka, finish with coriander."
    ],
    hacks: "cook a big batch; dal keeps 3 days in the fridge and is your instant protein.",
    swaps: "stir in a handful of chopped spinach or bottle gourd while simmering — hidden plants.",
    image: "/all_image_files/journal/first-batch/recipe-03-moong-dal.jpg",
    tags: ["L", "A"]
  },
  {
    number: "04",
    slug: "mixed-dal-tadka",
    title: "Mixed Dal Tadka",
    group: "Dals",
    why: "mixing lentils feeds a wider range of gut bugs than any single dal.",
    plantPoints: 6,
    ingredients: "¾ cup mixed dal (moong + toor + masoor) · 2½ cups water · turmeric · 1 chopped tomato · tadka: ghee, cumin, garlic, ginger, curry leaves, hing · coriander.",
    steps: [
      "Rinse.",
      "Pressure-cook the dals + water + turmeric + tomato + salt for 4 whistles.",
      "Whisk smooth, loosen with water, simmer 3 min.",
      "Pour over tadka + coriander."
    ],
    hacks: "keep a jar of pre-mixed dals ready so it's one scoop.",
    swaps: "any 2–3 dals you have on hand.",
    image: "/all_image_files/journal/first-batch/recipe-04-mixed-dal-tadka.jpg",
    tags: ["L", "A"]
  },
  {
    number: "05",
    slug: "vegetable-sambar",
    title: "Mild Vegetable Sambar",
    group: "Dals",
    why: "a gentle, non-spicy sambar packs a lentil and several vegetables into one comforting pot — big plant diversity, soft and soothing.",
    plantPoints: 9,
    ingredients: "¾ cup toor dal · mixed soft veg (bottle gourd, carrot, pumpkin, beans) · small lime-sized tamarind (soaked) · turmeric · 1 tsp coriander powder + ¼ tsp pepper (mild — skip chilli) · tadka: ghee, mustard, cumin, curry leaves, hing.",
    steps: [
      "Pressure-cook dal + turmeric till soft (4 whistles); whisk smooth.",
      "In a pot, boil the chopped veg till tender.",
      "Add the mashed dal, tamarind water, coriander powder, pepper, salt; simmer 8–10 min.",
      "Pour over tadka."
    ],
    hacks: "use whatever soft vegetables are in the fridge — sambar is the great \"clear-out\" dish.",
    swaps: "ready sambar powder works, but keep it mild.",
    image: "/all_image_files/journal/first-batch/recipe-05-vegetable-sambar.jpg",
    tags: ["L", "S", "A"]
  },
  {
    number: "06",
    slug: "moong-dal-khichdi",
    title: "Moong Dal Khichdi",
    group: "Khichdi & One-Pot",
    why: "rice + moong dal cooked soft together is the single most soothing, complete, easy-to-digest meal — the dish to lean on any day your stomach wants calm.",
    plantPoints: 5,
    ingredients: "¾ cup Red Matta rice · ½ cup moong dal · 4 cups water · turmeric · tadka: ghee, cumin, ginger, curry leaves, hing.",
    steps: [
      "Rinse rice + dal together.",
      "Pressure-cook with water + turmeric + salt for 5 whistles — you want it soft and porridge-like.",
      "Mash lightly, loosen with hot water.",
      "Pour over the ghee tadka."
    ],
    hacks: "add a fistful of chopped carrot/bottle gourd before cooking to turn it into a full meal.",
    swaps: "foxtail millet instead of rice for a gentle millet version (see Millet Guide).",
    image: "/all_image_files/journal/first-batch/recipe-06-moong-dal-khichdi.jpg",
    tags: ["G", "L", "A"]
  },
  {
    number: "07",
    slug: "vegetable-khichdi",
    title: "Vegetable Red Matta Khichdi",
    group: "Khichdi & One-Pot",
    why: "one pot, one flame, a whole balanced plate — grain + lentil + vegetables together. Maximum nutrition, minimum effort and washing up.",
    plantPoints: 9,
    ingredients: "¾ cup Red Matta rice · ½ cup moong dal · mixed veg (carrot, beans, peas, pumpkin) · turmeric · 4½ cups water · tadka: ghee, cumin, ginger, garlic, curry leaves, hing.",
    steps: [
      "Rinse rice + dal.",
      "Add everything + water + turmeric + salt to the cooker.",
      "Cook 5 whistles till soft.",
      "Mash lightly, pour over tadka."
    ],
    hacks: "this is the perfect batch dinner — makes 2 meals, reheats beautifully.",
    swaps: "any 3–4 vegetables you have.",
    image: "/all_image_files/journal/first-batch/recipe-07-vegetable-khichdi.jpg",
    tags: ["G", "L", "S", "A"]
  },
  {
    number: "08",
    slug: "millet-khichdi",
    title: "Gentle Millet Khichdi",
    group: "Khichdi & One-Pot",
    why: "millets add minerals and variety, but they can feel harsh if eaten dry or in excess. Cooked soft as a khichdi with moong dal, a small amount is gentle and easy.",
    plantPoints: 6,
    ingredients: "½ cup foxtail or little millet (soaked 30 min) · ½ cup moong dal · soft veg · 4 cups water · turmeric · tadka: ghee, cumin, curry leaves, hing.",
    steps: [
      "Soak and rinse the millet well (soaking is key to gentleness).",
      "Pressure-cook millet + dal + veg + water + turmeric + salt for 5 whistles till soft and porridge-like.",
      "Mash lightly, pour over tadka."
    ],
    hacks: "always soak millets and cook them extra soft with plenty of water — that's the whole trick to keeping them gentle. Start with millets once or twice a week, not daily.",
    swaps: "keep Red Matta rice as your everyday base and treat millet khichdi as the occasional change.",
    image: "/all_image_files/journal/first-batch/recipe-08-millet-khichdi.jpg",
    tags: ["G", "L", "A"]
  },
  {
    number: "09",
    slug: "homemade-curd",
    title: "Homemade Curd (Set Dahi)",
    group: "Fermented & Curd-Based",
    why: "live cultures for your gut, and the base of raita, curd rice and dressings — homemade beats anything from a packet.",
    plantPoints: 1,
    ingredients: "any dairy you set curd from (the finished food is curd, not fluid milk) · 1 tsp existing curd as starter.",
    steps: [
      "Warm the base till just finger-warm (not hot).",
      "Whisk in the 1 tsp starter curd.",
      "Cover and leave undisturbed 6–8 hrs in a warm spot until set.",
      "Chill."
    ],
    hacks: "save 1 tsp each time as the next starter — free curd forever. In cool weather, set it inside a closed cupboard.",
    swaps: "none — this is the foundation.",
    image: "/all_image_files/journal/first-batch/recipe-09-homemade-curd.jpg",
    tags: ["F"]
  },
  {
    number: "10",
    slug: "soft-idli",
    title: "Soft Idli",
    group: "Fermented & Curd-Based",
    why: "naturally fermented and steamed (never fried), idli is one of the most gut-friendly, easy-to-digest foods in Indian cooking.",
    plantPoints: 3,
    ingredients: "1 cup idli rice · ½ cup urad dal · ½ tsp fenugreek seeds · salt.",
    steps: [
      "Soak rice and urad+fenugreek separately 5–6 hrs.",
      "Grind each to a smooth batter, mix, add salt.",
      "Ferment 8–12 hrs until doubled and bubbly (this is the probiotic step).",
      "Pour into a greased idli mould and steam in the pressure cooker (without the weight) for 10–12 min."
    ],
    hacks: "in cool weather, ferment inside the switched-off oven with just the light on, or a warm cupboard. Batter keeps 3 days in the fridge.",
    swaps: "replace ¼ of the rice with foxtail millet for a fibre boost.",
    image: "/all_image_files/journal/first-batch/recipe-10-soft-idli.jpg",
    tags: ["F", "G"]
  },
  {
    number: "11",
    slug: "cucumber-carrot-raita",
    title: "Cucumber-Carrot Raita",
    group: "Fermented & Curd-Based",
    why: "the fastest way to add a ferment + raw veg to any meal; cooling and quick.",
    plantPoints: 4,
    ingredients: "1 cup curd · ½ cucumber + ¼ carrot (grated) · roasted cumin powder · mint/coriander · pinch salt.",
    steps: [
      "Whisk the curd smooth.",
      "Fold in the grated veg, cumin, herbs and salt."
    ],
    hacks: "roast a batch of cumin and coarsely powder it — a pinch lifts any curd dish.",
    swaps: "grated beetroot or bottle gourd instead of carrot.",
    image: "/all_image_files/journal/first-batch/recipe-11-cucumber-carrot-raita.jpg",
    tags: ["F", "A"]
  },
  {
    number: "12",
    slug: "bottle-gourd-poriyal",
    title: "Bottle Gourd Poriyal",
    group: "Gentle Vegetables",
    why: "bottle gourd (lauki) is watery, soft and among the gentlest, most soothing vegetables — perfect while building gut tolerance.",
    plantPoints: 5,
    ingredients: "1 small bottle gourd (peeled, diced) · tadka: oil, mustard, urad dal, curry leaves, hing · turmeric · grated coconut.",
    steps: [
      "Make the tadka in a kadai.",
      "Add bottle gourd + turmeric + salt, sprinkle a little water, cover and cook on low 8–10 min till soft.",
      "Finish with coconut."
    ],
    hacks: "the splash-of-water-and-cover method steam-cooks veg with no oil and no watching.",
    swaps: "ash gourd, chayote (chow-chow) or pumpkin the same way.",
    image: "/all_image_files/journal/first-batch/recipe-12-bottle-gourd-poriyal.jpg",
    tags: ["S", "A"]
  },
  {
    number: "13",
    slug: "carrot-beans-poriyal",
    title: "Carrot-Beans Poriyal",
    group: "Gentle Vegetables",
    why: "a quick, lightly cooked veg stir-fry — soft, sweet and colourful, adding easy diversity.",
    plantPoints: 6,
    ingredients: "2 carrots + a handful of beans (finely chopped) · tadka: oil, mustard, urad dal, curry leaves, hing · grated coconut · pinch pepper.",
    steps: [
      "Tadka in a kadai.",
      "Add the chopped veg + salt, sprinkle water, cover, cook 6–8 min till soft but bright.",
      "Finish with coconut + a little pepper."
    ],
    hacks: "chop veg small so it cooks fast and soft.",
    swaps: "cabbage, beetroot or peas the same way — rotate weekly.",
    image: "/all_image_files/journal/first-batch/recipe-13-carrot-beans-poriyal.jpg",
    tags: ["S", "A"]
  },
  {
    number: "14",
    slug: "beetroot-poriyal",
    title: "Beetroot Poriyal",
    group: "Gentle Vegetables",
    why: "beetroot's deep colour means rich polyphenols; cooked soft with coconut it's naturally sweet and easy.",
    plantPoints: 5,
    ingredients: "2 beetroots (grated) · tadka: oil, mustard, urad dal, curry leaves, hing · turmeric · grated coconut · lime.",
    steps: [
      "Tadka.",
      "Add grated beetroot + turmeric + salt, sprinkle water, cover, cook 8 min till soft.",
      "Finish with coconut + a squeeze of lime."
    ],
    hacks: "grate fine (or pulse in a mixer) so it cooks fast and stays vibrant.",
    swaps: "carrot-beetroot mix for two colours at once.",
    image: "/all_image_files/journal/first-batch/recipe-14-beetroot-poriyal.jpg",
    tags: ["S", "A"]
  },
  {
    number: "15",
    slug: "mild-rasam",
    title: "Mild Rasam",
    group: "Soups & Rasam",
    why: "a gentle, non-spicy rasam of tamarind, tomato, cumin, pepper and garlic is warming, digestive and soothing — lovely sipped before or with a meal.",
    plantPoints: 7,
    ingredients: "small tamarind (soaked) · 1 tomato · ¼ tsp pepper + ½ tsp cumin (crushed) · 2 garlic cloves · turmeric · tadka: ghee, mustard, cumin, curry leaves, hing · coriander.",
    steps: [
      "Simmer tamarind water + chopped tomato + crushed pepper-cumin + garlic + turmeric + salt for 8–10 min (don't hard-boil).",
      "Pour over the ghee tadka.",
      "Finish with coriander."
    ],
    hacks: "keep it mild — the point is soothing, not heat. Sip a small glass when digestion feels heavy.",
    swaps: "a spoon of cooked dal stirred in makes it heartier.",
    image: "/all_image_files/journal/first-batch/recipe-15-mild-rasam.jpg",
    tags: ["A"]
  },
  {
    number: "16",
    slug: "moong-vegetable-soup",
    title: "Moong & Vegetable Soup",
    group: "Soups & Rasam",
    why: "blended lentil + greens = silky, high-protein, high-fibre comfort that's easy on the gut.",
    plantPoints: 6,
    ingredients: "¼ cup moong dal · 2 cups spinach or bottle gourd · 2 garlic cloves · ½ tsp cumin · pepper · lime.",
    steps: [
      "Pressure-cook dal + veg + garlic + water for 3 whistles till soft.",
      "Blend smooth (careful, let it cool a little first).",
      "Reheat, season with cumin, pepper, salt, lime."
    ],
    hacks: "a swirl of curd on top makes it creamy and adds a ferment.",
    swaps: "carrot + tomato for a different colour and flavour.",
    image: "/all_image_files/journal/first-batch/recipe-16-moong-vegetable-soup.jpg",
    tags: ["G", "L", "A"]
  },
  {
    number: "17",
    slug: "ragi-porridge",
    title: "Ragi Porridge",
    group: "Breakfast & Porridge",
    why: "finger millet (ragi) is rich in calcium and iron; cooked into a soft porridge it's gentle, filling and comforting — a great gut-friendly breakfast without wheat.",
    plantPoints: 3,
    ingredients: "¼ cup ragi flour · 2 cups water · (optional) 2 tbsp curd · pinch salt · roasted cumin (savoury) or a mashed ripe banana (naturally sweet).",
    steps: [
      "Whisk the ragi flour into cold water so there are no lumps.",
      "Cook on low, stirring, 8–10 min till glossy and thick.",
      "Cool slightly; for savoury, stir in curd + salt + cumin; for sweet, mash in ripe banana."
    ],
    hacks: "whisk into cold water first — that's how you avoid lumps. Make it the night before and keep it cool.",
    swaps: "foxtail millet flour works the same way.",
    image: "/all_image_files/journal/first-batch/recipe-17-ragi-porridge.jpg",
    tags: ["G"]
  },
  {
    number: "18",
    slug: "chia-fruit-bowl",
    title: "Chia-Fruit Bowl",
    group: "Breakfast & Porridge",
    why: "chia is a top omega-3 seed and swells into a soft pudding; add fruit and nuts for a fresh, fibre-rich, no-cook breakfast.",
    plantPoints: 7,
    ingredients: "3 tbsp chia · 1 cup water or coconut milk (no fluid dairy milk) · fruit (banana, apple, pomegranate) · walnuts + pumpkin seeds · pinch cinnamon.",
    steps: [
      "Stir chia into the liquid + cinnamon.",
      "Rest 15 min or overnight until it sets like a soft pudding.",
      "Top with chopped fruit, nuts and seeds."
    ],
    hacks: "make it in a jar the night before — breakfast is ready when you wake.",
    swaps: "whisk in a spoon of curd for a probiotic version.",
    image: "/all_image_files/journal/first-batch/recipe-18-chia-fruit-bowl.jpg",
    tags: ["F", "O"]
  },
  {
    number: "19",
    slug: "coconut-coriander-chutney",
    title: "Coconut-Coriander Chutney",
    group: "Chutneys & Podis",
    why: "fresh herbs and coconut add plant points and lift idli, dosa and rice; mild and cooling.",
    plantPoints: 5,
    ingredients: "½ cup grated coconut · a big handful coriander (and mint) · 1\" ginger · 2 tbsp roasted chana (for body) · pinch salt · tadka: oil, mustard, curry leaves.",
    steps: [
      "Blend coconut + herbs + ginger + chana + salt + a little water to a smooth paste.",
      "Top with the mustard-curry-leaf tadka."
    ],
    hacks: "keeps 2–3 days in the fridge; make it alongside your idli batter.",
    swaps: "mint-heavy for a fresher version, coriander-heavy for a milder one.",
    image: "/all_image_files/journal/first-batch/recipe-19-coconut-coriander-chutney.jpg",
    tags: ["A"]
  },
  {
    number: "20",
    slug: "flax-curry-leaf-podi",
    title: "Flax & Curry-Leaf Podi",
    group: "Chutneys & Podis",
    why: "a dry chutney powder loaded with omega-3 flax and curry-leaf goodness — turns plain rice or idli into a plant-rich meal in one sprinkle, and keeps for weeks.",
    plantPoints: 5,
    ingredients: "½ cup flaxseed · a big handful curry leaves · 2 tbsp urad dal + 2 tbsp chana dal · 2 dried chillies (optional/mild) · 2 garlic cloves · ½ tsp cumin · salt.",
    steps: [
      "Dry-roast the flax, dals, curry leaves (and chilli) separately on low till fragrant.",
      "Cool completely.",
      "Grind with garlic, cumin and salt to a coarse powder."
    ],
    hacks: "store in a dry jar — a spoonful mixed with a little ghee over hot rice is an instant, gut-friendly meal.",
    swaps: "sesame seeds in place of some flax.",
    image: "/all_image_files/journal/first-batch/recipe-20-flax-curry-leaf-podi.jpg",
    tags: ["O", "A"]
  },
  {
    number: "21",
    slug: "ccf-tonic",
    title: "Cumin-Coriander-Fennel (CCF) Tonic",
    group: "Gut Tonics",
    why: "a classic, caffeine-free digestive tea of three gentle seeds — soothing, de-bloating, and a lovely warm drink through the day in place of endless milky tea.",
    plantPoints: 3,
    ingredients: "1 tsp each cumin, coriander and fennel seeds · 3 cups water.",
    steps: [
      "Lightly crush the seeds.",
      "Simmer in the water 5–7 min.",
      "Strain and sip warm."
    ],
    hacks: "make a flask in the morning and sip all day.",
    swaps: "add a thin slice of ginger for extra warmth.",
    image: "/all_image_files/journal/first-batch/recipe-21-ccf-tonic.jpg",
    tags: ["A"]
  }
];

export const INTRO_SECTIONS = {
  startHere: {
    title: "START HERE — the whole idea in a few minutes",
    paragraphs: [
      "You are not on a diet. You are feeding the trillions of friendly bacteria in your gut — and when they're happy, your digestion, energy, skin, mood and immunity all follow. Three simple pillars run everything in this guide:",
      "1. Diversity — eat many different plants across a week (aim for 30+). Every vegetable, fruit, lentil, herb, spice, nut and seed counts as one. Variety matters more than quantity.\n2. Fermented foods — eat something naturally cultured most days (homemade curd, idli, a spoon of home-ferment). These add live, friendly microbes.\n3. Fibre that feeds them — lentils, vegetables, fruit, seeds and gentle whole grains are food for your gut bugs.",
      "Gentle first — the golden rule of this kitchen. A calm gut prefers food that is soft, well-cooked, and soluble-fibre-forward — think dals, khichdi, curd rice, cooked vegetables and porridges — over piles of raw, rough, bran-heavy food. So we start low and go slow: add new plants gradually, cook things properly soft, and let your gut adjust over weeks, not days. This is why nothing here is spicy, oily, or heavy — gentle food is what actually heals.",
      "Give your gut a rest. Your gut does its cleaning and repair between meals, not during them. So this guide fits naturally with an eating window (for example, two solid meals in the day with a long overnight gap) and avoids constant snacking. Two complete, nourishing meals beat six scattered ones.",
      "Why no sugar, no wheat, no fluid milk? Added sugar feeds the wrong microbes and drives inflammation. Wheat and fluid milk are two of the most common things sensitive guts feel better without. Take them out and most people feel lighter within a week — so this whole kitchen is built without them, and you won't miss them."
    ],
    fGoals: {
      title: "F-GOALS — an easy way to remember variety.",
      subtitle: "Try to touch these across your day:",
      headers: ["Letter", "Eat some…", "Everyday examples"],
      rows: [
        ["F", "Fruits & Fermented", "banana, apple, papaya, pomegranate + curd, idli"],
        ["G", "Greens & Grains", "spinach, curry leaves + red rice, foxtail millet, ragi"],
        ["O", "Omega-3 seeds", "flax, chia, pumpkin seeds, walnuts"],
        ["A", "Aromatics", "ginger, garlic, curry leaves (great gut food)"],
        ["L", "Legumes", "moong, toor, masoor dal, chana"],
        ["S", "Sulforaphane & 'Shrooms", "cabbage, cauliflower, carrot + mushrooms"]
      ]
    }
  },
  tinyKitchen: {
    title: "YOUR TINY KITCHEN — you need almost nothing",
    equipment: "equipment: a pressure cooker, a gas stove, a fridge, one kadai/pan, a ladle, and a knife + board. That's a complete gut kitchen. No oven, no fancy gadgets.",
    pantryTitle: "The 10-item starter pantry (buy once, cook for weeks):",
    pantryItems: [
      "Grain: Kerala Red Matta rice (your everyday anchor) + a small bag of foxtail or little millet",
      "Lentils: moong dal (split yellow — the gentlest), toor dal, masoor dal",
      "Fats: ghee, cold-pressed groundnut or coconut oil",
      "Ferment: curd (or make your own — recipe 09)",
      "Aromatics: ginger, garlic, curry leaves, green chilli (optional, mild)",
      "Spices (gentle): cumin seeds, mustard seeds, turmeric, black pepper, coriander powder, hing (buy gluten-free hing — normal hing has wheat)",
      "Seeds & nuts: flax, chia, pumpkin seeds, groundnuts, almonds",
      "Coconut: fresh or frozen grated",
      "Fresh veg & fruit: whatever's seasonal and local",
      "Psyllium husk (isabgol): an optional, gentle soluble fibre — a spoon in water keeps things smooth (introduce slowly, always with plenty of water)"
    ],
    note: "Everything above is easy to find in any Indian market (in Bengaluru: HOPCOMS for vegetables, any organic store for millets, seeds and gluten-free hing)."
  },
  masterTechniques: {
    title: "MASTER TECHNIQUES — learn these 4 things once",
    techniques: [
      {
        name: "1. How to use a pressure cooker",
        description: "Add ingredients + water, close the lid, put the weight on, turn the flame to medium. Soon it hisses and releases steam with a sharp sound — that's one \"whistle.\" Count whistles, then switch off and wait for the pressure to drop on its own before opening (never force the lid). That's it."
      },
      {
        name: "2. Tadka (tempering) — the flavour trick",
        description: "Heat 1 tsp ghee/oil in a small pan. Add ½ tsp mustard and/or cumin seeds. When they splutter (a few seconds), add curry leaves and a pinch of hing, then pour this over your dal or dish. This one move makes plain food delicious."
      },
      {
        name: "3. Soaking",
        description: "Rinse rice/lentils in 2–3 changes of water. Soaking rice 20–30 min and lentils 1–2 hrs makes them cook faster, digest easier, and sit lighter on the gut."
      },
      {
        name: "4. Making it soft",
        description: "A calm gut loves soft food. When unsure, add a little more water and cook a little longer. Mushy-soft is a feature here, not a mistake."
      }
    ]
  },
  rotatingCore: {
    title: "THE ROTATING CORE — 21 recipes, not 200",
    paragraphs: [
      "You don't need hundreds of recipes. You need a small set you can master and rotate so cooking becomes automatic and you still hit 30+ plants a week. This guide gives you 21, across 9 groups. Here's the simple weekly rhythm:",
      "• Every meal = 1 base + 1 protein + 1 veg + 1 ferment.\n  - Base: Red Matta rice, khichdi, idli, or a porridge\n  - Protein: a dal or legume\n  - Veg: one gentle vegetable dish (rotate the vegetable for new plant points)\n  - Ferment: a spoon of curd, raita, or a home-ferment",
      "• Rotate the vegetable and dal daily, keep the base familiar, and add a chutney/podi or fruit for extra plants.",
      "• One \"gentle day\" a week (or whenever your stomach feels off): keep it to khichdi, curd rice, and ripe banana.",
      "Do this and a normal week naturally crosses 30 different plants without any counting stress."
    ]
  },
  milletGuide: {
    title: "THE MILLET GUIDE — how to include millets gently",
    intro: "Red Matta rice is your everyday anchor because it's gentle and steady. Millets are a wonderful sometimes food — mineral-rich and varied — but they can feel harsh if eaten dry, raw-ish, or in large amounts. To keep them gentle:",
    items: [
      "Choose the gentle ones: foxtail and little millet are the easiest; go slow with ragi and heavier ones.",
      "Always soak (30 min+) and rinse well before cooking.",
      "Cook them soft — as khichdi, porridge or idli with plenty of water, never dry.",
      "Small amounts, a couple of times a week — not every meal. Keep Red Matta rice as the base and treat millets as the rotation."
    ]
  },
  gentleDays: {
    title: "GENTLE DAYS — when your stomach wants calm",
    intro: "Some days your gut just wants simple. On those days, keep to the softest, most soothing foods and let things settle:",
    items: [
      "Moong Dal Khichdi (recipe 06), cooked extra soft",
      "Soft Curd Rice (recipe 02)",
      "A ripe banana or stewed apple",
      "CCF Tonic (recipe 21) and plenty of warm water"
    ],
    outro: "Ease back to variety the next day. Soft and simple isn't a step back — it's how a gut resets."
  },
  systemsEasy: {
    title: "SYSTEMS THAT MAKE THIS EASY",
    items: [
      {
        name: "Sunday 30-minute prep",
        text: "cook a big batch of Red Matta rice, one dal, and set a fresh batch of curd. Chop 2–3 vegetables and store them. Now weekday meals are 10-minute assemblies."
      },
      {
        name: "Fridge storage",
        text: "cooked rice and dal keep 3 days; curd 4–5; chutney 2–3; podi for weeks. Always cool food before it goes in, and reheat only what you'll eat."
      },
      {
        name: "Simple shopping list (by group)",
        text: "Grain — Red Matta rice, idli rice, a little foxtail millet, ragi flour. Lentils — moong, toor, masoor, urad, chana dal, roasted chana. Veg — bottle gourd, carrot, beans, beetroot, tomato, spinach, pumpkin. Aromatics — ginger, garlic, curry leaves, green chilli. Ferment — curd. Fats — ghee, cold-pressed oil, coconut. Spices — cumin, mustard, turmeric, pepper, coriander powder, gluten-free hing. Seeds & nuts — flax, chia, pumpkin seeds, groundnuts, walnuts. Fruit — banana, apple, papaya, pomegranate."
      },
      {
        name: "Hydration",
        text: "sip warm water through the day; it's the simplest thing that keeps digestion smooth and comfortable."
      },
      {
        name: "Weekly plant tracker",
        text: "keep a list on the fridge and tick every different plant you eat — including each spice, herb, nut and seed. A normal week here crosses 30+ without trying."
      }
    ]
  },
  gentleNote: {
    title: "A gentle note",
    text: "This is food and lifestyle guidance for general wellbeing — it is not medical advice. Everyone's gut is different, so introduce new fibres and plants gradually, drink plenty of water, and if you have a specific health condition, are pregnant, or have ongoing digestive discomfort, check with a doctor or dietitian before making big changes. Built in the open, one batch at a time."
  }
};
