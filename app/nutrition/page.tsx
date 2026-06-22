"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Leaf, 
  Sparkles, 
  Clock, 
  Droplet, 
  Activity, 
  Paintbrush, 
  Layers, 
  Globe, 
  Check, 
  Plus, 
  Info,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Flame,
  Sun,
  Moon,
  GlassWater,
  ShieldCheck,
  ArrowLeft,
  BookOpen,
  Heart
} from "lucide-react";
import Navbar, { NavTab } from "@/components/Navbar";
import { 
  GUT_PRINCIPLES, 
  PLANT_CATEGORIES, 
  FERMENT_CATEGORIES, 
  MEALS_RECIPES,
  KITCHEN_FOUNDATIONS,
  CORE_RECIPES,
  PlantCategory,
  FermentCategory,
  Recipe,
  KitchenFoundation,
  CoreRecipe
} from "@/lib/gut-data";

const GUT_VISION_MARKERS = [
  { label: "Comfortable, regular daily digestion (soft, easy, once or twice a day)", type: "self" },
  { label: "No bloating after meals; calm stomach", type: "self" },
  { label: "Stable all-day energy (the afternoon crash is gone)", type: "self" },
  { label: "Steadier, calmer mood (the gut-brain line is quiet)", type: "self" },
  { label: "30+ different plants/week is automatic, not effort", type: "self" },
  { label: "3 ferments/day is automatic", type: "self" },
  { label: "Deeper sleep; clearer skin; cravings for ultra-processed food faded", type: "self" },
  { label: "Kitchen mastery: I cook my gut food from memory, joyfully", type: "self" },
  { label: "With GP: Healthy bloods, normal B12/D/iron, steady BP", type: "gp" }
];

