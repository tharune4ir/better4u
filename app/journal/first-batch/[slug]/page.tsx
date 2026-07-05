"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Lightbulb, 
  Shuffle, 
  BookOpen, 
  Flame, 
  Clock, 
  UtensilsCrossed 
} from "lucide-react";
import Navbar, { NavTab } from "@/components/Navbar";
import { RECIPES, Recipe } from "@/lib/recipes-data";

export default function RecipeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [activeNavTab, setActiveNavTab] = useState<NavTab>("journal");

  // Find the recipe index
  const recipeIndex = RECIPES.findIndex(r => r.slug === slug);
  const recipe = RECIPES[recipeIndex];

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

  if (!recipe) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F7F6F2] text-slate-900 justify-between">
        <Navbar activeTab="journal" setActiveTab={handleTabChange} />
        <main className="flex-1 max-w-xl mx-auto px-6 py-24 text-center space-y-4">
          <UtensilsCrossed className="w-12 h-12 text-[#2A7F7F] mx-auto opacity-50" />
          <h2 className="text-2xl font-light">Recipe Not Found</h2>
          <p className="text-slate-500 font-light text-sm">We couldn't find the recipe page you were looking for.</p>
          <button 
            onClick={() => router.push("/journal/first-batch")}
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
  const prevRecipe = RECIPES[(recipeIndex - 1 + RECIPES.length) % RECIPES.length];
  const nextRecipe = RECIPES[(recipeIndex + 1) % RECIPES.length];

  // Parse ingredients
  const ingredientList = recipe.ingredients.split(" · ");

  // Toggle checklist
  const toggleIngredient = (idx: number) => {
    setCheckedIngredients(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleStep = (idx: number) => {
    setCheckedSteps(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // F-GOALS Full meanings map
  const fGoalsLabels: Record<string, { label: string; desc: string }> = {
    "F": { label: "Fermentable Fibers", desc: "feeds beneficial microbes" },
    "G": { label: "Greens & Prebiotics", desc: "strengthens mucosal barrier" },
    "O": { label: "Oats & Grains", desc: "supplies beta-glucans and slow starch" },
    "A": { label: "Ancestral Foods", desc: "traditional wild ferments and grains" },
    "L": { label: "Legumes", desc: "high soluble fibers and plant protein" },
    "S": { label: "Seeds & Polyphenols", desc: "diverse antioxidants and healthy fats" }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F2] text-slate-900 relative overflow-hidden">
      <Navbar activeTab="journal" setActiveTab={handleTabChange} />

      {/* Main Body */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-8 pb-24 z-10 relative space-y-8">
        
        {/* BACK TO COLLECTION LINK */}
        <button 
          onClick={() => router.push("/journal/first-batch")}
          className="text-xs font-semibold text-slate-400 hover:text-[#2A7F7F] transition-colors flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to First Batch collection</span>
        </button>

        {/* TITLE & META INFO */}
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest text-[#2A7F7F] uppercase">
            <span>{recipe.group}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <span>Recipe {recipe.number} of 21</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
            <h1 className="text-3xl sm:text-4xl font-extralight tracking-tight text-slate-900 leading-tight">
              {recipe.title}
            </h1>
            
            <div className="flex items-center gap-2 bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-4 py-2 rounded-full self-start">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Plant Points</span>
              <span className="text-base font-bold text-[#2A7F7F]">+{recipe.plantPoints}</span>
            </div>
          </div>
        </div>

        {/* TWO-COLUMN GRID DETAIL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Overview, Image, and F-GOALS */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Recipe Image */}
            <div className="bg-white p-3 rounded-3xl border border-black/[0.03] shadow-md overflow-hidden">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 relative">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Why It's Here Box */}
            <div className="bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 rounded-2xl p-6 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2A7F7F]">Why it's here</h4>
              <p className="text-sm text-slate-650 font-light leading-relaxed">
                {recipe.why}
              </p>
            </div>

            {/* F-GOALS Tags list explained */}
            <div className="bg-white/50 border border-black/[0.03] rounded-2xl p-6 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Digestive Healing Targets</h4>
              <div className="space-y-3">
                {recipe.tags.map((tag) => {
                  const target = fGoalsLabels[tag];
                  return (
                    <div key={tag} className="flex gap-3 text-xs leading-relaxed">
                      <span className="w-6 h-6 rounded-full bg-[#2A7F7F] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                        {tag}
                      </span>
                      <div>
                        <strong className="text-slate-800">{target?.label || tag}</strong>
                        <span className="text-slate-500 font-light block sm:inline"> — {target?.desc || ""}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Ingredients & Steps */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Ingredients Card */}
            <div className="bg-white rounded-3xl border border-black/[0.03] p-6 md:p-8 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 border-b border-black/[0.04] pb-3">
                <BookOpen className="w-4 h-4 text-[#2A7F7F]" />
                <h3 className="font-semibold text-slate-850 tracking-wide uppercase text-sm">Ingredients</h3>
              </div>
              
              <ul className="space-y-3">
                {ingredientList.map((ing, idx) => {
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
                      <span className={`text-sm md:text-base transition-colors leading-relaxed ${
                        isChecked ? "text-slate-350 line-through font-light" : "text-slate-700 font-light"
                      }`}>
                        {ing}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Steps Card */}
            <div className="bg-white rounded-3xl border border-black/[0.03] p-6 md:p-8 space-y-5 shadow-sm">
              <div className="flex items-center gap-2 border-b border-black/[0.04] pb-3">
                <Flame className="w-4 h-4 text-[#2A7F7F]" />
                <h3 className="font-semibold text-slate-850 tracking-wide uppercase text-sm">Step-by-Step Directions</h3>
              </div>

              <ol className="space-y-4">
                {recipe.steps.map((step, idx) => {
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

            {/* Hacks & Swaps Cards side-by-side/stacked */}
            {(recipe.hacks || recipe.swaps) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recipe.hacks && (
                  <div className="bg-white/60 p-5 rounded-2xl border border-black/[0.03] space-y-2">
                    <div className="flex items-center gap-2 text-amber-600">
                      <Lightbulb className="w-4 h-4" />
                      <h5 className="font-semibold text-xs uppercase tracking-wider">Kitchen Hack</h5>
                    </div>
                    <p className="text-xs text-slate-500 font-light leading-relaxed">
                      {recipe.hacks}
                    </p>
                  </div>
                )}

                {recipe.swaps && (
                  <div className="bg-white/60 p-5 rounded-2xl border border-black/[0.03] space-y-2">
                    <div className="flex items-center gap-2 text-[#2A7F7F]">
                      <Shuffle className="w-4 h-4" />
                      <h5 className="font-semibold text-xs uppercase tracking-wider">Better-for-You Swap</h5>
                    </div>
                    <p className="text-xs text-slate-500 font-light leading-relaxed">
                      {recipe.swaps}
                    </p>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

        {/* BOTTOM NAVIGATION: Previous / Next Recipe Carousel */}
        <div className="border-t border-black/[0.05] pt-12 mt-12">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-6">
            Navigate the 21 Recipes
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {/* Previous Recipe Card */}
            <div 
              onClick={() => {
                setCheckedIngredients({});
                setCheckedSteps({});
                router.push(`/journal/first-batch/${prevRecipe.slug}`);
              }}
              className="group cursor-pointer bg-white/40 border border-black/[0.03] p-4 rounded-2xl flex items-center justify-between hover:bg-white hover:shadow-sm transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <img src={prevRecipe.image} alt={prevRecipe.title} className="w-full h-full object-cover" />
                </div>
                <div className="text-left">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
                    ← Previous · Recipe {prevRecipe.number}
                  </span>
                  <span className="text-xs font-semibold text-slate-800 line-clamp-1 group-hover:text-[#2A7F7F] transition-colors">
                    {prevRecipe.title}
                  </span>
                </div>
              </div>
              <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-0.5 transition-transform" />
            </div>

            {/* Next Recipe Card */}
            <div 
              onClick={() => {
                setCheckedIngredients({});
                setCheckedSteps({});
                router.push(`/journal/first-batch/${nextRecipe.slug}`);
              }}
              className="group cursor-pointer bg-white/40 border border-black/[0.03] p-4 rounded-2xl flex items-center justify-between hover:bg-white hover:shadow-sm transition-all duration-300"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <img src={nextRecipe.image} alt={nextRecipe.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-[#2A7F7F] uppercase tracking-widest block">
                    Next · Recipe {nextRecipe.number} →
                  </span>
                  <span className="text-xs font-semibold text-slate-800 line-clamp-1 group-hover:text-[#2A7F7F] transition-colors">
                    {nextRecipe.title}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
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
