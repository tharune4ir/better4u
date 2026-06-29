"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Droplet, 
  Leaf, 
  Flame, 
  Activity, 
  Sparkles, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  X, 
  ChevronRight, 
  Filter, 
  Check,
  Lock,
  Unlock,
  ShieldAlert
} from "lucide-react";
import Navbar, { NavTab } from "@/components/Navbar";
import { VAULT_PASSCODE } from "@/lib/config";
import { MOCK_PRODUCTS, ProductSKU } from "@/lib/store-data";

const IconMap: Record<string, React.ComponentType<any>> = {
  Droplet,
  Leaf,
  Flame,
  Activity,
  Sparkles
};

// Vault bypass for dev if needed
const BYPASS_VAULT_FOR_DEV = false;

interface CartItem {
  product: ProductSKU;
  quantity: number;
}

export default function VaultPage() {
  const router = useRouter();
  
  // Gating State
  const [passcode, setPasscode] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(BYPASS_VAULT_FOR_DEV);
  const [isError, setIsError] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Store State
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Restore state on mount
  useEffect(() => {
    if (!BYPASS_VAULT_FOR_DEV) {
      const stored = sessionStorage.getItem("trelis_vault_unlocked");
      if (stored === "true") {
        setIsUnlocked(true);
      }
    }
  }, []);

  useEffect(() => {
    if (!isUnlocked) {
      inputRef.current?.focus();
    }
  }, [isUnlocked]);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handlePasscodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPasscode(val);

    if (val === VAULT_PASSCODE) {
      setIsUnlocking(true);
      setIsError(false);
      sessionStorage.setItem("trelis_vault_unlocked", "true");
      setTimeout(() => {
        setIsUnlocked(true);
      }, 1500);
    } else if (val.length >= VAULT_PASSCODE.length) {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
        setPasscode("");
      }, 600);
    }
  };

  // Cart operations
  const addToCart = (product: ProductSKU) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const categories = ["all", ...Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)))];

  const filteredProducts = selectedCategory === "all" 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === selectedCategory);

  const handleTabChange = (tab: NavTab) => {
    if (tab === "food") {
      router.push("/food");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F2] relative overflow-hidden select-none">
      
      {/* 1. VAULT LOCK SCREEN */}
      <AnimatePresence mode="wait">
        {!isUnlocked && (
          <motion.div
            key="vault-lock"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 1.03,
              filter: "blur(12px)",
              transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
            }}
            onClick={handleContainerClick}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1E2525] overflow-hidden select-none cursor-pointer px-4 sm:px-6"
          >
            {/* Ambient Ember-Teal Glows */}
            <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-[#2A7F7F]/10 rounded-full blur-[90px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/3 w-[350px] h-[350px] bg-amber-500/[0.04] rounded-full blur-[110px] pointer-events-none" />

            <motion.div
              animate={isError ? {
                x: [-12, 12, -9, 9, -5, 5, 0],
                transition: { duration: 0.5 }
              } : {}}
              className="flex flex-col items-center max-w-sm w-full px-6 text-center z-10"
            >
              {/* Mechanical Safe Door Animation */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center mb-8">
                {/* Safe outer ring (Rotates based on passcode length or unsealing) */}
                <motion.div 
                  animate={isUnlocking ? { 
                    rotate: 720, 
                    scale: 0.9,
                    transition: { duration: 1.5, ease: "easeInOut" } 
                  } : { 
                    rotate: passcode.length * 40 
                  }}
                  className="absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full border-4 border-dashed border-[#2A7F7F]/40 flex items-center justify-center"
                >
                  {/* Concentric tick marks inside outer ring */}
                  <div className="w-36 h-36 rounded-full border border-[#2A7F7F]/20 flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full border-2 border-dotted border-amber-500/20" />
                  </div>
                </motion.div>

                {/* Counter-rotating mid ring */}
                <motion.div
                  animate={isUnlocking ? {
                    rotate: -360,
                    transition: { duration: 1.5, ease: "easeInOut" }
                  } : {
                    rotate: -passcode.length * 25
                  }}
                  className="absolute w-32 h-32 sm:w-36 sm:h-36 rounded-full border border-amber-500/30 flex items-center justify-center"
                />

                {/* Solid Glassmorphic Safe Dial in Center */}
                <motion.div 
                  animate={isUnlocking ? {
                    scale: [1, 1.1, 0.85, 1],
                    transition: { duration: 1.5 }
                  } : {}}
                  className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl flex items-center justify-center"
                >
                  {/* Glowing core indicator */}
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${
                    isUnlocking ? "bg-[#2A7F7F]/30 border-[#2A7F7F] shadow-[0_0_15px_rgba(42,127,127,0.5)]" : 
                    isError ? "bg-amber-500/20 border-amber-500" : "bg-white/5 border-white/10"
                  }`}>
                    {isUnlocking ? (
                      <Unlock className="w-4 h-4 text-[#2A7F7F]" />
                    ) : (
                      <Lock className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Title & Description */}
              <h2 className="text-xl sm:text-2xl font-light tracking-[0.3em] text-[#2A7F7F] uppercase mb-1">
                Trelis Vault
              </h2>
              <span className="text-[9px] tracking-widest text-amber-500/70 font-semibold uppercase mb-6">
                FMCG BRAND PROTOTYPES
              </span>
              <p className="text-[10px] font-medium tracking-widest text-slate-400 uppercase mb-8 h-4">
                {isUnlocking ? "Unsealing Chambers..." : isError ? "Access Refused" : "Verification Required"}
              </p>

              {/* Invisible input */}
              <div className="relative w-44 sm:w-52 h-12 flex items-center justify-center">
                <input
                  ref={inputRef}
                  type="password"
                  value={passcode}
                  onChange={handlePasscodeChange}
                  maxLength={15}
                  disabled={isUnlocking}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-text z-20 text-center"
                  placeholder=""
                  autoComplete="off"
                  autoFocus
                />

                <div className="absolute inset-x-0 bottom-0 top-0 flex items-center justify-center gap-4 border-b border-[#2A7F7F]/25 pb-2 z-10 pointer-events-none">
                  {passcode.length === 0 ? (
                    <span className="text-xs font-light tracking-[0.2em] text-slate-500 transition-all duration-300">
                      enter vault code
                    </span>
                  ) : (
                    <div className="flex items-center gap-3">
                      {Array.from({ length: passcode.length }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="w-2 h-2 rounded-full bg-amber-500"
                        />
                      ))}
                    </div>
                  )}
                  <div className="w-[2px] h-4 bg-amber-500 custom-cursor" />
                </div>
              </div>

              <span className="text-[8px] text-slate-600 mt-16 tracking-widest uppercase">
                Presentation Gate. No clinical claims.
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MOCK SKU STORE CONTENT */}
      {isUnlocked && (
        <div className="flex flex-col min-h-screen">
          
          <Navbar activeTab="vault" setActiveTab={handleTabChange} />

          <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-24 md:pb-16 z-10 relative">
            
            {/* Header Area */}
            <div className="border-b border-black/[0.04] pb-6 mb-8 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <span className="text-[10px] tracking-widest text-[#2A7F7F] font-bold uppercase bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-3 py-1 rounded-full inline-block mb-3">
                  Trelis Labs / Mock SKU Store
                </span>
                <h1 className="text-3xl font-extralight text-slate-900 tracking-tight">
                  Better-for-you <span className="font-semibold text-slate-950">FMCG Wing</span>
                </h1>
                <p className="text-xs text-slate-500 font-light mt-1">
                  Taste-first prebiotic staples, snacks, and traditional ferments designed for modern daily life.
                </p>
              </div>

              {/* Cart Button */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative px-5 py-2.5 bg-[#2A7F7F] text-white rounded-full text-xs font-semibold tracking-wider uppercase shadow-sm hover:bg-[#1e5c5c] transition-all flex items-center gap-2 cursor-pointer self-center md:self-auto"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Cart</span>
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                  {cartItemsCount}
                </span>
              </button>
            </div>

            {/* Disclaimer Alert */}
            <div className="bg-amber-500/[0.04] border border-amber-500/10 rounded-2xl p-4 flex items-start gap-3 mb-8">
              <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                  Mock Prototype Store
                </h4>
                <p className="text-xs text-amber-700 font-light mt-0.5 leading-relaxed">
                  <strong>MOCK DATA / CONCEPT ONLY:</strong> These items represent prototype SKUs for our future food line. Real catalog details, sourcing, pricing, and ingredients are TBD. Adding to cart is processed locally in temporary state.
                </p>
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap items-center gap-2 mb-8 justify-center md:justify-start">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5 mr-2">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </span>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer border ${
                    selectedCategory === cat 
                      ? "bg-[#2A7F7F]/10 text-[#2A7F7F] border-[#2A7F7F]/20" 
                      : "bg-white/40 text-slate-500 border-black/[0.03] hover:border-black/10"
                  }`}
                >
                  {cat === "all" ? "View All" : cat}
                </button>
              ))}
            </div>

            {/* SKU Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {filteredProducts.map(product => {
                const ItemIcon = IconMap[product.imagePlaceholder] || Sparkles;
                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/40 border border-black/[0.03] rounded-3xl p-5 flex flex-col sm:flex-row gap-5 items-stretch hover:border-[#2A7F7F]/20 transition-all hover:shadow-[0_8px_32px_rgba(0,0,0,0.02)]"
                  >
                    {/* Visual Asset Box */}
                    <div className="w-full sm:w-32 h-32 rounded-2xl bg-gradient-to-br from-[#2A7F7F]/5 to-emerald-500/5 border border-black/[0.02] flex flex-col items-center justify-center relative flex-shrink-0">
                      <ItemIcon className="w-10 h-10 text-[#2A7F7F] opacity-75" />
                      <span className="absolute bottom-2.5 text-[8px] font-bold text-[#2A7F7F] uppercase tracking-widest bg-white/80 border border-[#2A7F7F]/10 px-2 py-0.5 rounded-full">
                        {product.badge}
                      </span>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h3 className="text-base font-bold text-slate-900 leading-tight">
                            {product.name}
                          </h3>
                        </div>
                        <span className="text-[10px] text-slate-400 italic font-light block mt-0.5">
                          {product.tagline}
                        </span>
                        <p className="text-xs text-slate-600 font-light mt-2.5 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-black/[0.02] flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-800">
                          ₹{product.price}
                        </span>
                        <button
                          onClick={() => addToCart(product)}
                          className="px-4 py-2 bg-slate-950 text-white rounded-full text-[10px] font-bold tracking-wider uppercase hover:bg-[#2A7F7F] transition-all cursor-pointer"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </main>

          {/* 3. SIDE DRAWER CART */}
          <AnimatePresence>
            {isCartOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsCartOpen(false)}
                  className="fixed inset-0 bg-black z-50 cursor-pointer"
                />

                {/* Drawer Container */}
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-[#F7F6F2] shadow-2xl z-50 flex flex-col"
                >
                  {/* Drawer Header */}
                  <div className="p-6 border-b border-black/[0.04] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-[#2A7F7F]" />
                      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">
                        Your Order
                      </h3>
                    </div>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="p-1 rounded-full hover:bg-black/5 text-slate-500 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Drawer Content */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {cart.length === 0 ? (
                      <div className="h-48 flex flex-col items-center justify-center text-center text-slate-400 space-y-2">
                        <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
                        <span className="text-xs font-light uppercase tracking-wider">Cart is empty</span>
                      </div>
                    ) : (
                      cart.map(item => (
                        <div 
                          key={item.product.id}
                          className="bg-white/50 border border-black/[0.02] rounded-2xl p-4 flex gap-3 items-center justify-between"
                        >
                          <div className="flex-1">
                            <h4 className="text-xs font-bold text-slate-900 leading-tight">
                              {item.product.name}
                            </h4>
                            <span className="text-[10px] text-slate-500 block mt-0.5">
                              ₹{item.product.price} each
                            </span>
                          </div>

                          <div className="flex items-center gap-2.5">
                            {/* Quantity Toggles */}
                            <div className="flex items-center bg-black/5 rounded-full p-1 border border-black/[0.02]">
                              <button
                                onClick={() => updateQuantity(item.product.id, -1)}
                                className="w-5 h-5 rounded-full flex items-center justify-center text-slate-600 hover:bg-white/50 cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold text-slate-800 px-2 min-w-[20px] text-center select-none">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, 1)}
                                className="w-5 h-5 rounded-full flex items-center justify-center text-slate-600 hover:bg-white/50 cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="p-1.5 rounded-full hover:bg-amber-500/10 text-slate-400 hover:text-amber-700 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Drawer Footer */}
                  {cart.length > 0 && (
                    <div className="p-6 border-t border-black/[0.04] bg-white/20 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Total Amount:
                        </span>
                        <span className="text-base font-bold text-slate-900">
                          ₹{cartTotal}
                        </span>
                      </div>

                      <button
                        onClick={() => alert("Checkouts are disabled on this prototype platform. Cart data stays local.")}
                        className="w-full py-3 bg-[#2A7F7F] text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#1e5c5c] transition-all cursor-pointer text-center"
                      >
                        Proceed to Checkout (Mock)
                      </button>
                    </div>
                  )}
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Footer */}
          <footer className="w-full text-center py-8 pb-10 text-[10px] tracking-widest text-slate-400 font-light select-none border-t border-black/[0.02] bg-white/20 mt-auto">
            BUILT IN THE OPEN. ONE REP AT A TIME.
          </footer>

        </div>
      )}
    </div>
  );
}
