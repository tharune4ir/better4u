"use client";

import React, { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type NavTab = "nutrition" | "movement" | "thinking" | "home-os" | "visionary";

function PageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Sync tab with URL search parameter if present
  useEffect(() => {
    const tabParam = searchParams.get("tab") as NavTab | null;
    if (tabParam === "nutrition") {
      router.push("/nutrition");
    } else if (tabParam === "movement") {
      router.push("/movement");
    } else if (tabParam === "thinking") {
      router.push("/thinking");
    } else if (tabParam === "visionary") {
      router.push("/home?section=visionary");
    } else {
      router.push("/home");
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="w-6 h-6 rounded-full border border-[#2A7F7F]/30 border-t-[#2A7F7F] animate-spin mx-auto" />
        <span className="text-[10px] tracking-widest text-slate-400 font-light uppercase block">
          Loading System
        </span>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center text-xs text-slate-400 font-light">LOADING SYSTEM...</div>}>
      <PageContent />
    </Suspense>
  );
}
