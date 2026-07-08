# better4u: Complete Public Content Audit & Source of Truth

This document contains every piece of public-facing text, copy, and content across the better4u application. It is structured by page and section to serve as a comprehensive reference for brand positioning and surgical content editing. There are no summaries here—this is the exact literal content displayed on the screen.

---

## 1. Landing Hub (`app/page.tsx`)

### Navigation & Meta
- **Brand/Logo Icon:** better4u Logo (`/icons/icon-128.webp`) accompanied by a custom pulse-animating Sparkle icon.
- **Top Navigation Buttons:** 
  - **The Approach** (Redirects to `/approach`)
  - **Product Lab** (Redirects to `/product-lab`)
- **Mobile Drawer Menu Links:** The Approach, Product Lab.

### Hero Section (The Hook)
- **Super-Header Tag:** BUILT IN THE OPEN
- **Main Heading:** Real food that actually *tastes good*.
- **Subheading:** better4u makes better-for-you versions of the food and drinks people reach for every day — familiar flavours, real ingredients, and a lot less sugar.
- **Primary CTA Button:** See the range (Redirects to `/product-lab`)
- **Secondary CTA Button:** Why we exist (Redirects to `/approach`)
- **Scroll Indicator:** Scroll to Discover (accompanied by an animated bounce arrow).

### Philosophy Sections
#### Part 1: The Problem (The Default)
- **Tag:** The Default
- **Heading:** Everyday food and drink defaults aren't doing us any favours.
- **Description:** A sugary soda, processed snack, or heavy dessert follows almost every meal. better4u makes the better-tasting, better-for-you version.

#### Part 2: The Insight (The Remake)
- **Tag Icon:** Search
- **Heading:** We didn't make another diet food or health drink — we remade the everyday foods and drinks you already reach for, better.
- **Description:** Because food should be food first. Taste is how you make healthy habits stick.

#### Part 3: The Universe (House of better4u)
- **Tag:** The Universe
- **Heading:** House of better4u
- **Description:** Every time you'd reach for the unhealthy default, better4u has the better-tasting version.
- **Cards Matrix:**
  1. **ALIVE**
     - Subtitle: Better-for-you probiotic soda.
     - Bottom Tagline: Replaces nimbu/goli soda & sweet colas.
     - Category Badge: Glass
  2. **JOSH**
     - Subtitle: Nostalgia with prebiotics.
     - Bottom Tagline: Replaces sugary street-drinks & colas.
     - Category Badge: Can
  3. **BATCH**
     - Subtitle: Raw, live ferments.
     - Bottom Tagline: Replaces store-bought sugary kombucha.
     - Category Badge: Cultured
  4. **PULP**
     - Subtitle: Gut-loaded whole fruit smoothies.
     - Bottom Tagline: Replaces sugary juices & skipped meals.
     - Category Badge: Smoothie
  5. **STEEP**
     - Subtitle: Hot botanical & gut-friendly brews.
     - Bottom Tagline: Replaces sugary instant coffees & chai premixes.
     - Category Badge: Hot Brew
  6. **GRIT**
     - Subtitle: Whole-food bars, bakes & bites.
     - Bottom Tagline: Replaces refined snacks, energy bars & biscuits.
     - Category Badge: Gut Bar

### Footer
- **Footer Text:** BUILT IN THE OPEN. ONE BATCH AT A TIME.

---

## 2. The Approach (`app/approach/page.tsx`)

### Header & Navigation
- **Navigation:** Header menu with options ("The Approach", "Product Lab", "Journal" with corresponding routing).
- **Tag:** The Approach

### Hero Section
- **Heading:** The default is hurting us.
- **Subheading:** In our cities a sugary soda or shake follows almost every meal — it's the default, and it's quietly wrecking our health and energy.

### The Shift Section
- **Shift Text:** We're not asking you to give it up. We're giving you the better-tasting swap.

### The Swap Grid
- **Instead of:** Cola $\rightarrow$ **Reach for:** JOSH · Masala Cola
- **Instead of:** Nimbu / goli soda $\rightarrow$ **Reach for:** ALIVE · Lime / Ginger
- **Instead of:** Sugary lassi / yogurt drinks $\rightarrow$ **Reach for:** BATCH · Strawberry Kefir
- **Instead of:** Green juice / skipped breakfast $\rightarrow$ **Reach for:** PULP · Green Reset
- **Instead of:** Store kombucha / sugary tonics $\rightarrow$ **Reach for:** BATCH · Kanji / Jamun-Lime Kombucha
- **Instead of:** Instant coffee / sugary chai $\rightarrow$ **Reach for:** STEEP · Filter Kaapi / Spiced Chai
- **Instead of:** Sugary granola bars / biscuits $\rightarrow$ **Reach for:** GRIT · Millet & Date / Cacao Nib

### What "Better" Means
- **Real Ingredients:** Real fermentation and plant fibre, naturally sourced without the artificial shortcuts.
- **Familiar Flavours:** Classic Indian tastes you grew up with, crafted with much less sugar so you can drink them daily.
- **A Simple Philosophy:** Our approach is straightforward: aim for 30+ plants and 3 ferments over the week.

### Built in the Open
- **Description:** We are a small, obsessed team making small batches and sharing everything as we go. We aren't a massive corporation—we're just building what we want to drink.
- **CTA:** Meet the full range (Redirects to `/product-lab`)

### Footer
- **Footer Text:** BUILT IN THE OPEN. ONE BATCH AT A TIME.

---

## 3. Product Lab (`app/product-lab/page.tsx`)

### Header
- **Pre-title:** EXPERIMENTAL BATCHES
- **Title:** The Product Lab
- **Subtitle:** We are rethinking carbonation, sweetness, and gut health. Small-batch, functional sodas and ferments designed to replace the toxic defaults.

### Brand Selectors
- **ALIVE:** "The Classics, Re-fermented" (₹85)
- **JOSH:** "Nostalgia with Prebiotics" (₹110)
- **BATCH:** "Raw, Live Ferments" (₹140)
- **PULP:** "Gut-Loaded Smoothies" (₹135)
- **STEEP:** "Hot Botanical Brews" (₹75)
- **GRIT:** "Whole-Food Bars & Bites" (₹95)

---

### Product Specifications (All 27 SKUs)

#### BRAND 1: ALIVE
1. **Lime** (ID: `alive-lime`)
   - **Category:** Sparkler
   - **Tagline:** Lime & Roasted Cumin Sparkler
   - **Description:** A crisp, refreshing reimagination of the classic fresh lime soda. Blended with real organic lime juice, a touch of dark raw sweetness, and a finishing pinch of roasted cumin and black salt.
   - **Badge:** 1.2B Active Cultures
   - **Price:** ₹85
   - **Image Code:** `lime`
   - **Glow Color:** `rgba(163, 230, 53, 0.15)`
   - **Accent Color:** `#A3E635`
   - **Specs:** 
     - *cfu:* 1.2 Billion Live Probiotic Cultures
     - *sugar:* 4.8g per 100ml (60% less than standard soda)
     - *calories:* 22 kcal per 100ml
     - *benefits:* Supports digestive balance & post-meal comfort
   - **Ingredients:** Pure Spring Water, Organic Lime Juice (8%), Raw Sugar (microbe food), Traditional Live Starter, Roasted Cumin (Jeera), Black Salt (Kala Namak), Natural Active Probiotics
   - **Taste Highlight:** Bright, zesty citrus notes upfront with an earthy, warm cumin finish. Perfectly carbonated for a refreshing post-meal palette cleanser.
   - **Replaces:** Nimbu Soda / Fresh Lime Soda

2. **Ginger** (ID: `alive-ginger`)
   - **Category:** Sparkler
   - **Tagline:** Bold Ginger & Citrus Infused Tonic
   - **Description:** A throat-soothing ginger soda built to replace sweet carbonated ginger beers. Organic ginger root meets zesty lime oil, delivering a sharp, spicy bite that feels warm and comforting.
   - **Badge:** 1.5B Active Cultures
   - **Price:** ₹85
   - **Image Code:** `ginger`
   - **Glow Color:** `rgba(250, 204, 21, 0.15)`
   - **Accent Color:** `#FACC15`
   - **Specs:**
     - *cfu:* 1.5 Billion Live Probiotic Cultures
     - *sugar:* 5.2g per 100ml (55% less than standard ginger beer)
     - *calories:* 25 kcal per 100ml
     - *benefits:* Soothes the stomach & aids natural digestion
   - **Ingredients:** Pure Spring Water, Organic Ginger Root Extract (12%), Raw Sugar (fed to cultures), Traditional Live Starter, Fresh Citrus Oils, Natural Active Probiotics
   - **Taste Highlight:** Fiery ginger spice that hits the back of the throat, balanced by clean carbonation and a refreshing citrus lift.
   - **Replaces:** Goli Soda / Ginger Beer

3. **Spice** (ID: `alive-spice`)
   - **Category:** Sparkler
   - **Tagline:** Earthy Cumin & Mint Digestif
   - **Description:** An aromatic botanical soda inspired by traditional spice-based digestifs. Blends roasted cumin, dry mango, mint, and black pepper for a complex, savory finish.
   - **Badge:** 1.2B Active Cultures
   - **Price:** ₹85
   - **Image Code:** `spice`
   - **Glow Color:** `rgba(234, 179, 8, 0.15)`
   - **Accent Color:** `#EAB308`
   - **Specs:**
     - *cfu:* 1.2 Billion Live Probiotic Cultures
     - *sugar:* 4.5g per 100ml (65% less than sweet carbonated drinks)
     - *calories:* 19 kcal per 100ml
     - *benefits:* Relieves bloating & helps process heavy meals
   - **Ingredients:** Pure Spring Water, Raw Sugar (fermentation base), Traditional Live Starter, Roasted Cumin Powder, Dry Mango (Amchur), Black Pepper Extract, Fresh Mint oil, Black Salt, Natural Active Probiotics
   - **Taste Highlight:** Intensely savory, cooling mint aroma, followed by a tangy cumin and peppery pop. Designed to be enjoyed chilled right after a heavy lunch.
   - **Replaces:** Masala Soda / Jaljeera

4. **Berry** (ID: `alive-berry`)
   - **Category:** Sparkler
   - **Tagline:** Wild Jamun & Purple Fruit Sparkler
   - **Description:** A gorgeous, deep purple fruit soda crafted with hand-harvested wild jamun berries. Rich, tangy, slightly dry, and packed with natural fruit antioxidants that glow through glass.
   - **Badge:** 1.3B Active Cultures
   - **Price:** ₹85
   - **Image Code:** `berry`
   - **Glow Color:** `rgba(168, 85, 247, 0.15)`
   - **Accent Color:** `#A855F7`
   - **Specs:**
     - *cfu:* 1.3 Billion Live Probiotic Cultures
     - *sugar:* 5.5g per 100ml (pure fruit sugars + minimal raw sugar)
     - *calories:* 26 kcal per 100ml
     - *benefits:* High in antioxidants & supports overall gut balance
   - **Ingredients:** Pure Spring Water, Wild Jamun Berry Pulp (10%), Fresh Organic Lime Juice, Raw Sugar (microbe food), Traditional Live Starter, Natural Active Probiotics
   - **Taste Highlight:** A juicy jamun flavor with a sophisticated, slightly astringent berry finish that leaves you craving the next sip.
   - **Replaces:** Sugary Colas / Sweet Berry Sodas

#### BRAND 2: JOSH
5. **Kala Khatta** (ID: `josh-kala-khatta`)
   - **Category:** Prebiotic Fizz
   - **Tagline:** Street-gola tang, grown-up.
   - **Description:** A bold prebiotic soda capturing the nostalgic, sweet-tangy street-gola feel. Infused with natural plant fibers and botanical extracts for a healthy digestive upgrade.
   - **Badge:** 7g Plant Fibre
   - **Price:** ₹110
   - **Image Code:** `kala-khatta`
   - **Glow Color:** `rgba(147, 51, 234, 0.15)`
   - **Accent Color:** `#9333EA`
   - **Specs:**
     - *fiber:* 7g prebiotic plant fiber (chicory root & apple fiber)
     - *sugar:* 4.5g per 100ml (pure fruit juices + chicory)
     - *calories:* 18 kcal per 100ml (approx 45 kcal per can)
     - *benefits:* Promotes growth of healthy gut bacteria & regulates blood sugar
   - **Ingredients:** Carbonated Spring Water, Chicory Root Inulin, Apple Pectin, Organic Jamun Juice, Blackcurrant Concentrate, Black Salt, Lemon Juice, Stevia Extract
   - **Taste Highlight:** Tangy blackcurrant-meets-jamun with a salty-spiced edge, finished with a clean, lively fizz.
   - **Replaces:** Kala-Khatta Gola / Dark Fruity Colas

6. **Masala Cola** (ID: `josh-masala-cola`)
   - **Category:** Prebiotic Fizz
   - **Tagline:** The cola your gut forgives.
   - **Description:** A rich, spiced cola brewed with natural kola nut extracts and warm Indian spices. Delivers that classic cola satisfaction without the blood sugar spike or artificial chemicals.
   - **Badge:** 7g Plant Fibre
   - **Price:** ₹110
   - **Image Code:** `masala-cola`
   - **Glow Color:** `rgba(120, 53, 4, 0.15)`
   - **Accent Color:** `#78350F`
   - **Specs:**
     - *fiber:* 7g prebiotic plant fiber
     - *sugar:* 5.0g per 100ml (low glycemic raw sugar)
     - *calories:* 20 kcal per 100ml (approx 50 kcal per can)
     - *benefits:* Low glycemic response, supports daily fiber goals
   - **Ingredients:** Carbonated Spring Water, Prebiotic Plant Inulin, Organic Kola Nut Extract, Cinnamon Extract, Clove Oil, Vanilla Bean Pods, Black Salt, Lemon Juice
   - **Taste Highlight:** Dark caramel cola spine lifted with warm Indian spices; deep, earthy, and satisfyingly low in sugar.
   - **Replaces:** Mass-market Cola / Sweet Carbonated Colas

