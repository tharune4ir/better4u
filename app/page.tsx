"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  Sparkle, 
  ArrowRight, 
  ArrowDown, 
  ChevronDown,
  Droplets,
  HeartPulse,
  HeartHandshake,
  Search,
  Layers
} from "lucide-react";

export default function LandingHub() {
  const router = useRouter();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
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
              src="/icons/icon-128.png"
              alt="better4u Logo"
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
              onClick={() => router.push("/approach")}
              className="px-5 py-2.5 bg-white/40 hover:bg-[#2A7F7F]/10 backdrop-blur-md border border-[#2A7F7F]/15 text-[#2A7F7F] hover:text-[#1e5c5c] rounded-full text-[11px] font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-[0_2px_12px_rgba(42,127,127,0.01)] hover:shadow-[0_4px_20px_rgba(42,127,127,0.08)] hover:scale-[1.02]"
            >
              <span>The Approach</span>
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
                  router.push("/approach");
                }}
                className="w-full py-3 bg-white/60 border border-[#2A7F7F]/20 text-[#2A7F7F] rounded-full text-center text-xs font-semibold tracking-wider uppercase cursor-pointer"
              >
                The Approach
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

      {/* ==================== 1. HERO ==================== */}
      <section className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 pt-20 overflow-hidden">
        
        {/* Soft Blurry Gradient Blobs */}
        <div className="absolute top-[25%] left-[-10%] w-[50vw] h-[50vw] bg-emerald-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-10%] w-[45vw] h-[45vw] bg-[#2A7F7F]/[0.04] rounded-full blur-[140px] pointer-events-none" />

        {/* Elegant Botanical Background SVG */}
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
            BUILT IN THE OPEN
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-slate-900 leading-[1.15] px-2 max-w-3xl">
            Real food that actually <span className="font-semibold text-slate-950 italic">tastes good</span>.
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-500 font-light max-w-xl leading-relaxed">
            better4u makes better-for-you versions of the food and drinks people reach for every day — familiar flavours, real ingredients, and a lot less sugar.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            <button 
              onClick={() => router.push("/product-lab")}
              className="px-8 py-3.5 bg-[#2A7F7F] hover:bg-[#1e5c5c] text-white rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-3 cursor-pointer shadow-[0_4px_14px_rgba(42,127,127,0.3)] hover:shadow-[0_6px_20px_rgba(42,127,127,0.4)] hover:scale-[1.02]"
            >
              <span>See the range</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => router.push("/approach")}
              className="px-8 py-3.5 bg-white/60 hover:bg-white text-slate-800 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 border border-slate-200 shadow-sm hover:shadow-md cursor-pointer"
            >
              <span>Why we exist</span>
            </button>
          </div>

        </motion.div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 pointer-events-none">
          <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">Scroll to Discover</span>
          <ArrowDown className="w-3.5 h-3.5 text-slate-400 animate-bounce" />
        </div>
      </section>

      {/* ==================== 2. THE PROBLEM ==================== */}
      <section className="relative w-full flex flex-col justify-center items-center px-6 py-24 bg-white/40 border-y border-black/[0.01]">
        <div className="max-w-4xl mx-auto text-center space-y-8 z-10 px-4">
          <span className="text-[9px] tracking-widest text-[#2A7F7F] font-bold uppercase block">
            The Default
          </span>
          <h2 className="text-2xl sm:text-3xl font-light text-slate-900 leading-relaxed px-4">
            Everyday food and drink defaults aren't doing us any favours.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed max-w-md mx-auto">
            A sugary soda, processed snack, or heavy dessert follows almost every meal. better4u makes the better-tasting, better-for-you version.
          </p>
        </div>
      </section>

      {/* ==================== 3. THE INSIGHT ==================== */}
      <section className="relative w-full flex flex-col justify-center items-center px-6 py-24 z-10">
        <div className="max-w-4xl mx-auto bg-white/60 glassmorphic rounded-[2.5rem] p-8 md:p-12 border border-black/[0.03] shadow-[0_8px_40px_rgba(0,0,0,0.02)] text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#2A7F7F]/5 rounded-full blur-[80px] pointer-events-none" />
          
          <Search className="w-6 h-6 text-[#2A7F7F] mx-auto opacity-70" />
          <h2 className="text-2xl sm:text-3xl font-light text-slate-900 leading-relaxed px-4">
            We didn't make another diet food or health drink — <br className="hidden md:block" />
            we remade the everyday foods and drinks you already reach for, better.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed max-w-md mx-auto">
            Because food should be food first. Taste is how you make healthy habits stick.
          </p>
        </div>
      </section>

      {/* ==================== 4. THE UNIVERSE (Investor Money Slide) ==================== */}
      <section className="relative w-full px-6 py-24 bg-white/30 border-y border-black/[0.02]">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="text-[9px] tracking-widest text-[#2A7F7F] font-bold uppercase">
              The Universe
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-slate-900 leading-relaxed px-4">
              House of better4u
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed max-w-md mx-auto">
              Every time you'd reach for the unhealthy default, better4u has the better-tasting version.
            </p>
                    </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* ALIVE */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-white/70 p-6 rounded-[1.5rem] border border-black/[0.03] shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:shadow-[0_10px_35px_rgba(0,0,0,0.035)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <h3 className="text-xl font-light tracking-wide text-slate-900">ALIVE</h3>
                  <span className="text-[8px] font-bold tracking-widest text-[#2A7F7F] uppercase bg-[#2A7F7F]/5 px-2.5 py-0.5 rounded-md border border-[#2A7F7F]/10">
                    Glass
                  </span>
                </div>
                <p className="text-sm text-slate-600 font-light leading-relaxed mb-6">
                  Better-for-you probiotic soda.
                </p>
              </div>
              
              <div className="pt-3.5 border-t border-black/[0.03] flex items-center justify-between gap-3">
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest flex-shrink-0">
                  Replaces
                </span>
                <span className="text-xs text-slate-500 font-light text-right leading-tight">
                  nimbu/goli soda & sweet colas.
                </span>
              </div>
            </motion.div>

            {/* JOSH */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-white/70 p-6 rounded-[1.5rem] border border-black/[0.03] shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:shadow-[0_10px_35px_rgba(0,0,0,0.035)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <h3 className="text-xl font-light tracking-wide text-slate-900">JOSH</h3>
                  <span className="text-[8px] font-bold tracking-widest text-[#2A7F7F] uppercase bg-[#2A7F7F]/5 px-2.5 py-0.5 rounded-md border border-[#2A7F7F]/10">
                    Can
                  </span>
                </div>
                <p className="text-sm text-slate-600 font-light leading-relaxed mb-6">
                  Prebiotic fizz.
                </p>
              </div>
              
              <div className="pt-3.5 border-t border-black/[0.03] flex items-center justify-between gap-3">
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest flex-shrink-0">
                  Replaces
                </span>
                <span className="text-xs text-slate-500 font-light text-right leading-tight">
                  cola, gola, orange/rose pops.
                </span>
              </div>
            </motion.div>

            {/* BATCH */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-white/70 p-6 rounded-[1.5rem] border border-black/[0.03] shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:shadow-[0_10px_35px_rgba(0,0,0,0.035)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <h3 className="text-xl font-light tracking-wide text-slate-900">BATCH</h3>
                  <span className="text-[8px] font-bold tracking-widest text-[#2A7F7F] uppercase bg-[#2A7F7F]/5 px-2.5 py-0.5 rounded-md border border-[#2A7F7F]/10">
                    Cup
                  </span>
                </div>
                <p className="text-sm text-slate-600 font-light leading-relaxed mb-6">
                  Fresh ferments, made daily.
                </p>
              </div>
              
              <div className="pt-3.5 border-t border-black/[0.03] flex items-center justify-between gap-3">
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest flex-shrink-0">
                  Replaces
                </span>
                <span className="text-xs text-slate-500 font-light text-right leading-tight">
                  sugary tonics, store kombucha, lassi.
                </span>
              </div>
            </motion.div>

            {/* PULP */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-white/70 p-6 rounded-[1.5rem] border border-black/[0.03] shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:shadow-[0_10px_35px_rgba(0,0,0,0.035)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <h3 className="text-xl font-light tracking-wide text-slate-900">PULP</h3>
                  <span className="text-[8px] font-bold tracking-widest text-[#2A7F7F] uppercase bg-[#2A7F7F]/5 px-2.5 py-0.5 rounded-md border border-[#2A7F7F]/10">
                    Cup
                  </span>
                </div>
                <p className="text-sm text-slate-600 font-light leading-relaxed mb-6">
                  Active culture smoothies.
                </p>
              </div>
              
              <div className="pt-3.5 border-t border-black/[0.03] flex items-center justify-between gap-3">
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest flex-shrink-0">
                  Replaces
                </span>
                <span className="text-xs text-slate-500 font-light text-right leading-tight">
                  green juice, mango shakes, skipped breakfasts.
                </span>
              </div>
            </motion.div>

            {/* STEEP */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-white/70 p-6 rounded-[1.5rem] border border-black/[0.03] shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:shadow-[0_10px_35px_rgba(0,0,0,0.035)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <h3 className="text-xl font-light tracking-wide text-slate-900">STEEP</h3>
                  <span className="text-[8px] font-bold tracking-widest text-[#2A7F7F] uppercase bg-[#2A7F7F]/5 px-2.5 py-0.5 rounded-md border border-[#2A7F7F]/10">
                    Mug
                  </span>
                </div>
                <p className="text-sm text-slate-600 font-light leading-relaxed mb-6">
                  Hot botanical brews.
                </p>
              </div>
              
              <div className="pt-3.5 border-t border-black/[0.03] flex items-center justify-between gap-3">
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest flex-shrink-0">
                  Replaces
                </span>
                <span className="text-xs text-slate-500 font-light text-right leading-tight">
                  sugary chai, instant coffee, dessert sweets.
                </span>
              </div>
            </motion.div>

            {/* GRIT */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-white/70 p-6 rounded-[1.5rem] border border-black/[0.03] shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:shadow-[0_10px_35px_rgba(0,0,0,0.035)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <h3 className="text-xl font-light tracking-wide text-slate-900">GRIT</h3>
                  <span className="text-[8px] font-bold tracking-widest text-[#2A7F7F] uppercase bg-[#2A7F7F]/5 px-2.5 py-0.5 rounded-md border border-[#2A7F7F]/10">
                    Bar
                  </span>
                </div>
                <p className="text-sm text-slate-600 font-light leading-relaxed mb-6">
                  Whole-food bars & bites.
                </p>
              </div>
              
              <div className="pt-3.5 border-t border-black/[0.03] flex items-center justify-between gap-3">
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest flex-shrink-0">
                  Replaces
                </span>
                <span className="text-xs text-slate-500 font-light text-right leading-tight">
                  sugary granola bars, biscuits, fried namkeen.
                </span>
              </div>
            </motion.div>

            {/* PAUSE */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-white/70 p-6 rounded-[1.5rem] border border-black/[0.03] shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:shadow-[0_10px_35px_rgba(0,0,0,0.035)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <h3 className="text-xl font-light tracking-wide text-slate-900">PAUSE</h3>
                  <span className="text-[8px] font-bold tracking-widest text-[#2A7F7F] uppercase bg-[#2A7F7F]/5 px-2.5 py-0.5 rounded-md border border-[#2A7F7F]/10">
                    RTD
                  </span>
                </div>
                <p className="text-sm text-slate-600 font-light leading-relaxed mb-6">
                  Better-for-you protein, ready to drink.
                </p>
              </div>
              
              <div className="pt-3.5 border-t border-black/[0.03] flex items-center justify-between gap-3">
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest flex-shrink-0">
                  Replaces
                </span>
                <span className="text-xs text-slate-500 font-light text-right leading-tight">
                  sugary protein shakes & mass-gainers.
                </span>
              </div>
            </motion.div>

          </div>

          <div className="flex justify-center pt-8">
            <button
              onClick={() => router.push("/product-lab")}
              className="px-6 py-3 bg-[#2A7F7F] text-white rounded-full text-xs font-semibold tracking-widest uppercase shadow-md hover:bg-[#1e5c5c] hover:shadow-lg transition-all flex items-center gap-2.5 cursor-pointer group"
            >
              <span>Explore the Universe</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ==================== 5. HOW WE WORK ==================== */}
      <section className="relative w-full flex flex-col justify-center items-center px-6 py-24">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5 text-emerald-600" />
            </div>
            <h4 className="text-lg font-semibold text-slate-900">Built in the Open</h4>
            <p className="text-sm text-slate-500 font-light leading-relaxed">
              We make small batches and share everything as we go.
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <Droplets className="w-5 h-5 text-emerald-600" />
            </div>
            <h4 className="text-lg font-semibold text-slate-900">Familiar Indian Flavours</h4>
            <p className="text-sm text-slate-500 font-light leading-relaxed">
              Nostalgic tastes you know, without the nasty additives.
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <Layers className="w-5 h-5 text-emerald-600" />
            </div>
            <h4 className="text-lg font-semibold text-slate-900">Less Sugar, More Plants</h4>
            <p className="text-sm text-slate-500 font-light leading-relaxed">
              Much less sugar. Packed with plant diversity and real ferments.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== 6. VISION ==================== */}
      <section className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 py-20 text-center">
        
        <div className="max-w-xl space-y-8 z-10 relative">
          <span className="text-[9px] tracking-widest text-[#2A7F7F] font-bold uppercase">
            The Vision
          </span>
          
          <h2 className="text-2xl sm:text-3xl font-light text-slate-900 leading-relaxed px-4">
            A better-for-you version of the food and drink you reach for, all day.
          </h2>

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

          <div className="flex justify-center pt-8">
            <button 
              onClick={() => router.push("/product-lab")}
              className="px-6 py-3 bg-[#2A7F7F] hover:bg-[#1e5c5c] text-white rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-3 cursor-pointer shadow-[0_4px_14px_rgba(42,127,127,0.3)] hover:shadow-[0_6px_20px_rgba(42,127,127,0.4)] group"
            >
              <span>Explore the Product Lab</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="w-full text-center py-10 text-[10px] tracking-widest text-slate-400 font-light select-none border-t border-black/[0.02] bg-white/20 z-10">
        BUILT IN THE OPEN. ONE BATCH AT A TIME.
      </footer>

    </div>
  );
}
