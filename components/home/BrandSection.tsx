"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { siteContent } from "@/content/site";
import { Code, User, Briefcase, MessageSquare, ArrowUpRight } from "lucide-react";

// Text Scramble component for the glitch/scramble effect on hover
function ScrambleText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const chars = "!@#$%^&*()_+~}{[]:;?><,./-=";
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    let iterations = 0;
    
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setDisplayText(() => {
        return text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterations) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
      });

      iterations += 1 / 3;
      if (iterations >= text.length) {
        clearInterval(timerRef.current!);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, 30);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <span 
      onMouseEnter={startScramble}
      className="cursor-pointer select-none transition-all duration-300 hover:text-accent neon-text-glow"
    >
      {displayText}
    </span>
  );
}

// 3D Glass Panel Component
function GlassPanel3D({ 
  label, 
  desc, 
  path, 
  icon: Icon,
  index 
}: { 
  label: string; 
  desc: string; 
  path: string; 
  icon: React.ComponentType<any>;
  index: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Diqqat: qiymatlar "15deg" emas, oddiy son bo'lishi kerak.
  // whileHover ichida rotateX/rotateY songa (0) animatsiya qilinadi — agar bu
  // yerda "deg" string bo'lsa, framer-motion birlikni o'girolmay crash beradi.
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Link href={path} className="block no-underline">
      <motion.div
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        // Barcha 4 panel bir xil: hech qanday index'ga bog'liq z/rotate siljish yo'q.
        // rotateX/rotateY faqat sichqoncha egilishi (style) tomonidan boshqariladi.
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05, z: 40, transition: { duration: 0.3 } }}
        whileTap={{ scale: 0.97, z: 10, transition: { duration: 0.12 } }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="glass-panel-accent rounded-2xl p-6 border border-white/5 hover:border-accent/40 active:border-accent transition-colors duration-300 cursor-pointer relative group flex flex-col justify-between min-h-[160px] select-none"
      >
        {/* Panel Top */}
        <div className="flex items-center justify-between">
          <div className="p-3 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-black group-active:bg-accent group-active:text-black transition-colors duration-300">
            <Icon size={20} />
          </div>
          <ArrowUpRight size={18} className="text-white/30 group-hover:text-accent group-active:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
        </div>

        {/* Panel Details */}
        <div className="space-y-1 mt-6">
          <h4 className="font-display font-bold text-lg text-white group-hover:text-accent group-active:text-accent transition-colors duration-200">
            {label}
          </h4>
          <p className="text-xs text-mutedText line-clamp-2">
            {desc}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}

export default function BrandSection() {
  const { brand } = siteContent.home;
  
  // Map icons to panels index
  const panelIcons = [User, Briefcase, Code, MessageSquare];

  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 overflow-hidden border-t border-white/5 bg-[#0E1210]">
      {/* Background Animated Canvas Mock / Matrix grid */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,rgba(61,240,139,0.02),transparent_50%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full space-dot-pattern opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Brand Text (Glitch Scramble Name) */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            <span className="text-xs font-semibold tracking-[0.2em] text-accent uppercase font-display">
              {brand.top}
            </span>
            
            <h2 className="text-6xl sm:text-7xl md:text-8xl font-display font-extrabold text-white tracking-tight leading-none">
              <ScrambleText text={brand.title} />
            </h2>
            
            <p className="max-w-md text-base sm:text-lg text-mutedText font-light">
              {brand.tagline}
            </p>
          </div>

          {/* Right Side: 3D Rotating Glass Panels */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div 
              className="relative grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg"
              style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
            >
              {brand.panels.map((panel, idx) => (
                <GlassPanel3D
                  key={panel.id}
                  label={panel.label}
                  desc={panel.desc}
                  path={panel.path}
                  icon={panelIcons[idx]}
                  index={idx}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
