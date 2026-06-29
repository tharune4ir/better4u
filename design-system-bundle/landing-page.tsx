"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  Sparkle, 
  ArrowRight, 
  Leaf, 
  Flame, 
  Layers, 
  ArrowDown, 
  Check, 
  Activity, 
  Plus, 
  ShieldCheck, 
  HelpCircle,
  Volume2,
  ChevronDown
} from "lucide-react";

export default function LandingHub() {
  const router = useRouter();
  const [time, setTime] = useState("");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hoveredPhilosophy, setHoveredPhilosophy] = useState<"taste" | "science" | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // System Time Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Scroll Progress Tracking
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax / subtle transforms for scroll offsets
  const yHeroText = useTransform(scrollYProgress, [0, 0.25], [0, 60]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const scaleHeroGraphic = useTransform(scrollYProgress, [0, 0.3], [1, 0.85]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F2] relative overflow-hidden select-none font-sans text-slate-800">
      
      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.028)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.028)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none z-0" />

      {/* Scroll Progress Bar */}
      <motion.div 
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-[#2A7F7F] z-50 origin-left"
      />

      {/* ==================== STICKY TOP HEADER ==================== */}
      <header className="fixed top-0 w-full h-20 border-b border-black/[0.02] bg-[#F7F6F2]/75 backdrop-blur-md flex items-center justify-between px-6 md:px-12 z-30 select-none">
        {/* Brand/Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image
              src="/icons/icon-128.webp"
              alt="Trelis Logo"
              fill
              sizes="40px"
              className="object-contain"
              priority
            />
          </div>
          <Sparkle className="w-4 h-4 text-[#2A7F7F] animate-pulse" />
        </div>

        {/* Navigation Action Buttons (Glassmorphic) */}
        <div className="flex items-center gap-4">
          
          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-3.5">
            <button 
              onClick={() => router.push("/food")}
              className="px-5 py-2.5 bg-white/40 hover:bg-[#2A7F7F]/10 backdrop-blur-md border border-[#2A7F7F]/15 text-[#2A7F7F] hover:text-[#1e5c5c] rounded-full text-[11px] font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-[0_2px_12px_rgba(42,127,127,0.01)] hover:shadow-[0_4px_20px_rgba(42,127,127,0.08)] hover:scale-[1.02]"
            >
              <span>Food Wing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => router.push("/product-lab")}
              className="px-5 py-2.5 bg-white/40 hover:bg-[#2A7F7F]/10 backdrop-blur-md border border-[#2A7F7F]/15 text-[#2A7F7F] hover:text-[#1e5c5c] rounded-full text-[11px] font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-[0_2px_12px_rgba(42,127,127,0.01)] hover:shadow-[0_4px_20px_rgba(42,127,127,0.08)] hover:scale-[1.02]"
            >
              <span>Product Lab</span>
              <Sparkle className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Collapsible Button */}
          <div className="flex md:hidden items-center relative">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="px-4 py-2 bg-white/40 backdrop-blur-md border border-[#2A7F7F]/15 text-[#2A7F7F] rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 cursor-pointer hover:bg-white/80 active:scale-95 transition-all shadow-[0_2px_12px_rgba(42,127,127,0.01)]"
            >
              <span>Menu</span>
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </motion.div>
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="absolute top-20 left-0 right-0 bg-[#F7F6F2]/95 backdrop-blur-lg border-b border-black/[0.04] px-6 py-5 flex flex-col gap-3 shadow-xl z-20"
            >
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push("/food");
                }}
                className="w-full py-3 bg-white/60 border border-[#2A7F7F]/20 text-[#2A7F7F] rounded-full text-center text-xs font-semibold tracking-wider uppercase cursor-pointer"
              >
                Food Wing
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push("/product-lab");
                }}
                className="w-full py-3 bg-white/60 border border-[#2A7F7F]/20 text-[#2A7F7F] rounded-full text-center text-xs font-semibold tracking-wider uppercase cursor-pointer"
              >
                Product Lab
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ==================== ACT 1: THE HOOK (HERO) ==================== */}
      <section className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 pt-20 overflow-hidden">
        
        {/* Soft Blurry Gradient Blobs */}
        <div className="absolute top-[25%] left-[-10%] w-[50vw] h-[50vw] bg-emerald-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-10%] w-[45vw] h-[45vw] bg-[#2A7F7F]/[0.04] rounded-full blur-[140px] pointer-events-none" />

        {/* Elegant Botanical Background SVG (Act 1 Graphic) */}
        <motion.div
          style={reducedMotion ? {} : { scale: scaleHeroGraphic }}
          className="absolute right-[5%] bottom-[10%] w-[320px] h-[320px] md:w-[480px] md:h-[480px] opacity-10 md:opacity-[0.14] pointer-events-none z-0"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full fill-none stroke-[#2A7F7F] stroke-[0.5] rotate-12">
            <motion.path 
              animate={reducedMotion ? {} : {
                strokeDashoffset: [0, 400],
                transition: { duration: 40, repeat: Infinity, ease: "linear" }
              }}
              strokeDasharray="4,4"
              d="M100,10 C120,40 140,80 180,100 C140,120 120,160 100,190 C80,160 60,120 20,100 C60,80 80,40 100,10 Z" 
            />
            <circle cx="100" cy="100" r="40" strokeDasharray="2,5" />
            <circle cx="100" cy="100" r="75" />
            {/* Seed Lines */}
            <line x1="100" y1="10" x2="100" y2="190" />
            <line x1="20" y1="100" x2="180" y2="100" />
          </svg>
        </motion.div>

        <motion.div 
          style={reducedMotion ? {} : { y: yHeroText, opacity: opacityHero }}
          className="text-center max-w-4xl space-y-8 z-10 flex flex-col items-center"
        >
          <span className="text-[10px] tracking-widest text-[#2A7F7F] font-bold uppercase bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-4 py-1.5 rounded-full inline-block">
            Trelis Life Hub
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-slate-900 leading-[1.15] px-2 max-w-3xl">
            It starts in the gut. <br />
            And the gut is fixed at the <span className="font-semibold text-slate-950 italic">table</span>.
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-500 font-light max-w-xl leading-relaxed">
            Rebuilding microbiome diversity through a taste-first, prebiotic-rich whole food engine. Simplicity over clinical posture.
          </p>

          {/* Accent breathing ring */}
          <motion.div 
            animate={reducedMotion ? {} : {
              scale: [1, 1.06, 1],
              borderColor: ["rgba(42,127,127,0.15)", "rgba(42,127,127,0.35)", "rgba(42,127,127,0.15)"],
              transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-16 h-16 rounded-full border border-[#2A7F7F]/20 flex items-center justify-center mt-6"
          >
            <motion.div 
              animate={reducedMotion ? {} : {
                scale: [1, 0.85, 1],
                transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-2.5 h-2.5 rounded-full bg-[#2A7F7F]"
            />
          </motion.div>

          <div className="absolute bottom-10 flex flex-col items-center gap-1.5 opacity-60">
            <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">Scroll to Discover</span>
            <ArrowDown className="w-3.5 h-3.5 text-slate-400 animate-bounce" />
          </div>

        </motion.div>
      </section>

      {/* ==================== ACT 2: THE PROBLEM (MICROBIOME THEME) ==================== */}
      <section className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 py-20 bg-white/40 border-y border-black/[0.01]">
        
        {/* Animated Microbiome Floating Bubbles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <motion.div 
            animate={reducedMotion ? {} : {
              y: [0, -30, 0],
              x: [0, 15, 0],
              transition: { duration: 12, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute top-1/4 left-[15%] w-16 h-16 rounded-full bg-emerald-500/[0.04] border border-emerald-500/10 flex items-center justify-center"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500/5" />
          </motion.div>

          <motion.div 
            animate={reducedMotion ? {} : {
              y: [0, 45, 0],
              x: [0, -25, 0],
              transition: { duration: 15, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute bottom-1/4 right-[10%] w-24 h-24 rounded-full bg-[#2A7F7F]/[0.03] border border-[#2A7F7F]/10 flex items-center justify-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#2A7F7F]/5" />
          </motion.div>
        </div>

        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10 relative">
          
          <div className="space-y-6">
            <span className="text-[9px] tracking-widest text-[#2A7F7F] font-bold uppercase block">
              The Reality
            </span>
            <h2 className="text-3xl font-light tracking-tight text-slate-900 leading-tight">
              Modern diet quietly <span className="font-semibold text-slate-950">erodes</span> our inner ecosystem.
            </h2>
            <p className="text-sm text-slate-500 font-light leading-relaxed">
              Ultra-processed food structures, emulsifiers, and monoculture diets leave the microbiome starved. Science links this internal depletion directly to chronic energy declines, sleep issues, and low digestive resilience.
            </p>
            <p className="text-xs text-slate-400 font-light italic border-l border-slate-200 pl-4 mt-4">
              "We have sacrificed biological complexity for commercial convenience."
            </p>
          </div>

          {/* Staggered statistics with circular radial progress bars */}
          <div className="space-y-6 bg-[#F7F6F2]/60 border border-black/[0.02] rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
            
            {/* Stat 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-5 pb-5 border-b border-black/[0.02]"
            >
              <div className="relative w-14 h-14 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="28" cy="28" r="24" className="stroke-slate-200 fill-none" strokeWidth="3" />
                  <motion.circle 
                    cx="28" cy="28" r="24" 
                    className="stroke-[#2A7F7F] fill-none" 
                    strokeWidth="3.5" 
                    strokeDasharray="150"
                    initial={{ strokeDashoffset: 150 }}
                    whileInView={{ strokeDashoffset: 150 - (150 * 0.70) }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-700">70%</div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Immune System Defense</h4>
                <p className="text-[11px] text-slate-500 font-light mt-0.5">resides directly within the lining of the gut wall.</p>
              </div>
            </motion.div>

            {/* Stat 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex items-center gap-5 pb-5 border-b border-black/[0.02]"
            >
              <div className="relative w-14 h-14 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="28" cy="28" r="24" className="stroke-slate-200 fill-none" strokeWidth="3" />
                  <motion.circle 
                    cx="28" cy="28" r="24" 
                    className="stroke-amber-500 fill-none" 
                    strokeWidth="3.5" 
                    strokeDasharray="150"
                    initial={{ strokeDashoffset: 150 }}
                    whileInView={{ strokeDashoffset: 150 - (150 * 0.90) }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-700">90%</div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Serotonin Synthesis</h4>
                <p className="text-[11px] text-slate-500 font-light mt-0.5">of the body's serotonin is manufactured by gut microbes.</p>
              </div>
            </motion.div>

            {/* Stat 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex items-center gap-5"
            >
              <div className="relative w-14 h-14 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="28" cy="28" r="24" className="stroke-slate-200 fill-none" strokeWidth="3" />
                  <motion.circle 
                    cx="28" cy="28" r="24" 
                    className="stroke-emerald-600 fill-none" 
                    strokeWidth="3.5" 
                    strokeDasharray="150"
                    initial={{ strokeDashoffset: 150 }}
                    whileInView={{ strokeDashoffset: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-700">30+</div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Plant Diversity Sweet Spot</h4>
                <p className="text-[11px] text-slate-500 font-light mt-0.5">different plant species per week yields max microbiome diversity.</p>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ==================== ACT 3: THE INSIGHT (INTERACTIVE SLIDER) ==================== */}
      <section className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 py-20 overflow-hidden">
        
        {/* Interactive Convergence Venn Overlay Background */}
        <div className="absolute w-[400px] h-[400px] pointer-events-none opacity-[0.03] md:opacity-[0.06] z-0">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="75" cy="100" r="60" fill="#2A7F7F" />
            <circle cx="125" cy="100" r="60" fill="#F59E0B" />
          </svg>
        </div>

        <div className="max-w-4xl w-full text-center space-y-10 z-10 relative">
          
          <div className="space-y-4">
            <span className="text-[9px] tracking-widest text-[#2A7F7F] font-bold uppercase">
              The Shift
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-900 leading-tight">
              No willpower. No dry cardboard bowls. <br />
              Just <span className="font-semibold text-slate-950">crave-worthy</span> food that serves you.
            </h2>
            <p className="text-xs text-slate-500 font-light max-w-lg mx-auto">
              Hover over each pillar below to see how our design philosophy brings them together.
            </p>
          </div>

          {/* Interactive Split cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch max-w-3xl mx-auto">
            
            {/* Taste pillar */}
            <motion.div 
              onMouseEnter={() => setHoveredPhilosophy("taste")}
              onMouseLeave={() => setHoveredPhilosophy(null)}
              animate={{
                scale: hoveredPhilosophy === "taste" ? 1.02 : hoveredPhilosophy === "science" ? 0.98 : 1,
                borderColor: hoveredPhilosophy === "taste" ? "rgba(245,158,11,0.3)" : "rgba(0,0,0,0.02)",
                opacity: hoveredPhilosophy === "science" ? 0.6 : 1,
              }}
              className="bg-white/40 border border-black/[0.02] rounded-3xl p-8 flex flex-col justify-between items-center text-center transition-all duration-300 relative overflow-hidden"
            >
              {/* Flame background glow */}
              {hoveredPhilosophy === "taste" && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-amber-500/[0.02] pointer-events-none"
                />
              )}
              <div className="w-12 h-12 rounded-2xl bg-amber-500/5 flex items-center justify-center border border-amber-500/10 mb-4 transition-transform duration-500 group-hover:rotate-6">
                <Flame className="w-6 h-6 text-amber-600 animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                  Taste-First Indulgence
                </h4>
                <p className="text-xs text-slate-500 font-light mt-3 leading-relaxed">
                  Wild black-carrot tonics, warm spiced khichdi with pure cow ghee, and crisp buttermilk. Ferments and whole grains optimized for maximum sensory pleasure first.
                </p>
              </div>
            </motion.div>

            {/* Science pillar */}
            <motion.div 
              onMouseEnter={() => setHoveredPhilosophy("science")}
              onMouseLeave={() => setHoveredPhilosophy(null)}
              animate={{
                scale: hoveredPhilosophy === "science" ? 1.02 : hoveredPhilosophy === "taste" ? 0.98 : 1,
                borderColor: hoveredPhilosophy === "science" ? "rgba(42,127,127,0.3)" : "rgba(0,0,0,0.02)",
                opacity: hoveredPhilosophy === "taste" ? 0.6 : 1,
              }}
              className="bg-white/40 border border-black/[0.02] rounded-3xl p-8 flex flex-col justify-between items-center text-center transition-all duration-300 relative overflow-hidden"
            >
              {/* Leaf background glow */}
              {hoveredPhilosophy === "science" && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-[#2A7F7F]/[0.02] pointer-events-none"
                />
              )}
              <div className="w-12 h-12 rounded-2xl bg-[#2A7F7F]/5 flex items-center justify-center border border-[#2A7F7F]/10 mb-4">
                <Leaf className="w-6 h-6 text-[#2A7F7F]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                  Scientific Rigor
                </h4>
                <p className="text-xs text-slate-500 font-light mt-3 leading-relaxed">
                  Engineered around the modern gut protocol: 30+ weekly botanical species, polyphenol density, and prebiotic fiber variety to nurture a resilient ecosystem.
                </p>
              </div>
            </motion.div>

          </div>

          <div className="pt-4 text-slate-400 text-xs font-light italic">
            "We believe nourishment is not a test of endurance, but an art of flavor."
          </div>

        </div>
      </section>

      {/* ==================== ACT 4: THE METHOD (INTERACTIVE GRID) ==================== */}
      <section className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 py-20 bg-white/20 border-t border-black/[0.01]">
        
        <div className="max-w-4xl w-full space-y-12">
          
          <div className="text-center md:text-left space-y-2">
            <span className="text-[9px] tracking-widest text-[#2A7F7F] font-bold uppercase">
              The Method
            </span>
            <h2 className="text-3xl font-light tracking-tight text-slate-900">
              The Trelis Food <span className="font-semibold text-slate-950">Engine</span>
            </h2>
            <p className="text-xs text-slate-500 font-light max-w-md">
              A comprehensive system of checklists, live logs, recipes, and foundations to make dietary diversity effortless.
            </p>
          </div>

          {/* Graphic representations inside cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Card: Plants */}
            <motion.div 
              whileHover={{ y: -4, borderColor: "rgba(42,127,127,0.2)" }}
              className="bg-white/50 border border-black/[0.02] rounded-3xl p-6 sm:p-8 flex flex-col justify-between min-h-[220px] transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.02)] relative overflow-hidden group"
            >
              <div className="absolute right-[-20px] top-[-20px] opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                <Leaf className="w-40 h-40 text-slate-800" />
              </div>
              <div className="z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pillar 01</span>
                  <Leaf className="w-4.5 h-4.5 text-[#2A7F7F]" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-5">
                  30+ Weekly Plants Checklist
                </h3>
                <p className="text-xs text-slate-500 font-light mt-2 leading-relaxed">
                  Log whole grains, seeds, greens, and spices. Monitor your category distribution (Grains, Fibers, Ferments) in real-time.
                </p>
              </div>
              <div className="flex items-center gap-1.5 mt-6 text-[10px] font-bold text-[#2A7F7F] uppercase tracking-wider z-10">
                <span>Check off plants</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>

            {/* Card: Ferments */}
            <motion.div 
              whileHover={{ y: -4, borderColor: "rgba(42,127,127,0.2)" }}
              className="bg-white/50 border border-black/[0.02] rounded-3xl p-6 sm:p-8 flex flex-col justify-between min-h-[220px] transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.02)] relative overflow-hidden group"
            >
              <div className="absolute right-[-20px] top-[-20px] opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                <Layers className="w-40 h-40 text-slate-800" />
              </div>
              <div className="z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pillar 02</span>
                  <Layers className="w-4.5 h-4.5 text-[#2A7F7F]" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-5">
                  3 Daily Probiotics Logger
                </h3>
                <p className="text-xs text-slate-500 font-light mt-2 leading-relaxed">
                  Track and log your daily live cultures. Structured slots make it easy to remember your morning kanji, noon buttermilk, and fermented dinners.
                </p>
              </div>
              <div className="flex items-center gap-1.5 mt-6 text-[10px] font-bold text-[#2A7F7F] uppercase tracking-wider z-10">
                <span>View daily logs</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>

          </div>

          {/* Action button to enter food wing */}
          <div className="flex justify-center pt-4">
            <button
              onClick={() => router.push("/food")}
              className="px-6 py-3 bg-[#2A7F7F] text-white rounded-full text-xs font-semibold tracking-widest uppercase shadow-md hover:bg-[#1e5c5c] hover:shadow-lg transition-all flex items-center gap-2.5 cursor-pointer group"
            >
              <span>Explore the Food Wing</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>



      {/* ==================== ACT 6: THE VISION (CLEAN BRANDING - NO VAULT LINK) ==================== */}
      <section className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 py-20 text-center">
        
        <div className="max-w-xl space-y-8 z-10 relative">
          <span className="text-[9px] tracking-widest text-[#2A7F7F] font-bold uppercase">
            The Vision
          </span>
          
          <h2 className="text-2xl sm:text-3xl font-light text-slate-900 leading-relaxed px-4">
            We are building a real-world, taste-first <span className="font-semibold text-slate-950">better-for-you food brand</span>. 
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed max-w-md mx-auto">
            Transparently developed, clean-labeled, and focused on gut-friendly convenience staples. Built entirely in the open, one batch at a time.
          </p>

          {/* Custom minimal illustration of seeds/grain as section graphic */}
          <div className="w-24 h-24 mx-auto opacity-30 mt-6">
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-slate-600 stroke-[1] fill-none">
              <path d="M50,10 C60,40 50,70 50,90" />
              {/* Leaves/grains branching off */}
              <path d="M50,30 C58,25 62,30 50,45" />
              <path d="M50,30 C42,25 38,30 50,45" />
              <path d="M50,50 C58,45 62,50 50,65" />
              <path d="M50,50 C42,45 38,50 50,65" />
              <path d="M50,70 C58,65 62,70 50,85" />
              <path d="M50,70 C42,65 38,70 50,85" />
            </svg>
          </div>

          <div className="pt-8 border-t border-black/[0.04] max-w-xs mx-auto flex flex-col items-center">
            <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase">
              AUTHENTIC PROGRESS
            </span>
          </div>
        </div>

      </section>

      {/* Footer */}
      <footer className="w-full text-center py-10 text-[10px] tracking-widest text-slate-400 font-light select-none border-t border-black/[0.02] bg-white/20 z-10">
        BUILT IN THE OPEN. ONE BATCH AT A TIME.
      </footer>

    </div>
  );
}
