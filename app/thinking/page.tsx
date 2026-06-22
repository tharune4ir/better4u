"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  ArrowLeft, 
  Brain, 
  Mic,
  Play, 
  Pause, 
  RotateCcw,
  BookOpen,
  HelpCircle,
  Quote,
  Check
} from "lucide-react";
import Navbar, { NavTab } from "@/components/Navbar";
import { 
  MENTAL_MODELS, 
  VOICE_SECTIONS, 
  NEUROPLASTICITY_SUMMARY 
} from "@/lib/mind-data";

const MIND_VISION_MARKERS = [
  { label: "First Principles: drill down to core truths before forming opinions", type: "mental" },
  { label: "Inversion: think about what to avoid, not just what to achieve", type: "mental" },
  { label: "Second-Order Thinking: consider 'and then what?' for every decision", type: "mental" },
  { label: "The 5 Whys: solve root causes, not temporary symptoms", type: "mental" },
  { label: "Directness: no passive-aggressive drift · say what is real and true", type: "voice" },
  { label: "Steel-Manning: represent other views in their absolute best form", type: "voice" },
  { label: "Deep Listening: quiet my own mind completely before responding", type: "voice" },
  { label: "Cognitive baseline (with GP/Coach): calm, clear, and curious", type: "health" },
  { label: "Play horizon: writing and publishing simple, clean, public notes", type: "practice" },
  { label: "Play horizon: daily structured, distraction-free focus blocks", type: "practice" }
];

