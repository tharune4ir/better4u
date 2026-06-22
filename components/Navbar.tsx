"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Sparkles, 
  Apple, 
  Activity, 
  BrainCircuit, 
  Compass, 
  Sparkle
} from "lucide-react";

export type NavTab = "nutrition" | "movement" | "thinking" | "home-os" | "visionary";

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
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

  const navItems = [
    { id: "nutrition" as NavTab, label: "Nutrition", sub: "Gut", icon: Apple },
    { id: "movement" as NavTab, label: "Movement", sub: "Body", icon: Activity },
    { id: "thinking" as NavTab, label: "Thinking", sub: "Mind", icon: BrainCircuit },
    { id: "home-os" as NavTab, label: "Home OS", sub: "Core", icon: Compass },
    { id: "visionary" as NavTab, label: "Visionary", sub: "Future", icon: Sparkles },
  ];

  return (
    <>
      {/* ==================== 1. MOBILE TOP HEADER (Branding & Clock) ==================== */}
      <header className="flex md:hidden items-center justify-between px-6 h-16 bg-[#F7F6F2]/80 backdrop-blur-md border-b border-black/[0.03] sticky top-0 z-40 select-none">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab("home-os")}>
          <div className="relative w-9 h-9 flex-shrink-0">
            <Image
              src="/icons/icon-128.webp"
              alt="Trelis Life Logo"
              fill
              sizes="36px"
              className="object-contain"
              priority
            />
          </div>
          <Sparkle className="w-3.5 h-3.5 text-[#2A7F7F]" />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-700 tabular-nums">
            {time}
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#2A7F7F] animate-pulse" />
        </div>
      </header>

      {/* ==================== 2. MOBILE BOTTOM FIXED TAB BAR ==================== */}
      <nav className="flex md:hidden fixed bottom-0 left-0 right-0 h-20 bg-[#F7F6F2]/90 backdrop-blur-lg border-t border-black/[0.04] justify-around items-center z-40 pb-safe select-none">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex-1 h-full flex flex-col justify-center items-center min-h-[44px] cursor-pointer relative"
              style={{ minHeight: "48px" }} // Exceeds iOS 44px tap target requirements
            >
              <div className={`p-1 rounded-full transition-all duration-300 ${
                isActive ? "text-[#2A7F7F] scale-110" : "text-slate-400"
              }`}>
                <Icon className="w-6 h-6 stroke-[1.75]" />
              </div>
              <span className={`text-[9px] tracking-wide font-medium mt-0.5 transition-colors duration-300 ${
                isActive ? "text-[#2A7F7F]" : "text-slate-500"
              }`}>
                {item.label}
              </span>
              
              {isActive && (
                <motion.div
                  layoutId="mobileActiveDot"
                  className="absolute bottom-2 w-1 h-1 rounded-full bg-[#2A7F7F]"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* ==================== 3. DESKTOP STICKY TOP NAV BAR ==================== */}
      <header className="hidden md:flex sticky top-0 z-40 w-full h-20 border-b border-black/[0.03] bg-[#F7F6F2]/75 backdrop-blur-md items-center justify-between px-12 select-none">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("home-os")}>
          <div className="relative w-11 h-11 flex-shrink-0">
            <Image
              src="/icons/icon-128.webp"
              alt="Trelis Life Logo"
              fill
              sizes="44px"
              className="object-contain"
              priority
            />
          </div>
          <Sparkle className="w-4 h-4 text-[#2A7F7F] animate-pulse" />
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 bg-black/[0.02] p-1.5 rounded-full border border-black/[0.02]">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="relative px-5 py-2.5 rounded-full flex flex-col items-center justify-center cursor-pointer min-h-[44px] group"
              >
                {/* Active Slide Capsule */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-black/[0.02] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Label & Subtitle */}
                <span
                  className={`relative z-10 text-xs font-semibold tracking-wide transition-colors duration-300 ${
                    isActive ? "text-[#2A7F7F]" : "text-slate-500 group-hover:text-slate-800"
                  }`}
                >
                  {item.label}
                </span>
                <span
                  className={`relative z-10 text-[9px] font-light tracking-widest uppercase scale-[0.8] mt-0.5 transition-colors duration-300 ${
                    isActive ? "text-slate-400" : "text-slate-300 group-hover:text-slate-400"
                  }`}
                >
                  {item.sub}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right Side Info */}
        <div className="flex items-center gap-4 text-right">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-700 tabular-nums">
              {time}
            </span>
            <span className="text-[9px] tracking-wider text-slate-400 uppercase font-light mt-0.5">
              System Synced
            </span>
          </div>
          <div className="w-2 h-2 rounded-full bg-[#2A7F7F] animate-pulse shadow-sm shadow-[#2A7F7F]/50" />
        </div>
      </header>
    </>
  );
}
