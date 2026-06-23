"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  User,
  Heart,
  TrendingUp,
  Award,
  DollarSign,
  Compass,
  Zap,
  Activity,
  ShieldCheck
} from "lucide-react";

export default function InnerPresentationPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F2] relative overflow-hidden">
      {/* Ambient Soft Teal Glows */}
      <div className="absolute top-[15%] left-[-10%] w-[35vw] h-[35vw] bg-[#2A7F7F]/5 rounded-full blur-[135px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[-10%] w-[40vw] h-[40vw] bg-[#2A7F7F]/4 rounded-full blur-[140px] pointer-events-none" />

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
          onClick={() => router.push("/inner/family")}
          className="text-[10px] uppercase tracking-wider font-bold px-4 py-2 rounded-lg text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
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
          className="text-[10px] uppercase tracking-wider font-bold px-4 py-2 rounded-lg bg-[#2A7F7F]/10 text-[#2A7F7F] border border-[#2A7F7F]/10 cursor-pointer"
        >
          Presentation
        </button>
      </div>

      {/* Main Narrative Canvas */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-12 pb-24 z-10 relative space-y-16">
        
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <span className="text-[10px] tracking-widest text-[#2A7F7F] font-bold uppercase bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Executive Narrative
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-slate-900 tracking-tight leading-tight">
            The Blueprint & <span className="font-semibold text-slate-800">Future Vision</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-light mt-3 max-w-xl mx-auto leading-relaxed">
            A comprehensive, cinematic breakdown of the Trelis framework: proving baseline capability, analyzing health latency, and mapping runway management.
          </p>
        </motion.div>

        {/* Section 1: Intro / Personal & Capability */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl p-6 sm:p-8 border border-black/[0.03] bg-white/50 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-[#2A7F7F]/10 border border-[#2A7F7F]/15 flex items-center justify-center">
              <User className="w-4 h-4 text-[#2A7F7F]" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#2A7F7F] uppercase tracking-widest block mb-1">Chapter 01</span>
              <h2 className="text-lg font-semibold text-slate-900">Who I Am & Capability Proof</h2>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-650 font-light leading-relaxed">
            <p>
              I am an builder committed to systems design, engineering full-stack digital architectures (like this entire Trelis platform) and structuring physical operating frameworks.
            </p>
            <p>
              My background integrates technical web development, data integrity filtering, and operational mechanics. Trelis is the physical translation of this approach—taking complex, scientifically verified protocols and compiling them into a simple, daily lifestyle routine.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-black/[0.03]">
              <div className="bg-slate-200/30 p-4 rounded-2xl border border-black/[0.02]">
                <span className="text-[10px] font-bold text-[#2A7F7F] uppercase tracking-widest block mb-1.5">Web Dev & Systems</span>
                <p className="text-xs sm:text-sm text-slate-500">React, Next.js architecture, state synchronization, dynamic design protocols.</p>
              </div>
              <div className="bg-slate-200/30 p-4 rounded-2xl border border-black/[0.02]">
                <span className="text-[10px] font-bold text-[#2A7F7F] uppercase tracking-widest block mb-1.5">Physical Execution</span>
                <p className="text-xs sm:text-sm text-slate-500">Formulating prebiotics, constructing fitness regimens, daily habit automation.</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 2: The Doctor-Lag Thesis */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl p-6 sm:p-8 border border-black/[0.03] bg-white/50 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.01)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#2A7F7F]/3 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-[#2A7F7F]/10 border border-[#2A7F7F]/15 flex items-center justify-center">
              <Heart className="w-4 h-4 text-[#2A7F7F]" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#2A7F7F] uppercase tracking-widest block mb-1">Chapter 02</span>
              <h2 className="text-lg font-semibold text-slate-900">The &quot;Doctor-Lag&quot; Thesis</h2>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-650 font-light leading-relaxed">
            <p className="text-base font-light text-slate-800 italic border-l-2 border-[#2A7F7F]/40 pl-4 py-1">
              &quot;Your physical state today is a lagging reflection of the actions you committed to 3 to 6 months ago. When clinical indicators flag an issue, they are diagnosing the past.&quot;
            </p>
            <p>
              Medical systems operate on snapshots. If you receive an assessment today, it shows the downstream result of behaviors long past. Traditional healthcare is reactive—it intervenes after the latency buffer has cleared and damage is visible.
            </p>
            <p>
              To achieve authentic health transformation, we must feed the future buffer. By establishing optimal nutrition, core physical capacity, and cognitive rest today, we preemptively write the clean clinical results of tomorrow.
            </p>
          </div>
        </motion.section>

        {/* Section 3: The 8-Month Infinite Health Blueprint */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl p-6 sm:p-8 border border-black/[0.03] bg-white/50 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-[#2A7F7F]/10 border border-[#2A7F7F]/15 flex items-center justify-center">
              <Activity className="w-4 h-4 text-[#2A7F7F]" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#2A7F7F] uppercase tracking-widest block mb-1">Chapter 03</span>
              <h2 className="text-lg font-semibold text-slate-900">The 8-Month Infinite Health Blueprint</h2>
            </div>
          </div>

          <div className="space-y-6 text-sm text-slate-650 font-light leading-relaxed">
            <p>
              This structured protocol operates across three distinct biological wings designed to build an unbreakable physical foundation over a focused 8-month horizon:
            </p>

            <div className="space-y-4">
              <div className="flex gap-4">
                <span className="text-xs font-bold text-[#2A7F7F] bg-[#2A7F7F]/10 border border-[#2A7F7F]/10 w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0">01</span>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-1">The Food Wing (Prebiotic Engine)</h4>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-1">
                    Transitioning to prebiotic-dense, grain-first, and wild-fermented fuels. This restores mucosal barrier lining, optimizes nutrient extraction, and stabilizes glycemic variability.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-xs font-bold text-[#2A7F7F] bg-[#2A7F7F]/10 border border-[#2A7F7F]/10 w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0">02</span>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-1">The Movement Wing (Durable Chassis)</h4>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-1">
                    Building shoulder mobility, kinetic chain integrity, and lean resilience using progressive bodyweight exercises, rings, and structured macebell swing protocols.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-xs font-bold text-[#2A7F7F] bg-[#2A7F7F]/10 border border-[#2A7F7F]/10 w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0">03</span>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-1">The Thinking Wing (Cognitive Buffer)</h4>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-1">
                    Mitigating stress-induced neuro-exhaustion via Non-Sleep Deep Rest (NSDR), regular boredom-on-purpose sessions, clear language formulation, and daily logical framework calibration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 4: The Brand Plan */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl p-6 sm:p-8 border border-black/[0.03] bg-white/50 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-[#2A7F7F]/10 border border-[#2A7F7F]/15 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-[#2A7F7F]" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#2A7F7F] uppercase tracking-widest block mb-1">Chapter 04</span>
              <h2 className="text-lg font-semibold text-slate-900">The Brand Plan: Bottling the Future</h2>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-650 font-light leading-relaxed">
            <p>
              Trelis is not designed to stay a personal log. The kitchen experimentation and formulation trials represent initial R&D for a future physical consumer brand.
            </p>
            <p>
              The long-term roadmap aims to transition these private gut-friendly prebiotic mixtures and fermented concoctions into zero-compromise, clean physical goods (such as Gut-Spark mixtures or prebiotic blends) to build a scalable and sustainable wellness engine.
            </p>
            <div className="bg-slate-200/30 p-4 rounded-2xl border border-black/[0.02] mt-4">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Roadmap Target Milestones</span>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-sm text-slate-600 border-b border-black/[0.03] pb-1.5">
                  <span>Phase 1: Personal Formulation Lock</span>
                  <span className="text-[#2A7F7F] font-semibold">Active</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm text-slate-600 border-b border-black/[0.03] pb-1.5">
                  <span>Phase 2: Local Kitchen Production Trial</span>
                  <span>Months 4–6</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm text-slate-600">
                  <span>Phase 3: Brand Launch & Distribution</span>
                  <span>Month 8+</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 5: Runway & Ask Details */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl p-6 sm:p-8 border border-black/[0.03] bg-white/50 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-[#2A7F7F]/10 border border-[#2A7F7F]/15 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-[#2A7F7F]" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#2A7F7F] uppercase tracking-widest block mb-1">Chapter 05</span>
              <h2 className="text-lg font-semibold text-slate-900">Runway & Financial Ask</h2>
            </div>
          </div>

          <div className="space-y-5 text-sm text-slate-650 font-light leading-relaxed">
            <p>
              To maintain the integrity of this build sequence, financial parameters are tightly managed under a strict weekly budget cap, ensuring zero resource wastage.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-200/30 p-4 rounded-2xl border border-black/[0.02] text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Horizon</span>
                <span className="text-sm font-semibold text-slate-800">8 Months</span>
              </div>
              <div className="bg-slate-200/30 p-4 rounded-2xl border border-black/[0.02] text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Weekly Cap</span>
                <span className="text-sm font-semibold text-[#2A7F7F]">Strict limit</span>
              </div>
              <div className="bg-slate-200/30 p-4 rounded-2xl border border-black/[0.02] text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Administration</span>
                <span className="text-sm font-semibold text-slate-800">Clean Entity</span>
              </div>
            </div>

            <div className="bg-slate-200/35 p-4 rounded-2xl border border-black/[0.02] space-y-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">The Ask Details</span>
              <p className="text-xs sm:text-sm text-slate-650">
                1. <strong>Strict Capital Stewardship:</strong> Execute runway preservation by maintaining low baseline costs.
              </p>
              <p className="text-xs sm:text-sm text-slate-650">
                2. <strong>Administrative Independence:</strong> Quiet background operation to allow full focus on system creation and physical formulation trials.
              </p>
              <p className="text-xs sm:text-sm text-slate-650">
                3. <strong>Long-Term Alignment:</strong> Trusting the 8-month structure to deliver the locked consumer formulations.
              </p>
            </div>
          </div>
        </motion.section>

      </main>

      {/* Footer */}
      <footer className="w-full text-center py-8 text-[10px] tracking-widest text-[#2A7F7F]/60 font-light select-none relative z-10 border-t border-black/[0.03] bg-white/30">
        BUILT IN THE OPEN. ONE REP AT A TIME.
      </footer>
    </div>
  );
}