7. **Gulab** (ID: `josh-gulab`)
   - **Category:** Prebiotic Fizz
   - **Tagline:** Rose, but make it fizz.
   - **Description:** A delicate, floral botanical soda capturing Kashmiri rose petals and warm cardamom. Light, fizzy, and packed with digestive prebiotic fibers.
   - **Badge:** 7g Plant Fibre
   - **Price:** ₹110
   - **Image Code:** `gulab`
   - **Glow Color:** `rgba(244, 63, 94, 0.15)`
   - **Accent Color:** `#F43F5E`
   - **Specs:**
     - *fiber:* 7g prebiotic plant fiber (chicory root & citrus fiber)
     - *sugar:* 4.0g per 100ml (natural rose sugar base)
     - *calories:* 16 kcal per 100ml (approx 40 kcal per can)
     - *benefits:* Calming post-meal digestif, reduces inflammation
   - **Ingredients:** Carbonated Spring Water, Soluble Chicory Fiber, Kashmiri Rose Distillate, Organic Cardamom Extract, Lemon Extract, Natural Beet Juice (for color)
   - **Taste Highlight:** Delicate Kashmiri rose with a hint of warm cardamom over bright carbonation; floral, soft, and fragrant.
   - **Replaces:** Rose Sodas / Rooh-Afza-coded Drinks

8. **Santra** (ID: `josh-santra`)
   - **Category:** Prebiotic Fizz
   - **Tagline:** Sunshine, sorted.
   - **Description:** A vibrant orange citrus soda inspired by nostalgic sweet pops. Infused with cold-pressed orange peel extracts and dietary prebiotic plant fiber.
   - **Badge:** 7g Plant Fibre
   - **Price:** ₹110
   - **Image Code:** `santra`
   - **Glow Color:** `rgba(249, 115, 22, 0.15)`
   - **Accent Color:** `#F97316`
   - **Specs:**
     - *fiber:* 7g prebiotic orange and root fiber
     - *sugar:* 4.8g per 100ml (organic orange juice base)
     - *calories:* 19 kcal per 100ml (approx 48 kcal per can)
     - *benefits:* Rich in Vitamin C, supports metabolic digestion
   - **Ingredients:** Carbonated Spring Water, Soluble Root Fiber, Cold-Pressed Nagpur Orange Juice (10%), Mandarin Peel Oil, Citric Acid, Beta-Carotene (for color)
   - **Taste Highlight:** Bright Nagpur-orange zest with a gentle bitter-peel lift and a crisp, clean fizz.
   - **Replaces:** Orange Sodas / Gold-Spot Nostalgia

#### BRAND 3: BATCH
9. **Kanji** (ID: `batch-kanji`)
   - **Category:** Fresh Ferment
   - **Tagline:** India's original gut tonic, reborn.
   - **Description:** Heritage North Indian winter tonic fermented locally. Organic black carrots and beets are wild-fermented with crushed mustard seeds for a tangy, savory digestive powerhouse.
   - **Badge:** 2B Live Cultures
   - **Price:** ₹140
   - **Image Code:** `kanji`
   - **Glow Color:** `rgba(136, 19, 55, 0.15)`
   - **Accent Color:** `#881337`
   - **Specs:**
     - *cfu:* 2 Billion Live Probiotic Cultures
     - *sugar:* 3.0g per 100ml (fermented carrot base)
     - *calories:* 10 kcal per 100ml (approx 30 kcal per cup)
     - *benefits:* Traditional probiotic starter, enhances mineral absorption
   - **Ingredients:** Filtered Spring Water, Fermented Black Carrots, Red Beetroot Pulp, Crushed Yellow Mustard Seeds, Black Salt, Natural Cultures
   - **Taste Highlight:** Tangy, earthy, mustard-bright fermented black-carrot & beet; brisk, savory, and bracingly probiotic.
   - **Replaces:** Sugary Tonics / Store Kombucha

10. **Strawberry Kefir** (ID: `batch-strawberry-kefir`)
    - **Category:** Fresh Ferment
    - **Tagline:** Creamy, cultured — nothing like buttermilk.
    - **Description:** A thick, creamy fermented drink cultured with genuine live kefir grains. Loaded with twelve diverse probiotic strains and organic strawberry puree.
    - **Badge:** 12 Live Strains
    - **Price:** ₹140
    - **Image Code:** `strawberry-kefir`
    - **Glow Color:** `rgba(251, 113, 133, 0.15)`
    - **Accent Color:** `#FB7185`
    - **Specs:**
      - *cfu:* 5 Billion Live Cultures (12+ Strains)
      - *sugar:* 6.0g per 100ml (natural milk lactose + strawberry)
      - *calories:* 30 kcal per 100ml (approx 90 kcal per cup)
      - *benefits:* High-density multi-strain probiotic, highly lactose-friendly
    - **Ingredients:** Pasteurized A2 Milk, Live Kefir Grains Starter, Organic Strawberry Puree (12%), Natural Vanilla Extract, Lactobacillus rhamnosus, Bifidobacterium bifidum
    - **Taste Highlight:** Creamy, lightly tart kefir with ripe strawberry; soft blush-pink, refreshing, and alive.
    - **Replaces:** Sugary Yogurt Drinks / Lassi / Buttermilks

11. **Jamun-Lime Kombucha** (ID: `batch-jamun-lime-kombucha`)
    - **Category:** Fresh Ferment
    - **Tagline:** Fresh-brewed, jamun-lime.
    - **Description:** An artisanal kombucha brewed locally in small batches using premium black tea. Double-fermented with organic wild jamun berries and fresh lime for a sparkling, dry finish.
    - **Badge:** 2B Live Cultures
    - **Price:** ₹140
    - **Image Code:** `jamun-lime-kombucha`
    - **Glow Color:** `rgba(76, 29, 149, 0.15)`
    - **Accent Color:** `#4C1D95`
    - **Specs:**
      - *cfu:* 2 Billion Live Probiotic Cultures
      - *sugar:* 4.0g per 100ml (consumed during fermentation)
      - *calories:* 13 kcal per 100ml (approx 40 kcal per cup)
      - *benefits:* Contains organic acids & antioxidants to assist liver digestion
    - **Ingredients:** Fermented Black Tea Leaf Extract, Wild Jamun Berry Pulp (10%), Lime Juice, Organic Cane Sugar (starter food), SCOBY Culture
    - **Taste Highlight:** Lively, lightly tart jamun-and-lime; gently sparkling, dry, and sophisticated.
    - **Replaces:** Imported Kombucha / Hard Seltzer

12. **Coconut Water Kefir** (ID: `batch-coconut-water-kefir`)
    - **Category:** Fresh Ferment
    - **Tagline:** Tender coconut, gently alive.
    - **Description:** A light, gently sparkling water kefir made fresh from tender coconut water and live kefir grains. Crisp, clean, and naturally fizzy — a vegan living ferment that drinks like a treat, not a tonic.
    - **Badge:** 2B Live Cultures
    - **Price:** ₹140
    - **Image Code:** `coconut-water-kefir`
    - **Glow Color:** `rgba(220, 230, 225, 0.15)`
    - **Accent Color:** `#DCE6E1`
    - **Specs:**
      - *cfu:* 2 Billion Live Probiotic Cultures
      - *sugar:* 3.5g per 100ml (natural coconut sugars, mostly consumed in fermentation)
      - *calories:* 16 kcal per 100ml (approx 48 kcal per cup)
      - *benefits:* Light, hydrating vegan ferment that is gentle on the gut
    - **Ingredients:** Tender Coconut Water, Live Water-Kefir Grains, Fresh Lime, Natural Coconut Solids
    - **Taste Highlight:** Crisp tender-coconut with a soft natural fizz and a clean lime lift; pale, light, and refreshing.
    - **Replaces:** Sugary packaged coconut drinks / Sweetened tender-coconut waters

#### BRAND 4: PULP
13. **Green Reset** (ID: `pulp-green-reset`)
    - **Category:** Gut Smoothie
    - **Tagline:** Your gut's morning reset.
    - **Description:** A thick, rich, fiber-dense green smoothie blended with spinach, cucumber, mint, banana, and functional seeds. Sourced with a live yogurt ferment for a double gut impact.
    - **Badge:** +Fibre +Ferment
    - **Price:** ₹135
    - **Image Code:** `green-reset`
    - **Glow Color:** `rgba(34, 197, 94, 0.15)`
    - **Accent Color:** `#22C55E`
    - **Specs:**
      - *fiber:* 9g Dietary Insoluble Fiber (approx 9g per cup)
      - *sugar:* 4.8g per 100ml (pure vegetable & banana sugar)
      - *calories:* 48 kcal per 100ml (approx 190 kcal per cup)
      - *benefits:* High fiber prebiotic loader & probiotics in one meal
    - **Ingredients:** Fresh Spinach, Organic Cucumber Juice, Fresh Mint Leaf, Organic Banana Pulp, Chia Seeds, Flaxseed Meal, Cultured Probiotic Yogurt Base
    - **Taste Highlight:** Thick, matte, opaque vivid green whole-food smoothie with a thin scatter of crunchy chia seeds at the top.
    - **Replaces:** Cold-Pressed Green Juice / Skipped Breakfasts

14. **Cacao Daily** (ID: `pulp-cacao-daily`)
    - **Category:** Gut Smoothie
    - **Tagline:** Dessert that loves you back.
    - **Description:** An indulgent, velvety chocolate smoothie made with raw organic cacao, oats, almond butter, dates, and live probiotic kefir. Satisfies sweet cravings while feeding gut bacteria.
    - **Badge:** +Fibre +Ferment
    - **Price:** ₹135
    - **Image Code:** `cacao-daily`
    - **Glow Color:** `rgba(120, 53, 4, 0.15)`
    - **Accent Color:** `#78350F`
    - **Specs:**
      - *fiber:* 8g Dietary Insoluble Fiber (approx 8g per cup)
      - *sugar:* 6.5g per 100ml (sweetened with whole dates)
      - *calories:* 67 kcal per 100ml (approx 270 kcal per cup)
      - *benefits:* Packed with polyphenols, provides sustained daily energy
    - **Ingredients:** Pure Spring Water, Raw Organic Cacao Powder, Cultured Probiotic Kefir, Organic Dates (for sweetness), Rolled Oats, Almond Butter, Cacao Nibs
    - **Taste Highlight:** Thick, matte, opaque rich cacao-brown whole-food smoothie with a few cacao nibs scattered on top.
    - **Replaces:** Sugary Chocolate Shakes / Heavy Desserts

15. **Papaya Sunrise** (ID: `pulp-papaya-sunrise`)
    - **Category:** Gut Smoothie
    - **Tagline:** Sunshine, in any season.
    - **Description:** A smooth, tropical papaya smoothie designed for year-round digestive comfort. Blended with sweet papaya, banana, lime zest, and active live starter.
    - **Badge:** +Fibre +Ferment
    - **Price:** ₹135
    - **Image Code:** `papaya-sunrise`
    - **Glow Color:** `rgba(249, 115, 22, 0.15)`
    - **Accent Color:** `#F97316`
    - **Specs:**
      - *fiber:* 8g Dietary Insoluble Fiber (approx 8g per cup)
      - *sugar:* 5.0g per 100ml (tropical fruit pulp sugars)
      - *calories:* 50 kcal per 100ml (approx 200 kcal per cup)
      - *benefits:* Papain enzyme aids in heavy protein breakdown
    - **Ingredients:** Fresh Papaya Pulp (15%), Organic Banana, Fresh Lime Juice, Rolled Oats, Chia Seeds, Cultured Yogurt Ferment Base
    - **Taste Highlight:** Silky tropical papaya with a bright lime lift; naturally sweet, soft golden-orange, and smooth.
    - **Replaces:** Seasonal Mango Shakes / Sugary Fruit Cups

16. **Berry Beet** (ID: `pulp-berry-beet`)
    - **Category:** Gut Smoothie
    - **Tagline:** Deep colour, deep good.
    - **Description:** An antioxidant-rich crimson smoothie combining organic berries and fresh beetroot. Grounded with flax seeds and probiotic curd for comprehensive gut support.
    - **Badge:** +Fibre +Ferment
    - **Price:** ₹135
    - **Image Code:** `berry-beet`
    - **Glow Color:** `rgba(225, 29, 72, 0.15)`
    - **Accent Color:** `#E11D48`
    - **Specs:**
      - *fiber:* 9g Dietary Insoluble Fiber (approx 9g per cup)
      - *sugar:* 5.2g per 100ml (berry sugars + natural beet beet)
      - *calories:* 52 kcal per 100ml (approx 210 kcal per cup)
      - *benefits:* High in polyphenol antioxidants & liver-supportive betalains
    - **Ingredients:** Organic Mixed Berries (Strawberry, Blueberry), Fresh Red Beetroot Juice, Organic Banana, Flaxseed Meal, Rolled Oats, Probiotic Curd Culture
    - **Taste Highlight:** Berry-sweet over an earthy beet base; rich crimson, lightly tart, satisfying.
    - **Replaces:** green juice, mango shakes, skipped breakfasts

