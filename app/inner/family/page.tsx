"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wrench,
  Home,
  Database,
  CheckCircle,
  Clock,
  Layers,
  Check,
  ArrowLeft,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { HOME_LOGS, HomeLogItem } from "@/lib/home-data";

const HOME_VISION_MARKERS = [
  { label: "Handyman competencies achieved (the full ladder, safety line respected)", key: "handyman" },
  { label: "Home systems on rails (weekly reset, bills/utilities automatic, circadian lighting)", key: "systems" },
  { label: "Parents' gut-friendly meals dialed in; their routines supported", key: "parents" },
  { label: "Runway managed all 8 months; weekly cap held; entity admin clean", key: "runway" },
];

export default function InnerFamilyPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "handyman" | "kitchen" | "runway-admin">("all");
  const [homeMarkers, setHomeMarkers] = useState<boolean[]>(new Array(4).fill(false));

  const toggleHomeMarker = (index: number) => {
    setHomeMarkers((prev) => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  const filteredLogs = HOME_LOGS.filter((log) => {
    if (filter === "all") return true;
    return log.category === filter;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F2] relative overflow-hidden">
      {/* Ambient Soft Teal Glows */}
      <div className="absolute top-[15%] left-[-10%] w-[35vw] h-[35vw] bg-[#2A7F7F]/5 rounded-full blur-[135px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[40vw] h-[40vw] bg-[#2A7F7F]/4 rounded-full blur-[140px] pointer-events-none" />

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
      <div className="flex items-center gap-2 px-6 py-3 border-b border-black/[0.03] bg-white/20 select-none">
        <button
          className="text-[10px] uppercase tracking-wider font-bold px-4 py-2 rounded-lg bg-[#2A7F7F]/10 text-[#2A7F7F] border border-[#2A7F7F]/10 cursor-pointer"
        >
          Family & Home
        </button>
        <button
          onClick={() => router.push("/inner/visionary")}
          className="text-[10px] uppercase tracking-wider font-bold px-4 py-2 rounded-lg text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          Visionary
        </button>
        <button
          onClick={() => router.push("/inner/presentation")}
          className="text-[10px] uppercase tracking-wider font-bold px-4 py-2 rounded-lg text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          Presentation
        </button>
      </div>

      {/* Main Canvas */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-16 z-10 relative">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center md:text-left mb-10"
        >
          <span className="text-[10px] tracking-widest text-[#2A7F7F] font-bold uppercase bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-4">
            <Home className="w-3.5 h-3.5" />
            Family & Home OS
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-slate-900 tracking-tight leading-none">
            The Ground We <span className="font-semibold text-slate-800">Stand On.</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-500 font-light mt-3 max-w-xl leading-relaxed">
            The background engine. Handyman logs, kitchen system engineering, and financial runway discipline to preserve the baseline.
          </p>
        </motion.div>

        {/* Vision Board */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl p-6 sm:p-8 border border-black/[0.03] bg-white/50 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.01)] mb-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div>
              <span className="text-[10px] tracking-widest text-[#2A7F7F] font-bold uppercase bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-2.5 py-1 rounded-full inline-flex items-center gap-1 mb-1.5">
                8-Month Horizon
              </span>
              <h2 className="text-xl sm:text-2xl font-light text-slate-900">
                The Ground <span className="font-semibold text-slate-800">Holds</span>
              </h2>
            </div>
            <div className="flex items-center gap-3 bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-3.5 py-2 rounded-2xl self-start sm:self-auto">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Foundation Integrity</span>
              <div className="text-lg font-bold text-[#2A7F7F]">
                {Math.round((homeMarkers.filter(Boolean).length / 4) * 100)}%
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div className="flex flex-col gap-2.5">
            {HOME_VISION_MARKERS.map((marker, idx) => (
              <button
                key={idx}
                onClick={() => toggleHomeMarker(idx)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-300 flex items-center gap-3 cursor-pointer ${
                  homeMarkers[idx]
                    ? "bg-[#2A7F7F]/5 border-[#2A7F7F]/15"
                    : "bg-white/40 border-black/[0.03] hover:border-black/[0.08]"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-lg border flex items-center justify-center flex-shrink-0 transition-all ${
                    homeMarkers[idx]
                      ? "bg-[#2A7F7F] border-[#2A7F7F] text-white"
                      : "border-slate-300 bg-white/50"
                  }`}
                >
                  {homeMarkers[idx] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <p className={`text-sm font-light leading-relaxed ${homeMarkers[idx] ? "text-slate-800 font-normal" : "text-slate-500"}`}>
                  {marker.label}
                </p>
              </button>
            ))}
          </div>

          {/* Arrival Line */}
          <div className="mt-8 pt-6 border-t border-black/[0.03] text-center">
            <span className="text-xs text-slate-400 uppercase tracking-widest font-bold block mb-2">Arrival Line</span>
            <p className="text-sm sm:text-base text-[#2A7F7F] font-semibold italic max-w-xl mx-auto leading-relaxed">
              &quot;The ground beneath me is solid, calm, and self-running — so I can build everything else on top of it.&quot;
            </p>
          </div>
        </motion.div>

        {/* Blueprint Logs */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#2A7F7F]">
              Systems & Task Logs
            </h3>
            <div className="flex flex-wrap gap-1.5 bg-slate-200/50 p-1 rounded-xl border border-black/[0.03]">
              {(["all", "handyman", "kitchen", "runway-admin"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    filter === cat
                      ? "bg-[#2A7F7F] text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {cat === "runway-admin" ? "Runway & Admin" : cat === "kitchen" ? "Kitchen Craft" : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="rounded-2xl p-5 flex flex-col justify-between border border-black/[0.03] bg-white/50 backdrop-blur-sm hover:border-[#2A7F7F]/25 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-[#2A7F7F] bg-[#2A7F7F]/5 px-2 py-0.5 rounded border border-[#2A7F7F]/10 flex items-center gap-1">
                      {log.category === "handyman" && <Wrench className="w-2.5 h-2.5" />}
                      {log.category === "kitchen" && <Layers className="w-2.5 h-2.5" />}
                      {log.category === "runway-admin" && <Database className="w-2.5 h-2.5" />}
                      {log.category === "runway-admin" ? "Runway/Admin" : log.category === "kitchen" ? "Kitchen" : "Handyman"}
                    </span>
                    <span
                      className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border flex items-center gap-1 ${
                        log.status === "completed"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                          : "bg-amber-50 text-amber-600 border-amber-100"
                      }`}
                    >
                      {log.status === "completed" ? <CheckCircle className="w-2.5 h-2.5" /> : <Clock className="w-2.5 h-2.5" />}
                      {log.status === "completed" ? "Completed" : "In Progress"}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900">{log.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-500 font-light mt-2 leading-relaxed">{log.description}</p>
                </div>
                {log.details && (
                  <div className="border-t border-black/[0.03] pt-3 mt-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                      Sub-tasks & Safety Notes
                    </span>
                    <ul className="flex flex-col gap-1.5">
                      {log.details.map((detail, dIdx) => (
                        <li key={dIdx} className="text-xs sm:text-sm text-slate-600 font-light flex items-start gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-[#2A7F7F] mt-2 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-8 text-[10px] tracking-widest text-slate-400 font-light select-none relative z-10 border-t border-black/[0.03] bg-white/30">
        Built in the open. One rep at a time.
      </footer>
    </div>
  );
}
