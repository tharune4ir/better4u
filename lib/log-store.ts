"use client";

import { useState, useEffect, useCallback } from "react";

// Custom event emitter for cross-component sync within the same window
const storeListeners = new Set<() => void>();
const notifyListeners = () => storeListeners.forEach((l) => l());

// Helper for local storage access
function getItem<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    notifyListeners();
  } catch (error) {
    console.warn(`Error setting localStorage key "${key}":`, error);
  }
}

export function getWeekPlants(isoWeekKey: string): Set<string> {
  const key = `trelis.v1.plants.${isoWeekKey}`;
  const list = getItem<string[]>(key, []);
  return new Set(list);
}

export function togglePlant(isoWeekKey: string, foodId: string): void {
  const plants = getWeekPlants(isoWeekKey);
  if (plants.has(foodId)) {
    plants.delete(foodId);
  } else {
    plants.add(foodId);
  }
  setItem(`trelis.v1.plants.${isoWeekKey}`, Array.from(plants));
}

export function resetWeekPlants(isoWeekKey: string): void {
  setItem(`trelis.v1.plants.${isoWeekKey}`, []);
}

export function getFermentsToday(dateIso: string): number {
  const key = `trelis.v1.ferments.${dateIso}`;
  return getItem<number>(key, 0);
}

export function logFerment(dateIso: string, count: number): void {
  const key = `trelis.v1.ferments.${dateIso}`;
  setItem(key, count);
}

export function useLocalStore() {
  const [tick, setTick] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    const listener = () => setTick((t) => t + 1);
    storeListeners.add(listener);
    return () => {
      storeListeners.delete(listener);
    };
  }, []);

  return {
    isHydrated,
    tick,
    getWeekPlants: useCallback((isoWeekKey: string) => getWeekPlants(isoWeekKey), [tick]),
    togglePlant,
    resetWeekPlants,
    getFermentsToday: useCallback((dateIso: string) => getFermentsToday(dateIso), [tick]),
    logFerment,
  };
}
