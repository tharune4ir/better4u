"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function InnerUnlockPage() {
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [statusText, setStatusText] = useState("Inner Room — Secured");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handleSubmit = async () => {
    if (!password || isUnlocking) return;

    try {
      const res = await fetch("/api/inner/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setIsUnlocking(true);
        setStatusText("Authenticated");
        setTimeout(() => {
          router.push("/inner/family");
        }, 1200);
      } else {
        setIsError(true);
        setStatusText("Access Denied");
        setTimeout(() => {
          setIsError(false);
          setPassword("");
          setStatusText("Inner Room — Secured");
        }, 800);
      }
    } catch {
      setIsError(true);
      setStatusText("Connection Error");
      setTimeout(() => {
        setIsError(false);
        setPassword("");
        setStatusText("Inner Room — Secured");
      }, 800);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div
      onClick={handleContainerClick}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0c0a09] overflow-hidden select-none cursor-pointer px-4 sm:px-6"
    >
      {/* Ambient Deep Amber Glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-gradient-to-tr from-amber-700/15 to-orange-900/10 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-gradient-to-tr from-stone-800/20 to-amber-800/5 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />

      {/* Lock Container */}
      <motion.div
        animate={
          isError
            ? {
                x: [-10, 10, -8, 8, -5, 5, 0],
                transition: { duration: 0.5 },
              }
            : {}
        }
        className="flex flex-col items-center max-w-sm w-full px-6 text-center z-10"
      >
        {/* Lantern / Lock Crest SVG */}
        <motion.div
          animate={
            isUnlocking
              ? {
                  scale: [1, 1.1, 0.9, 1],
                  y: [0, -15, 5, 0],
                  transition: { duration: 1, ease: "easeInOut" },
                }
              : {
                  y: [0, -8, 0],
                  transition: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }
          }
          className="relative w-40 h-48 sm:w-48 sm:h-56 flex items-center justify-center mb-8 sm:mb-12"
        >
          <svg
            viewBox="0 0 120 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Lantern top hook */}
            <path
              d="M60,5 C60,5 55,10 55,18 L65,18 C65,10 60,5 60,5"
              stroke="#d97706"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />

            {/* Lantern cage frame */}
            <path
              d="M35,30 L85,30 L90,45 L90,110 C90,120 82,130 72,130 L48,130 C38,130 30,120 30,110 L30,45 Z"
              stroke="#d97706"
              strokeWidth="1.5"
              fill="none"
              opacity="0.4"
            />

            {/* Lantern top plate */}
            <rect
              x="33"
              y="25"
              width="54"
              height="6"
              rx="2"
              fill="#92400e"
              fillOpacity="0.6"
            />

            {/* Inner glow flame — the "deeper" amber */}
            <AnimatePresence>
              {!isUnlocking && (
                <motion.ellipse
                  cx="60"
                  cy="80"
                  rx="18"
                  ry="28"
                  fill="url(#flameGlow)"
                  initial={{ opacity: 0.6, scale: 0.9 }}
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [0.9, 1.05, 0.9],
                    ry: [26, 30, 26],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </AnimatePresence>

            {/* Unlocked state — bright flash */}
            <AnimatePresence>
              {isUnlocking && (
                <motion.ellipse
                  cx="60"
                  cy="80"
                  rx="35"
                  ry="45"
                  fill="url(#flameGlow)"
                  initial={{ opacity: 0.4, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1.3 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                />
              )}
            </AnimatePresence>

            {/* Lantern vertical bars */}
            <line x1="42" y1="35" x2="42" y2="125" stroke="#92400e" strokeWidth="1" opacity="0.3" />
            <line x1="60" y1="31" x2="60" y2="128" stroke="#92400e" strokeWidth="1" opacity="0.25" />
            <line x1="78" y1="35" x2="78" y2="125" stroke="#92400e" strokeWidth="1" opacity="0.3" />

            {/* Lantern base */}
            <rect
              x="38"
              y="128"
              width="44"
              height="6"
              rx="2"
              fill="#92400e"
              fillOpacity="0.5"
            />

            {/* Lock keyhole in the center */}
            <motion.g
              animate={
                isUnlocking
                  ? { rotate: 90, transition: { duration: 0.6 } }
                  : {}
              }
              style={{ transformOrigin: "60px 95px" }}
            >
              <circle cx="60" cy="90" r="6" fill="#1c1917" stroke="#d97706" strokeWidth="1" opacity="0.8" />
              <rect x="58" y="94" width="4" height="10" rx="1" fill="#1c1917" opacity="0.8" />
            </motion.g>

            <defs>
              <radialGradient id="flameGlow" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#d97706" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#92400e" stopOpacity="0.1" />
              </radialGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-light tracking-[0.25em] text-amber-600/80 uppercase mb-2">
          Inner Room
        </h1>
        <p className="text-[10px] font-medium tracking-widest text-stone-500 uppercase mb-8 h-4">
          {statusText}
        </p>

        {/* Password Input */}
        <div className="relative w-40 sm:w-48 h-12 flex items-center justify-center">
          <input
            ref={inputRef}
            type="password"
            value={password}
            onChange={handlePasswordChange}
            onKeyDown={handleKeyDown}
            maxLength={12}
            disabled={isUnlocking}
            className="absolute inset-0 w-full h-full opacity-0 cursor-text z-20 text-center"
            placeholder=""
            autoComplete="off"
            autoFocus
          />

          <div className="absolute inset-x-0 bottom-0 top-0 flex items-center justify-center gap-4 border-b border-amber-700/25 pb-2 z-10 pointer-events-none">
            {password.length === 0 ? (
              <span className="text-[11px] font-light tracking-[0.15em] text-stone-600/60 transition-all duration-300">
                passcode
              </span>
            ) : (
              <div className="flex items-center gap-3">
                {Array.from({ length: password.length }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-2.5 h-2.5 rounded-full bg-amber-600"
                  />
                ))}
              </div>
            )}

            {/* Blinking Caret */}
            <div className="w-[2px] h-4 bg-amber-600 custom-cursor" />
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isUnlocking || password.length === 0}
          className="mt-8 text-[10px] uppercase tracking-widest text-stone-500 hover:text-amber-500 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Enter →
        </button>
      </motion.div>
    </div>
  );
}
