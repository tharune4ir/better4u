"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar, { NavTab } from "@/components/Navbar";
import Dashboard from "@/components/Dashboard";

function PageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<NavTab>("home-os");

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

  const handleTabChange = (tab: NavTab) => {
    if (tab === "nutrition") {
      router.push("/nutrition");
    } else if (tab === "movement") {
      router.push("/movement");
    } else if (tab === "thinking") {
      router.push("/thinking");
    } else if (tab === "visionary") {
      router.push("/home?section=visionary");
    } else {
      router.push("/home");
    }
  };




  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F2]">
      {/* Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />
      
      {/* Dashboard Panels */}
      <Dashboard activeTab={activeTab} setActiveTab={handleTabChange} />
      
      {/* Simple Premium Footer */}
      <footer className="w-full text-center py-8 pb-28 md:pb-8 text-[10px] tracking-widest text-slate-400 font-light select-none">
        TRELIS LIFE SYSTEM • VER 4.0 • CRAFTED FOR STEADY PROGRESS
      </footer>
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
