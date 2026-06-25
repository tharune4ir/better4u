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
import { getTodayDay, plan } from "@/lib/plan";
import { useLocalStore } from "@/lib/log-store";

const getDaysBetween = (startStr: string, endStr: string) => {
  const start = new Date(startStr);
  start.setHours(0, 0, 0, 0);
  const end = new Date(endStr);
  end.setHours(0, 0, 0, 0);
  return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
};

export default function HomeHub() {
  const router = useRouter();
  const [time, setTime] = useState("");
  const { isHydrated, getDayLog } = useLocalStore();
  
  const todayDay = getTodayDay();
  const todayStr = new Date().toISOString().split('T')[0];
  const daysToDDay = plan.meta.d_day ? getDaysBetween(todayStr, plan.meta.d_day.date) : 0;
  
  const progress = React.useMemo(() => {
    if (!isHydrated) return 0;
    const log = getDayLog(todayDay.day);
    const pillars = ['meal1', 'meal2', 'psyllium', 'sunlight', 'workout', 'mind', 'supplements'];
    const completed = pillars.filter(p => log[p as keyof typeof log]).length;
    return (completed / pillars.length) * 100;
  }, [isHydrated, getDayLog, todayDay.day]);

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
            "I'm not an expert. I'm one ordinary person rebuilding himself — body and food — using what's already proven. <span className="font-semibold text-slate-950">This is me, showing my work.</span>"
          </h1>
        </motion.div>

        {/* TODAY Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          onClick={() => router.push("/timeline")}
          className="w-full max-w-3xl glassmorphic rounded-[2rem] p-6 sm:p-8 border border-black/[0.04] hover:border-[#2A7F7F]/30 hover:shadow-[0_12px_40px_rgba(42,127,127,0.06)] transition-all duration-300 cursor-pointer mb-8 group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#2A7F7F]/10 to-transparent rounded-full blur-[80px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
          
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold uppercase tracking-widest bg-slate-900 text-white px-3 py-1 rounded-full shadow-sm">
                  Today
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                  Day {todayDay.day < 1 ? 0 : todayDay.day} / 250
                  {plan.meta.d_day && (
                    <span className="hidden sm:inline">
                      <span className="mx-1.5 opacity-50">·</span>
                      {daysToDDay} days to D-Day (6 Mar 2027)
                    </span>
                  )}
                </span>
              </div>
              <h2 className="text-2xl font-semibold text-[#2A7F7F] mb-6 tracking-tight">
                {plan.weeks.find(w => w.week === todayDay.week)?.phase_name || `Phase ${todayDay.phase}`}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Meal 1</span>
                  <p className="text-slate-800 font-medium">{todayDay.ideal.meal1.name}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Meal 2</span>
                  <p className="text-slate-800 font-medium">{todayDay.ideal.meal2.name}</p>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Movement</span>
                  <p className="text-slate-800 font-medium">{todayDay.ideal.body.label}</p>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mind</span>
                  <p className="text-slate-500 italic truncate max-w-[280px] sm:max-w-[400px]">"{todayDay.ideal.mind.prompt}"</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center shrink-0 border-t sm:border-t-0 sm:border-l border-black/[0.05] pt-6 sm:pt-0 sm:pl-8 mt-2 sm:mt-0">
              <div className="relative mb-3">
                <svg width="80" height="80" className="transform -rotate-90 drop-shadow-sm">
                  <circle stroke="#E2E8F0" fill="transparent" strokeWidth="6" r="34" cx="40" cy="40" />
                  <circle
                    stroke="#2A7F7F"
                    fill="transparent"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={213.6}
                    style={{ strokeDashoffset: 213.6 - (progress / 100) * 213.6 }}
                    r="34" cx="40" cy="40"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-slate-800">{Math.round(progress)}%</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full mt-4">
                <button
                  onClick={(e) => { e.stopPropagation(); router.push("/timeline#vision-board"); }}
                  className="flex items-center justify-center gap-1.5 w-full bg-[#2A7F7F]/10 hover:bg-[#2A7F7F]/20 text-[#2A7F7F] py-2 px-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-colors"
                >
                  <Sparkle className="w-3.5 h-3.5" /> Prime Me
                </button>
                <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-600 transition-colors mt-2">
                  Open Timeline <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
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
