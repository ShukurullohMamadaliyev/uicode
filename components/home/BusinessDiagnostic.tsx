"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronRight, CheckCircle2, RefreshCw, MessageSquareCode } from "lucide-react";
import Link from "next/link";

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    points: number;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "Biznesingizda shaxsiy yoki kompaniya veb-sayti bormi?",
    options: [
      { text: "Ha, bor va barcha talablarga javob beradi", points: 0 },
      { text: "Bor, lekin juda eski yoki moslashuvchan emas", points: 5 },
      { text: "Yo'q, umuman saytimiz yo'q", points: 10 },
    ],
  },
  {
    id: 2,
    text: "Mijozlardan kelgan yangi buyurtmalarni qanday qabul qilasiz?",
    options: [
      { text: "To'liq avtomatlashtirilgan CRM/sayt tizimi orqali", points: 0 },
      { text: "Telefon, Telegram yoki Instagram orqali qo'lda", points: 8 },
      { text: "Buyurtmalarni qabul qilish va nazorat qilish tizimi yo'q", points: 10 },
    ],
  },
  {
    id: 3,
    text: "Mijozlar ma'lumotlar bazasini (CRM) qayerda saqlaysiz?",
    options: [
      { text: "Maxsus CRM tizimida (Bitrix24, AmoCRM va h.k.)", points: 0 },
      { text: "Excel faylda yoki daftarda qo'lda yozib boramiz", points: 8 },
      { text: "Mijozlar bazasi umuman yuritilmaydi", points: 10 },
    ],
  },
  {
    id: 4,
    text: "Kun davomida takrorlanuvchi ishlarga (hisobot yozish, ma'lumot kiritish) xodimlaringiz qancha vaqt sarflaydi?",
    options: [
      { text: "Kuniga 1 soatdan kam", points: 2 },
      { text: "Kuniga 2-4 soat atrofida", points: 7 },
      { text: "Kuniga 5 soatdan ko'p (vaqt bekor sarflanmoqda)", points: 10 },
    ],
  },
  {
    id: 5,
    text: "Ish vaqtidan tashqari (tunda, dam olish kunlari) mijozlarga qanday javob berasiz?",
    options: [
      { text: "AI-bot yoki avtomatik javob tizimi orqali darhol", points: 0 },
      { text: "Qo'lda, qachon imkoniyat yoki vaqt topilsa", points: 7 },
      { text: "Keyingi ish kunigacha mijozlar javobsiz qoladi", points: 10 },
    ],
  },
  {
    id: 6,
    text: "Turli tizimlar o'rtasida ma'lumotlarni qo'lda ko'chirasizmi (masalan, Telegramdan Excelga)?",
    options: [
      { text: "Yo'q, barcha tizimlarimiz avtomatik integratsiya qilingan", points: 0 },
      { text: "Ha, ba'zida ma'lumotlarni qo'lda o'tkazishga to'g'ri keladi", points: 8 },
      { text: "Ha, doimiy ravishda ko'plab ma'lumotlarni qo'lda yozamiz", points: 10 },
    ],
  },
  {
    id: 7,
    text: "Inson omili sababli buyurtmalarda xatoliklar yoki mijoz yo'qotishlar yuz beradimi?",
    options: [
      { text: "Deyarli yo'q, xatoliklar minimallashtirilgan", points: 2 },
      { text: "Ba'zida chalkashliklar va mijozlarni unutish bo'ladi", points: 7 },
      { text: "Tez-tez sodir bo'ladi va bu bizga moliyaviy zarar keltirmoqda", points: 10 },
    ],
  },
  {
    id: 8,
    text: "Biznesingiz sotuv va marketing hisobotlari qanday tayyorlanadi?",
    options: [
      { text: "Avtomatik tahliliy dashboard (PowerBI, CRM) orqali", points: 0 },
      { text: "Xodimlar tomonidan har oy oxirida qo'lda yig'iladi", points: 7 },
      { text: "Aniq hisobot va ko'rsatkichlar yuritilmaydi", points: 10 },
    ],
  },
  {
    id: 9,
    text: "Kompaniyangiz uchun keyingi 6 oydagi asosiy maqsad nima?",
    options: [
      { text: "Jarayonlarni tizimlashtirish va tartibga solish", points: 10 },
      { text: "Sotuv va mijozlar oqimini keskin oshirish", points: 10 },
      { text: "Operatsion xarajatlarni kamaytirish", points: 10 },
    ],
  },
  {
    id: 10,
    text: "Biznesingizga IT va AI tizimlarini joriy etishga tayyormisiz?",
    options: [
      { text: "Ha, zudlik bilan optimallashtirish va investitsiyaga tayyormiz", points: 10 },
      { text: "Professional maslahat va tahlildan so'ng qaror qilamiz", points: 7 },
      { text: "Hozircha faqat imkoniyatlarni o'rganyapmiz", points: 3 },
    ],
  },
];

