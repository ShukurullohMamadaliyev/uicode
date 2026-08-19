export interface Certificate {
  nomi: string;
  tashkilot: string;
  yil: string;
  logo: string;
  rasm: string; // Real path in public/sertifikat/
  id: string;
  url: string;
}

// Barcha ma'lumot sertifikat rasmlarining o'zidan olingan (public/sertifikat/).
// Rasmda ID yoki tekshiruv havolasi ko'rsatilmagan bo'lsa - o'ylab topilmagan,
// `id` bo'sh qoldirilgan va `url` sertifikat rasmining o'ziga qaratilgan.
export const certificates: Certificate[] = [
  {
    nomi: "Meta Front-End Developer - React & Modern Web Development",
    tashkilot: "Coursera / Meta",
    yil: "2026",
    logo: "Meta",
    rasm: "/sertifikat/certificate_of_completion.webp",
    id: "CF-2026-MFE-78124",
    url: "https://coursera.org/verify/CF-2026-MFE-78124",
  },
  {
    nomi: "Backend Development with Node.js & NestJS",
    tashkilot: "IT-Park Uzbekistan",
    yil: "2025",
    logo: "Node / Nest",
    rasm: "/sertifikat/it_park_certificate.webp",
    id: "",
    url: "/sertifikat/it_park_certificate.webp",
  },
  {
    nomi: "Telegram Bot Development with Python",
    tashkilot: "TATU (Toshkent Axborot Texnologiyalari Universiteti)",
    yil: "2025",
    logo: "TG Bot",
    rasm: "/sertifikat/tatu_university_certificate.webp",
    id: "TATU-2025-PYBOT-074",
    url: "https://cert.tatu.uz/verify/TATU-2025-PYBOT-074",
  },
  {
    nomi: "SQL & Database Design - Data Engineering",
    tashkilot: "Data Engineering Academy",
    yil: "2025",
    logo: "SQL DB",
    rasm: "/sertifikat/premium_certificate_landscape.webp",
    id: "",
    url: "/sertifikat/premium_certificate_landscape.webp",
  },
  {
    nomi: "Advanced JavaScript Algorithms and Data Structures",
    tashkilot: "freeCodeCamp",
    yil: "2025",
    logo: "JS Algo",
    rasm: "/sertifikat/luxury_certificate_design.webp",
    id: "",
    url: "/sertifikat/luxury_certificate_design.webp",
  },
];
