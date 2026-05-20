import Groq from "groq-sdk";
import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response("GROQ_API_KEY chưa được cấu hình trong biến môi trường.", { status: 500 });
  }

  let body: { messages: unknown; context: unknown; sessionId: unknown };
  try {
    body = await req.json();
  } catch {
    return new Response("Request body không hợp lệ.", { status: 400 });
  }

  const { messages, context, sessionId } = body as {
    messages: { role: string; content: string }[];
    context?: { lessonTitle?: string; courseTitle?: string; lessonId?: string };
    sessionId?: string;
  };

  const systemPrompt = context?.lessonTitle
    ? `Bạn là trợ lý học tập thông minh, trả lời bằng tiếng Việt. Người dùng đang học bài: "${context.lessonTitle}" trong khóa học "${context.courseTitle}". Giải đáp câu hỏi liên quan đến bài học, giải thích rõ ràng, có ví dụ khi cần. Dùng markdown để format code.`
    : `Bạn là trợ lý học tập thông minh, trả lời bằng tiếng Việt. Hỗ trợ các câu hỏi về lập trình (TypeScript, JavaScript, Java, Node.js, Next.js, Docker...) và ngoại ngữ (tiếng Anh, tiếng Trung). Giải thích rõ ràng, có ví dụ khi cần. Dùng markdown để format code.`;

  const groq = new Groq({ apiKey });

  try {
    const stream = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "system" as const, content: systemPrompt }, ...messages.map(m => ({ role: m.role as "user" | "assistant", content: m.content }))],
      stream: true,
      max_tokens: 1024,
    });

    const lastUserMsg = [...messages].reverse().find(m => m.role === "user");
    let fullResponse = "";

    const readable = new ReadableStream({
      async start(controller) {
        const enc = new TextEncoder();
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            if (text) {
              fullResponse += text;
              controller.enqueue(enc.encode(text));
            }
          }
        } catch (streamErr) {
          const msg = streamErr instanceof Error ? streamErr.message : "Stream error";
          controller.enqueue(enc.encode(`\n\n[Lỗi: ${msg}]`));
        } finally {
          controller.close();
          if (sessionId && lastUserMsg) {
            void (async () => {
              try {
                await supabase.from("chat_history").insert({
                  session_id: sessionId,
                  course:     context?.courseTitle ?? null,
                  lesson_id:  context?.lessonId   ?? null,
                  question:   lastUserMsg.content,
                  answer:     fullResponse,
                });
              } catch { /* ignore */ }
            })();
          }
        }
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(`Lỗi Groq API: ${message}`, { status: 500 });
  }
}
