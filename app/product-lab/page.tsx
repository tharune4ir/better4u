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
  VolumeX,
  RefreshCw,
  Eye,
  Leaf,
  FlaskConical,
  Droplets,
  UtensilsCrossed,
  Play
} from "lucide-react";
import Navbar, { NavTab } from "@/components/Navbar";
import { MOCK_PRODUCTS, ProductSKU } from "@/lib/store-data";

// Recipe pairings: product id → relevant recipe IDs + labels from the Recipe Hub
const PRODUCT_RECIPE_PAIRINGS: Record<string, { id: string; title: string; tag: string }[]> = {
  // ALIVE — probiotic sodas pair with ferment-forward recipes
  "alive-lime":    [{ id: "R8",  title: "Spiced Neer-Mor",           tag: "No-cook" }, { id: "R12", title: "Jeera–Ajwain–Saunf Tea", tag: "Quick" }, { id: "F1",  title: "Fermented Kanji Rice",       tag: "Ferment" }],
  "alive-ginger":  [{ id: "R8",  title: "Spiced Neer-Mor",           tag: "No-cook" }, { id: "R12", title: "Jeera–Ajwain–Saunf Tea", tag: "Quick" }, { id: "R10", title: "Sattu Sharbat Tonic",         tag: "No-cook" }],
  "alive-spice":   [{ id: "R12", title: "Jeera–Ajwain–Saunf Tea",   tag: "Quick"  }, { id: "R1",  title: "Foxtail–Moong Khichdi",   tag: "One-pot" }, { id: "R5",  title: "Any-Vegetable Sabzi",          tag: "Mains"  }],
  "alive-berry":   [{ id: "R9",  title: "Purple Polyphenol Smoothie",tag: "No-cook" }, { id: "R11", title: "Probiotic Beet Kanji",    tag: "Ferment" }, { id: "R6",  title: "Curd–Berry–Seed Bowl",        tag: "Breakfast" }],
  // JOSH — prebiotic sodas pair with fibre-rich meals
  "josh-kala-khatta":  [{ id: "R9",  title: "Purple Polyphenol Smoothie", tag: "No-cook" }, { id: "F7", title: "Spiced Beet-Carrot Kanji", tag: "Ferment" }, { id: "R4",  title: "Gongura Pappu",              tag: "Mains"  }],
  "josh-masala-cola":  [{ id: "R1",  title: "Foxtail–Moong Khichdi",     tag: "One-pot" }, { id: "R3", title: "Universal Dal + Brown Rice",tag: "Mains"  }, { id: "R5",  title: "Any-Vegetable Sabzi",        tag: "Mains"  }],
  "josh-gulab":        [{ id: "R6",  title: "Curd–Berry–Seed Bowl",       tag: "Breakfast" }, { id: "R7", title: "Ragi Ambali Porridge",    tag: "Breakfast" }, { id: "F8", title: "Traditional Ragi Koozh",     tag: "Ferment" }],
  "josh-santra":       [{ id: "R6",  title: "Curd–Berry–Seed Bowl",       tag: "Breakfast" }, { id: "R2", title: "Moong Pesarattu Crepe",   tag: "Breakfast" }, { id: "R10", title: "Sattu Sharbat Tonic",       tag: "No-cook" }],
  // BATCH — fresh ferments naturally pair with their DIY versions
  "batch-kanji":             [{ id: "F7",  title: "Spiced Beet-Carrot Kanji",   tag: "Ferment" }, { id: "F3",  title: "Lacto-Fermented Root Veg", tag: "Ferment" }, { id: "R11", title: "Probiotic Beet Kanji",         tag: "Ferment" }],
  "batch-strawberry-kefir":  [{ id: "R6",  title: "Curd–Berry–Seed Bowl",      tag: "Breakfast" }, { id: "F4",  title: "Simple Water Kefir",       tag: "Ferment" }, { id: "R7",  title: "Ragi Ambali Porridge",         tag: "Breakfast" }],
  "batch-jamun-lime-kombucha":[{ id: "R15", title: "Wild Tea Kombucha",          tag: "Ferment" }, { id: "R9",  title: "Purple Polyphenol Smoothie",tag: "No-cook" }, { id: "F7",  title: "Spiced Beet-Carrot Kanji",    tag: "Ferment" }],
  // PULP — gut smoothies pair with high-fibre bowls & breakfast
  "pulp-green-reset":    [{ id: "R6",  title: "Curd–Berry–Seed Bowl",       tag: "Breakfast" }, { id: "R9",  title: "Purple Polyphenol Smoothie", tag: "No-cook" }, { id: "R2",  title: "Moong Pesarattu Crepe",        tag: "Breakfast" }],
  "pulp-cacao-daily":    [{ id: "R6",  title: "Curd–Berry–Seed Bowl",       tag: "Breakfast" }, { id: "R10", title: "Sattu Sharbat Tonic",        tag: "No-cook" }, { id: "R7",  title: "Ragi Ambali Porridge",          tag: "Breakfast" }],
  "pulp-papaya-sunrise": [{ id: "R6",  title: "Curd–Berry–Seed Bowl",       tag: "Breakfast" }, { id: "R7",  title: "Ragi Ambali Porridge",       tag: "Breakfast" }, { id: "F8",  title: "Traditional Ragi Koozh",       tag: "Ferment" }],
  // STEEP — digestif teas pair with warming meals
  "steep-three-root":    [{ id: "R12", title: "Jeera–Ajwain–Saunf Tea",    tag: "Quick"  }, { id: "R1",  title: "Foxtail–Moong Khichdi",    tag: "One-pot" }, { id: "R3",  title: "Universal Dal + Brown Rice",   tag: "Mains"  }],
  "steep-tulsi-ginger":  [{ id: "R12", title: "Jeera–Ajwain–Saunf Tea",    tag: "Quick"  }, { id: "R7",  title: "Ragi Ambali Porridge",      tag: "Breakfast" }, { id: "R8",  title: "Spiced Neer-Mor",              tag: "No-cook" }],
  "steep-ashwagandha":   [{ id: "R1",  title: "Foxtail–Moong Khichdi",      tag: "One-pot" }, { id: "R3",  title: "Universal Dal + Brown Rice", tag: "Mains"  }, { id: "R8",  title: "Spiced Neer-Mor",              tag: "No-cook" }],
  // GRIT — whole-food bars pair with ferments & mains
  "grit-ragi-date":      [{ id: "F6",  title: "Millet Idli & Dosa Batter",  tag: "Ferment" }, { id: "R7",  title: "Ragi Ambali Porridge",      tag: "Breakfast" }, { id: "R2",  title: "Moong Pesarattu Crepe",        tag: "Breakfast" }],
  "grit-trail-mix":      [{ id: "R6",  title: "Curd–Berry–Seed Bowl",       tag: "Breakfast" }, { id: "R10", title: "Sattu Sharbat Tonic",        tag: "No-cook" }, { id: "R2",  title: "Moong Pesarattu Crepe",        tag: "Breakfast" }],
  "grit-oat-cocoa":      [{ id: "R6",  title: "Curd–Berry–Seed Bowl",       tag: "Breakfast" }, { id: "R7",  title: "Ragi Ambali Porridge",       tag: "Breakfast" }, { id: "F5",  title: "Steamed Besan Dhokla",         tag: "Ferment" }],
};


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

