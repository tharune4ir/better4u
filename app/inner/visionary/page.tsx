"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  ShoppingBag,
  ArrowLeft,
  Sparkles,
  Clock,
} from "lucide-react";
import { FUTURE_PRODUCTS } from "@/lib/home-data";

export default function InnerVisionaryPage() {
  const router = useRouter();
  const [activeProductId, setActiveProductId] = useState<string>("p1");

  const activeProduct = FUTURE_PRODUCTS.find((p) => p.id === activeProductId) || FUTURE_PRODUCTS[0];

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F2] relative overflow-hidden">
      {/* Ambient Soft Teal Glows */}
      <div className="absolute top-[10%] left-[20%] w-72 h-72 bg-[#2A7F7F]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-5%] w-[30vw] h-[30vw] bg-[#2A7F7F]/4 rounded-full blur-[120px] pointer-events-none" />

      {/* Inner Room Nav Header */}
      <header className="flex items-center justify-between px-6 h-16 bg-[#F7F6F2]/85 backdrop-blur-md border-b border-black/[0.03] sticky top-0 z-40 select-none">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-xs font-semibold text-[#2A7F7F] hover:text-[#1e5c5c] transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Public Layer
        </button>
        <div className="flex items-center gap-3">
          <span className="text-[9px] uppercase tracking-widest text-slate-500 font-medium">Inner Room</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#2A7F7F] animate-pulse" />
        </div>
      </header>

      {/* Inner Nav Tabs */}
      <div className="flex items-center gap-2 px-6 py-3 border-b border-black/[0.03] bg-white/20 select-none overflow-x-auto whitespace-nowrap scrollbar-none">
        <button
          onClick={() => router.push("/inner/family")}
          className="text-[10px] uppercase tracking-wider font-bold px-4 py-2 rounded-lg text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          Family & Home
        </button>
        <button
          className="text-[10px] uppercase tracking-wider font-bold px-4 py-2 rounded-lg bg-[#2A7F7F]/10 text-[#2A7F7F] border border-[#2A7F7F]/10 cursor-pointer"
        >
          Visionary
        </button>
        <button
          onClick={() => router.push("/inner/presentation")}
          className="text-[10px] uppercase tracking-wider font-bold px-4 py-2 rounded-lg text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          Presentation
        </button>
        <button
          onClick={() => router.push("/inner/thinking")}
          className="text-[10px] uppercase tracking-wider font-bold px-4 py-2 rounded-lg text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          Thinking
        </button>
      </div>

      {/* Main Canvas */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-16 z-10 relative">

        {/* FMCG Vision Showcase */}
        <div className="rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-black/[0.03] bg-white/50 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.01)] mb-12">
          <div className="absolute top-[10%] left-[20%] w-72 h-72 bg-[#2A7F7F]/3 rounded-full blur-[100px] pointer-events-none" />

          <div className="text-center mb-10">
            <span className="text-[10px] tracking-widest text-[#2A7F7F] font-bold uppercase bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-3">
              <ShoppingBag className="w-3 h-3" />
              The Vision Showcase
            </span>
            <h2 className="text-xl sm:text-2xl font-light text-slate-900">
              Future Physical <span className="font-semibold text-slate-850">FMCG Formulations</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-light mt-2 max-w-md mx-auto leading-relaxed">
              Turning private kitchen research and trial formulas into clean, zero-compromise bottled gut products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left: Selector + Details */}
            <div className="md:col-span-7 flex flex-col gap-4 order-2 md:order-1">
              <div className="flex gap-2 border-b border-black/[0.03] pb-3 select-none">
                {FUTURE_PRODUCTS.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => setActiveProductId(prod.id)}
                    className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      activeProductId === prod.id
                        ? "bg-[#2A7F7F]/10 text-[#2A7F7F] border border-[#2A7F7F]/10"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {prod.name}
                  </button>
                ))}
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#2A7F7F] block mb-1.5">
                  {activeProduct.patentStatus}
                </span>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">{activeProduct.name}</h3>
                <p className="text-sm text-[#2A7F7F] font-medium italic mb-3">{activeProduct.tagline}</p>
                <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed mb-5">
                  {activeProduct.description}
                </p>

                {/* Locked Ingredients */}
                <div className="bg-slate-100/50 border border-black/[0.03] rounded-xl p-4 relative overflow-hidden flex flex-col justify-center min-h-[90px] backdrop-blur-sm">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                    Formulation Ingredients
                  </span>
                  <div className="flex flex-wrap gap-1.5 filter blur-[3.5px] select-none opacity-40">
                    {activeProduct.ingredients.map((ing, idx) => (
                      <span
                        key={idx}
                        className="text-xs text-slate-500 bg-white/60 border border-black/[0.03] px-2.5 py-1 rounded-full font-light"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-white/10 flex items-center justify-center z-10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2A7F7F] bg-white/95 border border-[#2A7F7F]/15 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                      <Lock className="w-2.5 h-2.5" />
                      Formulation Locked
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Floating Bottle */}
            <div className="md:col-span-5 flex justify-center items-center order-1 md:order-2 relative">
              <motion.div
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, 1.5, -1.5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-44 h-72 flex justify-center items-center filter drop-shadow-[0_15px_30px_rgba(42,127,127,0.08)]"
              >
                <svg viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M38,15 L62,15 C64,15 65,16.5 65,18 L65,25 C65,27.5 67,29.5 69.5,29.5 L73,29.5 C76,29.5 78,32.5 78,35.5 L78,175 C78,185 70,192 60,192 L40,192 C30,192 22,185 22,175 L22,35.5 C22,32.5 24,29.5 27,29.5 L30.5,29.5 C33,29.5 35,27.5 35,25 L35,18 C35,16.5 36,15 38,15 Z" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
                  <path d="M38,15 L62,15 C64,15 65,16.5 65,18 L65,25 C65,27.5 67,29.5 69.5,29.5 L73,29.5 C76,29.5 78,32.5 78,35.5 L78,175 C78,185 70,192 60,192 L40,192 C30,192 22,185 22,175 L22,35.5 C22,32.5 24,29.5 27,29.5 L30.5,29.5 C33,29.5 35,27.5 35,25 L35,18 C35,16.5 36,15 38,15 Z" stroke="#2A7F7F" strokeWidth="1.5" strokeOpacity="0.4" />
                  <rect x="36" y="8" width="28" height="7" rx="1.5" fill="#1e5c5c" fillOpacity="0.8" />
                  <path d="M24.5,45 C24.5,41.5 26.5,39 29.5,39 L70.5,39 C73.5,39 75.5,41.5 75.5,45 L75.5,172 C75.5,181 68.5,188.5 59.5,188.5 L40.5,188.5 C31.5,188.5 24.5,181 24.5,172 Z" fill="url(#tealLiquid)" fillOpacity="0.75" />
                  <path d="M28,50 L28,165" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" strokeLinecap="round" />
                  <rect x="30" y="80" width="40" height="42" rx="3" fill="#ffffff" fillOpacity="0.95" stroke="#2A7F7F" strokeWidth="0.5" strokeOpacity="0.25" />
                  <text x="50" y="93" fill="#2A7F7F" fontSize="5" fontWeight="bold" textAnchor="middle" letterSpacing="0.8">TRELIS</text>
                  <text x="50" y="103" fill="#1e293b" fontSize="6.5" fontWeight="900" textAnchor="middle" letterSpacing="0.5">
                    {activeProductId === "p1" ? "GUT-SPARK" : "P-BLEND 01"}
                  </text>
                  <line x1="36" y1="108" x2="64" y2="108" stroke="#2A7F7F" strokeWidth="0.4" strokeOpacity="0.4" />
                  <text x="50" y="115" fill="#2A7F7F" fontSize="3" fontWeight="bold" textAnchor="middle" letterSpacing="0.4">ORGANIC WILD FERMENT</text>
                  <defs>
                    <linearGradient id="tealLiquid" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#4fa8a8" stopOpacity="0.85" />
                      <stop offset="50%" stopColor="#2A7F7F" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#1e5c5c" stopOpacity="0.95" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="absolute bottom-[2%] w-[80%] h-4 bg-[#2A7F7F]/15 rounded-full blur-md opacity-70 -z-10" />
              </motion.div>

              {/* Formulation Locked overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
                <div className="bg-white/95 border border-[#2A7F7F]/20 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-[0_8px_32px_rgba(42,127,127,0.1)]">
                  <Lock className="w-3 h-3 text-[#2A7F7F]" />
                  <span className="text-[9px] font-semibold text-slate-800 uppercase tracking-widest">
                    Formulation Locked
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-3xl p-8 sm:p-12 border border-black/[0.03] bg-white/40 backdrop-blur-sm text-center shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#2A7F7F]/60" />
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <h3 className="text-lg font-light text-slate-700 mb-2">
            More coming — this grows over time.
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 font-light max-w-sm mx-auto leading-relaxed">
            Additional formulations, kitchen trial logs, and product evolution entries will appear here as they move from experimentation to formulation lock.
          </p>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-8 text-[10px] tracking-widest text-slate-400 font-light select-none relative z-10 border-t border-black/[0.03] bg-white/30">
        Built in the open. One rep at a time.
      </footer>
    </div>
  );
}