export default function ThinkingPage() {
  const router = useRouter();
  
  // Mind Vision Board state (10 markers)
  const [mindMarkers, setMindMarkers] = useState<boolean[]>(new Array(10).fill(false));
  
  const toggleMindMarker = (index: number) => {
    setMindMarkers(prev => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };
  
  // Timer States
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Clarity States
  const [clarityText, setClarityText] = useState("");
  const [clarityValue, setClarityValue] = useState(7);

  // Active Model State for inspection
  const [hoveredModelId, setHoveredModelId] = useState<string | null>(null);

  // Timer Tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timeLeft]);

  const handleTabChange = (tab: NavTab) => {
    if (tab !== "thinking") {
      router.push(`/?tab=${tab}`);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(25 * 60);
  };

  // Circular SVG Progress calculation
  const totalSeconds = 25 * 60;
  const percentage = (timeLeft / totalSeconds) * 100;
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F2] relative overflow-hidden">
      
      {/* Subtle Glows */}
      <div className="absolute top-[5%] right-[-15%] w-[35vw] h-[35vw] bg-[#2A7F7F]/3 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-15%] w-[35vw] h-[35vw] bg-[#2A7F7F]/3 rounded-full blur-[130px] pointer-events-none" />

      {/* Navigation */}
      <Navbar activeTab="thinking" setActiveTab={handleTabChange} />

      {/* ==================== MAIN CANVAS ==================== */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-28 md:pb-16 z-10 relative">
        
        {/* Back Link for Desktop */}
        <div className="hidden md:flex items-center mb-6">
          <button 
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-xs font-semibold text-[#2A7F7F] hover:opacity-80 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home OS Dashboard
          </button>
        </div>

        {/* ==================== HERO HEADER ==================== */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center md:text-left mb-10"
        >
          <span className="text-[10px] tracking-widest text-[#2A7F7F] font-bold uppercase bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-4">
            <Brain className="w-3.5 h-3.5" />
            Phase 4: The Thinking Wing (Mind Pillar)
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-slate-900 tracking-tight leading-none">
            Attention & <span className="font-semibold text-slate-950">Mental Clarity.</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-light mt-3 max-w-xl leading-relaxed">
            A minimalist library and console dedicated to first-principles thinking, cognitive de-biasing, and articulate vocal mechanics.
          </p>
        </motion.div>

        {/* ==================== MIND VISION BOARD: CLEAR, CALM, CURIOUS ==================== */}
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
                Clear, Calm, <span className="font-semibold text-slate-950">Curious</span>
              </h2>
            </div>
            
            {/* Illuminated Stars counter */}
            <div className="flex items-center gap-3 bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-3.5 py-2 rounded-2xl self-start sm:self-auto">
              <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Stars Lit</span>
              <div className="text-lg font-bold text-[#2A7F7F]">
                {mindMarkers.filter(Boolean).length} / 10
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Night Sky Constellation Graphic */}
            <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[220px] relative overflow-hidden shadow-inner">
              {/* Starry background dust */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 opacity-90 pointer-events-none" />
              
              <svg viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-[180px] max-w-[240px] relative z-10">
                {/* Central Breathing Focus Orb (behind Star 9) */}
                <motion.circle 
                  cx="120" 
                  cy="85" 
                  r="30" 
                  fill="url(#focus-orb-gradient)" 
                  animate={{ 
                    scale: [0.9, 1.15, 0.9],
                    opacity: [0.25, 0.45, 0.25]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />

                {/* Constellation Connecting Lines */}
                {/* Line 0-8 */}
                <line 
                  x1="50" y1="40" x2="90" y2="30" 
                  stroke={mindMarkers[0] && mindMarkers[8] ? "#2A7F7F" : "#1e293b"} 
                  strokeWidth={mindMarkers[0] && mindMarkers[8] ? "1.5" : "0.5"} 
                  strokeDasharray={mindMarkers[0] && mindMarkers[8] ? "0" : "3 3"} 
                />
                {/* Line 8-7 */}
                <line 
                  x1="90" y1="30" x2="150" y2="40" 
                  stroke={mindMarkers[8] && mindMarkers[7] ? "#2A7F7F" : "#1e293b"} 
                  strokeWidth={mindMarkers[8] && mindMarkers[7] ? "1.5" : "0.5"} 
                  strokeDasharray={mindMarkers[8] && mindMarkers[7] ? "0" : "3 3"} 
                />
                {/* Line 7-6 */}
                <line 
                  x1="150" y1="40" x2="190" y2="60" 
                  stroke={mindMarkers[7] && mindMarkers[6] ? "#2A7F7F" : "#1e293b"} 
                  strokeWidth={mindMarkers[7] && mindMarkers[6] ? "1.5" : "0.5"} 
                  strokeDasharray={mindMarkers[7] && mindMarkers[6] ? "0" : "3 3"} 
                />
                {/* Line 6-5 */}
                <line 
                  x1="190" y1="60" x2="210" y2="100" 
                  stroke={mindMarkers[6] && mindMarkers[5] ? "#2A7F7F" : "#1e293b"} 
                  strokeWidth={mindMarkers[6] && mindMarkers[5] ? "1.5" : "0.5"} 
                  strokeDasharray={mindMarkers[6] && mindMarkers[5] ? "0" : "3 3"} 
                />
                {/* Line 5-4 */}
                <line 
                  x1="210" y1="100" x2="170" y2="130" 
                  stroke={mindMarkers[5] && mindMarkers[4] ? "#2A7F7F" : "#1e293b"} 
                  strokeWidth={mindMarkers[5] && mindMarkers[4] ? "1.5" : "0.5"} 
                  strokeDasharray={mindMarkers[5] && mindMarkers[4] ? "0" : "3 3"} 
                />
                {/* Line 4-3 */}
                <line 
                  x1="170" y1="130" x2="110" y2="130" 
                  stroke={mindMarkers[4] && mindMarkers[3] ? "#2A7F7F" : "#1e293b"} 
                  strokeWidth={mindMarkers[4] && mindMarkers[3] ? "1.5" : "0.5"} 
                  strokeDasharray={mindMarkers[4] && mindMarkers[3] ? "0" : "3 3"} 
                />
                {/* Line 3-2 */}
                <line 
                  x1="110" y1="130" x2="70" y2="110" 
                  stroke={mindMarkers[3] && mindMarkers[2] ? "#2A7F7F" : "#1e293b"} 
                  strokeWidth={mindMarkers[3] && mindMarkers[2] ? "1.5" : "0.5"} 
                  strokeDasharray={mindMarkers[3] && mindMarkers[2] ? "0" : "3 3"} 
                />
                {/* Line 2-1 */}
                <line 
                  x1="70" y1="110" x2="30" y2="80" 
                  stroke={mindMarkers[2] && mindMarkers[1] ? "#2A7F7F" : "#1e293b"} 
                  strokeWidth={mindMarkers[2] && mindMarkers[1] ? "1.5" : "0.5"} 
                  strokeDasharray={mindMarkers[2] && mindMarkers[1] ? "0" : "3 3"} 
                />
                {/* Line 1-0 */}
                <line 
                  x1="30" y1="80" x2="50" y2="40" 
                  stroke={mindMarkers[1] && mindMarkers[0] ? "#2A7F7F" : "#1e293b"} 
                  strokeWidth={mindMarkers[1] && mindMarkers[0] ? "1.5" : "0.5"} 
                  strokeDasharray={mindMarkers[1] && mindMarkers[0] ? "0" : "3 3"} 
                />

                {/* Inner connections to focus center (Star 9) */}
                {/* 0-9 */}
                <line 
                  x1="50" y1="40" x2="120" y2="85" 
                  stroke={mindMarkers[0] && mindMarkers[9] ? "#2A7F7F" : "#1e293b"} 
                  strokeWidth={mindMarkers[0] && mindMarkers[9] ? "1.2" : "0.5"} 
                  strokeDasharray="2 2"
                />
                {/* 7-9 */}
                <line 
                  x1="150" y1="40" x2="120" y2="85" 
                  stroke={mindMarkers[7] && mindMarkers[9] ? "#2A7F7F" : "#1e293b"} 
                  strokeWidth={mindMarkers[7] && mindMarkers[9] ? "1.2" : "0.5"} 
                  strokeDasharray="2 2"
                />
                {/* 3-9 */}
                <line 
                  x1="110" y1="130" x2="120" y2="85" 
                  stroke={mindMarkers[3] && mindMarkers[9] ? "#2A7F7F" : "#1e293b"} 
                  strokeWidth={mindMarkers[3] && mindMarkers[9] ? "1.2" : "0.5"} 
                  strokeDasharray="2 2"
                />

                {/* Stars Circles */}
                {[
                  { x: 50, y: 40 },
                  { x: 30, y: 80 },
                  { x: 70, y: 110 },
                  { x: 110, y: 130 },
                  { x: 170, y: 130 },
                  { x: 210, y: 100 },
                  { x: 190, y: 60 },
                  { x: 150, y: 40 },
                  { x: 90, y: 30 },
                  { x: 120, y: 85 }
                ].map((star, idx) => (
                  <g key={idx}>
                    {/* Star Glow */}
                    <AnimatePresence>
                      {mindMarkers[idx] && (
                        <motion.circle 
                          cx={star.x} cy={star.y} r="6" 
                          fill="#86EFAC" fillOpacity="0.6"
                          initial={{ scale: 0 }} animate={{ scale: 1.5 }} exit={{ scale: 0 }}
                          transition={{ type: "spring", stiffness: 100 }}
                        />
                      )}
                    </AnimatePresence>
                    {/* Core Star */}
                    <motion.circle 
                      cx={star.x} cy={star.y} 
                      r={idx === 9 ? "4" : "2.5"} 
                      fill={mindMarkers[idx] ? "#86EFAC" : "#475569"} 
                      animate={{ scale: mindMarkers[idx] ? [1, 1.3, 1] : 1 }}
                      transition={mindMarkers[idx] ? { repeat: Infinity, duration: 3, delay: idx * 0.2 } : {}}
                    />
                  </g>
                ))}

                <defs>
                  <radialGradient id="focus-orb-gradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#2A7F7F" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#2A7F7F" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#2A7F7F" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>

              <div className="text-center mt-2 relative z-10">
                <span className="text-[9px] text-slate-500 font-light block">Attention Constellation</span>
                <span className="text-[10px] font-bold text-slate-300 block mt-0.5 tracking-wide">
                  {mindMarkers.filter(Boolean).length === 10 
                    ? "Full Illumination" 
                    : `${mindMarkers.filter(Boolean).length} Star Nodes Active`}
                </span>
              </div>
            </div>

            {/* Checklist Markers */}
            <div className="lg:col-span-7 flex flex-col gap-2.5">
              {MIND_VISION_MARKERS.map((marker, idx) => (
                <button
                  key={idx}
                  onClick={() => toggleMindMarker(idx)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-300 flex items-center gap-3 cursor-pointer ${
                    mindMarkers[idx]
                      ? "bg-[#2A7F7F]/5 border-[#2A7F7F]/30 shadow-[0_4px_20px_rgba(42,127,127,0.02)]"
                      : "bg-white/50 border-black/[0.03] hover:border-black/[0.08]"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-lg border flex items-center justify-center flex-shrink-0 transition-all ${
                    mindMarkers[idx]
                      ? "bg-[#2A7F7F] border-[#2A7F7F] text-white"
                      : "border-slate-300 bg-white"
                  }`}>
                    {mindMarkers[idx] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-xs font-light leading-snug ${mindMarkers[idx] ? "text-slate-900 font-normal" : "text-slate-600"}`}>
                      {marker.label}
                    </p>
                  </div>
                  <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    marker.type === "mental" 
                      ? "bg-purple-100 text-purple-800 border border-purple-200" 
                      : marker.type === "voice"
                      ? "bg-blue-100 text-blue-800 border border-blue-200"
                      : marker.type === "health"
                      ? "bg-amber-100 text-amber-800 border border-amber-200"
                      : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                  }`}>
                    {marker.type}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Arrival Line Footer */}
          <div className="mt-8 pt-6 border-t border-black/[0.03] text-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block mb-2">Arrival Line</span>
            <p className="text-xs sm:text-sm text-[#2A7F7F] font-semibold italic max-w-xl mx-auto leading-relaxed">
              "A quieted, focused mind that sees reality clearly, communicates directly, and operates without cognitive friction."
            </p>
          </div>
        </motion.div>

        {/* ==================== INTERACTIVE HEADER CONSOLES ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* CARD 1: Deep Focus Block Timer */}
          <div className="glassmorphic rounded-3xl p-6 flex flex-col items-center justify-between min-h-[220px] relative overflow-hidden">
            <span className="absolute top-4 left-6 text-[9px] font-bold uppercase tracking-widest text-slate-400">
              Deep Focus Block
            </span>

            {/* Circular Timer Ring */}
            <div className="relative w-36 h-36 flex items-center justify-center mt-4">
              <svg className="w-full h-full transform -rotate-90">
                {/* Track circle */}
                <circle
                  cx="72"
                  cy="72"
                  r={radius}
                  className="stroke-slate-200"
                  strokeWidth="3.5"
                  fill="transparent"
                />
                {/* Active circle */}
                <motion.circle
                  cx="72"
                  cy="72"
                  r={radius}
                  className="stroke-[#2A7F7F]"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray={circumference}
                  animate={{ strokeDashoffset }}
                  transition={{ ease: "linear" }}
                  strokeLinecap="round"
                />
              </svg>
              {/* Inner content */}
              <div className="absolute flex flex-col items-center justify-center select-none">
                <span className="text-xl font-semibold text-slate-900 tabular-nums leading-none">
                  {formatTime(timeLeft)}
                </span>
                <span className="text-[8px] text-slate-400 font-light uppercase tracking-wider mt-1">
                  {isTimerRunning ? "Quiet Mode" : "Ready"}
                </span>
              </div>
            </div>

            {/* Timer Actions */}
            <div className="flex gap-4 mt-4 relative z-10">
              <button
                onClick={toggleTimer}
                className="w-10 h-10 rounded-full bg-[#2A7F7F] text-white flex items-center justify-center hover:bg-[#1e5c5c] transition-colors cursor-pointer"
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <button
                onClick={resetTimer}
                className="w-10 h-10 rounded-full bg-slate-200/60 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CARD 2: Clarity Console */}
          <div className="glassmorphic rounded-3xl p-6 flex flex-col justify-between min-h-[220px]">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                Clarity Console
              </span>
              <span className="text-[9px] font-bold text-[#2A7F7F] uppercase tracking-wider bg-[#2A7F7F]/5 px-2 py-0.5 rounded border border-[#2A7F7F]/10">
                State: {clarityValue}/10
              </span>
            </div>

            <textarea
              value={clarityText}
              onChange={(e) => setClarityText(e.target.value)}
              placeholder="What is the primary truth or task of today?"
              className="w-full flex-1 bg-transparent text-slate-900 text-xs sm:text-sm font-light placeholder-slate-400 focus:outline-none resize-none min-h-[70px] pt-1"
            />

            {/* Slider */}
            <div className="mt-4 pt-4 border-t border-black/[0.03]">
              <div className="flex justify-between text-[8px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">
                <span>Cognitive Load</span>
                <span>Absolute Focus</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={clarityValue}
                onChange={(e) => setClarityValue(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2A7F7F]"
              />
            </div>
          </div>

        </div>

        {/* ==================== MENTAL MODELS GRID ==================== */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-2">
            <div>
              <h2 className="text-lg font-light text-slate-900">
                Open Forge <span className="font-semibold text-slate-950">Mental Frameworks</span>
              </h2>
              <p className="text-[10px] text-slate-400 font-light mt-0.5">
                Baseline logical models to filter information intake and decisions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MENTAL_MODELS.map((model) => (
              <div
                key={model.id}
                onMouseEnter={() => setHoveredModelId(model.id)}
                onMouseLeave={() => setHoveredModelId(null)}
                className="glassmorphic rounded-2xl p-5 flex flex-col justify-between min-h-[140px] border-black/[0.03] hover:border-[#2A7F7F]/30 hover:shadow-[0_8px_30px_rgba(42,127,127,0.02)] transition-all duration-300 group"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] text-[#2A7F7F] font-bold uppercase tracking-widest bg-[#2A7F7F]/5 px-2 py-0.5 rounded border border-[#2A7F7F]/10">
                      {model.subtitle}
                    </span>
                    <HelpCircle className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#2A7F7F] transition-colors" />
                  </div>
                  <h4 className="text-xs font-semibold text-slate-900 mt-3">{model.title}</h4>
                  <p className="text-[10px] text-slate-500 font-light leading-relaxed mt-2">
                    {model.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================== NEUROPLASTICITY BLOCKQUOTE (SCROLL ANCHOR) ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="glassmorphic rounded-3xl p-8 mb-16 text-center border-l-4 border-l-[#2A7F7F] relative overflow-hidden"
        >
          <Quote className="absolute top-4 left-6 w-12 h-12 text-[#2A7F7F]/5 pointer-events-none" />
          <p className="text-sm sm:text-base font-light text-slate-900 italic max-w-2xl mx-auto leading-relaxed">
            "{NEUROPLASTICITY_SUMMARY.quote}"
          </p>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#2A7F7F] block mt-4">
            The Neuroplasticity Core
          </span>
          <p className="text-[10px] sm:text-xs text-slate-500 font-light mt-1 max-w-lg mx-auto leading-relaxed">
            {NEUROPLASTICITY_SUMMARY.description}
          </p>
        </motion.div>

        {/* ==================== THE VOICE MASTERCLASS ==================== */}
        <div className="mb-6">
          <div className="mb-8">
            <h2 className="text-lg font-light text-slate-900">
              The Voice <span className="font-semibold text-slate-950">Masterclass</span>
            </h2>
            <p className="text-[10px] text-slate-400 font-light mt-0.5">
              Rules of high-fidelity, articulate vocal structure and posture.
            </p>
          </div>

          <div className="space-y-10">
            {VOICE_SECTIONS.map((section, sIdx) => (
              <div key={sIdx} className="border-b border-black/[0.03] pb-10 last:border-0 last:pb-0">
                <div className="mb-6">
                  <span className="text-[9px] uppercase tracking-widest text-[#2A7F7F] font-bold">
                    Section 0{sIdx + 1}
                  </span>
                  <h3 className="text-base font-semibold text-slate-950 mt-1">
                    {section.title}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-light">
                    {section.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {section.rules.map((rule, rIdx) => (
                    <div 
                      key={rIdx} 
                      className="bg-white/40 border border-black/[0.02] rounded-2xl p-5 flex flex-col justify-between hover:border-[#2A7F7F]/20 transition-all duration-300"
                    >
                      <div>
                        <h4 className="text-xs font-semibold text-slate-900 mb-4 flex items-center gap-1.5">
                          <Mic className="w-3.5 h-3.5 text-[#2A7F7F] flex-shrink-0" />
                          {rule.title}
                        </h4>
                        <div className="flex flex-col gap-3">
                          {rule.tips.map((tip, tIdx) => (
                            <div key={tIdx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#2A7F7F] mt-1.5 flex-shrink-0" />
                              <span className="text-[10px] text-slate-600 font-light leading-relaxed">
                                {tip}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
