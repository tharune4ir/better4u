"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Utensils, 
  BookOpen, 
  Info,
  Sparkles,
  Coffee,
  Check,
  Filter,
  ShieldCheck,
  Search,
  RotateCcw
} from "lucide-react";
import Navbar, { NavTab } from "@/components/Navbar";
import { KITCHEN_INTRO, MENU_ITEMS } from "@/lib/kitchen-data";

export default function SecondBatchCollectionPage() {
  const router = useRouter();
  const [activeNavTab, setActiveNavTab] = useState<NavTab>("journal");
  const [activeContentTab, setActiveContentTab] = useState<"recipes" | "standards">("recipes");
  
  // Filtering states
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeBadges, setActiveBadges] = useState<string[]>([]);

  const handleTabChange = (tab: NavTab) => {
    setActiveNavTab(tab);
    if (tab === "product-lab") {
      router.push("/product-lab");
    } else if (tab === "approach") {
      router.push("/approach");
    } else if (tab === "journal") {
      router.push("/journal");
    }
  };

  // Get all unique categories
  const categories = useMemo(() => {
    const cats = new Set(MENU_ITEMS.map(item => item.category));
    return ["All", ...Array.from(cats)];
  }, []);

  // Get all unique badges for filter bar
  const allFilterBadges = useMemo(() => {
    const badgesSet = new Set<string>();
    MENU_ITEMS.forEach(item => {
      item.badges.forEach(b => badgesSet.add(b));
    });
    return Array.from(badgesSet);
  }, []);

  // Filter items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBadges = activeBadges.length === 0 || 
                            activeBadges.every(badge => item.badges.includes(badge));
      
      return matchesCategory && matchesSearch && matchesBadges;
    });
  }, [selectedCategory, searchQuery, activeBadges]);

  const toggleBadgeFilter = (badge: string) => {
    setActiveBadges(prev => 
      prev.includes(badge) ? prev.filter(b => b !== badge) : [...prev, badge]
    );
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setActiveBadges([]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F2] text-slate-900 relative overflow-hidden">
      
      {/* Background Floating SVGs */}
      <div className="absolute top-20 right-[-5%] w-64 h-64 pointer-events-none opacity-20 z-0">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter blur-[1px]">
          <path d="M20,180 C60,140 140,110 180,20 C140,60 110,140 20,180 Z" fill="url(#leaf-grad)" />
          <defs>
            <linearGradient id="leaf-grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2A7F7F" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#86EFAC" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <Navbar activeTab="journal" setActiveTab={handleTabChange} />

      {/* HEADER SECTION */}
      <header className="w-full max-w-5xl mx-auto px-6 pt-12 md:pt-16 pb-6 space-y-4 z-10 relative">
        <button 
          onClick={() => router.push("/journal")}
          className="text-xs font-semibold text-slate-400 hover:text-slate-650 transition-colors flex items-center gap-2 cursor-pointer bg-transparent border-none p-0 outline-none"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Journal Hub</span>
        </button>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] tracking-widest text-[#2A7F7F] font-bold uppercase bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-3 py-1 rounded-full inline-block">
              Second Batch · Global Comfort
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-extralight tracking-tight text-slate-900">
            {KITCHEN_INTRO.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-500 font-light max-w-2xl leading-relaxed">
            {KITCHEN_INTRO.subtitle}
          </p>
        </div>

        {/* TAB TOGGLE: Recipes vs Standards */}
        <div className="flex border-b border-black/[0.06] pt-8">
          <button
            onClick={() => setActiveContentTab("recipes")}
            className={`pb-4 px-6 text-sm font-semibold tracking-wide uppercase transition-all duration-300 relative ${
              activeContentTab === "recipes" 
                ? "text-[#2A7F7F]" 
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <span className="flex items-center gap-2">
              <Utensils className="w-4 h-4" />
              The Recipes
            </span>
            {activeContentTab === "recipes" && (
              <motion.div 
                layoutId="kitchenTabBorder" 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2A7F7F]" 
              />
            )}
          </button>
          
          <button
            onClick={() => setActiveContentTab("standards")}
            className={`pb-4 px-6 text-sm font-semibold tracking-wide uppercase transition-all duration-300 relative ${
              activeContentTab === "standards" 
                ? "text-[#2A7F7F]" 
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              The Trelis Standard
            </span>
            {activeContentTab === "standards" && (
              <motion.div 
                layoutId="kitchenTabBorder" 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2A7F7F]" 
              />
            )}
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 pb-24 z-10 relative">
        <AnimatePresence mode="wait">
          {activeContentTab === "recipes" ? (
            <motion.div
              key="recipes-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {/* FILTERS & SEARCH CONTROL PANEL */}
              <div className="bg-white/60 backdrop-blur-xs p-6 rounded-3xl border border-black/[0.03] space-y-6 shadow-sm">
                
                {/* Search Bar & Categories Horizontal Scroll */}
                <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
                  {/* Category Buttons */}
                  <div className="flex flex-wrap gap-1.5 order-2 lg:order-1">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3.5 py-1.5 rounded-full text-xs transition-all duration-300 cursor-pointer ${
                          selectedCategory === cat
                            ? "bg-[#2A7F7F] text-white font-semibold shadow-xs"
                            : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Search Input */}
                  <div className="relative order-1 lg:order-2 w-full lg:w-64">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search recipes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-full text-xs focus:outline-none focus:border-[#2A7F7F] transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Dietary Tags Multi-Select */}
                <div className="pt-4 border-t border-black/[0.03] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Filter className="w-3 h-3 text-slate-355" />
                      Filter Dietary Profile
                    </span>
                    {(activeBadges.length > 0 || searchQuery !== "" || selectedCategory !== "All") && (
                      <button 
                        onClick={clearFilters}
                        className="text-[10px] font-bold text-[#2A7F7F] hover:text-[#1e5c5c] flex items-center gap-1 transition-colors uppercase tracking-widest cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Reset All Filters
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {allFilterBadges.map((badge) => {
                      const isSelected = activeBadges.includes(badge);
                      return (
                        <button
                          key={badge}
                          onClick={() => toggleBadgeFilter(badge)}
                          className={`px-3 py-1 rounded-lg text-[10px] font-semibold tracking-wide uppercase transition-all duration-300 cursor-pointer border ${
                            isSelected
                              ? "bg-[#2A7F7F]/10 border-[#2A7F7F] text-[#2A7F7F]"
                              : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                          }`}
                        >
                          {badge}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* FILTER COUNT */}
              <div className="flex justify-between items-center px-1">
                <span className="text-xs text-slate-500 font-light">
                  Showing <strong className="font-semibold text-slate-800">{filteredItems.length}</strong> of 12 recipes
                </span>
              </div>

              {/* MENU ITEMS GRID */}
              {filteredItems.length === 0 ? (
                <div className="bg-white/40 border border-dashed border-slate-200 rounded-3xl p-12 text-center text-slate-400 font-light text-sm">
                  No recipes match the selected filters.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      whileHover={{ y: -4 }}
                      onClick={() => router.push(`/journal/second-batch/${item.id}`)}
                      className="group cursor-pointer bg-white rounded-3xl border border-black/[0.03] shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.035)] overflow-hidden flex flex-col justify-between transition-all duration-300"
                    >
                      <div>
                        {/* Food Image */}
                        <div className="relative aspect-[16/10] w-full bg-[#f3f0e8] overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                          {/* Price Tag Float */}
                          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-black/[0.03] shadow-sm">
                            <span className="text-xs font-bold text-slate-900">₹{item.price}</span>
                          </div>

                          {/* Category Tag Float */}
                          <div className="absolute bottom-4 left-4">
                            <span className="text-[9px] font-bold text-white uppercase tracking-widest bg-black/45 backdrop-blur-xs px-2.5 py-1 rounded-md">
                              {item.category}
                            </span>
                          </div>
                        </div>

                        {/* Text & Meta */}
                        <div className="p-5 md:p-6 space-y-3">
                          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-[#2A7F7F] transition-colors line-clamp-1 leading-snug">
                            {item.name}
                          </h3>

                          {/* Dietary Badges List */}
                          <div className="flex flex-wrap gap-1">
                            {item.badges.slice(0, 3).map((badge) => (
                              <span 
                                key={badge}
                                className="text-[8px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md"
                              >
                                {badge}
                              </span>
                            ))}
                            {item.badges.length > 3 && (
                              <span className="text-[8px] font-bold bg-[#2A7F7F]/5 text-[#2A7F7F] px-2 py-0.5 rounded-md">
                                +{item.badges.length - 3}
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-slate-500 font-light leading-relaxed line-clamp-3 pt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Drink Pairing Bottom Block */}
                      <div className="px-5 pb-5 md:px-6 md:pb-6 pt-0">
                        <div className="bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 rounded-xl p-3 flex items-center justify-between text-xs transition-colors group-hover:bg-[#2A7F7F]/10">
                          <div className="flex items-center gap-2">
                            <Coffee className="w-3.5 h-3.5 text-[#2A7F7F]" />
                            <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wide">Pairing:</span>
                            <span className="font-semibold text-slate-800">{item.pairsWith}</span>
                          </div>
                          <span className="text-[10px] font-bold text-[#2A7F7F] uppercase tracking-wider group-hover:translate-x-0.5 transition-transform">
                            Details →
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* HOUSE FERMENTS SECTION */}
              <section className="bg-white/60 p-6 md:p-8 rounded-[2rem] border border-black/[0.03] space-y-6 mt-12 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-[#2A7F7F]" />
                  <h3 className="text-sm font-bold tracking-widest uppercase text-slate-800">
                    House Ferments (Shared Prep)
                  </h3>
                </div>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  Make these in batches ahead of time. These house-made ferments run once and supply live prebiotic/probiotic elements to multiple recipes across the collection.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="bg-white/50 p-5 rounded-2xl border border-black/[0.03] space-y-1">
                    <h4 className="font-semibold text-slate-800 text-xs sm:text-sm uppercase tracking-wider">Kanji</h4>
                    <p className="text-xs text-slate-500 font-light leading-relaxed">
                      Black carrot + beet batons in cooled boiled water + crushed mustard + salt, fermented 3–5 days (also a BATCH product). Brine doubles as salad dressing base.
                    </p>
                  </div>
                  <div className="bg-white/50 p-5 rounded-2xl border border-black/[0.03] space-y-1">
                    <h4 className="font-semibold text-slate-800 text-xs sm:text-sm uppercase tracking-wider">Turmeric Kraut</h4>
                    <p className="text-xs text-slate-500 font-light leading-relaxed">
                      Shredded cabbage + carrot massaged with salt + turmeric + cumin, packed under brine, 4–7 days.
                    </p>
                  </div>
                  <div className="bg-white/50 p-5 rounded-2xl border border-black/[0.03] space-y-1">
                    <h4 className="font-semibold text-slate-800 text-xs sm:text-sm uppercase tracking-wider">Cultured Cashew Cream</h4>
                    <p className="text-xs text-slate-500 font-light leading-relaxed">
                      Soaked cashews blended smooth, cultured with 1 tsp curd 8–12 hrs till tangy — the dairy-free "cream" for alfredo/binders.
                    </p>
                  </div>
                  <div className="bg-white/50 p-5 rounded-2xl border border-black/[0.03] space-y-1">
                    <h4 className="font-semibold text-slate-800 text-xs sm:text-sm uppercase tracking-wider">Fermented Chilli/Tomato Base</h4>
                    <p className="text-xs text-slate-500 font-light leading-relaxed">
                      Tomato + red chilli + garlic + salt fermented 3–4 days for shakshuka/pasta/pizza heat.
                    </p>
                  </div>
                  <div className="bg-white/50 p-5 rounded-2xl border border-black/[0.03] space-y-1 md:col-span-2">
                    <h4 className="font-semibold text-slate-800 text-xs sm:text-sm uppercase tracking-wider">Pickled Onion/Carrot/Chilli</h4>
                    <p className="text-xs text-slate-500 font-light leading-relaxed">
                      Quick salt-brine ferment 2–3 days.
                    </p>
                  </div>
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="standards-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-12 max-w-3xl mx-auto"
            >
              {/* Philosophy Callout */}
              <section className="bg-white/40 glassmorphic p-6 md:p-8 rounded-[2rem] border border-black/[0.03] text-slate-700 text-sm md:text-base leading-relaxed space-y-4">
                <p className="font-light italic text-slate-650">
                  Any cafe can say "healthy." Trelis draws a strict, public line every single recipe must pass to earn its place on the counter—the exact same clinical standards that power our Product Lab.
                </p>
              </section>

              {/* The 4 Core Standards */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {KITCHEN_INTRO.standards.map((std, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white p-6 md:p-8 rounded-3xl border border-black/[0.03] space-y-3 shadow-xs hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#2A7F7F]/10 text-[#2A7F7F] font-mono text-xs font-bold flex items-center justify-center flex-shrink-0">
                        0{idx + 1}
                      </div>
                      <h4 className="font-semibold text-slate-900 text-sm md:text-base tracking-wide">
                        {std.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed pl-11">
                      {std.desc}
                    </p>
                  </div>
                ))}
              </section>

              {/* Hard Rules Breakdown Card */}
              <section className="bg-amber-500/[0.03] border-l-2 border-amber-600/40 p-6 md:p-8 rounded-r-3xl space-y-4">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span className="text-[10px] font-bold tracking-widest text-amber-700 uppercase block">The Hard Rules</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm text-slate-700">
                  <div className="flex gap-2 items-start">
                    <Check className="w-4 h-4 text-[#2A7F7F] flex-shrink-0 mt-0.5" />
                    <span className="font-light"><strong>No Refined Sugar:</strong> Pure fruit, dates, and raw, whole ingredients only.</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <Check className="w-4 h-4 text-[#2A7F7F] flex-shrink-0 mt-0.5" />
                    <span className="font-light"><strong>No Wheat / Maida:</strong> Entirely gluten-free grains, oats, and legume bases.</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <Check className="w-4 h-4 text-[#2A7F7F] flex-shrink-0 mt-0.5" />
                    <span className="font-light"><strong>No Fluid Milk:</strong> Pure cashews, almonds, curd, paneer, and kefir.</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <Check className="w-4 h-4 text-[#2A7F7F] flex-shrink-0 mt-0.5" />
                    <span className="font-light"><strong>100% Vegetarian:</strong> High-protein plants, seeds, legumes, and egg options.</span>
                  </div>
                </div>
              </section>

              {/* Info Disclaimer */}
              <div className="bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 rounded-2xl p-5 flex gap-3 text-xs leading-relaxed text-slate-500">
                <Info className="w-4 h-4 text-[#2A7F7F] flex-shrink-0 mt-0.5" />
                <p className="font-light">
                  Prices listed are indicative healthy-comfort-food points for Bangalore (2026). All recipes are designed for local preparation and immediate consumption to retain the potency of live active cultures.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-10 text-[10px] tracking-widest text-slate-400 font-light select-none border-t border-black/[0.02] bg-white/20 relative z-10">
        BUILT IN THE OPEN. ONE BATCH AT A TIME.
      </footer>
    </div>
  );
}
