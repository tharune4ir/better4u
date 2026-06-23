"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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
  Check,
  Compass,
  Shuffle,
  Volume2,
  Moon,
  Coffee
} from "lucide-react";
import Navbar, { NavTab } from "@/components/Navbar";
import { 
  MENTAL_MODELS, 
  VOICE_SECTIONS, 
  NEUROPLASTICITY_SUMMARY 
} from "@/lib/mind-data";

const CURIOSITY_OS_PRINCIPLES = [
  { id: 1, title: "Let interest guide", detail: "Ignore pre-made syllabi. Learn what you are naturally drawn to in the moment." },
  { id: 2, title: "Define what you're building", detail: "Never learn in the abstract. Always have a specific project (app, note, design) you are constructing." },
  { id: 3, title: "One project at a time", detail: "Multi-tasking is structural dilution. Select one project, run it to completion, then switch." },
  { id: 4, title: "Hunt, don't hoard", detail: "Stop compiling endless bookmarks and PDFs. Find the exact resource needed for your current block, consume it, and build immediately." },
  { id: 5, title: "30–90 min deep blocks", detail: "Protect short, high-fidelity focus blocks. Multi-hour sessions lead to fatigue and shallow learning." },
  { id: 6, title: "Compress what you learn", detail: "Synthesize. Boil pages of notes down into a single card or schematic. If you cannot compress it, you do not understand it." },
  { id: 7, title: "Iterate against reality", detail: "Publish, test, or get feedback. A model tested against the real world will expose its flaws in minutes." }
];

const LANTERN_STATIONS = [
  { id: 1, title: "Observe without labeling", detail: "Quiet the automatic judgment engine. Look at raw data and behaviors before assigning categories like 'good' or 'bad'." },
  { id: 2, title: "Precision in Language", detail: "Banish vague placeholders like 'fine', 'busy', or 'stuff'. Use precise words to pinpoint your physical and emotional reality." },
  { id: 3, title: "The Reality Check", detail: "Write down your core assumptions. Periodically measure them against physical metrics to correct cognitive drift." }
];

