"use client";

import { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  initialCode: string;
  language: "typescript" | "java" | "javascript" | "nodejs";
  readOnly?: boolean;
  height?: string;
  onChange?: (value: string) => void;
}

export default function CodeEditor({
  initialCode,
  language,
  readOnly = false,
  height = "300px",
  onChange,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>("");
  const [running, setRunning] = useState(false);
  const [outputType, setOutputType] = useState<"success" | "error" | "">("");
  const [execTime, setExecTime] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const editorRef = useRef<any>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (output) outputRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [output]);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleCodeChange = (value: string | undefined) => {
    const newCode = value ?? "";
    setCode(newCode);
    onChange?.(newCode);
  };

  const runCode = async () => {
    const currentCode = editorRef.current?.getValue() ?? code;
    setRunning(true);
    setOutput("Đang chạy...");
    setOutputType("");
    setExecTime(null);
    const start = Date.now();

    try {
      const res = await fetch("/api/run-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: currentCode, language }),
      });

      const data = await res.json();
      setExecTime(Date.now() - start);

      if (data.error) {
        setOutput(data.error);
        setOutputType("error");
      } else {
        setOutput(data.output || "(Không có output)");
        setOutputType(data.exitCode === 0 ? "success" : "error");
      }
    } catch {
      setOutput("Lỗi kết nối. Vui lòng thử lại.");
      setOutputType("error");
    } finally {
      setRunning(false);
    }
  };

  const resetCode = () => {
    editorRef.current?.setValue(initialCode);
    setCode(initialCode);
    setOutput("");
    setOutputType("");
    setExecTime(null);
  };

  const copyCode = async () => {
    const currentCode = editorRef.current?.getValue() ?? code;
    await navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const clearOutput = () => {
    setOutput("");
    setOutputType("");
    setExecTime(null);
  };

  const monacoLang =
    language === "typescript" ? "typescript"
    : language === "java" ? "java"
    : "javascript";
  const filename =
    language === "typescript" ? "main.ts"
    : language === "java" ? "Main.java"
    : "main.js";

  return (
    <div className="rounded-xl overflow-hidden border border-gray-700 bg-gray-900 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-800/80 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="ml-2 text-xs text-gray-400 font-mono bg-gray-700/50 px-2 py-0.5 rounded">
            {filename}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={copyCode}
            title="Copy code"
            className="text-xs text-gray-400 hover:text-white px-2.5 py-1 rounded hover:bg-gray-700 transition-colors flex items-center gap-1"
          >
            {copied ? "✓ Đã copy" : "⧉ Copy"}
          </button>
          {!readOnly && (
            <button
              onClick={resetCode}
              title="Reset về code gốc"
              className="text-xs text-gray-400 hover:text-white px-2.5 py-1 rounded hover:bg-gray-700 transition-colors"
            >
              ↺ Reset
            </button>
          )}
          <button
            onClick={runCode}
            disabled={running}
            className="flex items-center gap-1.5 text-xs font-semibold bg-green-600 hover:bg-green-500 disabled:bg-green-900 disabled:cursor-not-allowed text-white px-3.5 py-1.5 rounded-lg transition-colors shadow-sm"
          >
            {running ? (
              <>
                <span className="inline-block animate-spin">⟳</span> Đang chạy...
              </>
            ) : (
              <>▶ Chạy Code</>
            )}
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <Editor
        height={height}
        language={monacoLang}
        value={code}
        theme="vs-dark"
        onChange={handleCodeChange}
        onMount={handleEditorDidMount}
        options={{
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          readOnly,
          wordWrap: "on",
          lineNumbers: "on",
          folding: true,
          automaticLayout: true,
          padding: { top: 12, bottom: 12 },
          tabSize: 2,
          renderLineHighlight: "line",
          smoothScrolling: true,
        }}
      />

      {/* Output */}
      {output && (
        <div
          ref={outputRef}
          className={`border-t ${
            outputType === "error"
              ? "border-red-800/70 bg-red-950/40"
              : outputType === "success"
              ? "border-green-800/70 bg-green-950/30"
              : "border-gray-700 bg-gray-950"
          }`}
        >
          <div className="px-4 py-2 flex items-center justify-between border-b border-gray-700/50">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Output</span>
              {outputType === "success" && (
                <span className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Thành công
                </span>
              )}
              {outputType === "error" && (
                <span className="text-xs text-red-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" /> Có lỗi
                </span>
              )}
              {execTime !== null && (
                <span className="text-xs text-gray-500">{execTime}ms</span>
              )}
            </div>
            <button
              onClick={clearOutput}
              className="text-xs text-gray-500 hover:text-gray-300 px-2 py-0.5 rounded hover:bg-gray-700 transition-colors"
            >
              Xóa
            </button>
          </div>
          <pre className="px-4 py-3 text-sm font-mono whitespace-pre-wrap text-gray-200 max-h-52 overflow-y-auto leading-relaxed">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
