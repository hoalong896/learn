import { NextRequest, NextResponse } from "next/server";

const PISTON_API = "https://emkc.org/api/v2/piston/execute";

const LANGUAGE_MAP: Record<string, { language: string; version: string; filename: string }> = {
  typescript: { language: "typescript", version: "5.0.3", filename: "main.ts" },
  java:       { language: "java",       version: "15.0.2", filename: "Main.java" },
  javascript: { language: "javascript", version: "18.15.0", filename: "main.js" },
  nodejs:     { language: "javascript", version: "18.15.0", filename: "main.js" },
};

export async function POST(req: NextRequest) {
  const { code, language } = await req.json();

  const config = LANGUAGE_MAP[language];
  if (!config) {
    return NextResponse.json({ error: "Ngôn ngữ không được hỗ trợ" }, { status: 400 });
  }

  try {
    const res = await fetch(PISTON_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: config.language,
        version: config.version,
        files: [{ name: config.filename, content: code }],
        stdin: "",
      }),
    });

    const data = await res.json();
    const run = data.run ?? {};
    const output = run.stdout || run.stderr || data.compile?.stderr || "Không có output";

    return NextResponse.json({ output, exitCode: run.code ?? 0 });
  } catch {
    return NextResponse.json({ error: "Không thể kết nối đến máy chủ chạy code" }, { status: 500 });
  }
}