const DAILY_THINKING_REPS = [
  "If you were guaranteed to fail at your current project, how would it happen? (Inversion principle)",
  "What is one belief you held for years that you recently discarded? What updated your view?",
  "Look at your biggest current problem. How would you solve it if you had only $10 or 1 hour?",
  "Are you currently solving the real problem, or just a comfortable proxy to feel productive?",
  "Write down the next decision you need to make. What is its second-order consequence? And then what?",
  "What is the most direct, honest truth about your current situation that you are avoiding?"
];

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
  
  // Parallax scroll logic for Seamless Weave floating SVGs
  const { scrollYProgress } = useScroll();
  const yFloat1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yFloat2 = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yFloat3 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  
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

  // Rest Timer (Do Nothing Break)
  const [restTimeLeft, setRestTimeLeft] = useState(300);
  const [isRestTimerRunning, setIsRestTimerRunning] = useState(false);

  // Daily Reps State
  const [currentThinkingRepIdx, setCurrentThinkingRepIdx] = useState(0);

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

  // Rest Timer Tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRestTimerRunning && restTimeLeft > 0) {
      interval = setInterval(() => {
        setRestTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (restTimeLeft === 0) {
      setIsRestTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRestTimerRunning, restTimeLeft]);

  const handleTabChange = (tab: NavTab) => {
    if (tab === "movement") {
      router.push("/movement");
    } else if (tab === "thinking") {
      router.push("/thinking");
    } else if (tab === "food") {
      router.push("/food");
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

  const toggleRestTimer = () => {
    setIsRestTimerRunning(!isRestTimerRunning);
  };

  const resetRestTimer = () => {
    setIsRestTimerRunning(false);
    setRestTimeLeft(300);
  };

  // Circular SVG Progress calculation
  const totalSeconds = 25 * 60;
  const percentage = (timeLeft / totalSeconds) * 100;
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F2] relative overflow-hidden">
      
      {/* ================= BACKGROUND DECORATIONS & FLOATING CUTOUTS (SEAMLESS WEAVE) ================= */}
      {/* Ambient Glows */}
      <div className="absolute top-[5%] right-[-15%] w-[35vw] h-[35vw] bg-[#2A7F7F]/3 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-15%] w-[35vw] h-[35vw] bg-[#2A7F7F]/3 rounded-full blur-[130px] pointer-events-none" />

      {/* 1. Synapse / Neural Connection Lines (Top Right) */}
      <motion.div 
        style={{ y: yFloat1 }}
        className="absolute top-20 right-[-5%] w-72 h-72 pointer-events-none opacity-20 md:opacity-35 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter blur-[1px]">
          {/* Neural nodes */}
          <circle cx="30" cy="50" r="8" fill="url(#syn-node)" />
          <circle cx="100" cy="30" r="6" fill="url(#syn-node)" />
          <circle cx="170" cy="60" r="7" fill="url(#syn-node)" />
          <circle cx="60" cy="120" r="9" fill="url(#syn-node)" />
          <circle cx="140" cy="110" r="7" fill="url(#syn-node)" />
          <circle cx="100" cy="170" r="8" fill="url(#syn-node)" />
          <circle cx="170" cy="160" r="6" fill="url(#syn-node)" />
          {/* Synaptic connections */}
          <line x1="30" y1="50" x2="100" y2="30" stroke="#2A7F7F" strokeWidth="1" opacity="0.3" />
          <line x1="100" y1="30" x2="170" y2="60" stroke="#2A7F7F" strokeWidth="1" opacity="0.25" />
          <line x1="30" y1="50" x2="60" y2="120" stroke="#2A7F7F" strokeWidth="1" opacity="0.3" />
          <line x1="100" y1="30" x2="140" y2="110" stroke="#2A7F7F" strokeWidth="1" opacity="0.25" />
          <line x1="60" y1="120" x2="140" y2="110" stroke="#2A7F7F" strokeWidth="1.5" opacity="0.35" />
          <line x1="140" y1="110" x2="170" y2="60" stroke="#2A7F7F" strokeWidth="1" opacity="0.2" />
          <line x1="60" y1="120" x2="100" y2="170" stroke="#2A7F7F" strokeWidth="1" opacity="0.3" />
          <line x1="140" y1="110" x2="170" y2="160" stroke="#2A7F7F" strokeWidth="1" opacity="0.25" />
          <line x1="100" y1="170" x2="170" y2="160" stroke="#2A7F7F" strokeWidth="1" opacity="0.2" />
          <defs>
            <radialGradient id="syn-node" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#5EEAD4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#2A7F7F" stopOpacity="0.2" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>

      {/* 2. Focus Ring / Camera Aperture (Left - Mid Page) */}
      <motion.div 
        style={{ y: yFloat2 }}
        className="absolute top-[42%] left-[-8%] w-72 h-72 pointer-events-none opacity-15 md:opacity-25 z-0"
        animate={{ 
          rotate: [0, 15, 0],
          scale: [1, 1.03, 1]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Outer aperture ring */}
          <circle cx="100" cy="100" r="80" stroke="#2A7F7F" strokeWidth="1" opacity="0.2" />
          {/* Aperture blades */}
          <path d="M100,20 L115,80 L100,75 Z" fill="#2A7F7F" opacity="0.15" />
          <path d="M169,55 L120,90 L118,78 Z" fill="#2A7F7F" opacity="0.12" />
          <path d="M169,145 L120,110 L125,100 Z" fill="#2A7F7F" opacity="0.15" />
          <path d="M100,180 L85,120 L100,125 Z" fill="#2A7F7F" opacity="0.12" />
          <path d="M31,145 L80,110 L82,122 Z" fill="#2A7F7F" opacity="0.15" />
          <path d="M31,55 L80,90 L75,100 Z" fill="#2A7F7F" opacity="0.12" />
          {/* Inner focus circle */}
          <circle cx="100" cy="100" r="25" stroke="#2A7F7F" strokeWidth="2" opacity="0.3" />
          <circle cx="100" cy="100" r="12" fill="url(#focus-core)" />
          <defs>
            <radialGradient id="focus-core" cx="45%" cy="45%" r="55%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
              <stop offset="100%" stopColor="rgba(42, 127, 127, 0.15)" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>

      {/* 3. First Principles Staircase (Bottom Right) — ascending geometric steps */}
      <motion.div 
        style={{ y: yFloat3 }}
        className="absolute bottom-28 right-[-4%] w-64 h-64 pointer-events-none opacity-15 md:opacity-25 z-0"
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter blur-[1px]">
          {/* Ascending steps */}
          <rect x="20" y="160" width="35" height="20" rx="3" fill="url(#step-grad)" opacity="0.6" />
          <rect x="55" y="135" width="35" height="20" rx="3" fill="url(#step-grad)" opacity="0.5" />
          <rect x="90" y="110" width="35" height="20" rx="3" fill="url(#step-grad)" opacity="0.45" />
          <rect x="125" y="85" width="35" height="20" rx="3" fill="url(#step-grad)" opacity="0.4" />
          <rect x="160" y="60" width="25" height="20" rx="3" fill="url(#step-grad)" opacity="0.35" />
          {/* Ascending line connecting the steps */}
          <path 
            d="M37,160 L72,135 L107,110 L142,85 L172,60" 
            stroke="#2A7F7F" 
            strokeWidth="1.5" 
            strokeDasharray="4 3"
            strokeLinecap="round"
            fill="none" 
            opacity="0.3"
          />
          {/* Arrow at the top */}
          <path d="M170,55 L175,50 L180,58" stroke="#2A7F7F" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" />
          <defs>
            <linearGradient id="step-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2A7F7F" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#5EEAD4" stopOpacity="0.15" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

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

        {/* ==================== CURIOSITY OS (HOW TO LEARN) ==================== */}
        <div className="mb-16">
          <div className="mb-8">
            <h2 className="text-lg font-light text-slate-900">
              Curiosity OS <span className="font-semibold text-slate-950">Learning Principles</span>
            </h2>
            <p className="text-[10px] text-slate-400 font-light mt-0.5">
              The 7 pillars of efficient self-education. Let interest guide and iterate against reality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CURIOSITY_OS_PRINCIPLES.map((p) => (
              <div 
                key={p.id}
                className="bg-white/50 border border-black/[0.02] rounded-2xl p-5 flex flex-col justify-between hover:border-[#2A7F7F]/20 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-[#2A7F7F] bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-2 py-0.5 rounded">
                      0{p.id}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-900 mt-3">{p.title}</h4>
                  <p className="text-[10px] text-slate-500 font-light leading-relaxed mt-2">
                    {p.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

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

        {/* ==================== VOCABULARY & RESOLUTION (LANTERN STATIONS) ==================== */}
        <div className="mb-16 mt-12 border-t border-black/[0.03] pt-12">
          <div className="mb-8">
            <h2 className="text-lg font-light text-slate-900">
              Vocabulary & <span className="font-semibold text-slate-950">Resolution</span>
            </h2>
            <p className="text-[10px] text-slate-400 font-light mt-0.5">
              Clarity is higher resolution. Calibrate your lens through these three lantern stations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LANTERN_STATIONS.map((station) => (
              <div 
                key={station.id}
                className="bg-white/50 border border-black/[0.02] rounded-2xl p-5 hover:border-[#2A7F7F]/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] font-bold text-[#2A7F7F] bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-2 py-0.5 rounded">
                      Station 0{station.id}
                    </span>
                    <Compass className="w-4 h-4 text-[#2A7F7F]" />
                  </div>
                  <h4 className="text-xs font-semibold text-slate-900">{station.title}</h4>
                  <p className="text-[10px] text-slate-500 font-light leading-relaxed mt-2">
                    {station.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================== THE REST CORNER & DAILY REP ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 border-t border-black/[0.03] pt-12">
          
          {/* Do Nothing Corner */}
          <div className="glassmorphic rounded-3xl p-6 flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                  The Rest / Do-Nothing Corner
                </span>
                <Moon className="w-4 h-4 text-[#2A7F7F]" />
              </div>
              <h4 className="text-xs font-semibold text-slate-900">Boredom-on-Purpose</h4>
              <p className="text-[10px] text-slate-500 font-light leading-relaxed mt-1">
                Train your brain to sit with zero inputs (no screen, no text, no audio) for 5 minutes. Protect empty buffers.
              </p>
            </div>

            <div className="flex items-center justify-between mt-4 bg-black/[0.01] p-3 rounded-2xl border border-black/[0.01]">
              <div className="flex flex-col">
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Countdown</span>
                <span className="text-base font-semibold text-slate-900 tabular-nums">
                  {formatTime(restTimeLeft)}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={toggleRestTimer}
                  className="px-4 py-1.5 rounded-xl bg-[#2A7F7F] text-white text-[10px] font-semibold hover:bg-[#1e5c5c] transition-colors cursor-pointer"
                >
                  {isRestTimerRunning ? "Pause" : "Start Break"}
                </button>
                <button
                  onClick={resetRestTimer}
                  className="p-1.5 rounded-xl bg-slate-200/60 text-slate-600 hover:bg-slate-200 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Daily Thinking Rep */}
          <div className="glassmorphic rounded-3xl p-6 flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                  Daily Thinking Rep
                </span>
                <Shuffle className="w-4 h-4 text-[#2A7F7F]" />
              </div>
              <h4 className="text-xs font-semibold text-slate-900">Logical Sanity Check</h4>
              <p className="text-[11px] text-[#2A7F7F] italic leading-relaxed mt-3">
                "{DAILY_THINKING_REPS[currentThinkingRepIdx]}"
              </p>
            </div>

            <button
              onClick={() => setCurrentThinkingRepIdx((prev) => (prev + 1) % DAILY_THINKING_REPS.length)}
              className="w-full py-2.5 mt-4 rounded-xl border border-black/[0.04] bg-white/40 hover:bg-white text-[10px] font-semibold text-slate-700 tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Shuffle className="w-3 h-3 text-[#2A7F7F]" />
              Draw Another Rep
            </button>
          </div>

        </div>

      </main>

      {/* Simple Footer */}
      <footer className="w-full text-center py-8 pb-28 md:pb-8 text-[10px] tracking-widest text-slate-400 font-light select-none relative z-10 border-t border-black/[0.02] bg-white/20">
        BUILT IN THE OPEN. ONE REP AT A TIME.
      </footer>
    </div>
  );
}
