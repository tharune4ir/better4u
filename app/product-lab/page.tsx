"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Droplet, 
  Sparkles, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  X, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Info,
  Beaker,
  Thermometer,
  Wind
} from "lucide-react";
import Navbar, { NavTab } from "@/components/Navbar";
import { MOCK_PRODUCTS, ProductSKU } from "@/lib/store-data";

interface CartItem {
  product: ProductSKU;
  quantity: number;
}

// Interactive Brand Name candidates in simple English
const BRAND_NAMES = ["ALIVE", "VIVID", "ACTIVE", "PURE", "GLOW"];

// Interactive Bottle Visualizer component with Ambient Glow and Image Check
const BottleVisualizer = ({ 
  brandName, 
  flavor, 
  glowColor, 
  accentColor, 
  imagePlaceholder,
  isDetailed = false 
}: { 
  brandName: string; 
  flavor: string; 
  glowColor: string; 
  accentColor: string; 
  imagePlaceholder: string;
  isDetailed?: boolean;
}) => {
  const [imageExists, setImageExists] = useState(false);
  const imageSrc = `/all_image_files/product_images/${imagePlaceholder}.png`;

  useEffect(() => {
    // Attempt to load the image if it is placed in the folder
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => setImageExists(true);
    img.onerror = () => setImageExists(false);
  }, [imageSrc]);

  // Color mappings for mock liquid rendering
  const liquidColors: Record<string, string> = {
    lime: "linear-gradient(180deg, rgba(163, 230, 53, 0.4) 0%, rgba(42, 127, 127, 0.2) 100%)",
    ginger: "linear-gradient(180deg, rgba(245, 158, 11, 0.5) 0%, rgba(180, 83, 9, 0.25) 100%)",
    spice: "linear-gradient(180deg, rgba(180, 83, 9, 0.5) 0%, rgba(120, 53, 4, 0.3) 100%)",
    berry: "linear-gradient(180deg, rgba(139, 92, 246, 0.5) 0%, rgba(76, 29, 149, 0.3) 100%)"
  };

  const liquidColor = liquidColors[imagePlaceholder] || "rgba(42, 127, 127, 0.2)";

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      
      {/* 1. Ambient Glow Backing */}
      <motion.div 
        className="absolute rounded-full filter blur-[50px] opacity-70 pointer-events-none"
        style={{
          background: glowColor,
          width: isDetailed ? "220px" : "140px",
          height: isDetailed ? "220px" : "140px",
        }}
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.65, 0.8, 0.65]
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut"
        }}
      />

      {/* 2. Frosted Container or Rendered Bottle */}
      <div className={`relative ${isDetailed ? "w-48 h-80" : "w-36 h-60"} flex items-center justify-center transition-all duration-300`}>
        {imageExists ? (
          // Load real image from folder once available
          <motion.img 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            src={imageSrc} 
            alt={`${brandName} ${flavor}`}
            className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
          />
        ) : (
          // High-fidelity vector SVG mockup: If Apple designed an Indian gut soda
          <div className="w-full h-full relative flex flex-col items-center justify-end">
            
            {/* Crown Cap */}
            <div className="w-6 h-3 bg-slate-400 rounded-t-sm border-b border-slate-500 shadow-sm z-20 flex justify-around px-0.5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-0.5 h-full bg-slate-500/50" />
              ))}
            </div>
            
            {/* Bottle Neck */}
            <div className="w-5 h-16 bg-white/20 border-x border-white/30 backdrop-blur-[1px] relative z-10">
              <div 
                className="absolute inset-x-0 bottom-0 top-6"
                style={{ background: liquidColor }}
              />
            </div>

            {/* Bottle Body with Frosted Glass look */}
            <div className="w-20 h-40 rounded-t-3xl rounded-b-xl border border-white/40 shadow-lg relative overflow-hidden bg-white/5 backdrop-blur-[4px] z-10 flex flex-col items-center justify-between py-6">
              
              {/* Refraction highlight */}
              <div className="absolute left-1 top-0 bottom-0 w-2 bg-white/20 rounded-l-3xl pointer-events-none" />

              {/* Glowing Liquid Inner */}
              <div 
                className="absolute inset-x-0 bottom-0 top-2 z-0 rounded-b-xl"
                style={{ 
                  background: liquidColor,
                  backdropFilter: "blur(2px)" 
                }}
              />

              {/* Minimal Apple-Style Label Guts */}
              <div className="z-10 text-center flex flex-col justify-between h-full w-full px-2">
                <span className="text-[7px] tracking-[0.25em] text-white/70 font-bold uppercase select-none">
                  {brandName}
                </span>

                <div className="my-auto">
                  <h4 className="text-sm font-extrabold text-white tracking-wide uppercase select-none drop-shadow-sm leading-none">
                    {flavor}
                  </h4>
                  <span className="text-[6px] tracking-widest text-white/50 block mt-0.5 uppercase font-medium">
                    Probiotic
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="w-6 h-[1px] bg-white/25 mx-auto" />
                  <span className="text-[5px] tracking-wider text-white/60 block font-light select-none">
                    BY TRELIS
                  </span>
                </div>
              </div>

            </div>

            {/* Base Refraction shadow */}
            <div className="w-16 h-2 bg-black/10 rounded-full filter blur-xs absolute -bottom-1 z-0" />
          </div>
        )}
      </div>

    </div>
  );
};

