"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { certificates, Certificate } from "@/content/certificates";
import { X, ExternalLink, Calendar, Award, ShieldCheck, ZoomIn } from "lucide-react";

export default function CertificatesPage() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // Marquee uzluksiz ko'rinishi uchun ro'yxat cho'ziladi. Ko'proq takrorlash
  // sahifani sekinlashtiradi - har bir nusxa alohida <img> tugun demak.
  const duplicatedCertificates = [...certificates, ...certificates];

  return (
    <div className="relative min-h-screen bg-background pt-24 pb-12 flex flex-col justify-between overflow-hidden space-dot-pattern">
      {/* CSS infinite marquee styles (Very slow scroll speed) */}
      <style jsx global>{`
        @keyframes marquee-scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .marquee-container {
          overflow: hidden;
          width: 100%;
          display: flex;
          position: relative;
        }
        .marquee-inner {
          display: flex;
          width: max-content;
          animation: marquee-scroll 150s linear infinite; /* Set to 150s for super slow and elegant movement */
        }
        .marquee-inner:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Background glow decorator */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -z-10 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 w-full flex-grow flex flex-col justify-center py-12">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12 select-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider">
            <Award size={14} />
            <span>Kvalifikatsiya</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white leading-none">
            Mening <span className="text-accent">sertifikatlarim</span>
          </h2>
          <p className="text-sm sm:text-base text-mutedText">
            IT va dasturlash yo&apos;nalishidagi bilimlarimni tasdiqlovchi haqiqiy va tasdiqlangan xalqaro sertifikatlar.
          </p>
        </div>

        {/* UNIFORM DARK MARQUEE SLIDER (Dark theme, uniform card sizes) */}
        <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-16 bg-black/40 border-y border-white/5 backdrop-blur-sm">
          <div className="marquee-container">
            {/* The infinite scrolling list (repeated twice for seamless loop) */}
            <div className="marquee-inner items-center gap-8 px-4">
              
              {/* First half */}
              {duplicatedCertificates.map((cert, idx) => (
                <div
                  key={`first-${idx}`}
                  onClick={() => setSelectedCert(cert)}
                  className="w-[300px] sm:w-[370px] aspect-[4/3] p-3.5 rounded-[28px] bg-zinc-900/60 backdrop-blur-md border border-white/5 hover:border-accent/40 shadow-2xl cursor-pointer transition-all duration-300 group flex flex-col justify-between flex-shrink-0"
                >
                  {/* Certificate preview */}
                  <div className="relative w-full h-[76%] rounded-2xl overflow-hidden bg-black/50 border border-white/5 flex items-center justify-center">
                    <img
                      src={cert.kichik}
                      alt={cert.nomi}
                      loading={idx < 3 ? "eager" : "lazy"}
                      decoding="async"
                      width={740}
                      height={493}
                      className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
                    />
                    {/* Zoom icon on hover */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-11 h-11 rounded-full bg-accent text-black flex items-center justify-center shadow-lg shadow-accent/25">
                        <ZoomIn size={20} />
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="pt-3 flex flex-col justify-between flex-grow text-left px-1">
                    <h4 className="font-display font-bold text-xs sm:text-sm text-white line-clamp-1 group-hover:text-accent transition-colors">
                      {cert.nomi}
                    </h4>
                    <div className="flex justify-between items-center text-[10px] sm:text-xs text-mutedText mt-1">
                      <span className="font-semibold text-white/50">{cert.tashkilot}</span>
                      <span className="font-mono text-white/40">{cert.yil}</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Second half for seamless looping */}
              {duplicatedCertificates.map((cert, idx) => (
                <div
                  key={`second-${idx}`}
                  onClick={() => setSelectedCert(cert)}
                  className="w-[300px] sm:w-[370px] aspect-[4/3] p-3.5 rounded-[28px] bg-zinc-900/60 backdrop-blur-md border border-white/5 hover:border-accent/40 shadow-2xl cursor-pointer transition-all duration-300 group flex flex-col justify-between flex-shrink-0"
                >
                  {/* Certificate preview */}
                  <div className="relative w-full h-[76%] rounded-2xl overflow-hidden bg-black/50 border border-white/5 flex items-center justify-center">
                    <img
                      src={cert.kichik}
                      alt={cert.nomi}
                      loading="lazy"
                      decoding="async"
                      width={740}
                      height={493}
                      className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
                    />
                    {/* Zoom icon on hover */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-11 h-11 rounded-full bg-accent text-black flex items-center justify-center shadow-lg shadow-accent/25">
                        <ZoomIn size={20} />
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="pt-3 flex flex-col justify-between flex-grow text-left px-1">
                    <h4 className="font-display font-bold text-xs sm:text-sm text-white line-clamp-1 group-hover:text-accent transition-colors">
                      {cert.nomi}
                    </h4>
                    <div className="flex justify-between items-center text-[10px] sm:text-xs text-mutedText mt-1">
                      <span className="font-semibold text-white/50">{cert.tashkilot}</span>
                      <span className="font-mono text-white/40">{cert.yil}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Big quote caption below the slider */}
        <div className="max-w-2xl mx-auto text-center mt-16 px-4">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-lg sm:text-xl font-display font-medium text-white/80 leading-relaxed italic"
          >
            &ldquo;Har bir sertifikat ortida real loyihalar va real natijalar turadi — bilim qog&apos;ozda emas, mahsulotda ko&apos;rinadi.&rdquo;
          </motion.p>
        </div>
      </div>

      {/* CERTIFICATE DETAILS MODAL */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm z-40"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl z-50 overflow-hidden text-white flex flex-col gap-6"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 text-mutedText hover:text-white rounded-full transition-colors z-50 focus:outline-none cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="space-y-4">
                {/* Header info */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase">
                  <ShieldCheck size={12} />
                  <span>Tasdiqlangan sertifikat</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold leading-tight">
                  {selectedCert.nomi}
                </h3>

                <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm text-mutedText pt-2 border-t border-white/5">
                  <div className="space-y-1">
                    <span className="block text-white/40">Tashkilot:</span>
                    <span className="font-semibold text-white">{selectedCert.tashkilot}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-white/40">Yil:</span>
                    <span className="font-semibold text-white flex items-center gap-1">
                      <Calendar size={12} />
                      {selectedCert.yil}
                    </span>
                  </div>
                  {selectedCert.id && (
                    <div className="space-y-1 col-span-2">
                      <span className="block text-white/40">Sertifikat ID:</span>
                      <span className="font-mono text-white select-all">{selectedCert.id}</span>
                    </div>
                  )}
                </div>

                {/* High resolution certificate image view */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 flex items-center justify-center mt-4">
                  <img
                    src={selectedCert.rasm}
                    alt={selectedCert.nomi}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Actions */}
                <div className="pt-4 flex justify-end gap-3">
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl text-sm transition-colors cursor-pointer"
                  >
                    Yopish
                  </button>
                  <a
                    href={selectedCert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-accent text-black font-bold hover:bg-accent-hover rounded-xl text-sm transition-all duration-300 shadow-md shadow-accent/10 flex items-center gap-1.5"
                  >
                    <span>Haqiqiyligini tekshirish</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
