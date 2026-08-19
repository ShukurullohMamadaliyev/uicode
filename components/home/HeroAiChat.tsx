"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Plus, ArrowLeft, RefreshCw, Sparkles, SendHorizontal, FileText, X } from "lucide-react";
import { siteContent } from "@/content/site";
import { formatAssistantMessage } from "@/lib/ai/format";
import AuroraBackground from "@/components/home/AuroraBackground";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export default function HeroAiChat() {
  const { hero } = siteContent.home;
  const [input, setInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: hero.chatWelcome },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [attachedFile, setAttachedFile] = useState<{ name: string; content: string } | null>(null);

  // Portal faqat brauzerda ishlaydi - SSR paytida document mavjud emas.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert("Fayl hajmi 5MB dan oshmasligi lozim.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setAttachedFile({
        name: file.name,
        content: content || "",
      });
    };
    reader.readAsText(file);
    e.target.value = ""; // Reset value
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !attachedFile) || isLoading) return;

    const originalInput = input.trim();
    let userMessage = originalInput;
    let apiPayloadMessage = originalInput;

    if (attachedFile) {
      if (!userMessage) {
        userMessage = `[Biriktirilgan fayl: ${attachedFile.name}]`;
      } else {
        userMessage = `[Fayl: ${attachedFile.name}]\n\n${userMessage}`;
      }
      apiPayloadMessage = `[Yuklangan fayl: ${attachedFile.name}]\n\nFayl tarkibi:\n\`\`\`\n${attachedFile.content}\n\`\`\`\n\nFoydalanuvchi savoli: ${originalInput || "Faylni tahlil qiling."}`;
    }

    setInput("");
    setAttachedFile(null);
    setIsExpanded(true);

    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    const payloadMessages = [
      ...messages.filter(m => m.role !== "system"),
      { role: "user", content: apiPayloadMessage }
    ];

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: payloadMessages,
        }),
      });

      if (!response.ok) {
        throw new Error("API streaming request failed");
      }

      const streamData = response.body;
      if (!streamData) throw new Error("No readable stream in response");

      const reader = streamData.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let aiResponseText = "";

      // Add a placeholder assistant response
      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: !done });
          aiResponseText += chunk;
          
          setMessages(prev => {
            const list = [...prev];
            if (list.length > 0) {
              list[list.length - 1] = {
                role: "assistant",
                content: aiResponseText,
              };
            }
            return list;
          });
        }
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "Kechirasiz, aloqa o'rnatishda xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([{ role: "assistant", content: hero.chatWelcome }]);
    setIsExpanded(false);
    setInput("");
    setAttachedFile(null);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Jonli aurora fon: apelsin + to'q yashil blob'lar sekin oqib turadi */}
      <AuroraBackground />

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".txt,.json,.csv,.xml,.md,.js,.ts,.jsx,.tsx,.py,.html,.css,.sql,.yaml,.yml"
      />

      <div className="max-w-4xl mx-auto px-4 w-full flex flex-col items-center">
        
        {/* Animated Introductory Content (hidden if chat is full-screen) */}
        {!isExpanded && (
          <div className="text-center space-y-6 mb-12 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider"
            >
              <Sparkles size={14} className="animate-spin" />
              <span>{hero.badge}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight leading-tight text-white"
            >
              G&apos;oyani shakllantiring.<br />
              Biz uni <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400 neon-text-glow">
                AI bilan quramiz.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base sm:text-lg text-mutedText"
            >
              {hero.subtitle}
            </motion.p>
          </div>
        )}

        {/* To'liq ekranli chat <body> ga portal orqali chiqariladi.
            Sababi: bu blok hero seksiyasi ichida bo'lsa, u `z-10` stacking
            context ichida qolib ketadi va sayt header'i (fixed, z-50) uning
            ustidan tushadi - "Ortga" tugmasi bosilmaydi, "Sertifikatlarim"
            havolasi esa "Shukurulloh AI" yozuvini to'sib qo'yadi. */}
        {mounted &&
          createPortal(
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  data-lenis-prevent
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  // Yopilish animatsiyasi davomida (0.3s) ortidagi elementlar
                  // bosilishini to'smasin
                  style={{ pointerEvents: isExpanded ? "auto" : "none" }}
                  className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl p-4 md:p-8 flex flex-col"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.99 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
                    className="max-w-4xl mx-auto w-full h-full flex flex-col justify-between"
                  >
              {/* Expanded Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                <button
                  onClick={handleResetChat}
                  className="flex items-center gap-2 text-mutedText hover:text-white transition-colors text-sm"
                >
                  <ArrowLeft size={16} />
                  <span>Ortga</span>
                </button>
                <div className="flex items-center gap-2 text-accent font-semibold text-sm">
                  <Sparkles size={14} className="animate-pulse" />
                  <span>Shukurulloh AI</span>
                </div>
                <button
                  onClick={handleResetChat}
                  className="p-2 hover:bg-white/5 rounded-full text-mutedText hover:text-white transition-colors"
                  title="Yangi suhbat"
                >
                  <RefreshCw size={16} />
                </button>
              </div>

              {/* Chat History Messages Stream */}
              <div data-lenis-prevent className="flex-1 overflow-y-auto space-y-6 pr-2 mb-6">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-4 text-sm sm:text-base leading-relaxed ${
                        msg.role === "user"
                          ? "bg-accent text-black font-medium rounded-tr-none shadow-md shadow-accent/10 whitespace-pre-wrap"
                          : "glass-panel-accent text-white rounded-tl-none border border-accent/20"
                      }`}
                    >
                      {msg.role === "assistant" && msg.content === "" && isLoading ? (
                        <div className="flex items-center gap-2 py-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-accent animate-bounce [animation-delay:-0.3s]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-accent animate-bounce [animation-delay:-0.15s]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-accent animate-bounce" />
                        </div>
                      ) : msg.role === "user" ? (
                        /* Render user message containing potential file attachment badge inside text */
                        <div>{msg.content}</div>
                      ) : (
                        /* Assistant responses */
                        <div
                          className="whitespace-pre-wrap prose prose-invert max-w-none prose-sm"
                          dangerouslySetInnerHTML={{
                            __html: formatAssistantMessage(msg.content),
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Expanded Bottom Input Form */}
              <form onSubmit={handleSubmit} className="border-t border-white/5 pt-4">
                {/* File Attachment Badge */}
                {attachedFile && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 w-fit text-xs text-white mb-2 ml-4">
                    <FileText size={14} className="text-accent" />
                    <span className="truncate max-w-[150px] font-mono">{attachedFile.name}</span>
                    <button
                      type="button"
                      onClick={() => setAttachedFile(null)}
                      className="p-1 hover:bg-white/10 rounded-full text-mutedText hover:text-white transition-colors"
                      title="Faylni o'chirish"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}

                <div className="relative flex items-center glass-panel rounded-2xl border border-white/10 px-4 py-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 hover:bg-white/5 rounded-full text-mutedText hover:text-white transition-colors"
                    title="Fayl biriktirish (.txt, .json, .csv, .md, .py, .js, vb.)"
                  >
                    <Plus size={20} />
                  </button>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={attachedFile ? "Fayl bo'yicha savolingizni yozing..." : "Savolingizni yozing..."}
                    className="flex-1 bg-transparent border-none outline-none px-3 text-white placeholder-white/30 text-sm sm:text-base focus:ring-0"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={(!input.trim() && !attachedFile) || isLoading}
                    className="p-2 bg-accent text-black hover:bg-accent-hover rounded-xl disabled:opacity-50 disabled:hover:bg-accent transition-colors shadow-lg shadow-accent/15 cursor-pointer"
                  >
                    <SendHorizontal size={18} />
                  </button>
                </div>
              </form>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body
          )}

        {/* Hero'dagi kichik chat oynasi */}
        {!isExpanded && (
          <div className="w-full max-w-2xl">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onSubmit={handleSubmit}
              className="glass-panel rounded-3xl border border-white/10 p-4 sm:p-6 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent pointer-events-none" />
              
              <div className="flex flex-col gap-4">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={hero.chatPlaceholder}
                  rows={2}
                  className="w-full bg-transparent border-none outline-none resize-none text-white text-base placeholder-white/30 focus:ring-0"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />

                {/* File Attachment Badge */}
                {attachedFile && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 w-fit text-xs text-white">
                    <FileText size={14} className="text-accent" />
                    <span className="truncate max-w-[150px] font-mono">{attachedFile.name}</span>
                    <button
                      type="button"
                      onClick={() => setAttachedFile(null)}
                      className="p-1 hover:bg-white/10 rounded-full text-mutedText hover:text-white transition-colors"
                      title="Faylni o'chirish"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 hover:bg-white/5 rounded-xl text-mutedText hover:text-white transition-colors flex items-center gap-2 text-xs font-semibold"
                    title="Fayl biriktirish (.txt, .json, .csv, .md, .py, .js, vb.)"
                  >
                    <Plus size={18} />
                    <span className="hidden sm:inline">Fayl biriktirish</span>
                  </button>

                  <button
                    type="submit"
                    disabled={(!input.trim() && !attachedFile) || isLoading}
                    className="px-5 py-2.5 bg-white text-black font-semibold hover:bg-accent hover:text-black rounded-2xl transition-all duration-300 flex items-center gap-2 disabled:opacity-50 text-sm shadow-lg shadow-white/5 cursor-pointer"
                  >
                    <span>Yuborish</span>
                    <Send size={14} />
                  </button>
                </div>
              </div>
            </motion.form>
          </div>
        )}
      </div>
    </section>
  );
}