export default function BusinessDiagnostic() {
  const [currentStep, setCurrentStep] = useState<number>(0); // 0: Start, 1-10: Questions, 11: Result
  const [score, setScore] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleStart = () => {
    setCurrentStep(1);
    setScore(0);
    setAnswers([]);
  };

  const handleAnswer = (points: number) => {
    const nextAnswers = [...answers, points];
    setAnswers(nextAnswers);
    
    const nextScore = score + points;
    setScore(nextScore);

    if (currentStep < 10) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(11); // Result page
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setScore(0);
    setAnswers([]);
  };

  // Get dynamic result recommendations
  const getResult = () => {
    if (score >= 80) {
      return {
        level: "Kritik ehtiyoj",
        color: "text-red-500 border-red-500/25 bg-red-500/5",
        progressColor: "#ef4444",
        desc: "Sizning biznesingizga zudlik bilan shaxsiy veb-sayt va AI avtomatlashtirish tizimlarini joriy etish kerak. Hozirda siz inson omili, qo'lda bajariladigan ishlar va mijozlarni javobsiz qoldirish sababli kamida 40% foyda va ko'plab mijozlarni yo'qotyapsiz. Jarayonlarni tizimlashtirish operatsion xarajatlaringizni keskin kamaytiradi.",
      };
    } else if (score >= 50) {
      return {
        level: "Yuqori ehtiyoj",
        color: "text-yellow-500 border-yellow-500/25 bg-yellow-500/5",
        progressColor: "#eab308",
        desc: "Kompaniyangizda ba'zi jarayonlar yo'lga qo'yilgan, biroq IT yechimlar va sun'iy intellektdan unumli foydalanilmayapti. Sayt yaratish va Telegram bot orqali avtomatik javob qaytarish tizimlarini ulasangiz, o'sish sur'atini 2 barobarga oshirasiz va jamoangizni takroriy ishlardan xalos qilasiz.",
      };
    } else {
      return {
        level: "Profilaktika va optimallashtirish",
        color: "text-accent border-accent/25 bg-accent/5",
        progressColor: "#3DF08B",
        desc: "Sizning biznesingiz tizimlari nisbatan yaxshi tashkil qilingan. Lekin raqobatchilardan doimo oldinda bo'lish, marketing hisobotlarini real vaqtda olish va AI mijoz yordamchilarini sinab ko'rish orqali yanada yuqori cho'qqilarni zabt etishingiz mumkin.",
      };
    }
  };

  const result = getResult();
  const currentQuestion = questions[currentStep - 1];

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden border-t border-white/5 space-dot-pattern">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(61,240,139,0.01),transparent_50%)]" />

      <div className="max-w-3xl mx-auto px-4 w-full">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12 md:mb-[clamp(1.5rem,4vh,3rem)]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider">
            <HelpCircle size={14} />
            <span>Biznes Tahlili</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            Sizga sayt va avtomatlashtirish qanchalik kerak?
          </h3>
          <p className="text-sm sm:text-base text-mutedText max-w-lg mx-auto">
            10 ta tezkor savolga javob bering va biznesingizdagi muammolar hamda samaradorlik ballini aniqlang.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="glass-panel rounded-3xl border border-white/10 p-6 sm:p-10 md:py-[clamp(1.25rem,3.5vh,2.5rem)] shadow-2xl relative overflow-hidden min-h-[350px] md:min-h-[clamp(16rem,41vh,22rem)] flex flex-col justify-center">
          <div className="absolute top-0 left-0 h-1.5 bg-accent transition-all duration-300" style={{ width: `${(currentStep / 10) * 100}%` }} />

          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              /* START SCREEN */
              <motion.div
                key="start"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="text-center space-y-8 py-6"
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 text-accent flex items-center justify-center mx-auto shadow-lg shadow-accent/15">
                  <MessageSquareCode size={28} />
                </div>
                <div className="space-y-3">
                  <h4 className="text-xl sm:text-2xl font-bold text-white">Diagnostikani boshlash</h4>
                  <p className="text-sm text-mutedText max-w-md mx-auto">
                    Ushbu test sizning operatsion xarajatlaringiz, buyurtma yo'qotishlaringiz va tizimlashtirish darajangizni hisoblab chiqadi.
                  </p>
                </div>
                <button
                  onClick={handleStart}
                  className="px-8 py-3.5 bg-accent text-black font-bold hover:bg-accent-hover rounded-2xl transition-all duration-300 shadow-lg shadow-accent/15 inline-flex items-center gap-2"
                >
                  <span>Tahlilni boshlash</span>
                  <ChevronRight size={18} />
                </button>
              </motion.div>
            )}

            {currentStep >= 1 && currentStep <= 10 && currentQuestion && (
              /* QUESTIONS */
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Progress status */}
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-mutedText">
                  <span>Savol {currentStep} / 10</span>
                  <span className="text-accent">{Math.round((currentStep / 10) * 100)}% yakunlandi</span>
                </div>

                {/* Question Text */}
                <h4 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {currentQuestion.text}
                </h4>

                {/* Options List */}
                <div className="space-y-3 pt-2">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option.points)}
                      className="w-full text-left p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] hover:border-accent/30 text-sm sm:text-base text-mutedText hover:text-white transition-all duration-200 flex justify-between items-center group"
                    >
                      <span>{option.text}</span>
                      <ChevronRight size={16} className="text-white/20 group-hover:text-accent group-hover:translate-x-1 transition-all duration-200" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {currentStep === 11 && (
              /* RESULTS SCREEN */
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8 py-4"
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Radial progress ring score display */}
                  <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="72"
                        cy="72"
                        r="60"
                        className="stroke-white/5 fill-none"
                        strokeWidth="8"
                      />
                      <circle
                        cx="72"
                        cy="72"
                        r="60"
                        className="fill-none transition-all duration-1000 ease-out"
                        stroke={result.progressColor}
                        strokeWidth="8"
                        strokeDasharray={2 * Math.PI * 60}
                        strokeDashoffset={2 * Math.PI * 60 * (1 - score / 100)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute text-center space-y-1">
                      <span className="text-3xl font-display font-extrabold text-white">{score}</span>
                      <span className="text-xs text-mutedText block">ball</span>
                    </div>
                  </div>

                  {/* Recommendation description */}
                  <div className="space-y-3 text-center md:text-left">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${result.color}`}>
                      <CheckCircle2 size={12} />
                      <span>{result.level}</span>
                    </div>
                    <h4 className="text-xl font-bold text-white">Sizning Diagnostika Natijangiz</h4>
                    <p className="text-sm text-mutedText leading-relaxed">
                      {result.desc}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-6 border-t border-white/5">
                  <button
                    onClick={handleRestart}
                    className="w-full sm:w-auto px-6 py-3 border border-white/10 hover:border-accent text-white hover:text-accent font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                  >
                    <RefreshCw size={14} />
                    <span>Qayta urinish</span>
                  </button>
                  <Link
                    href={`/aloqa?xizmat=diagnostika-natijasi&ball=${score}`}
                    className="w-full sm:w-auto px-6 py-3 bg-accent text-black font-bold hover:bg-accent-hover rounded-xl transition-all duration-300 text-center text-sm shadow-lg shadow-accent/15"
                  >
                    Natija bo&apos;yicha bepul konsultatsiya
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
