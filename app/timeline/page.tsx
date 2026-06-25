"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  CheckCircle2, Circle, Sun, Droplets, UtensilsCrossed, 
  Leaf, Apple, Pill, Activity, Brain, ArrowLeft,
  ChevronDown, ChevronUp, Check, Play, MessageSquare, Coffee
} from "lucide-react";
import Navbar, { NavTab } from "@/components/Navbar";
import { plan, getAllDays, getTodayDay, getPhases, resolveRecipe } from "@/lib/plan";
import { useLocalStore } from "@/lib/log-store";
import { DayPlan } from "@/lib/plan-types";

// Helper to calculate days between two dates
const getDaysBetween = (startStr: string, endStr: string) => {
  const start = new Date(startStr);
  start.setHours(0, 0, 0, 0);
  const end = new Date(endStr);
  end.setHours(0, 0, 0, 0);
  return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
};

// Vision Board Component
const VisionBoard = ({ dayNumber }: { dayNumber: number }) => {
  const vb = plan.vision_board;
  const dDay = plan.meta.d_day;
  const [affirmationIdx, setAffirmationIdx] = useState(0);

  useEffect(() => {
    if (!vb?.affirmations) return;
    const interval = setInterval(() => {
      setAffirmationIdx(prev => (prev + 1) % vb.affirmations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [vb]);

  if (!vb || !dDay) return null;

  const todayStr = new Date().toISOString().split('T')[0];
  const daysToDDay = getDaysBetween(todayStr, dDay.date);
  const totalDays = plan.meta.total_days || 251;
  const targetDays = 250; // As per the prompt 'Day X / 250'
  const displayDay = dayNumber < 1 ? 0 : dayNumber;
  const progressPercent = Math.min(Math.max((displayDay / targetDays) * 100, 0), 100);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-3xl p-8 sm:p-12 mb-16 shadow-2xl text-white">
      {/* Animated Backgrounds */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2A7F7F]/40 via-transparent to-transparent blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-[50%] -right-[50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/40 via-transparent to-transparent blur-3xl"
        />
      </div>

      {/* Floating Embers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full blur-[1px]"
            initial={{ 
              y: "110%", 
              x: `${Math.random() * 100}%`,
              opacity: 0,
              scale: Math.random() * 1 + 0.5
            }}
            animate={{ 
              y: "-10%",
              opacity: [0, 0.8, 0],
              x: `${Math.random() * 100}%`
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 10
            }}
          />
        ))}
      </div>

      <div className="relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#4FD1C5]">
            {vb.kicker}
          </div>
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-white/90">
            {vb.title}
          </h2>
        </div>

        {/* Quote */}
        <div className="text-center max-w-xl mx-auto border-y border-white/10 py-6">
          <p className="text-lg sm:text-xl font-light text-slate-300 italic mb-2">"{vb.quote.text}"</p>
          <p className="text-[10px] uppercase tracking-widest text-[#4FD1C5]/70">— {vb.quote.author}</p>
        </div>

        {/* Manifesto */}
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-[10px] uppercase tracking-widest text-slate-400 text-center mb-8 font-medium">
            Read this slowly. Feel it. Become it.
          </div>
          {vb.manifesto.map((paragraph, idx) => (
            <motion.p 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 + idx * 0.2 }}
              className="text-base sm:text-lg text-slate-300 font-light leading-relaxed"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Affirmations Carousel */}
        <div className="max-w-xl mx-auto text-center h-16 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={affirmationIdx}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.8 }}
              className="text-xl sm:text-2xl font-medium text-[#4FD1C5]"
            >
              {vb.affirmations[affirmationIdx]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Closing */}
        <div className="text-center max-w-xl mx-auto pt-6">
          <p className="text-lg text-white/80 font-medium italic">
            {vb.closing}
          </p>
        </div>

        {/* Countdown Block */}
        <div className="pt-8 border-t border-white/10 mt-8 flex flex-col items-center">
          <div className="relative flex items-center justify-center mb-6">
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-[#4FD1C5]/10 rounded-full blur-xl"
            />
            
            {/* Progress Arc */}
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="90" className="stroke-white/10" strokeWidth="4" fill="none" />
                <circle 
                  cx="96" cy="96" r="90" 
                  className="stroke-[#4FD1C5] transition-all duration-1000 ease-out" 
                  strokeWidth="4" 
                  fill="none" 
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 90}`}
                  strokeDashoffset={`${2 * Math.PI * 90 * (1 - progressPercent / 100)}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">
                  {displayDay < 1 ? "Pre-Forge" : "Current"}
                </span>
                <span className="text-4xl font-light text-white">
                  Day {displayDay}
                </span>
                <span className="text-sm font-light text-slate-400 mt-1">
                  / {targetDays}
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <div className="text-base font-medium text-white/90">
              {daysToDDay} days to {dDay.name} <span className="opacity-50">·</span> {dDay.date}
            </div>
            {plan.meta.block1_end && (
              <div className="text-xs text-[#4FD1C5]/80 font-medium bg-[#4FD1C5]/10 px-3 py-1 rounded-full inline-block">
                Block 1 ends Day {plan.meta.block1_end.day} · {plan.meta.block1_end.date} · 33rd birthday
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for a Checkable Row
const CheckRow = ({ 
  label, 
  subtext, 
  checked, 
  onToggle, 
  icon: Icon 
}: { 
  label: string; 
  subtext?: React.ReactNode; 
  checked: boolean; 
  onToggle: () => void;
  icon?: any;
}) => (
  <div 
    onClick={onToggle}
    className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
  >
    <div className="mt-0.5">
      {checked ? (
        <CheckCircle2 className="w-5 h-5 text-[#2A7F7F]" />
      ) : (
        <Circle className="w-5 h-5 text-slate-300 group-hover:text-[#2A7F7F]/50 transition-colors" />
      )}
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-3.5 h-3.5 text-slate-400" />}
        <span className={`text-sm font-semibold transition-colors ${checked ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
          {label}
        </span>
      </div>
      {subtext && (
        <div className={`text-xs mt-1 transition-colors ${checked ? 'text-slate-400' : 'text-slate-500'}`}>
          {subtext}
        </div>
      )}
    </div>
  </div>
);

// Progress Ring Component
const ProgressRing = ({ progress, size = 36, strokeWidth = 3 }: { progress: number, size?: number, strokeWidth?: number }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - progress * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        stroke="#E2E8F0"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        stroke="#2A7F7F"
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset: offset }}
        r={radius}
        cx={size / 2}
        cy={size / 2}
        className="transition-all duration-500 ease-out"
      />
    </svg>
  );
};

// Expanded Day Detail Component
const ExpandedDay = ({ day, dayNumber }: { day: DayPlan; dayNumber: number }) => {
  const { isHydrated, getDayLog, toggleDayPillar, setDayLog } = useLocalStore();
  const log = getDayLog(dayNumber);
  
  if (!isHydrated) return null;

  const meal1Recipe = resolveRecipe(day.ideal.meal1.recipe_id);
  const meal2Recipe = resolveRecipe(day.ideal.meal2.recipe_id);

  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="border-t border-black/[0.03] pt-4 mt-4 space-y-6"
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
    >
      {/* Morning Block */}
      <div>
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
          <Sun className="w-3.5 h-3.5" /> Morning Base
        </h4>
        <div className="bg-white/50 border border-black/[0.02] rounded-2xl overflow-hidden">
          <CheckRow 
            label={`Wake & Light (${day.ideal.on_waking})`}
            checked={log.sunlight} 
            onToggle={() => toggleDayPillar(dayNumber, "sunlight")} 
            icon={Sun}
          />
          <CheckRow 
            label="Psyllium Husk"
            subtext={day.ideal.psyllium}
            checked={log.psyllium} 
            onToggle={() => toggleDayPillar(dayNumber, "psyllium")} 
          />
        </div>
      </div>

      {/* Meal 1 */}
      <div>
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
          <UtensilsCrossed className="w-3.5 h-3.5" /> Meal 1 (Break Fast)
        </h4>
        <div className="bg-white/50 border border-black/[0.02] rounded-2xl overflow-hidden">
          <CheckRow 
            label={day.ideal.meal1.name}
            subtext={
              <div className="space-y-2">
                {meal1Recipe && (
                  <div className="text-slate-500 bg-white/40 p-2 rounded-lg mt-1 border border-black/[0.02]">
                    <span className="font-semibold text-[10px] uppercase tracking-wider block mb-1">Ingredients:</span>
                    <span className="leading-relaxed">{meal1Recipe.ingredients.join(", ")}</span>
                  </div>
                )}
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-[#2A7F7F]/5 text-[#2A7F7F] px-2 py-0.5 rounded text-[10px] font-semibold border border-[#2A7F7F]/10">Nuts & Seeds: {day.ideal.nuts_seeds_core}</span>
                  <span className="bg-orange-500/5 text-orange-600 px-2 py-0.5 rounded text-[10px] font-semibold border border-orange-500/10">Fruit: {day.ideal.fruit}</span>
                </div>
              </div>
            }
            checked={log.meal1} 
            onToggle={() => toggleDayPillar(dayNumber, "meal1")} 
          />
          {day.ideal.supplements.length > 0 && (
            <CheckRow 
              label="Supplements"
              subtext={day.ideal.supplements.join(", ")}
              checked={log.supplements} 
              onToggle={() => toggleDayPillar(dayNumber, "supplements")} 
              icon={Pill}
            />
          )}
        </div>
      </div>

      {/* Meal 2 */}
      <div>
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
          <UtensilsCrossed className="w-3.5 h-3.5" /> Meal 2 (Dinner)
        </h4>
        <div className="bg-white/50 border border-black/[0.02] rounded-2xl overflow-hidden">
          <CheckRow 
            label={day.ideal.meal2.name}
            subtext={
              <div className="space-y-2">
                <div className="text-[#2A7F7F] font-medium text-xs">{day.ideal.meal2.note}</div>
                {meal2Recipe && (
                  <div className="text-slate-500 bg-white/40 p-2 rounded-lg mt-1 border border-black/[0.02]">
                    <span className="font-semibold text-[10px] uppercase tracking-wider block mb-1">Ingredients:</span>
                    <span className="leading-relaxed">{meal2Recipe.ingredients.join(", ")}</span>
                  </div>
                )}
                <span className="bg-purple-500/5 text-purple-600 px-2 py-0.5 rounded text-[10px] font-semibold border border-purple-500/10 inline-block">
                  Fermented Target: {day.ideal.fermented_target}
                </span>
              </div>
            }
            checked={log.meal2} 
            onToggle={() => toggleDayPillar(dayNumber, "meal2")} 
          />
        </div>
      </div>

      {/* Body */}
      <div>
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5" /> Movement
        </h4>
        <div className="bg-white/50 border border-black/[0.02] rounded-2xl overflow-hidden">
          <CheckRow 
            label={day.ideal.body.label}
            subtext={
              <ul className="list-disc pl-4 space-y-1 mt-1">
                {day.ideal.body.workout.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
            }
            checked={log.workout} 
            onToggle={() => toggleDayPillar(dayNumber, "workout")} 
          />
        </div>
      </div>

      {/* Mind */}
      <div>
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
          <Brain className="w-3.5 h-3.5" /> Mind
        </h4>
        <div className="bg-white/50 border border-black/[0.02] rounded-2xl overflow-hidden p-4">
          <div className="flex items-start justify-between gap-4">
            <p className="text-sm text-slate-700 italic leading-relaxed">
              "{day.ideal.mind.prompt}"
            </p>
            <button 
              onClick={(e) => { e.stopPropagation(); toggleDayPillar(dayNumber, "mind"); }}
              className={`flex-shrink-0 p-2 rounded-full transition-colors ${log.mind ? 'bg-[#2A7F7F] text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
            >
              {log.mind ? <Check className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>
          {day.ideal.mind.format && (
            <div className="mt-3 text-[10px] uppercase tracking-widest font-bold text-[#2A7F7F]">
              Format: {day.ideal.mind.format}
            </div>
          )}
        </div>
      </div>

      {/* Notes */}
      <div>
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5" /> Day Notes
        </h4>
        <textarea 
          value={log.note}
          onChange={(e) => setDayLog(dayNumber, { note: e.target.value })}
          placeholder="How did today feel? Any friction points?"
          className="w-full bg-white/50 border border-black/[0.05] rounded-xl p-3 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#2A7F7F]/50 resize-none min-h-[80px]"
        />
      </div>
    </motion.div>
  );
};

export default function TimelinePage() {
  const router = useRouter();
  const allDays = useMemo(() => getAllDays(), []);
  const todayDay = useMemo(() => getTodayDay(), []);
  const { getDayLog, isHydrated } = useLocalStore();
  
  const [activeTab, setActiveTab] = useState<NavTab>("timeline" as NavTab);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  // Scroll Refs
  const todayRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Expand today on load
    setExpandedDay(todayDay.day);
    // Auto-scroll to today with a slight delay to allow rendering
    setTimeout(() => {
      if (todayRef.current) {
        const yOffset = -120; // offset for sticky headers
        const y = todayRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  }, [todayDay.day]);

  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    if (tab === "movement") router.push("/movement");
    else if (tab === "food") router.push("/food");
    else if (tab === "thinking") router.push("/inner/thinking"); // using nav logic
  };

  const jumpToToday = () => {
    setExpandedDay(todayDay.day);
    if (todayRef.current) {
      const yOffset = -120;
      const y = todayRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Group days by Phase
  const groupedByPhase = useMemo(() => {
    const groups: { phaseName: string; weeks: { weekName: string; days: DayPlan[] }[] }[] = [];
    let currentPhase = "";
    let currentWeek = 0;
    
    allDays.forEach(day => {
      const weekPlan = plan.weeks.find(w => w.week === day.week);
      const phaseName = weekPlan?.phase_name || `Phase ${day.phase}`;
      const weekName = `Week ${day.week}`;

      let phaseGroup = groups.find(g => g.phaseName === phaseName);
      if (!phaseGroup) {
        phaseGroup = { phaseName, weeks: [] };
        groups.push(phaseGroup);
      }

      let weekGroup = phaseGroup.weeks.find(w => w.weekName === weekName);
      if (!weekGroup) {
        weekGroup = { weekName, days: [] };
        phaseGroup.weeks.push(weekGroup);
      }

      weekGroup.days.push(day);
    });
    return groups;
  }, [allDays]);

  // Calculate day progress
  const getProgress = (dayNumber: number) => {
    if (!isHydrated) return 0;
    const log = getDayLog(dayNumber);
    const pillars = ['meal1', 'meal2', 'psyllium', 'sunlight', 'workout', 'mind', 'supplements'];
    const completed = pillars.filter(p => log[p as keyof typeof log]).length;
    return completed / pillars.length;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F2] relative selection:bg-[#2A7F7F]/20">
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Sticky Top Bar */}
      <div className="sticky top-20 z-30 bg-[#F7F6F2]/90 backdrop-blur-md border-b border-black/[0.03] px-6 py-3 flex items-center justify-between">
        <div>
          <div className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
            Current Day
          </div>
          <div className="text-sm font-semibold text-slate-900">
            Day {todayDay.day} <span className="text-slate-400 font-light">/ 250</span>
          </div>
        </div>
        <button 
          onClick={jumpToToday}
          className="text-xs font-semibold text-[#2A7F7F] bg-[#2A7F7F]/10 px-4 py-1.5 rounded-full hover:bg-[#2A7F7F]/20 transition-colors"
        >
          Jump to Today
        </button>
      </div>

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 pb-32 z-10 relative space-y-16">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-slate-900 tracking-tight">The Journey</h1>
          <p className="text-sm text-slate-500 font-light mt-2">{plan.meta.title}</p>
        </div>

        {/* Vision Board at the Top */}
        <div id="vision-board">
          <VisionBoard dayNumber={todayDay.day} />
        </div>

        {groupedByPhase.map((phase, pIdx) => (
          <div key={pIdx} className="space-y-12">
            {/* Phase Sticky Header */}
            <div className="sticky top-[124px] z-20 py-2 -mx-4 px-4 bg-gradient-to-b from-[#F7F6F2] to-transparent">
              <span className="inline-flex text-[10px] tracking-widest text-[#2A7F7F] font-bold uppercase bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-3 py-1 rounded-full items-center gap-1.5 shadow-sm">
                {phase.phaseName}
              </span>
            </div>

            {phase.weeks.map((week, wIdx) => (
              <div key={wIdx} className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 pl-2">
                  {week.weekName}
                </h3>
                
                <div className="space-y-4 relative">
                  {/* Vertical line connecting days */}
                  <div className="absolute left-[38px] top-8 bottom-8 w-px bg-slate-200 z-0 hidden sm:block" />

                  {week.days.map((day) => {
                    const isToday = day.day === todayDay.day;
                    const isExpanded = expandedDay === day.day;
                    const progress = getProgress(day.day);

                    return (
                      <div 
                        key={day.day} 
                        ref={isToday ? todayRef : null}
                        className={`relative z-10 glassmorphic rounded-3xl p-5 border transition-all duration-300 cursor-pointer ${
                          isToday ? 'border-[#2A7F7F]/30 shadow-[0_8px_30px_rgb(42,127,127,0.08)]' : 'border-black/[0.03] hover:border-black/[0.08]'
                        }`}
                        onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                      >
                        <div className="flex items-center gap-4">
                          {/* Progress / Icon */}
                          <div className="relative shrink-0">
                            <ProgressRing progress={progress} size={44} strokeWidth={4} />
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-700">
                              {day.day}
                            </div>
                          </div>

                          {/* Day Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-0.5">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-slate-900">{day.weekday}</span>
                                <span className="text-[10px] text-slate-400 uppercase tracking-widest">{day.date}</span>
                              </div>
                              {isToday && (
                                <span className="text-[9px] font-bold tracking-widest uppercase bg-[#2A7F7F] text-white px-2 py-0.5 rounded shadow-sm">
                                  Today
                                </span>
                              )}
                            </div>
                            
                            {/* Short Summary */}
                            <p className="text-xs text-slate-500 truncate mt-1">
                              {day.ideal.meal1.name.split(' ')[0]} · {day.ideal.body.label.split(' ')[0]} · {day.ideal.mind.prompt.substring(0, 20)}...
                            </p>
                          </div>

                          {/* Expand Icon */}
                          <div className="shrink-0 text-slate-400">
                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </div>
                        </div>

                        {/* Expanded Content */}
                        <AnimatePresence>
                          {isExpanded && <ExpandedDay day={day} dayNumber={day.day} />}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            {phase.phaseName.includes("4") && (
              <div className="bg-[#2A7F7F] text-white p-6 rounded-3xl shadow-xl mt-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <h3 className="text-xl font-bold mb-2 relative z-10">🎂 33rd Birthday · Block 1 Complete!</h3>
                <p className="text-sm text-white/80 relative z-10">You've reached Day 84. You've forged the foundation.</p>
              </div>
            )}
          </div>
        ))}
        
        {/* Capstone Marker for Day 251 */}
        {plan.meta.d_day && (
          <div className="mt-16 text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-full flex items-center justify-center shadow-lg border-4 border-white">
              <span className="text-2xl">🔱</span>
            </div>
            <h3 className="text-2xl font-light text-slate-900">{plan.meta.d_day.name} · D-Day</h3>
            <p className="text-sm text-slate-500 font-medium uppercase tracking-widest">{plan.meta.d_day.date} — The Arrival</p>
          </div>
        )}
      </main>
    </div>
  );
}
