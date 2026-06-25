export interface PlanMeta {
  title: string;
  owner: string;
  location: string;
  start_date: string;
  block: string;
  eating_window: string;
  anchors: string[];
  non_negotiables_daily: string[];
  version: string;
  change_log: { date: string; change: string }[];
  how_dynamic_works: string;
  d_day?: { date: string; name: string; label: string; };
  total_days?: number;
  block1_end?: { day: number; date: string; label: string; };
}

export interface FoodItem {
  name: string;
  local_name?: string;
  role: string;
  source: string;
}

export interface FoodUniverseCategories {
  grains_millets: FoodItem[];
  pulses_protein: FoodItem[];
  vegetables_cooked_only: FoodItem[];
  fruits_seasonal_moderate: FoodItem[];
  nuts_seeds_core: FoodItem[];
  fats: FoodItem[];
  spices_herbs_polyphenols: FoodItem[];
  beverages_teas: FoodItem[];
}

export interface FoodUniverse {
  count: number;
  categories: FoodUniverseCategories;
}

export interface Recipe {
  id: string;
  name: string;
  kind?: string;
  ingredients: string[];
  steps: string[];
  protein_boost?: string;
  notes?: string;
}

export interface BodyWorkout {
  day_type: string;
  label: string;
  workout: string[];
}

export interface MindActivity {
  id: string;
  prompt: string;
  format?: string;
}

export interface IdealDay {
  eating_window: string;
  on_waking: string;
  psyllium: string;
  fasted_morning_water: string;
  nuts_seeds_core: string;
  meal1: {
    recipe_id: string;
    name: string;
    after?: string;
  };
  fruit: string;
  meal2: {
    recipe_id: string;
    name: string;
    note?: string;
  };
  fermented_target: string;
  supplements: string[];
  body: BodyWorkout;
  daily_addons: string[];
  mind: MindActivity;
  teas_today: string[];
  hydration: string;
  live_ferment?: string;
}

export interface DayPlan {
  day: number;
  date: string;
  weekday: string;
  week: number;
  phase: string;
  ideal: IdealDay;
  logged?: any;
  match_score?: number | null;
  day_notes?: string;
}

export interface WeekPlan {
  week: number;
  phase: string;
  phase_name: string;
  days: DayPlan[];
}

export interface SuperhumanPlan {
  meta: PlanMeta;
  principles: any;
  food_universe: FoodUniverse;
  teas_and_waters: any;
  psyllium: any;
  fermented: { 
    priority: string; 
    ramp: any; 
    live_probiotic: Record<string, {name: string, note: string, gentle: boolean, source?: string}>;
    fermented_cooked_not_live: Record<string, {name: string, note: string}>;
  };
  gut_lining_support: any;
  supplements: { active: any; optional_to_discuss_with_gp: string[] };
  recipes: {
    bases: Recipe[];
    lunches: Recipe[];
    dinners: Recipe[];
    index_ids: any;
  };
  body_program: {
    equipment: string[];
    split: string;
    phases: any;
    workouts_by_phase_and_type: any;
    daily_addons: any;
    milestones_day84: string[];
    joint_smart_rules: string[];
  };
  mind: { activities: MindActivity[] };
  daily_template: any;
  scoring: any;
  environment: any;
  today_day0: any;
  weeks: WeekPlan[];
  vision_board?: {
    title: string;
    kicker: string;
    quote: { text: string; author: string; };
    d_day: { date: string; name: string; label: string; };
    arrival_line: string;
    manifesto: string[];
    affirmations: string[];
    closing: string;
  };
}
