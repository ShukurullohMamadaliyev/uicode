import { systemPrompt } from "./system-prompt";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

// Simple sleep helper
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Generate a streaming demo response
function createDemoStream(messages: ChatMessage[]) {
  const lastUserMessage = [...messages].reverse().find(m => m.role === "user")?.content.toLowerCase() || "";
  
  let responseText = "";

  if (lastUserMessage.includes("veb") || lastUserMessage.includes("sayt") || lastUserMessage.includes("web") || lastUserMessage.includes("site")) {
    responseText = "Biznesingiz uchun professional va zamonaviy **veb-saytlar** yaratishimiz mumkin. Next.js va React texnologiyalaridan foydalanib, mobil qurilmalarga to'liq moslashuvchan, Google'da tez topiladigan (SEO) va juda tez ishlaydigan saytlar tayyorlaymiz. \n\nLoyiha murakkabligiga qarab narxi 500$ dan boshlanadi. Boshlash uchun [Biz bilan aloqa](/aloqa?xizmat=web-sayt) sahifasida xabar qoldiring.";
  } else if (lastUserMessage.includes("bot") || lastUserMessage.includes("telegram") || lastUserMessage.includes("tg")) {
    responseText = "**Telegram botlar va CRM integratsiyalari** bo'yicha Shukurulloh juda katta tajribaga ega. Biz savdoni avtomatlashtiruvchi, to'lov qabul qiluvchi va mijozlar bilan muloqot qiluvchi botlarni, hamda ularni kompaniyangiz ichki tizimlariga ulash xizmatlarini taqdim etamiz.\n\nBotlar narxi odatda 300$ dan boshlanadi. Batafsil gaplashish uchun [Biz bilan aloqa](/aloqa?xizmat=telegram-bot) sahifasidan foydalaning.";
  } else if (lastUserMessage.includes("ai") || lastUserMessage.includes("avtomat") || lastUserMessage.includes("sun'iy")) {
    responseText = "Biznesingizni **AI (Sun'iy intellekt) bilan avtomatlashtirish** xizmatlarimiz orqali ishchi kuchi xarajatlarini 30% gacha qisqartirishingiz mumkin. Mijozlar bilan muloqot qiluvchi aqlli AI yordamchilar, ma'lumotlarni tahlil qiluvchi tizimlar va avtomatik hisobot yaratish jarayonlarini sozlaymiz.\n\nTafsilotlarni kelishish uchun [Aloqa sahifasiga](/aloqa?xizmat=ai-avtomatlashtirish) o'ting.";
  } else {
    responseText = "Assalomu alaykum! Men Shukurulloh Mamadaliyevning AI yordamchisiman. Sizga qanday loyihani amalga oshirishda yordam bera olamiz?\n\nBiz quyidagi IT xizmatlarni taqdim etamiz:\n* Zamonaviy va tezkor veb-saytlar (Next.js/React)\n* Telegram botlar va CRM integratsiyasi\n* Biznesni AI bilan avtomatlashtirish\n\nQaysi yo'nalish sizni qiziqtirmoqda?";
  }

  const encoder = new TextEncoder();
  
  return new ReadableStream({
    async start(controller) {
      // Stream the response text character by character or word by word
      const words = responseText.split(" ");
      for (const word of words) {
        controller.enqueue(encoder.encode(word + " "));
        await sleep(Math.floor(Math.random() * 50) + 30); // dynamic typing delay
      }
      controller.close();
    }
  });
}

export async function getAIChatStream(messages: ChatMessage[]): Promise<ReadableStream> {
  const apiKey = process.env.AI_API_KEY;
  const baseUrl = process.env.AI_BASE_URL || "https://api.openai.com/v1";
  const model = process.env.AI_MODEL || "gpt-4o";

  // If no API key, fall back to Demo Mode stream
  if (!apiKey || apiKey === "your_ai_provider_api_key_here") {
    return createDemoStream(messages);
  }

  // Prepend system prompt to the messages list
  const fullMessages = [
    { role: "system", content: systemPrompt },
    ...messages
  ];

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: fullMessages,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`AI Provider response error: ${response.statusText}`);
    }

    if (!response.body) {
      throw new Error("No response body received from AI provider");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    return new ReadableStream({
      async start(controller) {
        let buffer = "";
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const cleanedLine = line.trim();
              if (!cleanedLine) continue;

              if (cleanedLine === "data: [DONE]") {
                break;
              }

              if (cleanedLine.startsWith("data: ")) {
                try {
                  const jsonStr = cleanedLine.slice(6);
                  const parsed = JSON.parse(jsonStr);
                  const text = parsed.choices[0]?.delta?.content || "";
                  if (text) {
                    controller.enqueue(encoder.encode(text));
                  }
                } catch (e) {
                  // Ignore parse errors on incomplete lines
                }
              }
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      }
    });

  } catch (err) {
    console.error("AI Stream error, falling back to demo stream:", err);
    return createDemoStream(messages);
  }
}
