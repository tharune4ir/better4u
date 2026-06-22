"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  Activity, 
  Sparkles, 
  ChevronRight, 
  ArrowLeft, 
  ShieldAlert, 
  CheckCircle2, 
  Check,
  Flame, 
  Waves,
  RefreshCw,
  Dumbbell
} from "lucide-react";
import Navbar, { NavTab } from "@/components/Navbar";
import { 
  BODY_PRINCIPLES, 
  MORNING_SESSION_FLOW, 
  ANCIENT_TOOLS, 
  SessionStep 
} from "@/lib/body-data";

const BODY_VISION_MARKERS = [
  { label: "Strong, controlled push-ups in clean form; building toward a first pull-up", cat: "strength" },
  { label: "A long, relaxed passive hang; shoulders that feel free", cat: "recovery" },
  { label: "A deep squat I can rest in, heels down", cat: "mobility" },
  { label: "Carry, lift, and move things in daily life with ease", cat: "strength" },
  { label: "Mobility: touch toes comfortably · full overhead reach · rotate freely · wake up without stiffness", cat: "mobility" },
  { label: "Endurance & energy: walk/hike for hours without fatigue · stairs feel easy", cat: "endurance" },
  { label: "Fast recovery after daily movement", cat: "recovery" },
  { label: "Health markers (with GP): BP healthy · bloods healthy · sleep solid · resting easy", cat: "recovery" },
  { label: "Play horizon: a first strict pull-up (GP-aligned)", cat: "strength" },
  { label: "Play horizon: a clean handstand work (GP-aligned)", cat: "endurance" }
];

