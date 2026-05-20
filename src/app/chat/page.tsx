"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { getSessionId } from "@/lib/session";

const CodeEditor = dynamic(() => import("@/components/CodeEditor"), { ssr: false });

interface Message {
  role: "user" | "assistant";
  content: string;
}

type Lang = "javascript" | "typescript" | "java";

const LANG_META: Record<Lang, { label: string; icon: string; starter: string }> = {
  javascript: {
    label: "JavaScript",
    icon: "🟨",
    starter: `// JavaScript — chạy thử code ở đây\nconsole.log("Hello, World!");\n`,
  },
  typescript: {
    label: "TypeScript",
    icon: "🔷",
    starter: `// TypeScript\nconst greet = (name: string): string => \`Hello, \${name}!\`;\nconsole.log(greet("DevLearn"));\n`,
  },
  java: {
    label: "Java",
    icon: "☕",
    starter: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}\n`,
  },
};

const QUICK_PROMPTS = [
  "Giải thích async/await trong JavaScript",
  "TypeScript interface vs type khác nhau thế nào?",
  "Viết hàm tìm số nguyên tố trong JS",
  "Explain RESTful API design principles",
  "Node.js Event Loop hoạt động như thế nào?",
  "Vì sao nên dùng const thay let?",
];

function extractCodeBlock(content: string): { code: string; lang: string } | null {
  const match = content.match(/```(\w*)\n([\s\S]*?)```/);
  if (!match) return null;
  return { lang: match[1] || "javascript", code: match[2].trim() };
}

function MarkdownMessage({ text, onRunCode }: { text: string; onRunCode: (code: string, lang: string) => void }) {
  const parts = text.split(/(```[\s\S]*?```)/g);
  return (
    <div className="text-sm leading-relaxed space-y-1.5">
      {parts.map((part, i) => {
        if (part.startsWith("```") && part.endsWith("```")) {
          const lines = part.slice(3, -3).split("\n");
          const lang = lines[0].trim() || "javascript";
          const code = lines.slice(1).join("\n");
          return (
            <div key={i} className="rounded-xl overflow-hidden border border-gray-700/70 my-2">
              <div className="flex items-center justify-between px-3 py-1.5 bg-gray-800/80 border-b border-gray-700/50">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{lang}</span>
                <button
                  onClick={() => onRunCode(code, lang)}
                  className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 px-2 py-0.5 rounded-md hover:bg-emerald-900/30 transition-all"
                >
                  ▶ Chạy trong Editor
                </button>
              </div>
              <pre className="px-4 py-3 text-xs font-mono text-gray-200 bg-gray-950 overflow-x-auto whitespace-pre leading-relaxed">
                {code}
              </pre>
            </div>
          );
        }

        // Inline code and bold
        const inlineParts = part.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
        return (
          <span key={i}>
            {inlineParts.map((s, j) => {
              if (s.startsWith("`") && s.endsWith("`"))
                return <code key={j} className="bg-gray-700/70 text-yellow-300 px-1.5 py-0.5 rounded text-xs font-mono">{s.slice(1, -1)}</code>;
              if (s.startsWith("**") && s.endsWith("**"))
                return <strong key={j} className="font-semibold text-white">{s.slice(2, -2)}</strong>;
              // render line breaks
              return s.split("\n").map((line, k, arr) => (
                <span key={k}>{line}{k < arr.length - 1 && <br />}</span>
              ));
            })}
          </span>
        );
      })}
    </div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState<Lang>("javascript");
  const [editorCode, setEditorCode] = useState(LANG_META.javascript.starter);
  const [editorKey, setEditorKey] = useState(0);
  const [panel, setPanel] = useState<"chat" | "code">("chat");

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleRunCode = useCallback((code: string, detectedLang: string) => {
    const mapped: Lang =
      detectedLang === "typescript" ? "typescript"
      : detectedLang === "java" ? "java"
      : "javascript";
    setLang(mapped);
    setEditorCode(code);
    setEditorKey(k => k + 1);
    setPanel("code");
  }, []);

  const send = useCallback(async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: msg }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setMessages(prev => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, sessionId: getSessionId() }),
      });

      if (!res.ok) {
        const err = await res.text().catch(() => `HTTP ${res.status}`);
        throw new Error(err);
      }
      if (!res.body) throw new Error("Không nhận được phản hồi.");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: acc };
          return updated;
        });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Lỗi không xác định.";
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "assistant", content: `❌ ${msg}` };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }, [input, messages, loading]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  function switchLang(l: Lang) {
    setLang(l);
    setEditorCode(LANG_META[l].starter);
    setEditorKey(k => k + 1);
  }

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white overflow-hidden">

      {/* ── Top bar ── */}
      <header className="shrink-0 h-12 flex items-center justify-between px-4 border-b border-gray-800/70 bg-gray-950/95 backdrop-blur z-10">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm">
            <span>←</span>
            <span className="hidden sm:inline">Trang chủ</span>
          </Link>
          <div className="w-px h-4 bg-gray-700" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm shadow">
              🤖
            </div>
            <div>
              <div className="text-sm font-bold text-white leading-none">AI Trợ lý DevLearn</div>
              <div className="text-[10px] text-gray-500 leading-none mt-0.5">Llama 3.3 · Powered by Groq</div>
            </div>
          </div>
        </div>

        {/* Mobile tab switcher */}
        <div className="flex items-center gap-1 md:hidden">
          <button onClick={() => setPanel("chat")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${panel === "chat" ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-white"}`}
          >💬 Chat</button>
          <button onClick={() => setPanel("code")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${panel === "code" ? "bg-emerald-600 text-white" : "text-gray-400 hover:text-white"}`}
          >⟨/⟩ Code</button>
        </div>

        {messages.length > 0 && (
          <button
            onClick={() => setMessages([])}
            className="hidden md:flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 px-2.5 py-1.5 rounded-lg hover:bg-gray-800 transition-all"
          >
            🗑 Xóa hội thoại
          </button>
        )}
      </header>

      {/* ── Main split layout ── */}
      <div className="flex-1 flex min-h-0">

        {/* ── LEFT: Chat panel ── */}
        <div className={`flex flex-col border-r border-gray-800/60 ${panel === "code" ? "hidden" : "flex"} md:flex md:w-1/2 lg:w-[45%] min-w-0`}>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth">

            {messages.length === 0 && (
              <div className="flex flex-col items-center text-center py-10 px-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl mb-4 shadow-xl shadow-indigo-600/30">
                  🤖
                </div>
                <h2 className="text-lg font-black text-white mb-1">Hỏi bất kỳ điều gì</h2>
                <p className="text-sm text-gray-500 mb-8 max-w-xs">
                  Về lập trình, tiếng Anh, tiếng Trung — AI sẽ trả lời và bạn có thể chạy code ngay bên cạnh.
                </p>
                <div className="w-full grid grid-cols-1 gap-2 max-w-sm">
                  {QUICK_PROMPTS.map(p => (
                    <button
                      key={p}
                      onClick={() => send(p)}
                      className="text-left text-xs text-gray-400 bg-gray-900/80 hover:bg-gray-800 border border-gray-800 hover:border-gray-600 rounded-xl px-4 py-3 transition-all hover:text-white"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs shrink-0 mt-1 shadow">
                    🤖
                  </div>
                )}
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-indigo-600/80 text-white rounded-br-md text-sm"
                    : "bg-gray-800/90 text-gray-200 rounded-bl-md border border-gray-700/40"
                }`}>
                  {msg.role === "user" ? (
                    <span className="text-sm">{msg.content}</span>
                  ) : (
                    <>
                      {msg.content === "" && loading && i === messages.length - 1 ? (
                        <span className="inline-flex gap-1">
                          {[0, 150, 300].map(d => (
                            <span key={d} className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                          ))}
                        </span>
                      ) : (
                        <MarkdownMessage text={msg.content} onRunCode={handleRunCode} />
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}

            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div className="shrink-0 px-4 py-3 border-t border-gray-800/60 bg-gray-950/80">
            <div className="flex gap-2 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Hỏi về code, lập trình, tiếng Anh, tiếng Trung..."
                rows={1}
                className="flex-1 bg-gray-800/80 text-white text-sm rounded-2xl px-4 py-3 resize-none outline-none border border-gray-700/50 focus:border-indigo-500/60 placeholder-gray-500 max-h-32 overflow-y-auto transition-colors leading-relaxed"
                style={{ minHeight: "44px" }}
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || loading}
                className="shrink-0 w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:brightness-110 hover:scale-105 active:scale-95 shadow-lg shadow-indigo-600/30"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-gray-600 mt-1.5 text-center">Enter gửi · Shift+Enter xuống dòng · Code sẽ có nút ▶ để chạy ngay</p>
          </div>
        </div>

        {/* ── RIGHT: Code panel ── */}
        <div className={`flex flex-col min-w-0 ${panel === "chat" ? "hidden" : "flex"} md:flex md:flex-1`}>

          {/* Language tabs */}
          <div className="shrink-0 flex items-center gap-1 px-4 py-2 border-b border-gray-800/60 bg-gray-900/40">
            <span className="text-xs font-semibold text-gray-500 mr-2">Ngôn ngữ:</span>
            {(Object.entries(LANG_META) as [Lang, typeof LANG_META[Lang]][]).map(([key, meta]) => (
              <button
                key={key}
                onClick={() => switchLang(key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  lang === key
                    ? "bg-gray-700 text-white shadow-inner"
                    : "text-gray-500 hover:text-gray-300 hover:bg-gray-800/60"
                }`}
              >
                <span>{meta.icon}</span>
                <span>{meta.label}</span>
              </button>
            ))}
            <div className="ml-auto text-[10px] text-gray-600 hidden sm:block">
              ▶ Chạy Code sẽ gọi Piston API
            </div>
          </div>

          {/* Editor fills remaining space */}
          <div className="flex-1 min-h-0 p-3">
            <CodeEditor
              key={`${lang}-${editorKey}`}
              initialCode={editorCode}
              language={lang}
              height="100%"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
