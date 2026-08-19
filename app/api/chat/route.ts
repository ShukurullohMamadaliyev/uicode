import { NextRequest } from "next/server";
import { getAIChatStream, ChatMessage } from "@/lib/ai/provider";

export const runtime = "edge";

// --- Suiiste'moldan himoya ---
// Bu endpoint ochiq: undan chiqadigan har bir so'rov sizning AI balansingizdan
// pul yechadi. Cheklovlarsiz bot bir necha soatda balansni bo'shatib yuboradi.
const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 8_000;
const MAX_TOTAL_CHARS = 24_000;
const RATE_LIMIT_MAX = 12; // 1 daqiqada nechta so'rov
const RATE_LIMIT_WINDOW = 60 * 1000;

const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW);
  recent.push(now);
  hits.set(ip, recent);

  // Map cheksiz o'smasligi uchun eskirgan yozuvlarni tozalaymiz
  if (hits.size > 5_000) {
    hits.forEach((times, key) => {
      if (times.every((t: number) => now - t >= RATE_LIMIT_WINDOW)) hits.delete(key);
    });
  }

  return recent.length > RATE_LIMIT_MAX;
}

const jsonError = (message: string, status: number) =>
  new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export async function POST(req: NextRequest) {
  try {
    const ip = (req.headers.get("x-forwarded-for") ?? "anonymous").split(",")[0].trim();

    if (isRateLimited(ip)) {
      return jsonError(
        "Juda ko'p so'rov yuborildi. Bir daqiqadan so'ng qayta urinib ko'ring.",
        429
      );
    }

    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return jsonError("Xabarlar formati xato yoki mavjud emas.", 400);
    }

    if (messages.length === 0 || messages.length > MAX_MESSAGES) {
      return jsonError("Suhbat juda uzun. Yangi suhbat boshlang.", 400);
    }

    // Mijoz `system` rolini yubora olmasligi kerak - aks holda u serverdagi
    // system prompt'ni bekor qilib, botni boshqa maqsadda ishlatib ketadi.
    const safeMessages: ChatMessage[] = [];
    let totalChars = 0;

    for (const item of messages) {
      if (!item || typeof item.content !== "string") {
        return jsonError("Xabar formati noto'g'ri.", 400);
      }
      if (item.role !== "user" && item.role !== "assistant") {
        return jsonError("Ruxsat etilmagan xabar turi.", 400);
      }
      if (item.content.length > MAX_MESSAGE_CHARS) {
        return jsonError("Xabar juda uzun.", 413);
      }

      totalChars += item.content.length;
      if (totalChars > MAX_TOTAL_CHARS) {
        return jsonError("Suhbat hajmi chegaradan oshdi.", 413);
      }

      safeMessages.push({ role: item.role, content: item.content });
    }

    const stream = await getAIChatStream(safeMessages);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (err: any) {
    console.error("Chat API error:", err);
    return jsonError("Tizim xatoligi yuz berdi.", 500);
  }
}
