"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VaultRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/product-lab");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center">
      <div className="text-slate-400 text-xs font-light uppercase tracking-widest animate-pulse">
        Redirecting to Product Lab...
      </div>
    </div>
  );
}