#### BRAND 5: STEEP
17. **Kahwa** (ID: `steep-kahwa`)
   - **Category:** Hot Brew
   - **Tagline:** The mountain digestif.
   - **Description:** A fragrant Kashmiri green-tea kahwa brewed with saffron, cardamom, cinnamon, and crushed almond. A light, golden, after-meal brew that feels like a warm exhale.
   - **Badge:** Polyphenol-Rich
   - **Price:** ₹75
   - **Image Code:** `kahwa`
   - **Glow Color:** `rgba(218, 165, 32, 0.15)`
   - **Accent Color:** `#DAA520`
   - **Specs:**
     - *sugar:* 1.5g per 100ml (lightly honeyed)
     - *calories:* 12 kcal per 100ml (approx 30 kcal per cup)
     - *benefits:* Antioxidant-rich; soothing after heavy meals
   - **Ingredients:** Brewed Kashmiri Green Tea, Saffron, Green Cardamom, Cinnamon Bark, Crushed Almonds, Raw Honey
   - **Taste Highlight:** Delicate floral-saffron green tea with warm spice and a soft nutty finish; light, fragrant, golden.
   - **Replaces:** Sugary green-tea sachets / After-dinner sweets

18. **Gut Chai** (ID: `steep-gut-chai`)
   - **Category:** Hot Brew
   - **Tagline:** Chai that's kind to your stomach.
   - **Description:** A warming spiced chai brewed with whole spices over a prebiotic chicory-root base, with just a touch of jaggery instead of heavy sugar and milk. Familiar masala-chai comfort, gentler on digestion.
   - **Badge:** 5g Plant Fibre
   - **Price:** ₹75
   - **Image Code:** `gut-chai`
   - **Glow Color:** `rgba(205, 133, 63, 0.15)`
   - **Accent Color:** `#CD853F`
   - **Specs:**
     - *fiber:* 5g Prebiotic Chicory Fiber
     - *sugar:* 3.0g per 100ml (lightly jaggery-sweetened)
     - *calories:* 22 kcal per 100ml (approx 55 kcal per cup)
     - *benefits:* Warming carminative spices ease digestion
   - **Ingredients:** Brewed Assam Black Tea, Chicory Root Inulin, Fresh Ginger, Green Cardamom, Cinnamon, Clove, Black Pepper, A2 Milk (light), Jaggery
   - **Taste Highlight:** Warm, spiced, lightly sweet masala chai with a clean finish; comforting, never cloying.
   - **Replaces:** Sugary milk chai / Instant tea premixes

19. **Golden Turmeric** (ID: `steep-golden-turmeric`)
   - **Category:** Hot Brew
   - **Tagline:** The everyday comfort brew.
   - **Description:** A soothing turmeric-and-ginger brew with black pepper and a prebiotic fibre base — the classic haldi comfort, modernised and lightly sweetened.
   - **Badge:** Curcumin + Fibre
   - **Price:** ₹75
   - **Image Code:** `golden-turmeric`
   - **Glow Color:** `rgba(255, 165, 0, 0.15)`
   - **Accent Color:** `#FFA500`
   - **Specs:**
     - *fiber:* Fresh Curcumin + Prebiotic Fiber
     - *sugar:* 2.5g per 100ml (light jaggery)
     - *calories:* 20 kcal per 100ml (approx 50 kcal per cup)
     - *benefits:* Warming spices for everyday post-meal comfort
   - **Ingredients:** Fresh Turmeric, Ginger, Black Pepper, Cinnamon, Chicory Fiber, A2 / Plant Milk, Light Jaggery
   - **Taste Highlight:** Earthy turmeric-ginger warmth with a peppery edge; creamy, golden, soothing.
   - **Replaces:** Sugary haldi-doodh mixes / Hot chocolate

20. **Filter Kaapi** (ID: `steep-filter-kaapi`)
   - **Category:** Hot Brew
   - **Tagline:** Your kaapi, polyphenol-loaded.
   - **Description:** Slow-brewed South Indian filter-coffee decoction, naturally polyphenol-rich, finished with a lighter milk-and-jaggery profile for everyday gut-friendly comfort.
   - **Badge:** Polyphenol-Rich
   - **Price:** ₹75
   - **Image Code:** `filter-kaapi`
   - **Glow Color:** `rgba(139, 69, 19, 0.15)`
   - **Accent Color:** `#8B4513`
   - **Specs:**
     - *sugar:* 2.0g per 100ml (light jaggery)
     - *calories:* 24 kcal per 100ml (approx 60 kcal per cup)
     - *benefits:* Natural coffee polyphenols feed gut bacteria
   - **Ingredients:** South Indian Filter Coffee Decoction (Arabica/Robusta + Chicory), A2 Milk, Light Jaggery
   - **Taste Highlight:** Bold, aromatic filter-coffee depth with a smooth, lightly sweet milk finish.
   - **Replaces:** Instant coffee / Sugary café lattes

21. **Cocoa Spice** (ID: `steep-cocoa-spice`)
   - **Category:** Hot Brew
   - **Tagline:** The hot chocolate your gut craves.
   - **Description:** A rich, dark hot chocolate made with raw cacao — one of the most polyphenol-dense foods there is — plus warming spices and a prebiotic fibre base. Deep chocolate comfort with a fraction of the sugar of a sachet.
   - **Badge:** Polyphenol-Rich
   - **Price:** ₹75
   - **Image Code:** `cocoa-spice`
   - **Glow Color:** `rgba(105, 105, 105, 0.15)`
   - **Accent Color:** `#696969`
   - **Specs:**
     - *fiber:* Polyphenol-Rich Raw Cacao
     - *sugar:* 4.5g per 100ml (date + light jaggery)
     - *calories:* 38 kcal per 100ml (approx 95 kcal per cup)
     - *benefits:* Cacao polyphenols feed gut bacteria; warming spices aid post-meal comfort
   - **Ingredients:** Raw Cacao Powder, A2 / Plant Milk, Chicory Root Fiber, Dates, Cinnamon, A Pinch of Cardamom, A Pinch of Sea Salt, Light Jaggery
   - **Taste Highlight:** Deep, dark, velvety chocolate with warm cinnamon and a whisper of sea salt; rich but clean, never sugary.
   - **Replaces:** Sugary instant hot chocolate / Drinking-chocolate sachets

#### BRAND 6: GRIT
22. **Millet & Date** (ID: `grit-millet-date`)
   - **Category:** Gut Bar
   - **Tagline:** The bar your gut actually wants.
   - **Description:** A chewy whole-food bar of toasted millets, dates, and seeds, bound with prebiotic fibre. No refined sugar, no junk — just slow, real fuel for the hunger gap.
   - **Badge:** 7g Plant Fibre
   - **Price:** ₹95
   - **Image Code:** `millet-date`
   - **Glow Color:** `rgba(205, 170, 125, 0.15)`
   - **Accent Color:** `#CDAA7D`
   - **Specs:**
     - *fiber:* 7g Dietary Fibre per bar
     - *sugar:* 9g per bar (whole-date sugars)
     - *calories:* approx 180 kcal per 40g bar
     - *benefits:* Slow-release energy that feeds gut bacteria
   - **Ingredients:** Foxtail & Ragi Millet, Dates, Almonds, Pumpkin Seeds, Flaxseed, Chicory Fibre, Cinnamon
   - **Taste Highlight:** Chewy, nutty, date-sweet with a toasted-millet crunch.
   - **Replaces:** Sugary granola/protein bars / Biscuits

23. **Cacao Nib** (ID: `grit-cacao-nib`)
   - **Category:** Gut Bar
   - **Tagline:** Chocolate that feeds the good guys.
   - **Description:** A rich dark-cacao bar with oats, almond butter, and crunchy cacao nibs — dessert satisfaction with real fibre and polyphenols.
   - **Badge:** 6g Plant Fibre
   - **Price:** ₹95
   - **Image Code:** `cacao-nib`
   - **Glow Color:** `rgba(139, 69, 19, 0.15)`
   - **Accent Color:** `#8B4513`
   - **Specs:**
     - *fiber:* 6g Dietary Fibre per bar
     - *sugar:* 8g per bar (date + minimal jaggery)
     - *calories:* approx 200 kcal per 40g bar
     - *benefits:* Polyphenol-rich; satisfies sweet cravings
   - **Ingredients:** Rolled Oats, Dates, Raw Cacao, Cacao Nibs, Almond Butter, Flaxseed, Sea Salt
   - **Taste Highlight:** Deep dark-chocolate over a salted-nutty base with crunchy nibs.
   - **Replaces:** Chocolate bars / Sugary desserts

24. **Seed & Spice** (ID: `grit-seed-spice`)
   - **Category:** Gut Bar
   - **Tagline:** Crunch with a conscience.
   - **Description:** A crisp savory seed cracker baked with whole grains and digestive spices — the gut-friendly answer to fried namkeen and chips.
   - **Badge:** Whole-Grain Fibre
   - **Price:** ₹95
   - **Image Code:** `seed-spice`
   - **Glow Color:** `rgba(184, 134, 11, 0.15)`
   - **Accent Color:** `#B8860B`
   - **Specs:**
     - *fiber:* 5g Dietary Fibre per serving
     - *sugar:* 0.5g per serving (savory, zero sugar added)
     - *calories:* approx 150 kcal per 35g serving
     - *benefits:* Spices assist digestion; high mineral seeds
   - **Ingredients:** Jowar & Bajra Flour, Flaxseed, Sesame Seeds, Sunflower Seeds, Carom Seeds (Ajwain), Cumin, Hing, Cold-Pressed Oil, Sea Salt
   - **Taste Highlight:** Crisp, earthy, nutty, with an aromatic flash of toasted ajwain and cumin.
   - **Replaces:** Fried namkeen / Potato chips

25. **Sattu Bite** (ID: `grit-sattu-bite`)
   - **Category:** Gut Bar
   - **Tagline:** Clean energy, roasted.
   - **Description:** A dense, crumbly energy bite made with roasted chana (sattu) flour, seeds, and spices, bound with prebiotic fibre and a touch of raw honey. Low-glycemic protein for active days.
   - **Badge:** High-Protein
   - **Price:** ₹95
   - **Image Code:** `sattu-bite`
   - **Glow Color:** `rgba(222, 184, 135, 0.15)`
   - **Accent Color:** `#DEB887`
   - **Specs:**
     - *fiber:* 6g Dietary Fibre per serving
     - *sugar:* 5g per serving (honey-sweetened)
     - *calories:* approx 160 kcal per 35g bite
     - *benefits:* High plant-protein sattu feeds beneficial gut microbes
   - **Ingredients:** Roasted Bengal Gram (Sattu) Flour, Pumpkin Seeds, Cardamom, Fennel Extract, Prebiotic Chicory Fiber, Raw Honey, Ghee
   - **Taste Highlight:** Crumbly, roasted-nutty flavour with a sweet cardamon lift.
   - **Replaces:** Protein powder bars / Packaged energy bites

26. **Choc Hazelnut** (ID: `grit-choc-hazelnut`)
   - **Category:** Gut Bar
   - **Tagline:** The hazelnut spread, solidified.
   - **Description:** A rich, nutty bar combining toasted hazelnuts, oats, raw cacao, and a prebiotic fibre base. Satisfies chocolate cravings with real fibre and healthy fats.
   - **Badge:** 6g Plant Fibre
   - **Price:** ₹95
   - **Image Code:** `choc-hazelnut`
   - **Glow Color:** `rgba(139, 69, 19, 0.15)`
   - **Accent Color:** `#8B4513`
   - **Specs:**
     - *fiber:* 6g Dietary Fibre per bar
     - *sugar:* 7g per bar (date + raw honey)
     - *calories:* approx 210 kcal per 40g bar
     - *benefits:* Hazelnut monounsaturated fats support gut wall integrity
   - **Ingredients:** Toasted Hazelnuts, Rolled Oats, Raw Cacao, Chicory Root Fiber, Date Paste, Raw Honey, Vanilla Bean Extract
   - **Taste Highlight:** Rich dark-chocolate hazelnut melt with a crunchy nutty texture.
   - **Replaces:** Hazelnut spreads / Milk chocolate candies

---

### UI / Overlay Text (Interactive Box Builder)
- **Product Details Page Details:** "Nutritional Index", "100% Sourced Ingredients", "Tasting Palette Highlight", "*Packaged in custom 250ml inert glass bottles to preserve natural carbonation." (Applies to sodas).
- **Interactive Box Builder (Crate builder):**
  - "Interactive Customizer"
  - "Build your own 6-Pack Tester Box"
  - "Experience the flavors first-hand. Click or drag flavors to fill up your 6-bottle testing crate. Get customized packaging and taste the future of carbonation."
  - Action buttons: "Tap to Add", "Select Flavor", "Swap", "Remove", "Clear Crate", "Add Box to Cart"
- **Cart Side-Drawer:**
  - "Your Tester Pack"
  - "Cart is empty"
  - "Select individual flavors or construct a custom 6-pack to try out the founding range."
  - "Subtotal Amount"
  - "Place Mock Order"
- **Checkout Success Overlay:**
  - "Mock Purchase Successful"
  - "Fermenting Your Crate"
  - "Your customized [Brand] probiotic soda pack has been locked in. We will prepare your batch and ship it within 24 hours."
  - "Crate Manifest"
  - "Return to Product Lab"
  - "Automatically returning in X s"
- **Footer Text:** BUILT IN THE OPEN. ONE BATCH AT A TIME.

---

## 4. Recipes Hub (`app/recipes/page.tsx`)

### Header & Interface
- **Pre-title:** FUNCTIONAL PROTOCOLS
- **Title:** The Recipe Hub
- **Subtitle:** Open-source gut architecture. Formulated for maximum microbiome impact, engineered for absolute craving.
- **Search Placeholder:** Search recipes by name, ingredient, or tag...
- **Filter Chips:** All Recipes, Breakfasts, Lunch & Dinner, Smoothies & Tonics, Ferments, Beginner-proof, Quick (<20 min), One-pot, No-cook.
- **Back Button:** "Back to Food Wing" (redirects to `/approach`).

### Active Recipe List (20 Recipes)

