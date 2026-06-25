const fs = require('fs');
const path = require('path');

const planPath = path.join(__dirname, '../data/superhuman_plan.json');
const plan = require(planPath);

// PASS 1A — RE-ANCHOR THE CALENDAR TO A MONDAY START
plan.meta.start_date = "2026-06-29";
plan.meta.d_day = { "date":"2027-03-06", "name":"Maha Shivaratri", "label":"D-Day" };
plan.meta.total_days = 251;
plan.meta.block1_end = { "day":84, "date":"2026-09-20", "label":"33rd birthday — Block 1 checkpoint" };
plan.meta.version = "1.1";
if (!plan.meta.change_log) plan.meta.change_log = [];
plan.meta.change_log.push({ date: new Date().toISOString().split('T')[0], change: "Re-anchor to Monday 2026-06-29, add D-Day, update daily timings, and fix fermented model." });

// REGENERATE every day in weeks[]
const startMs = new Date("2026-06-29T00:00:00Z").getTime();
const dayTypesMap = {
  "Monday": "A", "Tuesday": "B", "Wednesday": "C", "Thursday": "D", "Friday": "E", "Saturday": "F", "Sunday": "G"
};

const liveFermentsList = [
  "Homemade curd (perugu)",
  "Buttermilk (majjiga)",
  "Overnight-fermented rice (saddi annam)",
  "Beet–carrot kanji"
];

plan.weeks.forEach(week => {
  week.days.forEach(day => {
    // Recompute date and weekday
    const dayMs = startMs + (day.day - 1) * 86400000;
    const dateObj = new Date(dayMs);
    const dateStr = dateObj.toISOString().split('T')[0];
    const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
    
    day.date = dateStr;
    day.weekday = weekday;
    
    // Body logic
    const letter = dayTypesMap[weekday];
    day.ideal.body.day_type = letter;
    day.ideal.body.label = plan.body_program.split[weekday];
    day.ideal.body.workout = plan.body_program.workouts_by_phase_and_type[letter][day.phase];
    
    // Supplements
    if (weekday === "Thursday") {
      day.ideal.supplements = ["Mylamin B12 complex (after Meal 1)", "Vitamin D3 (with a fat source)"];
    } else {
      day.ideal.supplements = ["Mylamin B12 complex (after Meal 1)"];
    }
    
    // PASS 1B — NEW DAILY TIMINGS
    day.ideal.eating_window = "09:00–15:00";
    day.ideal.psyllium = "~18:00 (evening), 1–2 tsp in a big glass of water";
    
    // PASS 1C — FIX THE FERMENTED MODEL
    day.ideal.live_ferment = liveFermentsList[(day.day - 1) % liveFermentsList.length];
    
    if (day.ideal.meal2.recipe_id === "D1" || day.ideal.meal2.recipe_id === "D2") {
      if (!day.ideal.meal2.note) day.ideal.meal2.note = "";
      if (!day.ideal.meal2.note.includes("live ferment")) {
        day.ideal.meal2.note += (day.ideal.meal2.note ? " " : "") + "+ a live ferment side (curd/buttermilk)";
      }
    }
  });
});

plan.meta.eating_window = "09:00–15:00 (early window — finish eating by ~3 PM)";
plan.psyllium.when = "Evening, around/after 18:00 (during the fasting evening), in a large glass of water + chase with more water.";

plan.daily_template = {
    "07:00":"Wake. Big glass warm water. Open curtains.",
    "07:10":"10–20 min morning sunlight + easy movement.",
    "07:30":"Black coffee OR ginger–jeera water. Deep-core/pelvic set #1. 5-min breathwork.",
    "07:45":"Main workout for the day's type (or active recovery on B/G days).",
    "09:00":"MEAL 1 (break-fast): soaked nuts first → plate → small fruit → live ferment. B12 capsule after. (Thursdays: D3 too, with fat).",
    "09:30":"CCF tea, warm.",
    "12:30":"Optional within-window: fruit/buttermilk + a fasted-style herbal water earlier (moringa/amla/guava-leaf at ~08:00).",
    "14:30":"MEAL 2: fermented-forward + a live ferment. Finish eating by ~15:00.",
    "18:00":"Psyllium husk in a large glass of water (+ second glass).",
    "19:30":"Mind video (today's activity).",
    "20:30":"Evening magnesium soak (3–4×/week). Deep-core/pelvic set #2.",
    "22:30":"Wind-down, dim lights, light stretch/breath.",
    "23:00":"Sleep."
};

