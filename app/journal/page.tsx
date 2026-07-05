"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { BookOpen, Sparkles } from "lucide-react";
import Navbar, { NavTab } from "@/components/Navbar";

export default function JournalHubPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<NavTab>("journal");

  const { scrollYProgress } = useScroll();
  const yFloating1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yFloating2 = useTransform(scrollYProgress, [0, 1], [0, 120]);

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

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F2] relative overflow-hidden text-slate-900">
      {/* Background Ambient SVG 1 */}
      <motion.div 
        style={{ y: yFloating1 }}
        className="absolute top-20 right-[-5%] w-64 h-64 pointer-events-none opacity-20 md:opacity-30 z-0"
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter blur-[1px]">
          <path d="M20,180 C60,140 140,110 180,20 C140,60 110,140 20,180 Z" fill="url(#leaf-grad)" />
          <defs>
            <linearGradient id="leaf-grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2A7F7F" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#86EFAC" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Background Ambient SVG 2 */}
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

      <Navbar activeTab="journal" setActiveTab={handleTabChange} />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-16 md:py-24 z-10 relative space-y-16">
        
        {/* HERO SECTION */}
        <section className="text-center space-y-6">
          <span className="text-[10px] tracking-widest text-[#2A7F7F] font-bold uppercase bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-4 py-1.5 rounded-full inline-block">
            Journal
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-slate-900 leading-[1.15] px-2">
            Notes, recipes, & guides.
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
            Detailed guides and simple, real food recipes built directly from our kitchen trials.
          </p>
        </section>

        {/* COLLECTIONS LIST */}
        <section className="space-y-8 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 border-b border-black/[0.05] pb-4">
            <BookOpen className="w-5 h-5 text-[#2A7F7F]" />
            <h3 className="text-sm font-bold tracking-widest uppercase text-slate-400">Active Collections</h3>
          </div>

          <div className="space-y-6">
            {/* FIRST BATCH Collection Card */}
            <motion.div
              whileHover={{ y: -4 }}
              onClick={() => router.push("/journal/first-batch")}
              className="group cursor-pointer bg-white rounded-[2rem] border border-black/[0.03] shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.03)] overflow-hidden transition-all duration-300"
            >
              <div className="relative aspect-[21/9] w-full bg-[#f3f0e8] overflow-hidden">
                <img 
                  src="/all_image_files/journal/first-batch/recipe-06-moong-dal-khichdi.jpg" 
                  alt="First Batch Cover"
                  className="w-full h-full object-cover object-center opacity-85 group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-[0.95]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent flex items-end p-6 md:p-8">
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest bg-[#2A7F7F] px-3 py-1 rounded-full shadow-sm">
                    21 Recipes · Guide
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-3">
                <h4 className="text-2xl font-light text-slate-900 group-hover:text-[#2A7F7F] transition-colors">
                  First Batch
                </h4>
                <p className="text-sm text-slate-500 font-light leading-relaxed">
                  21 simple recipes to start cooking real food that actually tastes good — even if you've never cooked before.
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#2A7F7F] uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-300">
                  <span>Start Reading</span>
                  <span className="text-sm">→</span>
                </div>
              </div>
            </motion.div>

            {/* COMING SOON Indicator */}
            <div className="pt-4 text-center">
              <span className="text-[10px] tracking-widest uppercase text-slate-400 font-light flex items-center justify-center gap-2">
                <Sparkles className="w-3 h-3 text-slate-300" />
                More collections cooking in the background
              </span>
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
