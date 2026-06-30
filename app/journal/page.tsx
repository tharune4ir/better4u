"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar, { NavTab } from "@/components/Navbar";

export default function JournalPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<NavTab>("journal");

  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    if (tab === "product-lab") {
      router.push("/product-lab");
    } else if (tab === "approach") {
      router.push("/approach");
    } else if (tab === "journal") {
      router.push("/journal");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F2] relative overflow-hidden text-slate-900">
      <Navbar activeTab="journal" setActiveTab={handleTabChange} />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-24 flex flex-col items-center justify-center text-center z-10 relative">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 flex flex-col items-center"
        >
          <span className="text-[10px] tracking-[0.25em] font-bold uppercase border border-slate-200 px-4 py-1.5 rounded-full inline-block text-slate-500 bg-white/50">
            Coming Soon
          </span>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-slate-900 tracking-tight">
            Journal
          </h1>
          
          <p className="text-sm sm:text-base text-slate-500 font-light leading-relaxed max-w-md mx-auto">
            Notes, recipes, and the story behind every batch — coming soon.
          </p>

          <div className="pt-8">
            <button 
              onClick={() => router.push("/")}
              className="text-[11px] font-bold tracking-widest uppercase text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to home</span>
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