#### Category: Ferments (F1–F8)
1. **F1: Fermented Kanji Rice (Pazhaya Sadam)**
   - **Tags:** No-cook, Beginner-proof, Ferments, Live Probiotics
   - **Prep Time:** 10 min + overnight
   - **Ingredients:** ½ cup cooked parboiled or brown rice (cooled) · 1.5 cups filtered water · 1 green chilli, sliced (optional, feeds wild yeast) · 2 tbsp homemade dahi/curd (optional starter) · Pinch of unrefined salt
   - **Steps:**
     1. Place cooled leftover cooked rice into a clean glass jar or clay pot.
     2. Pour filtered water over the rice until it is fully submerged.
     3. Drop in the sliced green chilli or stir in the curd starter if using.
     4. Cover the mouth of the container with a clean, breathable muslin cloth and secure it with a rubber band.
     5. Let it sit undisturbed overnight (8–12 hours) at room temperature.
     6. In the morning, strain the tangy probiotic water into a cup, mash the rice slightly with your hand, add salt, and consume together.
   - **Sensory Cues:** Should smell mildly sour, clean, and refreshing, with tiny bubbles visible at the edges.
   - **Troubleshooting:** If it smells putrid, cheesy, or foul, discard immediately. This happens if the jar wasn't clean or the room was too hot. Sterilize the container and try again.
   - **Why It Heals:** Provides a powerful dose of live lactic acid bacteria and organic acids to kickstart morning digestion.

2. **F2: Cabbage Sauerkraut**
   - **Tags:** No-cook, Ferments, Live Probiotics
   - **Prep Time:** 20 min + 5-10 days
   - **Ingredients:** 1 medium green cabbage (approx. 1kg, outer leaves removed) · 1.5 tbsp non-iodized sea salt or pink salt
   - **Steps:**
     1. Shred the cabbage very thinly, discarding the tough inner core.
     2. Place the shredded cabbage in a large, clean mixing bowl and sprinkle the salt evenly over it.
     3. Using clean hands, massage and squeeze the cabbage firmly for 10 minutes. A pool of liquid (brine) will start forming at the bottom.
     4. Pack the massaged cabbage tightly into a clean glass jar, pressing down hard with your fist or a wooden spoon so the brine rises above the cabbage level.
     5. Weight the cabbage down (using a clean glass weight or a smaller jar filled with water) to keep it submerged. Seal the jar loosely.
     6. Keep the jar in a dark cupboard for 5–10 days. Burp the jar daily to release built-up gas. Taste after day 5. Once tangy, seal tightly and store in the fridge.
   - **Sensory Cues:** Crisp, tangy flavor. You should see bubbles rising when you tap the glass jar.
   - **Troubleshooting:** A white film on the surface (Kahm yeast) is harmless; simply scrape it off. If you see fuzzy green, black, or blue mold, or if the smell is rotten, discard and start fresh.
   - **Why It Heals:** One of the most concentrated sources of diverse plant-based lactobacilli, loaded with prebiotic cabbage fiber.

3. **F3: Lacto-Fermented Root Vegetables**
   - **Tags:** No-cook, Ferments, Live Probiotics
   - **Prep Time:** 15 min + 5-7 days
   - **Ingredients:** 2 cups vegetable batons (carrots, beetroot, radish, turnip) · 2 cups filtered water · 1 tbsp unrefined sea salt
   - **Steps:**
     1. Whisk the sea salt into the water until completely dissolved to create a 3% salt brine.
     2. Pack the vegetable batons tightly into a clean glass jar, leaving 1 inch of headspace at the top.
     3. Pour the brine over the vegetables, ensuring they are completely submerged. Use a weight to keep them down.
     4. Cover the jar with a lid, closed loosely to allow gas to escape.
     5. Sit at room temperature away from direct sunlight for 5–7 days. Burp daily. Move to the fridge once the crunch turns sour.
   - **Sensory Cues:** Brine turns slightly cloudy, vegetables remain crunchy but taste pleasantly sour and pickled.
   - **Troubleshooting:** If the vegetables turn mushy or slimy, it means the salt concentration was too low or the temperature was too high. Discard them.
   - **Why It Heals:** Preserves the natural polyphenols of roots while adding gut-friendly lactic acid cultures.

4. **F4: Simple Water Kefir**
   - **Tags:** No-cook, Ferments, Live Probiotics
   - **Prep Time:** 15 min + 24-48 hr
   - **Ingredients:** 4 cups filtered water (non-chlorinated) · ¼ cup organic cane sugar · ¼ cup water kefir grains · 1 dried fig or date (optional, for minerals)
   - **Steps:**
     1. Dissolve sugar completely in 1 cup of warm water, then mix in the remaining 3 cups of cool water to make sure it's room temp.
     2. Pour into a clean glass jar and add the water kefir grains and dried fruit.
     3. Cover with a breathable cloth and secure with a rubber band.
     4. Let ferment at room temperature for 24–48 hours. Taste after 24 hours; it should be lightly sweet and tangy.
     5. Strain the liquid into bottles, keeping the grains for your next batch. Seal the bottles and let sit for another 24 hours for natural fizz.
   - **Sensory Cues:** Brisk, slightly fizzy, and mildly sweet-sour taste with a clean yeasty aroma.
   - **Troubleshooting:** If grains become mushy or the ferment smells like vinegar, it fermented too long or the room was too warm. Reduce ferment time.
   - **Why It Heals:** An incredibly carbonated, vegan source of beneficial yeast and bacteria that support the gut lining.

5. **F5: Steamed Besan Dhokla**
   - **Tags:** One-pot, Beginner-proof, Ferments
   - **Prep Time:** 15 min + 8 hr ferment
   - **Ingredients:** 1.5 cups besan (chickpea flour) · ½ cup fresh set curd/dahi · ½ cup warm water · ½ tsp turmeric · ½ tsp salt · 1 tsp ginger-chilli paste · 1 tsp fruit salt (eno) or baking soda for rise
   - **Steps:**
     1. In a bowl, whisk besan, curd, warm water, turmeric, and salt to a thick, smooth batter.
     2. Cover and ferment in a warm spot for 6–8 hours (overnight). It will rise slightly and develop a faint sour smell.
     3. Stir in ginger-chilli paste. Grease a steaming tin.
     4. Just before steaming, add the fruit salt/baking soda to the batter and stir gently in one direction. It will bubble up.
     5. Immediately pour into the tin and steam for 12–15 minutes until a toothpick inserted comes out clean.
     6. Let cool, slice, and finish with a mild mustard-seed and curry-leaf tadka.
   - **Sensory Cues:** Extremely spongy, soft, light texture with a clean, mild sour tang.
   - **Troubleshooting:** If it turns flat or dense, the batter was too watery or the soda was added too early. Ensure dhokla is steamed immediately after raising agent.
   - **Why It Heals:** Chickpea flour is high in plant protein and prebiotic fibers; fermentation neutralizes phytates for easy absorption.

6. **F6: Millet Idli & Dosa Batter**
   - **Tags:** Ferments, Live Probiotics, One-pot
   - **Prep Time:** 30 min + 12 hr ferment
   - **Ingredients:** 2 cups foxtail or little millet · 1 cup whole skinless urad dal · ½ tsp fenugreek (methi) seeds · 1 tbsp unrefined salt · Water for grinding
   - **Steps:**
     1. Wash and soak the millet and urad dal (with methi seeds) in separate bowls for 5–6 hours.
     2. Grind the urad dal and methi seeds with minimal ice-cold water to a fluffy, thick batter.
     3. Grind the soaked millet separately to a slightly coarse texture.
     4. Mix both batters together in a large container with your clean hands (hand heat kickstarts fermentation) and add salt.
     5. Cover and leave in a warm spot for 8–12 hours until risen, airy, and bubbly.
     6. Use immediately to steam idlis or spread thin on a tawa for crispy dosas.
   - **Sensory Cues:** Fermented batter should double in volume and have a pleasant, sour, sourdough-like aroma.
   - **Troubleshooting:** If the batter doesn't rise, the room was too cold. Place the bowl inside an turned-off oven with the light bulb switched on.
   - **Why It Heals:** A staple probiotic source. Fermentation breaks down anti-nutrients in grains, making them gentle on digestion.

7. **F7: Spiced Beet-Carrot Kanji**
   - **Tags:** No-cook, Ferments, Live Probiotics
   - **Prep Time:** 15 min + 4-5 days
   - **Ingredients:** 2 medium black carrots or red carrots · 1 small beetroot · 5 cups filtered water · 2 tbsp yellow mustard seeds, coarsely ground · 1.5 tsp black salt · 1 tsp sea salt
   - **Steps:**
     1. Peel and slice the carrots and beetroot into thick finger-sized batons.
     2. Place the batons in a large, sterilized glass jar.
     3. Add the ground mustard seeds, black salt, and sea salt.
     4. Pour in the water and stir well with a clean wooden spoon.
     5. Cover the mouth with a breathable cloth and place in a sunny window for 4–5 days, stirring once daily.
     6. Strain and bottle once sour and tangy. Refrigerate.
   - **Sensory Cues:** Deep crimson-purple color, tangy, earthy flavor with a sharp, mustard-led kick.
   - **Troubleshooting:** A thin white film on top is normal Kahm yeast—just scrape off. If the liquid feels thick or slimy, discard (improper sanitation).
   - **Why It Heals:** Delivers robust anthocyanin antioxidants and active lactobacilli directly to the intestinal tract.

8. **F8: Traditional Ragi Koozh**
   - **Tags:** Ferments, Live Probiotics, Breakfasts
   - **Prep Time:** 20 min + 15 hr ferment
   - **Ingredients:** ½ cup ragi (finger millet) flour · 2 cups water · ¼ cup fresh buttermilk/chaas · 1 small onion, finely chopped · Salt to taste
   - **Steps:**
     1. Whisk ragi flour and 1 cup of water in a bowl to make a lump-free paste. Cover and ferment overnight (12 hours).
     2. Boil the remaining 1 cup of water in a pot. Pour the fermented ragi paste slowly, stirring constantly on low heat.
     3. Cook for 8–10 minutes until the mixture turns glossy, thickens, and loses its raw taste. Let it cool completely.
     4. Ferment the cooled ragi porridge for another 3–4 hours.
     5. Just before serving, whisk in the buttermilk, chopped raw onion, and salt. Drink cool.
   - **Sensory Cues:** Sour, earthy porridge with a crunchy pop of raw onion.
   - **Troubleshooting:** If the porridge lumps while cooking, whisk vigorously with a wire whisk on low heat and add a splash of warm water.
   - **Why It Heals:** Heavily mineral-loaded (calcium/iron) with a cooling, probiotic rhythm that calms internal gut heat.

#### Category: Core Recipes (R1–R12)
9. **R1: Foxtail–Moong Khichdi**
   - **Tags:** One-pot, Beginner-proof, Quick (<20 min)
   - **Prep Time:** 15 min
   - **Ingredients:** ½ cup foxtail millet · ½ cup split yellow moong dal · 1 cup mixed soft vegetables (bottle gourd, carrots, spinach) · 1 tbsp ghee · 1 tsp cumin seeds · 1 tsp ginger, grated · Pinch of hing (asafoetida) · ¼ tsp turmeric · ½ tsp salt · 4 cups water
   - **Steps:**
     1. Rinse the millet and split moong dal together three times; soak in clean water for 20 minutes, then drain.
     2. Heat ghee in a pressure cooker on medium; add cumin seeds and let them sizzle for 15 seconds.
     3. Stir in the grated ginger and hing, cooking for 10 seconds.
     4. Add the chopped vegetables and sauté for 1 minute.
     5. Stir in the drained millet, dal, turmeric, salt, and water.
     6. Close the lid and pressure cook for 3–4 whistles. Let the pressure release naturally before opening. Stir and serve warm.
   - **Sensory Cues:** Soft, creamy, porridge-like consistency, yellow hue with visible bits of tender vegetables.
   - **Why It Heals:** Extremely gentle on the stomach lining; provides a complete, easy-to-assimilate vegetarian protein.

10. **R2: Moong Pesarattu Crepe**
    - **Tags:** Quick (<20 min), Breakfasts, High-Protein
    - **Prep Time:** 15 min + soaking
    - **Ingredients:** 1 cup whole green moong (soaked 5–6 hours) · 1 inch fresh ginger · 1 green chilli · ½ tsp salt · ½ cup water · ½ chopped onion (for topping) · 1 tsp ghee or oil for pan
    - **Steps:**
      1. Drain the soaked whole moong dal and transfer to a blender.
      2. Add ginger, chilli, salt, and water. Blend to a smooth, pourable batter.
      3. Heat an iron griddle (tawa) on medium. Splash water to test; it should sizzle off.
      4. Pour a ladle of batter in the center. Using the back of the ladle, spread in a spiral into a thin, round crepe.
      5. Drizzle ghee around the edges and sprinkle chopped raw onions on top, pressing them gently into the batter.
      6. Cook for 2–3 minutes until the bottom is crisp and golden, then flip and cook for 1 minute. Serve hot.
    - **Sensory Cues:** Crispy edges, golden-brown spots, fresh green color with an aromatic ginger-onion scent.
    - **Why It Heals:** Rich in prebiotic resistant starches and clean plant protein; very low glycemic load.

11. **R3: Universal Dal + Brown Rice**
    - **Tags:** One-pot, Beginner-proof, Lunch & Dinner
    - **Prep Time:** 25 min
    - **Ingredients:** ¾ cup split yellow moong dal · 1 cup brown rice (soaked) · 2.5 cups water (for rice) · 3 cups water (for dal) · ¼ tsp turmeric · ½ tsp salt · 1 tbsp ghee · 1 tsp cumin seeds · 1 tsp ginger, grated · Pinch of hing · Lemon wedge · Raw onion slices
    - **Steps:**
      1. Rinse and cook the brown rice with 2.5 cups of water in a pressure cooker (3 whistles) or pot.
      2. In a separate pot, boil the washed dal with 3 cups of water, turmeric, and salt until completely soft and mashed.
      3. Heat ghee in a small ladle for the tadka. Add cumin seeds, ginger, and hing. Once sizzling, pour directly into the cooked dal.
      4. Finish the dal with a squeeze of fresh lemon juice.
      5. Serve the warm dal over brown rice, garnished with raw onion slices.
    - **Sensory Cues:** Fluffy brown rice grains topped with aromatic, golden-yellow, bubbling dal.
    - **Why It Heals:** Classic comfort that supplies all 9 essential amino acids; the tadka spices counteract bloating and gas.