export default function NutritionPage() {
  const router = useRouter();
  const [selectedPlantCategory, setSelectedPlantCategory] = useState<string>("gourds");
  const [selectedMealCategory, setSelectedMealCategory] = useState<string>("breakfast");
  
  // Gut Vision Board state (9 markers)
  const [gutMarkers, setGutMarkers] = useState<boolean[]>(new Array(9).fill(false));
  
  const toggleGutMarker = (index: number) => {
    setGutMarkers(prev => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };
  
  // Interactive Ferment Logger State
  const [loggedFerments, setLoggedFerments] = useState<{ [key: string]: string | null }>({
    morning: null,
    afternoon: null,
    evening: null
  });
  const [showLogSelector, setShowLogSelector] = useState<string | null>(null);
  const [openRecipeId, setOpenRecipeId] = useState<string | null>("R1");

  // Scroll logic for parallax floating elements
  const { scrollYProgress } = useScroll();
  const yFloating1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yFloating2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yFloating3 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yFloating4 = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const handleTabChange = (tab: NavTab) => {
    if (tab === "movement") {
      router.push("/movement");
    } else if (tab === "thinking") {
      router.push("/thinking");
    } else if (tab === "home-os") {
      router.push("/home");
    } else if (tab === "visionary") {
      router.push("/home?section=visionary");
    }
  };

  const logFerment = (slot: string, fermentName: string) => {
    setLoggedFerments(prev => ({ ...prev, [slot]: fermentName }));
    setShowLogSelector(null);
  };

  // Get current active plant category
  const activePlantCat = PLANT_CATEGORIES.find(c => c.id === selectedPlantCategory) || PLANT_CATEGORIES[0];

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F2] relative overflow-hidden">
      
      {/* ================= BACKGROUND DECORATIONS & FLOATING CUTOUTS (SEAMLESS WEAVE) ================= */}
      
      {/* 1. Leaf Cutout (Top Right) */}
      <motion.div 
        style={{ y: yFloating1 }}
        className="absolute top-20 right-[-5%] w-64 h-64 pointer-events-none opacity-25 md:opacity-40 z-0"
        initial={{ opacity: 0, rotate: -20 }}
        animate={{ opacity: 0.35, rotate: 10 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter blur-[1px]">
          <path 
            d="M20,180 C60,140 140,110 180,20 C140,60 110,140 20,180 Z" 
            fill="url(#leaf-grad)" 
          />
          <path 
            d="M20,180 Q105,105 180,20" 
            stroke="#2A7F7F" 
            strokeWidth="2" 
            strokeLinecap="round" 
            opacity="0.4"
          />
          <defs>
            <linearGradient id="leaf-grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2A7F7F" />
              <stop offset="100%" stopColor="#86EFAC" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* 2. Glassy Ferment Bubble (Left - Mid Page) */}
      <motion.div 
        style={{ y: yFloating2 }}
        className="absolute top-[40%] left-[-8%] w-80 h-80 pointer-events-none opacity-20 md:opacity-30 z-0"
        animate={{ 
          scale: [1, 1.05, 1],
          x: [0, 10, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="100" cy="100" r="80" fill="url(#bubble-grad)" />
          <circle cx="70" cy="70" r="50" fill="white" opacity="0.1" />
          <defs>
            <radialGradient id="bubble-grad" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="50%" stopColor="rgba(42, 127, 127, 0.15)" />
              <stop offset="100%" stopColor="rgba(42, 127, 127, 0.03)" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>

      {/* 3. Deep Purple Berry Cluster (Right - Mid Page) */}
      <motion.div 
        style={{ y: yFloating3 }}
        className="absolute top-[65%] right-[-6%] w-72 h-72 pointer-events-none opacity-15 md:opacity-25 z-0"
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter blur-[2px]">
          <circle cx="80" cy="80" r="35" fill="#4c1d95" opacity="0.6" />
          <circle cx="120" cy="90" r="40" fill="#6d28d9" opacity="0.5" />
          <circle cx="95" cy="130" r="38" fill="#581c87" opacity="0.7" />
          <circle cx="140" cy="125" r="30" fill="#701a75" opacity="0.5" />
        </svg>
      </motion.div>

      {/* 4. Golden Ghee Droplet (Bottom Left) */}
      <motion.div 
        style={{ y: yFloating4 }}
        className="absolute bottom-20 left-[-4%] w-60 h-60 pointer-events-none opacity-20 z-0"
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path 
            d="M100,20 C100,20 160,100 160,140 C160,173 133,200 100,200 C67,200 40,173 40,140 C40,100 100,20 100,20 Z" 
            fill="url(#gold-grad)" 
          />
          <defs>
            <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* ==================== STICKY NAVIGATION ==================== */}
      <Navbar activeTab="nutrition" setActiveTab={handleTabChange} />

      {/* ==================== CONTENT CANVAS ==================== */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 pb-28 md:pb-16 z-10 relative">
        
        {/* Back Link for Desktop */}
        <div className="hidden md:flex items-center mb-6">
          <button 
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-xs font-semibold text-[#2A7F7F] hover:opacity-80 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home OS Dashboard
          </button>
        </div>

        {/* ==================== HERO SECTION ==================== */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center md:text-left mb-12"
        >
          <span className="text-[10px] tracking-widest text-[#2A7F7F] font-bold uppercase bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-4">
            <Sparkles className="w-3 h-3 animate-pulse" />
            Phase 2: Gut-Brain Axis Protocol
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-slate-900 tracking-tight leading-none">
            The Nutrition <span className="font-semibold text-slate-950">Food Wing</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-light mt-3 max-w-2xl leading-relaxed">
            A vegetarian, gluten-free system excluding plain fluid milk, optimized for high-fidelity microbiome diversity and anti-inflammatory cellular resilience. Grounded in Tim Spector / ZOE first principles.
          </p>
        </motion.div>

        {/* ==================== GUT VISION BOARD: THE FOREST HAS REGROWN ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glassmorphic rounded-3xl p-6 sm:p-8 border border-[#2A7F7F]/10 hover:border-[#2A7F7F]/20 transition-all duration-500 mb-12 shadow-[0_8px_30px_rgb(42,127,127,0.01)]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div>
              <span className="text-[9px] tracking-widest text-[#2A7F7F] font-bold uppercase bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-2 py-0.5 rounded-full inline-flex items-center gap-1 mb-1.5">
                8-Month Horizon
              </span>
              <h2 className="text-xl sm:text-2xl font-light text-slate-900">
                The Forest <span className="font-semibold text-slate-950">Has Regrown</span>
              </h2>
            </div>
            {/* Microbiome Diversity progress indicator */}
            <div className="flex items-center gap-3 bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-3.5 py-2 rounded-2xl self-start sm:self-auto">
              <div className="relative w-9 h-9 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="18" cy="18" r="14" stroke="#e2e8f0" strokeWidth="2.5" fill="transparent" />
                  <motion.circle 
                    cx="18" 
                    cy="18" 
                    r="14" 
                    stroke="#2A7F7F" 
                    strokeWidth="2.5" 
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 14}
                    animate={{ strokeDashoffset: (2 * Math.PI * 14) * (1 - gutMarkers.filter(Boolean).length / 9) }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </svg>
                <span className="absolute text-[10px] font-bold text-[#2A7F7F]">{Math.round((gutMarkers.filter(Boolean).length / 9) * 30)}+</span>
              </div>
              <div className="text-left leading-tight">
                <p className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Diversity Score</p>
                <p className="text-[9px] text-slate-400">Target: 30+ species</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Interactive Forest SVG Graphic */}
            <div className="lg:col-span-5 bg-white/40 border border-black/[0.02] rounded-2xl p-4 flex flex-col items-center justify-center min-h-[220px] relative overflow-hidden">
              {/* Background gradient/glow inside card */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A7F7F]/5 to-transparent opacity-50 pointer-events-none" />
              
              <svg viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-[180px] max-w-[240px] relative z-10">
                {/* GP Sun Glow (behind forest) */}
                <motion.circle 
                  cx="120" 
                  cy="70" 
                  r="35" 
                  fill="url(#gp-sun)" 
                  animate={{ 
                    scale: gutMarkers[8] ? [1, 1.1, 1] : 0, 
                    opacity: gutMarkers[8] ? 0.35 : 0 
                  }}
                  transition={{ 
                    scale: { repeat: Infinity, duration: 8, ease: "easeInOut" },
                    opacity: { duration: 1 } 
                  }}
                />
                
                {/* Trunks always visible, color changes based on milestones */}
                {/* Center Tree */}
                <motion.path 
                  d="M120,150 Q120,100 120,70" 
                  stroke={gutMarkers[0] ? "#134e4a" : "#94a3b8"} 
                  strokeWidth={gutMarkers[0] ? "4" : "2"}
                  strokeLinecap="round"
                  animate={{ strokeWidth: gutMarkers[0] ? 4 : 2 }}
                />
                {/* Left Tree */}
                <motion.path 
                  d="M75,150 Q85,110 70,85" 
                  stroke={gutMarkers[1] ? "#134e4a" : "#94a3b8"} 
                  strokeWidth={gutMarkers[1] ? "3" : "1.5"}
                  strokeLinecap="round"
                  animate={{ strokeWidth: gutMarkers[1] ? 3 : 1.5 }}
                />
                {/* Right Tree */}
                <motion.path 
                  d="M165,150 Q155,115 170,90" 
                  stroke={gutMarkers[2] ? "#134e4a" : "#94a3b8"} 
                  strokeWidth={gutMarkers[2] ? "3" : "1.5"}
                  strokeLinecap="round"
                  animate={{ strokeWidth: gutMarkers[2] ? 3 : 1.5 }}
                />

                {/* Sub-branches sprouts */}
                {gutMarkers[0] && (
                  <motion.path 
                    d="M120,100 Q105,90 100,80" 
                    stroke="#134e4a" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
                {gutMarkers[0] && (
                  <motion.path 
                    d="M120,90 Q135,80 140,75" 
                    stroke="#134e4a" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                )}

                {/* Leaves elements tied to specific checkboxes */}
                {/* Digestion (Center Tree Main Canopy) */}
                <AnimatePresence>
                  {gutMarkers[0] && (
                    <motion.circle 
                      cx="120" cy="65" r="16" 
                      fill="#2A7F7F" fillOpacity="0.85" 
                      initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 80 }}
                    />
                  )}
                </AnimatePresence>

                {/* Bloat-Free (Left Tree Main Canopy) */}
                <AnimatePresence>
                  {gutMarkers[1] && (
                    <motion.circle 
                      cx="67" cy="80" r="14" 
                      fill="#3b7a57" fillOpacity="0.8" 
                      initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 80 }}
                    />
                  )}
                </AnimatePresence>

                {/* Energy (Right Tree Main Canopy) */}
                <AnimatePresence>
                  {gutMarkers[2] && (
                    <motion.circle 
                      cx="173" cy="85" r="14" 
                      fill="#2A7F7F" fillOpacity="0.75" 
                      initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 80 }}
                    />
                  )}
                </AnimatePresence>

                {/* Calmer Mood (Center Tree Upper Canopy) */}
                <AnimatePresence>
                  {gutMarkers[3] && (
                    <motion.circle 
                      cx="120" cy="48" r="12" 
                      fill="#5cb8b2" fillOpacity="0.8" 
                      initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 80, delay: 0.1 }}
                    />
                  )}
                </AnimatePresence>

                {/* 30+ Plants (Left Tree Sub Canopy) */}
                <AnimatePresence>
                  {gutMarkers[4] && (
                    <motion.circle 
                      cx="96" cy="76" r="10" 
                      fill="#86EFAC" fillOpacity="0.85" 
                      initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 80 }}
                    />
                  )}
                </AnimatePresence>

                {/* 3 Ferments (Right Tree Sub Canopy) */}
                <AnimatePresence>
                  {gutMarkers[5] && (
                    <motion.circle 
                      cx="144" cy="71" r="10" 
                      fill="#86EFAC" fillOpacity="0.85" 
                      initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 80 }}
                    />
                  )}
                </AnimatePresence>

                {/* Sleep & Skin (Grass on forest floor left) */}
                <AnimatePresence>
                  {gutMarkers[6] && (
                    <motion.path 
                      d="M60,150 Q65,135 70,150 Q75,132 80,150" 
                      stroke="#86EFAC" strokeWidth="2" strokeLinecap="round"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} exit={{ pathLength: 0 }}
                    />
                  )}
                </AnimatePresence>

                {/* Kitchen Mastery (Grass on forest floor right) */}
                <AnimatePresence>
                  {gutMarkers[7] && (
                    <motion.path 
                      d="M150,150 Q155,133 160,150 Q167,136 172,150 Q177,138 182,150" 
                      stroke="#2A7F7F" strokeWidth="2.5" strokeLinecap="round"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} exit={{ pathLength: 0 }}
                    />
                  )}
                </AnimatePresence>

                {/* Soil/Forest Floor line */}
                <path d="M40,150 L200,150" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />

                <defs>
                  <radialGradient id="gp-sun" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#2A7F7F" />
                    <stop offset="60%" stopColor="#86EFAC" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#86EFAC" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
              
              <div className="text-center mt-2 relative z-10">
                <span className="text-[10px] text-slate-400 font-light block">8-Month Ecological Shift</span>
                <span className="text-[11px] font-medium text-slate-700 block mt-0.5">
                  {gutMarkers.filter(Boolean).length === 0 
                    ? "Bare Soil (Baseline)" 
                    : gutMarkers.filter(Boolean).length === 9 
                    ? "Lush, Resilient Forest" 
                    : "Sprouting Canopy"}
                </span>
              </div>
            </div>

            {/* Checklist Markers */}
            <div className="lg:col-span-7 flex flex-col gap-2.5">
              {GUT_VISION_MARKERS.map((marker, idx) => (
                <button
                  key={idx}
                  onClick={() => toggleGutMarker(idx)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-300 flex items-center gap-3 cursor-pointer ${
                    gutMarkers[idx]
                      ? "bg-[#2A7F7F]/5 border-[#2A7F7F]/30 shadow-[0_4px_20px_rgba(42,127,127,0.02)]"
                      : "bg-white/50 border-black/[0.03] hover:border-black/[0.08]"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-lg border flex items-center justify-center flex-shrink-0 transition-all ${
                    gutMarkers[idx]
                      ? "bg-[#2A7F7F] border-[#2A7F7F] text-white"
                      : "border-slate-300 bg-white"
                  }`}>
                    {gutMarkers[idx] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-xs font-light leading-snug ${gutMarkers[idx] ? "text-slate-900 font-normal" : "text-slate-600"}`}>
                      {marker.label}
                    </p>
                  </div>
                  <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    marker.type === "gp" 
                      ? "bg-amber-100 text-amber-800 border border-amber-200" 
                      : "bg-slate-100 text-slate-500"
                  }`}>
                    {marker.type}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Arrival Line Footer */}
          <div className="mt-8 pt-6 border-t border-black/[0.03] text-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block mb-2">Arrival Line</span>
            <p className="text-xs sm:text-sm text-[#2A7F7F] font-semibold italic max-w-xl mx-auto leading-relaxed">
              "My inner forest is diverse, resilient, and self-sustaining — a super-gut that runs on autopilot for life."
            </p>
          </div>
        </motion.div>

        {/* ==================== THE FOUR PROTOCOL PILLARS ==================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {GUT_PRINCIPLES.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glassmorphic rounded-2xl p-5 flex flex-col justify-between min-h-[140px] hover:border-[#2A7F7F]/25 transition-all group"
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2A7F7F] bg-[#2A7F7F]/5 px-2 py-0.5 rounded border border-[#2A7F7F]/5">
                  {p.metric}
                </span>
                <span className="text-slate-400 group-hover:text-[#2A7F7F] transition-colors">
                  {idx === 0 && <Leaf className="w-4 h-4" />}
                  {idx === 1 && <Activity className="w-4 h-4" />}
                  {idx === 2 && <Sparkles className="w-4 h-4" />}
                  {idx === 3 && <Clock className="w-4 h-4" />}
                </span>
              </div>
              <div className="mt-4">
                <h4 className="text-xs font-bold text-slate-800">{p.title}</h4>
                <p className="text-[10px] text-slate-500 font-light mt-1 leading-relaxed">
                  {p.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ==================== THE 30-PLANTS ENGINE ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="glassmorphic rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#2A7F7F]/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 flex items-center gap-1.5">
                    The 30+ Plants Engine
                    <Leaf className="w-4 h-4 text-[#2A7F7F]" />
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-light">Categorized weekly rotation guide.</p>
                </div>
                <span className="text-[10px] text-slate-500 bg-white/60 border border-black/[0.03] px-2.5 py-1 rounded-full font-medium">
                  Goal: 30 different plants / week
                </span>
              </div>

              {/* Plants Categories Buttons */}
              <div className="flex flex-wrap gap-1.5 mb-6 pb-2 border-b border-black/[0.03]">
                {PLANT_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedPlantCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-medium tracking-wide transition-all cursor-pointer ${
                      selectedPlantCategory === cat.id
                        ? "bg-[#2A7F7F] text-white"
                        : "bg-white/40 border border-black/[0.03] text-slate-600 hover:bg-white/70"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Items Display */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPlantCategory}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-2"
                >
                  {activePlantCat.items.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: idx * 0.03 }}
                      className="p-3 bg-white/50 border border-black/[0.02] rounded-xl flex items-center gap-2 group hover:border-[#2A7F7F]/30 hover:bg-white transition-all cursor-default"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2A7F7F]/60 group-hover:bg-[#2A7F7F] transition-colors" />
                      <span className="text-[10px] font-light text-slate-800">{item}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 pt-4 border-t border-black/[0.03] flex items-center justify-between">
                <p className="text-[10px] text-slate-400 font-light">
                  *Different colors of capsicum, brinjal, or carrot count as separate plant points.
                </p>
                <span className="text-[9px] font-bold text-[#2A7F7F] uppercase tracking-widest bg-[#2A7F7F]/5 px-2 py-0.5 rounded border border-[#2A7F7F]/10">
                  {activePlantCat.pointsRule}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Calculator Sidebar */}
          <div className="flex flex-col gap-6">
            <div className="glassmorphic rounded-3xl p-6 flex flex-col justify-between min-h-[220px]">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#2A7F7F] mb-2">Points Ledger</h4>
                <h3 className="text-sm font-semibold text-slate-900">How to Count Points</h3>
                <p className="text-[10px] text-slate-500 font-light mt-2 leading-relaxed">
                  Tim Spector's ZOE protocol rewards diverse plant fiber structures:
                </p>
                <div className="flex flex-col gap-2 mt-4">
                  <div className="flex justify-between items-center text-[10px] text-slate-700">
                    <span className="font-light">Whole Whole Grains / Veg / Fruit</span>
                    <span className="font-semibold text-slate-900">+1.0 pt</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-700">
                    <span className="font-light">Herbs / Spices (per type)</span>
                    <span className="font-semibold text-slate-900">+0.25 pt</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-700">
                    <span className="font-light">Extra Virgin Olive Oil / Coffee</span>
                    <span className="font-semibold text-slate-900">+0.25 pt</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-black/[0.03] text-[9px] text-slate-400 font-light">
                Note: Refined grains, sugars, and juices do not carry fiber points.
              </div>
            </div>
          </div>
        </div>

        {/* ==================== THE 3-FERMENTS TRACKER ==================== */}
        <div className="glassmorphic rounded-3xl p-6 sm:p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-[-20%] left-[40%] w-48 h-48 bg-[#2A7F7F]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 flex items-center gap-1.5">
                The 3-Ferments Daily Rhythm
                <Activity className="w-4 h-4 text-[#2A7F7F]" />
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-400 font-light mt-0.5">
                Culturing diversity. Pair cooked ferments (dosa, idli) with raw/live cultures (curd, chaas) for optimal results.
              </p>
            </div>
            
            <button
              onClick={() => setLoggedFerments({ morning: null, afternoon: null, evening: null })}
              className="text-[9px] uppercase tracking-widest text-[#2A7F7F] font-semibold border border-[#2A7F7F]/20 rounded-xl px-3 py-1.5 hover:bg-[#2A7F7F]/5 transition-colors self-start cursor-pointer"
            >
              Reset Logs
            </button>
          </div>

          {/* Slots layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {["morning", "afternoon", "evening"].map((slot, index) => {
              const loggedVal = loggedFerments[slot];
              return (
                <div key={slot} className="flex flex-col bg-white/40 border border-black/[0.03] rounded-2xl p-5 justify-between min-h-[160px] relative">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">
                        {index === 0 && "1. Morning Slot"}
                        {index === 1 && "2. Afternoon Slot"}
                        {index === 2 && "3. Evening Slot"}
                      </span>
                      {loggedVal && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      )}
                    </div>

                    {loggedVal ? (
                      <div>
                        <h4 className="text-xs font-semibold text-slate-950 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          {loggedVal}
                        </h4>
                        <p className="text-[10px] text-emerald-600 font-medium mt-1 uppercase tracking-wide">
                          Culture Ingested
                        </p>
                      </div>
                    ) : (
                      <div>
                        <h4 className="text-xs font-light text-slate-400 italic">No ferment logged</h4>
                        <p className="text-[10px] text-slate-400 font-light mt-1">
                          Click below to choose a live probiotic from the Bible.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 relative">
                    {showLogSelector === slot ? (
                      <div className="absolute bottom-12 left-0 right-0 max-h-[180px] overflow-y-auto bg-[#F7F6F2] border border-black/[0.08] shadow-lg rounded-xl p-2 z-50 flex flex-col gap-1">
                        <span className="text-[9px] font-bold text-slate-400 px-2 py-1 uppercase tracking-widest border-b border-black/[0.03] mb-1">
                          Probiotics Bible
                        </span>
                        {FERMENT_CATEGORIES.flatMap(cat => cat.items).map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => logFerment(slot, item.name)}
                            className="text-left px-2 py-1.5 rounded-lg text-[10px] text-slate-700 hover:bg-[#2A7F7F]/10 hover:text-[#2A7F7F] transition-colors cursor-pointer flex justify-between items-center"
                          >
                            <span>{item.name}</span>
                            {item.isLive && (
                              <span className="text-[8px] bg-emerald-500/10 text-emerald-700 px-1 py-0.2 rounded font-bold uppercase">
                                Live
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    ) : null}

                    <button
                      onClick={() => setShowLogSelector(showLogSelector === slot ? null : slot)}
                      className={`w-full h-10 rounded-xl text-[10px] font-semibold tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        loggedVal
                          ? "bg-slate-100 border border-black/[0.03] text-slate-600 hover:bg-slate-200"
                          : "bg-[#2A7F7F] text-white hover:bg-[#1e5c5c]"
                      }`}
                    >
                      {loggedVal ? "Change Entry" : "Log Ferment"}
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==================== THE KITCHEN FOUNDATIONS DECK ==================== */}
        <div className="mb-16 mt-8">
          <div className="mb-8">
            <h2 className="text-lg sm:text-xl font-light text-slate-900">
              The Kitchen <span className="font-semibold text-slate-950">Foundations</span>
            </h2>
            <p className="text-[10px] sm:text-xs text-slate-400 font-light mt-0.5">
              The 12 vital culinary principles and building blocks for gut-friendly cooking.
            </p>
          </div>

          <div className="flex overflow-x-auto gap-5 pb-6 pt-2 snap-x snap-mandatory no-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-x-visible md:pb-0 md:pt-0">
            {KITCHEN_FOUNDATIONS.map((foundation) => {
              const getIcon = (id: string) => {
                switch(id) {
                  case "F1": return <BookOpen className="w-4 h-4 text-[#2A7F7F]" />;
                  case "F2": return <Flame className="w-4 h-4 text-[#2A7F7F]" />;
                  case "F3": return <Flame className="w-4 h-4 text-[#2A7F7F]" />;
                  case "F4": return <Layers className="w-4 h-4 text-[#2A7F7F]" />;
                  case "F5": return <Leaf className="w-4 h-4 text-[#2A7F7F]" />;
                  case "F6": return <Droplet className="w-4 h-4 text-[#2A7F7F]" />;
                  case "F7": return <GlassWater className="w-4 h-4 text-[#2A7F7F]" />;
                  case "F8": return <Sparkles className="w-4 h-4 text-[#2A7F7F]" />;
                  case "F9": return <ShieldCheck className="w-4 h-4 text-[#2A7F7F]" />;
                  case "F10": return <Layers className="w-4 h-4 text-[#2A7F7F]" />;
                  case "F11": return <Activity className="w-4 h-4 text-[#2A7F7F]" />;
                  case "F12": return <Check className="w-4 h-4 text-[#2A7F7F]" />;
                  default: return <BookOpen className="w-4 h-4 text-[#2A7F7F]" />;
                }
              };

              return (
                <div 
                  key={foundation.id}
                  className="flex-shrink-0 w-[260px] md:w-auto snap-start glassmorphic rounded-2xl p-5 border border-black/[0.03] hover:border-[#2A7F7F]/30 hover:shadow-[0_8px_30px_rgb(42,127,127,0.02)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#2A7F7F] bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-2 py-0.5 rounded-md">
                        {foundation.id}
                      </span>
                      <div className="p-1.5 rounded-lg bg-white/60 border border-black/[0.02]">
                        {getIcon(foundation.id)}
                      </div>
                    </div>
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-900 mb-2">
                      {foundation.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-slate-500 font-light leading-relaxed">
                      {foundation.instruction}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==================== THE CORE RECIPES ACCORDION ==================== */}
        <div className="mb-16">
          <div className="mb-8">
            <h2 className="text-lg sm:text-xl font-light text-slate-900">
              The Core <span className="font-semibold text-slate-950">Recipes</span>
            </h2>
            <p className="text-[10px] sm:text-xs text-slate-400 font-light mt-0.5">
              Fully written, step-by-step gut-healing formulas for daily nourishment.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {CORE_RECIPES.map((recipe) => {
              const isOpen = openRecipeId === recipe.id;

              return (
                <div 
                  key={recipe.id}
                  className={`glassmorphic rounded-3xl border transition-all duration-300 overflow-hidden ${
                    isOpen 
                      ? "border-[#2A7F7F]/30 bg-white/60 shadow-[0_12px_40px_rgba(42,127,127,0.04)]" 
                      : "border-black/[0.03] hover:border-black/[0.08]"
                  }`}
                >
                  <button
                    onClick={() => setOpenRecipeId(isOpen ? null : recipe.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-2xl bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 text-xs font-bold text-[#2A7F7F] flex-shrink-0">
                        {recipe.id}
                      </span>
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-slate-900 leading-tight">
                          {recipe.title}
                        </h3>
                        <p className="text-[9px] sm:text-[10px] text-slate-400 font-light mt-0.5">
                          {recipe.ingredients.length} ingredients • {recipe.steps.length} steps
                        </p>
                      </div>
                    </div>
                    <div className="p-1 rounded-full bg-slate-100/50">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-5 pb-6 sm:px-6 sm:pb-8 border-t border-black/[0.03] pt-6 flex flex-col gap-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                            {/* Ingredients */}
                            <div>
                              <h4 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                                Ingredients List
                              </h4>
                              <ul className="flex flex-col gap-2.5">
                                {recipe.ingredients.map((ing, iIdx) => (
                                  <li key={iIdx} className="flex items-start gap-2 text-[10px] sm:text-xs text-slate-700 font-light leading-relaxed">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#2A7F7F]/30 mt-1.5 flex-shrink-0" />
                                    <span>{ing}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Steps */}
                            <div>
                              <h4 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                                <Flame className="w-3.5 h-3.5 text-slate-400" />
                                Preparation Steps
                              </h4>
                              <ol className="flex flex-col gap-3.5">
                                {recipe.steps.map((step, sIdx) => (
                                  <li key={sIdx} className="flex gap-3 text-[10px] sm:text-xs text-slate-700 font-light leading-relaxed">
                                    <span className="font-semibold text-[#2A7F7F]/70 text-[10px] sm:text-xs flex-shrink-0 w-4">
                                      {sIdx + 1}.
                                    </span>
                                    <span>{step}</span>
                                  </li>
                                ))}
                              </ol>
                            </div>
                          </div>

                          {/* Why this heals */}
                          <div className="bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 rounded-2xl p-4 sm:p-5 mt-2 flex gap-3.5 items-start">
                            <div className="p-2 rounded-xl bg-white/60 border border-[#2A7F7F]/10 flex-shrink-0">
                              <Heart className="w-4 h-4 text-[#2A7F7F] fill-[#2A7F7F]/10" />
                            </div>
                            <div>
                              <h5 className="text-[9px] sm:text-[10px] font-bold text-[#2A7F7F] uppercase tracking-widest mb-1">
                                Why this heals
                              </h5>
                              <p className="text-[11px] sm:text-xs text-[#2A7F7F] font-medium leading-relaxed italic">
                                {recipe.whyHeals}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==================== THE RECIPE BIBLE GRID ==================== */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-light text-slate-900">
                Nourishing <span className="font-semibold text-slate-950">Meals & Recipes</span>
              </h2>
              <p className="text-[10px] sm:text-xs text-slate-400 font-light mt-0.5">
                Vegetarian, gluten-free, dairy-ferment enriched reference formulas.
              </p>
            </div>

            {/* Meal Category Filters */}
            <div className="flex bg-white/40 border border-black/[0.03] p-1 rounded-2xl self-start">
              {MEALS_RECIPES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedMealCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-xl text-[10px] font-semibold tracking-wide transition-all cursor-pointer ${
                    selectedMealCategory === cat.id
                      ? "bg-[#2A7F7F] text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Recipes Display Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMealCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {(MEALS_RECIPES.find(c => c.id === selectedMealCategory)?.recipes || []).map((recipe, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="glassmorphic rounded-3xl p-6 flex flex-col justify-between border-black/[0.03] hover:border-[#2A7F7F]/30 hover:shadow-[0_8px_30px_rgb(42,127,127,0.03)] transition-all duration-300"
                >
                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {recipe.tags.map((tag, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="text-[9px] font-bold uppercase tracking-wider text-[#2A7F7F] bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-2 py-0.5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-2">
                      {recipe.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-light leading-relaxed mb-6">
                      {recipe.description}
                    </p>
                  </div>

                  {/* Gut Benefits */}
                  <div className="border-t border-black/[0.03] pt-4 mt-auto">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                      Cellular Target Benefits
                    </span>
                    <div className="flex flex-col gap-1.5">
                      {recipe.gutBenefits.map((benefit, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#2A7F7F]" />
                          <span className="text-[10px] text-slate-700 font-light">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </main>

      {/* Simple Footer */}
      <footer className="w-full text-center py-8 pb-28 md:pb-8 text-[10px] tracking-widest text-slate-400 font-light select-none relative z-10 border-t border-black/[0.02] bg-white/20">
        TRELIS LIFE SYSTEM • VER 4.0 • CRAFTED FOR STEADY PROGRESS
      </footer>
    </div>
  );
}