export default function MovementPage() {
  const router = useRouter();
  const [activeStepId, setActiveStepId] = useState<string>("joints");
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  
  // Parallax scroll logic for Seamless Weave floating SVGs
  const { scrollYProgress } = useScroll();
  const yFloat1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yFloat2 = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const yFloat3 = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const yFloat4 = useTransform(scrollYProgress, [0, 1], [0, 130]);
  
  // Body Vision Board state (10 markers)
  const [bodyMarkers, setBodyMarkers] = useState<boolean[]>(new Array(10).fill(false));
  
  const toggleBodyMarker = (index: number) => {
    setBodyMarkers(prev => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };
  
  const handleTabChange = (tab: NavTab) => {
    if (tab === "nutrition") {
      router.push("/nutrition");
    } else if (tab === "thinking") {
      router.push("/thinking");
    } else if (tab === "home-os") {
      router.push("/home");
    } else if (tab === "visionary") {
      router.push("/home?section=visionary");
    }
  };

  const toggleStepCompleted = (id: string) => {
    setCompletedSteps(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const activeStep = MORNING_SESSION_FLOW.find(s => s.id === activeStepId) || MORNING_SESSION_FLOW[0];

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F2] relative overflow-hidden">
      
      {/* ================= BACKGROUND DECORATIONS & FLOATING CUTOUTS (SEAMLESS WEAVE) ================= */}
      {/* Kinetic Ring Glows */}
      <div className="absolute top-[10%] left-[-10%] w-[30vw] h-[30vw] bg-[#2A7F7F]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] bg-[#2A7F7F]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* 1. Kinetic Spine Wave (Top Right) — a flowing S-curve representing the spine */}
      <motion.div 
        style={{ y: yFloat1 }}
        className="absolute top-16 right-[-6%] w-64 h-72 pointer-events-none opacity-20 md:opacity-35 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <svg viewBox="0 0 200 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter blur-[1px]">
          <path 
            d="M100,10 C60,50 140,90 100,130 C60,170 140,210 100,240" 
            stroke="url(#spine-grad)" 
            strokeWidth="3" 
            strokeLinecap="round"
            fill="none"
          />
          {/* Vertebrae nodes */}
          <circle cx="100" cy="10" r="5" fill="#2A7F7F" opacity="0.5" />
          <circle cx="80" cy="70" r="4" fill="#2A7F7F" opacity="0.4" />
          <circle cx="120" cy="90" r="4" fill="#2A7F7F" opacity="0.4" />
          <circle cx="100" cy="130" r="5" fill="#2A7F7F" opacity="0.5" />
          <circle cx="80" cy="170" r="4" fill="#2A7F7F" opacity="0.4" />
          <circle cx="120" cy="210" r="4" fill="#2A7F7F" opacity="0.4" />
          <circle cx="100" cy="240" r="5" fill="#2A7F7F" opacity="0.5" />
          <defs>
            <linearGradient id="spine-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2A7F7F" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#5EEAD4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#2A7F7F" stopOpacity="0.7" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* 2. Abstract Mace/Club (Left - Mid Page) — ancient training tool silhouette */}
      <motion.div 
        style={{ y: yFloat2 }}
        className="absolute top-[38%] left-[-7%] w-72 h-72 pointer-events-none opacity-15 md:opacity-25 z-0"
        animate={{ 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.02, 1]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter blur-[1px]">
          {/* Handle */}
          <rect x="95" y="80" width="10" height="100" rx="5" fill="url(#mace-handle)" />
          {/* Head */}
          <ellipse cx="100" cy="65" rx="35" ry="30" fill="url(#mace-head)" />
          <ellipse cx="100" cy="65" rx="20" ry="16" fill="white" opacity="0.08" />
          <defs>
            <linearGradient id="mace-handle" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2A7F7F" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#1e5c5c" stopOpacity="0.2" />
            </linearGradient>
            <radialGradient id="mace-head" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#5EEAD4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#2A7F7F" stopOpacity="0.15" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>

      {/* 3. Glowing Joint/Node Circle (Right - Lower Mid) */}
      <motion.div 
        style={{ y: yFloat3 }}
        className="absolute top-[62%] right-[-5%] w-60 h-60 pointer-events-none opacity-15 md:opacity-25 z-0"
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Outer glow ring */}
          <circle cx="100" cy="100" r="70" stroke="#2A7F7F" strokeWidth="1" opacity="0.3" />
          <circle cx="100" cy="100" r="55" stroke="#2A7F7F" strokeWidth="1.5" strokeDasharray="8 4" opacity="0.25" />
          {/* Core joint node */}
          <circle cx="100" cy="100" r="30" fill="url(#joint-grad)" />
          {/* Inner highlight */}
          <circle cx="90" cy="90" r="15" fill="white" opacity="0.1" />
          {/* Connective lines radiating outward */}
          <line x1="100" y1="30" x2="100" y2="70" stroke="#2A7F7F" strokeWidth="1" opacity="0.2" />
          <line x1="170" y1="100" x2="130" y2="100" stroke="#2A7F7F" strokeWidth="1" opacity="0.2" />
          <line x1="100" y1="170" x2="100" y2="130" stroke="#2A7F7F" strokeWidth="1" opacity="0.2" />
          <line x1="30" y1="100" x2="70" y2="100" stroke="#2A7F7F" strokeWidth="1" opacity="0.2" />
          <defs>
            <radialGradient id="joint-grad" cx="45%" cy="45%" r="55%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
              <stop offset="50%" stopColor="rgba(42, 127, 127, 0.2)" />
              <stop offset="100%" stopColor="rgba(42, 127, 127, 0.05)" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>

      {/* 4. Floating Kinetic Rings (Bottom Left) — slow rotation */}
      <motion.div 
        style={{ y: yFloat4 }}
        animate={{ 
          rotate: 360,
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute bottom-24 left-[-4%] w-64 h-64 pointer-events-none opacity-10 md:opacity-20 z-0"
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="100" cy="100" r="80" stroke="#2A7F7F" strokeWidth="1.5" strokeDasharray="5 5" />
          <circle cx="100" cy="100" r="60" stroke="#2A7F7F" strokeWidth="1" />
          <circle cx="100" cy="100" r="40" stroke="#2A7F7F" strokeWidth="2" strokeDasharray="40 10" />
        </svg>
      </motion.div>

      {/* ==================== NAVIGATION ==================== */}
      <Navbar activeTab="movement" setActiveTab={handleTabChange} />

      {/* ==================== CONTENT CANVAS ==================== */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 pb-28 md:pb-16 z-10 relative">
        
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

        {/* ==================== THE KINETIC HERO ==================== */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center md:text-left mb-12"
        >
          <span className="text-[10px] tracking-widest text-[#2A7F7F] font-bold uppercase bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-4">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            Phase 3: The Movement Wing (Body Pillar)
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-slate-900 tracking-tight leading-none">
            Lean, Capable, and <span className="font-semibold text-slate-950">Useful.</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-light mt-3 max-w-2xl leading-relaxed">
            A physical capability framework built on movement first principles, full-body calibration flows, and minimal ancient tools. Designed for functional mobility and spinal longevity.
          </p>
        </motion.div>

        {/* ==================== BODY VISION BOARD: LEAN, CAPABLE, DURABLE ==================== */}
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
                Lean, Capable, <span className="font-semibold text-slate-950">Durable</span>
              </h2>
            </div>
            
            {/* Overall physical capability score */}
            <div className="flex items-center gap-3 bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-3.5 py-2 rounded-2xl self-start sm:self-auto">
              <div className="text-right leading-tight">
                <p className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Overall Progress</p>
                <p className="text-[9px] text-slate-400">Capability checklist</p>
              </div>
              <div className="text-lg font-bold text-[#2A7F7F]">
                {Math.round((bodyMarkers.filter(Boolean).length / 10) * 100)}%
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Interactive Silhouette & Rings SVG */}
            <div className="lg:col-span-5 bg-white/40 border border-black/[0.02] rounded-2xl p-4 flex flex-col items-center justify-center min-h-[240px] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A7F7F]/5 to-transparent opacity-50 pointer-events-none" />
              
              <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-[200px] max-w-[240px] relative z-10">
                {/* Concentric Capability Rings */}
                {/* 1. Strength (R=32) */}
                <circle cx="100" cy="95" r="32" stroke="#e2e8f0" strokeWidth="1.5" />
                <motion.circle 
                  cx="100" cy="95" r="32" 
                  stroke="#2A7F7F" strokeWidth="2.5" 
                  strokeDasharray={2 * Math.PI * 32}
                  animate={{ strokeDashoffset: (2 * Math.PI * 32) * (1 - [0, 3, 8].filter(i => bodyMarkers[i]).length / 3) }}
                  transition={{ duration: 0.8 }}
                />
                
                {/* 2. Mobility (R=48) */}
                <circle cx="100" cy="95" r="48" stroke="#e2e8f0" strokeWidth="1.5" />
                <motion.circle 
                  cx="100" cy="95" r="48" 
                  stroke="#0d9488" strokeWidth="2.5" 
                  strokeDasharray={2 * Math.PI * 48}
                  animate={{ strokeDashoffset: (2 * Math.PI * 48) * (1 - [2, 4].filter(i => bodyMarkers[i]).length / 2) }}
                  transition={{ duration: 0.8 }}
                />

                {/* 3. Endurance (R=64) */}
                <circle cx="100" cy="95" r="64" stroke="#e2e8f0" strokeWidth="1.5" />
                <motion.circle 
                  cx="100" cy="95" r="64" 
                  stroke="#0f766e" strokeWidth="2.5" 
                  strokeDasharray={2 * Math.PI * 64}
                  animate={{ strokeDashoffset: (2 * Math.PI * 64) * (1 - [5, 9].filter(i => bodyMarkers[i]).length / 2) }}
                  transition={{ duration: 0.8 }}
                />

                {/* 4. Recovery (R=80) */}
                <circle cx="100" cy="95" r="80" stroke="#e2e8f0" strokeWidth="1.5" />
                <motion.circle 
                  cx="100" cy="95" r="80" 
                  stroke="#86EFAC" strokeWidth="2.5" 
                  strokeDasharray={2 * Math.PI * 80}
                  animate={{ strokeDashoffset: (2 * Math.PI * 80) * (1 - [1, 6, 7].filter(i => bodyMarkers[i]).length / 3) }}
                  transition={{ duration: 0.8 }}
                />

                {/* Minimal Silhouette Figure */}
                {/* Head */}
                <motion.circle 
                  cx="100" cy="62" r="5" 
                  fill={bodyMarkers.filter(Boolean).length > 0 ? "#134e4a" : "#94a3b8"} 
                  animate={{ scale: bodyMarkers.filter(Boolean).length > 0 ? 1.05 : 1 }}
                />
                {/* Torso */}
                <motion.line 
                  x1="100" y1="67" x2="100" y2="105" 
                  stroke={bodyMarkers.filter(Boolean).length > 0 ? "#134e4a" : "#94a3b8"} 
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Shoulders / Collarbone */}
                <line x1="91" y1="74" x2="109" y2="74" stroke={bodyMarkers.filter(Boolean).length > 0 ? "#134e4a" : "#94a3b8"} strokeWidth="2" strokeLinecap="round" />
                {/* Left Arm */}
                <motion.line 
                  x1="91" y1="74" x2="82" y2="94" 
                  stroke={bodyMarkers.filter(Boolean).length > 0 ? "#134e4a" : "#94a3b8"} 
                  strokeWidth="2" 
                  strokeLinecap="round"
                  animate={{ y2: bodyMarkers[9] ? 60 : 94, x2: bodyMarkers[9] ? 85 : 82 }} // raises hand on handstand
                />
                {/* Right Arm */}
                <motion.line 
                  x1="109" y1="74" x2="118" y2="94" 
                  stroke={bodyMarkers.filter(Boolean).length > 0 ? "#134e4a" : "#94a3b8"} 
                  strokeWidth="2" 
                  strokeLinecap="round"
                  animate={{ y2: bodyMarkers[9] ? 60 : 94, x2: bodyMarkers[9] ? 115 : 118 }} // raises hand on handstand
                />
                {/* Hips */}
                <line x1="94" y1="105" x2="106" y2="105" stroke={bodyMarkers.filter(Boolean).length > 0 ? "#134e4a" : "#94a3b8"} strokeWidth="2.5" strokeLinecap="round" />
                {/* Left Leg */}
                <motion.line 
                  x1="94" y1="105" x2="89" y2="135" 
                  stroke={bodyMarkers.filter(Boolean).length > 0 ? "#134e4a" : "#94a3b8"} 
                  strokeWidth="2" 
                  strokeLinecap="round"
                  animate={{ y2: bodyMarkers[2] ? 120 : 135, x2: bodyMarkers[2] ? 82 : 89 }} // squats slightly
                />
                {/* Right Leg */}
                <motion.line 
                  x1="106" y1="105" x2="111" y2="135" 
                  stroke={bodyMarkers.filter(Boolean).length > 0 ? "#134e4a" : "#94a3b8"} 
                  strokeWidth="2" 
                  strokeLinecap="round"
                  animate={{ y2: bodyMarkers[2] ? 120 : 135, x2: bodyMarkers[2] ? 118 : 111 }} // squats slightly
                />

                {/* Skill Badges overlays */}
                {/* Hang Badge (recovery) */}
                <g opacity="0.85">
                  <line x1="100" y1="15" x2="100" y2="5" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />
                  <motion.rect 
                    x="192" y="30" width="42" height="15" rx="4" 
                    fill={bodyMarkers[1] ? "#2A7F7F" : "#ffffff"} 
                    stroke={bodyMarkers[1] ? "#2A7F7F" : "#cbd5e1"} 
                    strokeWidth="1"
                  />
                  <text x="213" y="40" fill={bodyMarkers[1] ? "#ffffff" : "#64748b"} fontSize="7" fontWeight="bold" textAnchor="middle">HANG</text>
                  <path d="M180,95 L192,37" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2 2" />
                </g>

                {/* Pull-up Badge (strength) */}
                <g opacity="0.85">
                  <motion.rect 
                    x="192" y="90" width="42" height="15" rx="4" 
                    fill={bodyMarkers[8] ? "#2A7F7F" : "#ffffff"} 
                    stroke={bodyMarkers[8] ? "#2A7F7F" : "#cbd5e1"} 
                    strokeWidth="1"
                  />
                  <text x="213" y="100" fill={bodyMarkers[8] ? "#ffffff" : "#64748b"} fontSize="7" fontWeight="bold" textAnchor="middle">PULL-UP</text>
                  <path d="M132,95 L192,97" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2 2" />
                </g>

                {/* Handstand Badge (endurance/skill) */}
                <g opacity="0.85">
                  <motion.rect 
                    x="192" y="150" width="42" height="15" rx="4" 
                    fill={bodyMarkers[9] ? "#2A7F7F" : "#ffffff"} 
                    stroke={bodyMarkers[9] ? "#2A7F7F" : "#cbd5e1"} 
                    strokeWidth="1"
                  />
                  <text x="213" y="160" fill={bodyMarkers[9] ? "#ffffff" : "#64748b"} fontSize="7" fontWeight="bold" textAnchor="middle">HANDSTAND</text>
                  <path d="M164,95 L192,157" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2 2" />
                </g>
              </svg>
              
              {/* Ring Labels Legend */}
              <div className="flex gap-3 justify-center mt-3 flex-wrap">
                <span className="text-[8px] flex items-center gap-1 font-bold text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2A7F7F]" /> STRENGTH
                </span>
                <span className="text-[8px] flex items-center gap-1 font-bold text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488]" /> MOBILITY
                </span>
                <span className="text-[8px] flex items-center gap-1 font-bold text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0f766e]" /> ENDURANCE
                </span>
                <span className="text-[8px] flex items-center gap-1 font-bold text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#86EFAC]" /> RECOVERY
                </span>
              </div>
            </div>

            {/* Checklist Markers */}
            <div className="lg:col-span-7 flex flex-col gap-2.5">
              {BODY_VISION_MARKERS.map((marker, idx) => (
                <button
                  key={idx}
                  onClick={() => toggleBodyMarker(idx)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-300 flex items-center gap-3 cursor-pointer ${
                    bodyMarkers[idx]
                      ? "bg-[#2A7F7F]/5 border-[#2A7F7F]/30 shadow-[0_4px_20px_rgba(42,127,127,0.02)]"
                      : "bg-white/50 border-black/[0.03] hover:border-black/[0.08]"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-lg border flex items-center justify-center flex-shrink-0 transition-all ${
                    bodyMarkers[idx]
                      ? "bg-[#2A7F7F] border-[#2A7F7F] text-white"
                      : "border-slate-300 bg-white"
                  }`}>
                    {bodyMarkers[idx] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-xs font-light leading-snug ${bodyMarkers[idx] ? "text-slate-900 font-normal" : "text-slate-600"}`}>
                      {marker.label}
                    </p>
                  </div>
                  <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    marker.cat === "strength" 
                      ? "bg-teal-50 text-teal-800 border border-teal-100" 
                      : marker.cat === "mobility"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-100"
                      : marker.cat === "endurance"
                      ? "bg-cyan-50 text-cyan-800 border border-cyan-100"
                      : "bg-green-50 text-green-800 border border-green-100"
                  }`}>
                    {marker.cat}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Arrival Line Footer */}
          <div className="mt-8 pt-6 border-t border-black/[0.03] text-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block mb-2">Arrival Line</span>
            <p className="text-xs sm:text-sm text-[#2A7F7F] font-semibold italic max-w-xl mx-auto leading-relaxed">
              "A lean, strong, supple, durable body that does whatever my life asks — built at home, naturally, and kept for life."
            </p>
          </div>
        </motion.div>

        {/* ==================== THE FIRST PRINCIPLES DECK ==================== */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#2A7F7F]">
              Movement First Principles
            </h3>
            <span className="text-[9px] text-slate-400 font-light hidden sm:inline">
              Swipe horizontal to explore
            </span>
          </div>

          {/* Horizontal scroll container on mobile, wraps nicely on desktop */}
          <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory pb-4 scrollbar-thin scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 md:grid-cols-4 md:overflow-x-visible">
            {BODY_PRINCIPLES.map((p, idx) => (
              <div
                key={p.number}
                className="snap-center shrink-0 w-[260px] sm:w-auto glassmorphic rounded-2xl p-5 flex flex-col justify-between min-h-[170px] border-black/[0.03] hover:border-[#2A7F7F]/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div>
                  <span className="text-[9px] font-bold text-[#2A7F7F] bg-[#2A7F7F]/5 px-2 py-0.5 rounded border border-[#2A7F7F]/10">
                    0{p.number}
                  </span>
                  <h4 className="text-xs font-semibold text-slate-900 mt-3">{p.title}</h4>
                  <p className="text-[9px] text-[#2A7F7F] font-medium tracking-wide uppercase mt-0.5">
                    {p.subtitle}
                  </p>
                </div>
                <p className="text-[10px] text-slate-500 font-light leading-relaxed mt-4">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ==================== INTERACTIVE MORNING SESSION FLOW ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mb-12">
          
          {/* Left Panel: Step Selector (Session Player) */}
          <div className="md:col-span-7 flex flex-col gap-4">
            <div className="glassmorphic rounded-3xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-semibold text-slate-900 flex items-center gap-1.5">
                    Morning Flow Player
                    <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                  </h3>
                  <p className="text-[10px] text-slate-400 font-light">
                    Click each step to load targeted joint indicators and regressions.
                  </p>
                </div>

                {/* Completion counter */}
                <span className="text-[10px] text-slate-500 bg-white/60 border border-black/[0.03] px-2.5 py-1 rounded-full font-medium">
                  {completedSteps.length} / {MORNING_SESSION_FLOW.length} Completed
                </span>
              </div>

              {/* Steps Selection List */}
              <div className="flex flex-col gap-3">
                {MORNING_SESSION_FLOW.map((step) => {
                  const isActive = activeStepId === step.id;
                  const isCompleted = completedSteps.includes(step.id);
                  return (
                    <div
                      key={step.id}
                      onClick={() => setActiveStepId(step.id)}
                      className={`group p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                        isActive 
                          ? "bg-[#2A7F7F]/5 border-[#2A7F7F]/30 shadow-[0_4px_20px_rgba(42,127,127,0.02)]" 
                          : "bg-white/40 border-black/[0.02] hover:bg-white/70"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Circle Indicator */}
                        <div 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStepCompleted(step.id);
                          }}
                          className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                            isCompleted 
                              ? "bg-emerald-500 border-emerald-600 text-white" 
                              : "border-slate-300 group-hover:border-[#2A7F7F] bg-white"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                          ) : (
                            <span className="text-[9px] font-bold text-slate-400 group-hover:text-[#2A7F7F]">
                              {step.partNumber}
                            </span>
                          )}
                        </div>

                        <div>
                          <h4 className={`text-xs font-semibold tracking-wide transition-colors ${
                            isActive ? "text-slate-950 font-bold" : "text-slate-700"
                          }`}>
                            {step.partTitle}
                          </h4>
                          <span className="text-[9px] text-slate-400 font-light">
                            {step.duration} • {step.exercises.length} movements
                          </span>
                        </div>
                      </div>

                      <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                        isActive ? "text-[#2A7F7F] translate-x-1" : "text-slate-300 group-hover:text-slate-400"
                      }`} />
                    </div>
                  );
                })}
              </div>

              {/* Reset session button */}
              {completedSteps.length > 0 && (
                <button
                  onClick={() => setCompletedSteps([])}
                  className="mt-6 text-[9px] uppercase tracking-widest text-[#2A7F7F] font-bold inline-flex items-center gap-1 hover:opacity-80 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  Reset Session Flow
                </button>
              )}
            </div>
          </div>

          {/* Right Panel: Anatomy Graphic & Detailed Exercise Box */}
          <div className="md:col-span-5 flex flex-col gap-6">
            
            {/* SVG Anatomy Visualizer */}
            <div className="glassmorphic rounded-3xl p-6 flex flex-col items-center justify-center min-h-[220px] relative overflow-hidden">
              <span className="absolute top-4 left-6 text-[9px] font-bold uppercase tracking-widest text-slate-400">
                Kinetic Target Map
              </span>
              
              {/* Inline SVG Human Figure representing active kinetic points */}
              <svg 
                viewBox="0 0 100 160" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-28 h-40 filter drop-shadow-[0_2px_8px_rgba(42,127,127,0.05)] mt-4"
              >
                {/* Background Grid */}
                <line x1="50" y1="0" x2="50" y2="160" stroke="#000" strokeOpacity="0.02" strokeWidth="0.5" />
                <line x1="0" y1="80" x2="100" y2="80" stroke="#000" strokeOpacity="0.02" strokeWidth="0.5" />

                {/* Abstract Spine Lines */}
                <path d="M50,25 Q50,75 50,110" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
                
                {/* Dynamic Spine Curve highlights based on step */}
                {activeStepId === "joints" && (
                  <path d="M50,25 Q48,75 50,110" stroke="#2A7F7F" strokeWidth="2" strokeLinecap="round" opacity="0.8" className="animate-pulse" />
                )}
                {activeStepId === "open" && (
                  <path d="M50,25 Q53,75 50,110" stroke="#2A7F7F" strokeWidth="2.5" strokeLinecap="round" className="animate-pulse" />
                )}

                {/* Human Figure Wireframe */}
                {/* Head */}
                <circle cx="50" cy="20" r="8" stroke="#cbd5e1" strokeWidth="1.5" />
                {/* Arms */}
                <path d="M50,30 L25,45 M50,30 L75,45" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
                {/* Hips to Legs */}
                <path d="M50,110 L35,150 M50,110 L65,150" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
                
                {/* Joints glows depending on active step */}
                
                {/* Neck Indicator (Joints, Open) */}
                <circle 
                  cx="50" 
                  cy="28" 
                  r="3.5" 
                  fill={activeStepId === "joints" ? "#2A7F7F" : "#cbd5e1"} 
                  className={activeStepId === "joints" ? "animate-pulse" : ""}
                  opacity={activeStepId === "joints" ? "1" : "0.5"}
                />

                {/* Shoulder Indicators (Joints, Open, Strength) */}
                <circle 
                  cx="35" 
                  cy="35" 
                  r="3.5" 
                  fill={(activeStepId === "joints" || activeStepId === "strength") ? "#2A7F7F" : "#cbd5e1"} 
                  opacity={(activeStepId === "joints" || activeStepId === "strength") ? "1" : "0.5"}
                />
                <circle 
                  cx="65" 
                  cy="35" 
                  r="3.5" 
                  fill={(activeStepId === "joints" || activeStepId === "strength") ? "#2A7F7F" : "#cbd5e1"} 
                  opacity={(activeStepId === "joints" || activeStepId === "strength") ? "1" : "0.5"}
                />

                {/* Spine & Core (Open, Strength) */}
                <circle 
                  cx="50" 
                  cy="70" 
                  r="4" 
                  fill={(activeStepId === "open" || activeStepId === "strength") ? "#2A7F7F" : "#cbd5e1"} 
                  opacity={(activeStepId === "open" || activeStepId === "strength") ? "1" : "0.5"}
                />

                {/* Hip Joint Nodes (Joints, Open, Strength) */}
                <circle 
                  cx="43" 
                  cy="110" 
                  r="3.5" 
                  fill={(activeStepId === "joints" || activeStepId === "open" || activeStepId === "strength") ? "#2A7F7F" : "#cbd5e1"} 
                  opacity={(activeStepId === "joints" || activeStepId === "open" || activeStepId === "strength") ? "1" : "0.5"}
                />
                <circle 
                  cx="57" 
                  cy="110" 
                  r="3.5" 
                  fill={(activeStepId === "joints" || activeStepId === "open" || activeStepId === "strength") ? "#2A7F7F" : "#cbd5e1"} 
                  opacity={(activeStepId === "joints" || activeStepId === "open" || activeStepId === "strength") ? "1" : "0.5"}
                />

                {/* Knee / Ankles (Joints, Finisher) */}
                <circle 
                  cx="38" 
                  cy="130" 
                  r="3.5" 
                  fill={(activeStepId === "joints" || activeStepId === "finisher") ? "#2A7F7F" : "#cbd5e1"} 
                  opacity={(activeStepId === "joints" || activeStepId === "finisher") ? "1" : "0.5"}
                />
                <circle 
                  cx="62" 
                  cy="130" 
                  r="3.5" 
                  fill={(activeStepId === "joints" || activeStepId === "finisher") ? "#2A7F7F" : "#cbd5e1"} 
                  opacity={(activeStepId === "joints" || activeStepId === "finisher") ? "1" : "0.5"}
                />

                {/* Feet / Calves (Finisher) */}
                <circle 
                  cx="35" 
                  cy="150" 
                  r="4.5" 
                  fill={activeStepId === "finisher" ? "#2A7F7F" : "#cbd5e1"} 
                  opacity={activeStepId === "finisher" ? "1" : "0.5"}
                  className={activeStepId === "finisher" ? "animate-pulse" : ""}
                />
                <circle 
                  cx="65" 
                  cy="150" 
                  r="4.5" 
                  fill={activeStepId === "finisher" ? "#2A7F7F" : "#cbd5e1"} 
                  opacity={activeStepId === "finisher" ? "1" : "0.5"}
                  className={activeStepId === "finisher" ? "animate-pulse" : ""}
                />
              </svg>

              {/* Active Targeted Joints List */}
              <div className="flex flex-wrap justify-center gap-1.5 mt-4">
                {activeStep.focusJoints.map((j, i) => (
                  <span 
                    key={i} 
                    className="text-[8px] font-bold uppercase tracking-wider text-[#2A7F7F] bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-2 py-0.5 rounded"
                  >
                    {j}
                  </span>
                ))}
              </div>
            </div>

            {/* Step Breakdown Card */}
            <div className="glassmorphic rounded-3xl p-6">
              <h4 className="text-[9px] font-bold uppercase tracking-widest text-[#2A7F7F] mb-1">
                Active Step Protocol
              </h4>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">
                {activeStep.partTitle}
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-500 font-light leading-relaxed mb-4">
                {activeStep.description}
              </p>

              <div className="border-t border-black/[0.03] pt-4 flex flex-col gap-3">
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                  Target Movements
                </span>
                
                <div className="flex flex-col gap-2.5 max-h-[220px] overflow-y-auto pr-1">
                  {activeStep.exercises.map((ex, idx) => (
                    <div key={idx} className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-bold text-slate-800 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-[#2A7F7F]" />
                        {ex.name}
                      </span>
                      <span className="text-[10px] text-slate-500 font-light leading-snug">
                        {ex.details}
                      </span>
                      <span className="text-[9px] text-[#2A7F7F] font-medium leading-none italic mt-0.5">
                        Regression: {ex.regression}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ==================== ANCIENT SIMPLE TOOLS SECTION ==================== */}
        <div className="glassmorphic rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-[#2A7F7F]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="mb-8">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 flex items-center gap-1.5">
              Ancient Simple Tools
              <Dumbbell className="w-4 h-4 text-[#2A7F7F]" />
            </h3>
            <p className="text-[10px] sm:text-xs text-slate-400 font-light mt-0.5">
              Swinging and hanging. Tools that prioritize joint decompression and rotational athletic power.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ANCIENT_TOOLS.map((tool, idx) => (
              <div 
                key={idx} 
                className="bg-white/40 border border-black/[0.02] hover:border-[#2A7F7F]/20 rounded-2xl p-5 flex flex-col justify-between group transition-all duration-300"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#2A7F7F] transition-colors">
                        {tool.name}
                      </h4>
                      {tool.nativeName && (
                        <span className="text-[8px] uppercase tracking-widest text-[#2A7F7F] font-bold">
                          {tool.nativeName}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 font-light leading-relaxed mb-6">
                    {tool.description}
                  </p>
                </div>

                <div className="border-t border-black/[0.03] pt-4">
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                    Key Adaptations
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {tool.benefits.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#2A7F7F]" />
                        <span className="text-[9px] text-slate-700 font-light">{b}</span>
                      </div>
                    ))}
                  </div>
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
