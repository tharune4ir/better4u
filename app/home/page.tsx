"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wrench, 
  Home, 
  Database, 
  ArrowLeft,
  CheckCircle,
  Clock,
  Sparkles,
  Layers,
  ShoppingBag,
  Info,
  Lock,
  Check
} from "lucide-react";
import Navbar, { NavTab } from "@/components/Navbar";
import { HOME_LOGS, FUTURE_PRODUCTS, HomeLogItem } from "@/lib/home-data";

const HOME_VISION_MARKERS = [
  { label: "Handyman competencies achieved (the full ladder, safety line respected)", key: "handyman" },
  { label: "Home systems on rails (weekly reset, bills/utilities automatic, circadian lighting)", key: "systems" },
  { label: "Parents' gut-friendly meals dialed in; their routines supported", key: "parents" },
  { label: "Runway managed all 8 months; weekly cap held; entity admin clean", key: "runway" }
];

function HomeOSContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState<"all" | "handyman" | "kitchen" | "runway-admin">("all");
  const [activeProductId, setActiveProductId] = useState<string>("p1");
  const [activeNavTab, setActiveNavTab] = useState<NavTab>("home-os");

  // Home OS Vision Board state (4 markers)
  const [homeMarkers, setHomeMarkers] = useState<boolean[]>(new Array(4).fill(false));

  const toggleHomeMarker = (index: number) => {
    setHomeMarkers(prev => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  useEffect(() => {
    const section = searchParams.get("section");
    const tab = searchParams.get("tab");
    if (section === "visionary" || tab === "visionary") {
      setActiveNavTab("visionary");
      setTimeout(() => {
        const element = document.getElementById("visionary-showcase");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  }, [searchParams]);

  const handleTabChange = (tab: NavTab) => {
    if (tab === "visionary") {
      setActiveNavTab("visionary");
      const element = document.getElementById("visionary-showcase");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      window.history.pushState({}, "", "/home?section=visionary");
    } else if (tab === "home-os") {
      setActiveNavTab("home-os");
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState({}, "", "/home");
    } else {
      router.push(`/?tab=${tab}`);
    }
  };

  const filteredLogs = HOME_LOGS.filter(log => {
    if (filter === "all") return true;
    return log.category === filter;
  });

  const activeProduct = FUTURE_PRODUCTS.find(p => p.id === activeProductId) || FUTURE_PRODUCTS[0];

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F2] relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-[15%] left-[-10%] w-[35vw] h-[35vw] bg-[#2A7F7F]/4 rounded-full blur-[135px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[40vw] h-[40vw] bg-[#2A7F7F]/4 rounded-full blur-[140px] pointer-events-none" />

      {/* Navigation */}
      <Navbar activeTab={activeNavTab} setActiveTab={handleTabChange} />

      {/* ==================== MAIN CANVAS ==================== */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-28 md:pb-16 z-10 relative">
        
        {/* Back Link for Desktop */}
        <div className="hidden md:flex items-center mb-6">
          <button 
            onClick={() => {
              setActiveNavTab("home-os");
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.history.pushState({}, "", "/home");
            }}
            className="flex items-center gap-2 text-xs font-semibold text-[#2A7F7F] hover:opacity-80 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Scroll to Top
          </button>
        </div>

        {/* ==================== CORE HERO ==================== */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center md:text-left mb-10"
        >
          <span className="text-[10px] tracking-widest text-[#2A7F7F] font-bold uppercase bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-4">
            <Home className="w-3.5 h-3.5" />
            Pillar 4: Home OS & Vision
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-slate-900 tracking-tight leading-none">
            Home OS: <span className="font-semibold text-slate-950">The Ground We Stand On.</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-light mt-3 max-w-xl leading-relaxed">
            The background engine. Handyman logs, kitchen system engineering, and financial runway discipline to preserve the baseline.
          </p>
        </motion.div>

        {/* ==================== HOME OS VISION BOARD: THE GROUND HOLDS ==================== */}
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
                The Ground <span className="font-semibold text-slate-950">Holds</span>
              </h2>
            </div>
            
            {/* Completion indicator */}
            <div className="flex items-center gap-3 bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-3.5 py-2 rounded-2xl self-start sm:self-auto">
              <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Foundation Integrity</span>
              <div className="text-lg font-bold text-[#2A7F7F]">
                {Math.round((homeMarkers.filter(Boolean).length / 4) * 100)}%
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Foundation SVG Graphic */}
            <div className="lg:col-span-5 bg-white/40 border border-black/[0.02] rounded-2xl p-4 flex flex-col items-center justify-center min-h-[220px] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A7F7F]/5 to-transparent opacity-50 pointer-events-none" />
              
              <svg viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-[180px] max-w-[240px] relative z-10">
                {/* 1. Foundation Slab (Item 0) */}
                <rect x="40" y="140" width="160" height="12" rx="3" fill="#e2e8f0" />
                <AnimatePresence>
                  {homeMarkers[0] && (
                    <motion.rect 
                      x="40" y="140" width="160" height="12" rx="3" 
                      fill="#2A7F7F"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      style={{ originX: 0.5 }}
                      transition={{ type: "spring", stiffness: 80 }}
                    />
                  )}
                </AnimatePresence>

                {/* 2. Left Column (Item 1) */}
                <rect x="60" y="80" width="16" height="60" rx="2" fill="#e2e8f0" />
                <AnimatePresence>
                  {homeMarkers[1] && (
                    <motion.rect 
                      x="60" y="80" width="16" height="60" rx="2" 
                      fill="#2A7F7F"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      exit={{ scaleY: 0 }}
                      style={{ originY: 1 }}
                      transition={{ type: "spring", stiffness: 80 }}
                    />
                  )}
                </AnimatePresence>

                {/* 3. Right Column (Item 2) */}
                <rect x="164" y="80" width="16" height="60" rx="2" fill="#e2e8f0" />
                <AnimatePresence>
                  {homeMarkers[2] && (
                    <motion.rect 
                      x="164" y="80" width="16" height="60" rx="2" 
                      fill="#2A7F7F"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      exit={{ scaleY: 0 }}
                      style={{ originY: 1 }}
                      transition={{ type: "spring", stiffness: 80 }}
                    />
                  )}
                </AnimatePresence>

                {/* 4. Roof Lintel / Triangle (Item 3) */}
                <path d="M30,80 L210,80 L120,35 Z" fill="#e2e8f0" />
                <AnimatePresence>
                  {homeMarkers[3] && (
                    <motion.path 
                      d="M30,80 L210,80 L120,35 Z" 
                      fill="#86EFAC"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      style={{ originY: 1 }}
                      transition={{ type: "spring", stiffness: 80 }}
                    />
                  )}
                </AnimatePresence>

                {/* Subtle details: Circadian window left (Item 1 & 2 together glows) */}
                <rect x="88" y="95" width="20" height="20" rx="2" fill="#cbd5e1" fillOpacity="0.3" />
                <AnimatePresence>
                  {homeMarkers[1] && homeMarkers[2] && (
                    <motion.rect 
                      x="88" y="95" width="20" height="20" rx="2" 
                      fill="#fef08a" 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    />
                  )}
                </AnimatePresence>

                {/* Subtle details: Admin window right (Item 3 glows) */}
                <rect x="132" y="95" width="20" height="20" rx="2" fill="#cbd5e1" fillOpacity="0.3" />
                <AnimatePresence>
                  {homeMarkers[3] && (
                    <motion.rect 
                      x="132" y="95" width="20" height="20" rx="2" 
                      fill="#93c5fd" 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    />
                  )}
                </AnimatePresence>
                
                {/* Forest floor / ground line */}
                <line x1="20" y1="152" x2="220" y2="152" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
              </svg>

              <div className="text-center mt-2 relative z-10">
                <span className="text-[9px] text-slate-500 font-light block">Structure Phase</span>
                <span className="text-[10px] font-bold text-slate-700 block mt-0.5 tracking-wide">
                  {homeMarkers.filter(Boolean).length === 0 
                    ? "Site Cleared" 
                    : homeMarkers.filter(Boolean).length === 4 
                    ? "Solid Ground Established" 
                    : "Laying Structural Beams"}
                </span>
              </div>
            </div>

            {/* Checklist Markers */}
            <div className="lg:col-span-7 flex flex-col gap-2.5">
              {HOME_VISION_MARKERS.map((marker, idx) => (
                <button
                  key={idx}
                  onClick={() => toggleHomeMarker(idx)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-300 flex items-center gap-3 cursor-pointer ${
                    homeMarkers[idx]
                      ? "bg-[#2A7F7F]/5 border-[#2A7F7F]/30 shadow-[0_4px_20px_rgba(42,127,127,0.02)]"
                      : "bg-white/50 border-black/[0.03] hover:border-black/[0.08]"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-lg border flex items-center justify-center flex-shrink-0 transition-all ${
                    homeMarkers[idx]
                      ? "bg-[#2A7F7F] border-[#2A7F7F] text-white"
                      : "border-slate-300 bg-white"
                  }`}>
                    {homeMarkers[idx] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-xs font-light leading-snug ${homeMarkers[idx] ? "text-slate-900 font-normal" : "text-slate-600"}`}>
                      {marker.label}
                    </p>
                  </div>
                  <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    marker.key === "handyman" 
                      ? "bg-amber-100 text-amber-800 border border-amber-200" 
                      : marker.key === "systems"
                      ? "bg-blue-100 text-blue-800 border border-blue-200"
                      : marker.key === "parents"
                      ? "bg-teal-100 text-teal-800 border border-teal-200"
                      : "bg-purple-100 text-purple-800 border border-purple-200"
                  }`}>
                    {marker.key}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Arrival Line Footer */}
          <div className="mt-8 pt-6 border-t border-black/[0.03] text-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block mb-2">Arrival Line</span>
            <p className="text-xs sm:text-sm text-[#2A7F7F] font-semibold italic max-w-xl mx-auto leading-relaxed">
              "The ground beneath me is solid, calm, and self-running — so I can build everything else on top of it."
            </p>
          </div>
        </motion.div>

        {/* ==================== BLUEPRINT GRID & TABS ==================== */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#2A7F7F]">
              Systems & Task Logs
            </h3>
            
            {/* Filter Pill Tabs */}
            <div className="flex flex-wrap gap-1.5 bg-black/[0.02] p-1 rounded-xl border border-black/[0.03]">
              {(["all", "handyman", "kitchen", "runway-admin"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`text-[9px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    filter === cat
                      ? "bg-[#2A7F7F] text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {cat === "runway-admin" ? "Runway & Admin" : cat === "kitchen" ? "Kitchen Craft" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Logs List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLogs.map((log) => (
              <div 
                key={log.id}
                className="glassmorphic rounded-2xl p-5 flex flex-col justify-between border-black/[0.02] hover:border-[#2A7F7F]/20 transition-all duration-300"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[8px] uppercase tracking-widest font-semibold text-[#2A7F7F] bg-[#2A7F7F]/5 px-2 py-0.5 rounded border border-[#2A7F7F]/10 flex items-center gap-1">
                      {log.category === "handyman" && <Wrench className="w-2.5 h-2.5" />}
                      {log.category === "kitchen" && <Layers className="w-2.5 h-2.5" />}
                      {log.category === "runway-admin" && <Database className="w-2.5 h-2.5" />}
                      {log.category === "runway-admin" ? "Runway/Admin" : log.category === "kitchen" ? "Kitchen" : "Handyman"}
                    </span>
                    
                    <span className={`text-[8px] uppercase tracking-wider font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                      log.status === "completed" 
                        ? "bg-emerald-50 text-emerald-600" 
                        : "bg-amber-50 text-amber-600"
                    }`}>
                      {log.status === "completed" ? <CheckCircle className="w-2.5 h-2.5" /> : <Clock className="w-2.5 h-2.5" />}
                      {log.status === "completed" ? "Completed" : "In Progress"}
                    </span>
                  </div>

                  <h4 className="text-xs font-semibold text-slate-900">{log.title}</h4>
                  <p className="text-[10px] text-slate-500 font-light mt-1.5 leading-relaxed">
                    {log.description}
                  </p>
                </div>

                {log.details && (
                  <div className="border-t border-black/[0.03] pt-3 mt-4">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                      Sub-tasks & Safety Notes
                    </span>
                    <ul className="flex flex-col gap-1">
                      {log.details.map((detail, dIdx) => (
                        <li key={dIdx} className="text-[9px] text-slate-600 font-light flex items-start gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-[#2A7F7F] mt-1.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ==================== THE VISION SHOWCASE (FUTURE PRODUCTS) ==================== */}
        <div id="visionary-showcase" className="glassmorphic rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-[10%] left-[20%] w-72 h-72 bg-[#2A7F7F]/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="text-center mb-10">
            <span className="text-[9px] tracking-widest text-[#2A7F7F] font-bold uppercase bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-2">
              <ShoppingBag className="w-3 h-3" />
              The Vision Showcase
            </span>
            <h2 className="text-xl sm:text-2xl font-light text-slate-900">
              Future Physical <span className="font-semibold text-slate-950">FMCG Formulations</span>
            </h2>
            <p className="text-[10px] text-slate-400 font-light mt-1 max-w-md mx-auto">
              Turning private kitchen research and trial formulas into clean, zero-compromise bottled gut products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left: Interactive Selector list & technical descriptions */}
            <div className="md:col-span-7 flex flex-col gap-4 order-2 md:order-1">
              <div className="flex gap-2 border-b border-black/[0.03] pb-3">
                {FUTURE_PRODUCTS.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => setActiveProductId(prod.id)}
                    className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      activeProductId === prod.id
                        ? "bg-[#2A7F7F]/10 text-[#2A7F7F] border border-[#2A7F7F]/20"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {prod.name}
                  </button>
                ))}
              </div>

              <div>
                <span className="text-[8px] font-bold uppercase tracking-widest text-[#2A7F7F] block mb-1">
                  {activeProduct.patentStatus}
                </span>
                <h3 className="text-base font-semibold text-slate-950 mb-1">
                  {activeProduct.name}
                </h3>
                <p className="text-xs text-[#2A7F7F] font-medium italic mb-3">
                  {activeProduct.tagline}
                </p>
                <p className="text-[10px] sm:text-xs text-slate-500 font-light leading-relaxed mb-5">
                  {activeProduct.description}
                </p>

                <div className="bg-white/40 border border-black/[0.02] rounded-xl p-4 relative overflow-hidden flex flex-col justify-center min-h-[90px] backdrop-blur-sm">
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                    Formulation Ingredients
                  </span>
                  <div className="flex flex-wrap gap-1.5 filter blur-[3.5px] select-none opacity-40">
                    {activeProduct.ingredients.map((ing, idx) => (
                      <span 
                        key={idx} 
                        className="text-[9px] text-slate-700 bg-white/60 border border-black/[0.03] px-2.5 py-1 rounded-full font-light"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-white/10 flex items-center justify-center z-10">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#2A7F7F] bg-[#2A7F7F]/10 border border-[#2A7F7F]/20 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                      <Lock className="w-2.5 h-2.5" />
                      Formulation Locked
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Transparent Animated Floating Glass Bottle SVG (No box) */}
            <div className="md:col-span-5 flex justify-center items-center order-1 md:order-2 relative">
              <motion.div
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, 1.5, -1.5, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative w-44 h-72 flex justify-center items-center filter drop-shadow-[0_15px_30px_rgba(42,127,127,0.12)]"
              >
                {/* SVG Sleek Glass Bottle placeholder */}
                <svg
                  viewBox="0 0 100 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  {/* Outer Glass Shine Overlay */}
                  <path
                    d="M38,15 L62,15 C64,15 65,16.5 65,18 L65,25 C65,27.5 67,29.5 69.5,29.5 L73,29.5 C76,29.5 78,32.5 78,35.5 L78,175 C78,185 70,192 60,192 L40,192 C30,192 22,185 22,175 L22,35.5 C22,32.5 24,29.5 27,29.5 L30.5,29.5 C33,29.5 35,27.5 35,25 L35,18 C35,16.5 36,15 38,15 Z"
                    stroke="#ffffff"
                    strokeWidth="1"
                    strokeOpacity="0.4"
                  />
                  
                  {/* Main Bottle Outline */}
                  <path
                    d="M38,15 L62,15 C64,15 65,16.5 65,18 L65,25 C65,27.5 67,29.5 69.5,29.5 L73,29.5 C76,29.5 78,32.5 78,35.5 L78,175 C78,185 70,192 60,192 L40,192 C30,192 22,185 22,175 L22,35.5 C22,32.5 24,29.5 27,29.5 L30.5,29.5 C33,29.5 35,27.5 35,25 L35,18 C35,16.5 36,15 38,15 Z"
                    stroke="#2A7F7F"
                    strokeWidth="1.5"
                    strokeOpacity="0.45"
                  />

                  {/* Bottle Cap */}
                  <rect x="36" y="8" width="28" height="7" rx="1.5" fill="#2A7F7F" fillOpacity="0.85" />
                  <line x1="42" y1="8" x2="42" y2="15" stroke="#F7F6F2" strokeWidth="0.5" />
                  <line x1="48" y1="8" x2="48" y2="15" stroke="#F7F6F2" strokeWidth="0.5" />
                  <line x1="54" y1="8" x2="54" y2="15" stroke="#F7F6F2" strokeWidth="0.5" />
                  <line x1="58" y1="8" x2="58" y2="15" stroke="#F7F6F2" strokeWidth="0.5" />

                  {/* Glowing Liquid body inside the bottle */}
                  <path
                    d="M24.5,45 C24.5,41.5 26.5,39 29.5,39 L70.5,39 C73.5,39 75.5,41.5 75.5,45 L75.5,172 C75.5,181 68.5,188.5 59.5,188.5 L40.5,188.5 C31.5,188.5 24.5,181 24.5,172 Z"
                    fill="url(#liquidGlow)"
                    fillOpacity="0.75"
                  />

                  {/* Inner liquid shine lines */}
                  <path
                    d="M28,50 L28,165"
                    stroke="#ffffff"
                    strokeWidth="1"
                    strokeOpacity="0.25"
                    strokeLinecap="round"
                  />
                  <path
                    d="M72,55 L72,160"
                    stroke="#ffffff"
                    strokeWidth="0.75"
                    strokeOpacity="0.15"
                    strokeLinecap="round"
                  />

                  {/* Premium Brand Label */}
                  <rect x="30" y="80" width="40" height="42" rx="3" fill="#F7F6F2" fillOpacity="0.95" stroke="#2A7F7F" strokeWidth="0.5" strokeOpacity="0.2" />
                  <text x="50" y="93" fill="#2A7F7F" fontSize="5" fontWeight="bold" textAnchor="middle" letterSpacing="0.8">TRELIS</text>
                  <text x="50" y="103" fill="#1e293b" fontSize="6.5" fontWeight="900" textAnchor="middle" letterSpacing="0.5">
                    {activeProductId === "p1" ? "GUT-SPARK" : "P-BLEND 01"}
                  </text>
                  <line x1="36" y1="108" x2="64" y2="108" stroke="#2A7F7F" strokeWidth="0.4" strokeOpacity="0.4" />
                  <text x="50" y="115" fill="#2A7F7F" fontSize="3" fontWeight="bold" textAnchor="middle" letterSpacing="0.4">ORGANIC WILD FERMENT</text>

                  {/* Liquid Glow Gradients */}
                  <defs>
                    <linearGradient id="liquidGlow" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#2A7F7F" stopOpacity="0.85" />
                      <stop offset="50%" stopColor="#206060" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#153f3f" stopOpacity="0.95" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Ambient Soft Glow underneath */}
                <div className="absolute bottom-[2%] w-[80%] h-4 bg-[#2A7F7F]/30 rounded-full blur-md opacity-70 -z-10" />
              </motion.div>

              {/* Formulation Locked overlay over bottle placeholder */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
                <div className="bg-slate-900/80 border border-[#2A7F7F]/30 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-[0_8px_32px_rgba(42,127,127,0.2)]">
                  <Lock className="w-3 h-3 text-[#2A7F7F]" />
                  <span className="text-[9px] font-semibold text-slate-100 uppercase tracking-widest">
                    Formulation Locked
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* Simple Footer */}
      <footer className="w-full text-center py-8 pb-28 md:pb-8 text-[10px] tracking-widest text-slate-400 font-light select-none relative z-10 border-t border-black/[0.02] bg-white/20">
        TRELIS LIFE SYSTEM • VER 4.0 • CRAFTED FOR STEADY PROGRESS
      </footer>
    </div>
  );
}

export default function HomeOSPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center text-xs text-slate-400 font-light">LOADING SYSTEM...</div>}>
      <HomeOSContent />
    </Suspense>
  );
}
