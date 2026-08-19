# UiCode - Shaxsiy Brend va IT-Xizmatlar Sayti

Ushbu loyiha **Shukurulloh Mamadaliyev** uchun shaxsiy brend va IT-xizmatlarini taklif qiluvchi premium kinematografik veb-sayt hisoblanadi.

---

## 🛠 Texnik Stek
* **Next.js 14+ (App Router)**
* **TypeScript**
* **Tailwind CSS**
* **Framer Motion** (Animatsiyalar va shared layout modallar)
* **Lenis** (Silliq skroll)

---

## 🚀 Loyihani Ishga Tushirish

Loyihani o'rnatish va ishlab chiqish rejimida ishga tushirish uchun quyidagi buyruqlarni bajaring:

```bash
# 1. Kutubxonalarni o'rnatish
npm install

# 2. Ishlab chiqish serverini ishga tushirish (Development Mode)
npm run dev

# 3. Production build tayyorlash (Pre-compile)
npm run build

# 4. Production serverini ishga tushirish (Stabillik va tezlik uchun)
npm run start
```

---

## 🔑 Atrof-Muhit O'zgaruvchilari (`.env.local`)

Loyihadagi **AI Chatbot** va **Telegram orqali bog'lanish formasi** ishlashi uchun loyihaning ildiz papkasida `.env.local` faylini yarating va quyidagi kalitlarni to'ldiring:

```env
# OpenAI-compatible AI API parametrlari
AI_API_KEY=sizning_ai_provayder_api_kalitingiz
AI_BASE_URL=https://api.openai.com/v1
AI_MODEL=gpt-4o

# Telegram orqali xabarnomalar olish sozlamalari
TELEGRAM_BOT_TOKEN=sizning_telegram_bot_tokeningiz
TELEGRAM_CHAT_ID=sizning_chat_id_yoki_kanalingiz_id
```

*Eslatma: Kalitlar berilmasa, chat va aloqa formasi avtomatik ravishda **Demo Rejimda** ishlaydi (hech qanday xatoliksiz loyihani to'liq sinab ko'rish mumkin).*

---

## 🖼 Rasmlarni Almashtirish Jadvali

Loyihada vaqtinchalik joylashtirilgan rasmlarni (placeholders) haqiqiylariga almashtirish jadvali:

| Rasm Maqsadi | Loyihada Ishlatilgan Link / Fayl | Tavsiya etilgan o'lcham | Almashtiriluvchi Haqiqiy Rasm / Kontent |
| :--- | :--- | :--- | :--- |
| **Hero Fon Rasmi** | globals.css orqali space-dot-pattern yoki Next.js assets | 1920x1080 | Kinematografik kosmik rasm yoki video fon |
| **Shukurulloh Foto** | `AboutSplit.tsx` dagi Unsplash havola | 600x750 (4:5) | Shukurulloh Mamadaliyevning professional rasmi |
| **Loyihalar Skrinshotlari** | `content/projects.ts` dagi har bir `rasm` havolasi | 800x600 (Browser card) | Haqiqiy bajarilgan loyihalar skrinshotlari |
| **Sertifikatlar Rasmlari** | `content/certificates.ts` dagi har bir `rasm` havolasi | 800x600 | Haqiqiy xalqaro va mahalliy sertifikatlar rasmlari |
| **Aloqa Sahifasi Foni** | `app/aloqa/page.tsx` dagi Unsplash havola | 1920x1080 | Tog'lar fonidagi zamonaviy premium uy (sunset) tasviri |

---

## 📁 Loyiha Tuzilishi

* `app/` - Marshrutlar va sahifalar (globals.css, layout.tsx, page.tsx, aloqa/, sertifikatlar/, xizmatlar/)
* `components/` - Home section komponentlari (Hero, Brand, About, Portfolio, Diagnostic) va umumiy Layoutlar
* `content/` - Saytdagi matnlar, loyihalar va xizmatlar bazasi
* `lib/` - AI provayder va Telegram API integratsiya yordamchilari