export default function ProductLabPage() {
  const router = useRouter();

  // Selected Brand Concept
  const [selectedBrand, setSelectedBrand] = useState<string>("ALIVE");
  const [customBrand, setCustomBrand] = useState<string>("");
  const currentBrand = customBrand.trim() !== "" ? customBrand.toUpperCase() : selectedBrand;

  // Selected SKU for detail overlay
  const [selectedProduct, setSelectedProduct] = useState<ProductSKU | null>(null);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("trelis_lab_cart");
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("trelis_lab_cart", JSON.stringify(newCart));
  };

  // Cart operations
  const addToCart = (product: ProductSKU) => {
    const newCart = [...cart];
    const existing = newCart.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      newCart.push({ product, quantity: 1 });
    }
    saveCart(newCart);
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, delta: number) => {
    const newCart = cart.map(item => {
      if (item.product.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[];
    saveCart(newCart);
  };

  const removeFromCart = (productId: string) => {
    const newCart = cart.filter(item => item.product.id !== productId);
    saveCart(newCart);
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleTabChange = (tab: NavTab) => {
    if (tab === "food") {
      router.push("/food");
    } else if (tab === "product-lab") {
      router.push("/product-lab");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F2] relative overflow-hidden select-none">
      
      {/* Main Layout Container */}
      <div className="flex flex-col min-h-screen">
        
        <Navbar activeTab="product-lab" setActiveTab={handleTabChange} />

        <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-24 md:pb-16 z-10 relative">
          
          {/* Header Area */}
          <div className="border-b border-black/[0.04] pb-6 mb-8 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="text-[10px] tracking-widest text-[#2A7F7F] font-bold uppercase bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-3 py-1.5 rounded-full inline-block mb-3">
                Trelis Probiotic Soda Line
              </span>
              <h1 className="text-3xl font-extralight text-slate-900 tracking-tight">
                The Product <span className="font-semibold text-slate-950">Development Lab</span>
              </h1>
              <p className="text-xs text-slate-500 font-light mt-1 max-w-xl leading-relaxed">
                If Apple designed a traditional Indian gut soda — slim frosted glass, single bold English names, low sugar, and a spore probiotic engine engineered for the hot climate.
              </p>
            </div>

            {/* Cart Trigger */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative px-5 py-2.5 bg-[#2A7F7F] text-white rounded-full text-xs font-semibold tracking-wider uppercase shadow-sm hover:bg-[#1e5c5c] transition-all flex items-center gap-2 cursor-pointer self-center md:self-auto"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Tester Kit</span>
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                {cartItemsCount}
              </span>
            </button>
          </div>

          {/* BRAND NAME TESTING PLAYGROUND */}
          <div className="bg-white/40 border border-black/[0.03] rounded-3xl p-5 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
            <div className="space-y-1 max-w-md">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-1.5">
                <Wind className="w-4 h-4 text-[#2A7F7F]" /> Brand Concept Playground
              </h3>
              <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                We are choosing a clean English word representing life, energy, and gut activity. Select a name below to preview it dynamically printed onto the mock frosted bottles.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {BRAND_NAMES.map(name => (
                <button
                  key={name}
                  onClick={() => {
                    setSelectedBrand(name);
                    setCustomBrand("");
                  }}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider transition-all cursor-pointer ${
                    currentBrand === name
                      ? "bg-slate-900 text-white"
                      : "bg-[#F7F6F2] text-slate-500 hover:bg-[#eae8df]"
                  }`}
                >
                  {name}
                </button>
              ))}

              <input 
                type="text"
                maxLength={10}
                placeholder="Custom English Name..."
                value={customBrand}
                onChange={(e) => setCustomBrand(e.target.value)}
                className="px-3 py-1.5 rounded-full text-[10px] font-medium tracking-wider bg-white border border-slate-200 outline-none text-slate-800 placeholder-slate-400 w-32 focus:border-[#2A7F7F]"
              />
            </div>
          </div>

          {/* FLAGSHIP PRODUCT CARD GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {MOCK_PRODUCTS.map(product => (
              <motion.div
                key={product.id}
                layout
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedProduct(product)}
                className="bg-white/40 border border-black/[0.03] rounded-3xl p-6 flex flex-col sm:flex-row gap-6 items-stretch hover:border-[#2A7F7F]/20 transition-all hover:shadow-[0_8px_32px_rgba(0,0,0,0.02)] cursor-pointer relative group overflow-hidden"
              >
                {/* Amber Light Ambient hover effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `radial-gradient(circle at center, ${product.glowColor} 0%, transparent 70%)` }}
                />

                {/* Left: Bottle Mockup rendering */}
                <div className="w-full sm:w-36 h-60 bg-slate-900/5 border border-black/[0.01] rounded-2xl flex items-center justify-center relative flex-shrink-0">
                  <BottleVisualizer 
                    brandName={currentBrand}
                    flavor={product.name}
                    glowColor={product.glowColor}
                    accentColor={product.accentColor}
                    imagePlaceholder={product.imagePlaceholder}
                  />
                  <span className="absolute bottom-2.5 text-[8px] font-bold text-[#2A7F7F] bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-2 py-0.5 rounded-full uppercase tracking-widest">
                    {product.badge}
                  </span>
                </div>

                {/* Right: SKU Brief */}
                <div className="flex-1 flex flex-col justify-between z-10">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[8px] font-bold uppercase tracking-widest text-[#2A7F7F]">
                          {product.replaces}
                        </span>
                        <h3 className="text-xl font-light text-slate-900">
                          {currentBrand} · <span className="font-semibold text-slate-950">{product.name}</span>
                        </h3>
                      </div>
                      <span className="text-sm font-bold text-slate-800">
                        ₹{product.price}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 font-light leading-relaxed line-clamp-3">
                      {product.description}
                    </p>

                    {/* Specs Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[8px] bg-slate-100 text-slate-500 font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                        {product.specs.cfu.split(" ")[0]} {product.specs.cfu.split(" ")[1]} CFU
                      </span>
                      <span className="text-[8px] bg-slate-100 text-slate-500 font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                        LOW SUGAR
                      </span>
                      <span className="text-[8px] bg-slate-100 text-slate-500 font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                        GLASS
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase flex items-center gap-1 group-hover:text-[#2A7F7F] transition-colors">
                      Deep Dive Specs <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="px-4 py-2 bg-slate-950 text-white rounded-full text-[9px] font-bold tracking-wider uppercase hover:bg-[#2A7F7F] transition-all cursor-pointer"
                    >
                      Add to Box
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* THE BRAND MOAT & FORMULA INFO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/20 border border-black/[0.02] rounded-3xl p-6 shadow-sm">
            <div className="space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#2A7F7F]/10 flex items-center justify-center">
                <Beaker className="w-4 h-4 text-[#2A7F7F]" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">
                The Hybrid Formula
              </h4>
              <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                We combine the complex taste of a wild ginger-bug fermentation base with a stable, documented spore probiotic. Real taste, commercial safety.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#2A7F7F]/10 flex items-center justify-center">
                <Thermometer className="w-4 h-4 text-[#2A7F7F]" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">
                Shelf-Stable (No Fridge)
              </h4>
              <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                By seeding <strong>Bacillus coagulans MTCC 5856</strong> (a spore probiotic), our active bugs form armor-like endospores to survive 12+ months in room-temperature heat.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#2A7F7F]/10 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-[#2A7F7F]" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">
                FSSAI Compliant Science
              </h4>
              <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                We design strictly to FSSAI Schedule VII guidelines. Every batch guarantees over 100 million live CFU in every serving, verified by open lab sheets.
              </p>
            </div>
          </div>

        </main>

        {/* APPLE-STYLE SPLIT-SCREEN DETAILED MODAL */}
        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs cursor-zoom-out"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="bg-[#F7F6F2] w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative z-10 max-h-[90vh] flex flex-col md:flex-row items-stretch"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 p-2 bg-black/5 hover:bg-black/10 text-slate-600 rounded-full cursor-pointer z-30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Left Panel: Animated Bottle Visualizer & Amber Ambient Glow */}
                <div className="md:w-[40%] bg-slate-950/5 flex flex-col items-center justify-center p-8 border-r border-black/[0.03] min-h-[300px] relative overflow-hidden">
                  <div className="absolute top-4 left-4">
                    <span className="text-[9px] tracking-widest text-[#2A7F7F] font-bold uppercase bg-white/80 border border-black/[0.04] px-2 py-0.5 rounded-full select-none">
                      {selectedProduct.replaces}
                    </span>
                  </div>

                  <BottleVisualizer 
                    brandName={currentBrand}
                    flavor={selectedProduct.name}
                    glowColor={selectedProduct.glowColor}
                    accentColor={selectedProduct.accentColor}
                    imagePlaceholder={selectedProduct.imagePlaceholder}
                    isDetailed={true}
                  />

                  {/* Pricing tag */}
                  <div className="mt-4 text-center z-10">
                    <span className="text-xl font-light text-slate-900">MRP ₹{selectedProduct.price}</span>
                    <span className="text-[9px] text-slate-400 block tracking-wider uppercase font-medium">Value-Premium Slot</span>
                  </div>
                </div>

                {/* Right Panel: Clean Typography Spec Sheet */}
                <div className="md:w-[60%] p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
                  <div className="space-y-6">
                    {/* Header */}
                    <div>
                      <span className="text-[10px] tracking-wider text-[#2A7F7F] font-bold uppercase select-none">
                        FLAGSHIP PRODUCT SPEC SHEET
                      </span>
                      <h2 className="text-2xl font-extralight text-slate-900 mt-1">
                        {currentBrand} · <span className="font-semibold text-slate-950">{selectedProduct.name}</span>
                      </h2>
                      <p className="text-xs text-slate-400 font-light mt-0.5 italic">
                        {selectedProduct.tagline}
                      </p>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">
                        Sensory & Craft Profile
                      </h4>
                      <p className="text-xs text-slate-600 font-light leading-relaxed">
                        {selectedProduct.description}
                      </p>
                    </div>

                    {/* Scientific Moat Specifications */}
                    <div className="bg-white/50 border border-black/[0.02] rounded-2xl p-4 space-y-3">
                      <h4 className="text-[10px] font-bold text-slate-950 uppercase tracking-widest flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5 text-[#2A7F7F]" /> Probiotic Engineering Ledger
                      </h4>
                      <div className="grid grid-cols-2 gap-3 text-[11px]">
                        <div>
                          <span className="text-slate-400 font-light block">Target CFU:</span>
                          <span className="text-slate-800 font-bold">{selectedProduct.specs.cfu.split(" ").slice(0,2).join(" ")}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 font-light block">Sugar Content:</span>
                          <span className="text-slate-800 font-medium">{selectedProduct.specs.sugar}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 font-light block">Calories:</span>
                          <span className="text-slate-800 font-medium">{selectedProduct.specs.calories}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 font-light block">Stability:</span>
                          <span className="text-slate-800 font-medium">{selectedProduct.specs.shelfLife}</span>
                        </div>
                      </div>
                    </div>

                    {/* Ingredients List */}
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">
                        Clean Label Ingredients
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProduct.ingredients.map((ing, index) => (
                          <span key={index} className="text-[9px] bg-slate-100 border border-black/[0.02] text-slate-700 px-2 py-0.5 rounded-full">
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Sourcing Science */}
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">
                        Gut Science Highlight
                      </h4>
                      <p className="text-xs text-slate-500 font-light leading-relaxed">
                        {selectedProduct.scienceHighlight}
                      </p>
                    </div>
                  </div>

                  {/* Add to Box CTA */}
                  <div className="mt-8 pt-4 border-t border-black/[0.04] flex items-center justify-between gap-4">
                    <div className="text-[10px] text-slate-400 leading-normal font-light">
                      *Packaged in 250ml inert glass bottles to preserve natural carbonation.
                    </div>
                    <button
                      onClick={() => {
                        addToCart(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className="px-6 py-2.5 bg-[#2A7F7F] text-white rounded-full text-[10px] font-bold tracking-wider uppercase hover:bg-[#1e5c5c] transition-all cursor-pointer flex items-center gap-2"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Box</span>
                    </button>
                  </div>

                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* SIDE DRAWER CART */}
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
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest">
                      Tester Box Configuration
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
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Box is empty</span>
                      <p className="text-[10px] text-slate-400 font-light px-6 leading-relaxed">
                        Add individual sodas to configure your premium custom gut-health tester pack.
                      </p>
                    </div>
                  ) : (
                    cart.map(item => (
                      <div 
                        key={item.product.id}
                        className="bg-white/50 border border-black/[0.02] rounded-2xl p-4 flex gap-3 items-center justify-between"
                      >
                        <div className="flex-1">
                          <h4 className="text-xs font-bold text-slate-900 leading-tight">
                            {currentBrand} · {item.product.name}
                          </h4>
                          <span className="text-[10px] text-slate-500 block mt-0.5">
                            ₹{item.product.price} each · {item.product.badge}
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
                        Subtotal Amount:
                      </span>
                      <span className="text-base font-bold text-slate-900">
                        ₹{cartTotal}
                      </span>
                    </div>

                    <div className="bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 rounded-xl p-3 flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2A7F7F] flex-shrink-0 mt-0.5" />
                      <p className="text-[9px] text-[#2A7F7F] font-medium leading-relaxed">
                        Each tester box features carbon-insulated packing to preserve glass bottles. Checkouts are simulated locally on this development hub.
                      </p>
                    </div>

                    <button
                      onClick={() => alert("Checkouts are simulated on this prototype platform. Cart data stays local to your browser.")}
                      className="w-full py-3 bg-[#2A7F7F] text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#1e5c5c] transition-all cursor-pointer text-center"
                    >
                      Order Tester Box (Mock)
                    </button>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="w-full text-center py-8 pb-10 text-[10px] tracking-widest text-slate-400 font-light select-none border-t border-black/[0.02] bg-white/20 mt-auto">
          BUILT IN THE OPEN. ONE BATCH AT A TIME.
        </footer>

      </div>
    </div>
  );
}
