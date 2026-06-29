"use client";

import React, { useState, useEffect } from "react";
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
  Filter, 
  ShieldAlert 
} from "lucide-react";
import Navbar, { NavTab } from "@/components/Navbar";
import { MOCK_PRODUCTS, ProductSKU } from "@/lib/store-data";

const IconMap: Record<string, React.ComponentType<any>> = {
  Droplet,
  Leaf,
  Flame,
  Activity,
  Sparkles
};

interface CartItem {
  product: ProductSKU;
  quantity: number;
}

export default function ProductLabPage() {
  const router = useRouter();

  // Store State
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

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
              <span className="text-[10px] tracking-widest text-[#2A7F7F] font-bold uppercase bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-3 py-1 rounded-full inline-block mb-3">
                Trelis Labs / Concept Catalog
              </span>
              <h1 className="text-3xl font-extralight text-slate-900 tracking-tight">
                Better-for-you <span className="font-semibold text-slate-950">Product Lab</span>
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
          BUILT IN THE OPEN. ONE BATCH AT A TIME.
        </footer>

      </div>
    </div>
  );
}
