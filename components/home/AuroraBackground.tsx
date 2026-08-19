import React from "react";

/**
 * Bosh sahifa hero qismi uchun "aurora" fon.
 *
 * Sariq / yashil / qora kombinatsiyasi. Blob'lar butun ekran bo'ylab
 * tarqalgan (burchaklar ham, markaz ham) va chuvalchang kabi to'lqinlanib,
 * yopiq trayektoriya bo'ylab uzluksiz sudralib yuradi. Butunlay CSS -
 * video ham, canvas ham, JS animatsiya ham yo'q.
 */
export default function AuroraBackground() {
  return (
    <div className="aurora" aria-hidden="true">
      <div className="aurora__blob aurora__blob--gold" />
      <div className="aurora__blob aurora__blob--lime" />
      <div className="aurora__blob aurora__blob--amber" />
      <div className="aurora__blob aurora__blob--emerald" />
      <div className="aurora__blob aurora__blob--sun" />
      <div className="aurora__blob aurora__blob--roam" />
      <div className="aurora__grain" />
      <div className="aurora__vignette" />
    </div>
  );
}
