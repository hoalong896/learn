"use client";

import { useState, useRef, useEffect } from "react";
import { getSessionId } from "@/lib/session";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatContext {
  lessonTitle?: string;
  courseTitle?: string;
  lessonId?: string;
}

interface ChatWidgetProps {
  context?: ChatContext;
  courseColor?: "blue" | "orange" | "green" | "purple" | "pink" | "teal";
}

function MarkdownText({ text }: { text: string }) {
  const parts = text.split(/(```[\s\S]*?```|`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("```") && part.endsWith("```")) {
          const lines = part.slice(3, -3).split("\n");
          const lang = lines[0].trim();
          const code = lines.slice(1).join("\n");
          return (
            <pre key={i} className="bg-gray-950 rounded-lg p-3 my-2 overflow-x-auto text-xs font-mono text-green-300 border border-gray-700/60">
              {lang && <div className="text-gray-500 text-[10px] mb-1.5 uppercase tracking-wide">{lang}</div>}
              {code}
            </pre>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={i} className="bg-gray-700/80 text-yellow-300 px-1.5 py-0.5 rounded text-xs font-mono border border-gray-600/40">
              {part.slice(1, -1)}
            </code>
          );
        }
        return (
          <span key={i}>
            {part.split(/(\*\*[^*]+\*\*)/g).map((s, j) => {
              if (s.startsWith("**") && s.endsWith("**")) {
                return <strong key={j} className="font-semibold text-white">{s.slice(2, -2)}</strong>;
              }
              return s;
            })}
          </span>
        );
      })}
    </>
  );
}

const HISTORY_KEY = (ctx?: ChatContext) =>
  ctx?.courseTitle && ctx?.lessonId
    ? `devlearn_chat_${ctx.courseTitle}_${ctx.lessonId}`
    : null;

type CourseColor = "blue" | "orange" | "green" | "purple" | "pink" | "teal";

const COLOR: Record<CourseColor, { grad: string; btn: string; shadow: string; border: string; accent: string }> = {
  blue:   { grad: "from-blue-600 to-indigo-600",     btn: "bg-blue-600 hover:bg-blue-500",     shadow: "shadow-blue-900/60",   border: "border-blue-700/50",   accent: "text-blue-400" },
  orange: { grad: "from-orange-600 to-amber-600",    btn: "bg-orange-600 hover:bg-orange-500", shadow: "shadow-orange-900/60", border: "border-orange-700/50", accent: "text-orange-400" },
  green:  { grad: "from-green-600 to-emerald-600",   btn: "bg-green-600 hover:bg-green-500",   shadow: "shadow-green-900/60",  border: "border-green-700/50",  accent: "text-green-400" },
  purple: { grad: "from-purple-600 to-violet-600",   btn: "bg-purple-600 hover:bg-purple-500", shadow: "shadow-purple-900/60", border: "border-purple-700/50", accent: "text-purple-400" },
  pink:   { grad: "from-pink-600 to-rose-600",       btn: "bg-pink-600 hover:bg-pink-500",     shadow: "shadow-pink-900/60",   border: "border-pink-700/50",   accent: "text-pink-400" },
  teal:   { grad: "from-teal-600 to-cyan-600",       btn: "bg-teal-600 hover:bg-teal-500",     shadow: "shadow-teal-900/60",   border: "border-teal-700/50",   accent: "text-teal-400" },
};

export default function ChatWidget({ context, courseColor = "blue" }: ChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const c = COLOR[courseColor];

  useEffect(() => {
    const key = HISTORY_KEY(context);
    if (!key) return;
    try {
      const saved = localStorage.getItem(key);
      if (saved) setMessages(JSON.parse(saved));
    } catch { /* ignore */ }
  }, [context?.courseTitle, context?.lessonId]); // eslint-disable-line

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    if (messages.length === 0) return;
    const key = HISTORY_KEY(context);
    if (key) {
      try { localStorage.setItem(key, JSON.stringify(messages.slice(-40))); } catch { /* ignore */ }
    }
  }, [messages]); // eslint-disable-line

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setMessages(prev => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, context, sessionId: getSessionId() }),
      });
      if (!res.ok || !res.body) throw new Error();
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: accumulated };
          return updated;
        });
      }
    } catch {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "assistant", content: "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại." };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <>
      {/* Floating button with pulse rings */}
      <div className="fixed bottom-6 right-6 z-50">
        {!open && (
          <span className={`absolute inset-0 rounded-full ${c.btn} pulse-ring opacity-70`} />
        )}
        <button
          onClick={() => setOpen(o => !o)}
          className={`relative w-14 h-14 rounded-full ${c.btn} text-white shadow-xl ${c.shadow} transition-all duration-200 flex items-center justify-center text-2xl hover:scale-110 active:scale-95`}
          title="Hỏi AI trợ lý"
        >
          <span className={`transition-all duration-300 ${open ? "rotate-90 scale-90" : "rotate-0 scale-100"}`}>
            {open ? "×" : "💬"}
          </span>
        </button>
      </div>

      {/* Chat panel */}
      {open && (
        <div className={`fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] h-[520px] animate-slide-up bg-gray-900/95 backdrop-blur-xl rounded-2xl border ${c.border} shadow-2xl shadow-black/70 flex flex-col overflow-hidden`}>
          {/* Header */}
          <div className={`px-4 py-3 bg-gradient-to-r ${c.grad} flex items-center justify-between shrink-0`}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-base">🤖</div>
              <div>
                <div className="text-sm font-bold text-white leading-tight">AI Trợ lý học tập</div>
                {context?.lessonTitle && (
                  <div className="text-[11px] text-white/65 truncate max-w-[200px] leading-tight">{context.lessonTitle}</div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button
                  onClick={() => {
                    setMessages([]);
                    const key = HISTORY_KEY(context);
                    if (key) localStorage.removeItem(key);
                  }}
                  className="text-white/50 hover:text-white/90 text-xs px-2 py-0.5 rounded-md hover:bg-white/10 transition-all"
                >
                  Xóa
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/15 transition-all text-lg leading-none"
              >×</button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.length === 0 && (
              <div className="flex flex-col items-center text-center mt-6 px-3">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${c.grad} flex items-center justify-center text-2xl mb-3 shadow-lg`}>
                  💡
                </div>
                <div className="text-sm font-semibold text-gray-300 mb-1">Hỏi bất kỳ điều gì</div>
                <div className="text-xs text-gray-500 mb-4">
                  {context?.lessonTitle ? `Đang học: ${context.lessonTitle}` : "Về TypeScript, Java, Node.js, Next.js..."}
                </div>
                <div className="w-full space-y-2">
                  {context?.lessonTitle ? (
                    <>
                      {[
                        `Giải thích lại về ${context.lessonTitle}`,
                        "Cho tôi xem thêm ví dụ thực tế",
                        "Những lỗi thường gặp khi học bài này?"
                      ].map(prompt => (
                        <button
                          key={prompt}
                          onClick={() => { setInput(prompt); inputRef.current?.focus(); }}
                          className="w-full text-left text-xs text-gray-400 bg-gray-800/80 hover:bg-gray-700/80 border border-gray-700/50 hover:border-gray-600/50 rounded-xl px-3.5 py-2.5 transition-all"
                        >
                          {prompt}
                        </button>
                      ))}
                    </>
                  ) : (
                    <>
                      <div className="text-xs text-gray-500 bg-gray-800/50 rounded-xl px-3.5 py-2.5 border border-gray-700/40">Giải thích khái niệm bất kỳ</div>
                      <div className="text-xs text-gray-500 bg-gray-800/50 rounded-xl px-3.5 py-2.5 border border-gray-700/40">Debug code, best practices</div>
                    </>
                  )}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${c.grad} flex items-center justify-center text-xs shrink-0 mt-0.5`}>
                    🤖
                  </div>
                )}
                <div className={`max-w-[276px] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-gray-700/90 text-white rounded-br-md"
                    : "bg-gray-800/90 text-gray-200 rounded-bl-md border border-gray-700/40"
                }`}>
                  {msg.role === "user" ? (
                    msg.content
                  ) : (
                    <>
                      <MarkdownText text={msg.content} />
                      {loading && i === messages.length - 1 && msg.content === "" && (
                        <span className="inline-flex gap-1 mt-1 ml-0.5">
                          {[0, 150, 300].map(d => (
                            <span key={d} className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                          ))}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-gray-800/80 bg-gray-900/50 shrink-0">
            <div className="flex gap-2 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhập câu hỏi..."
                rows={1}
                className="flex-1 bg-gray-800/80 text-white text-sm rounded-xl px-3.5 py-2.5 resize-none outline-none border border-gray-700/60 focus:border-gray-500/80 placeholder-gray-500 max-h-28 overflow-y-auto transition-colors"
                style={{ minHeight: "40px" }}
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                className={`shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${c.grad} text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 shadow-md`}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
            <div className="text-[10px] text-gray-600 mt-1.5 text-center">Enter gửi · Shift+Enter xuống dòng</div>
          </div>
        </div>
      )}
    </>
  );
}