// 1.5. Lazy Loaded Video Player Component
const LazyVideo = ({ 
  src, 
  poster, 
  className = "" 
}: { 
  src: string; 
  poster: string; 
  className?: string;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.play().catch(err => console.warn("Video play failed:", err));
    }
  }, [isPlaying]);

  return (
    <div className={`relative w-full h-full bg-black flex items-center justify-center overflow-hidden ${className}`}>
      {!isPlaying ? (
        <>
          {/* Poster Image */}
          <img 
            src={poster} 
            alt="Video Poster" 
            className="w-full h-full object-cover opacity-90 transition-opacity hover:opacity-100 duration-[500ms]" 
            loading="lazy"
          />
          {/* Light Play Control Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/15 transition-colors hover:bg-black/30">
            <button
              onClick={handlePlay}
              className="p-4 bg-white/80 backdrop-blur-md hover:bg-white text-slate-800 rounded-full shadow-lg transition-all transform hover:scale-110 cursor-pointer flex items-center justify-center border border-white/20 z-10"
              aria-label="Play video"
            >
              <Play className="w-5 h-5 fill-slate-800 translate-x-[1px]" />
            </button>
          </div>
        </>
      ) : (
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover animate-fade-in"
          controls
          autoPlay
          muted
          playsInline
          preload="none"
        />
      )}
    </div>
  );
};

// 2. High-quality dynamic glassmorphic bottle renderer
const FrostedBottle = ({ 
  flavor, 
  glowColor, 
  accentColor, 
  imagePlaceholder,
  isDetailed = false,
  showBack = false,
  brandFolder = "1_alive_concept_brand",
  brandName = "ALIVE",
  onZoom
}: { 
  flavor: string; 
  glowColor: string; 
  accentColor: string; 
  imagePlaceholder: string;
  isDetailed?: boolean;
  showBack?: boolean;
  brandFolder?: string;
  brandName?: string;
  onZoom?: (src: string) => void;
}) => {
  // Determine dynamic image source paths based on folder structure
  let frontSrc = "";
  let backSrc = "";

  if (brandFolder === "1_alive_concept_brand") {
    const mappings: Record<string, { front: string; back: string }> = {
      lime: { front: "1.1_lime.jpeg", back: "1.2_lime.jpeg" },
      ginger: { front: "2.1_ginger.jpeg", back: "2.2_ginger.jpeg" },
      spice: { front: "3.1_spice.jpeg", back: "3.2_spice.jpeg" },
      berry: { front: "4.1_berry.jpeg", back: "4.2_berry.jpeg" }
    };
    const map = mappings[imagePlaceholder] || mappings.lime;
    frontSrc = `/all_image_files/product-lab/${brandFolder}/${map.front}`;
    backSrc = `/all_image_files/product-lab/${brandFolder}/${map.back}`;
  } else if (brandFolder === "2_josh_concept_brand") {
    const filenames: Record<string, string> = {
      "kala-khatta": "1.1_kala-khatta.jpeg",
      "masala-cola": "1.2_masala-cola.jpeg",
      "gulab": "1.3_gulab.jpeg",
      "santra": "1.4_santra.jpeg"
    };
    const file = filenames[imagePlaceholder] || "1.1_kala-khatta.jpeg";
    frontSrc = `/all_image_files/product-lab/${brandFolder}/${file}`;
    backSrc = frontSrc;
  } else if (brandFolder === "3_batch_concept brand") {
    const filenames: Record<string, string> = {
      "kanji": "1.1_kanji.jpeg",
      "strawberry-kefir": "1.2_strawberry-kefir.jpeg",
      "jamun-lime-kombucha": "1.3_jamun-mine-kombucha.jpeg",
      "coconut-water-kefir": "1.4_coconut-water-kefir.jpeg"
    };
    const file = filenames[imagePlaceholder] || "1.1_kanji.jpeg";
    frontSrc = `/all_image_files/product-lab/${brandFolder}/${file}`;
    backSrc = frontSrc;
  } else if (brandFolder === "4_pulp_concept_brand") {
    const filenames: Record<string, string> = {
      "green-reset": "1.1_green-reset.jpeg",
      "cacao-daily": "1.2_cacao-daily.jpeg",
      "papaya-sunrise": "1.3_papaya-sunrise.jpeg",
      "berry-beet": "1.4_berry-beet.jpeg"
    };
    const file = filenames[imagePlaceholder] || "1.1_green-reset.jpeg";
    frontSrc = `/all_image_files/product-lab/${brandFolder}/${file}`;
    backSrc = frontSrc;
  } else if (brandFolder === "5_steep_concept_brand") {
    const filenames: Record<string, string> = {
      "kahwa": "1.1_kahwa.jpeg",
      "gut-chai": "1.2_gut_chai.jpeg",
      "golden-turmeric": "1.3_golden_turmeric.jpeg",
      "filter-kaapi": "1.4_filter_kaapi.jpeg",
      "cocoa-spice": "1.5_cocoa_spice.jpeg"
    };
    const file = filenames[imagePlaceholder] || "1.1_kahwa.jpeg";
    frontSrc = `/all_image_files/product-lab/${brandFolder}/${file}`;
    backSrc = frontSrc;
  } else if (brandFolder === "6_grit_concept_brand") {
    const filenames: Record<string, string> = {
      "millet-date": "1.1_millet_date.jpeg",
      "cacao-nib": "1.2_cacao_nib.jpeg",
      "seed-spice": "1.3_seed_spice.jpeg",
      "sattu-bite": "1.4_sattu_bite.jpeg",
      "choc-hazelnut": "1.5_choc_hazelnut.jpeg"
    };
    const file = filenames[imagePlaceholder] || "1.1_millet_date.jpeg";
    frontSrc = `/all_image_files/product-lab/${brandFolder}/${file}`;
    backSrc = frontSrc;
  } else if (brandFolder === "pause_protein_RTD") {
    const filenames: Record<string, string> = {
      "coco-chill": "coco_chill.png",
      "mango-tango": "mango_tango.png",
      "rich-cold-coffee": "rich_cold_coffee.png",
      "rosy-falooda": "rosy_falooda.png",
      "thandai-chill": "thandai_chill.png"
    };
    const file = filenames[imagePlaceholder] || "coco_chill.png";
    frontSrc = `/all_image_files/pause_protein_RTD/images/${file}`;
    backSrc = frontSrc;
  }

  const imageSrc = showBack ? backSrc : frontSrc;

  const [imgSrc, setImgSrc] = useState(imageSrc);

  useEffect(() => {
    setImgSrc(imageSrc);
  }, [imageSrc]);

  const handleImageError = () => {
    // If loading fails from a custom brand folder, gracefully fallback to the 1_alive_concept_brand folder
    const fallbackFolder = "1_alive_concept_brand";
    const fallbackMappings: Record<string, { front: string; back?: string }> = {
      lime: { front: `/all_image_files/product-lab/${fallbackFolder}/1.1_lime.jpeg`, back: `/all_image_files/product-lab/${fallbackFolder}/1.2_lime.jpeg` },
      ginger: { front: `/all_image_files/product-lab/${fallbackFolder}/2.1_ginger.jpeg`, back: `/all_image_files/product-lab/${fallbackFolder}/2.2_ginger.jpeg` },
      spice: { front: `/all_image_files/product-lab/${fallbackFolder}/3.1_spice.jpeg`, back: `/all_image_files/product-lab/${fallbackFolder}/3.2_spice.jpeg` },
      berry: { front: `/all_image_files/product-lab/${fallbackFolder}/4.1_berry.jpeg`, back: `/all_image_files/product-lab/${fallbackFolder}/4.2_berry.jpeg` },
    };
    
    const key = ["lime", "ginger", "spice", "berry"].includes(imagePlaceholder) ? imagePlaceholder : "lime";
    const fallbackSrc = fallbackMappings[key]
      ? (showBack ? (fallbackMappings[key].back || fallbackMappings[key].front) : fallbackMappings[key].front)
      : "";

    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  const hasImage = !!imgSrc;
  
  if (typeof window !== "undefined") {
    console.log(`[FrostedBottle Debug] flavor: ${flavor}, imagePlaceholder: ${imagePlaceholder}, imageSrc: ${imageSrc}, hasImage: ${hasImage}`);
  }

  const liquidColors: Record<string, string> = {
    lime: "linear-gradient(180deg, rgba(163, 230, 53, 0.35) 0%, rgba(42, 127, 127, 0.2) 100%)",
    ginger: "linear-gradient(180deg, rgba(245, 158, 11, 0.45) 0%, rgba(180, 83, 9, 0.2) 100%)",
    spice: "linear-gradient(180deg, rgba(180, 83, 9, 0.45) 0%, rgba(120, 53, 4, 0.25) 100%)",
    berry: "linear-gradient(180deg, rgba(139, 92, 246, 0.45) 0%, rgba(76, 29, 149, 0.2) 100%)",
    "coco-chill": "linear-gradient(180deg, rgba(245, 245, 220, 0.4) 0%, rgba(90, 77, 65, 0.15) 100%)",
    "mango-tango": "linear-gradient(180deg, rgba(251, 191, 36, 0.35) 0%, rgba(217, 119, 6, 0.15) 100%)",
    "rich-cold-coffee": "linear-gradient(180deg, rgba(120, 80, 50, 0.35) 0%, rgba(90, 77, 65, 0.15) 100%)",
    "rosy-falooda": "linear-gradient(180deg, rgba(244, 63, 94, 0.3) 0%, rgba(190, 24, 74, 0.15) 100%)",
    "thandai-chill": "linear-gradient(180deg, rgba(253, 224, 71, 0.3) 0%, rgba(133, 77, 14, 0.15) 100%)"
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
            src={imgSrc} 
            onError={handleImageError}
            onClick={() => onZoom && onZoom(imgSrc)}
            alt={`${brandName} ${flavor}`}
            className={`w-full h-full object-cover rounded-2xl drop-shadow-[0_8px_16px_rgba(0,0,0,0.06)] transition-all duration-500 ease-out origin-center pointer-events-auto ${
              onZoom ? "cursor-zoom-in" : (isDetailed && showBack ? "group-hover:scale-[2.8] cursor-zoom-in" : "")
            }`}
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
                  {brandName}
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
                    BY BETTER4U
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

interface ConceptBrand {
  id: string;
  name: string;
  subName: string;
  folderName: string;
  heroTagline: string;
  heroDescription: string;
  accentColor: string;
}

const CONCEPT_BRANDS: ConceptBrand[] = [
  {
    id: "alive",
    name: "ALIVE",
    subName: "ALIVE by better4u",
    folderName: "1_alive_concept_brand",
    heroTagline: "The classics, re-fermented",
    heroDescription: "We took the everyday carbonated soft drink, stripped away the chemical sweeteners, and rebuilt it. Real organic juices, warm spices, and millions of active probiotic cultures inside premium frosted glass.",
    accentColor: "#2A7F7F"
  },
  {
    id: "josh",
    name: "JOSH",
    subName: "JOSH by better4u",
    folderName: "2_josh_concept_brand",
    heroTagline: "Nostalgia, with prebiotics",
    heroDescription: "Shelf-stable prebiotic plant fiber in a sleek can, built to scale. Flavors sit in Indian-nostalgia soft-drink territory, offering 7g of prebiotic fiber to fuel your microbiome.",
    accentColor: "#8E7C96"
  },
  {
    id: "batch",
    name: "BATCH",
    subName: "BATCH by better4u",
    folderName: "3_batch_concept brand",
    heroTagline: "Fresh ferments, made daily",
    heroDescription: "Fresh, short-shelf-life elixirs made on-site and served in clear grab-and-go cups. Cloudy, active, and containing up to 5 billion live cultures across diverse probiotic strains.",
    accentColor: "#A07E8C"
  },
  {
    id: "pulp",
    name: "PULP",
    subName: "PULP by better4u",
    folderName: "4_pulp_concept_brand",
    heroTagline: "Active culture smoothies",
    heroDescription: "Thick, meal-replacement smoothies combining dense plant fibers with active live ferments. Centered on evergreen, year-round nutrition.",
    accentColor: "#9DAE8C"
  },
  {
    id: "steep",
    name: "STEEP",
    subName: "STEEP by better4u",
    folderName: "5_steep_concept_brand",
    heroTagline: "Hot botanical brews",
    heroDescription: "After-meal soothing digestifs. Traditional hot brews re-engineered to be rich in polyphenols and prebiotic fibers for a warm, gentle digestion finish.",
    accentColor: "#DAA520"
  },
  {
    id: "grit",
    name: "GRIT",
    subName: "GRIT by better4u",
    folderName: "6_grit_concept_brand",
    heroTagline: "Whole-food bars & bites",
    heroDescription: "Solid whole-food bars combining complex carbohydrates, whole grains, and prebiotics for sustained energy and zero refined sugar.",
    accentColor: "#CDAA7D"
  },
  {
    id: "pause",
    name: "PAUSE",
    subName: "PAUSE by better4u",
    folderName: "pause_protein_RTD",
    heroTagline: "Better-for-you protein, ready to drink",
    heroDescription: "Replaces sugary protein shakes & mass-gainers. Real protein, rich clean flavours, and no digestive compromise.",
    accentColor: "#5A4D41"
  }
];

export default function ProductLabPage() {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);

  // Concept Brands State
  const [activeBrand, setActiveBrand] = useState<ConceptBrand>(CONCEPT_BRANDS[0]);
  const [videoSrc, setVideoSrc] = useState(`/all_image_files/product-lab/1_alive_concept_brand/1_video1.mp4`);

  useEffect(() => {
    if (activeBrand.id === "pause") {
      setVideoSrc(`/all_image_files/pause_protein_RTD/videos/home_page.mp4`);
    } else {
      setVideoSrc(`/all_image_files/product-lab/1_alive_concept_brand/1_video1.mp4`);
    }
  }, [activeBrand]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play()
        .catch(err => console.warn("[ProductLabPage] Dynamic video play failed or was blocked:", err));
    }
  }, [videoSrc]);

  const handleVideoError = () => {
    const fallbackVideo = activeBrand.id === "pause" 
      ? `/all_image_files/pause_protein_RTD/videos/home_page.mp4`
      : `/all_image_files/product-lab/1_alive_concept_brand/1_video1.mp4`;
    const secondaryFallback = `/all_image_files/product-lab/1_alive_concept_brand/1_video1.mp4`;
    if (videoSrc !== fallbackVideo) {
      setVideoSrc(fallbackVideo);
    } else if (videoSrc !== secondaryFallback) {
      setVideoSrc(secondaryFallback);
    }
  };

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [orderedItems, setOrderedItems] = useState<CartItem[]>([]);
  const [countdown, setCountdown] = useState(8);

  const handlePlaceOrder = () => {
    setOrderedItems([...cart]);
    setIsCartOpen(false);
    setShowSuccessScreen(true);
    saveCart([]);
    setCountdown(8);
  };

  // Selected Product for Specs Modal
  const [selectedProduct, setSelectedProduct] = useState<ProductSKU | null>(null);

  // Zoom state for full-screen 2K image inspection
  const [zoomedImageSrc, setZoomedImageSrc] = useState<string | null>(null);
  const [isPanZoom, setIsPanZoom] = useState(false);

  // Back view toggle in modal
  const [modalShowBack, setModalShowBack] = useState(false);

  // Track which product range cards are showing back view
  const [flippedProducts, setFlippedProducts] = useState<Record<string, boolean>>({});

  const toggleProductFlip = (productId: string) => {
    setFlippedProducts(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

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



  // Load cart and box configuration on mount
  useEffect(() => {
    console.log("[ProductLabPage] Component mounted. Setting up video playback...");
    const savedCart = localStorage.getItem("better4u_lab_cart");
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          const validated = parsed.map(item => {
            if (!item || !item.product) return null;
            // Map / find current fresh product definition to ensure all brand attributes exist
            const freshProduct = MOCK_PRODUCTS.find(p => p.id === item.product.id);
            if (freshProduct) {
              return { ...item, product: freshProduct };
            }
            if (item.product.id && item.product.name) {
              return item;
            }
            return null;
          }).filter(Boolean) as CartItem[];
          setCart(validated);
        }
      } catch (e) {
        console.error("[ProductLabPage] Error parsing saved cart:", e);
      }
    }

    // Force background video to play
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => console.log("[ProductLabPage] Background video started playing successfully."))
        .catch(err => console.warn("[ProductLabPage] Autoplay blocked or failed for background video:", err));
    }
  }, []);

  // Countdown timer for auto-dismissing success screen
  useEffect(() => {
    if (!showSuccessScreen) return;
    
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setShowSuccessScreen(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showSuccessScreen]);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("better4u_lab_cart", JSON.stringify(newCart));
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



  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleTabChange = (tab: NavTab) => {
    if (tab === "approach") {
      router.push("/approach");
    } else if (tab === "product-lab") {
      router.push("/product-lab");
    } else if (tab === "journal") {
      router.push("/journal");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F6F2] relative overflow-hidden select-none">
      
      {/* Background ambient lighting */}
      <div 
        className="absolute top-0 inset-x-0 h-[1000px] pointer-events-none z-0 transition-all duration-1000" 
        style={{ backgroundImage: `linear-gradient(to bottom, ${activeBrand.accentColor}0a, transparent)` }}
      />

      <div className="flex flex-col min-h-screen">
        
        <Navbar activeTab="product-lab" setActiveTab={handleTabChange} />

        <main className="flex-grow">

        {/* ==================== ACT 1: THE REVELATION (Cinematic Hero) ==================== */}
        <section ref={heroRef} className="relative min-h-[92vh] w-full flex flex-col justify-center items-center px-4 py-16 text-center overflow-hidden z-10">
          
          {/* Background Ambient Cinematic Video */}
          <div className="absolute inset-0 w-full h-full z-0 overflow-hidden select-none pointer-events-none">
            <video 
              ref={videoRef}
              src={videoSrc} 
              onError={handleVideoError}
              className="w-full h-full object-cover opacity-[0.22] transition-opacity duration-1000"
              loop
              playsInline
              autoPlay
              muted={true}
            />
            {/* Dynamic brand-colored tint overlay to unify the background video with the active brand's color theme */}
            <div 
              className="absolute inset-0 transition-all duration-1000 z-10 pointer-events-none" 
              style={{ backgroundColor: `${activeBrand.accentColor}12` }}
            />
            {/* Vignette and blending overlays to merge loop edges and ensure crisp typography contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#F7F6F2]/20 via-[#F7F6F2]/75 to-[#F7F6F2] pointer-events-none z-20" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#F7F6F2]/50 pointer-events-none z-20" />
          </div>

          <CarbonationBubbles color={`${activeBrand.accentColor}20`} />
          
          <div className="max-w-3xl space-y-8 relative z-10">
            {/* Concept Brand Selector Capsular Menu */}
            <div className="flex items-center justify-center gap-1.5 p-1 bg-white/40 backdrop-blur-md border border-black/[0.04] rounded-full max-w-md mx-auto shadow-3xs select-none mb-6">
              {CONCEPT_BRANDS.map(brand => {
                const isActive = activeBrand.id === brand.id;
                return (
                  <button
                    key={brand.id}
                    onClick={() => setActiveBrand(brand)}
                    style={{
                      backgroundColor: isActive ? brand.accentColor : "transparent",
                      color: isActive ? "#ffffff" : "rgba(15, 23, 42, 0.7)",
                    }}
                    className={`px-3 py-1.5 rounded-full text-[9px] font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                      isActive ? "shadow-2xs scale-105" : "hover:bg-slate-900/5 hover:text-slate-900"
                    }`}
                  >
                    {brand.name}
                  </button>
                );
              })}
            </div>

            <motion.span 
              key={`sub-${activeBrand.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ color: activeBrand.accentColor, borderColor: `${activeBrand.accentColor}25`, backgroundColor: `${activeBrand.accentColor}0c` }}
              className="text-[10px] tracking-[0.3em] font-bold uppercase border px-4 py-1.5 rounded-full inline-block"
            >
              {activeBrand.subName}
            </motion.span>
            
            <motion.h1 
              key={`title-${activeBrand.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-extralight text-slate-900 tracking-tight leading-[1.1] px-4"
            >
              {activeBrand.heroTagline}
            </motion.h1>

            <motion.p 
              key={`desc-${activeBrand.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm sm:text-base text-slate-500 font-light max-w-xl mx-auto leading-relaxed px-2"
            >
              {activeBrand.heroDescription}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a 
                href="#range"
                style={{ backgroundColor: activeBrand.accentColor }}
                className="px-6 py-3 text-white rounded-full text-xs font-semibold tracking-widest uppercase shadow-md hover:brightness-95 hover:shadow-lg transition-all flex items-center gap-2 group cursor-pointer"
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
                <ShoppingBag className="w-4 h-4" style={{ color: activeBrand.accentColor }} />
                <span>Custom Tester Box</span>
                {cartItemsCount > 0 && (
                  <span className="w-4 h-4 rounded-full text-white flex items-center justify-center text-[9px] font-bold" style={{ backgroundColor: activeBrand.accentColor }}>
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </motion.div>
          </div>

          
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce opacity-40">
            <span className="text-[8px] tracking-[0.2em] uppercase font-bold text-slate-400">Scroll to Explore</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 mt-1" />
          </div>
        </section>

        {/* ==================== ACT 2: THE RANGE (Immersive Flavour Rows) ==================== */}
        <section id="range" className="relative w-full z-10 py-16 space-y-24 bg-white/20 border-y border-black/[0.01]">
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center space-y-3 mb-16">
              <span className="text-[10px] tracking-[0.2em] font-bold uppercase" style={{ color: activeBrand.accentColor }}>SMALL-BATCH RANGE</span>
              <h2 className="text-3xl font-extralight text-slate-900 tracking-tight leading-relaxed max-w-2xl mx-auto">
                Small-batch food and drink, made the better-for-you way — <span className="font-semibold text-slate-950">real ingredients, real fermentation, and a lot less sugar.</span>
              </h2>
              <p className="text-xs text-slate-500 font-light max-w-md mx-auto leading-relaxed">
                Small-batch sodas, fresh ferments, and smoothies — made to replace the unhealthy defaults.
              </p>
            </div>
            
            {/* The Immersive Flavor Rows */}
            <div className="space-y-32">
              {MOCK_PRODUCTS.filter(p => p.brandId === activeBrand.id).map((product, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div 
                    key={product.id}
                    className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center justify-between gap-12 sm:gap-16`}
                  >
                    
                    {/* Immersive Bottle Frame with Ambient color gradient backing */}
                    <div 
                      onClick={() => toggleProductFlip(product.id)}
                      className="w-full md:w-[45%] aspect-square flex items-center justify-center relative rounded-3xl overflow-hidden bg-[#F2F1EC] border border-black/[0.03] shadow-xs group cursor-pointer z-10"
                    >
                      <div className="absolute inset-0 w-full h-full hover:scale-[1.03] transition-transform duration-700 ease-out z-10">
                        <FrostedBottle 
                          flavor={product.name} 
                          glowColor={product.glowColor} 
                          accentColor={product.accentColor} 
                          imagePlaceholder={product.imagePlaceholder}
                          showBack={!!flippedProducts[product.id]}
                          brandFolder={activeBrand.folderName}
                          brandName={activeBrand.name}
                          onZoom={setZoomedImageSrc}
                        />
                      </div>

                      {/* Ambient floating elements representing taste notes */}
                      <div className="absolute top-4 left-4 text-[9px] tracking-widest text-slate-500 uppercase font-bold select-none opacity-85 z-20 bg-white/85 backdrop-blur-xs px-3 py-1 rounded-full border border-black/[0.03] shadow-3xs">
                        {product.replaces}
                      </div>

                      {/* View Back Label Toggle Badge */}
                      {["lime", "ginger", "spice", "berry"].includes(product.imagePlaceholder) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleProductFlip(product.id);
                          }}
                          className="absolute bottom-4 right-4 z-20 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-800 border border-black/[0.06] rounded-full text-[9px] font-bold tracking-widest uppercase cursor-pointer transition-all hover:scale-105 shadow-md flex items-center gap-1.5"
                        >
                          <RefreshCw className="w-3 h-3" style={{ color: activeBrand.accentColor }} />
                          <span>{flippedProducts[product.id] ? "Show Front" : "View Back Label"}</span>
                        </button>
                      )}
                    </div>

                    {/* Flavour copy/details side */}
                    <div className="w-full md:w-[50%] space-y-6 text-center md:text-left">
                      <div className="space-y-2">
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] border px-3 py-1 rounded-full inline-block" style={{ color: activeBrand.accentColor, borderColor: `${activeBrand.accentColor}20`, backgroundColor: `${activeBrand.accentColor}0a` }}>
                          {product.badge}
                        </span>
                        <h3 className="text-4xl font-extralight text-slate-900 tracking-tight">
                          {activeBrand.name} <span className="font-semibold text-slate-950">{product.name}</span>
                        </h3>
                        <p className="text-xs font-bold tracking-wider italic uppercase" style={{ color: activeBrand.accentColor }}>
                          {product.tagline}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed max-w-lg mx-auto md:mx-0">
                        {product.description}
                      </p>

                      {/* Spec Badges */}
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {product.specs.cfu && (
                          <span className="text-[10px] bg-white border border-black/[0.03] text-slate-700 px-3.5 py-1 rounded-full font-medium shadow-2xs">
                            {product.specs.cfu}
                          </span>
                        )}
                        {product.specs.fiber && (
                          <span className="text-[10px] bg-white border border-black/[0.03] text-slate-700 px-3.5 py-1 rounded-full font-medium shadow-2xs">
                            {product.specs.fiber}
                          </span>
                        )}
                        {product.specs.sugar && (
                          <span className="text-[10px] bg-white border border-black/[0.03] text-slate-700 px-3.5 py-1 rounded-full font-medium shadow-2xs">
                            {product.specs.sugar}
                          </span>
                        )}
                        {product.specs.calories && (
                          <span className="text-[10px] bg-white border border-black/[0.03] text-slate-700 px-3.5 py-1 rounded-full font-medium shadow-2xs">
                            {product.specs.calories}
                          </span>
                        )}
                      </div>

                      {/* Taste Highlight Block */}
                      <div className="bg-white/40 border border-black/[0.02] rounded-2xl p-4 space-y-1.5 text-left shadow-2xs max-w-md mx-auto md:mx-0">
                        <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5" style={{ color: activeBrand.accentColor }} /> Taste-First Notes
                        </h4>
                        <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                          {product.tasteHighlight}
                        </p>
                      </div>

                      {/* Interactive Buttons */}
                      <div className="pt-4 flex flex-col md:flex-row items-center justify-center md:justify-start gap-3">
                        <button
                          onClick={() => addToCart(product)}
                          className="px-6 py-2.5 text-white rounded-full text-[10px] font-bold tracking-widest uppercase transition-all shadow-md hover:shadow-lg hover:scale-[1.02] cursor-pointer flex items-center gap-2 w-full md:w-auto justify-center"
                          style={{ backgroundColor: activeBrand.accentColor }}
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add Box (₹{product.price})</span>
                        </button>
                        
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="px-5 py-2.5 bg-slate-900/5 text-slate-700 hover:bg-slate-900/10 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all cursor-pointer flex items-center gap-2 w-full md:w-auto justify-center"
                        >
                          <Info className="w-3.5 h-3.5" />
                          <span>Ingredients</span>
                        </button>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>

            {activeBrand.id === "pause" && (
              <div className="mt-32 max-w-4xl mx-auto bg-white/40 border border-black/[0.03] rounded-3xl p-8 shadow-xs flex flex-col md:flex-row items-center gap-8 z-10 relative">
                <div className="w-full md:w-1/2 space-y-4">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] border px-3 py-1 rounded-full inline-block animate-pulse" style={{ color: activeBrand.accentColor, borderColor: `${activeBrand.accentColor}20`, backgroundColor: `${activeBrand.accentColor}0a` }}>
                    EXPLAINER
                  </span>
                  <h3 className="text-3xl font-extralight text-slate-900 tracking-tight">
                    How can <span className="font-semibold text-slate-950">PAUSE</span> help?
                  </h3>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">
                    Watch our quick explainer video to see how PAUSE RTD Protein helps you recover and refuel with zero digestive compromise, clean ingredients, and zero junk.
                  </p>
                </div>
                <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-md relative aspect-video bg-black flex items-center justify-center">
                  <LazyVideo
                    src="/all_image_files/pause_protein_RTD/videos/howcanihelp_page.mp4"
                    poster="/all_image_files/pause_protein_RTD/images/coco_chill.png"
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            )}

          </div>
        </section>


        {/* ==================== ACT 3: THE PURITY MANIFESTO ==================== */}
        <section className="relative w-full z-10 py-24 px-4 sm:px-6 border-t border-black/[0.01] transition-all duration-1000" style={{ backgroundImage: `linear-gradient(to bottom, transparent, ${activeBrand.accentColor}08)` }}>
          <div className="max-w-5xl mx-auto space-y-16">
            
            <div className="text-center space-y-4">
              <span className="text-[10px] tracking-[0.25em] font-bold uppercase border px-4 py-1.5 rounded-full inline-block" style={{ color: activeBrand.accentColor, borderColor: `${activeBrand.accentColor}20`, backgroundColor: `${activeBrand.accentColor}0a` }}>
                The Purity Standard
              </span>
              <h2 className="text-4xl sm:text-5xl font-light text-slate-900 tracking-tight">
                The <span className="font-semibold text-slate-950">{activeBrand.name}</span> Blueprint
              </h2>
              <p className="text-sm sm:text-base text-slate-500 font-light max-w-xl mx-auto leading-relaxed">
                We believe that true health starts with real, honest nourishment. Every formulation in the {activeBrand.name} universe is engineered with a rigorous commitment to purity, bio-availability, and absolute transparency.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Pillar 1 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white/60 backdrop-blur-sm border border-black/[0.03] p-8 rounded-3xl shadow-xs hover:shadow-lg transition-all duration-500 flex flex-col items-center text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2 shadow-inner" style={{ backgroundColor: `${activeBrand.accentColor}10` }}>
                  <Leaf className="w-6 h-6" style={{ color: activeBrand.accentColor }} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Zero Artificials</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
                  No stevia. No erythritol. No artificial colors or fake sugars. We use only whole, organic ingredients to build complex, natural flavor profiles that respect your microbiome.
                </p>
              </motion.div>

              {/* Pillar 2 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white/60 backdrop-blur-sm border border-black/[0.03] p-8 rounded-3xl shadow-xs hover:shadow-lg transition-all duration-500 flex flex-col items-center text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2 shadow-inner" style={{ backgroundColor: `${activeBrand.accentColor}10` }}>
                  <FlaskConical className="w-6 h-6" style={{ color: activeBrand.accentColor }} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Clinical Precision</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
                  Every batch is formulated to hit precise therapeutic targets. We ensure optimal probiotic CFU counts and prebiotic fiber loads to guarantee real, measurable benefits.
                </p>
              </motion.div>

              {/* Pillar 3 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white/60 backdrop-blur-sm border border-black/[0.03] p-8 rounded-3xl shadow-xs hover:shadow-lg transition-all duration-500 flex flex-col items-center text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2 shadow-inner" style={{ backgroundColor: `${activeBrand.accentColor}10` }}>
                  <Droplets className="w-6 h-6" style={{ color: activeBrand.accentColor }} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Living Culture</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
                  Raw, unpasteurized, and actively fermenting. Our methods preserve the delicate bacterial ecosystem so that you receive living enzymes and bio-available nutrients in every serving.
                </p>
              </motion.div>
            </div>

            <div className="flex justify-center pt-8">
              <button 
                onClick={() => router.push("/approach")}
                className="px-8 py-3 rounded-full text-white text-xs font-bold tracking-widest uppercase transition-all shadow-md hover:shadow-xl cursor-pointer flex items-center gap-2 hover:scale-[1.02]"
                style={{ backgroundColor: activeBrand.accentColor }}
              >
                <span>Read our full approach</span>
                <ArrowRight className="w-4 h-4" />
              </button>
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

              {/* Left Panel: Bottle render (Edge-to-Edge) */}
              <div className="w-full md:w-[45%] bg-[#F2F1EC] flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-black/[0.03] relative min-h-[300px] md:min-h-[100%] overflow-hidden">
                
                {selectedProduct.brandId === "pause" ? (
                  <LazyVideo 
                    src="/all_image_files/pause_protein_RTD/videos/product_page.mp4"
                    poster={
                      selectedProduct.imagePlaceholder === "coco-chill" ? "/all_image_files/pause_protein_RTD/images/coco_chill.png" :
                      selectedProduct.imagePlaceholder === "mango-tango" ? "/all_image_files/pause_protein_RTD/images/mango_tango.png" :
                      selectedProduct.imagePlaceholder === "rich-cold-coffee" ? "/all_image_files/pause_protein_RTD/images/rich_cold_coffee.png" :
                      selectedProduct.imagePlaceholder === "rosy-falooda" ? "/all_image_files/pause_protein_RTD/images/rosy_falooda.png" :
                      "/all_image_files/pause_protein_RTD/images/thandai_chill.png"
                    }
                    className="absolute inset-0 w-full h-full"
                  />
                ) : (
                  <>
                    {/* Full Bleed Image Container */}
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center group cursor-zoom-in hover:scale-105 transition-transform duration-700">
                      <FrostedBottle 
                        flavor={selectedProduct.name}
                        glowColor={selectedProduct.glowColor}
                        accentColor={selectedProduct.accentColor}
                        imagePlaceholder={selectedProduct.imagePlaceholder}
                        isDetailed={true}
                        showBack={modalShowBack}
                        brandFolder={activeBrand.folderName}
                        brandName={activeBrand.name}
                        onZoom={setZoomedImageSrc}
                      />
                    </div>

                    {/* Flip Toggle Button Overlaid */}
                    {["lime", "ginger", "spice", "berry"].includes(selectedProduct.imagePlaceholder) && (
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1.5 z-20">
                        <button 
                          onClick={() => setModalShowBack(!modalShowBack)}
                          className="px-5 py-2 bg-black/60 backdrop-blur-md hover:bg-black/80 text-white rounded-full text-[9px] font-bold tracking-widest uppercase cursor-pointer transition-all hover:scale-105 shadow-md flex items-center gap-1.5"
                        >
                          <span>View {modalShowBack ? "Front" : "Back Label"}</span>
                        </button>
                        {modalShowBack && (
                          <span className="text-[8px] text-white/80 tracking-wider uppercase font-semibold select-none drop-shadow-md">
                            *Tap bottle to zoom
                          </span>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Right Panel: Spec details */}
              <div className="md:w-[60%] p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[9px] tracking-widest font-bold uppercase select-none" style={{ color: activeBrand.accentColor }}>
                        PRODUCT DETAILS
                      </span>
                      <h2 className="text-2xl font-extralight text-slate-900 mt-1">
                        {selectedProduct.brandId?.toUpperCase() || "ALIVE"} <span className="font-semibold text-slate-950">{selectedProduct.name}</span>
                      </h2>
                      <p className="text-xs text-slate-400 font-light mt-0.5 italic">
                        {selectedProduct.tagline}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0 bg-white/60 border border-black/[0.03] rounded-xl px-4 py-2 shadow-3xs">
                      <span className="text-2xl font-light text-slate-900 block leading-tight">₹{selectedProduct.price}</span>
                      <span className="text-[8px] text-slate-400 tracking-wider uppercase font-bold">Single Box</span>
                    </div>
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
                      <Info className="w-3.5 h-3.5" style={{ color: activeBrand.accentColor }} /> Nutritional Index
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-[11px]">
                      {selectedProduct.specs.cfu ? (
                        <div>
                          <span className="text-slate-400 font-light block">Active Cultures:</span>
                          <span className="text-slate-800 font-bold">{selectedProduct.specs.cfu}</span>
                        </div>
                      ) : selectedProduct.specs.fiber ? (
                        <div>
                          <span className="text-slate-400 font-light block">Dietary Fiber:</span>
                          <span className="text-slate-800 font-bold">{selectedProduct.specs.fiber}</span>
                        </div>
                      ) : null}
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

                  {/* Pairs Well With — Recipe Pairings */}
                  {PRODUCT_RECIPE_PAIRINGS[selectedProduct.id] && (
                    <div className="space-y-2.5">
                      <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest flex items-center gap-1.5">
                        <UtensilsCrossed className="w-3.5 h-3.5" style={{ color: activeBrand.accentColor }} />
                        Pairs Well With
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {PRODUCT_RECIPE_PAIRINGS[selectedProduct.id].map((recipe) => (
                          <a
                            key={recipe.id}
                            href="/recipes"
                            onClick={() => setSelectedProduct(null)}
                            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] font-semibold tracking-wide transition-all cursor-pointer hover:scale-[1.02] hover:shadow-sm"
                            style={{
                              color: activeBrand.accentColor,
                              borderColor: `${activeBrand.accentColor}25`,
                              backgroundColor: `${activeBrand.accentColor}08`
                            }}
                          >
                            <span className="font-bold opacity-60">{recipe.id}</span>
                            <span>{recipe.title}</span>
                            <span className="ml-1 px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wider font-bold bg-white/60 opacity-70">{recipe.tag}</span>
                          </a>
                        ))}
                      </div>
                      <p className="text-[9px] text-slate-400 font-light mt-1">
                        Full step-by-step instructions in the{" "}
                        <a href="/recipes" onClick={() => setSelectedProduct(null)} className="underline hover:opacity-80 transition-opacity" style={{ color: activeBrand.accentColor }}>Recipe Hub →</a>
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-4 border-t border-black/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-[9px] text-slate-400 leading-normal font-light text-center sm:text-left">
                    *Packaged in custom 250ml inert glass bottles to preserve natural carbonation.
                  </div>
                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    style={{ backgroundColor: activeBrand.accentColor }}
                    className="w-full sm:w-auto px-6 py-3 text-white rounded-full text-[11px] font-bold tracking-wider uppercase hover:brightness-95 transition-all cursor-pointer flex items-center justify-center gap-2 flex-shrink-0 whitespace-nowrap shadow-sm"
                  >
                    <ShoppingBag className="w-4 h-4" />
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
                  <ShoppingBag className="w-5 h-5" style={{ color: activeBrand.accentColor }} />
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
                        <h4 className="text-xs font-bold text-slate-900 leading-tight flex items-center gap-1.5">
                          <span className="text-[9px] tracking-widest font-black uppercase px-2 py-0.5 rounded-md bg-slate-950/5 text-slate-600 border border-black/[0.04]">
                            {item.product.brandId?.toUpperCase() || "ALIVE"}
                          </span>
                          <span>{item.product.name}</span>
                        </h4>
                        <span className="text-[10px] text-slate-500 block mt-1">
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

                  <button
                    onClick={handlePlaceOrder}
                    style={{ backgroundColor: activeBrand.accentColor }}
                    className="w-full py-3 text-white text-xs font-bold uppercase tracking-widest rounded-full hover:brightness-95 transition-all cursor-pointer text-center shadow-xs hover:scale-[1.01] active:scale-99"
                  >
                    Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
        </AnimatePresence>

        {/* FULLSCREEN ZOOM IMAGE OVERLAY */}
        <AnimatePresence>
          {zoomedImageSrc && (
            <div className={`fixed inset-0 z-[60] flex items-center justify-center ${isPanZoom ? 'overflow-auto items-start justify-start p-0' : 'p-4'}`}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => { setZoomedImageSrc(null); setIsPanZoom(false); }}
                className="fixed inset-0 bg-slate-950/95 backdrop-blur-md cursor-zoom-out"
              />
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`relative z-10 w-full flex items-center justify-center ${isPanZoom ? 'min-h-[150vh] min-w-[150vw]' : 'max-w-4xl max-h-[90vh]'}`}
              >
                {!isPanZoom && (
                  <button
                    onClick={() => { setZoomedImageSrc(null); setIsPanZoom(false); }}
                    className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span className="text-[10px] uppercase font-bold tracking-widest">Close</span>
                    <X className="w-5 h-5" />
                  </button>
                )}
                <img 
                  src={zoomedImageSrc} 
                  alt="High-fidelity product view"
                  onClick={() => setIsPanZoom(!isPanZoom)}
                  className={`${isPanZoom ? 'w-[150vw] h-auto max-w-none object-cover cursor-zoom-out' : 'w-auto h-auto max-w-full max-h-[85vh] object-contain cursor-zoom-in rounded-2xl shadow-2xl'} transition-all duration-300 select-none`}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* FULLSCREEN MOCK PURCHASE SUCCESS OVERLAY */}
        <AnimatePresence>
          {showSuccessScreen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#F7F6F2] z-50 flex flex-col items-center justify-center p-4 overflow-y-auto"
            >
              {/* Ambient glowing background bubbles representing living cultures */}
              <CarbonationBubbles color={`${activeBrand.accentColor}25`} />
              
              <motion.div 
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="w-full max-w-md bg-white border border-black/[0.03] rounded-3xl p-8 text-center shadow-xl space-y-6 relative"
              >
                {/* Success Circle and Icon */}
                <div className="w-16 h-16 rounded-full border flex items-center justify-center mx-auto relative" style={{ backgroundColor: `${activeBrand.accentColor}1a`, borderColor: `${activeBrand.accentColor}33` }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <Check className="w-8 h-8" style={{ color: activeBrand.accentColor }} />
                  </motion.div>
                  <div className="absolute inset-0 rounded-full border-2 animate-ping opacity-25" style={{ borderColor: activeBrand.accentColor }} />
                </div>

                {/* Success Messages */}
                <div className="space-y-2">
                  <span className="text-[10px] tracking-[0.25em] font-bold uppercase" style={{ color: activeBrand.accentColor }}>Order Confirmed</span>
                  <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">
                    Preparing Your Order
                  </h2>
                  <p className="text-xs text-slate-500 font-light leading-relaxed px-2">
                    Your order of {activeBrand.name} has been confirmed. We will prepare your batch and ship it within 24 hours.
                  </p>
                </div>

                {/* Summary of ordered items */}
                <div className="bg-[#F7F6F2]/60 border border-black/[0.02] rounded-2xl p-4 text-left space-y-2 max-h-48 overflow-y-auto shadow-2xs">
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Order Summary</span>
                  {orderedItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[11px] border-b border-black/[0.02] pb-1.5 last:border-b-0 last:pb-0">
                      <span className="text-slate-800 font-medium">
                        <span className="text-[8px] font-black tracking-widest uppercase mr-1 bg-slate-950/5 text-slate-500 px-1 py-0.5 rounded">
                          {item.product.brandId?.toUpperCase() || "ALIVE"}
                        </span>
                        {item.product.name}
                      </span>
                      <span className="text-slate-500 font-bold">Qty: {item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Status and timer */}
                <div className="space-y-4 pt-2">
                  <button
                    onClick={() => setShowSuccessScreen(false)}
                    style={{ backgroundColor: activeBrand.accentColor }}
                    className="w-full py-3 text-white hover:brightness-95 text-xs font-bold uppercase tracking-widest rounded-full transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-98"
                  >
                    Return to Product Lab
                  </button>
                  <span className="text-[9px] text-slate-400 font-light block">
                    Automatically returning in <span className="font-bold text-slate-600">{countdown}s</span>
                  </span>
                </div>
              </motion.div>
            </motion.div>
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
