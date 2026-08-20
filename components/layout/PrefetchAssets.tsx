"use client";

import { useEffect } from "react";
import { certificates } from "@/content/certificates";

/**
 * Sertifikat rasmlarini oldindan (fon rejimida) yuklab qo'yadi.
 *
 * Shu tufayli foydalanuvchi "Sertifikatlar" bo'limiga o'tganda rasmlar
 * allaqachon brauzer keshida bo'ladi va sahifa qorayib turmaydi.
 *
 * `rel="prefetch"` - eng past ustuvorlikdagi so'rov: u joriy sahifaning
 * yuklanishiga xalaqit bermaydi, brauzer bo'sh vaqtida oladi.
 */
export default function PrefetchAssets() {
  useEffect(() => {
    // Sekin internetda foydalanuvchi trafigini behuda sarflamaymiz
    const connection = (navigator as any).connection;
    if (connection?.saveData) return;
    if (/(^|-)2g$/.test(connection?.effectiveType ?? "")) return;

    const links: HTMLLinkElement[] = [];

    const prefetch = () => {
      const sources = Array.from(new Set(certificates.map((c) => c.kichik)));
      for (const src of sources) {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.as = "image";
        link.href = src;
        document.head.appendChild(link);
        links.push(link);
      }
    };

    // Sahifa yuklanib bo'lgach boshlaymiz. requestIdleCallback bor bo'lsa
    // undan foydalanamiz, lekin `timeout` bilan: brauzer hech qachon
    // "bo'sh" bo'lmasa ham (yoki tab fonda tursa ham) baribir ishga tushadi.
    let timer: number | undefined;
    let idleHandle: number | undefined;

    const requestIdle = (window as any).requestIdleCallback;
    if (typeof requestIdle === "function") {
      idleHandle = requestIdle(prefetch, { timeout: 2500 });
    } else {
      timer = window.setTimeout(prefetch, 1500);
    }

    return () => {
      const cancelIdle = (window as any).cancelIdleCallback;
      if (idleHandle !== undefined && typeof cancelIdle === "function") {
        cancelIdle(idleHandle);
      }
      if (timer !== undefined) window.clearTimeout(timer);
      links.forEach((link) => link.remove());
    };
  }, []);

  return null;
}
