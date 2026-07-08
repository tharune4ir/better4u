"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ENTRY_PASSCODE } from "@/lib/config";

interface LockScreenProps {
  children: React.ReactNode;
}

// Set to true during dev if you need to bypass
const BYPASS_LOCK_FOR_DEVELOPMENT = false;

export default function LockScreen({ children }: LockScreenProps) {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(BYPASS_LOCK_FOR_DEVELOPMENT);
  const [isError, setIsError] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Restore unlocked state from sessionStorage if exists
  useEffect(() => {
    if (!BYPASS_LOCK_FOR_DEVELOPMENT) {
      const stored = sessionStorage.getItem("trelis_unlocked");
      if (stored === "true") {
        setIsUnlocked(true);
      }
    }
  }, []);

  // Focus the input automatically on mount and click
  useEffect(() => {
    if (!isUnlocked) {
      inputRef.current?.focus();
    }
  }, [isUnlocked]);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);

    if (val === ENTRY_PASSCODE) {
      setIsUnlocking(true);
      setIsError(false);
      sessionStorage.setItem("trelis_unlocked", "true");
      setTimeout(() => {
        setIsUnlocked(true);
      }, 1200);
    } else if (val.length >= ENTRY_PASSCODE.length) {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
        setPassword("");
      }, 600);
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!isUnlocked && (
          <motion.div
            key="lock-screen"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 1.05,
              filter: "blur(8px)",
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
            }}
            onClick={handleContainerClick}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F7F6F2] overflow-hidden select-none cursor-pointer px-4 sm:px-6"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-gradient-to-tr from-[#2A7F7F]/15 to-emerald-200/10 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-gradient-to-tr from-slate-200/20 to-[#2A7F7F]/5 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />

            {/* Lock Container */}
            <motion.div
              animate={isError ? {
                x: [-10, 10, -8, 8, -5, 5, 0],
                transition: { duration: 0.5 }
              } : {}}
              className="flex flex-col items-center max-w-sm w-full px-6 text-center z-10"
            >
              {/* Massive 3D-Style Glassmorphic Lock */}
              <motion.div
                animate={isUnlocking ? {
                  scale: [1, 1.05, 0.95, 1],
                  y: [0, -10, 5, 0],
                  transition: { duration: 1, ease: "easeInOut" }
                } : {
                  y: [0, -8, 0],
                  transition: { 
                    duration: 5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }
                }}
                className="relative w-40 h-48 sm:w-48 sm:h-56 flex items-center justify-center mb-8 sm:mb-12"
              >
                {/* 1. Shackle (Lock Arch) */}
                <svg
                  viewBox="0 0 100 100"
                  className="absolute top-0 w-28 h-28 sm:w-32 sm:h-32 overflow-visible"
                >
                  <defs>
                    <linearGradient id="shackle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#81cbcb" stopOpacity="0.9" />
                      <stop offset="50%" stopColor="#2A7F7F" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#1e5c5c" stopOpacity="0.9" />
                    </linearGradient>
                    <filter id="shackle-shadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.08" />
                    </filter>
                  </defs>
                  
                  <motion.path
                    d="M 20 60 A 30 30 0 0 1 80 60 L 80 80 L 70 80 L 70 60 A 20 20 0 0 0 30 60 L 30 80 L 20 80 Z"
                    fill="url(#shackle-grad)"
                    filter="url(#shackle-shadow)"
                    initial={{ y: 0 }}
                    animate={isUnlocking ? { y: -22, rotate: -4 } : { y: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 120, 
                      damping: 12,
                      delay: 0.1
                    }}
                  />
                </svg>

                {/* 2. Lock Body (Glassmorphic Outer Frame) */}
                <div className="absolute bottom-4 w-36 h-32 sm:w-40 sm:h-36 rounded-[24px] sm:rounded-[28px] glassmorphic p-[1px] shadow-2xl flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/40 pointer-events-none rounded-[24px] sm:rounded-[28px]" />
                  <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 right-4 w-20 h-20 bg-gradient-to-br from-[#2A7F7F]/15 to-emerald-400/5 rounded-full blur-xl pointer-events-none" />

                  {/* Inner Details: Keyhole Area */}
                  <div className="relative flex flex-col items-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-900/5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),0_1px_2px_rgba(255,255,255,0.7)] flex items-center justify-center border border-white/20">
                      <motion.div 
                        animate={isUnlocking ? {
                          scale: [1, 1.2, 0.9, 1],
                          rotate: [0, 90, 90, 0],
                          transition: { duration: 0.8 }
                        } : {}}
                        className="w-2.5 h-6 sm:w-3 sm:h-7 bg-slate-950 rounded-full relative flex items-center justify-center shadow-inner"
                      >
                        <div className="absolute top-0.5 sm:top-1 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-slate-950" />
                        <div className="absolute bottom-0 w-[4px] sm:w-[5px] h-3.5 sm:h-4 bg-slate-950" />
                      </motion.div>
                    </div>
                  </div>
                </div>

                <div className="absolute -inset-2 rounded-full border border-black/[0.01] pointer-events-none" />
              </motion.div>

              {/* Title & Micro-copy */}
              <h1 className="text-xl sm:text-2xl font-light tracking-[0.25em] text-[#2A7F7F] uppercase mb-2">
                better4u
              </h1>
              <p className="text-[10px] font-medium tracking-widest text-slate-400 uppercase mb-8 h-4">
                {isUnlocking ? "Decrypted" : isError ? "Access Denied" : "System Secured"}
              </p>

              {/* Hyper-minimalist Invisible Password Input */}
              <div className="relative w-40 sm:w-48 h-12 flex items-center justify-center">
                <input
                  ref={inputRef}
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  maxLength={15}
                  disabled={isUnlocking}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-text z-20 text-center"
                  placeholder=""
                  autoComplete="off"
                  autoFocus
                />

                {/* Stripped-Back Visual Interface (Modern Dots/Cursor) */}
                <div className="absolute inset-x-0 bottom-0 top-0 flex items-center justify-center gap-4 border-b border-[#2A7F7F]/20 pb-2 z-10 pointer-events-none">
                  {password.length === 0 ? (
                    <span className="text-[11px] font-light tracking-[0.15em] text-slate-400/80 transition-all duration-300">
                      passcode
                    </span>
                  ) : (
                    <div className="flex items-center gap-3">
                      {Array.from({ length: password.length }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="w-2.5 h-2.5 rounded-full bg-[#2A7F7F]"
                        />
                      ))}
                    </div>
                  )}

                  <div className="w-[2px] h-4 bg-[#2A7F7F] custom-cursor" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Dashboard Render */}
      <div className={`transition-all duration-1000 ${isUnlocked ? "opacity-100 filter-none" : "opacity-0 blur-sm pointer-events-none"}`}>
        {children}
      </div>
    </>
  );
}
