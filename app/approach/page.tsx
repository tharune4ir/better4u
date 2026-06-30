"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight,
  ArrowRightLeft,
  Sparkle,
  HeartHandshake
} from "lucide-react";
import Navbar, { NavTab } from "@/components/Navbar";

export default function ApproachPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<NavTab>("approach");
  
  // Scroll animations for background SVGs
  const { scrollYProgress } = useScroll();
  const yFloating1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yFloating2 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    if (tab === "product-lab") {
      router.push("/product-lab");
    } else if (tab === "approach") {
      router.push("/approach");
    } else if (tab === "journal") {
      router.push("/journal");
    }
  };

  const swaps = [
    { instead: "Cola", reachFor: "JOSH · Masala Cola" },
    { instead: "Nimbu / goli soda", reachFor: "ALIVE · Lime / Ginger" },
    { instead: "Sugary lassi / yogurt drinks", reachFor: "BATCH · Strawberry Kefir" },
    { instead: "Green juice / skipped breakfast", reachFor: "PULP · Green Reset" },
    { instead: "Store kombucha / sugary tonics", reachFor: "BATCH · Kanji / Jamun-Lime Kombucha" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F2] relative overflow-hidden text-slate-900">
      
      {/* Background Ambient Elements */}
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

      <Navbar activeTab="approach" setActiveTab={handleTabChange} />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-16 md:py-24 z-10 relative space-y-24">
        
        {/* 1. HERO */}
        <section className="text-center space-y-6">
          <span className="text-[10px] tracking-widest text-[#2A7F7F] font-bold uppercase bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-4 py-1.5 rounded-full inline-block">
            The Approach
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-slate-900 leading-[1.15] px-2">
            The default is hurting us.
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
            In our cities a sugary soda or shake follows almost every meal — it's the default, and it's quietly wrecking our gut and energy.
          </p>
        </section>

        {/* 2. THE SHIFT */}
        <section className="bg-white/40 glassmorphic p-8 md:p-12 rounded-[2rem] border border-black/[0.03] shadow-[0_8px_40px_rgba(0,0,0,0.02)] text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight mb-4 text-slate-900 leading-snug">
            We're not asking you to give it up. <br className="hidden md:block" />
            <span className="text-[#2A7F7F] font-medium">We're giving you the better-tasting swap.</span>
          </h2>
        </section>

        {/* 3. THE SWAP */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 border-b border-black/[0.05] pb-4">
            <ArrowRightLeft className="w-5 h-5 text-[#2A7F7F]" />
            <h3 className="text-xl font-semibold tracking-wide uppercase text-slate-800">The Swap</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {swaps.map((swap, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -2 }}
                className="flex flex-col bg-white/60 p-5 rounded-2xl border border-black/[0.03] shadow-sm group hover:shadow-md transition-all duration-300"
              >
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Instead of</span>
                <span className="text-sm sm:text-base text-slate-500 font-light line-through decoration-slate-300 mb-4">
                  {swap.instead}
                </span>
                
                <span className="text-[10px] font-bold text-[#2A7F7F] uppercase tracking-widest mb-1 mt-auto">Reach for</span>
                <span className="text-base sm:text-lg font-bold text-slate-900">
                  {swap.reachFor}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. WHAT "BETTER" MEANS */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 border-b border-black/[0.05] pb-4">
            <Sparkle className="w-5 h-5 text-[#2A7F7F]" />
            <h3 className="text-xl font-semibold tracking-wide uppercase text-slate-800">What "Better" Means</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-900">Real Ingredients</h4>
              <p className="text-sm text-slate-600 font-light leading-relaxed">
                Real fermentation and plant fibre, naturally sourced without the artificial shortcuts.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-900">Familiar Flavours</h4>
              <p className="text-sm text-slate-600 font-light leading-relaxed">
                Classic Indian tastes you grew up with, crafted with much less sugar so you can drink them daily.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-900">A Simple Philosophy</h4>
              <p className="text-sm text-slate-600 font-light leading-relaxed">
                Our approach is straightforward: aim for 30+ plants and 3 ferments over the week.
              </p>
            </div>
          </div>
        </section>

        {/* 5. BUILT IN THE OPEN */}
        <section className="bg-white/60 p-8 md:p-12 rounded-[2.5rem] border border-black/[0.03] shadow-[0_8px_40px_rgba(0,0,0,0.02)] relative overflow-hidden text-center md:text-left">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#2A7F7F]/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-lg mx-auto md:mx-0">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <HeartHandshake className="w-5 h-5 text-[#2A7F7F]" />
                <h3 className="text-[10px] font-bold tracking-widest uppercase text-[#2A7F7F]">Built in the Open</h3>
              </div>
              <p className="text-sm md:text-base font-light leading-relaxed text-slate-600">
                We are a small, obsessed team making small batches and sharing everything as we go. We aren't a massive corporation—we're just building what we want to drink.
              </p>
            </div>
            
            {/* 6. BRIDGE CTA */}
            <div className="flex justify-center md:justify-end w-full md:w-auto mt-4 md:mt-0">
              <button 
                onClick={() => router.push("/product-lab")}
                className="px-8 py-3.5 bg-[#2A7F7F] hover:bg-[#1e5c5c] text-white rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-3 cursor-pointer shadow-[0_4px_14px_rgba(42,127,127,0.3)] hover:shadow-[0_6px_20px_rgba(42,127,127,0.4)] group"
              >
                <span>Meet the full range</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full text-center py-10 text-[10px] tracking-widest text-slate-400 font-light select-none border-t border-black/[0.02] bg-white/20 relative z-10">
        BUILT IN THE OPEN. ONE BATCH AT A TIME.
      </footer>
    </div>
  );
}
