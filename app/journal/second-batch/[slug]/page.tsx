"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  BookOpen, 
  Flame, 
  Coffee,
  Info,
  Sparkles,
  ClipboardList
} from "lucide-react";
import Navbar, { NavTab } from "@/components/Navbar";
import { MENU_ITEMS, MenuItem } from "@/lib/kitchen-data";

export default function RecipeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [activeNavTab, setActiveNavTab] = useState<NavTab>("journal");

  // Find the recipe index
  const recipeIndex = MENU_ITEMS.findIndex(item => item.id === slug);
  const item = MENU_ITEMS[recipeIndex];

  // Interactive step & ingredient tracking
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});

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

  if (!item) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F7F6F2] text-slate-900 justify-between">
        <Navbar activeTab="journal" setActiveTab={handleTabChange} />
        <main className="flex-1 max-w-xl mx-auto px-6 py-24 text-center space-y-4">
          <BookOpen className="w-12 h-12 text-[#2A7F7F] mx-auto opacity-50" />
          <h2 className="text-2xl font-light">Recipe Not Found</h2>
          <p className="text-slate-500 font-light text-sm">We couldn't find the recipe page you were looking for.</p>
          <button 
            onClick={() => router.push("/journal/second-batch")}
            className="px-6 py-2.5 bg-[#2A7F7F] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#1e5c5c] transition-all cursor-pointer"
          >
            Back to Collection
          </button>
        </main>
        <footer className="w-full text-center py-10 text-[10px] tracking-widest text-slate-400 font-light select-none">
          BUILT IN THE OPEN. ONE BATCH AT A TIME.
        </footer>
      </div>
    );
  }

  // Next & Prev recipes for bottom navigation carousel
  const prevRecipe = MENU_ITEMS[(recipeIndex - 1 + MENU_ITEMS.length) % MENU_ITEMS.length];
  const nextRecipe = MENU_ITEMS[(recipeIndex + 1) % MENU_ITEMS.length];

  // Toggle checklist
  const toggleIngredient = (idx: number) => {
    setCheckedIngredients(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleStep = (idx: number) => {
    setCheckedSteps(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F2] text-slate-900 relative overflow-hidden">
      <Navbar activeTab="journal" setActiveTab={handleTabChange} />

      {/* Main Body */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-8 pb-24 z-10 relative space-y-8">
        
        {/* BACK TO COLLECTION LINK */}
        <button 
          onClick={() => router.push("/journal/second-batch")}
          className="text-xs font-semibold text-slate-400 hover:text-[#2A7F7F] transition-colors flex items-center gap-2 cursor-pointer bg-transparent border-none p-0 outline-none"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Second Batch collection</span>
        </button>

        {/* TITLE & META INFO */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-widest text-[#2A7F7F] font-bold uppercase bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-3 py-1 rounded-full inline-block">
              Second Batch · Global Comfort
            </span>
            <span className="text-[10px] tracking-widest text-slate-400 font-bold uppercase border border-black/[0.06] px-3 py-1 rounded-full inline-block">
              Recipe {recipeIndex + 1} of 12
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
            <h1 className="text-3xl sm:text-4xl font-extralight tracking-tight text-slate-900 leading-tight">
              {item.name}
            </h1>
            
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-xs border border-black/[0.03] self-start">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price Point</span>
              <span className="text-base font-bold text-slate-800">₹{item.price}</span>
            </div>
          </div>
        </div>

        {/* TWO-COLUMN GRID DETAIL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Overview, Image, and Badges */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Recipe Image */}
            <div className="bg-white p-3 rounded-3xl border border-black/[0.03] shadow-md overflow-hidden">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Description Box */}
            <div className="bg-white p-6 rounded-2xl border border-black/[0.03] space-y-2.5 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Description</h4>
              <p className="text-sm text-slate-650 font-light leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Dietary Badges List */}
            <div className="bg-white/50 border border-black/[0.03] rounded-2xl p-6 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-bold">Dietary Profile</h4>
              <div className="flex flex-wrap gap-1.5">
                {item.badges.map((badge) => (
                  <span 
                    key={badge}
                    className="text-[9px] font-bold uppercase tracking-wider bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 text-[#2A7F7F] px-3 py-1 rounded-md"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Product Lab Pairing Box */}
            <div className="bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-[#2A7F7F]">
                <Coffee className="w-4 h-4" />
                <h4 className="font-bold text-xs uppercase tracking-wider">Product Lab Drink Pairing</h4>
              </div>
              <p className="text-xs text-slate-550 font-light leading-relaxed">
                Optimized to pair with <strong className="text-slate-850 font-semibold">{item.pairsWith}</strong>. Consuming the food and drink pairing together optimizes prebiotic diversity and live probiotic absorption.
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: Ingredients & Steps */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Ingredients Card */}
            {item.recipe && (
              <div className="bg-white rounded-3xl border border-black/[0.03] p-6 md:p-8 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-black/[0.04] pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#2A7F7F]" />
                    <h3 className="font-semibold text-slate-850 tracking-wide uppercase text-sm">Ingredients</h3>
                  </div>
                  {item.recipe.yield && (
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md uppercase tracking-wider">
                      Yield: {item.recipe.yield.replace("Yield:", "").trim()}
                    </span>
                  )}
                </div>
                
                <ul className="space-y-3">
                  {item.recipe.ingredients.map((ing, idx) => {
                    const isChecked = !!checkedIngredients[idx];
                    return (
                      <li 
                        key={idx} 
                        onClick={() => toggleIngredient(idx)}
                        className="flex items-start gap-3 cursor-pointer select-none group"
                      >
                        <button 
                          className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                            isChecked 
                              ? "bg-[#2A7F7F] border-[#2A7F7F] text-white" 
                              : "border-slate-300 group-hover:border-slate-400 bg-white"
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                        <span className={`text-sm md:text-base transition-colors leading-relaxed flex-1 ${
                          isChecked ? "text-slate-350 line-through font-light" : "text-slate-700 font-light"
                        }`}>
                          {ing}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Steps Card */}
            {item.recipe && (
              <div className="bg-white rounded-3xl border border-black/[0.03] p-6 md:p-8 space-y-5 shadow-sm">
                <div className="flex items-center gap-2 border-b border-black/[0.04] pb-3">
                  <Flame className="w-4 h-4 text-[#2A7F7F]" />
                  <h3 className="font-semibold text-slate-850 tracking-wide uppercase text-sm">Directions</h3>
                </div>

                <ol className="space-y-4">
                  {item.recipe.steps.map((step, idx) => {
                    const isChecked = !!checkedSteps[idx];
                    return (
                      <li 
                        key={idx}
                        onClick={() => toggleStep(idx)}
                        className="flex items-start gap-3 cursor-pointer select-none group"
                      >
                        <button 
                          className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs transition-all ${
                            isChecked 
                              ? "bg-slate-300 border-slate-300 text-slate-500" 
                              : "border-[#2A7F7F] text-[#2A7F7F] bg-white group-hover:bg-[#2A7F7F]/5"
                          }`}
                        >
                          {isChecked ? <Check className="w-3 h-3 stroke-[3]" /> : idx + 1}
                        </button>
                        <span className={`text-sm md:text-base leading-relaxed transition-colors flex-1 ${
                          isChecked ? "text-slate-350 line-through font-light" : "text-slate-700 font-light"
                        }`}>
                          {step}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            )}

            {/* Notes / Storage Card */}
            {item.recipe?.notes && (
              <div className="bg-white/60 p-5 rounded-2xl border border-black/[0.03] space-y-2">
                <div className="flex items-center gap-2 text-slate-600">
                  <ClipboardList className="w-4 h-4 text-[#2A7F7F]" />
                  <h5 className="font-semibold text-xs uppercase tracking-wider">Storage & Notes</h5>
                </div>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  {item.recipe.notes}
                </p>
              </div>
            )}

          </div>

        </div>

        {/* BOTTOM NAVIGATION: Previous / Next Recipe Carousel */}
        <div className="border-t border-black/[0.05] pt-12 mt-12">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-6">
            Navigate the 12 Recipes
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {/* Previous Recipe Card */}
            <div 
              onClick={() => {
                setCheckedIngredients({});
                setCheckedSteps({});
                router.push(`/journal/second-batch/${prevRecipe.id}`);
              }}
              className="group cursor-pointer bg-white p-5 rounded-2xl border border-black/[0.03] flex items-center justify-between hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-[#2A7F7F] group-hover:border-[#2A7F7F] transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block">Previous</span>
                  <span className="text-xs font-semibold text-slate-800 line-clamp-1 group-hover:text-[#2A7F7F] transition-colors">
                    {prevRecipe.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Next Recipe Card */}
            <div 
              onClick={() => {
                setCheckedIngredients({});
                setCheckedSteps({});
                router.push(`/journal/second-batch/${nextRecipe.id}`);
              }}
              className="group cursor-pointer bg-white p-5 rounded-2xl border border-black/[0.03] flex items-center justify-between hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-3 w-full justify-between">
                <div className="text-left">
                  <span className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block">Next Recipe</span>
                  <span className="text-xs font-semibold text-slate-800 line-clamp-1 group-hover:text-[#2A7F7F] transition-colors">
                    {nextRecipe.name}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-[#2A7F7F] group-hover:border-[#2A7F7F] transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full text-center py-10 text-[10px] tracking-widest text-slate-400 font-light select-none border-t border-black/[0.02] bg-white/20 relative z-10">
        BUILT IN THE OPEN. ONE BATCH AT A TIME.
      </footer>
    </div>
  );
}