12. **R4: Gongura Pappu (Andhra Sorrel Dal)**
    - **Tags:** Lunch & Dinner, Polyphenol-Rich
    - **Prep Time:** 20 min
    - **Ingredients:** ¾ cup toor dal (split pigeon peas) · 2 cups fresh gongura (sorrel) leaves, washed and chopped · ¼ tsp turmeric · ½ tsp salt · 1 tbsp oil or ghee · 3 garlic cloves, crushed · 1 dry red chilli · ½ tsp mustard seeds · Pinch of hing
    - **Steps:**
      1. Pressure cook the toor dal with turmeric and 2.5 cups of water for 4 whistles until soft. Mash well.
      2. In a separate pan, cook the gongura leaves with a splash of water for 3–4 minutes until they wilt down into a sour pulp.
      3. Stir the sour gongura pulp and salt into the mashed dal. Simmer together for 3 minutes on low heat.
      4. In a small pan, heat ghee. Add mustard seeds, crushed garlic, red chilli, and hing. Once garlic turns golden, pour over the dal. serve.
    - **Sensory Cues:** Thick, dark-green speckled dal with a robust, sour flavor and a heavy garlicky aroma.
    - **Why It Heals:** Sorrel leaves are packed with sour organic acids and polyphenols that feed beneficial gut Bifidobacteria.

15. **R5: Any-Vegetable Sabzi**
    - **Tags:** Quick (<20 min), Beginner-proof, Lunch & Dinner
    - **Prep Time:** 15 min
    - **Ingredients:** 2 cups chopped vegetables of choice (ivy gourd, bottle gourd, carrots, cabbage, etc.) · 1 tbsp cold-pressed oil · ½ tsp mustard seeds · ½ tsp cumin seeds · 1 sprig curry leaves · ½ onion, chopped · 1 tomato, chopped · ¼ tsp turmeric · ½ tsp coriander powder · ½ tsp salt
    - **Steps:**
      1. Heat oil in a pan on medium. Add mustard seeds, cumin, and curry leaves. Let them splutter.
      2. Add chopped onions and sauté until translucent.
      3. Add chopped tomatoes and cook until soft and mushy.
      4. Stir in the turmeric, coriander powder, and salt.
      5. Add the chopped vegetables and stir to coat them in the spice base.
      6. Pour in a splash of water, cover the pan, and simmer on low heat for 8–15 minutes until tender.
    - **Sensory Cues:** Colorful, tender-crisp vegetables coated in a light, non-greasy spice paste.
    - **Why It Heals:** Rotating vegetables daily maximizes dietary plant diversity, feeding a wider spectrum of gut microbes.

14. **R6: Curd–Berry–Seed Bowl**
    - **Tags:** No-cook, Breakfasts, Prebiotics
    - **Prep Time:** 5 min
    - **Ingredients:** ¾ cup fresh home-set curd/dahi · ½ cup mixed berries or pomegranate seeds · 1 tbsp ground flaxseeds · 1 tsp chia seeds · 1 tbsp raw pumpkin seeds
    - **Steps:**
      1. Scoop fresh home-set curd into a serving bowl.
      2. Arrange the fresh berries or pomegranate seeds on top.
      3. Sprinkle the ground flaxseeds, chia seeds, and pumpkin seeds evenly over the surface. Consume immediately.
    - **Sensory Cues:** Cool, creamy white base topped with vibrant red/blue berries and crunchy, textured seeds.
    - **Why It Heals:** Combines active lactobacillus cultures with soluble prebiotic mucilage and omega-3 fatty acids.

15. **R7: Ragi Ambali Porridge**
    - **Tags:** Breakfasts, Ferments, Quick (<20 min)
    - **Prep Time:** 15 min
    - **Ingredients:** 3 tbsp ragi (finger millet) flour · 1.5 cups water · ¼ cup fresh buttermilk (chaas) · 4 curry leaves, torn · Pinch of salt
    - **Steps:**
      1. In a bowl, whisk the ragi flour into 1 cup of cold water until completely smooth.
      2. Heat the remaining ½ cup of water in a pan on low. Slowly pour in the ragi slurry while whisking constantly.
      3. Simmer for 5–6 minutes, stirring continuously, until the mixture thickens and turns glossy.
      4. Remove from heat and let it cool completely to room temperature.
      5. Stir in the buttermilk, salt, and torn curry leaves. Whisk well and drink.
    - **Sensory Cues:** Smooth, dark brown, earthy porridge with a cool, refreshing, sour finish.
    - **Why It Heals:** Highly alkalizing and loaded with calcium; provides gentle fiber to soothe inflamed gut membranes.

16. **R8: Spiced Neer-Mor (Buttermilk)**
    - **Tags:** No-cook, Smoothies & Tonics, Quick (<20 min)
    - **Prep Time:** 5 min
    - **Ingredients:** ½ cup fresh set curd · 1.5 cups cold water · ½ tsp ginger juice (squeezed from grated ginger) · ¼ tsp roasted cumin powder · 4 curry leaves, chopped · 1 tbsp coriander leaves, chopped · Pinch of black salt
    - **Steps:**
      1. Combine curd and cold water in a deep jug. Whisk vigorously for 30 seconds until frothy.
      2. Stir in the ginger juice, roasted cumin powder, and black salt.
      3. Mix in the finely chopped curry leaves and coriander leaves.
      4. Serve chilled after lunch.
    - **Sensory Cues:** Light, watery, frothy white drink flecked with green herbs and aromatic ground cumin.
    - **Why It Heals:** Instantly replenishes lost hydration and beneficial microbes; ginger and cumin alleviate post-meal gas.

17. **R9: Purple Polyphenol Smoothie**
    - **Tags:** No-cook, Smoothies & Tonics
    - **Prep Time:** 5 min
    - **Ingredients:** 1 cup unsweetened coconut milk · ¼ cup cooked beetroot, cooled · ½ cup blueberries or wild jamun pulp · 1 tsp chia seeds · 2 soft dates, pitted
    - **Steps:**
      1. Pour coconut milk into a high-speed blender.
      2. Add the beetroot slices, berries, chia seeds, and soft dates.
      3. Blend on high for 60 seconds until completely smooth and velvety.
      4. Pour into a glass and drink immediately.
    - **Sensory Cues:** Vivid, intense magenta-purple color, thick, creamy texture with a sweet, berry-earthy flavor.
    - **Why It Heals:** Dense in betalains and anthocyanins that selectively feed beneficial gut bacteria like Akkermansia.

18. **R10: Sattu Sharbat Tonic**
    - **Tags:** No-cook, Smoothies & Tonics, High-Protein
    - **Prep Time:** 5 min
    - **Ingredients:** 3 tbsp roasted chana (sattu) flour · 1.5 cups cold water · Juice of ½ lemon · ¼ tsp roasted cumin powder · 4 fresh mint leaves, torn · Pinch of pink salt
    - **Steps:**
      1. Whisk the roasted chana flour into cold water until there are absolutely no lumps.
      2. Stir in the fresh lemon juice, roasted cumin, and a pinch of pink salt.
      3. Garnish with torn mint leaves. Serve cool.
    - **Sensory Cues:** Light beige, savory liquid with a refreshing citrus, mint, and nutty roasted aroma.
    - **Why It Heals:** Delivers easily digestible, non-bloating plant protein and cooling hydration to the gut.

19. **R11: Probiotic Beet Kanji**
    - **Tags:** No-cook, Ferments, Live Probiotics
    - **Prep Time:** 10 min + 4 days
    - **Ingredients:** 1 medium beetroot, diced · 4 cups filtered water · 1 tbsp mustard seeds, crushed · 1 tsp black salt · 1 tsp sea salt
    - **Steps:**
      1. Place the beetroot cubes into a clean glass jar.
      2. Whisk the mustard seeds, black salt, and sea salt into the water.
      3. Pour the spiced water over the beets, leaving an inch of headspace.
      4. Cover with a breathable cloth and place in a sunny spot for 3–5 days.
      5. Strain the tart, sour red brine into a bottle and refrigerate. Drink ½ cup daily.
    - **Sensory Cues:** Deep ruby-red liquid, sharp, vinegary, salty taste with a strong mustard bite.
    - **Why It Heals:** Combines the vascular benefits of beetroot nitric oxide with a rich array of wild yeast and probiotic bacteria.

20. **R12: Jeera–Ajwain–Saunf Tea**
    - **Tags:** Quick (<20 min), Smoothies & Tonics, Beginner-proof
    - **Prep Time:** 10 min
    - **Ingredients:** ½ tsp cumin seeds (jeera) · ½ tsp carom seeds (ajwain) · ½ tsp fennel seeds (saunf) · 2 cups water
    - **Steps:**
      1. Combine the cumin, carom, and fennel seeds with water in a saucepan.
      2. Bring to a boil, then reduce heat and simmer gently for 5 minutes.
      3. Turn off the heat, cover, and let steep for 5 minutes.
      4. Strain into a cup and sip slowly while warm.
    - **Sensory Cues:** Pale amber-yellow tea with a warm, comforting, herbal and anise seed fragrance.
    - **Why It Heals:** Relaxes the digestive tract muscles, quickly relieving bloating, gas, and abdominal cramps.

---

### Locked / Coming Soon Recipes
21. **Rejuvelac** (Locked $\rightarrow$ Category: Ferments)
    - *Title:* Rejuvelac
    - *Copy:* A wild prebiotic enzyme drink made from sprouted wheatberries or quinoa.
22. **Apple Cider Vinegar** (Locked $\rightarrow$ ACV with Mother)
    - *Title:* Apple Cider Vinegar (ACV with Mother)
    - *Copy:* Raw, unfiltered apple ferment packed with digestive enzymes.
23. **Wild Tea Kombucha** (Locked $\rightarrow$ Category: Ferments)
    - *Title:* Wild Tea Kombucha
    - *Copy:* Traditional double-fermented black tea using SCOBY cultures.

---

## 5. Journal Hub (`app/journal/page.tsx`)

### Header & Navigation
- **Pre-title:** Journal
- **Title:** Notes, recipes, & guides.
- **Subtitle:** Detailed guides and simple, real food recipes built directly from our kitchen trials.

### Active Collections
- **Collection 1: First Batch**
  - **Banner Tag:** 21 RECIPES · EVERYDAY INDIAN
  - **Title:** First Batch
  - **Description:** 21 simple recipes to start cooking real food that actually tastes good — even if you've never cooked before.
  - **Cover Image:** `/all_image_files/journal/first-batch/recipe-06-moong-dal-khichdi.jpg`
  - **CTA:** Start Reading
- **Collection 2: Second Batch**
  - **Banner Tag:** 12 RECIPES · GLOBAL COMFORT
  - **Title:** Second Batch
  - **Description:** Comfort food, engineered for your microbiome. High protein, high fibre, and always fermented.
  - **Cover Image:** `/all_image_files/Modern_better4u_storefront_healthy_food_and_drink_2K_202607060059.jpeg`
  - **CTA:** Explore Recipes
- **Coming Soon Indicator:** More collections cooking in the background.

### Footer
- **Footer Text:** BUILT IN THE OPEN. ONE BATCH AT A TIME.

---

## 6. Journal: First Batch Collection (`app/journal/first-batch/page.tsx` & `[slug]/page.tsx`)

### Navigation & Header
- **Navigation:** "Back to Journal Hub" button (points to `/journal`).
- **Tag:** First Batch · Everyday Indian
- **Title:** First Batch
- **Subtitle:** 21 simple recipes to start cooking real food that actually tastes good — even if you've never cooked before.
- **Collection Tabs:** The Guide, The Recipes.

---

### Guide Sections (Literal Content)

#### 1. Start Here
- **Title:** Start Here
- **Heading:** The F-GOALS Framework
- **Content:** The core philosophy of First Batch is built around F-GOALS:
  - **F** - Fermentable Fibers (feeds beneficial microbes)
  - **G** - Greens & Prebiotics (strengthens mucosal barrier)
  - **O** - Oats & Grains (supplies beta-glucans and slow starch)
  - **A** - Ancestral Foods (traditional wild ferments and grains)
  - **L** - Legumes (high soluble fibers and plant protein)
  - **S** - Seeds & Polyphenols (diverse antioxidants and healthy fats)

#### 2. Tiny Kitchen Setup
- **Title:** Tiny Kitchen
- **Heading:** Gear for Gut Architecture
- **Content:** You do not need a gourmet setup. To cook all 21 recipes, you only need:
  - A standard Indian pressure cooker (3L or 5L)
  - One heavy-bottomed pan (kadai or patila)
  - An iron tawa (for Dosas and crepes)
  - A small tadka pan (for tempering spices)
  - A basic mixer-grinder (for chutneys and batters)

#### 3. Master Techniques
- **Title:** Master Techniques
- **Heading:** The Ghee Tadka
- **Content:** The secret to digesting grains and lentils is the *Tadka* (tempering). Heating spices in ghee or cold-pressed oil binds fat-soluble active compounds and makes them bioavailable:
  - Heat 1 tbsp ghee in a small pan.
  - Add 1 tsp cumin seeds; wait until they crackle and pop (15 seconds).
  - Add a pinch of hing (asafoetida) and 1 tsp grated ginger.
  - Sizzle for 10 seconds, then pour immediately into your simmering dal or rice.