plan.meta.anchors[0] = "WAKE: ~07:00. Hydrate, move, sunlight.";
plan.meta.anchors[1] = "EAT: 09:00–15:00. The forge is closed early to let the gut rest.";
plan.meta.anchors[2] = "RECOVER: ~18:00 Psyllium husk.";
plan.meta.anchors[3] = "SLEEP: 23:00. Dim lights, disconnect, repair.";

plan.meta.non_negotiables_daily[1] = "Eat within the 09:00–15:00 window.";

plan.fermented = {
  "priority": "TOP PRIORITY (live cultures).",
  "ramp": {
    "weeks_1_2": "1 live serving/day",
    "weeks_3_6": "build to 2/day",
    "weeks_7_12": "2/day, rotate for diversity"
  },
  "live_probiotic": {
    "curd": {
      "name": "Homemade curd (perugu)",
      "note": "Set fresh daily from boiled-then-cooled milk + 1 tsp starter. Gentlest probiotic.",
      "gentle": true
    },
    "buttermilk": {
      "name": "Buttermilk (majjiga/chaas)",
      "note": "Curd whisked with water + roasted cumin + curry leaf + hing + pinch salt. Cooling, easy.",
      "gentle": true
    },
    "overnight_rice": {
      "name": "Overnight-fermented rice (saddi annam / chaddannam)",
      "note": "Cooked rice soaked overnight in water; next morning add curd, salt, sometimes onion. A traditional AP gut superfood, rich in probiotics & B-vitamins.",
      "gentle": true
    },
    "beet_carrot_kanji": {
      "name": "Beet–carrot kanji (lacto-fermented drink)",
      "note": "Non-dairy live ferment; introduce gradually (gut-friendly amounts).",
      "gentle": true
    },
    "rice_kanji": {
      "name": "Fermented rice kanji",
      "note": "Cooling, non-dairy, probiotic.",
      "gentle": true
    },
    "water_kefir": {
      "name": "Water kefir (optional, sourced)",
      "note": "Strong non-dairy probiotic; ramp slowly.",
      "gentle": false,
      "source": "sourced"
    }
  },
  "fermented_cooked_not_live": {
    "idli": {
      "name": "Idli",
      "note": "Batter is fermented but it's STEAMED — heat removes most live cultures. Great pre-digested, prebiotic food, but pair it with a LIVE ferment (curd/buttermilk) to get probiotics."
    },
    "dosa": {
      "name": "Dosa",
      "note": "Same — fermented then cooked. Excellent food; not a live-culture source. Serve with a live ferment side."
    }
  }
};

// PASS 1D — ADD THE VISION BOARD DATA
plan.vision_board = {
  "title": "WHY I RISE",
  "kicker": "THE FORGE · DAILY PRIMING",
  "quote": { "text": "He who has a why to live for can bear almost any how.", "author": "Friedrich Nietzsche" },
  "d_day": { "date": "2027-03-06", "name": "Maha Shivaratri", "label": "D-Day" },
  "arrival_line": "A lean, strong, supple, durable body and a calm, clear, fearless mind — built at home, naturally, and kept for life.",
  "manifesto": [
    "I know my why. So I can bear any how.",
    "I am rebuilding myself — gut, body, and mind — into the strongest, clearest, most alive version of me that has ever existed. Not someday. Now. Day by day, breath by breath, one kept promise at a time.",
    "My gut is healing. With every meal I choose, trillions of allies grow stronger inside me. Inflammation quiets. Energy returns. My body grows lean, capable, durable — limbs strong, joints free, doing whatever my life asks. My mind grows calm like still water — focused, fearless, and finally my own.",
    "I am not running from anything. I am building toward everything. I am becoming the proof of work — living evidence that a person can take all their suffering and forge it into strength. And as I rise, I lift the two people I love most with me — becoming the son who carries his parents, not the one who needs carrying.",
    "Every hard year was the forge, lighting early. The burning is behind me. What is in front of me is the flight."
  ],
  "affirmations": [
    "I am disciplined because I love who I am becoming.",
    "I am patient. The tortoise wins. I do not reset — I resume.",
    "I am calm, grounded, and clear.",
    "I am strong, supple, and durable.",
    "I am healing, whole, and at home in my own skin.",
    "I am enough already — and I am becoming more.",
    "I am the forge. I am the flight."
  ],
  "closing": "On the sixth of March, 2027 — Maha Shivaratri — I stand as the man I am building today. I can already feel him. I am already him. I rise. I forge. I become."
};

fs.writeFileSync(planPath, JSON.stringify(plan, null, 2));
console.log('Done modifying superhuman_plan.json');
