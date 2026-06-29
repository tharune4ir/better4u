"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Apple, 
  Activity, 
  BrainCircuit, 
  Sparkle,
  ArrowRight
} from "lucide-react";

export default function HomeHub() {
  const router = useRouter();
  const [time, setTime] = useState("");
  
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

  const cards = [
    {
      id: "food",
      title: "Food",
      sub: "Cook",
      desc: "Rebuilding gut health and energy through a grain-first, prebiotic-rich whole food engine.",
      path: "/food",
      icon: Apple,
      color: "from-emerald-500/10 to-teal-500/10",
      accent: "#10B981"
    },
    {
      id: "movement",
      title: "Movement",
      sub: "Build",
      desc: "Developing a lean, durable, and highly capable body using bodyweight progressions and macebell swing flows.",
      path: "/movement",
      icon: Activity,
      color: "from-blue-500/10 to-indigo-500/10",
      accent: "#3B82F6"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F2] relative overflow-hidden select-none">
      {/* Background decorations */}
      <div className="absolute top-[10%] left-[-10%] w-[35vw] h-[35vw] bg-[#2A7F7F]/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[35vw] h-[35vw] bg-[#2A7F7F]/3 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header Bar */}
      <header className="w-full h-20 border-b border-black/[0.03] bg-[#F7F6F2]/75 backdrop-blur-md flex items-center justify-between px-6 md:px-12 z-20">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/")}>
          <div className="relative w-11 h-11 flex-shrink-0">
            <Image
              src="/icons/icon-128.webp"
              alt="Trelis Logo"
              fill
              sizes="44px"
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
          <div className="w-2 h-2 rounded-full bg-[#2A7F7F] animate-pulse shadow-sm shadow-[#2A7F7F]/50" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-20 z-10 w-full">
        {/* Tagline Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-2xl mb-10 md:mb-14 space-y-4"
        >
          <span className="text-[9px] tracking-widest text-[#2A7F7F] font-bold uppercase bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-3.5 py-1 rounded-full inline-block">
            Trelis Life Hub
          </span>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-light text-slate-800 leading-relaxed tracking-wide px-2">
            Rebuilding gut health through a taste-first, <span className="font-semibold text-slate-950">better-for-you grain engine</span>. Simplicity, food-as-medicine, and showing the work.
          </h1>
        </motion.div>


        {/* 2 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + (0.1 * idx), ease: "easeOut" }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => router.push(card.path)}
                className="glassmorphic rounded-3xl p-6 border border-black/[0.02] hover:border-[#2A7F7F]/30 hover:shadow-[0_12px_40px_rgba(42,127,127,0.04)] transition-all duration-300 cursor-pointer flex flex-col justify-between group min-h-[300px] relative overflow-hidden"
              >
                {/* Background soft gradient based on card color */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-40 group-hover:opacity-60 transition-opacity pointer-events-none`} />
                
                {/* Animated vector motif representation */}
                <div className="absolute -right-6 -bottom-6 w-32 h-32 opacity-10 group-hover:opacity-20 transition-all duration-500 transform group-hover:scale-110 pointer-events-none">
                  <Icon className="w-full h-full stroke-[1.2]" />
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-white/80 border border-black/[0.02] flex items-center justify-center shadow-sm">
                      <Icon className="w-5 h-5 text-[#2A7F7F]" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {card.sub}
                    </span>
                  </div>

                  <div className="space-y-2 pt-2">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-1.5 group-hover:text-[#2A7F7F] transition-colors">
                      {card.title}
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </h3>
                    <p className="text-xs text-slate-500 font-light leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-6 relative z-10 flex items-center gap-2 text-[10px] font-semibold text-[#2A7F7F] tracking-wider uppercase">
                  <span>Enter Wing</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2A7F7F]/40 group-hover:bg-[#2A7F7F] group-hover:scale-125 transition-all" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-8 text-[10px] tracking-widest text-slate-400 font-light select-none border-t border-black/[0.02] bg-white/20 mt-12">
        BUILT IN THE OPEN. ONE REP AT A TIME.
      </footer>
    </div>
  );
}
