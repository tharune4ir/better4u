"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  X, 
  ArrowRight,
  Check,
  ChevronRight,
  Info,
  Sparkles,
  Award,
  ChevronDown,
  Volume2,
  VolumeX
} from "lucide-react";
import Navbar, { NavTab } from "@/components/Navbar";
import { MOCK_PRODUCTS, ProductSKU } from "@/lib/store-data";

interface CartItem {
  product: ProductSKU;
  quantity: number;
}

// 1. Ambient Carbonation Bubbles component for backgrounds
const CarbonationBubbles = ({ color }: { color: string }) => {
  const [bubbles, setBubbles] = useState<{ id: number; x: number; size: number; delay: number; duration: number }[]>([]);
  
  useEffect(() => {
    // Generate random bubble positions
    const items = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      size: Math.random() * 4 + 2, // 2px to 6px
      delay: Math.random() * 5,
      duration: Math.random() * 5 + 4
    }));
    setBubbles(items);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
      {bubbles.map(bubble => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            left: `${bubble.x}%`,
            width: bubble.size,
            height: bubble.size,
            backgroundColor: color,
            bottom: "-10px",
          }}
          animate={{
            y: ["0vh", "-100vh"],
            opacity: [0, 0.7, 0.7, 0],
            scale: [1, 1.2, 0.8]
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

// 2. High-fidelity dynamic glassmorphic bottle renderer
const FrostedBottle = ({ 
  flavor, 
  glowColor, 
  accentColor, 
  imagePlaceholder,
  isDetailed = false,
  showBack = false
}: { 
  flavor: string; 
  glowColor: string; 
  accentColor: string; 
  imagePlaceholder: string;
  isDetailed?: boolean;
  showBack?: boolean;
}) => {
  const fileMappings: Record<string, { front: string; back?: string }> = {
    lime: { front: "/all_image_files/product-lab/1.1_lime.jpeg", back: "/all_image_files/product-lab/1.2_lime.jpeg" },
    ginger: { front: "/all_image_files/product-lab/2.1_ginger.jpeg", back: "/all_image_files/product-lab/2.2_ginger.jpeg" },
    spice: { front: "/all_image_files/product-lab/3.1_spice.jpeg", back: "/all_image_files/product-lab/3.2_spice.jpeg" },
    berry: { front: "/all_image_files/product-lab/4.1_berry.jpeg", back: "/all_image_files/product-lab/4.2_berry.jpeg" },
  };

  const imageSrc = fileMappings[imagePlaceholder] 
    ? (showBack ? (fileMappings[imagePlaceholder].back || fileMappings[imagePlaceholder].front) : fileMappings[imagePlaceholder].front)
    : "";

  const hasImage = !!imageSrc;
  
  if (typeof window !== "undefined") {
    console.log(`[FrostedBottle Debug] flavor: ${flavor}, imagePlaceholder: ${imagePlaceholder}, imageSrc: ${imageSrc}, hasImage: ${hasImage}`);
  }

  const liquidColors: Record<string, string> = {
    lime: "linear-gradient(180deg, rgba(163, 230, 53, 0.35) 0%, rgba(42, 127, 127, 0.2) 100%)",
    ginger: "linear-gradient(180deg, rgba(245, 158, 11, 0.45) 0%, rgba(180, 83, 9, 0.2) 100%)",
    spice: "linear-gradient(180deg, rgba(180, 83, 9, 0.45) 0%, rgba(120, 53, 4, 0.25) 100%)",
    berry: "linear-gradient(180deg, rgba(139, 92, 246, 0.45) 0%, rgba(76, 29, 149, 0.2) 100%)"
  };

  const liquidColor = liquidColors[imagePlaceholder] || "rgba(42, 127, 127, 0.2)";

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none select-none">
      {/* Dynamic Ambient Glow Behind Bottle */}
      <motion.div 
        className="absolute rounded-full filter blur-[45px] opacity-60"
        style={{
          background: glowColor,
          width: isDetailed ? "250px" : "150px",
          height: isDetailed ? "250px" : "150px",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.55, 0.7, 0.55]
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut"
        }}
      />

      <div className="relative w-full h-full flex items-center justify-center">
        {hasImage ? (
          <motion.img 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            src={imageSrc} 
            alt={`ALIVE ${flavor}`}
            className="w-full h-full object-cover rounded-2xl drop-shadow-[0_8px_16px_rgba(0,0,0,0.06)]"
          />
        ) : (
          /* Custom Frosted Glass Soda Bottle Vector Graphic */
          <div className={`${isDetailed ? "w-44 h-80" : "w-28 h-52"} relative flex flex-col items-center justify-end`}>
            
            {/* Crown Cap */}
            <div className="w-5 h-2.5 bg-gradient-to-r from-slate-400 to-slate-500 rounded-t-sm border-b border-slate-600 shadow-sm z-20 flex justify-around px-0.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-[1px] h-full bg-slate-600/30" />
              ))}
            </div>
            
            {/* Bottle Neck */}
            <div className="w-4 h-12 bg-white/10 border-x border-white/20 backdrop-blur-[1px] relative z-10">
              <div className="absolute inset-x-0 bottom-0 top-3" style={{ background: liquidColor }} />
            </div>

            {/* Bottle Body (Frosted Finish) */}
            <div className="w-16 h-36 rounded-t-2xl rounded-b-lg border border-white/30 shadow-lg relative overflow-hidden bg-white/5 backdrop-blur-[3.5px] z-10 flex flex-col items-center justify-between py-5">
              
              {/* Highlight refraction sheen */}
              <div className="absolute left-0.5 top-0 bottom-0 w-1.5 bg-white/15 rounded-l-2xl pointer-events-none" />

              {/* Glowing Liquid */}
              <div className="absolute inset-x-0 bottom-0 top-1.5 z-0 rounded-b-lg" style={{ background: liquidColor, backdropFilter: "blur(1px)" }} />

              {/* Label */}
              <div className="z-10 text-center flex flex-col justify-between h-full w-full px-1">
                <span className="text-[6px] tracking-[0.3em] text-white/60 font-bold uppercase">
                  ALIVE
                </span>

                <div className="my-auto">
                  <h4 className="text-xs font-black text-white tracking-wider uppercase leading-none drop-shadow-xs">
                    {flavor}
                  </h4>
                  <span className="text-[5px] tracking-widest text-white/40 block mt-0.5 uppercase">
                    PROBIOTIC
                  </span>
                </div>

                <div className="space-y-0.5">
                  <div className="w-4 h-[0.5px] bg-white/20 mx-auto" />
                  <span className="text-[4px] tracking-wider text-white/50 block font-light">
                    BY TRELIS
                  </span>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function ProductLabPage() {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Selected Product for Specs Modal
  const [selectedProduct, setSelectedProduct] = useState<ProductSKU | null>(null);

  // Back view toggle in modal
  const [modalShowBack, setModalShowBack] = useState(false);

  // Video controller states
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reset modal view direction on product change
  useEffect(() => {
    setModalShowBack(false);
  }, [selectedProduct]);

  // Video mute/unmute action
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsVideoMuted(videoRef.current.muted);
    }
  };

  // Custom 6-Pack Box Builder State
  const [boxSlots, setBoxSlots] = useState<(ProductSKU | null)[]>([null, null, null, null, null, null]);

  // Load cart and box configuration on mount
  useEffect(() => {
    console.log("[ProductLabPage] Component mounted. Initializing video playback...");
    const savedCart = localStorage.getItem("trelis_lab_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error(e);
      }
    }

    // Force background video to play
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => console.log("[ProductLabPage] Background video started playing successfully."))
        .catch(err => console.warn("[ProductLabPage] Autoplay blocked or failed for background video:", err));
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("trelis_lab_cart", JSON.stringify(newCart));
  };

  // Cart actions
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

  // Box Builder Actions
  const addToBox = (product: ProductSKU) => {
    const emptyIndex = boxSlots.findIndex(slot => slot === null);
    if (emptyIndex !== -1) {
      const newSlots = [...boxSlots];
      newSlots[emptyIndex] = product;
      setBoxSlots(newSlots);
    } else {
      alert("Your tester box is full! Remove an item to swap, or add the configured pack to your cart.");
    }
  };

  const removeFromBox = (index: number) => {
    const newSlots = [...boxSlots];
    newSlots[index] = null;
    setBoxSlots(newSlots);
  };

  const addBoxToCart = () => {
    const itemsInBox = boxSlots.filter(Boolean) as ProductSKU[];
    if (itemsInBox.length === 0) return;
    
    // Add the pack as a special custom SKU or add the individual bottles with quantity
    const newCart = [...cart];
    itemsInBox.forEach(product => {
      const existing = newCart.find(item => item.product.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        newCart.push({ product, quantity: 1 });
      }
    });
    saveCart(newCart);
    setBoxSlots([null, null, null, null, null, null]);
    setIsCartOpen(true);
  };

  const boxCount = boxSlots.filter(Boolean).length;
  const isBoxFull = boxCount === 6;

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
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 inset-x-0 h-[1000px] bg-gradient-to-b from-[#2A7F7F]/5 via-transparent to-transparent pointer-events-none z-0" />

      <div className="flex flex-col min-h-screen">
        
        <Navbar activeTab="product-lab" setActiveTab={handleTabChange} />

        <main className="flex-grow">

        {/* ==================== ACT 1: THE REVELATION (Cinematic Hero) ==================== */}
        <section ref={heroRef} className="relative min-h-[92vh] w-full flex flex-col justify-center items-center px-4 py-16 text-center overflow-hidden z-10">
          
          {/* Background Ambient Cinematic Video */}
          <div className="absolute inset-0 w-full h-full z-0 overflow-hidden select-none pointer-events-none">
            <video 
              ref={videoRef}
              src="/all_image_files/product-lab/1_video1.mp4" 
              className="w-full h-full object-cover opacity-[0.22] transition-opacity duration-1000"
              loop
              playsInline
              autoPlay
              muted={true}
            />
            {/* Vignette and blending overlays to merge loop edges and ensure crisp typography contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#F7F6F2]/20 via-[#F7F6F2]/75 to-[#F7F6F2] pointer-events-none" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#F7F6F2]/50 pointer-events-none" />
          </div>

          <CarbonationBubbles color="rgba(42, 127, 127, 0.12)" />
          
          <div className="max-w-3xl space-y-8 relative z-10">
            <motion.span 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[10px] tracking-[0.3em] text-[#2A7F7F] font-bold uppercase bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-4 py-1.5 rounded-full inline-block"
            >
              ALIVE by Trelis
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-extralight text-slate-900 tracking-tight leading-[1.1] px-4"
            >
              A new state of <span className="font-semibold text-slate-950 block sm:inline">living carbonation</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm sm:text-base text-slate-500 font-light max-w-xl mx-auto leading-relaxed px-2"
            >
              We took the everyday carbonated soft drink, stripped away the chemical sweeteners, and rebuilt it. Real organic juices, warm spices, and millions of active gut cultures inside premium frosted glass.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a 
                href="#range"
                className="px-6 py-3 bg-[#2A7F7F] text-white rounded-full text-xs font-semibold tracking-widest uppercase shadow-md hover:bg-[#1e5c5c] hover:shadow-lg transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Explore the Range</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
              </a>

              <button 
                onClick={toggleMute}
                className="px-6 py-3 bg-slate-900 text-white rounded-full text-xs font-semibold tracking-widest uppercase shadow-md hover:bg-black hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                {isVideoMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    <span>Unmute Film</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Mute Film</span>
                  </>
                )}
              </button>

              <button 
                onClick={() => setIsCartOpen(true)}
                className="px-6 py-3 bg-white/60 border border-black/[0.04] text-slate-800 rounded-full text-xs font-semibold tracking-widest uppercase hover:bg-white hover:shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#2A7F7F]" />
                <span>Custom Tester Box</span>
                {cartItemsCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#2A7F7F] text-white flex items-center justify-center text-[9px] font-bold">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </motion.div>
          </div>

          {/* Large Floating Hero Bottle Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.4 }}
            className="w-72 h-72 sm:w-[400px] sm:h-[400px] mt-12 relative hover:scale-[1.02] transition-transform duration-300 rounded-3xl shadow-2xl border border-black/[0.03] overflow-hidden bg-white z-10"
          >
            <FrostedBottle 
              flavor="LIME" 
              glowColor="rgba(163, 230, 53, 0.15)" 
              accentColor="#2A7F7F" 
              imagePlaceholder="lime"
              isDetailed={true} 
            />
          </motion.div>
          
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce opacity-40">
            <span className="text-[8px] tracking-[0.2em] uppercase font-bold text-slate-400">Scroll to Explore</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 mt-1" />
          </div>
        </section>

        {/* ==================== ACT 2: THE RANGE (Immersive Flavour Rows) ==================== */}
        <section id="range" className="relative w-full z-10 py-16 space-y-24 bg-white/20 border-y border-black/[0.01]">
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center space-y-3 mb-16">
              <span className="text-[10px] tracking-[0.2em] text-[#2A7F7F] font-bold uppercase">The Founding Range</span>
              <h2 className="text-3xl font-extralight text-slate-900 tracking-tight">
                Four simple, <span className="font-semibold text-slate-950">sophisticated profiles</span>
              </h2>
              <p className="text-xs text-slate-500 font-light max-w-md mx-auto leading-relaxed">
                Replacing the carbonated drinks you already reach for, designed with real, local ingredients and live digestive cultures.
              </p>
            </div>
            
            {/* The 4 Immersive Flavor Rows */}
            <div className="space-y-32">
              {MOCK_PRODUCTS.map((product, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div 
                    key={product.id}
                    className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center justify-between gap-12 sm:gap-16`}
                  >
                    
                    {/* Immersive Bottle Frame with Ambient color gradient backing */}
                    <div className="w-full md:w-[45%] aspect-square flex items-center justify-center relative rounded-3xl overflow-hidden bg-[#F2F1EC] border border-black/[0.03] shadow-xs group cursor-pointer z-10">
                      <div className="absolute inset-0 w-full h-full hover:scale-[1.03] transition-transform duration-700 ease-out z-10">
                        <FrostedBottle 
                          flavor={product.name} 
                          glowColor={product.glowColor} 
                          accentColor={product.accentColor} 
                          imagePlaceholder={product.imagePlaceholder}
                        />
                      </div>

                      {/* Ambient floating elements representing taste notes */}
                      <div className="absolute top-4 left-4 text-[9px] tracking-widest text-slate-500 uppercase font-bold select-none opacity-85 z-20 bg-white/85 backdrop-blur-xs px-3 py-1 rounded-full border border-black/[0.03] shadow-3xs">
                        {product.replaces}
                      </div>
                    </div>

                    {/* Flavour copy/details side */}
                    <div className="w-full md:w-[50%] space-y-6 text-center md:text-left">
                      <div className="space-y-2">
                        <span className="text-[9px] font-bold text-[#2A7F7F] uppercase tracking-[0.2em] bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-3 py-1 rounded-full inline-block">
                          {product.badge}
                        </span>
                        <h3 className="text-4xl font-extralight text-slate-900 tracking-tight">
                          ALIVE <span className="font-semibold text-slate-950">{product.name}</span>
                        </h3>
                        <p className="text-xs text-[#2A7F7F] font-bold tracking-wider italic uppercase">
                          {product.tagline}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed max-w-lg mx-auto md:mx-0">
                        {product.description}
                      </p>

                      {/* Spec Badges */}
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        <span className="text-[10px] bg-white border border-black/[0.03] text-slate-700 px-3.5 py-1 rounded-full font-medium shadow-2xs">
                          {product.specs.cfu}
                        </span>
                        <span className="text-[10px] bg-white border border-black/[0.03] text-slate-700 px-3.5 py-1 rounded-full font-medium shadow-2xs">
                          {product.specs.sugar}
                        </span>
                        <span className="text-[10px] bg-white border border-black/[0.03] text-slate-700 px-3.5 py-1 rounded-full font-medium shadow-2xs">
                          {product.specs.calories}
                        </span>
                      </div>

                      {/* Taste Highlight Block */}
                      <div className="bg-white/40 border border-black/[0.02] rounded-2xl p-4 space-y-1.5 text-left shadow-2xs max-w-md mx-auto md:mx-0">
                        <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-[#2A7F7F]" /> Taste-First Notes
                        </h4>
                        <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                          {product.tasteHighlight}
                        </p>
                      </div>

                      {/* Interactive Buttons */}
                      <div className="pt-2 flex items-center justify-center md:justify-start gap-4">
                        <button
                          onClick={() => addToBox(product)}
                          className="px-6 py-2.5 bg-slate-950 text-white hover:bg-slate-800 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer shadow-xs"
                        >
                          Add to Tester Pack
                        </button>
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="text-[10px] font-bold tracking-widest uppercase text-slate-400 hover:text-[#2A7F7F] transition-colors flex items-center gap-1.5"
                        >
                          <span>Full Ingredients</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </section>


        {/* ==================== ACT 3: THE EXPERIMENT (Interactive Custom Box Builder) ==================== */}
        <section className="relative w-full z-10 py-20 px-4 sm:px-6 bg-gradient-to-b from-transparent to-[#2A7F7F]/5 border-t border-black/[0.01]">
          <div className="max-w-4xl mx-auto space-y-12">
            
            <div className="text-center space-y-3">
              <span className="text-[10px] tracking-[0.25em] text-[#2A7F7F] font-bold uppercase bg-[#2A7F7F]/5 border border-[#2A7F7F]/10 px-4 py-1.5 rounded-full inline-block">
                Interactive Customizer
              </span>
              <h2 className="text-3xl font-extralight text-slate-900 tracking-tight">
                Build your own <span className="font-semibold text-slate-950">6-Pack Tester Box</span>
              </h2>
              <p className="text-xs text-slate-500 font-light max-w-md mx-auto leading-relaxed">
                Experience the flavors first-hand. Click or drag flavors to fill up your 6-bottle testing crate. Get customized packaging and taste the future of carbonation.
              </p>
            </div>

            {/* Custom Crate Grid Container */}
            <div className="bg-[#EAE8DF] border border-black/[0.05] rounded-3xl p-6 sm:p-8 shadow-inner relative max-w-2xl mx-auto">
              
              {/* Carton Handle indicator */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-6 bg-[#D8D5C8] border-x border-t border-black/[0.04] rounded-t-xl flex items-center justify-center">
                <div className="w-16 h-2.5 bg-black/10 rounded-full" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 py-4">
                {boxSlots.map((slot, index) => {
                  return (
                    <div 
                      key={index}
                      className="aspect-[3/5] rounded-2xl border-2 border-dashed border-black/10 bg-white/20 flex flex-col items-center justify-center p-2 relative group transition-all duration-300 hover:border-black/25"
                    >
                      {slot ? (
                        /* Filled Bottle Slot */
                        <div className="w-full h-full flex flex-col items-center justify-between py-2">
                          <button
                            onClick={() => removeFromBox(index)}
                            className="absolute -top-1.5 -right-1.5 p-1 bg-rose-500 text-white rounded-full cursor-pointer shadow-xs scale-0 group-hover:scale-100 transition-transform duration-200 z-20 hover:bg-rose-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          
                          {/* Mini Bottle Visualizer */}
                          <div className="w-12 h-28 relative">
                            <FrostedBottle 
                              flavor={slot.name} 
                              glowColor={slot.glowColor} 
                              accentColor={slot.accentColor} 
                              imagePlaceholder={slot.imagePlaceholder} 
                            />
                          </div>

                          <div className="text-center z-10">
                            <span className="text-[9px] font-extrabold uppercase text-slate-800 tracking-wide block">{slot.name}</span>
                            <span className="text-[7px] text-slate-400 block tracking-widest font-light">₹60</span>
                          </div>
                        </div>
                      ) : (
                        /* Empty Slot */
                        <div className="flex flex-col items-center justify-center text-center space-y-1 text-slate-400">
                          <Plus className="w-5 h-5 opacity-40 animate-pulse" />
                          <span className="text-[8px] font-bold tracking-widest uppercase opacity-55">Empty</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Box status bar */}
              <div className="mt-6 pt-4 border-t border-black/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <span className="text-xs font-bold text-slate-800 tracking-wide block">
                    Crate Configuration: {boxCount} / 6 Bottles
                  </span>
                  <span className="text-[10px] text-slate-400 font-light">
                    {isBoxFull ? "Your tester pack is complete and ready to order." : "Select flavors above to fill your pack."}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {boxCount > 0 && (
                    <button
                      onClick={() => setBoxSlots([null, null, null, null, null, null])}
                      className="px-4 py-2 border border-black/10 hover:border-black/25 text-slate-500 rounded-full text-[9px] font-bold tracking-wider uppercase transition-all cursor-pointer"
                    >
                      Clear Pack
                    </button>
                  )}
                  <button
                    disabled={boxCount === 0}
                    onClick={addBoxToCart}
                    className={`px-6 py-2.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                      boxCount > 0
                        ? "bg-[#2A7F7F] text-white hover:bg-[#1e5c5c] shadow-sm"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add Box to Cart (₹{boxCount * 60})</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Quick Flavour Selector tray for box builder */}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mr-2">Click to insert:</span>
              {MOCK_PRODUCTS.map(product => (
                <button
                  key={product.id}
                  onClick={() => addToBox(product)}
                  className="px-4 py-2 bg-white hover:bg-[#eae8df] border border-black/[0.03] rounded-full text-[10px] font-bold tracking-wider uppercase text-slate-800 flex items-center gap-2 transition-all cursor-pointer shadow-3xs"
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: product.accentColor }} />
                  <span>{product.name}</span>
                </button>
              ))}
            </div>

          </div>
        </section>

      </main>

      {/* APPLE-STYLE INGREDIENTS SPEC SHEET OVERLAY */}
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

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="bg-[#F7F6F2] w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl relative z-10 max-h-[90vh] flex flex-col md:flex-row items-stretch"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 bg-black/5 hover:bg-black/10 text-slate-600 rounded-full cursor-pointer z-30 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Panel: Bottle render */}
              <div className="md:w-[40%] bg-slate-950/5 flex flex-col items-center justify-center p-8 border-r border-black/[0.03] min-h-[300px] relative overflow-hidden">
                <div className="absolute top-4 left-4">
                  <span className="text-[9px] tracking-widest text-[#2A7F7F] font-bold uppercase bg-white/80 border border-black/[0.04] px-2.5 py-0.5 rounded-full select-none">
                    {selectedProduct.replaces}
                  </span>
                </div>

                <FrostedBottle 
                  flavor={selectedProduct.name}
                  glowColor={selectedProduct.glowColor}
                  accentColor={selectedProduct.accentColor}
                  imagePlaceholder={selectedProduct.imagePlaceholder}
                  isDetailed={true}
                  showBack={modalShowBack}
                />

                <div className="mt-4 text-center z-10 flex flex-col items-center gap-2">
                  <div>
                    <span className="text-xl font-light text-slate-900">₹{selectedProduct.price}</span>
                    <span className="text-[9px] text-slate-400 block tracking-wider uppercase font-medium">Single 250ml Glass Bottle</span>
                  </div>

                  {/* Flip Toggle Button */}
                  {["lime", "ginger", "spice", "berry"].includes(selectedProduct.imagePlaceholder) && (
                    <button 
                      onClick={() => setModalShowBack(!modalShowBack)}
                      className="mt-2 px-4 py-1.5 bg-white hover:bg-slate-50 text-slate-800 border border-black/[0.06] rounded-full text-[9px] font-bold tracking-widest uppercase cursor-pointer transition-all hover:scale-105 shadow-3xs flex items-center gap-1 z-20"
                    >
                      <span>View {modalShowBack ? "Front" : "Back Label"}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Right Panel: Spec details */}
              <div className="md:w-[60%] p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
                <div className="space-y-6">
                  <div>
                    <span className="text-[9px] tracking-widest text-[#2A7F7F] font-bold uppercase select-none">
                      PRODUCT LEDGER
                    </span>
                    <h2 className="text-2xl font-extralight text-slate-900 mt-1">
                      ALIVE <span className="font-semibold text-slate-950">{selectedProduct.name}</span>
                    </h2>
                    <p className="text-xs text-slate-400 font-light mt-0.5 italic">
                      {selectedProduct.tagline}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">
                      Flavor Story & Sensation
                    </h4>
                    <p className="text-xs text-slate-600 font-light leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>

                  {/* Nutrition Specs */}
                  <div className="bg-white/50 border border-black/[0.02] rounded-2xl p-4 space-y-3 shadow-3xs">
                    <h4 className="text-[10px] font-bold text-slate-950 uppercase tracking-widest flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-[#2A7F7F]" /> Nutritional Index
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-[11px]">
                      <div>
                        <span className="text-slate-400 font-light block">Active Cultures:</span>
                        <span className="text-slate-800 font-bold">{selectedProduct.specs.cfu}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-light block">Carbohydrate / Sugar:</span>
                        <span className="text-slate-800 font-medium">{selectedProduct.specs.sugar}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-light block">Energy:</span>
                        <span className="text-slate-800 font-medium">{selectedProduct.specs.calories}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-light block">Key Benefit:</span>
                        <span className="text-slate-800 font-medium">{selectedProduct.specs.benefits}</span>
                      </div>
                    </div>
                  </div>

                  {/* Clean Ingredients list */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">
                      100% Sourced Ingredients
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProduct.ingredients.map((ing, idx) => (
                        <span key={idx} className="text-[9px] bg-slate-100 border border-black/[0.02] text-slate-700 px-2.5 py-0.5 rounded-full font-medium">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Scent & Sensation Details */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">
                      Tasting Palette Highlight
                    </h4>
                    <p className="text-xs text-slate-500 font-light leading-relaxed">
                      {selectedProduct.tasteHighlight}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-black/[0.04] flex items-center justify-between gap-4">
                  <div className="text-[9px] text-slate-400 leading-normal font-light">
                    *Packaged in custom 250ml inert glass bottles to preserve natural carbonation.
                  </div>
                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="px-5 py-2.5 bg-[#2A7F7F] text-white rounded-full text-[10px] font-bold tracking-wider uppercase hover:bg-[#1e5c5c] transition-all cursor-pointer flex items-center gap-2"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
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
                    Your Tester Pack
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
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Cart is empty</span>
                    <p className="text-[10px] text-slate-400 font-light px-6 leading-relaxed">
                      Select individual flavors or construct a custom 6-pack to try out the founding range.
                    </p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div 
                      key={item.product.id}
                      className="bg-white/50 border border-black/[0.02] rounded-2xl p-4 flex gap-3 items-center justify-between shadow-3xs"
                    >
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-slate-900 leading-tight">
                          ALIVE · {item.product.name}
                        </h4>
                        <span className="text-[10px] text-slate-500 block mt-0.5">
                          ₹{item.product.price} each · {item.product.badge.split(" ")[0]} {item.product.badge.split(" ")[1]}
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

                  <button
                    onClick={() => alert("Checkouts are simulated on this prototype platform. Cart data stays local to your browser.")}
                    className="w-full py-3 bg-[#2A7F7F] text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#1e5c5c] transition-all cursor-pointer text-center shadow-xs"
                  >
                    Place Mock Order
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
