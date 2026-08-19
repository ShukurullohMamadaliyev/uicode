import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiter map
const ipCache = new Map<string, number>();
const RATE_LIMIT_COOLDOWN = 60 * 1000; // 1 minute cooldown per IP

// Map xotirada cheksiz o'sib ketmasligi uchun eskirgan yozuvlarni tozalaymiz
function pruneIpCache(now: number) {
  if (ipCache.size < 5_000) return;
  ipCache.forEach((time, key) => {
    if (now - time >= RATE_LIMIT_COOLDOWN) ipCache.delete(key);
  });
}

export async function POST(req: NextRequest) {
  try {
    const ip = (req.headers.get("x-forwarded-for") || "anonymous").split(",")[0].trim();
    const now = Date.now();
    pruneIpCache(now);

    // Check rate limit
    if (ipCache.has(ip)) {
      const lastRequestTime = ipCache.get(ip)!;
      if (now - lastRequestTime < RATE_LIMIT_COOLDOWN) {
        return NextResponse.json(
          { error: "Juda ko'p so'rov yuborildi. Iltimos, 1 daqiqadan so'ng qayta urinib ko'ring." },
          { status: 429 }
        );
      }
    }

    const body = await req.json();
    const { name, phone, telegram, service, message, website } = body;

    // Honeypot spam protection (hidden website input)
    if (website) {
      // Quietly return success without doing anything
      return NextResponse.json({ success: true, spam: true });
    }

    // Basic validation
    if (!name || !phone || !service || !message) {
      return NextResponse.json(
        { error: "Barcha majburiy maydonlarni to'ldiring." },
        { status: 400 }
      );
    }

    // Maydon uzunligi cheklovi: cheklovsiz bo'lsa kimdir megabaytlab matn
    // yuborib, Telegram API'ni ham, funksiya vaqtini ham behuda sarflaydi.
    const limits: Record<string, number> = {
      name: 100,
      phone: 30,
      telegram: 64,
      service: 64,
      message: 3000,
    };
    for (const [field, max] of Object.entries(limits)) {
      const value = body[field];
      if (typeof value === "string" && value.length > max) {
        return NextResponse.json(
          { error: `"${field}" maydoni juda uzun.` },
          { status: 413 }
        );
      }
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Telegram HTML parse_mode: foydalanuvchi matnidagi <, >, & belgilarini
    // ekranlash shart. Aks holda "<" yozilgan xabar Telegram API'da
    // 400 xatolik beradi va xabar umuman yetib bormaydi.
    const esc = (v: unknown) =>
      String(v ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    // Format message for Telegram (HTML parse mode)
    const formattedMessage = `
<b>📥 YANGI SO'ROV (UiCode):</b>
--------------------------------------
<b>👤 Ism:</b> ${esc(name)}
<b>📞 Telefon:</b> ${esc(phone)}
<b>✈️ Telegram:</b> ${telegram ? `@${esc(String(telegram).replace("@", ""))}` : "Yozilmagan"}
<b>🛠 Xizmat:</b> ${esc(service)}
<b>📅 Sana/Vaqt:</b> ${new Date().toLocaleString("uz-UZ")}
--------------------------------------
<b>💬 Xabar matni:</b>
<i>${esc(message)}</i>
    `.trim();

    // Telegram sozlamalari yo'q bo'lsa
    if (!token || !chatId || token === "your_telegram_bot_token_here") {
      // Ishlab chiqishda (lokal) demo rejim: forma ishlayotganini ko'rish uchun.
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID sozlanmagan. Demo rejim (faqat lokal)."
        );
        ipCache.set(ip, now);
        return NextResponse.json({ success: true, demo: true });
      }

      // Productionda esa MUTLAQO demo qilmaymiz: aks holda o'zgaruvchi nomida
      // xato bo'lsa, forma "yuborildi" deb ko'rsatadi-yu, mijoz xabari
      // butunlay yo'qoladi va buni hech kim sezmaydi.
      console.error(
        "TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID productionda sozlanmagan - xabar yuborilmadi!"
      );
      return NextResponse.json(
        {
          error:
            "Xabar yuborishda texnik nosozlik. Iltimos, Telegram yoki telefon orqali bog'laning.",
        },
        { status: 500 }
      );
    }

    // Send to Telegram Bot API
    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: formattedMessage,
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Telegram API Error: ${errorText}`);
    }

    // Update rate limit cache
    ipCache.set(ip, now);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Contact API submission error:", err);
    return NextResponse.json(
      { error: "Xabar yuborishda xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring." },
      { status: 500 }
    );
  }
}
