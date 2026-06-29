"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  Sparkle, 
  ArrowRight, 
  BookOpen, 
  Leaf, 
  Check, 
  Plus, 
  Lock, 
  ArrowDown, 
  Flame, 
  Layers
} from "lucide-react";

export default function LandingHub() {
  const router = useRouter();
  const [time, setTime] = useState("");
  const [reducedMotion, setReducedMotion] = useState(false);

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
  const yHeroText = useTransform(scrollYProgress, [0, 0.25], [0, 80]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const yRing = useTransform(scrollYProgress, [0, 0.3], [0, -40]);

  // Act 2 Stats Trigger mock values (static markup with staggered fades)
  const stats = [
    { value: "70%", label: "of immune system defenses reside within the gut wall" },
    { value: "90%", label: "of serotonin is synthesized by gut microbes" },
    { value: "30+", label: "different plant varieties per week boosts microbiome diversity" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F2] relative overflow-hidden select-none font-sans text-slate-800">
      
      {/* Scroll Progress Bar */}
      <motion.div 
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-[#2A7F7F] z-50 origin-left"
      />

      {/* Top Floating Header */}
      <header className="fixed top-0 w-full h-20 border-b border-black/[0.02] bg-[#F7F6F2]/75 backdrop-blur-md flex items-center justify-between px-6 md:px-12 z-30 select-none">
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

        <div className="flex items-center gap-4 text-right">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-700 tabular-nums">
              {time}
            </span>
            <span className="text-[9px] tracking-wider text-slate-400 uppercase font-light mt-0.5">
              System Ready
            </span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#2A7F7F] animate-pulse shadow-sm shadow-[#2A7F7F]/50" />
        </div>
      </header>

      {/* ACT 1: THE HOOK (HERO) */}
      <section className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 pt-20 overflow-hidden">
        
        {/* Soft Aurora Drift Background */}
        <div className="absolute top-[20%] left-[-15%] w-[45vw] h-[45vw] bg-emerald-500/[0.04] rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-15%] w-[45vw] h-[45vw] bg-[#2A7F7F]/[0.05] rounded-full blur-[140px] pointer-events-none" />

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
            style={reducedMotion ? {} : { y: yRing }}
            animate={reducedMotion ? {} : {
              scale: [1, 1.05, 1],
              borderColor: ["rgba(42,127,127,0.15)", "rgba(42,127,127,0.35)", "rgba(42,127,127,0.15)"],
              transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-16 h-16 rounded-full border border-[#2A7F7F]/20 flex items-center justify-center mt-6"
          >
            <motion.div 
              animate={reducedMotion ? {} : {
                scale: [1, 0.9, 1],
                transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-2 h-2 rounded-full bg-[#2A7F7F]"
            />
          </motion.div>

          <div className="absolute bottom-10 flex flex-col items-center gap-1.5 opacity-60">
            <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">Scroll to Discover</span>
            <ArrowDown className="w-3.5 h-3.5 text-slate-400 animate-bounce" />
          </div>

        </motion.div>
      </section>

      {/* ACT 2: THE PROBLEM */}
      <section className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 py-20 bg-white/30 border-y border-black/[0.01]">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <span className="text-[9px] tracking-widest text-slate-400 font-bold uppercase block">
              The Reality
            </span>
            <h2 className="text-3xl font-light tracking-tight text-slate-900 leading-tight">
              Modern lifestyle quietly <span className="font-semibold text-slate-950">erodes</span> our inner ecosystem.
            </h2>
            <p className="text-sm text-slate-500 font-light leading-relaxed">
              Ultra-processed food structures, synthetic additives, and monoculture diets leave the microbiome starved. Science links this internal depletion directly to chronic energy declines, sleep issues, and low digestive resilience.
            </p>
            <p className="text-xs text-slate-400 font-light italic border-l border-slate-200 pl-4 mt-4">
              "We have sacrificed complexity for convenience, and our biology is paying the rent."
            </p>
          </div>

          <div className="space-y-6 bg-white/40 border border-black/[0.02] rounded-3xl p-6 sm:p-8">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="pb-5 border-b border-black/[0.02] last:border-b-0 last:pb-0"
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-[#2A7F7F] tabular-nums">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 font-light mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ACT 3: THE INSIGHT / THE SHIFT */}
      <section className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 py-20 overflow-hidden">
        <div className="max-w-4xl w-full text-center space-y-12">
          
          <div className="space-y-4">
            <span className="text-[9px] tracking-widest text-[#2A7F7F] font-bold uppercase">
              The Shift
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-900 leading-tight">
              No willpower. No boring health food. <br />
              Just <span className="font-semibold text-slate-950">crave-worthy</span> ingredients that serve you.
            </h2>
          </div>

          {/* Indulgence meets science split cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch max-w-3xl mx-auto">
            
            {/* Taste card */}
            <div className="bg-white/40 border border-black/[0.02] rounded-3xl p-6 flex flex-col justify-between items-center text-center hover:border-black/[0.08] transition-all">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/5 flex items-center justify-center border border-amber-500/10 mb-4">
                <Flame className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                  Taste-First Indulgence
                </h4>
                <p className="text-xs text-slate-500 font-light mt-2 leading-relaxed">
                  Stone-fermented tonics, golden baked ghee bites, and rich traditional curds. Eating for pleasure that triggers absolute digestive harmony.
                </p>
              </div>
            </div>

            {/* Science card */}
            <div className="bg-white/40 border border-black/[0.02] rounded-3xl p-6 flex flex-col justify-between items-center text-center hover:border-[#2A7F7F]/30 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-[#2A7F7F]/5 flex items-center justify-center border border-[#2A7F7F]/10 mb-4">
                <Leaf className="w-5 h-5 text-[#2A7F7F]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                  Microbiome Science
                </h4>
                <p className="text-xs text-slate-500 font-light mt-2 leading-relaxed">
                  Optimized for the Spector checklist: 30+ weekly plants, 3 daily probiotic ferments, polyphenol-dense colors, and zero artificial emulsifiers.
                </p>
              </div>
            </div>

          </div>

          <div className="pt-4 text-slate-400 text-xs font-light italic">
            Where culinary tradition overlaps seamlessly with modern clinical research.
          </div>

        </div>
      </section>

      {/* ACT 4: THE METHOD */}
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
              An interactive ecosystem containing our daily checklists, pantry catalog, and custom recipe archives.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Card: Plants */}
            <div className="bg-white/40 border border-black/[0.02] rounded-3xl p-6 flex flex-col justify-between min-h-[180px] hover:shadow-lg transition-all">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pillar 01</span>
                  <Leaf className="w-4 h-4 text-[#2A7F7F]" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-4">
                  30+ Weekly Plants
                </h3>
                <p className="text-xs text-slate-500 font-light mt-1.5 leading-relaxed">
                  Check off grains, seeds, greens, and spices. We track your progress week over week to build structural gut diversity.
                </p>
              </div>
            </div>

            {/* Card: Ferments */}
            <div className="bg-white/40 border border-black/[0.02] rounded-3xl p-6 flex flex-col justify-between min-h-[180px] hover:shadow-lg transition-all">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pillar 02</span>
                  <Layers className="w-4 h-4 text-[#2A7F7F]" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-4">
                  3 Daily Probiotics
                </h3>
                <p className="text-xs text-slate-500 font-light mt-1.5 leading-relaxed">
                  Log your daily slots: morning kanji, noon buttermilk, and fermented batters. Simple trackers built directly into the client.
                </p>
              </div>
            </div>

          </div>

          {/* Action button to enter food wing */}
          <div className="flex justify-center pt-4">
            <button
              onClick={() => router.push("/food")}
              className="px-6 py-3 bg-[#2A7F7F] text-white rounded-full text-xs font-semibold tracking-widest uppercase shadow-md hover:bg-[#1e5c5c] hover:shadow-lg transition-all flex items-center gap-2.5 cursor-pointer group"
            >
              <span>Enter the Food Wing</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>

      {/* ACT 5: THE VISION */}
      <section className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 py-20 text-center">
        
        <div className="max-w-xl space-y-8">
          <span className="text-[9px] tracking-widest text-[#2A7F7F] font-bold uppercase">
            The Vision
          </span>
          
          <h2 className="text-2xl sm:text-3xl font-light text-slate-900 leading-relaxed px-4">
            We are building a real-world, taste-first <span className="font-semibold text-slate-950">better-for-you food brand</span>. 
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed max-w-md mx-auto">
            Transparently developed, clean-labeled, and focused on gut-friendly convenience staples. Built entirely in the open, one batch at a time.
          </p>

          <div className="pt-8 border-t border-black/[0.04] max-w-sm mx-auto flex flex-col items-center gap-6">
            <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase">
              AUTHENTIC PROGRESS
            </span>

            {/* Subtle, understated link to Vault */}
            <button
              onClick={() => router.push("/vault")}
              className="text-[10px] font-semibold text-[#2A7F7F]/60 hover:text-[#2A7F7F] tracking-widest uppercase flex items-center gap-1.5 transition-colors cursor-pointer group"
            >
              <Lock className="w-3.5 h-3.5 text-[#2A7F7F]/50 group-hover:text-[#2A7F7F] transition-colors" />
              <span>Archive // Unseal FMCG Prototypes</span>
            </button>
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
