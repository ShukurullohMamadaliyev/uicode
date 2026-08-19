"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";
import Snap from "lenis/snap";

type ScrollSnapProps = {
  /** Snap nuqtalari olinadigan seksiyalar. */
  selector?: string;
  /** Sahifa oxiri (footer) ham snap nuqtasi bo'lsinmi. */
  includeFooter?: boolean;
  /** Bir seksiyadan ikkinchisiga o'tish davomiyligi (sekund). */
  duration?: number;
};

/** Animatsiya tugagach, keyingi o'tishgacha kutish vaqti (ms). */
const COOLDOWN = 250;
/** Shu qiymatdan kichik delta'lar (sichqoncha titrashi) e'tiborsiz qoldiriladi. */
const MIN_DELTA = 12;

/**
 * Stacking seksiyalar uchun "snap on scroll".
 *
 * Ikki sababga ko'ra tayyor yechimlar to'g'ri ishlamaydi:
 *  1. CSS `scroll-snap-type` - Lenis wheel eventlarini o'zi ushlab qolgani
 *     uchun brauzerning snap mexanizmi umuman ishga tushmaydi.
 *  2. `lenis/snap` ning "lock" rejimi - u keyingi nuqtani `scroll + delta`
 *     bo'yicha izlaydi, shuning uchun katta flick'da (delta sahifadan uzun)
 *     hech qanday nuqta topolmay joyida qotib qoladi.
 *
 * Shuning uchun `lenis/snap` dan faqat o'lchash (`computeSnaps`, `goTo`)
 * ishlatiladi, harakat mantig'i esa shu yerda: har bir scroll harakati
 * yo'nalish bo'yicha aynan bitta seksiya suradi.
 */
export default function ScrollSnap({
  selector = "[data-snap-section]",
  includeFooter = true,
  duration = 0.9,
}: ScrollSnapProps) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Stacking layout faqat md+ da yoqilgan, snap ham faqat o'sha yerda kerak.
    const desktop = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let snap: Snap | null = null;
    let restoreVirtualScroll: (() => void) | null = null;
    let cooldown: (() => void) | null = null;

    const teardown = () => {
      cooldown?.();
      restoreVirtualScroll?.();
      restoreVirtualScroll = null;
      snap?.destroy();
      snap = null;
    };

    const build = () => {
      teardown();
      if (!desktop.matches || reduced.matches) return;

      const sections = Array.from(
        document.querySelectorAll<HTMLElement>(selector)
      );
      if (sections.length < 2) return;

      let animating = false;
      let cooldownTimer: number | undefined;

      snap = new Snap(lenis, {
        type: "lock", // goTo() animatsiya davomida scroll'ni bloklaydi
        duration,
        // easeInOutCubic - boshi ham, oxiri ham yumshoq.
        easing: (t) =>
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
        onSnapComplete: () => {
          // Qisqa "cooldown": flick'dan keyingi inersiya eventlari darhol
          // keyingi seksiyaga o'tkazib yubormasligi uchun.
          cooldownTimer = window.setTimeout(() => {
            animating = false;
          }, COOLDOWN);
        },
      });

      // Snap'ning o'z "scroll to'xtagach eng yaqinini top" mantig'i o'chiriladi.
      snap.stop();

      // ignoreTransform: o'lchash getBoundingClientRect emas, offsetTop orqali
      // ketadi. Aks holda template.tsx ning kirish animatsiyasi (translateY)
      // snap nuqtalarini bir necha piksel surib yuboradi.
      snap.addElements(sections, { align: "start", ignoreTransform: true });

      // Oxirgi seksiyadan keyin footer ham to'liq ko'rinadigan nuqta bo'lsin.
      const footer = includeFooter ? document.querySelector("footer") : null;
      if (footer) {
        snap.addElement(footer as HTMLElement, {
          align: "end",
          ignoreTransform: true,
        });
      }

      // computeSnaps() lenis/snap ichida `private` deb belgilangan, lekin
      // goTo(index) aynan shu ro'yxatning indeksini kutadi - eng yaqin
      // nuqtani topish uchun bizga ham xuddi shu ro'yxat kerak.
      const readSnaps = () =>
        (snap as unknown as { computeSnaps: () => { value: number }[] })
          .computeSnaps()
          .map((item) => item.value);

      /** Yo'nalish bo'yicha qo'shni snap nuqtasiga o'tadi. */
      const goRelative = (direction: number) => {
        const values = readSnaps();
        if (values.length === 0) return;

        let nearest = 0;
        for (let i = 1; i < values.length; i++) {
          if (
            Math.abs(values[i] - lenis.scroll) <
            Math.abs(values[nearest] - lenis.scroll)
          ) {
            nearest = i;
          }
        }

        const target = Math.max(
          0,
          Math.min(nearest + direction, values.length - 1)
        );
        if (target === nearest) return;

        animating = true;
        snap!.goTo(target);
      };

      const previous = lenis.options.virtualScroll;
      lenis.options.virtualScroll = (data) => {
        if (previous && previous(data) === false) return false;
        // Sensorli qurilmalarda odatdagi scroll qoladi.
        if (String(data.event?.type ?? "").includes("touch")) return true;

        // Modal/ichki scroll zonalari (masalan to'liq ekranli AI chat).
        // `false` qaytarsak Lenis eventga umuman tegmaydi va preventDefault
        // ham qilmaydi - brauzer o'sha ichki blokni o'zi silliq suradi.
        const path = data.event?.composedPath?.() ?? [];
        if (
          path.some(
            (node) =>
              node instanceof HTMLElement && node.hasAttribute("data-lenis-prevent")
          )
        ) {
          return false;
        }

        // Bu sahifada g'ildirak sahifani erkin surmaydi - u faqat "keyingi /
        // oldingi seksiya" buyrug'i. Shuning uchun eventni o'zimiz to'xtatamiz
        // va Lenis'ga uzatmaymiz (`false`), aks holda sahifa snap nuqtasidan
        // asta siljib ketadi.
        if (data.event?.cancelable) data.event.preventDefault();

        if (!animating && Math.abs(data.deltaY) >= MIN_DELTA) {
          goRelative(Math.sign(data.deltaY));
        }

        return false;
      };

      restoreVirtualScroll = () => {
        lenis.options.virtualScroll = previous;
      };

      cooldown = () => {
        window.clearTimeout(cooldownTimer);
      };
    };

    build();

    desktop.addEventListener("change", build);
    reduced.addEventListener("change", build);

    return () => {
      desktop.removeEventListener("change", build);
      reduced.removeEventListener("change", build);
      teardown();
    };
  }, [lenis, selector, includeFooter, duration]);

  return null;
}
