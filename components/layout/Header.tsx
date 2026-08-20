"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { siteContent } from "@/content/site";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/60 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          {/* Logo ikkiga bo'lingan: faqat kvadrat ikonka sakraydi,
              "UiCode" yozuvi qimirlamay turadi. */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="relative inline-flex items-center justify-center shrink-0">
              {/* Ikonka ortidagi yumshoq nur - sekin "nafas oladi" */}
              <span className="logo-glow absolute inset-0 rounded-full bg-accent/30 blur-xl" />
              <motion.img
                src="/logo-icon.png"
                alt="UiCode"
                className="relative h-10 w-auto object-contain"
                animate={{ y: [0, -4, 0], rotate: [0, -4, 0, 4, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.15, rotate: 0, transition: { duration: 0.25 } }}
                whileTap={{ scale: 0.94, transition: { duration: 0.1 } }}
              />
            </span>
            <img
              src="/logo-text.png"
              alt="UiCode"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {siteContent.header.nav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-medium transition-colors duration-200 text-sm hover:text-accent ${
                    isActive ? "text-accent" : "text-white/70"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href="/aloqa"
              className="px-5 py-2 rounded bg-white text-black font-semibold text-sm hover:bg-accent hover:text-black transition-colors duration-300"
            >
              Konsultatsiya
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-accent focus:outline-none transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg border-b border-white/5 absolute top-full left-0 w-full py-6 px-4 space-y-4">
          {siteContent.header.nav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block py-2 font-medium text-base hover:text-accent border-b border-white/5 ${
                  isActive ? "text-accent" : "text-white/70"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/aloqa"
            onClick={() => setIsOpen(false)}
            className="block w-full py-3 rounded bg-accent text-black text-center font-bold text-sm"
          >
            Konsultatsiya olish
          </Link>
        </div>
      )}
    </header>
  );
}
