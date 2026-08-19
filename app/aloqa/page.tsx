"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Phone, Mail, MapPin, Send, HelpCircle, AlertCircle, CheckCircle2 } from "lucide-react";
import { services } from "@/content/services";

// Main Form Component using Search Params
function ContactFormContent() {
  const searchParams = useSearchParams();
  const [phoneVal, setPhoneVal] = useState("+998 ");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    telegram: "",
    service: "web-sayt",
    message: "",
    website: "", // Honeypot field
  });

  // Pre-select service from URL query param
  useEffect(() => {
    const serviceParam = searchParams.get("xizmat");
    if (serviceParam && services.some((s) => s.id === serviceParam)) {
      setFormData((prev) => ({ ...prev, service: serviceParam }));
    }
    
    // Check if score from diagnostic is passed
    const scoreParam = searchParams.get("ball");
    if (scoreParam) {
      setFormData((prev) => ({
        ...prev,
        message: `Biznes diagnostika natijasi: ${scoreParam} ball. Bepul konsultatsiya olishni xohlayman.`,
      }));
    }
  }, [searchParams]);

  // Uzbek Phone number mask logic
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    
    // Always start with +998
    if (!input.startsWith("+998")) {
      input = "+998 " + input.replace(/\D/g, "");
    }

    const digits = input.replace(/\D/g, "").slice(3, 12); // slice after '998'
    let formatted = "+998";
    
    if (digits.length > 0) {
      formatted += ` (${digits.slice(0, 2)}`;
    }
    if (digits.length > 2) {
      formatted += `) ${digits.slice(2, 5)}`;
    }
    if (digits.length > 5) {
      formatted += `-${digits.slice(5, 7)}`;
    }
    if (digits.length > 7) {
      formatted += `-${digits.slice(7, 9)}`;
    }

    setPhoneVal(formatted);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic phone validation (check length)
    const rawDigits = phoneVal.replace(/\D/g, "");
    if (rawDigits.length < 12) {
      setStatus("error");
      setErrorMsg("Iltimos, telefon raqamini to'liq kiriting.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: phoneVal,
          telegram: formData.telegram,
          service: formData.service,
          message: formData.message,
          website: formData.website, // honeypot
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || "Xabar yuborishda xatolik yuz berdi.");
      }

      setStatus("success");
      setFormData({
        name: "",
        telegram: "",
        service: "web-sayt",
        message: "",
        website: "",
      });
      setPhoneVal("+998 ");

    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Tizim xatoligi yuz berdi. Iltimos, keyinroq qayta urinib ko'ring.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch relative z-10 w-full">
      {/* Contact Information card */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-8 glass-panel-accent p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />

        <div className="space-y-6">
          <h3 className="font-display font-bold text-2xl text-white">Loyihangiz bormi?</h3>
          <p className="text-sm text-mutedText leading-relaxed">
            Biznesingizni Next.js veb-sayti orqali rivojlantirish yoki AI tizimlar yordamida jarayonlarni avtomatlashtirish haqida o&apos;ylayapsizmi? Ma&apos;lumotlaringizni qoldiring, biz sizga eng qulay texnik yechimlarni taklif qilamiz.
          </p>
        </div>

        {/* Info detail list */}
        <div className="space-y-4 pt-6 border-t border-white/5">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-xl bg-accent/10 text-accent flex-shrink-0">
              <Phone size={18} />
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-white/40">Telefon raqam</span>
              <a href="tel:+998200022729" className="text-sm font-bold text-white hover:text-accent transition-colors">+998 20 002 27 29</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-xl bg-accent/10 text-accent flex-shrink-0">
              <Mail size={18} />
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-white/40">Elektron pochta</span>
              <a href="mailto:shukurullohai@gmail.com" className="text-sm font-bold text-white hover:text-accent transition-colors">shukurullohai@gmail.com</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-xl bg-accent/10 text-accent flex-shrink-0">
              <MapPin size={18} />
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-white/40">Manzil</span>
              <span className="text-sm font-bold text-white">Toshkent, O&apos;zbekiston</span>
            </div>
          </div>
        </div>

        {/* Small social channels */}
        <div className="pt-6 border-t border-white/5 flex gap-4">
          <a href="https://t.me/Shukuruiloh" target="_blank" rel="noopener noreferrer" className="text-xs text-mutedText hover:text-accent transition-colors flex items-center gap-1.5">
            <Send size={14} />
            <span>Telegramda yozish</span>
          </a>
        </div>
      </div>

      {/* Main Glassmorphism Form Card */}
      <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {status === "success" ? (
            /* SUCCESS MESSAGE */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-6 py-12"
            >
              <div className="w-16 h-16 rounded-full bg-accent/15 border border-accent/30 text-accent flex items-center justify-center mx-auto shadow-lg shadow-accent/20">
                <CheckCircle2 size={32} />
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-bold text-white">Rahmat!</h4>
                <p className="text-sm text-mutedText max-w-sm mx-auto">
                  Sizning xabaringiz muvaffaqiyatli qabul qilindi. Tez orada Shukurulloh Mamadaliyev siz bilan bog&apos;lanadi.
                </p>
              </div>
              <button
                onClick={() => setStatus("idle")}
                className="px-6 py-2.5 bg-accent text-black font-semibold rounded-xl text-xs hover:bg-accent-hover transition-colors"
              >
                Yangi xabar yuborish
              </button>
            </motion.div>
          ) : (
            /* CONTACT FORM */
            <motion.form key="form" onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <h4 className="text-xl font-bold text-white">Biz bilan bog&apos;lanish</h4>
                <p className="text-xs text-mutedText">Barcha loyiha tafsilotlarini kelishib olish uchun ma&apos;lumotlarni to&apos;ldiring.</p>
              </div>

              {/* Honeypot anti-spam field */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="hidden"
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/70 uppercase">Ismingiz <span className="text-accent">*</span></label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Masalan: Ali Valiyev"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-accent transition-colors"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/70 uppercase">Telefon raqam <span className="text-accent">*</span></label>
                  <input
                    type="text"
                    required
                    value={phoneVal}
                    onChange={handlePhoneChange}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Telegram username */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/70 uppercase">Telegram username</label>
                  <input
                    type="text"
                    name="telegram"
                    value={formData.telegram}
                    onChange={handleInputChange}
                    placeholder="@username"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-accent transition-colors"
                  />
                </div>

                {/* Service Dropdown */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/70 uppercase">Xizmatni tanlang <span className="text-accent">*</span></label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-accent transition-colors appearance-none"
                  >
                    {services.map((service) => (
                      <option key={service.id} value={service.id} className="bg-zinc-950">
                        {service.nomi}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/70 uppercase">Xabar matni <span className="text-accent">*</span></label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Loyihangiz yoki savolingiz haqida qisqacha yozing..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none resize-none focus:border-accent transition-colors"
                />
              </div>

              {/* Error block */}
              {status === "error" && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2.5 text-xs text-red-400">
                  <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 bg-accent hover:bg-accent-hover text-black font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-accent/15 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                {status === "loading" ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Xabar yuborilmoqda...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Xabarni yuborish</span>
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Fallback skeleton loader during Suspense loading
function FormLoader() {
  return (
    <div className="w-full h-80 flex items-center justify-center text-mutedText">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <span className="text-xs uppercase tracking-widest animate-pulse">Yuklanmoqda...</span>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center pt-28 pb-16 px-4">
      {/* Background evening light/house image from 8-rasm */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
          alt="Evening Mountain House"
          fill
          className="object-cover opacity-35 scale-105 animate-[zoom_60s_linear_infinite]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/30" />
      </div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Render Form inside Suspense to avoid Next.js static prerender searchParams errors */}
        <Suspense fallback={<FormLoader />}>
          <ContactFormContent />
        </Suspense>
      </div>
    </div>
  );
}
