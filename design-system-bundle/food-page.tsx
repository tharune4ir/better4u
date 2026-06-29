"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Leaf, 
  Sparkles, 
  Clock, 
  Droplet, 
  Activity, 
  Layers, 
  Check, 
  Plus, 
  ArrowLeft, 
  BookOpen, 
  Heart,
  ChevronRight,
  X,
  AlertTriangle,
  Flame,
  ShieldCheck,
  ShoppingBag,
  ListTodo,
  TrendingUp,
  Apple,
  Search
} from "lucide-react";
import Navbar, { NavTab } from "@/components/Navbar";
import { useLocalStore } from "@/lib/log-store";
import { DIVERSITY_TARGET_PUBLIC } from "@/lib/config";
import { 
  GUT_PRINCIPLES, 
  PLANT_CATEGORIES, 
  FERMENT_CATEGORIES, 
  KITCHEN_FOUNDATIONS,
  PlantCategory,
  FermentCategory,
  KitchenFoundation,
  getPublicFoodUniverse,
  resolvePublicRecipe,
  FlattenedFoodItem
} from "@/lib/food-data";

// "When X, eat Y" Quick-Help Guide
const QUICK_HELP_GUIDE = [
  { condition: "When bloated", solution: "Sip warm Jeera-Ajwain-Saunf water (R12) slowly." },
  { condition: "When tired & gut is weak", solution: "Stick to soft Foxtail-Moong Khichdi (R1) with ghee." },
  { condition: "After heavy meals", solution: "Drink ½ cup of spiced Neer-Mor Buttermilk (R8) to assist digestion." },
  { condition: "For sustained morning energy", solution: "Start the day with Ragi Ambali porridge (R7) or Moong Pesarattu (R2)." }
];

// Pantry & Staples Categories
const PANTRY_STAPLES = [
  {
    category: "Whole Grains & Millets",
    items: ["Foxtail Millet", "Finger Millet (Ragi)", "Sorghum (Jowar) Flour", "Red Rice", "Brown Rice", "Buckwheat (Kuttu)"]
  },
  {
    category: "Dals & Legumes",
    items: ["Split Yellow Moong", "Whole Green Moong", "Toor Dal", "Urad Dal", "Chickpea Flour (Besan)"]
  },
  {
    category: "Starters & Fats",
    items: ["Homemade Curd Starter", "Cold-Pressed Oils", "Pure Cow Ghee", "Flax & Chia Seeds", "Pumpkin Seeds"]
  },
  {
    category: "Prebiotics & Spices",
    items: ["Cumin (Jeera)", "Carom (Ajwain)", "Fennel (Saunf)", "Hing (Asafoetida)", "Ginger & Garlic", "Mustard Seeds"]
  }
];

