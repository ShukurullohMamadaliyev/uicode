/**
 * AI javobini xavfsiz HTML'ga aylantirish.
 *
 * Javob `dangerouslySetInnerHTML` orqali chiziladi, shuning uchun avval
 * BARCHA HTML ekranlanadi va faqat shundan keyin markdown belgilariga
 * ruxsat beriladi. Aks holda model chiqargan `<img onerror=...>` yoki
 * `<script>` bevosita brauzerda ishga tushadi (XSS).
 */

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Faqat ichki yo'l va http(s) ga ruxsat: `javascript:` kabi sxemalar bloklanadi. */
const safeHref = (raw: string) => {
  const url = raw.trim();
  if (/^\/(?!\/)/.test(url) || /^https?:\/\//i.test(url)) return url;
  return "#";
};

export function formatAssistantMessage(raw: string): string {
  return escapeHtml(raw)
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\* (.*?)\n/g, "<li>$1</li>")
    .replace(/\* (.*?)$/g, "<li>$1</li>")
    .replace(
      /\[(.*?)\]\((.*?)\)/g,
      (_match, text: string, href: string) =>
        `<a href="${safeHref(href)}" class="text-accent underline font-semibold">${text}</a>`
    );
}
