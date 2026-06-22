"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Activity, 
  Check, 
  Plus, 
  Droplet, 
  BookOpen, 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  Trash2,
  Compass,
  Apple,
  BrainCircuit,
  Sparkle
} from "lucide-react";
import { NavTab } from "./Navbar";

interface DashboardProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
}

// Interfaces for local state persistence
interface JournalEntry {
  id: string;
  time: string;
  text: string;
  clarity: number;
}

interface ChecklistItem {
  id: string;
  task: string;
  time: string;
  checked: boolean;
  category: "home" | "nutrition" | "movement" | "thinking";
}

export default function Dashboard({ activeTab, setActiveTab }: DashboardProps) {
  // Global states
  const [hydration, setHydration] = useState(750); // ml
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [journalInput, setJournalInput] = useState("");
  const [mentalClarity, setMentalClarity] = useState(8); // 1-10 slider
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: "1", task: "Sunrise exposure & light hydration", time: "07:00", checked: true, category: "home" },
    { id: "2", task: "90-minute Deep Focus Block (No notifications)", time: "09:00", checked: false, category: "thinking" },
    { id: "3", task: "Fermented prebiotic protocol (Kefir/Kimchi)", time: "12:00", checked: false, category: "nutrition" },
    { id: "4", task: "Morning Flow (10 min) + 30-min easy walk + 10 min sunlight", time: "16:00", checked: false, category: "movement" },
    { id: "5", task: "Digital blackout & evening decompression", time: "22:00", checked: false, category: "home" },
  ]);

  // Checklist items creation state
  const [newChecklistText, setNewChecklistText] = useState("");
  const [newChecklistCategory, setNewChecklistCategory] = useState<"home" | "nutrition" | "movement" | "thinking">("home");

  // Timer states (Thinking)
  const [timeLeft, setTimeLeft] = useState(1500); // 25 min in seconds
  const [timerRunning, setTimerRunning] = useState(false);

  // Breathing Visualizer State (Movement)
  const [breathingPhase, setBreathingPhase] = useState<"In" | "Hold" | "Out" | "Pause">("In");
  const [breathingText, setBreathingText] = useState("Breathe In");

  // Visionary Goals Deck state
  const [activeGoalIndex, setActiveGoalIndex] = useState(0);
  const visionaryGoals = [
    {
      title: "Establish Local AI Systems",
      timeline: "5-Year Horizon",
      description: "Build robust, self-hosted machine intelligence networks designed for cognitive amplification, strictly preserving privacy and deep creative control.",
      focus: "Technical Architecture & System Integrity",
    },
    {
      title: "Optimize Kinetic Longevity",
      timeline: "3-Year Horizon",
      description: "Re-engineer daily protocols to achieve maximal physical capacity. Leverage precise biomarker tracking, Zone 2 threshold training, and ancestral biome mechanics.",
      focus: "Mitochondrial Density & Structural Grace",
    },
    {
      title: "Deep Creative Mastery",
      timeline: "1-Year Horizon",
      description: "Produce structural design systems and premium interfaces that eliminate superficial digital clutter. Achieve Steve Jobs-level execution in minimal aesthetics.",
      focus: "Visual Architecture & Typographical Poetry",
    },
  ];

  // Visionary Quotes state
  const quotes = [
    { text: "Design is not just what it looks like and feels like. Design is how it works.", author: "Steve Jobs" },
    { text: "The happiness of your life depends upon the quality of your thoughts.", author: "Marcus Aurelius" },
    { text: "If you want to make the limit of your possibilities, seek out the hard paths.", author: "Clear Mind" },
    { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" }
  ];
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Hydration state sync with localStorage
  useEffect(() => {
    const savedHydration = localStorage.getItem("trelis_hydration");
    if (savedHydration) setHydration(parseInt(savedHydration, 10));

    const savedJournal = localStorage.getItem("trelis_journal");
    if (savedJournal) setJournalEntries(JSON.parse(savedJournal));

    const savedChecklist = localStorage.getItem("trelis_checklist");
    if (savedChecklist) setChecklist(JSON.parse(savedChecklist));
  }, []);

  // Sync hydration changes
  const changeHydration = (amount: number) => {
    const newVal = Math.max(0, hydration + amount);
    setHydration(newVal);
    localStorage.setItem("trelis_hydration", newVal.toString());
  };

  // Sync checklist toggle
  const toggleChecklist = (id: string) => {
    const updated = checklist.map((item) => 
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setChecklist(updated);
    localStorage.setItem("trelis_checklist", JSON.stringify(updated));
  };

  // Sync checklist add
  const addChecklistItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChecklistText.trim()) return;
    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      task: newChecklistText,
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: false }),
      checked: false,
      category: newChecklistCategory,
    };
    const updated = [...checklist, newItem];
    setChecklist(updated);
    setNewChecklistText("");
    localStorage.setItem("trelis_checklist", JSON.stringify(updated));
  };

  // Sync checklist delete
  const deleteChecklistItem = (id: string) => {
    const updated = checklist.filter((item) => item.id !== id);
    setChecklist(updated);
    localStorage.setItem("trelis_checklist", JSON.stringify(updated));
  };

  // Sync journal submission
  const addJournalEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalInput.trim()) return;
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
      text: journalInput,
      clarity: mentalClarity,
    };
    const updated = [newEntry, ...journalEntries];
    setJournalEntries(updated);
    setJournalInput("");
    localStorage.setItem("trelis_journal", JSON.stringify(updated));
  };

  // Sync journal delete
  const deleteJournalEntry = (id: string) => {
    const updated = journalEntries.filter((entry) => entry.id !== id);
    setJournalEntries(updated);
    localStorage.setItem("trelis_journal", JSON.stringify(updated));
  };

  // Timer Effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(timer);
  }, [timerRunning, timeLeft]);

  // Format Timer
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Breathing loop simulation
  useEffect(() => {
    const phases = [
      { text: "Breathe In", duration: 4000, next: "Hold" },
      { text: "Hold Breath", duration: 4000, next: "Out" },
      { text: "Breathe Out", duration: 4000, next: "Pause" },
      { text: "Hold Empty", duration: 4000, next: "In" },
    ];

    let currentPhaseIdx = 0;
    let timer: NodeJS.Timeout;

    const runBreathing = () => {
      const phase = phases[currentPhaseIdx];
      setBreathingText(phase.text);
      setBreathingPhase(phase.next === "Hold" ? "In" : phase.next === "Out" ? "Hold" : phase.next === "Pause" ? "Out" : "Pause");
      
      timer = setTimeout(() => {
        currentPhaseIdx = (currentPhaseIdx + 1) % phases.length;
        runBreathing();
      }, phase.duration);
    };

    runBreathing();
    return () => clearTimeout(timer);
  }, []);

  const totalChecklistItems = checklist.length;
  const completedChecklistItems = checklist.filter((item) => item.checked).length;
  const systemOptimalPercent = totalChecklistItems > 0 
    ? Math.round((completedChecklistItems / totalChecklistItems) * 100) 
    : 100;

  return (
    <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 pb-28 md:pb-12 select-none">
      {/* Top Greeting & State Summary Panel */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4"
      >
        <div>
          <h2 className="text-xl sm:text-2xl font-light text-slate-800 tracking-tight flex items-center gap-1.5">
            Good morning, <span className="font-semibold text-slate-950">Visionary</span>
            <Sparkles className="w-5 h-5 text-[#2A7F7F] animate-pulse" />
          </h2>
          <p className="text-[10px] sm:text-xs text-slate-400 font-light mt-1 tracking-wider uppercase">
            Human OS Status is optimal. Weekly integrity is clear.
          </p>
        </div>

        {/* System Load / Score Bubble */}
        <div className="flex items-center gap-4 bg-white/40 border border-black/[0.03] backdrop-blur-md px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] w-full sm:w-auto">
          <div className="relative w-10 h-10 flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="20"
                cy="20"
                r="16"
                className="stroke-slate-200"
                strokeWidth="2.5"
                fill="transparent"
              />
              <motion.circle
                cx="20"
                cy="20"
                r="16"
                className="stroke-brand-teal"
                strokeWidth="2.5"
                fill="transparent"
                strokeDasharray={100}
                initial={{ strokeDashoffset: 100 }}
                animate={{ strokeDashoffset: 100 - systemOptimalPercent }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </svg>
            <span className="absolute text-[10px] font-bold tabular-nums text-slate-800">
              {systemOptimalPercent}%
            </span>
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-900">Life OS Integrity</div>
            <div className="text-[10px] font-medium text-slate-400 uppercase mt-0.5 tracking-widest">
              {systemOptimalPercent > 80 ? "Steady / This week's rhythm" : "Calibration Required"}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          {/* ==================== HOME OS TAB ==================== */}
          {activeTab === "home-os" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Daily Protocol Checklist */}
              <div className="md:col-span-2 flex flex-col gap-6">
                <div className="glassmorphic rounded-3xl p-5 sm:p-6 md:p-8">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-slate-900 flex items-center gap-1.5">
                        Daily Protocol
                        <Sparkle className="w-3.5 h-3.5 text-[#2A7F7F]/75" />
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-400 font-light mt-0.5">Incremental compounding of habits.</p>
                    </div>
                    <span className="text-[10px] sm:text-xs font-mono font-medium text-[#2A7F7F] bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-2.5 py-1 rounded-md">
                      {completedChecklistItems}/{totalChecklistItems} Done
                    </span>
                  </div>

                  {/* Checklist Items */}
                  <div className="flex flex-col gap-3">
                    {checklist.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 min-h-[48px] ${
                          item.checked 
                            ? "bg-slate-900/[0.01] border-black/[0.02] text-slate-400" 
                            : "bg-white/50 border-black/[0.03] text-slate-800 hover:border-black/[0.08]"
                        }`}
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <button
                            onClick={() => toggleChecklist(item.id)}
                            style={{ minWidth: "24px", minHeight: "24px" }}
                            className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer flex-shrink-0 ${
                              item.checked
                                ? "bg-[#2A7F7F] border-[#2A7F7F] text-white"
                                : "border-slate-300 hover:border-[#2A7F7F] bg-transparent text-transparent"
                            }`}
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </button>
                          <div className="flex flex-col">
                            <span className={`text-xs font-normal leading-relaxed ${item.checked ? "line-through opacity-60" : ""}`}>
                              {item.task}
                            </span>
                            <span className="text-[9px] tracking-wide uppercase font-light text-slate-400 mt-0.5">
                              {item.category} • {item.time}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => deleteChecklistItem(item.id)}
                          className="text-slate-300 hover:text-red-500 transition-colors p-2 cursor-pointer flex-shrink-0"
                          style={{ minWidth: "44px", minHeight: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  {/* Add New Protocol */}
                  <form onSubmit={addChecklistItem} className="mt-6 flex flex-col gap-3">
                    <input
                      type="text"
                      value={newChecklistText}
                      onChange={(e) => setNewChecklistText(e.target.value)}
                      placeholder="Add system protocol..."
                      className="w-full bg-white/40 border border-black/[0.04] rounded-2xl px-4 h-11 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2A7F7F] transition-colors"
                    />
                    <div className="flex gap-2 w-full">
                      <select
                        value={newChecklistCategory}
                        onChange={(e) => setNewChecklistCategory(e.target.value as any)}
                        className="flex-1 bg-white/40 border border-black/[0.04] rounded-2xl px-3 h-11 text-xs text-slate-600 focus:outline-none cursor-pointer"
                      >
                        <option value="home">Home</option>
                        <option value="nutrition">Nutrition</option>
                        <option value="movement">Movement</option>
                        <option value="thinking">Thinking</option>
                      </select>
                      <button
                        type="submit"
                        className="bg-[#2A7F7F] text-white rounded-2xl px-6 h-11 text-xs font-medium tracking-wide flex items-center justify-center gap-1.5 hover:bg-[#1e5c5c] transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Sidebar Quick Stats */}
              <div className="flex flex-col gap-6">
                {/* Arc Priority Card */}
                <div className="glassmorphic rounded-3xl p-5 sm:p-6 flex flex-col justify-between min-h-[160px] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#2A7F7F]/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] tracking-widest text-[#2A7F7F] font-semibold uppercase bg-[#2A7F7F]/5 px-2 py-0.5 rounded-md border border-[#2A7F7F]/10">
                      Weekly Focus
                    </span>
                    <Activity className="w-4 h-4 text-slate-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-950">Gut & calm baseline</h4>
                    <p className="text-xs text-slate-500 font-light mt-1.5 leading-relaxed">
                      Optimizing deep focus blocks and gut integrity to fuel metabolic baseline prior to the upcoming launch.
                    </p>
                  </div>
                </div>

                {/* Micro Hydration Shortcut */}
                <div className="glassmorphic rounded-3xl p-5 sm:p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400">Hydration</h4>
                    <span className="text-xs font-semibold text-slate-800">{hydration} ml</span>
                  </div>
                  <div className="w-full bg-slate-950/5 h-2 rounded-full overflow-hidden mb-4">
                    <motion.div 
                      className="bg-[#2A7F7F] h-full rounded-full"
                      animate={{ width: `${Math.min(100, (hydration / 2500) * 100)}%` }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => changeHydration(250)}
                      className="flex-1 bg-white border border-black/[0.04] h-11 rounded-xl text-[10px] font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      +250ml
                    </button>
                    <button
                      onClick={() => changeHydration(500)}
                      className="flex-1 bg-[#2A7F7F] h-11 rounded-xl text-[10px] font-semibold text-white hover:bg-[#1e5c5c] transition-colors cursor-pointer"
                    >
                      +500ml
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== NUTRITION TAB ==================== */}
          {activeTab === "nutrition" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Gut health log & hydration wave */}
              <div className="md:col-span-2 flex flex-col gap-6">
                <div className="glassmorphic rounded-3xl p-5 sm:p-6 md:p-8">
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-2 flex items-center gap-1.5">
                    Gut-Brain Protocol
                    <Sparkle className="w-3.5 h-3.5 text-[#2A7F7F]/75" />
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-400 font-light mb-6">Track cellular nutrition and microbiome stability.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Hydration Interactive Card */}
                    <div className="bg-white/40 border border-black/[0.03] rounded-2xl p-5 flex flex-col justify-between min-h-[220px] relative overflow-hidden">
                      {/* Animated Water Wave in Brand Teal */}
                      <div className="absolute inset-x-0 bottom-0 top-1/2 pointer-events-none opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <motion.path
                            d="M0,50 C30,40 70,60 100,50 L100,100 L0,100 Z"
                            fill="#2A7F7F"
                            animate={{
                              d: [
                                "M0,50 C30,40 70,60 100,50 L100,100 L0,100 Z",
                                "M0,50 C30,60 70,40 100,50 L100,100 L0,100 Z",
                                "M0,50 C30,40 70,60 100,50 L100,100 L0,100 Z"
                              ]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          />
                        </svg>
                      </div>

                      <div className="flex justify-between items-start z-10">
                        <Droplet className="w-5 h-5 text-[#2A7F7F]" />
                        <span className="text-xs font-semibold text-slate-800">Target: 2.5L</span>
                      </div>
                      
                      <div className="z-10 mt-4">
                        <span className="text-2xl font-bold text-slate-900 tabular-nums">
                          {(hydration / 1000).toFixed(2)}
                        </span>
                        <span className="text-xs text-slate-500 ml-1">Ltrs</span>
                        <p className="text-[10px] text-slate-400 mt-1 font-light">
                          {hydration >= 2500 ? "Hydration threshold optimized" : `${2500 - hydration}ml remaining`}
                        </p>
                      </div>

                      <div className="flex gap-2 mt-6 z-10">
                        <button
                          onClick={() => changeHydration(250)}
                          className="flex-1 bg-white border border-black/[0.04] h-11 rounded-xl text-[10px] font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          +250ml
                        </button>
                        <button
                          onClick={() => changeHydration(500)}
                          className="flex-1 bg-white border border-black/[0.04] h-11 rounded-xl text-[10px] font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          +500ml
                        </button>
                      </div>
                    </div>

                    {/* Cellular Protocols */}
                    <div className="bg-white/40 border border-black/[0.03] rounded-2xl p-5 flex flex-col justify-between">
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#2A7F7F] mb-3">Cellular Protocols</h4>
                        <div className="flex flex-col gap-2">
                          {[
                            "14-Hour Fast Baseline",
                            "Fermented Foods Target (2x)",
                            "30g Dietary Fiber",
                            "No Screen/Eating Cross",
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#2A7F7F]" />
                              <span className="text-xs font-light text-slate-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-black/[0.03] text-[10px] text-slate-400 leading-relaxed font-light">
                        Consistent microbiome composition increases emotional resiliency and mental focus.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gut Mind Superfoods */}
              <div className="flex flex-col gap-6">
                <div className="glassmorphic rounded-3xl p-5 sm:p-6">
                  <h4 className="text-[10px] font-semibold uppercase tracking-widest text-[#2A7F7F] mb-4">Gut-Mind Superfoods</h4>
                  <div className="flex flex-col gap-3">
                    {[
                      { name: "Kefir & Kombucha", desc: "Live prebiotics for serotonin generation." },
                      { name: "Wild Blueberries", desc: "Anthocyanin content acts as cognitive shield." },
                      { name: "Kimchi & Kraut", desc: "Diversifies gut biota; decreases systemic swell." },
                      { name: "Spiced Veg Kanji", desc: "Wild-fermented prebiotic drink rich in lactic acid bacteria." },
                    ].map((food, idx) => (
                      <div key={idx} className="p-3 bg-white/40 rounded-xl border border-black/[0.02] hover:border-black/[0.06] transition-colors">
                        <div className="text-xs font-semibold text-slate-900">{food.name}</div>
                        <div className="text-[10px] text-slate-500 font-light mt-0.5">{food.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== MOVEMENT TAB ==================== */}
          {activeTab === "movement" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Breathing exercise and mobility details */}
              <div className="md:col-span-2 flex flex-col gap-6">
                <div className="glassmorphic rounded-3xl p-5 sm:p-6 md:p-8 flex flex-col items-center text-center">
                  <div className="mb-4">
                    <h3 className="text-sm sm:text-base font-semibold text-slate-900 flex items-center justify-center gap-1.5">
                      Breath & Posture Reset
                      <Sparkles className="w-4 h-4 text-[#2A7F7F] animate-spin" style={{ animationDuration: '8s' }} />
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-400 font-light mt-0.5">Calibrate nervous system via box breathing.</p>
                  </div>

                  {/* Circular Breathing Visualizer in Brand Teal */}
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center my-6">
                    <motion.div
                      animate={breathingPhase === "In" ? {
                        scale: [1, 1.4],
                        opacity: [0.1, 0.45],
                        transition: { duration: 4, ease: "easeInOut" }
                      } : breathingPhase === "Hold" ? {
                        scale: 1.4,
                        opacity: 0.45,
                        transition: { duration: 4 }
                      } : breathingPhase === "Out" ? {
                        scale: [1.4, 1],
                        opacity: [0.45, 0.1],
                        transition: { duration: 4, ease: "easeInOut" }
                      } : {
                        scale: 1,
                        opacity: 0.1,
                        transition: { duration: 4 }
                      }}
                      className="absolute inset-0 bg-gradient-to-tr from-[#2A7F7F]/30 to-emerald-400/10 rounded-full blur-xl pointer-events-none"
                    />

                    <motion.div
                      animate={breathingPhase === "In" ? {
                        scale: 1.35,
                        borderColor: "rgba(42, 127, 127, 0.45)",
                        transition: { duration: 4, ease: "easeInOut" }
                      } : breathingPhase === "Hold" ? {
                        scale: 1.35,
                        borderColor: "rgba(42, 127, 127, 0.45)",
                      } : breathingPhase === "Out" ? {
                        scale: 1.0,
                        borderColor: "rgba(42, 127, 127, 0.1)",
                        transition: { duration: 4, ease: "easeInOut" }
                      } : {
                        scale: 1.0,
                        borderColor: "rgba(42, 127, 127, 0.1)",
                      }}
                      className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-[#2A7F7F]/10 flex flex-col items-center justify-center z-10 transition-colors"
                    >
                      <span className="text-xs font-semibold text-slate-800 tracking-wider">
                        {breathingText}
                      </span>
                      <span className="text-[9px] text-slate-400 uppercase font-light mt-1">
                        4s intervals
                      </span>
                    </motion.div>
                  </div>

                  <p className="text-xs text-slate-500 font-light max-w-sm leading-relaxed mb-4">
                    Inhale through nose (belly expand). Hold. Exhale through mouth. Rest on empty. Compounded box breathing recalibrates heart rate variability.
                  </p>
                </div>
              </div>

              {/* Kinetic training protocols */}
              <div className="flex flex-col gap-6">
                <div className="glassmorphic rounded-3xl p-5 sm:p-6">
                  <h4 className="text-[10px] font-semibold uppercase tracking-widest text-[#2A7F7F] mb-4">Kinetic Protocols</h4>
                  <div className="flex flex-col gap-4">
                    {[
                      { title: "Morning Flow (10 min)", desc: "10 min gentle joint mobilization and breathing calibration." },
                      { title: "Easy Outdoor Walk", desc: "30-min low-intensity steady pace in a natural setting." },
                      { title: "Sunlight Capture", desc: "10 min direct skin & eye exposure (sunrise/early morning)." },
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 bg-white/40 rounded-2xl border border-black/[0.02]">
                        <div className="text-xs font-semibold text-slate-900">{item.title}</div>
                        <div className="text-[10px] text-slate-500 font-light mt-1 leading-relaxed">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== THINKING TAB ==================== */}
          {activeTab === "thinking" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Focus Block Timer */}
              <div className="glassmorphic rounded-3xl p-5 sm:p-6 md:p-8 flex flex-col items-center justify-between min-h-[360px]">
                <div className="w-full text-center">
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 flex items-center justify-center gap-1.5">
                    Deep Focus Block
                    <Sparkle className="w-3.5 h-3.5 text-[#2A7F7F]/75" />
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-400 font-light mt-0.5">Uninterrupted, quiet time.</p>
                </div>

                {/* Luxury Dial Style Timer in Brand Teal */}
                <div className="relative w-44 h-44 flex items-center justify-center my-6">
                  <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 176 176">
                    <circle
                      cx="88"
                      cy="88"
                      r="76"
                      className="stroke-[#2A7F7F]/10"
                      strokeWidth="2"
                      fill="transparent"
                    />
                    <motion.circle
                      cx="88"
                      cy="88"
                      r="76"
                      className="stroke-[#2A7F7F]"
                      strokeWidth="2.5"
                      fill="transparent"
                      strokeDasharray={477.5}
                      animate={{ strokeDashoffset: 477.5 - (timeLeft / 1500) * 477.5 }}
                      transition={{ duration: 0.5, ease: "linear" }}
                    />
                  </svg>

                  <div className="flex flex-col items-center justify-center z-10 select-none">
                    <span className="text-3xl font-bold tracking-tight text-slate-900 tabular-nums">
                      {formatTime(timeLeft)}
                    </span>
                    <span className="text-[9px] tracking-widest text-[#2A7F7F] uppercase font-semibold mt-1">
                      {timerRunning ? "Active Block" : "Calm Grid"}
                    </span>
                  </div>
                </div>

                {/* Control Actions (Touch target 44px+) */}
                <div className="flex gap-3 w-full">
                  <button
                    onClick={() => setTimerRunning(!timerRunning)}
                    className="flex-1 bg-[#2A7F7F] text-white rounded-2xl h-11 sm:h-12 text-xs font-semibold tracking-wider flex items-center justify-center gap-2 hover:bg-[#1e5c5c] transition-colors cursor-pointer"
                  >
                    {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                    {timerRunning ? "Pause" : "Initiate"}
                  </button>
                  <button
                    onClick={() => {
                      setTimerRunning(false);
                      setTimeLeft(1500);
                    }}
                    className="bg-white border border-black/[0.04] text-slate-700 rounded-2xl px-5 h-11 sm:h-12 text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Fast Journal Console */}
              <div className="md:col-span-2 flex flex-col gap-6">
                <div className="glassmorphic rounded-3xl p-5 sm:p-6 md:p-8">
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
                    Clarity Console
                    <Sparkles className="w-4 h-4 text-[#2A7F7F]" />
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-400 font-light mb-6">Filter cognitive noise and write down core insights.</p>

                  <form onSubmit={addJournalEntry} className="flex flex-col gap-4">
                    <textarea
                      value={journalInput}
                      onChange={(e) => setJournalInput(e.target.value)}
                      placeholder="What is the primary truth or task of today?"
                      rows={3}
                      className="w-full bg-white/40 border border-black/[0.04] rounded-2xl p-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2A7F7F] transition-colors resize-none"
                    />

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      {/* Clarity Slider */}
                      <div className="flex items-center gap-3 w-full sm:w-auto h-11">
                        <span className="text-[10px] font-bold text-[#2A7F7F] uppercase tracking-widest">
                          Clarity: {mentalClarity}/10
                        </span>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={mentalClarity}
                          onChange={(e) => setMentalClarity(parseInt(e.target.value))}
                          className="flex-1 sm:w-32 accent-[#2A7F7F] bg-slate-200 h-1 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      <button
                        type="submit"
                        className="bg-[#2A7F7F] text-white rounded-2xl px-6 h-11 text-xs font-semibold tracking-wider flex items-center justify-center gap-2 hover:bg-[#1e5c5c] transition-colors self-end cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        Record Insight
                      </button>
                    </div>
                  </form>

                  {/* Journal Feed */}
                  <div className="mt-8 border-t border-black/[0.03] pt-6">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Historical Insights</h4>
                    {journalEntries.length === 0 ? (
                      <p className="text-xs text-slate-400 font-light italic">No recorded insights. The console is clear.</p>
                    ) : (
                      <div className="flex flex-col gap-3 max-h-[180px] overflow-y-auto pr-1">
                        {journalEntries.map((entry) => (
                          <div 
                            key={entry.id} 
                            className="p-4 bg-white/40 rounded-2xl border border-black/[0.02] flex justify-between items-start group"
                          >
                            <div className="flex-1 pr-4">
                              <p className="text-xs text-slate-800 leading-relaxed">{entry.text}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-[9px] font-medium text-slate-400 uppercase">{entry.time}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                                <span className="text-[9px] font-semibold text-[#2A7F7F] uppercase">Clarity Level: {entry.clarity}</span>
                              </div>
                            </div>
                            <button
                              onClick={() => deleteJournalEntry(entry.id)}
                              className="text-slate-300 hover:text-red-500 transition-colors p-2 cursor-pointer"
                              style={{ minWidth: "44px", minHeight: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== VISIONARY TAB ==================== */}
          {activeTab === "visionary" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Vision Card Deck */}
              <div className="md:col-span-2 flex flex-col gap-6">
                <div className="glassmorphic rounded-3xl p-5 sm:p-6 md:p-8 flex flex-col justify-between min-h-[380px] relative overflow-hidden">
                  <div className="absolute -bottom-8 -left-8 w-44 h-44 bg-[#2A7F7F]/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#2A7F7F] flex items-center gap-1.5">
                        Goal Manifestation Deck
                        <Sparkles className="w-3.5 h-3.5 text-[#2A7F7F]" />
                      </span>
                      <span className="text-xs font-semibold text-slate-700">
                        {activeGoalIndex + 1} / {visionaryGoals.length}
                      </span>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeGoalIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="py-2"
                      >
                        <span className="text-[10px] tracking-widest text-[#2A7F7F] font-bold uppercase bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-2.5 py-0.5 rounded-md">
                          {visionaryGoals[activeGoalIndex].timeline}
                        </span>
                        <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mt-4">
                          {visionaryGoals[activeGoalIndex].title}
                        </h3>
                        <p className="text-xs text-slate-600 font-light leading-relaxed mt-3 max-w-lg">
                          {visionaryGoals[activeGoalIndex].description}
                        </p>
                        <div className="mt-6 pt-4 border-t border-black/[0.03]">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                            Primary Focus Area
                          </span>
                          <p className="text-xs font-semibold text-slate-800 mt-1">
                            {visionaryGoals[activeGoalIndex].focus}
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="flex justify-between items-center mt-8">
                    <p className="text-[10px] text-slate-400 font-light leading-none">
                      Compounded protocols unlock visionary outcomes.
                    </p>
                    <button
                      onClick={() => setActiveGoalIndex((prev) => (prev + 1) % visionaryGoals.length)}
                      className="w-11 h-11 rounded-full bg-[#2A7F7F] flex items-center justify-center text-white hover:bg-[#1e5c5c] transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Quote Generator */}
              <div className="flex flex-col gap-6">
                <div className="glassmorphic rounded-3xl p-5 sm:p-6 flex flex-col justify-between min-h-[220px]">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-1">
                      Core Principles
                      <Sparkle className="w-3.5 h-3.5 text-[#2A7F7F]" />
                    </h4>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={quoteIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="py-1"
                      >
                        <p className="text-xs font-serif italic text-slate-800 leading-relaxed">
                          "{quotes[quoteIndex].text}"
                        </p>
                        <p className="text-[10px] text-slate-400 tracking-wider uppercase mt-3 font-semibold">
                          — {quotes[quoteIndex].author}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <button
                    onClick={() => setQuoteIndex((prev) => (prev + 1) % quotes.length)}
                    className="w-full text-center border border-[#2A7F7F]/10 bg-white h-11 rounded-2xl text-[10px] font-semibold text-[#2A7F7F] hover:bg-[#2A7F7F]/5 transition-colors cursor-pointer mt-4"
                  >
                    Reveal Principle
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