export default function FoodPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<NavTab>("food");
  
  // Sheet States
  const [activeSheet, setActiveSheet] = useState<string | null>(null);

  // Store and Plan Data
  const { isHydrated, getWeekPlants, togglePlant, resetWeekPlants, getFermentsToday, logFerment } = useLocalStore();
  const foodUniverse = React.useMemo(() => getPublicFoodUniverse(), []);
  
  // Iso week calc
  const getIsoWeek = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
    const week1 = new Date(d.getFullYear(), 0, 4);
    const weekNum = 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    return `${d.getFullYear()}-W${weekNum}`;
  };
  const currentWeekKey = getIsoWeek();
  const checkedPlantsSet = isHydrated ? getWeekPlants(currentWeekKey) : new Set<string>();
  const checkedPlantsCount = checkedPlantsSet.size;

  // 30+ Plants active category state
  const [selectedPlantCategory, setSelectedPlantCategory] = useState<string>("all");
  const [plantSearch, setPlantSearch] = useState("");
  
  // 3-Ferments Logger State (Local state since the user wants daily slots, wait log-store has getFermentsToday)
  // Let's use local state for the selector UI
  const [showLogSelector, setShowLogSelector] = useState<string | null>(null);

  // For ferments, we'll store slot data in local storage or just keep local state
  // Using simple local state for slots since the store only has getFermentsToday count
  const [loggedFerments, setLoggedFerments] = useState<{ [key: string]: string | null }>({
    morning: null, afternoon: null, evening: null
  });
  
  useEffect(() => {
    if (isHydrated) {
      const count = Object.values(loggedFerments).filter(Boolean).length;
      const todayDateStr = new Date().toISOString().split('T')[0];
      logFerment(todayDateStr, count);
    }
  }, [loggedFerments, isHydrated]);

  // Pantry checkbox state
  const [checkedPantryItems, setCheckedPantryItems] = useState<string[]>([]);

  // Scroll animations for background SVGs
  const { scrollYProgress } = useScroll();
  const yFloating1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yFloating2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yFloating3 = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    if (tab === "product-lab") {
      router.push("/product-lab");
    } else if (tab === "food") {
      router.push("/food");
    }
  };

  const handleTogglePlant = (id: string) => {
    togglePlant(currentWeekKey, id);
  };

  const togglePantryChecked = (item: string) => {
    setCheckedPantryItems(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleLogFerment = (slot: string, fermentName: string) => {
    setLoggedFerments(prev => ({ ...prev, [slot]: fermentName }));
    setShowLogSelector(null);
  };



  // Group food universe by category
  const categoriesMap = new Map<string, FlattenedFoodItem[]>();
  foodUniverse.forEach(item => {
    if (!categoriesMap.has(item.category)) categoriesMap.set(item.category, []);
    categoriesMap.get(item.category)!.push(item);
  });
  const allCategories = Array.from(categoriesMap.keys());
  
  const filteredPlants = foodUniverse.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(plantSearch.toLowerCase()) || 
                          (item.local_name && item.local_name.toLowerCase().includes(plantSearch.toLowerCase()));
    const matchesCat = selectedPlantCategory === "all" || item.category === selectedPlantCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F2] relative overflow-hidden">
      
      {/* Background Parallax Patterns (Seamless Weave) */}
      <motion.div 
        style={{ y: yFloating1 }}
        className="absolute top-20 right-[-5%] w-64 h-64 pointer-events-none opacity-20 md:opacity-30 z-0"
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter blur-[1px]">
          <path d="M20,180 C60,140 140,110 180,20 C140,60 110,140 20,180 Z" fill="url(#leaf-grad)" />
          <defs>
            <linearGradient id="leaf-grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2A7F7F" />
              <stop offset="100%" stopColor="#86EFAC" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      <motion.div 
        style={{ y: yFloating2 }}
        className="absolute top-[40%] left-[-8%] w-80 h-80 pointer-events-none opacity-15 md:opacity-20 z-0"
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="100" cy="100" r="80" fill="url(#bubble-grad)" />
          <defs>
            <radialGradient id="bubble-grad" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="50%" stopColor="rgba(42, 127, 127, 0.12)" />
              <stop offset="100%" stopColor="rgba(42, 127, 127, 0.02)" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Sticky Header */}
      <Navbar activeTab="food" setActiveTab={handleTabChange} />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-28 md:pb-16 z-10 relative">
        
        {/* Back Link for Desktop */}
        <div className="hidden md:flex items-center mb-6">
          <button 
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-sm font-semibold text-[#2A7F7F] hover:opacity-80 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home Hub</span>
          </button>
        </div>

        {/* Hero Section */}
        <div className="mb-10 text-center md:text-left">
          <span className="text-sm tracking-widest text-[#2A7F7F] font-bold uppercase bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-4">
            <Sparkles className="w-3 h-3 text-[#2A7F7F]" />
            Building from scratch
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-slate-900 tracking-tight">
            The Food <span className="font-semibold text-slate-950">Wing</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-500 font-light mt-3 max-w-2xl leading-relaxed">
            A practical, grain-first nourishing routine. Completely vegetarian, gluten-free, and fluid milk-free, designed to foster natural microbiome variety.
          </p>
        </div>

        {/* 2-Column Responsive Dashboard Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          
          {/* Card 1: Daily Plate & Habits */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => setActiveSheet("habits")}
            className="glassmorphic rounded-3xl p-6 border border-black/[0.03] hover:border-[#2A7F7F]/30 hover:shadow-[0_8px_30px_rgba(42,127,127,0.02)] transition-all duration-300 flex flex-col justify-between cursor-pointer bg-white/40"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-[#2A7F7F] bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-2.5 py-1 rounded-md">
                  Habits & Formula
                </span>
                <Clock className="w-4 h-4 text-slate-400" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Daily Plate & Rhythm</h3>
              <p className="text-sm text-slate-500 font-light leading-relaxed">
                The core plates formula (grains, legumes, ferments) and structural rules like the overnight eating gap.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-black/[0.02] flex items-center justify-between text-sm text-[#2A7F7F] font-semibold">
              <span>Open habits detail</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </motion.div>

          {/* Card 2: The 30+ Plants Engine */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => setActiveSheet("plants")}
            className="glassmorphic rounded-3xl p-6 border border-black/[0.03] hover:border-[#2A7F7F]/30 hover:shadow-[0_8px_30px_rgba(42,127,127,0.02)] transition-all duration-300 flex flex-col justify-between cursor-pointer bg-white/40"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-[#2A7F7F] bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-2.5 py-1 rounded-md">
                  Diversity Tracker
                </span>
                <div className="flex items-center gap-1.5 bg-[#2A7F7F]/5 px-2 py-0.5 rounded-full border border-[#2A7F7F]/10">
                  <span className="text-sm font-bold text-[#2A7F7F]">{checkedPlantsCount}/{DIVERSITY_TARGET_PUBLIC}</span>
                </div>
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">30+ Plants Engine</h3>
              <p className="text-sm text-slate-500 font-light leading-relaxed">
                A weekly checklist of whole grains, seeds, vegetables, and herbs. Eat variety to feed different microbes.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-black/[0.02] flex items-center justify-between text-sm text-[#2A7F7F] font-semibold">
              <span>Track weekly items</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </motion.div>

          {/* Card 3: The 3-Ferments Logger */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => setActiveSheet("ferments")}
            className="glassmorphic rounded-3xl p-6 border border-black/[0.03] hover:border-[#2A7F7F]/30 hover:shadow-[0_8px_30px_rgba(42,127,127,0.02)] transition-all duration-300 flex flex-col justify-between cursor-pointer bg-white/40"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-[#2A7F7F] bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-2.5 py-1 rounded-md">
                  Daily Probiotics
                </span>
                <div className="flex gap-1">
                  {Object.values(loggedFerments).map((val, i) => (
                    <span key={i} className={`w-2 h-2 rounded-full ${val ? "bg-emerald-500" : "bg-slate-300"}`} />
                  ))}
                </div>
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">3-Ferments Logger</h3>
              <p className="text-sm text-slate-500 font-light leading-relaxed">
                Log servings of cultured foods at morning, noon, and evening slots to introduce live beneficial bacteria.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-black/[0.02] flex items-center justify-between text-sm text-[#2A7F7F] font-semibold">
              <span>Log daily ferments</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </motion.div>

          {/* Card 4: Pantry & Staples */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => setActiveSheet("pantry")}
            className="glassmorphic rounded-3xl p-6 border border-black/[0.03] hover:border-[#2A7F7F]/30 hover:shadow-[0_8px_30px_rgba(42,127,127,0.02)] transition-all duration-300 flex flex-col justify-between cursor-pointer bg-white/40"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-[#2A7F7F] bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-2.5 py-1 rounded-md">
                  Kitchen Inventory
                </span>
                <ShoppingBag className="w-4 h-4 text-slate-400" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Pantry & Staples</h3>
              <p className="text-sm text-slate-500 font-light leading-relaxed">
                Checklist of grains, starters, seeds, and digestive spices to keep stocked for gut-friendly cooking.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-black/[0.02] flex items-center justify-between text-sm text-[#2A7F7F] font-semibold">
              <span>View staples inventory</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </motion.div>

          {/* Card 5: Kitchen Foundations */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => setActiveSheet("foundations")}
            className="glassmorphic rounded-3xl p-6 border border-black/[0.03] hover:border-[#2A7F7F]/30 hover:shadow-[0_8px_30px_rgba(42,127,127,0.02)] transition-all duration-300 flex flex-col justify-between cursor-pointer bg-white/40"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-[#2A7F7F] bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-2.5 py-1 rounded-md">
                  Cooking Skills
                </span>
                <BookOpen className="w-4 h-4 text-slate-400" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Kitchen Foundations</h3>
              <p className="text-sm text-slate-500 font-light leading-relaxed">
                The 12 vital building blocks for cooking from scratch, from boiling millets to setting curd.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-black/[0.02] flex items-center justify-between text-sm text-[#2A7F7F] font-semibold">
              <span>Review 12 rules</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </motion.div>

          {/* Card 6: The Dedicated Recipe Hub */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => router.push("/recipes")}
            className="glassmorphic rounded-3xl p-6 border border-amber-500/10 hover:border-amber-500/35 hover:shadow-[0_8px_30px_rgba(245,158,11,0.02)] transition-all duration-300 flex flex-col justify-between cursor-pointer bg-amber-500/[0.01]"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-amber-800 bg-amber-500/5 border border-amber-500/10 px-2.5 py-1 rounded-md">
                  Recipe Book
                </span>
                <Flame className="w-4 h-4 text-amber-500" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">The Recipe Hub</h3>
              <p className="text-sm text-slate-500 font-light leading-relaxed">
                Step-by-step formulas for all main dishes, beverages, and traditional ferments. Completely searchable and filtered.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-black/[0.02] flex items-center justify-between text-sm text-amber-700 font-semibold">
              <span>Browse 20+ recipes</span>
              <ChevronRight className="w-4 h-4 animate-pulse" />
            </div>
          </motion.div>

        </div>

      </main>
      {/* ==================== SHEETS / OVERLAY PORTALS (Framer Motion) ==================== */}
      <AnimatePresence>
        {activeSheet && (
          <div className="fixed inset-0 z-50 flex items-center justify-end">
            
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSheet(null)}
              className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
            />

            {/* Sheet Content Panel */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 250 }}
              className="w-full max-w-lg h-full bg-[#F7F6F2] shadow-2xl relative z-10 border-l border-black/[0.05] flex flex-col"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-black/[0.03] flex items-center justify-between bg-white/40">
                <h3 className="text-base font-semibold text-slate-955 uppercase tracking-wide">
                  {activeSheet === "habits" && "Daily Habits & Plate"}
                  {activeSheet === "plants" && "The 30+ Plants Engine"}
                  {activeSheet === "ferments" && "The 3-Ferments Logger"}
                  {activeSheet === "pantry" && "Pantry & Staples"}
                  {activeSheet === "foundations" && "Kitchen Foundations"}
                </h3>
                <button 
                  onClick={() => setActiveSheet(null)}
                  className="p-1.5 rounded-full hover:bg-slate-200/50 transition-colors"
                >
                  <X className="w-4 h-4 text-slate-505" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-10">
                                 {/* 1. HABITS SHEET */}
                {activeSheet === "habits" && (
                  <div className="space-y-6">
                    {/* The 12-14 hr rule */}
                    <div className="bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 rounded-2xl p-5 space-y-2">
                      <div className="flex items-center gap-2 text-slate-900">
                        <Clock className="w-4 h-4 text-[#2A7F7F]" />
                        <h4 className="text-sm font-semibold">The 12-14 Hour Overnight Gap</h4>
                      </div>
                      <p className="text-sm text-slate-650 font-light leading-relaxed">
                        Keep a strict 12-to-14 hour overnight fasting gap. Eating early dinners and late breakfasts gives your gut walls and digestive sweeps quiet time to rest, restore, and clear out waste.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">The Daily Plate Formula</h4>
                      <div className="bg-white border border-black/[0.02] rounded-2xl p-5 space-y-4">
                        <div className="flex flex-col text-sm pb-3 border-b border-slate-100">
                          <span className="font-light text-slate-500 uppercase text-[10px] tracking-widest mb-1">First Meal (11 AM - 1 PM)</span>
                          <span className="font-medium text-slate-900">Prebiotic Millet Crepe or Warm Porridge</span>
                          <span className="text-xs text-slate-400 mt-1">E.g., Moong Pesarattu or Ragi Ambali. Rich in protein, minerals, and gentle soluble fiber.</span>
                        </div>
                        <div className="flex flex-col text-sm pb-3 border-b border-slate-100">
                          <span className="font-light text-slate-500 uppercase text-[10px] tracking-widest mb-1">Main Meal (6 PM - 8 PM)</span>
                          <span className="font-medium text-slate-900">Grain-first Macro Plate</span>
                          <span className="text-xs text-slate-400 mt-1">E.g., Universal Dal + seasonal vegetable Sabzi + unpolished Red/Brown Rice + raw prebiotic salad.</span>
                        </div>
                        <div className="flex flex-col text-sm pt-2">
                          <span className="font-light text-[#2A7F7F] uppercase text-[10px] tracking-widest mb-1 font-bold">Live Probiotics</span>
                          <span className="font-medium text-slate-900">Daily Cultured Serving</span>
                          <span className="text-xs text-slate-400 mt-1">E.g., Home-set curd (Dahi), Spiced Neer-Mor (buttermilk), or fermented beet Kanji.</span>
                        </div>
                      </div>
                    </div>

                    {/* When X, eat Y Quick-Help */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">When X, Eat Y (Quick Help)</h4>
                      <div className="space-y-2">
                        {QUICK_HELP_GUIDE.map((item, idx) => (
                          <div key={idx} className="bg-white/60 border border-black/[0.02] rounded-xl p-4 space-y-1">
                            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-500/5 px-2.5 py-1 rounded border border-amber-500/10 inline-block">
                              {item.condition}
                            </span>
                            <p className="text-sm text-slate-700 font-light leading-relaxed mt-1">
                              {item.solution}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                 {/* 2. PLANTS SHEET */}
                {activeSheet === "plants" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 rounded-2xl p-5">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900">Diversity Target: {DIVERSITY_TARGET_PUBLIC}+ Plants/Week</h4>
                        <p className="text-xs text-slate-500 font-light mt-1">Check items off as you consume them this week.</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-extralight text-[#2A7F7F]">{checkedPlantsCount}</span>
                        <span className="text-xs text-slate-400 block">points</span>
                      </div>
                    </div>

                    {/* Search and Reset */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Search plants..."
                          value={plantSearch}
                          onChange={(e) => setPlantSearch(e.target.value)}
                          className="w-full pl-9 pr-4 py-2 rounded-xl border border-black/[0.05] bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#2A7F7F]/30"
                        />
                      </div>
                      <button 
                        onClick={() => resetWeekPlants(currentWeekKey)}
                        className="text-xs font-semibold text-red-600 bg-red-50 px-3 py-2 rounded-xl"
                      >
                        Reset Week
                      </button>
                    </div>

                    {/* Plant category buttons */}
                    <div className="flex overflow-x-auto gap-1.5 border-b border-black/[0.03] pb-3 scrollbar-none whitespace-nowrap">
                      <button
                        onClick={() => setSelectedPlantCategory("all")}
                        className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all flex-shrink-0 ${
                          selectedPlantCategory === "all" ? "bg-[#2A7F7F] text-white" : "bg-white/50 border border-black/[0.02] text-slate-600 hover:bg-white"
                        }`}
                      >
                        All Plants
                      </button>
                      {allCategories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setSelectedPlantCategory(cat)}
                          className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all flex-shrink-0 ${
                            selectedPlantCategory === cat ? "bg-[#2A7F7F] text-white" : "bg-white/50 border border-black/[0.02] text-slate-600 hover:bg-white"
                          }`}
                        >
                          {cat.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </button>
                      ))}
                    </div>

                    {/* Plant items checklist */}
                    <div className="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto pr-2">
                      {filteredPlants.map((item, idx) => {
                        const isChecked = checkedPlantsSet.has(item.id);
                        return (
                          <button
                            key={idx}
                            onClick={() => handleTogglePlant(item.id)}
                            className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                              isChecked ? "bg-[#2A7F7F]/5 border-[#2A7F7F]/30" : "bg-white/40 border-black/[0.02] hover:border-black/[0.06]"
                            }`}
                          >
                            <div>
                              <span className={`text-sm font-light block ${isChecked ? "text-slate-900 font-normal" : "text-slate-700"}`}>
                                {item.name} {item.local_name && <span className="text-xs text-slate-400">({item.local_name})</span>}
                              </span>
                              <span className="text-[10px] text-slate-400 uppercase tracking-widest">{item.role}</span>
                            </div>
                            <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center flex-shrink-0 transition-all ${
                              isChecked ? "bg-[#2A7F7F] border-[#2A7F7F] text-white" : "border-slate-300 bg-white"
                            }`}>
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                 {/* 3. FERMENTS LOGGER SHEET */}
                {activeSheet === "ferments" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-black/[0.03] pb-4">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900">Daily Probiotics Load</h4>
                        <p className="text-xs text-slate-400 font-light mt-0.5">Aim for 3 distinct cultured servings daily.</p>
                      </div>
                      <button
                        onClick={() => setLoggedFerments({ morning: null, afternoon: null, evening: null })}
                        className="text-xs uppercase tracking-widest text-[#2A7F7F] font-bold border border-[#2A7F7F]/20 rounded-lg px-2.5 py-1 hover:bg-[#2A7F7F]/5 transition-colors"
                      >
                        Reset Slots
                      </button>
                    </div>

                    {/* Logger Slots */}
                    <div className="space-y-4">
                      {["morning", "afternoon", "evening"].map((slot, index) => {
                        const loggedVal = loggedFerments[slot];
                        return (
                          <div key={slot} className="bg-white border border-black/[0.02] rounded-2xl p-4 flex flex-col justify-between min-h-[110px] relative">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                                {index === 0 && "1. Morning Slot"}
                                {index === 1 && "2. Afternoon Slot"}
                                {index === 2 && "3. Evening Slot"}
                              </span>
                              {loggedVal && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                            </div>

                            {loggedVal ? (
                              <div className="flex justify-between items-center">
                                <div>
                                  <h4 className="text-sm font-semibold text-slate-950 flex items-center gap-1.5">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                    {loggedVal}
                                  </h4>
                                </div>
                                <button
                                  onClick={() => setShowLogSelector(showLogSelector === slot ? null : slot)}
                                  className="text-xs font-bold text-[#2A7F7F] hover:underline"
                                >
                                  Edit
                                </button>
                              </div>
                            ) : (
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-400 italic">No ferment logged</span>
                                <button
                                  onClick={() => setShowLogSelector(showLogSelector === slot ? null : slot)}
                                  className="text-xs bg-[#2A7F7F] text-white px-3 py-1 rounded-lg font-medium hover:bg-[#1e5c5c] transition-colors"
                                >
                                  Choose
                                </button>
                              </div>
                            )}

                            {/* Dropdown overlay */}
                            {showLogSelector === slot && (
                              <div className="absolute top-12 left-0 right-0 max-h-[220px] overflow-y-auto bg-[#F7F6F2] border border-black/[0.08] shadow-lg rounded-xl p-2 z-50 flex flex-col gap-1">
                                <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 px-2 pt-1 pb-1">Live Probiotics (Counts toward target)</div>
                                {FERMENT_CATEGORIES.flatMap(cat => cat.items).filter(item => item.isLive).map((item, idx) => {
                                  return (
                                    <button
                                      key={`live-${idx}`}
                                      onClick={() => handleLogFerment(slot, item.name)}
                                      className="text-left px-2 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-[#2A7F7F]/10 hover:text-[#2A7F7F] transition-colors flex justify-between items-center"
                                    >
                                      <span>{item.name}</span>
                                      <span className="text-[10px] bg-emerald-500/10 text-emerald-700 px-1.5 py-0.5 rounded font-bold uppercase">
                                        Live
                                      </span>
                                    </button>
                                  );
                                })}
                                <div className="text-[10px] font-bold uppercase tracking-widest text-amber-700 px-2 pt-3 pb-1 border-t border-black/[0.05] mt-1">Cooked Ferments (Prebiotics)</div>
                                {FERMENT_CATEGORIES.flatMap(cat => cat.items).filter(item => !item.isLive).map((item, idx) => {
                                  return (
                                    <div
                                      key={`cooked-${idx}`}
                                      className="px-2 py-1.5 rounded-lg text-xs text-slate-500 flex flex-col gap-0.5 opacity-70"
                                    >
                                      <span className="font-medium">{item.name}</span>
                                      <span className="text-[9px] text-amber-700 uppercase font-bold tracking-wider">
                                        Cooked — Pair with live ferment
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                 {/* 4. PANTRY SHEET */}
                {activeSheet === "pantry" && (
                  <div className="space-y-6">
                    <p className="text-sm text-slate-500 font-light leading-relaxed">
                      Keep these fundamental ingredients and starters in your kitchen to cook grain-first gut-friendly recipes on autopilot.
                    </p>

                    <div className="space-y-6">
                      {PANTRY_STAPLES.map((cat, cIdx) => (
                        <div key={cIdx} className="space-y-2">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{cat.category}</h4>
                          <div className="grid grid-cols-1 gap-1.5">
                            {cat.items.map((item, iIdx) => {
                              const isChecked = checkedPantryItems.includes(item);
                              return (
                                <button
                                  key={iIdx}
                                  onClick={() => togglePantryChecked(item)}
                                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                                    isChecked
                                      ? "bg-[#2A7F7F]/5 border-[#2A7F7F]/30"
                                      : "bg-white/40 border-black/[0.02] hover:border-black/[0.06]"
                                  }`}
                                >
                                  <span className={`text-sm font-light ${isChecked ? "text-slate-900 font-normal" : "text-slate-700"}`}>
                                    {item}
                                  </span>
                                  <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all ${
                                    isChecked
                                      ? "bg-[#2A7F7F] border-[#2A7F7F] text-white"
                                      : "border-slate-300 bg-white"
                                  }`}>
                                    {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                 {/* 5. FOUNDATIONS SHEET */}
                {activeSheet === "foundations" && (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-500 font-light leading-relaxed mb-4">
                      The 12 primary cooking guidelines and preparation blueprints for a grain-based diet.
                    </p>
                    
                    <div className="space-y-3">
                      {KITCHEN_FOUNDATIONS.map((f) => (
                        <div key={f.id} className="bg-white border border-black/[0.02] rounded-2xl p-4.5 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#2A7F7F] bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-2.5 py-1 rounded">
                              {f.id}
                            </span>
                            <span className="text-slate-300 font-light text-xs">Rule</span>
                          </div>
                          <h4 className="text-sm font-semibold text-slate-900 mt-1">{f.title}</h4>
                          <p className="text-sm text-slate-500 font-light leading-relaxed mt-1">
                            {f.instruction}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Simple wordmark footer */}
      <footer className="w-full text-center py-8 pb-10 text-sm tracking-widest text-slate-400 font-light select-none border-t border-black/[0.02] bg-white/20 relative z-10">
        BUILT IN THE OPEN. ONE REP AT A TIME.
      </footer>
    </div>
  );
}
