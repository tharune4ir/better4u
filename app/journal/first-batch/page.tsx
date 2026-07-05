"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Check, 
  Plus, 
  RotateCcw, 
  BookOpen, 
  Utensils, 
  Info,
  Calendar,
  Sparkles,
  ClipboardList
} from "lucide-react";
import Navbar, { NavTab } from "@/components/Navbar";
import { RECIPES, INTRO_SECTIONS, GROUP_ORDER, Recipe } from "@/lib/recipes-data";

export default function FirstBatchCollectionPage() {
  const router = useRouter();
  const [activeNavTab, setActiveNavTab] = useState<NavTab>("journal");
  const [activeContentTab, setActiveContentTab] = useState<"guide" | "recipes">("guide");

  // Filtering state
  const [selectedGroup, setSelectedGroup] = useState<string>("All");
  const [selectedFGoals, setSelectedFGoals] = useState<string[]>([]);
  
  // Selected Recipes for Plant Points Calculator
  const [selectedRecipeSlugs, setSelectedRecipeSlugs] = useState<string[]>([]);

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

  // Toggle F-GOALS tag filter
  const toggleFGoalTag = (tag: string) => {
    if (selectedFGoals.includes(tag)) {
      setSelectedFGoals(selectedFGoals.filter(t => t !== tag));
    } else {
      setSelectedFGoals([...selectedFGoals, tag]);
    }
  };

  // Toggle recipe on the plate
  const toggleRecipeOnPlate = (slug: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card navigation click
    if (selectedRecipeSlugs.includes(slug)) {
      setSelectedRecipeSlugs(selectedRecipeSlugs.filter(s => s !== slug));
    } else {
      setSelectedRecipeSlugs([...selectedRecipeSlugs, slug]);
    }
  };

  // Calculate live total plant points on the plate
  const totalPlantPoints = RECIPES
    .filter(r => selectedRecipeSlugs.includes(r.slug))
    .reduce((sum, r) => sum + r.plantPoints, 0);

  // Filter recipes based on group and F-GOALS tags
  const filteredRecipes = RECIPES.filter(recipe => {
    const matchesGroup = selectedGroup === "All" || recipe.group === selectedGroup;
    const matchesFGoals = selectedFGoals.length === 0 || 
      selectedFGoals.every(tag => recipe.tags.includes(tag));
    return matchesGroup && matchesFGoals;
  });

  const fGoalsDefinitions = INTRO_SECTIONS.startHere.fGoals;

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F2] text-slate-900 relative overflow-hidden">
      <Navbar activeTab="journal" setActiveTab={handleTabChange} />

      {/* HEADER SECTION */}
      <header className="w-full max-w-4xl mx-auto px-6 pt-12 md:pt-16 pb-8 space-y-4 z-10 relative">
        <button 
          onClick={() => router.push("/journal")}
          className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Journal Hub</span>
        </button>

        <div className="space-y-3">
          <span className="text-[10px] tracking-widest text-[#2A7F7F] font-bold uppercase bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-3 py-1 rounded-full inline-block">
            Collection index
          </span>
          <h1 className="text-4xl sm:text-5xl font-extralight tracking-tight text-slate-900">
            First Batch
          </h1>
          <p className="text-sm sm:text-base text-slate-500 font-light max-w-2xl leading-relaxed">
            21 simple recipes to start cooking real food that actually tastes good — even if you've never cooked before.
          </p>
        </div>

        {/* TAB TOGGLE: Guide vs Recipes */}
        <div className="flex border-b border-black/[0.06] pt-8">
          <button
            onClick={() => setActiveContentTab("guide")}
            className={`pb-4 px-6 text-sm font-semibold tracking-wide uppercase transition-all duration-300 relative ${
              activeContentTab === "guide" 
                ? "text-[#2A7F7F]" 
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              The Guide
            </span>
            {activeContentTab === "guide" && (
              <motion.div 
                layoutId="activeContentTabBorder" 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2A7F7F]" 
              />
            )}
          </button>
          
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
              21 Recipes
            </span>
            {activeContentTab === "recipes" && (
              <motion.div 
                layoutId="activeContentTabBorder" 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2A7F7F]" 
              />
            )}
          </button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 pb-24 z-10 relative">
        <AnimatePresence mode="wait">
          {activeContentTab === "guide" ? (
            <motion.div
              key="guide-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-16 max-w-3xl mx-auto"
            >
              {/* INTRO SUMMARY */}
              <section className="bg-white/40 glassmorphic p-6 md:p-8 rounded-[2rem] border border-black/[0.03] text-slate-700 text-sm md:text-base leading-relaxed space-y-4">
                <p className="font-light italic text-slate-650">
                  A Trelis Journal collection. Your starting set: real food, made simple. Everything here is vegetarian, made without wheat, without fluid milk, and without a grain of added sugar — gentle on your system, and doable in a tiny kitchen with nothing but a pressure cooker, a gas stove, and a fridge.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="bg-white/50 p-5 rounded-2xl border border-black/[0.02] space-y-1">
                    <span className="text-[10px] font-bold text-[#2A7F7F] uppercase tracking-widest block">Why "First Batch"?</span>
                    <p className="text-xs text-slate-555 font-light leading-relaxed">These are the everyday dishes you cook on repeat — the foundation you master first, one batch at a time. Learn these and you can cook for yourself, for good.</p>
                  </div>
                  <div className="bg-white/50 p-5 rounded-2xl border border-black/[0.02] space-y-1">
                    <span className="text-[10px] font-bold text-[#2A7F7F] uppercase tracking-widest block">How to read this:</span>
                    <p className="text-xs text-slate-555 font-light leading-relaxed">Start with Start Here and Your Tiny Kitchen once. After that, you never need theory again — just rotate the 21 recipes. Every recipe tells you why it's good for you, exactly what to buy, and every step as if it's your first day in a kitchen.</p>
                  </div>
                </div>
              </section>

              {/* 1. START HERE */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-black/[0.05] pb-3">
                  <span className="bg-[#2A7F7F]/10 text-[#2A7F7F] font-mono text-xs font-bold px-2.5 py-1 rounded-md">01</span>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">{INTRO_SECTIONS.startHere.title}</h3>
                </div>
                <div className="space-y-6 text-sm md:text-base text-slate-650 font-light leading-relaxed">
                  <p>
                    You are not on a diet. You are cooking real, nourishing food that is genuinely good for you — when your digestion is happy, your energy, skin, mood and immunity all follow. Three simple pillars run everything in this guide:
                  </p>

                  {/* 3 Pillars layout */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex gap-4 p-5 bg-white/40 rounded-2xl border border-black/[0.02] hover:bg-white hover:border-[#2A7F7F]/10 hover:shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-all">
                      <div className="w-8 h-8 rounded-full bg-[#2A7F7F]/10 text-[#2A7F7F] font-bold flex items-center justify-center flex-shrink-0 text-sm font-mono">1</div>
                      <div className="space-y-1">
                        <h4 className="font-semibold text-slate-800 text-sm md:text-base">Diversity</h4>
                        <p className="text-xs md:text-sm text-slate-555 leading-relaxed">Eat many different plants across a week (aim for 30+). Every vegetable, fruit, lentil, herb, spice, nut and seed counts as one. Variety matters more than quantity.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 p-5 bg-white/40 rounded-2xl border border-black/[0.02] hover:bg-white hover:border-[#2A7F7F]/10 hover:shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-all">
                      <div className="w-8 h-8 rounded-full bg-[#2A7F7F]/10 text-[#2A7F7F] font-bold flex items-center justify-center flex-shrink-0 text-sm font-mono">2</div>
                      <div className="space-y-1">
                        <h4 className="font-semibold text-slate-800 text-sm md:text-base">Fermented Foods</h4>
                        <p className="text-xs md:text-sm text-slate-555 leading-relaxed">Eat something naturally cultured most days (homemade curd, idli, a spoon of home-ferment). These add live, friendly microbes.</p>
                      </div>
                    </div>

                    <div className="flex gap-4 p-5 bg-white/40 rounded-2xl border border-black/[0.02] hover:bg-white hover:border-[#2A7F7F]/10 hover:shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-all">
                      <div className="w-8 h-8 rounded-full bg-[#2A7F7F]/10 text-[#2A7F7F] font-bold flex items-center justify-center flex-shrink-0 text-sm font-mono">3</div>
                      <div className="space-y-1">
                        <h4 className="font-semibold text-slate-800 text-sm md:text-base">Fibre That Feeds Them</h4>
                        <p className="text-xs md:text-sm text-slate-555 leading-relaxed">Lentils, vegetables, fruit, seeds and gentle whole grains are prebiotic-rich foods that support your digestion.</p>
                      </div>
                    </div>
                  </div>

                  {/* Golden Rule Callout */}
                  <div className="bg-amber-500/[0.03] border-l-2 border-amber-600/40 p-6 rounded-r-2xl space-y-2">
                    <span className="text-[10px] font-bold tracking-widest text-amber-700 uppercase block">The Golden Rule of this Kitchen</span>
                    <h4 className="font-semibold text-slate-800 text-sm md:text-base">Gentle First</h4>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-light">
                      A calm system prefers food that is soft, well-cooked, and soluble-fibre-forward — think dals, khichdi, curd rice, cooked vegetables and porridges — over piles of raw, rough, bran-heavy food. So we start low and go slow: add new plants gradually, cook things properly soft, and let your system adjust over weeks, not days. This is why nothing here is spicy, oily, or heavy — gentle food is what actually heals.
                    </p>
                  </div>

                  {/* Rest and Q&A */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/50 p-5 rounded-2xl border border-black/[0.03] space-y-2">
                      <h4 className="font-semibold text-slate-800 text-sm md:text-base">Give Your Digestion a Rest</h4>
                      <p className="text-xs md:text-sm text-slate-555 leading-relaxed font-light">
                        Your system does its cleaning and repair between meals, not during them. So this guide fits naturally with an eating window (for example, two solid meals in the day with a long overnight gap) and avoids constant snacking. Two complete, nourishing meals beat six scattered ones.
                      </p>
                    </div>

                    <div className="bg-white/50 p-5 rounded-2xl border border-black/[0.03] space-y-2">
                      <h4 className="font-semibold text-slate-800 text-sm md:text-base">Why no sugar, wheat, or fluid milk?</h4>
                      <p className="text-xs md:text-sm text-slate-555 leading-relaxed font-light">
                        Added sugar feeds the wrong microbes and drives inflammation. Wheat and fluid milk are two of the most common things sensitive systems feel better without. Take them out and most people feel lighter within a week — so this whole kitchen is built without them, and you won't miss them.
                      </p>
                    </div>
                  </div>
                </div>

                {/* F-GOALS Table */}
                <div className="bg-white/50 rounded-2xl border border-black/[0.03] overflow-hidden mt-6 shadow-sm">
                  <div className="p-5 bg-[#2A7F7F]/5 border-b border-black/[0.03]">
                    <h4 className="font-semibold text-slate-800 text-sm">{fGoalsDefinitions.title}</h4>
                    <p className="text-xs text-slate-500 font-light">{fGoalsDefinitions.subtitle}</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs md:text-sm">
                      <thead>
                        <tr className="border-b border-black/[0.03] bg-white/20 text-slate-400 uppercase tracking-widest font-bold text-[10px]">
                          <th className="p-4 w-20 text-center">{fGoalsDefinitions.headers[0]}</th>
                          <th className="p-4 w-44">{fGoalsDefinitions.headers[1]}</th>
                          <th className="p-4">{fGoalsDefinitions.headers[2]}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/[0.03]">
                        {fGoalsDefinitions.rows.map((row, idx) => (
                          <tr key={idx} className="hover:bg-white/40 transition-colors">
                            <td className="p-4 text-center">
                              <span className="w-8 h-8 rounded-full bg-[#2A7F7F] text-white flex items-center justify-center font-bold text-xs mx-auto">
                                {row[0]}
                              </span>
                            </td>
                            <td className="p-4 font-semibold text-slate-800">{row[1]}</td>
                            <td className="p-4 text-slate-555 font-light leading-relaxed">{row[2]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* 2. YOUR TINY KITCHEN */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-black/[0.05] pb-3">
                  <span className="bg-[#2A7F7F]/10 text-[#2A7F7F] font-mono text-xs font-bold px-2.5 py-1 rounded-md">02</span>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">{INTRO_SECTIONS.tinyKitchen.title}</h3>
                </div>
                <div className="space-y-6 text-sm md:text-base text-slate-655 font-light leading-relaxed">
                  <p>
                    A clean kitchen requires minimal equipment. No oven, no air-fryer, no complex tools. Just basic heat, pressure, and chopping:
                  </p>

                  {/* Equipment Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="bg-white/50 p-4 rounded-xl border border-black/[0.02] text-center space-y-1">
                      <span className="text-xl">🍲</span>
                      <h5 className="font-semibold text-slate-800 text-xs uppercase tracking-wider">Pressure Cooker</h5>
                      <p className="text-[10px] text-slate-500 font-light leading-snug">Essential for cooking soft grains & lentils.</p>
                    </div>
                    <div className="bg-white/50 p-4 rounded-xl border border-black/[0.02] text-center space-y-1">
                      <span className="text-xl">🔥</span>
                      <h5 className="font-semibold text-slate-800 text-xs uppercase tracking-wider">Gas Stove</h5>
                      <p className="text-[10px] text-slate-500 font-light leading-snug">The heat source for tempering and boiling.</p>
                    </div>
                    <div className="bg-white/50 p-4 rounded-xl border border-black/[0.02] text-center space-y-1">
                      <span className="text-xl">❄️</span>
                      <h5 className="font-semibold text-slate-800 text-xs uppercase tracking-wider">Fridge</h5>
                      <p className="text-[10px] text-slate-500 font-light leading-snug">For resisting starches and storing starters.</p>
                    </div>
                    <div className="bg-white/50 p-4 rounded-xl border border-black/[0.02] text-center space-y-1">
                      <span className="text-xl">🍳</span>
                      <h5 className="font-semibold text-slate-800 text-xs uppercase tracking-wider">Kadai / Pan</h5>
                      <p className="text-[10px] text-slate-500 font-light leading-snug">For tempering (tadkas) and stir-fries.</p>
                    </div>
                    <div className="bg-white/50 p-4 rounded-xl border border-black/[0.02] text-center space-y-1">
                      <span className="text-xl">🥄</span>
                      <h5 className="font-semibold text-slate-800 text-xs uppercase tracking-wider">Ladle</h5>
                      <p className="text-[10px] text-slate-500 font-light leading-snug">For stirring and serving soft textures.</p>
                    </div>
                    <div className="bg-white/50 p-4 rounded-xl border border-black/[0.02] text-center space-y-1">
                      <span className="text-xl">🔪</span>
                      <h5 className="font-semibold text-slate-800 text-xs uppercase tracking-wider">Board & Knife</h5>
                      <p className="text-[10px] text-slate-500 font-light leading-snug">For fine chopping so vegetables cook soft.</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/50 p-6 rounded-2xl border border-black/[0.03] space-y-4 shadow-sm">
                    <h4 className="font-semibold text-slate-850 text-sm md:text-base border-b border-black/[0.03] pb-2">
                      {INTRO_SECTIONS.tinyKitchen.pantryTitle}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {INTRO_SECTIONS.tinyKitchen.pantryItems.map((item, idx) => {
                        const [title, desc] = item.split(": ");
                        return (
                          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                            <span className="w-5 h-5 rounded-full bg-[#2A7F7F]/10 text-[#2A7F7F] font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5 select-none font-mono">
                              {idx + 1}
                            </span>
                            <div className="space-y-0.5">
                              <strong className="text-slate-800 font-semibold">{title}</strong>
                              {desc && <span className="text-slate-500 font-light block leading-relaxed">{desc}</span>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-xs text-slate-400 italic pt-3 border-t border-black/[0.03] leading-relaxed">
                      {INTRO_SECTIONS.tinyKitchen.note}
                    </p>
                  </div>
                </div>
              </section>

              {/* 3. MASTER TECHNIQUES */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-black/[0.05] pb-3">
                  <span className="bg-[#2A7F7F]/10 text-[#2A7F7F] font-mono text-xs font-bold px-2.5 py-1 rounded-md">03</span>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">{INTRO_SECTIONS.masterTechniques.title}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {INTRO_SECTIONS.masterTechniques.techniques.map((tech, idx) => (
                    <div key={idx} className="bg-white/50 p-6 rounded-2xl border border-black/[0.03] space-y-2 hover:shadow-sm hover:border-[#2A7F7F]/10 transition-all duration-300">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-slate-800 text-sm md:text-base">{tech.name.replace(/^\d+\.\s*/, "")}</h4>
                        <span className="text-[10px] font-bold text-slate-450 font-mono">TECH 0{idx + 1}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">{tech.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 4. THE ROTATING CORE */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-black/[0.05] pb-3">
                  <span className="bg-[#2A7F7F]/10 text-[#2A7F7F] font-mono text-xs font-bold px-2.5 py-1 rounded-md">04</span>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">{INTRO_SECTIONS.rotatingCore.title}</h3>
                </div>
                <div className="space-y-6 text-sm md:text-base text-slate-655 font-light leading-relaxed">
                  <p>
                    A sensitive system does not want a diet of constant variety and novel ingredients. It wants stability, with controlled diversity. That is the philosophy behind our rotating core.
                  </p>

                  {/* Flowchart/Equation Layout */}
                  <div className="bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 rounded-2xl p-6 text-center space-y-4">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#2A7F7F]">The Daily Rhythm Equation</div>
                    <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs md:text-sm font-semibold text-slate-850">
                      <span className="bg-white px-3 py-1.5 rounded-xl border border-black/[0.03]">1 Base</span>
                      <span className="text-slate-400 font-light">+</span>
                      <span className="bg-white px-3 py-1.5 rounded-xl border border-black/[0.03]">1 Protein</span>
                      <span className="text-slate-400 font-light">+</span>
                      <span className="bg-white px-3 py-1.5 rounded-xl border border-black/[0.03]">1 Veg</span>
                      <span className="text-slate-400 font-light">+</span>
                      <span className="bg-white px-3 py-1.5 rounded-xl border border-black/[0.03]">1 Ferment</span>
                    </div>
                  </div>

                  {/* Equation Components list */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/50 p-5 rounded-2xl border border-black/[0.03] space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#2A7F7F]" />
                        <h4 className="font-semibold text-slate-800 text-sm">Base & Protein</h4>
                      </div>
                      <ul className="space-y-1.5 text-xs md:text-sm text-slate-555 list-none pl-4">
                        <li className="flex gap-2">
                          <span className="text-[#2A7F7F] font-semibold select-none">·</span>
                          <span><strong>Base:</strong> Red Matta rice, khichdi, idli, or a porridge</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#2A7F7F] font-semibold select-none">·</span>
                          <span><strong>Protein:</strong> A dal or legume</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white/50 p-5 rounded-2xl border border-black/[0.03] space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#2A7F7F]" />
                        <h4 className="font-semibold text-slate-800 text-sm">Veg & Ferment</h4>
                      </div>
                      <ul className="space-y-1.5 text-xs md:text-sm text-slate-555 list-none pl-4">
                        <li className="flex gap-2">
                          <span className="text-[#2A7F7F] font-semibold select-none">·</span>
                          <span><strong>Veg:</strong> One gentle vegetable dish (rotated daily)</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#2A7F7F] font-semibold select-none">·</span>
                          <span><strong>Ferment:</strong> A spoon of curd, raita, or a home-ferment</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Tips Box */}
                  <div className="bg-white/50 p-5 rounded-2xl border border-black/[0.03] space-y-3">
                    <h4 className="font-semibold text-slate-800 text-sm md:text-base">Everyday Rhythm Guidelines:</h4>
                    <div className="space-y-2 text-xs md:text-sm text-slate-555 leading-relaxed font-light">
                      <div className="flex gap-3 items-start">
                        <span className="text-[#2A7F7F] font-semibold mt-0.5">•</span>
                        <p>Rotate the vegetable and dal daily, keep the base familiar, and add a chutney/podi or fruit for extra plant points.</p>
                      </div>
                      <div className="flex gap-3 items-start">
                        <span className="text-[#2A7F7F] font-semibold mt-0.5">•</span>
                        <p>One "gentle day" a week (or whenever your stomach feels off): keep it to khichdi, curd rice, and ripe banana.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 5. THE MILLET GUIDE */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-black/[0.05] pb-3">
                  <span className="bg-[#2A7F7F]/10 text-[#2A7F7F] font-mono text-xs font-bold px-2.5 py-1 rounded-md">05</span>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">{INTRO_SECTIONS.milletGuide.title}</h3>
                </div>
                <div className="space-y-4 text-sm md:text-base text-slate-655 font-light leading-relaxed">
                  <p>{INTRO_SECTIONS.milletGuide.intro}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {INTRO_SECTIONS.milletGuide.items.map((item, idx) => {
                      const [title, desc] = item.split(": ");
                      return (
                        <div key={idx} className="bg-white/50 p-5 rounded-2xl border border-black/[0.03] space-y-1 hover:shadow-sm transition-all duration-300">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-[#2A7F7F]/10 text-[#2A7F7F] font-bold text-[10px] flex items-center justify-center flex-shrink-0 font-mono">0{idx + 1}</span>
                            <h4 className="font-semibold text-slate-800 text-xs sm:text-sm uppercase tracking-wider">{title}</h4>
                          </div>
                          {desc && <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">{desc}</p>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* 6. GENTLE DAYS */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-black/[0.05] pb-3">
                  <span className="bg-[#2A7F7F]/10 text-[#2A7F7F] font-mono text-xs font-bold px-2.5 py-1 rounded-md">06</span>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">{INTRO_SECTIONS.gentleDays.title}</h3>
                </div>
                <div className="space-y-6 text-sm md:text-base text-slate-655 font-light leading-relaxed">
                  <p>{INTRO_SECTIONS.gentleDays.intro}</p>
                  
                  {/* Protocol checklist */}
                  <div className="bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 p-6 rounded-2xl space-y-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#2A7F7F]" />
                      <h4 className="font-bold text-xs uppercase tracking-wider text-[#2A7F7F]">Calming Protocol Checklist</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm text-slate-700">
                      {INTRO_SECTIONS.gentleDays.items.map((item, idx) => (
                        <div key={idx} className="flex gap-2.5 items-start bg-white/70 p-3.5 rounded-xl border border-black/[0.02]">
                          <Check className="w-4 h-4 text-[#2A7F7F] flex-shrink-0 mt-0.5" />
                          <span className="font-light">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="italic text-slate-500 text-sm text-center font-light pt-2">
                    "{INTRO_SECTIONS.gentleDays.outro}"
                  </p>
                </div>
              </section>

              {/* 7. SYSTEMS THAT MAKE THIS EASY */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-black/[0.05] pb-3">
                  <span className="bg-[#2A7F7F]/10 text-[#2A7F7F] font-mono text-xs font-bold px-2.5 py-1 rounded-md">07</span>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">{INTRO_SECTIONS.systemsEasy.title}</h3>
                </div>
                <div className="space-y-4">
                  {INTRO_SECTIONS.systemsEasy.items.map((sys, idx) => {
                    // Check if it's the shopping list (sys 2) to render it with beautiful categorized tags
                    const isShoppingList = sys.name.toLowerCase().includes("shopping list");
                    
                    return (
                      <div key={idx} className="bg-white/50 p-6 rounded-2xl border border-black/[0.03] space-y-3 hover:shadow-sm hover:border-[#2A7F7F]/10 transition-all duration-300">
                        <div className="flex items-center gap-2">
                          <span className="text-[#2A7F7F] font-semibold text-xs tracking-wider font-mono">SYSTEM 0{idx + 1}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                          <h4 className="font-semibold text-slate-850 text-sm md:text-base">{sys.name}</h4>
                        </div>
                        
                        {isShoppingList ? (
                          <div className="space-y-3 pt-2">
                            <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">{sys.text.split("Grain")[0].trim()}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                              <div className="bg-white/80 p-3.5 rounded-xl border border-black/[0.02] space-y-1.5">
                                <span className="font-bold text-[#2A7F7F] uppercase tracking-wider text-[9px] block">Grains</span>
                                <span className="text-slate-655 font-light block leading-relaxed">Kerala Red Matta rice, idli rice, foxtail millet, little millet, ragi flour</span>
                              </div>
                              <div className="bg-white/80 p-3.5 rounded-xl border border-black/[0.02] space-y-1.5">
                                <span className="font-bold text-[#2A7F7F] uppercase tracking-wider text-[9px] block">Lentils</span>
                                <span className="text-slate-655 font-light block leading-relaxed">Moong dal, toor dal, masoor dal, urad dal, chana dal, roasted chana</span>
                              </div>
                              <div className="bg-white/80 p-3.5 rounded-xl border border-black/[0.02] space-y-1.5">
                                <span className="font-bold text-[#2A7F7F] uppercase tracking-wider text-[9px] block">Veggies & Aromatics</span>
                                <span className="text-slate-655 font-light block leading-relaxed">Bottle gourd, carrot, beans, beetroot, tomato, ginger, garlic, curry leaves</span>
                              </div>
                              <div className="bg-white/80 p-3.5 rounded-xl border border-black/[0.02] space-y-1.5">
                                <span className="font-bold text-[#2A7F7F] uppercase tracking-wider text-[9px] block">Pantry & Seeds</span>
                                <span className="text-slate-655 font-light block leading-relaxed">Ghee, coconut, flax, chia, pumpkin seeds, groundnuts, walnuts, spices, gluten-free hing</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed whitespace-pre-line">{sys.text}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* GENTLE NOTE / MEDICAL DISCLAIMER */}
              <section className="bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 rounded-2xl p-6 space-y-3 shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]">
                <div className="flex items-center gap-2 text-[#2A7F7F]">
                  <Info className="w-4 h-4" />
                  <h4 className="font-bold text-xs uppercase tracking-wider">{INTRO_SECTIONS.gentleNote.title}</h4>
                </div>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  {INTRO_SECTIONS.gentleNote.text}
                </p>
              </section>

              {/* CTA TO RECIPES */}
              <div className="pt-6 flex justify-center">
                <button
                  onClick={() => {
                    setActiveContentTab("recipes");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="px-8 py-3.5 bg-[#2A7F7F] hover:bg-[#1e5c5c] text-white rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-3 cursor-pointer shadow-[0_4px_14px_rgba(42,127,127,0.3)] group"
                >
                  <span>Explore the 21 Recipes</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="recipes-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              
              {/* FILTERING CONTROLS */}
              <div className="bg-white/60 p-6 rounded-3xl border border-black/[0.03] space-y-6 shadow-sm">
                
                {/* Food Group Filters */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                    Filter by Group
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedGroup("All")}
                      className={`px-3 py-1.5 rounded-full text-xs transition-all duration-300 ${
                        selectedGroup === "All"
                          ? "bg-[#2A7F7F] text-white font-semibold"
                          : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      All
                    </button>
                    {GROUP_ORDER.map((group) => (
                      <button
                        key={group}
                        onClick={() => setSelectedGroup(group)}
                        className={`px-3 py-1.5 rounded-full text-xs transition-all duration-300 ${
                          selectedGroup === group
                            ? "bg-[#2A7F7F] text-white font-semibold"
                            : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {group}
                      </button>
                    ))}
                  </div>
                </div>

                {/* F-GOALS Interactive Tagging */}
                <div className="space-y-3 pt-2 border-t border-black/[0.03]">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                      F-GOALS Tag Filtering
                    </span>
                    {selectedFGoals.length > 0 && (
                      <button 
                        onClick={() => setSelectedFGoals([])}
                        className="text-[10px] font-bold text-[#2A7F7F] hover:text-[#1e5c5c] flex items-center gap-1 transition-colors uppercase tracking-widest"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Clear Tags
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                    {["F", "G", "O", "A", "L", "S"].map((tag) => {
                      const isSelected = selectedFGoals.includes(tag);
                      const fGoalRow = fGoalsDefinitions.rows.find(row => row[0] === tag);
                      return (
                        <button
                          key={tag}
                          onClick={() => toggleFGoalTag(tag)}
                          className={`flex flex-col items-center p-2.5 rounded-xl border text-center transition-all duration-300 ${
                            isSelected
                              ? "bg-[#2A7F7F]/10 border-[#2A7F7F] text-[#2A7F7F]"
                              : "bg-white border-slate-100 hover:border-slate-200 text-slate-600"
                          }`}
                        >
                          <span className="text-lg font-bold">{tag}</span>
                          <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400 mt-0.5">
                            {fGoalRow ? fGoalRow[1].split(" & ")[0] : ""}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* RECIPES LIST SUMMARY & FILTER STATUS */}
              <div className="flex items-center justify-between px-2">
                <span className="text-xs text-slate-500 font-light">
                  Showing <strong className="font-semibold text-slate-800">{filteredRecipes.length}</strong> of 21 recipes
                </span>
                
                {(selectedGroup !== "All" || selectedFGoals.length > 0) && (
                  <button
                    onClick={() => {
                      setSelectedGroup("All");
                      setSelectedFGoals([]);
                    }}
                    className="text-xs font-semibold text-[#2A7F7F] hover:text-[#1e5c5c] transition-colors"
                  >
                    Reset Filters
                  </button>
                )}
              </div>

              {/* RECIPE GRID */}
              {filteredRecipes.length === 0 ? (
                <div className="bg-white/40 border border-dashed border-slate-200 rounded-3xl p-12 text-center text-slate-400 font-light text-sm">
                  No recipes match the selected filters.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredRecipes.map((recipe) => {
                    const isOnPlate = selectedRecipeSlugs.includes(recipe.slug);
                    return (
                      <motion.div
                        key={recipe.slug}
                        layout
                        onClick={() => router.push(`/journal/first-batch/${recipe.slug}`)}
                        className="group cursor-pointer bg-white rounded-3xl border border-black/[0.03] shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.025)] overflow-hidden flex flex-col justify-between transition-all duration-300"
                      >
                        <div>
                          {/* Recipe Image */}
                          <div className="relative aspect-[16/10] w-full bg-[#f3f0e8] overflow-hidden">
                            <img
                              src={recipe.image}
                              alt={recipe.title}
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                            {/* Plant Points Count Float */}
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-black/[0.03] flex items-center gap-1 shadow-sm">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Points</span>
                              <span className="text-xs font-bold text-[#2A7F7F]">+{recipe.plantPoints}</span>
                            </div>

                            {/* F-GOALS tag list */}
                            <div className="absolute bottom-4 left-4 flex gap-1">
                              {recipe.tags.map((tag) => (
                                <span 
                                  key={tag}
                                  className="w-5 h-5 rounded-full bg-[#2A7F7F] text-white flex items-center justify-center font-bold text-[9px] shadow-sm border border-white/20"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {/* Add/Remove Plate toggle float */}
                            <button
                              onClick={(e) => toggleRecipeOnPlate(recipe.slug, e)}
                              className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 shadow-sm ${
                                isOnPlate
                                  ? "bg-[#2A7F7F] border-[#2A7F7F] text-white"
                                  : "bg-white/95 border-slate-200 text-slate-600 hover:bg-white"
                              }`}
                            >
                              {isOnPlate ? (
                                <Check className="w-4 h-4 stroke-[3]" />
                              ) : (
                                <Plus className="w-4 h-4 stroke-[3]" />
                              )}
                            </button>
                          </div>

                          {/* Recipe Info */}
                          <div className="p-5 md:p-6 space-y-3">
                            <div className="flex items-center justify-between text-[9px] font-bold tracking-widest text-slate-400 uppercase">
                              <span>{recipe.group}</span>
                              <span className="text-[#2A7F7F]">Recipe {recipe.number}</span>
                            </div>

                            <h4 className="text-lg font-semibold text-slate-900 group-hover:text-[#2A7F7F] transition-colors line-clamp-1">
                              {recipe.title}
                            </h4>

                            <p className="text-xs text-slate-500 font-light leading-relaxed line-clamp-2">
                              {recipe.why}
                            </p>
                          </div>
                        </div>

                        {/* Card Bottom CTA */}
                        <div className="px-5 pb-5 md:px-6 md:pb-6 pt-0 flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-[#2A7F7F]">
                          <span className="group-hover:translate-x-1 transition-transform">
                            View Steps →
                          </span>

                          <span className="text-[10px] text-slate-400 font-normal normal-case italic">
                            {recipe.ingredients.split(" · ").length} ingredients
                          </span>
                        </div>

                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* STICKY PLANT POINTS TRACKER BAR */}
      <AnimatePresence>
        {selectedRecipeSlugs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-black/[0.05] shadow-[0_-8px_30px_rgba(0,0,0,0.05)] py-4 px-6"
          >
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2A7F7F]/10 flex items-center justify-center text-[#2A7F7F]">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Your Daily Plate Tracker
                  </h5>
                  <p className="text-[11px] text-slate-500 font-light">
                    Selected <strong className="font-semibold text-slate-800">{selectedRecipeSlugs.length}</strong> recipes for your daily rotation
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Total Plant Points</span>
                  <span className="text-xl font-bold text-[#2A7F7F]">+{totalPlantPoints} Points</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedRecipeSlugs([])}
                    className="p-2 border border-slate-200 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
                    title="Reset selection"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => {
                      // Navigate to recipes tab if not already there and scroll
                      setActiveContentTab("recipes");
                      setTimeout(() => {
                        const element = document.getElementById("recipes-tab");
                        element?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    className="px-4 py-2 bg-[#2A7F7F] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#1e5c5c] transition-all cursor-pointer"
                  >
                    Compare Selection
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="w-full text-center py-10 text-[10px] tracking-widest text-slate-400 font-light select-none border-t border-black/[0.02] bg-white/20 relative z-10">
        BUILT IN THE OPEN. ONE BATCH AT A TIME.
      </footer>
    </div>
  );
}
