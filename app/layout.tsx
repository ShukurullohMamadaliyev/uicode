import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ScrollToTop from "@/components/layout/ScrollToTop";
import PrefetchAssets from "@/components/layout/PrefetchAssets";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UiCode | Shukurulloh Mamadaliyev",
  description: "IT-yechimlar, zamonaviy veb-saytlar va biznesni AI bilan avtomatlashtirish xizmatlari.",
  keywords: ["UiCode", "Shukurulloh Mamadaliyev", "Dasturchi", "AI avtomatlashtirish", "Web saytlar", "Telegram Bot", "SSO", "Toshkent"],
  authors: [{ name: "Shukurulloh Mamadaliyev" }],
  metadataBase: new URL("https://uicode.uz"),
  openGraph: {
    title: "UiCode | IT-yechimlar va AI avtomatlashtirish",
    description: "Shukurulloh Mamadaliyevdan professional veb-saytlar va biznesni avtomatlashtirish xizmatlari.",
    url: "https://uicode.uz",
    siteName: "UiCode",
    locale: "uz_UZ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} bg-background text-white font-sans antialiased`}
      >
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <Footer />
          <ScrollToTop />
          <PrefetchAssets />
        </SmoothScroll>
      </body>
    </html>
  );
}