#### 4. Rotating Core
- **Title:** Rotating Core
- **Heading:** Building Your Weekly Rhythm
- **Content:** Gut health thrives on predictability of schedule and diversity of plants. Choose 2 core dals, 3 rotating sabzis, and 1 daily ferment to form your stable base.

#### 5. Millet Guide
- **Title:** Millet Guide
- **Heading:** Embracing Ancient Grains
- **Content:** Millets are gluten-free, mineral-dense seeds. Always wash them in 3 changes of water and soak them for at least 4-6 hours before cooking to remove phytic acid.

#### 6. Gentle Days
- **Title:** Gentle Days
- **Heading:** What to Eat When Inflamed
- **Content:** On days when bloating or pain is high, drop raw salads, heavy seeds, and complex beans. Revert to split yellow moong dal, soft-cooked white/red rice, and warm cumin water (CCF).

#### 7. Systems That Make This Easy
- **Title:** Systems That Make This Easy
- **Heading:** Pre-portioning & Batching
- **Content:** Spend 20 minutes on Sunday pre-mixing your dals, roasting cumin powder, and peeling ginger. This eliminates the weekday friction that leads to ordering takeout.

#### 8. A Gentle Note
- **Title:** A Gentle Note
- **Heading:** Take Your Time
- **Content:** Do not try to implement all 21 recipes in one day. Start with one warm dal and a cup of curd. Your microbiome takes time to adapt to increased fiber—be patient and listen to your body.

---

### Interactive Plate Builder & Plant Points Calculator
- **Header:** Build Your Plate
- **Subheading:** Choose recipes below to construct a gut-friendly meal and calculate your live Plant Points and F-GOALS targets.
- **Calculator Box Text:** "Your Plate Balance", "Plant Points", "F-GOALS Covered", "Add recipes below to start calculating."

---

### First Batch Core 21 Recipes (Full Content)

1. **Perfect Red Matta Rice** (ID: `red-matta-rice`, Group: `Your Rice Base`)
   - **Why:** Kerala Red Matta is a parboiled red rice — gentle to digest, higher in fibre and minerals than white rice, and the calm, steady base every meal is built on.
   - **Plant Points:** 1
   - **Ingredients:** 1 cup Red Matta rice · 3½ cups water · pinch salt.
   - **Steps:**
     1. Rinse the rice in 2–3 changes of water. Soak 20–30 min if you can.
     2. Add rice + water + salt to the pressure cooker.
     3. Cook on medium for 4–5 whistles (red rice is tougher than white).
     4. Let the pressure drop on its own, open, fluff gently.
   - **Hacks:** cook a double batch and fridge it — it reheats in a minute with a splash of water, and cooled-then-reheated rice is actually better for your gut (resistant starch).
   - **Swaps:** mix in a handful of soaked foxtail millet for variety.
   - **Image:** `/all_image_files/journal/first-batch/recipe-01-red-matta-rice.jpg`
   - **Tags:** `G`

2. **Soft Curd Rice** (ID: `curd-rice`, Group: `Your Rice Base`)
   - **Why:** curd + soft rice is the most soothing meal there is — cooling, probiotic, and easy on the calmest or crankiest gut.
   - **Plant Points:** 4
   - **Ingredients:** 1½ cups cooked Red Matta rice (soft) · 1 cup curd · tadka: 1 tsp ghee, ½ tsp mustard + cumin, curry leaves, pinch hing, grated ginger · grated carrot + pomegranate to top.
   - **Steps:**
     1. Lightly mash the cooked rice so it's soft; let it cool to warm (not hot).
     2. Mix in the curd + a little salt.
     3. Make the tadka (see Master Techniques) and pour over.
     4. Top with carrot and pomegranate.
   - **Hacks:** add curd only when the rice is warm, not hot, so the good bacteria survive.
   - **Swaps:** grated cucumber instead of carrot on a hot day.
   - **Image:** `/all_image_files/journal/first-batch/recipe-02-curd-rice.jpg`
   - **Tags:** `F`, `A`

3. **Everyday Moong Dal** (ID: `moong-dal`, Group: `Dals`)
   - **Why:** split moong is the easiest lentil to digest — smooth, light, low on gas — and your reliable daily protein.
   - **Plant Points:** 4
   - **Ingredients:** ¾ cup moong dal (split yellow) · 2½ cups water · ½ tsp turmeric · tadka: ghee, cumin, garlic, curry leaves, hing · coriander.
   - **Steps:**
     1. Rinse dal well.
     2. Pressure-cook dal + water + turmeric + salt for 3–4 whistles till soft.
     3. Whisk smooth, add water for a pourable consistency, simmer 2 min.
     4. Pour over the tadka, finish with coriander.
   - **Hacks:** cook a big batch; dal keeps 3 days in the fridge and is your instant protein.
   - **Swaps:** stir in a handful of chopped spinach or bottle gourd while simmering — hidden plants.
   - **Image:** `/all_image_files/journal/first-batch/recipe-03-moong-dal.jpg`
   - **Tags:** `L`, `A`

4. **Mixed Dal Tadka** (ID: `mixed-dal-tadka`, Group: `Dals`)
   - **Why:** mixing lentils feeds a wider range of gut bugs than any single dal.
   - **Plant Points:** 6
   - **Ingredients:** ¾ cup mixed dal (moong + toor + masoor) · 2½ cups water · turmeric · 1 chopped tomato · tadka: ghee, cumin, garlic, ginger, curry leaves, hing · coriander.
   - **Steps:**
     1. Rinse.
     2. Pressure-cook the dals + water + turmeric + tomato + salt for 4 whistles.
     3. Whisk smooth, loosen with water, simmer 3 min.
     4. Pour over tadka + coriander.
   - **Hacks:** keep a jar of pre-mixed dals ready so it's one scoop.
   - **Swaps:** any 2–3 dals you have on hand.
   - **Image:** `/all_image_files/journal/first-batch/recipe-04-mixed-dal-tadka.jpg`
   - **Tags:** `L`, `A`

5. **Mild Vegetable Sambar** (ID: `vegetable-sambar`, Group: `Dals`)
   - **Why:** a gentle, non-spicy sambar packs a lentil and several vegetables into one comforting pot — big plant diversity, soft and soothing.
   - **Plant Points:** 9
   - **Ingredients:** ¾ cup toor dal · mixed soft veg (bottle gourd, carrot, pumpkin, beans) · small lime-sized tamarind (soaked) · turmeric · 1 tsp coriander powder + ¼ tsp pepper (mild — skip chilli) · tadka: ghee, mustard, cumin, curry leaves, hing.
   - **Steps:**
     1. Pressure-cook dal + turmeric till soft (4 whistles); whisk smooth.
     2. In a pot, boil the chopped veg till tender.
     3. Add the mashed dal, tamarind water, coriander powder, pepper, salt; simmer 8–10 min.
     4. Pour over tadka.
   - **Hacks:** use whatever soft vegetables are in the fridge — sambar is the great "clear-out" dish.
   - **Swaps:** ready sambar powder works, but keep it mild.
   - **Image:** `/all_image_files/journal/first-batch/recipe-05-vegetable-sambar.jpg`
   - **Tags:** `L`, `S`, `A`

6. **Moong Dal Khichdi** (ID: `moong-dal-khichdi`, Group: `Khichdi & One-Pot`)
   - **Why:** rice + moong dal cooked soft together is the single most soothing, complete, easy-to-digest meal — the dish to lean on any day your stomach wants calm.
   - **Plant Points:** 5
   - **Ingredients:** ¾ cup Red Matta rice · ½ cup moong dal · 4 cups water · turmeric · tadka: ghee, cumin, ginger, curry leaves, hing.
   - **Steps:**
     1. Rinse rice + dal together.
     2. Pressure-cook with water + turmeric + salt for 5 whistles — you want it soft and porridge-like.
     3. Mash lightly, loosen with hot water.
     4. Pour over the ghee tadka.
   - **Hacks:** add a fistful of chopped carrot/bottle gourd before cooking to turn it into a full meal.
   - **Swaps:** foxtail millet instead of rice for a gentle millet version (see Millet Guide).
   - **Image:** `/all_image_files/journal/first-batch/recipe-06-moong-dal-khichdi.jpg`
   - **Tags:** `G`, `L`, `A`

7. **Vegetable Red Matta Khichdi** (ID: `vegetable-khichdi`, Group: `Khichdi & One-Pot`)
   - **Why:** one pot, one flame, a whole balanced plate — grain + lentil + vegetables together. Maximum nutrition, minimum effort and washing up.
   - **Plant Points:** 9
   - **Ingredients:** ¾ cup Red Matta rice · ½ cup moong dal · mixed veg (carrot, beans, peas, pumpkin) · turmeric · 4½ cups water · tadka: ghee, cumin, ginger, garlic, curry leaves, hing.
   - **Steps:**
     1. Rinse rice + dal; soak 20 min.
     2. In the cooker, do the tadka, add veg, sauté 1 min.
     3. Add rice, dal, water, turmeric, salt.
     4. Pressure-cook 5 whistles. Serve warm.
   - **Hacks:** perfect recipe for freezing leftover portions.
   - **Swaps:** try it with brown rice.
   - **Image:** `/all_image_files/journal/first-batch/recipe-07-vegetable-red-matta-khichdi.jpg`
   - **Tags:** `G`, `L`, `S`

8. **Red Rice Idli** (ID: `red-rice-idli`, Group: `Fermented & Curd-Based`)
   - **Why:** steaming a naturally fermented batter makes the nutrients hyper-available and creates a soft, pillowy treat that digests like a dream.
   - **Plant Points:** 2
   - **Ingredients:** 3 parts Red Matta rice · 1 part urad dal · fenugreek (methi) seeds (½ tsp) · water · salt · ghee to grease.
   - **Steps:**
     1. Soak rice and dal (+ methi) separately for 5 hr.
     2. Grind dal fluffy; grind rice coarse. Mix with salt.
     3. Ferment in a warm spot 8–12 hr until doubled.
     4. Steam in greased idli plates for 10–12 min.
   - **Hacks:** use ice-cold water while grinding so the mixer blade doesn't heat up and kill the wild yeasts.
   - **Swaps:** use little millet instead of red rice for millet idli.
   - **Image:** `/all_image_files/journal/first-batch/recipe-08-red-rice-idli.jpg`
   - **Tags:** `G`, `A`

9. **Homemade Set Curd (Dahi)** (ID: `set-curd`, Group: `Fermented & Curd-Based`)
   - **Why:** homemade curd is packed with fresh, active lactobacillus strains — a living probiotic layer that resets stomach acidity.
   - **Plant Points:** 1
   - **Ingredients:** 500ml milk (A2 preferred) · 1 tsp active curd starter.
   - **Steps:**
     1. Boil milk and let it cool until it is finger-warm (around 40°C).
     2. Stir in the starter curd thoroughly.
     3. Pour into a clay pot or glass jar; keep covered.
     4. Let it sit undisturbed in a warm spot for 6–8 hours until set.
   - **Hacks:** on cold days, wrap the warm jar in a clean kitchen towel and place it inside a switched-off oven.
   - **Swaps:** use coconut milk + probiotic capsule for vegan curd.
   - **Image:** `/all_image_files/journal/first-batch/recipe-09-homemade-set-curd.jpg`
   - **Tags:** `F`

10. **Simple Spiced Buttermilk (Chaas)** (ID: `spiced-buttermilk`, Group: `Fermented & Curd-Based`)
    - **Why:** thinned curd whipped with warming carminative spices is the ultimate post-meal digestif, instantly cooling gut irritation.
    - **Plant Points:** 4
    - **Ingredients:** ½ cup set curd · 1.5 cups water · ¼ tsp roasted cumin powder · pinch of black salt · 4 curry leaves · coriander.
    - **Steps:**
      1. Whisk curd and water together until smooth and frothy.
      2. Whisk in ginger juice, roasted cumin, and black salt.
      3. Stir in chopped curry leaves and fresh coriander.
      4. Drink cool after lunch.
    - **Hacks:** crush the curry leaves between your palms before adding to release their digestive essential oils.
    - **Swaps:** add a pinch of mint powder for a cooling kick.
    - **Image:** `/all_image_files/journal/first-batch/recipe-10-simple-spiced-buttermilk.jpg`
    - **Tags:** `F`, `S`

11. **Beetroot Raita** (ID: `beetroot-raita`, Group: `Fermented & Curd-Based`)
    - **Why:** sweet beets provide the raw polyphenols that feed beneficial Bifidobacteria, wrapped in a creamy, probiotic curd blanket.
    - **Plant Points:** 6
    - **Ingredients:** 1 cup set curd · ½ cup grated beetroot (steamed or raw) · ¼ tsp roasted cumin · salt · tadka: ½ tsp ghee, mustard seeds, curry leaves.
    - **Steps:**
      1. Whisk curd smooth with a pinch of salt.
      2. Stir in the grated beetroot and cumin powder.
      3. Heat ghee, crack mustard seeds, add curry leaves.
      4. Pour tadka over the raita and serve.
    - **Hacks:** steam the grated beetroot for 3 min if you prefer a softer texture that blends seamlessly into the curd.
    - **Swaps:** grated cucumber or bottle gourd works beautifully.
    - **Image:** `/all_image_files/journal/first-batch/recipe-11-beetroot-raita.jpg`
    - **Tags:** `F`, `S`, `A`

