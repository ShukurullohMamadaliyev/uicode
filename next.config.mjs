/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async headers() {
    // /public ichidagi fayllar sukut bo'yicha `max-age=0` bilan uzatiladi -
    // ya'ni har bir sahifaga o'tganda rasmlar qaytadan so'raladi va sertifikatlar
    // bo'limi ochilguncha qorayib turadi. Bu rasmlar kamdan-kam o'zgaradi,
    // shuning uchun bir kunlik kesh + bir haftalik "eskisini ko'rsatib turib
    // yangilash" (stale-while-revalidate) beriladi.
    const rasmKeshi = {
      key: 'Cache-Control',
      value: 'public, max-age=86400, stale-while-revalidate=604800',
    };

    return [
      {
        source: '/sertifikat/:path*',
        headers: [rasmKeshi],
      },
      {
        source: '/:file(logo.png|logo.jpg|logo-icon.png|logo-text.png|shukurulloh.webp)',
        headers: [rasmKeshi],
      },
    ];
  },
};

export default nextConfig;
