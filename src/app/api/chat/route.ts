import Groq from "groq-sdk";
import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  if (!process.env.GROQ_API_KEY) {
    return new Response("Chưa cấu hình GROQ_API_KEY trong .env.local", { status: 500 });
  }
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const { messages, context, sessionId } = await req.json();

  const systemPrompt = context
    ? `Bạn là trợ lý học lập trình thông minh, nói tiếng Việt. Người dùng đang học bài: "${context.lessonTitle}" trong khóa học "${context.courseTitle}". Hãy giải đáp câu hỏi liên quan đến bài học này hoặc lập trình nói chung. Giải thích rõ ràng, ngắn gọn, có ví dụ code khi cần. Dùng markdown để format code.`
    : `Bạn là trợ lý học lập trình thông minh, nói tiếng Việt. Hãy giải đáp câu hỏi về lập trình (TypeScript, JavaScript, Java, Node.js, Next.js...). Giải thích rõ ràng, có ví dụ code khi cần. Dùng markdown để format code.`;

  // Collect the full response text to save to Supabase
  let fullResponse = "";

  try {
    const stream = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      stream: true,
      max_tokens: 1024,
    });

    const lastUserMessage = [...messages].reverse().find((m: { role: string }) => m.role === "user");

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            if (text) {
              fullResponse += text;
              controller.enqueue(new TextEncoder().encode(text));
            }
          }
        } finally {
          controller.close();
          // Save to Supabase in background after stream ends
          if (sessionId && lastUserMessage) {
            void Promise.resolve(
              supabase.from("chat_history").insert({
                session_id: sessionId,
                course:     context?.courseTitle ?? null,
                lesson_id:  context?.lessonId   ?? null,
                question:   lastUserMessage.content,
                answer:     fullResponse,
              })
            ).catch(() => {});
          }
        }
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Lỗi không xác định";
    return new Response(`Lỗi API: ${message}`, { status: 500 });
  }
}
