export interface Project {
  nomi: string;
  tavsif: string;
  teglar: string[];
  rasm: string;
  url: string;
}

export const projects: Project[] = [
  {
    nomi: "E-Commerce Savdo Tizimi",
    tavsif: "Online to'lov va to'liq ERP tizimiga ega elektron do'kon",
    teglar: ["Next.js", "Tailwind CSS", "MongoDB", "Stripe"],
    rasm: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=600&auto=format&fit=crop",
    url: "https://github.com/shukurulloh-dev/ecommerce-shop",
  },
  {
    nomi: "AI Boshqaruv CRM Tizimi",
    tavsif: "Mijozlar bilan aloqalarni avtomatlashtiruvchi intellektual panel",
    teglar: ["React", "NestJS", "PostgreSQL", "OpenAI"],
    rasm: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
    url: "https://github.com/shukurulloh-dev/saas-dashboard",
  },
  {
    nomi: "LMS Onlayn Ta'lim Portali",
    tavsif: "Kurslar va sertifikat berish tizimiga ega masofaviy ta'lim sayti",
    teglar: ["Next.js", "Express", "PostgreSQL", "Redis"],
    rasm: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop",
    url: "https://github.com/shukurulloh-dev/lms-course-api",
  },
  {
    nomi: "Ko'chmas Mulk Marketplace",
    tavsif: "Xarita integratsiyasi va live-chat bilan mulk savdosi portali",
    teglar: ["Vue.js", "Nuxt.js", "Socket.io", "Leaflet"],
    rasm: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=600&auto=format&fit=crop",
    url: "https://github.com/shukurulloh-dev/real-estate-portal",
  },
  {
    nomi: "AI Rasm Generator",
    tavsif: "Neyrotarmoqlar yordamida prompt asosida tasvirlar yaratish portali",
    teglar: ["React", "Tailwind", "DALL-E API", "Zustand"],
    rasm: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    url: "https://github.com/shukurulloh-dev/ai-image-generator",
  },
  {
    nomi: "Crypto Wallet Tracker",
    tavsif: "Kriptovalyuta narxlarini kuzatish va live-tahlil paneli",
    teglar: ["TypeScript", "Next.js", "ChartJS", "WebSockets"],
    rasm: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=600&auto=format&fit=crop",
    url: "https://github.com/shukurulloh-dev/crypto-tracker",
  },
  {
    nomi: "Kiberxavfsizlik VPN Paneli",
    tavsif: "Masofaviy tarmoq xavfsizligini ta'minlash uchun VPN ma'muriyati",
    teglar: ["React", "FastAPI", "Docker", "WireGuard"],
    rasm: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop",
    url: "https://github.com/shukurulloh-dev/vpn-admin",
  },
  {
    nomi: "Smart Logistics Tracker",
    tavsif: "Logistika va yuk tashish mashinalarini real vaqtda kuzatish dasturi",
    teglar: ["Node.js", "PostgreSQL", "Google Maps", "Socket.io"],
    rasm: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop",
    url: "https://github.com/shukurulloh-dev/logistics-tracker",
  },
];
