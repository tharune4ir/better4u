import rawPlan from "../content/superhuman_plan.json";
import { SuperhumanPlan, DayPlan, Recipe, FoodItem, BodyWorkout, MindActivity } from "./plan-types";

// Cast the imported JSON to our full type
export const plan = rawPlan as unknown as SuperhumanPlan;

export function getPlan(): SuperhumanPlan {
  return plan;
}

export function getAllDays(): DayPlan[] {
  return plan.weeks.flatMap(week => week.days);
}

export function getDayByNumber(dayNumber: number): DayPlan | undefined {
  return getAllDays().find(d => d.day === dayNumber);
}

export function getDayByDate(isoDate: string): DayPlan | undefined {
  return getAllDays().find(d => d.date === isoDate);
}

export function getTodayDay(): DayPlan {
  const allDays = getAllDays();
  const startDate = new Date(plan.meta.start_date);
  const today = new Date();
  
  // Normalize both dates to midnight local time for an accurate day difference
  startDate.setHours(0, 0, 0, 0);
  const todayNormalized = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  const diffTime = todayNormalized.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  const dayNumber = diffDays + 1; // Day 1 is the start_date
  
  if (dayNumber < 1) {
    return allDays[0]; // Not started yet, return Day 1
  }
  
  if (dayNumber > allDays.length) {
    return allDays[allDays.length - 1]; // Past the plan, return last day
  }
  
  return allDays[dayNumber - 1];
}

export function getWeek(weekNumber: number) {
  return plan.weeks.find(w => w.week === weekNumber);
}

export function getPhases() {
  const phases = new Set<string>();
  plan.weeks.forEach(w => phases.add(w.phase_name));
  return Array.from(phases);
}

export function resolveRecipe(id: string): Recipe | undefined {
  // Check lunches
  let found = plan.recipes.lunches.find(r => r.id === id);
  if (found) return found;
  
  // Check dinners
  found = plan.recipes.dinners.find(r => r.id === id);
  if (found) return found;

  // Check bases
  found = plan.recipes.bases.find(r => r.id === id);
  return found;
}

export interface FlattenedFoodItem extends FoodItem {
  id: string;
  category: string;
}

export function getFoodUniverse(): FlattenedFoodItem[] {
  const categories = plan.food_universe.categories as unknown as Record<string, FoodItem[]>;
  const result: FlattenedFoodItem[] = [];
  
  for (const [category, items] of Object.entries(categories)) {
    for (const item of items) {
      result.push({
        ...item,
        category,
        id: item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      });
    }
  }
  return result;
}

export function getBody(dayNumber: number): BodyWorkout | undefined {
  const day = getDayByNumber(dayNumber);
  return day?.ideal.body;
}

export function getMind(dayNumber: number): MindActivity | undefined {
  const day = getDayByNumber(dayNumber);
  return day?.ideal.mind;
}
