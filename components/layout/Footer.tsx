"use client";

import React from "react";
import Link from "next/link";
import { siteContent } from "@/content/site";
import { Phone, Mail, MapPin, Send, Instagram, Github, Linkedin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const { footer } = siteContent;

  const iconMap: { [key: string]: React.ComponentType<any> } = {
    Phone: Phone,
    Mail: Mail,
    MapPin: MapPin,
  };

  const socialIcons = [
    { icon: Send, href: "https://t.me/Shukuruiloh", label: "Telegram" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10 overflow-hidden relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,rgba(61,240,139,0.015),transparent_40%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">
          
          {/* Column 1: Brand Logo & Slogan */}
          <div className="lg:col-span-4 space-y-6">
            <Link
              href="/"
              className="flex items-center group transition-transform duration-300 hover:scale-[1.02]"
            >
              <img
                src="/logo.png"
                alt="UiCode Logo"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-mutedText max-w-sm leading-relaxed">
              {footer.slogan}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialIcons.map((social, idx) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/10 hover:border-accent text-mutedText hover:text-black hover:bg-accent flex items-center justify-center transition-all duration-300"
                    aria-label={social.label}
                  >
                    <IconComponent size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Xizmatlar */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              {footer.cols.services.title}
            </h4>
            <ul className="space-y-3">
              {footer.cols.services.links.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-sm text-mutedText hover:text-accent transition-colors flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight size={10} className="opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Foydali ma'lumotlar */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              {footer.cols.info.title}
            </h4>
            <ul className="space-y-3">
              {footer.cols.info.links.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-sm text-mutedText hover:text-accent transition-colors flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight size={10} className="opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Bog'lanish */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              {footer.cols.contact.title}
            </h4>
            <ul className="space-y-4">
              {footer.cols.contact.details.map((detail, idx) => {
                const IconComponent = iconMap[detail.icon] || Phone;
                return (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-white/5 text-accent mt-0.5">
                      <IconComponent size={14} />
                    </div>
                    {detail.href !== "#" ? (
                      <a
                        href={detail.href}
                        className="text-sm text-mutedText hover:text-accent transition-colors"
                      >
                        {detail.text}
                      </a>
                    ) : (
                      <span className="text-sm text-mutedText">{detail.text}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

        </div>

        {/* Footer Bottom copyright */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">{footer.rights}</p>
          <div className="flex gap-6 text-xs text-white/40">
            <a href="#" className="hover:text-accent transition-colors">Maxfiylik kelishuvi</a>
            <a href="#" className="hover:text-accent transition-colors">Foydalanish shartlari</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
