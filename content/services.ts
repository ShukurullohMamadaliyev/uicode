export interface Service {
  id: string;
  nomi: string;
  kaltatavsif: string;
  batafsil: string;
  ichida: string[];
  muddat: string;
  icon: string;
  color: string;
}

export const services: Service[] = [
  {
    id: "web-sayt",
    nomi: "Kompaniyangiz uchun veb-sayt yaratib berish",
    kaltatavsif: "Next.js va React yordamida tezkor, chiroyli va Google (SEO) talablariga to'liq moslashuvchan veb-saytlar.",
    batafsil: "Biznesingizning internetdagi yuzi bo'ladigan zamonaviy va premium sifatli veb-saytlarni noldan boshlab qurib beramiz. Next.js va Tailwind CSS texnologiyalari yordamida tezligi o'ta yuqori bo'lgan sahifalar yaratiladi, bu esa Google qidiruv tizimlarida yuqoriga chiqishni osonlashtiradi.",
    ichida: [
      "Figma premium UX/UI dizayn loyihasi",
      "Next.js App Router va TypeScript kodlash",
      "To'liq mobil moslashuvchanlik (responsive)",
      "SEO asosiy optimallashtirish (Google PageSpeed 90+)",
      "Admin paneli joriy etish (CMS ulanishi)",
    ],
    muddat: "10-25 kun",
    icon: "fa-laptop-code",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "ai-avtomatlashtirish",
    nomi: "Biznesingizni AI bilan avtomatlashtirish",
    kaltatavsif: "Mijozlar bilan 24/7 suhbatlashuvchi va hisobotlarni avtomatlashtiruvchi sun'iy intellekt tizimlari.",
    batafsil: "Kompaniyangiz ish jarayonlarini sun'iy intellekt yordamida avtomatlashtirish orqali operatsion xarajatlarni kamaytiring. Mijozlarga kechayu-kunduz xizmat qiladigan aqlli AI agentlar, katta ma'lumotlarni tahlil qiluvchi va hisobotlarni shakllantiruvchi yechimlarni integratsiya qilamiz.",
    ichida: [
      "AI Chatbotlarni sayt, Telegram yoki CRM ga ulash",
      "OpenAI, Anthropic yoki maxsus LLM modellar integratsiyasi",
      "Biznes ma'lumotlar bazasi (Knowledge base) yaratish",
      "Avtomatik hisobotlar va tahliliy dashboardlar",
      "Xodimlar ish yukini 30% gacha kamaytirish",
    ],
    muddat: "15-30 kun",
    icon: "fa-brain",
    color: "from-emerald-500 to-green-600",
  },
  {
    id: "telegram-bot",
    nomi: "Telegram bot va CRM integratsiyasi",
    kaltatavsif: "Savdolarni tizimlashtiruvchi, to'lov qabul qiluvchi botlar va CRM tizimlari (AmoCRM, Bitrix) integratsiyasi.",
    batafsil: "Telegram tarmog'ida to'liq avtomatlashtirilgan savdo botlarini va ularni AmoCRM, Bitrix24 yoki Excel bazalari bilan ulanishini ta'minlaymiz. Bu orqali mijozlar buyurtmalari hech qachon yo'qolmaydi va buyurtma holati avtomatik xabar qilinadi.",
    ichida: [
      "Click va Payme to'lov tizimlarini integratsiya qilish",
      "AmoCRM, Bitrix24 yoki shaxsiy ERP ulanishi",
      "Real-vaqtdagi ma'lumotlar bazasi sinxronizatsiyasi",
      "Guruh va kanallarni avtomatik boshqaruvchi botlar",
      "Buyurtmalar statistikasi va Excelga yuklash paneli",
    ],
    muddat: "7-15 kun",
    icon: "fa-robot",
    color: "from-purple-500 to-pink-600",
  },
];
