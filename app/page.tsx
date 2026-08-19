import React from "react";
import HeroAiChat from "@/components/home/HeroAiChat";
import BrandSection from "@/components/home/BrandSection";
import AboutSplit from "@/components/home/AboutSplit";
import PortfolioGrid from "@/components/home/PortfolioGrid";
import BusinessDiagnostic from "@/components/home/BusinessDiagnostic";
import ScrollSnap from "@/components/layout/ScrollSnap";

/**
 * md+ da har bir seksiya `sticky top-0 h-screen` bo'lib, keyingisi ustidan
 * yopib o'tadi (stacking). `data-snap-section` — ScrollSnap shu atributga
 * qarab snap nuqtalarini hisoblaydi.
 */
const sectionClass =
  "relative md:sticky md:top-0 md:h-screen md:w-full bg-background md:overflow-y-auto";

export default function Home() {
  return (
    <div className="relative">
      {/* Section 1 - Hero AI Chat */}
      <div data-snap-section className={`${sectionClass} z-10`}>
        <HeroAiChat />
      </div>

      {/* Section 2 - Brand section */}
      <div data-snap-section className={`${sectionClass} z-20`}>
        <BrandSection />
      </div>

      {/* Section 3 - About split section */}
      <div data-snap-section className={`${sectionClass} z-30`}>
        <AboutSplit />
      </div>

      {/* Section 4 - Portfolio Grid section */}
      <div data-snap-section className={`${sectionClass} z-40`}>
        <PortfolioGrid />
      </div>

      {/* Section 5 - Business Diagnostic Q&A section */}
      <div data-snap-section className={`${sectionClass} z-50`}>
        <BusinessDiagnostic />
      </div>

      <ScrollSnap />
    </div>
  );
}