12. **Lauki (Bottle Gourd) Sabzi** (ID: `lauki-sabzi`, Group: `Gentle Vegetables`)
    - **Why:** lauki is over 95% water and extremely low in complex fibers, making it the gentlest vegetable for a healing or inflamed gut.
    - **Plant Points:** 4
    - **Ingredients:** 2 cups cubed bottle gourd · tadka: 1 tbsp oil, mustard, cumin, hing, ginger · ½ onion · 1 tomato · ¼ tsp turmeric · ½ tsp salt · coriander.
    - **Steps:**
      1. Prepare the tadka on medium heat.
      2. Add chopped onion, sauté till soft; add tomato, cook till mushy.
      3. Add turmeric, salt, and bottle gourd cubes; mix.
      4. Cover and cook on low for 10–12 min (cooks in its own water).
    - **Hacks:** do not add extra water — let the gourd sweat under a tight lid to preserve its natural sweet hydration.
    - **Swaps:** ridge gourd (turai) or ash gourd works identically.
    - **Image:** `/all_image_files/journal/first-batch/recipe-12-lauki-sabzi.jpg`
    - **Tags:** `G`

13. **Cabbage-Carrot Thoran** (ID: `cabbage-carrot-thoran`, Group: `Gentle Vegetables`)
    - **Why:** steamed cabbage and carrot seasoned with fresh coconut delivers gentle bulk and cellular repair compounds (glutamine).
    - **Plant Points:** 6
    - **Ingredients:** 1 cup shredded cabbage · ½ cup grated carrot · 3 tbsp grated fresh coconut · tadka: oil, mustard, curry leaves, ginger, 1 dry red chilli · salt.
    - **Steps:**
      1. Make the tadka in a pan.
      2. Add cabbage and carrot; sprinkle a little water.
      3. Cover and steam on low for 5–6 min (keep it slightly crunchy).
      4. Stir in fresh coconut and salt; turn off heat.
    - **Hacks:** add the grated coconut only at the very end to keep its delicate, gut-healthy fats raw and unheated.
    - **Swaps:** finely chopped beans make a classic beans thoran.
    - **Image:** `/all_image_files/journal/first-batch/recipe-13-cabbage-carrot-thoran.jpg`
    - **Tags:** `G`, `S`

14. **Simple Beans Poriyal** (ID: `beans-poriyal`, Group: `Gentle Vegetables`)
    - **Why:** French beans are high in soluble fiber, which feeds the good guys while keeping bowel motility smooth.
    - **Plant Points:** 5
    - **Ingredients:** 1.5 cups finely chopped French beans · tadka: oil, mustard, urad dal (1 tsp), curry leaves, hing · 2 tbsp grated coconut · salt.
    - **Steps:**
      1. Make the tadka, letting the urad dal turn golden-brown.
      2. Add the chopped beans and toss. Splash water.
      3. Cover and cook on low for 6–8 min until tender.
      4. Stir in fresh grated coconut and salt. Turn off.
    - **Hacks:** chop the beans as finely as possible (tiny rounds) — it reduces the cooking time and makes them much easier to digest.
    - **Swaps:** broad beans (sem) or ivy gourd (tindora) slices.
    - **Image:** `/all_image_files/journal/first-batch/recipe-14-simple-beans-poriyal.jpg`
    - **Tags:** `G`

15. **Earthy Beetroot Sabzi** (ID: `earthy-beetroot-sabzi`, Group: `Gentle Vegetables`)
    - **Why:** beetroot contains betalain pigments that act as powerful anti-inflammatory shields for the colon wall.
    - **Plant Points:** 5
    - **Ingredients:** 1.5 cups chopped boiled beetroot · tadka: oil, mustard, cumin, ginger, curry leaves · ½ onion · salt · grated coconut to finish.
    - **Steps:**
      1. Make the tadka in a pan.
      2. Sauté chopped onion till soft.
      3. Add the boiled beetroot cubes and toss to warm through.
      4. Add salt and fresh coconut; mix well and serve.
    - **Hacks:** boil the beetroot with skin on first — it locks in the sweet juices and makes peeling and cubing a breeze.
      - **Swaps:** carrots can be used alongside beets for a sweet combo.
      - **Image:** `/all_image_files/journal/first-batch/recipe-15-earthy-beetroot-sabzi.jpg`
      - **Tags:** `G`, `S`

16. **Clear Moong Dal Soup** (ID: `clear-moong-soup`, Group: `Soups & Rasam`)
    - **Why:** a watery, warm extract of yellow moong dal that provides instant, bioavailable amino acids without overloading a weak digestion.
    - **Plant Points:** 3
    - **Ingredients:** ¼ cup split yellow moong dal · 3 cups water · pinch turmeric · tadka: ½ tsp ghee, cumin seeds, grated ginger · pinch black pepper · salt.
    - **Steps:**
      1. Pressure-cook dal + water + turmeric till completely soft (4 whistles).
      2. Whisk thoroughly and strain through a sieve to get a clear broth.
      3. Heat ghee, crack cumin, add ginger. Pour into the clear broth.
      4. Simmer 1 min; finish with black pepper and salt.
    - **Hacks:** use this clear broth as the liquid base for cooking rice or millets to pack in hidden, easy protein.
    - **Swaps:** add a leaf of fresh spinach to boil with the dal.
    - **Image:** `/all_image_files/journal/first-batch/recipe-16-clear-moong-dal-soup.jpg`
    - **Tags:** `L`, `A`

17. **Tomato-Pepper Rasam** (ID: `tomato-pepper-rasam`, Group: `Soups & Rasam`)
    - **Why:** a tangy, peppery South Indian herbal soup that stimulates digestive enzymes (Agni) and cuts through gas.
    - **Plant Points:** 6
    - **Ingredients:** 2 ripe tomatoes · small lime-sized tamarind (soaked) · 2 cups water · pepper-cumin powder (1 tsp) · turmeric · tadka: ghee, mustard, garlic, curry leaves, hing · coriander.
    - **Steps:**
      1. Mash tomatoes with tamarind water, turmeric, and salt.
      2. Simmer this mixture on low until the raw smell disappears.
      3. Add pepper-cumin powder and water; bring to a gentle bubble.
      4. Pour in the garlicky tadka; top with fresh coriander.
    - **Hacks:** do not boil rasam after adding pepper-cumin powder — it should only froth up once, then be taken off the flame immediately.
    - **Swaps:** add boiled dal water for a heavier, protein-rich rasam.
    - **Image:** `/all_image_files/journal/first-batch/recipe-17-tomato-pepper-rasam.jpg`
    - **Tags:** `S`, `A`

18. **Ragi Ambali Porridge** (ID: `ragi-ambali`, Group: `Breakfast & Porridge`)
    - **Why:** fermented finger-millet drink is a traditional south Indian powerhouse — high in calcium, cooling, and packed with wild yeast cultures.
    - **Plant Points:** 3
    - **Ingredients:** 3 tbsp ragi flour · 1.5 cups water · ¼ cup buttermilk · chopped onion · curry leaves · salt.
    - **Steps:**
      1. Whisk ragi in cold water; cook on low 5–6 min till glossy and thick.
      2. Let it cool completely.
      3. Stir in buttermilk, salt, onion, and curry leaves.
      4. Serve cool.
    - **Hacks:** cook it the night before and let it ferment at room temp overnight, then mix buttermilk in the morning.
    - **Swaps:** use jowar (sorghum) flour for a different grain profile.
    - **Image:** `/all_image_files/journal/first-batch/recipe-18-ragi-ambali.jpg`
    - **Tags:** `G`, `A`

19. **Quick Moong Pesarattu** (ID: `quick-moong-pesarattu`, Group: `Breakfast & Porridge`)
    - **Why:** zero-ferment high protein crepe made from whole green mung beans — ideal when you need a quick, filling meal.
    - **Plant Points:** 4
    - **Ingredients:** 1 cup whole green moong (soaked) · ginger · 1 green chilli · salt · chopped onion · oil.
    - **Steps:**
      1. Blend soaked moong + ginger + chilli + salt + water to a batter.
      2. Spread thin spirals on a hot tawa.
      3. Drizzle oil; top with chopped onion.
      4. Cook till golden-crisp on both sides.
    - **Hacks:** soak the mung beans in hot water to cut the soaking time down to just 2 hours if you're in a rush.
    - **Swaps:** mix in a handful of soaked raw rice while blending for a crispy crepe.
    - **Image:** `/all_image_files/journal/first-batch/recipe-19-quick-moong-pesarattu.jpg`
    - **Tags:** `L`, `A`

20. **Mint-Coriander Chutney** (ID: `mint-coriander-chutney`, Group: `Chutneys & Podis`)
    - **Why:** fresh green herbs are concentrated polyphenol powerhouses that help digest heavy grains and proteins.
    - **Plant Points:** 6
    - **Ingredients:** 1 cup fresh coriander leaves · ½ cup mint leaves · 1" ginger · 1 green chilli · 2 tbsp roasted chana dal · juice of ½ lemon · salt · water.
    - **Steps:**
      1. Add all ingredients to a small blender jar.
      2. Blend with a splash of water to a smooth, thick green paste.
      3. Taste and adjust lemon/salt.
      4. Eat fresh with idlis, pesarattu, or dal-rice.
    - **Hacks:** add a small pinch of sugar or a date to balance the tang and protect the bright green herb color.
    - **Swaps:** add a tablespoon of fresh grated coconut for a creamier texture.
    - **Image:** `/all_image_files/journal/first-batch/recipe-20-mint-coriander-chutney.jpg`
    - **Tags:** `G`, `S`

21. **Warm CCF Tonic** (ID: `warm-ccf-tonic`, Group: `Gut Tonics`)
    - **Why:** cumin, coriander, and fennel seeds steeped together make the classic Ayurvedic digestive tea that instantly relieves gas and cramping.
    - **Plant Points:** 3
    - **Ingredients:** ½ tsp cumin seeds · ½ tsp coriander seeds · ½ tsp fennel seeds · 2.5 cups water.
    - **Steps:**
      1. Boil water in a pot. Add all three seeds.
      2. Simmer on low for 5 minutes, then turn off heat.
      3. Cover and let steep for 5 minutes.
      4. Strain and sip warm throughout the day.
    - **Hacks:** lightly crush the seeds in a mortar-pestle before boiling to crack the husks and extract maximum oils.
    - **Swaps:** add a slice of fresh ginger on a cold or rainy day.
    - **Image:** `/all_image_files/journal/first-batch/recipe-21-warm-ccf-tonic.jpg`
    - **Tags:** `S`, `A`

---

## 7. Journal: Second Batch Collection (`app/journal/second-batch/page.tsx`)

### Navigation & Header
- **Navigation:** "Back to Journal Hub" button (points to `/journal`).
- **Tag:** Second Batch · Global Comfort
- **Title:** Second Batch
- **Subtitle:** Comfort food, engineered for your microbiome. High protein, high fibre, always fermented.
- **Collection Tabs:** The Recipes, The Standards.

### The Standards
- **Engineered by the Science:** Every dish is built to be high-protein, high-fibre, plant-diverse (chasing 30 different plants a week), and polyphenol-rich.
- **Every Dish is Alive:** Each item carries a live ferment or prebiotic layer made in-house—the same cultures, krauts, and kanjis that power BATCH.
- **The Hard Rules:** No refined sugar. No wheat / maida (gluten-free). No fluid milk. No ultra-processed ingredients. Vegetarian + egg only.
- **Food + Drink, Together:** Every dish is crafted to match its perfect Product Lab drink pairing for a complete prebiotic and probiotic experience.

---

### Second Batch Core 12 Recipes (Full Content)

1. **The 30-Plant Bowl** (ID: `thirty-plant-bowl`, Category: `Superfood Salads`)
   - **Badges:** 20+ Plants, High-Protein, High-Fibre, Fermented, Gluten-Free, No Added Sugar, Vegan
   - **Description:** Our signature — seven slow-cooked beans and legumes over a rainbow of fresh and roasted vegetables, greens, herbs, five seeds and pomegranate, finished with a live kanji-kefir dressing. One bowl, twenty-plus different plants, serious plant protein and fibre — the most microbiome-loaded meal in the city, and it actually tastes incredible.
   - **Pairs With:** BATCH · Kanji
   - **Price:** ₹260
   - **Image:** `/all_image_files/kitchen/Bowl_of_beans_and_vegetables_202607060118.jpeg`
   - **Recipe Yield:** ~400g. ~20+ plant points; high plant protein + fibre.
   - **Recipe Ingredients:** Legume base (soak overnight, boil each separately, dry well — dryness = freshness): kabuli chana, rajma, lobia, whole moong, black chana, peanuts, sweet corn (~2 tbsp each) · Fresh + roasted veg: carrot, cabbage, capsicum, cherry tomato, beetroot, cucumber (only to order), plus roasted pumpkin/sweet potato · Greens/herbs: lettuce/spinach, coriander, mint · Seeds: sesame, flax, pumpkin, sunflower, chia (toasted) · Pomegranate · Dressing: kanji brine + lemon + cold-pressed oil + cultured cashew + roasted cumin + pepper + salt
   - **Recipe Steps:**
     1. Soak + boil each legume, dry thoroughly, chill.
     2. Roast the roastable veg; toast seeds.
     3. To order: bed of greens, scoop legumes, pile fresh + roasted veg, pomegranate, seeds; dress with the kanji-kefir dressing; toss.
   - **Recipe Notes:** Storage: dried legumes + roasted veg hold 1 day chilled; dress and add cucumber only at serving.

2. **Sprout & Seed Superfood Salad** (ID: `sprout-seed-salad`, Category: `Superfood Salads`)
   - **Badges:** High-Protein, Plant-Diverse, Fermented, Polyphenol-Rich, Gluten-Free, No Added Sugar, Vegan
   - **Description:** Living sprouts and five toasted seeds tossed with crunchy rainbow veg, jewel-bright pomegranate, fresh herbs and house-fermented pickled vegetables in a bright lemon dressing. Light, alive and quietly protein-packed.
   - **Pairs With:** ALIVE · Lime
   - **Price:** ₹210
   - **Image:** `/all_image_files/kitchen/Bowl_of_sprouts_with_vegetables_202607060118.jpeg`
   - **Recipe Yield:** ~320g
   - **Recipe Ingredients:** 1 cup mixed sprouts (steamed 3–4 min) · cucumber, carrot, red cabbage, cherry tomato, pomegranate · 5 toasted seeds · house pickled veg · mint + coriander · lemon dressing
   - **Recipe Steps:**
     1. Toss all ingredients to order, top with seeds + pickled vegetables.
   - **Recipe Notes:** Storage: keep components separate/chilled; dress at serving.

