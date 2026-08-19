"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { projects } from "@/content/projects";
import { siteContent } from "@/content/site";
import { ArrowUpRight } from "lucide-react";

export default function PortfolioGrid() {
  const { portfolio } = siteContent.home;

  return (
    <section id="projects" className="relative py-24 sm:py-32 overflow-hidden border-t border-white/5 bg-[#0E1210]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(61,240,139,0.01),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between mb-16 md:mb-[clamp(1.25rem,4vh,4rem)] gap-6">
          <div className="space-y-3 text-center lg:text-left">
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl font-display font-extrabold text-white"
            >
              {portfolio.title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-xl text-sm sm:text-base text-mutedText"
            >
              {portfolio.subtitle}
            </motion.p>
          </div>
          <div className="w-12 h-1 bg-accent rounded-full hidden lg:block" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-[clamp(0.75rem,2.5vh,2rem)]">
          {projects.map((project, idx) => (
            <motion.a
              key={idx}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (idx % 4) * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-panel rounded-2xl border border-white/5 overflow-hidden flex flex-col group select-none transition-all duration-300"
            >
              {/* Browser Mockup Header (4-rasm) */}
              <div className="bg-white/5 border-b border-white/5 px-4 py-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500/60" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
                <span className="w-2 h-2 rounded-full bg-green-500/60" />
                {/* Simulated URL bar */}
                <div className="flex-1 bg-black/40 rounded-md py-0.5 px-3 text-[10px] text-white/20 font-mono text-center truncate ml-4">
                  {project.nomi.toLowerCase().replace(/\s+/g, "-")}.uicode.uz
                </div>
              </div>

              {/* Browser Content / Screenshot scrolling container */}
              <div className="relative h-48 md:h-[clamp(6.5rem,17vh,12rem)] w-full overflow-hidden bg-zinc-900">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                {/* Scrolling image container */}
                <div className="relative w-full h-full">
                  <div className="absolute top-0 left-0 w-full h-[600px] transition-transform duration-[4500ms] ease-in-out group-hover:translate-y-[-300px]">
                    <Image
                      src={project.rasm}
                      alt={project.nomi}
                      fill
                      className="object-cover object-top opacity-80"
                      sizes="(max-w-md) 100vw, 300px"
                    />
                  </div>
                </div>

                {/* Floating overlay layout */}
                <div className="absolute bottom-0 left-0 w-full p-4 z-20 flex justify-between items-end">
                  <div className="space-y-1">
                    <h4 className="font-bold text-white text-base leading-tight group-hover:text-accent transition-colors">
                      {project.nomi}
                    </h4>
                    <p className="text-[10px] text-white/50 line-clamp-1">
                      {project.tavsif}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-black/60 border border-white/10 text-white flex items-center justify-center group-hover:bg-accent group-hover:text-black group-hover:border-accent transition-all duration-300">
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>

              {/* Bottom detail card */}
              <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.teglar.map((tech, techIdx) => (
                    <span
                      key={techIdx}
                      className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] font-semibold text-mutedText"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
