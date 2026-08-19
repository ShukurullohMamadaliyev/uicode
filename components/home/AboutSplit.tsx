"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, TrendingUp, Award, ArrowRight } from "lucide-react";
import { siteContent } from "@/content/site";

export default function AboutSplit() {
  const { about } = siteContent.home;

  const iconMap: { [key: string]: React.ComponentType<any> } = {
    ShieldCheck: ShieldCheck,
    TrendingUp: TrendingUp,
    Award: Award,
  };

  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden border-t border-white/5 space-dot-pattern">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(61,240,139,0.02),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Content & Stats */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>{about.badge}</span>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-display font-bold leading-tight text-white"
            >
              Loyihangiz <span className="text-accent">sifatli</span> va <span className="text-accent">kafolatli</span> amalga oshiriladi
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-mutedText leading-relaxed"
            >
              {about.desc}
            </motion.p>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full pt-4">
              {about.stats.map((stat, idx) => {
                const IconComponent = iconMap[stat.icon] || ShieldCheck;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 + 0.3 }}
                    className="glass-panel rounded-2xl p-5 border border-white/5 flex flex-col items-center lg:items-start text-center lg:text-left gap-3 group hover:border-accent/20 transition-all duration-300"
                  >
                    <div className="p-3 rounded-xl bg-accent/15 text-accent group-hover:bg-accent group-hover:text-black transition-all duration-300">
                      <IconComponent size={20} />
                    </div>
                    <div>
                      <p className="text-2xl font-display font-extrabold text-white group-hover:text-accent transition-colors duration-250">
                        {stat.value}
                      </p>
                      <p className="text-xs text-mutedText font-medium mt-1">
                        {stat.label}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-6 w-full sm:w-auto"
            >
              <Link
                href="/aloqa"
                className="px-6 py-3.5 bg-accent text-black font-bold hover:bg-accent-hover rounded-2xl transition-all duration-300 shadow-lg shadow-accent/15 flex items-center gap-2"
              >
                <span>Bepul konsultatsiya</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/#projects"
                className="px-6 py-3.5 border border-white/10 hover:border-accent text-white hover:text-accent font-semibold rounded-2xl transition-all duration-300"
              >
                Portfolio
              </Link>
            </motion.div>
          </div>

          {/* Right Side: Photo Card */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[360px] aspect-[4/5] glass-panel-accent rounded-[32px] overflow-hidden border border-white/10 p-4 flex flex-col justify-end group shadow-2xl"
            >
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
              
              {/* Photo placeholder or real illustration */}
              <div className="absolute inset-4 rounded-[24px] overflow-hidden bg-zinc-900 border border-white/5">
                <img
                  src="/shukurulloh.webp"
                  alt={about.photoCard.name}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
              </div>

              {/* Card Bottom Details Panel */}
              <div className="relative z-20 p-4 border border-white/10 rounded-2xl bg-black/60 backdrop-blur-md space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-accent font-bold">
                  {about.photoCard.role}
                </span>
                <h4 className="font-display font-bold text-white text-lg leading-tight">
                  {about.photoCard.name}
                </h4>
                <div className="flex justify-between items-center text-xs text-mutedText pt-2 border-t border-white/5 mt-2">
                  <span>{about.photoCard.sub}</span>
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
