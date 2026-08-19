"use client";

import React from "react";
import { ReactLenis } from "lenis/react";

/**
 * Butun sahifa uchun global (root) Lenis instansiyasi.
 * `root` bo'lgani uchun ichkaridagi istalgan komponent `useLenis()` orqali
 * shu instansiyaga ulana oladi (masalan ScrollSnap).
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        // Sekinroq va yumshoqroq scroll
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        // Bitta g'ildirak harakati kamroq masofa suradi - "otib ketmaydi"
        wheelMultiplier: 0.8,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