3. **Ferment-Crust Deep-Dish Pizza** (ID: `ferment-crust-pizza`, Category: `Pizza`)
   - **Badges:** Fermented, High-Fibre, Plant-Diverse, Gluten-Free, No Added Sugar, Veg
   - **Description:** A slow, naturally fermented gluten-free deep-dish base with real sourdough-style tang, a no-sugar slow-roasted tomato sauce, a generous load of colourful vegetables and mushrooms, cultured cheese, and a finish of house-pickled onion and chilli. Deep-dish indulgence, built to feed your good bacteria.
   - **Pairs With:** ALIVE · Ginger
   - **Price:** ₹360
   - **Image:** `/all_image_files/kitchen/Pizza_in_cast-iron_pan_202607060118.jpeg`
   - **Recipe Yield:** 1 personal deep-dish
   - **Recipe Ingredients:** GF ferment crust: 1 cup GF flour blend (jowar + foxtail + rice) + 2 tbsp psyllium + ½ tsp yeast (or curd) + water + salt + oil · Sauce (no sugar): slow-roasted tomato + garlic + herbs, blended · Load: capsicum, onion, mushroom, sweet corn, olives, cultured cheese · Finish: house pickled onion/chilli
   - **Recipe Steps:**
     1. Pre-bake risen base at 220°C for 8–10 min (or in a covered tawa).
     2. Spread sauce, add toppings, and top with cheese.
     3. Bake for 10–12 min until cheese is melted and crust is crisp; finish with fresh pickled onions/chilli.
   - **Recipe Notes:** Storage: fermented dough holds 2 days cold; pre-baked bases hold 2 days.

4. **Paneer Tikka Superfood Pizza** (ID: `paneer-tikka-pizza`, Category: `Pizza`)
   - **Badges:** High-Protein, Fermented, Plant-Diverse, Gluten-Free, No Added Sugar, Veg
   - **Description:** Smoky curd-marinated paneer tikka over the fermented gluten-free base, loaded with capsicum, onion and greens, a no-sugar tomato-masala sauce, mint-coriander drizzle and pickled onion. India's favourite flavour, engineered clean and protein-rich.
   - **Pairs With:** JOSH · Masala Cola
   - **Price:** ₹340
   - **Image:** `/all_image_files/kitchen/Gluten-free_pizza_with_paneer_tikka_202607060118.jpeg`
   - **Recipe Yield:** 1 pizza
   - **Recipe Ingredients:** Ferment crust (same as Deep-Dish Pizza) · Tomato-masala (no-sugar) sauce · Paneer tikka cubes (paneer marinated in curd + turmeric + mild tikka spices + lemon, seared/grilled till charred) · Load: capsicum, onion, greens, cheese · Finish: mint-coriander drizzle + pickled onion
   - **Recipe Steps:**
     1. Cube paneer, marinate in curd, turmeric, mild tikka spices, and lemon. Sear or grill until charred.
     2. Prepare the ferment crust and spread the tomato-masala sauce.
     3. Add paneer tikka, capsicum, onion, greens, and cheese.
     4. Bake, and finish with a fresh mint-coriander drizzle and pickled onion.
   - **Recipe Notes:** Storage: grill paneer fresh; keep marinade/base prepped.

5. **Kraut & Cheese Melt** (ID: `kraut-cheese-melt`, Category: `Toasties & Sandwiches`)
   - **Badges:** Fermented, High-Fibre, Gluten-Free, No Added Sugar, Veg
   - **Description:** Melty cultured cheese and our house turmeric-kraut pressed golden in fermented gluten-free bread with fresh greens. The perfect pairing — molten cheese and live, sour crunch.
   - **Pairs With:** BATCH · Jamun-Lime Kombucha
   - **Price:** ₹210
   - **Image:** `/all_image_files/kitchen/Grilled_sandwich_with_cheese_pull_202607060118.jpeg`
   - **Recipe Yield:** 1 melt
   - **Recipe Ingredients:** 2 slices fermented GF bread · Cultured cheese · ¼ cup house turmeric kraut (drained) · Fresh greens · Ghee for the press
   - **Recipe Steps:**
     1. Layer cheese, kraut, and fresh greens between slices of fermented GF bread.
     2. Close and press-toast in ghee till golden and molten.
     3. Note: Add kraut after grilling starts so its live cultures aren't fully cooked out.
   - **Recipe Notes:** Storage: kraut keeps weeks; grill sandwich to order.

6. **Smashed Chickpea & Avocado Sandwich** (ID: `smashed-chickpea-sandwich`, Category: `Toasties & Sandwiches`)
   - **Badges:** High-Protein, High-Fibre, Fermented, Gluten-Free, No Added Sugar, Vegan
   - **Description:** Creamy smashed chickpeas and avocado bound with cultured cashew, fresh herbs and house-pickled carrot in soft gluten-free bread. Filling, protein-dense and genuinely crave-able.
   - **Pairs With:** ALIVE · Lime
   - **Price:** ₹220
   - **Image:** `/all_image_files/kitchen/Gluten-free_sandwich_with_chickpea_202607060118.jpeg`
   - **Recipe Yield:** 1 sandwich
   - **Recipe Ingredients:** ¾ cup cooked chickpeas + ½ avocado (smashed) · 2 tbsp cultured cashew cream · Lemon + herbs + salt · House pickled carrot · 2 slices GF bread
   - **Recipe Steps:**
     1. Smash the chickpeas and avocado, and bind them with cultured cashew cream, lemon, herbs, and salt.
     2. Spread thick on bread, top with pickled carrot and greens.
     3. Close sandwich (toasting is optional).
   - **Recipe Notes:** Storage: filling holds 1 day chilled (lemon keeps avocado fresh); assemble to order.

7. **Cultured Alfredo Pasta** (ID: `cultured-alfredo-pasta`, Category: `Pasta`)
   - **Badges:** High-Protein, High-Fibre, Fermented, Gluten-Free, No Added Sugar, Veg
   - **Description:** Legume pasta in a silky alfredo of overnight-cultured cashew cream (all the richness, zero dairy cream or maida), loaded with mushrooms, greens and roasted garlic. Comfort-food creamy, secretly full of fibre and live cultures.
   - **Pairs With:** BATCH · Coconut Water Kefir
   - **Price:** ₹300
   - **Image:** `/all_image_files/kitchen/Legume_pasta_with_mushrooms_spinach_202607060118.jpeg`
   - **Recipe Yield:** 1 plate
   - **Recipe Ingredients:** 80g legume/GF pasta · ¾ cup cultured cashew cream loosened with pasta water · Sautéed mushroom + garlic + spinach · Pepper · Nutritional yeast/cheese · Herbs
   - **Recipe Steps:**
     1. Boil pasta al dente.
     2. Sauté mushrooms, garlic, and spinach.
     3. Fold in cultured cashew cream and a splash of pasta water to create a silky sauce. Don't boil hard to keep it cultured. Toss pasta and finish with pepper and herbs.
   - **Recipe Notes:** Storage: cashew cream holds 3 days chilled; cook pasta to order.

8. **Masala Marinara Protein Pasta** (ID: `masala-marinara-pasta`, Category: `Pasta`)
   - **Badges:** High-Protein, High-Fibre, Plant-Diverse, Gluten-Free, No Added Sugar, Veg
   - **Description:** Legume pasta in a rich, slow-cooked no-sugar tomato-masala sauce with olives, paneer and a spoon of house-fermented chilli, finished with fresh basil and coriander. Bold, saucy and protein-loaded.
   - **Pairs With:** JOSH · Kala Khatta
   - **Price:** ₹290
   - **Image:** `/all_image_files/kitchen/Bowl_of_pasta_in_sauce_202607060118.jpeg`
   - **Recipe Yield:** 1 plate
   - **Recipe Ingredients:** 80g legume pasta · 1 cup no-sugar tomato-masala sauce (slow-cooked tomato + onion + garlic + mild spices) · Olives · Cubed paneer · 1 tsp fermented chilli · Basil + coriander
   - **Recipe Steps:**
     1. Boil pasta according to package directions.
     2. Warm the tomato-masala sauce with paneer, olives, and fermented chilli.
     3. Toss the pasta through the sauce and finish with fresh basil and coriander.
   - **Recipe Notes:** Storage: sauce holds 3 days chilled or can be frozen; assemble to order.

9. **Loaded Bean Minestrone** (ID: `loaded-bean-minestrone`, Category: `Soups`)
   - **Badges:** High-Fibre, High-Protein, Plant-Diverse, Fermented, Gluten-Free, No Added Sugar, Veg
   - **Description:** A thick, hearty five-bean and vegetable minestrone finished with a swirl of cultured curd and toasted seeds. A whole meal in a bowl — enormous fibre, real plant variety, deep comfort.
   - **Pairs With:** STEEP · Golden Turmeric
   - **Price:** ₹200
   - **Image:** `/all_image_files/kitchen/Bowl_of_five-bean_minestrone_202607060118.jpeg`
   - **Recipe Yield:** 1 large bowl
   - **Recipe Ingredients:** 1 cup mixed cooked beans (rajma, kabuli, moong, lobia, black chana) · Diced carrot, beans, tomato, zucchini, spinach · Garlic · Herbs · GF pasta bits (optional) · Cultured curd swirl · Toasted seeds
   - **Recipe Steps:**
     1. Sauté garlic and vegetables. Add tomato, cooked beans, and water. Simmer for 15–20 minutes until hearty.
     2. Season with salt and pepper, then wilt the spinach into the soup.
     3. Serve hot with a swirl of cultured curd and toasted seeds.
   - **Recipe Notes:** Storage: soup holds 3 days chilled or can be frozen; swirl curd fresh at serving.

10. **Roasted Tomato–Pepper Rasam Soup** (ID: `roasted-tomato-soup`, Category: `Soups`)
    - **Badges:** Polyphenol-Rich, Plant-Diverse, Gluten-Free, No Added Sugar, Vegan
    - **Description:** Fire-roasted tomatoes and red peppers blended with warming rasam spices and roasted garlic — a South-Indian-meets-comfort polyphenol powerhouse, served with fermented gluten-free toast soldiers.
    - **Pairs With:** STEEP · Gut Chai
    - **Price:** ₹190
    - **Image:** `/all_image_files/kitchen/Roasted_tomato-pepper_soup_with_toast_202607060118.jpeg`
    - **Recipe Yield:** 1 bowl
    - **Recipe Ingredients:** 4 tomatoes + 1 red pepper + 4 garlic (roasted) · Rasam spices (pepper, cumin, coriander, curry leaf, tamarind bit) · Coriander · Fermented GF toast soldiers
    - **Recipe Steps:**
      1. Roast the tomatoes, red pepper, and garlic till charred.
      2. Blend with a little water, rasam spices, and the tamarind. Simmer for 8–10 minutes.
      3. Season and serve warm with fermented GF toast soldiers on the side.
    - **Recipe Notes:** Storage: soup holds 3 days chilled or can be frozen.

11. **Ferment Shakshuka** (ID: `ferment-shakshuka`, Category: `Egg Specials`)
    - **Badges:** High-Protein, Polyphenol-Rich, Fermented, Gluten-Free, No Added Sugar, Contains Egg
    - **Description:** Eggs gently poached in a rich, smoky fermented tomato-and-pepper base with herbs and seeds, served bubbling with fermented gluten-free bread to mop it all up. Protein-packed, deeply savoury, alive.
    - **Pairs With:** JOSH · Masala Cola
    - **Price:** ₹250
    - **Image:** `/all_image_files/kitchen/Pan_of_sauce_with_eggs_202607060118.jpeg`
    - **Recipe Yield:** 1 pan (1–2 eggs)
    - **Recipe Ingredients:** 1 cup fermented tomato-chilli base + fresh tomato + onion + capsicum + garlic · Mild spices · 1–2 eggs · Seeds · Herbs · Fermented GF bread
    - **Recipe Steps:**
      1. Simmer the fermented and fresh tomato-pepper base to a thick sauce.
      2. Make wells in the sauce, crack in the eggs, cover, and cook until whites are set but yolks remain soft.
      3. Top with seeds and herbs. Serve with warm fermented GF bread.
    - **Recipe Notes:** Storage: base holds 3 days chilled; poach eggs fresh to order.

12. **PULP Smoothie Bowl + GRIT Crumble** (ID: `smoothie-bowl-grit`, Category: `Smoothie Bowls`)
    - **Badges:** High-Fibre, Plant-Diverse, No Added Sugar, Gluten-Free, Veg
    - **Description:** A thick PULP smoothie served in a bowl, crowned with our GRIT whole-food crumble, fresh fruit and seeds. Product Lab, on a spoon — cool, creamy and fibre-loaded, sweetened by fruit alone.
    - **Pairs With:** STEEP · Filter Kaapi
    - **Price:** ₹240
    - **Image:** `/all_image_files/kitchen/Smoothie_bowl_with_toppings_202607060118.jpeg`
    - **Recipe Yield:** 1 bowl
    - **Recipe Ingredients:** 1 PULP smoothie base (frozen fruit + vegetable + curd/coconut blended thick, no sugar) · GRIT crumble (broken whole-food bar) · Fresh fruit · Seeds · Coconut
    - **Recipe Steps:**
      1. Blend PULP base thick using minimal liquid and frozen fruit.
      2. Pour into a chilled bowl and top with GRIT crumble, fresh fruit, and seeds in neat rows.
    - **Recipe Notes:** Storage: blend fresh to order; pre-portion and freeze fruit in advance.

---
