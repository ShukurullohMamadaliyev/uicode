"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services, Service } from "@/content/services";
import { Laptop, Brain, Bot, ArrowRight, X, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedService(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const width = window.innerWidth;
    const height = window.innerHeight;
    // Normalized coordinates from -0.5 to 0.5
    setMousePos({
      x: (clientX / width) - 0.5,
      y: (clientY / height) - 0.5,
    });
  };

  const iconMap: { [key: string]: any } = {
    "fa-laptop-code": Laptop,
    "fa-brain": Brain,
    "fa-robot": Bot,
  };

  // Positions for absolute collage cards on desktop (spaced to avoid overlapping center text)
  const positions = [
    { top: "15%", left: "3%", shiftFactor: 20 },   // Web sayt (top-left)
    { top: "30%", right: "3%", shiftFactor: -25 }, // AI (right)
    { bottom: "5%", left: "calc(50% - 140px)", shiftFactor: 15 }, // Bot/CRM (bottom-center)
  ];

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-background overflow-hidden flex items-center justify-center pt-24 pb-12 space-dot-pattern"
    >
      {/* Background radial gradient overlay */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(61,240,139,0.02),transparent_60%)]" />

      {/* COLLAGE LAYOUT FOR DESKTOP (Relative to entire screen height) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
        <div className="max-w-7xl mx-auto px-4 w-full h-full relative">
          {services.map((service, idx) => {
            const IconComponent = iconMap[service.icon] || Laptop;
            const pos = positions[idx];

            return (
              <motion.div
                key={service.id}
                style={{
                  top: pos.top,
                  left: pos.left,
                  right: pos.right,
                  bottom: pos.bottom,
                  // Parallax translation
                  x: mousePos.x * pos.shiftFactor,
                  y: mousePos.y * pos.shiftFactor,
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: "easeOut" }}
                className="absolute pointer-events-auto"
              >
                {/* Slow float animation */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 1.2,
                  }}
                  onClick={() => setSelectedService(service)}
                  className="glass-panel rounded-3xl p-6 border border-white/5 cursor-pointer max-w-[280px] shadow-2xl relative group hover:border-accent/30 transition-colors duration-300"
                >
                  <div className="space-y-4">
                    <div className="p-3.5 rounded-2xl bg-accent/10 text-accent w-fit group-hover:bg-accent group-hover:text-black transition-all duration-300">
                      <IconComponent size={24} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-display font-bold text-white text-base leading-snug group-hover:text-accent transition-colors">
                        {service.nomi}
                      </h4>
                      <p className="text-xs text-mutedText line-clamp-3 leading-relaxed">
                        {service.kaltatavsif}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span>Batafsil ma&apos;lumot</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 w-full h-full min-h-[70vh] flex flex-col justify-center relative">
        
        {/* CENTER TITLE & DESCRIPTION */}
        <div className="text-center z-10 max-w-2xl mx-auto space-y-6 select-none my-16 md:my-0">
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-white uppercase leading-none"
          >
            Xizmatni <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400 neon-text-glow">
              tanlang
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-mutedText leading-relaxed px-4"
          >
            Biznesingizni keyingi bosqichga olib chiquvchi Next.js veb-saytlar va jarayonlarni avtomatlashtiruvchi zamonaviy AI tizimlari.
          </motion.p>
        </div>

        {/* RESPONSIVE GRID LAYOUT FOR MOBILE/TABLET */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl mx-auto mt-4 px-2">
          {services.map((service, idx) => {
            const IconComponent = iconMap[service.icon] || Laptop;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setSelectedService(service)}
                className="glass-panel rounded-2xl p-5 border border-white/5 cursor-pointer hover:border-accent/30 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-accent/10 text-accent flex-shrink-0">
                    <IconComponent size={20} />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <h4 className="font-bold text-white text-sm leading-snug">
                      {service.nomi}
                    </h4>
                    <p className="text-xs text-mutedText line-clamp-2">
                      {service.kaltatavsif}
                    </p>
                    <div className="text-[11px] text-accent font-bold inline-flex items-center gap-1 pt-1">
                      <span>Batafsil</span>
                      <ArrowRight size={10} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* FRAME ANIMATED DETAIL OVERLAY (Framer Motion layoutId) */}
      {/* FRAME ANIMATED DETAIL OVERLAY (Standard scale/fade modal) */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            key="modal-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Modal backdrop */}
            <div
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm z-40 cursor-pointer"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-[32px] p-6 sm:p-10 shadow-2xl z-50 overflow-hidden text-white"
            >
              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedService(null);
                }}
                className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 text-mutedText hover:text-white rounded-full transition-colors z-50 focus:outline-none cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="space-y-6">
                {/* Title & Badge */}
                <div className="space-y-3 pr-8">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-accent">
                    <Clock size={12} />
                    <span>Muddat: {selectedService.muddat}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white leading-tight">
                    {selectedService.nomi}
                  </h3>
                </div>

                {/* Detailed description */}
                <p className="text-sm sm:text-base text-mutedText leading-relaxed">
                  {selectedService.batafsil}
                </p>

                {/* What's included list */}
                <div className="space-y-3 pt-4 border-t border-white/5">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Xizmat tarkibiga nimalar kiradi:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedService.ichida.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-mutedText">
                        <CheckCircle size={16} className="text-accent flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <div className="pt-6 flex justify-end">
                  <Link
                    href={`/aloqa?xizmat=${selectedService.id}`}
                    onClick={() => setSelectedService(null)}
                    className="px-6 py-3 bg-accent text-black font-bold hover:bg-accent-hover rounded-2xl transition-all duration-300 shadow-lg shadow-accent/15 inline-flex items-center gap-2"
                  >
                    <span>Buyurtma berish</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
