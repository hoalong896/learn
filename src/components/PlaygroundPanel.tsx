"use client";

import { useState } from "react";
import CodeEditor from "./CodeEditor";
import type { Playground } from "@/data/typescript-lessons";

interface PlaygroundPanelProps {
  playground: Playground;
  index?: number;
  language: "typescript" | "java" | "javascript" | "nodejs";
}

export default function PlaygroundPanel({ playground, index, language }: PlaygroundPanelProps) {
  const [showHint, setShowHint] = useState(false);

  const langColor =
    language === "java"
      ? "border-orange-600/40 bg-orange-950/10"
      : language === "javascript" || language === "nodejs"
      ? "border-green-600/40 bg-green-950/10"
      : "border-purple-600/40 bg-purple-950/10";

  const headerColor =
    language === "java"
      ? "bg-orange-950/30 border-orange-800/40"
      : language === "javascript" || language === "nodejs"
      ? "bg-green-950/30 border-green-800/40"
      : "bg-purple-950/30 border-purple-800/40";

  const badgeColor =
    language === "java"
      ? "bg-orange-700"
      : language === "javascript" || language === "nodejs"
      ? "bg-green-700"
      : "bg-purple-700";

  return (
    <div className={`mt-5 rounded-xl border ${langColor} overflow-hidden shadow-sm`}>
      {/* Header */}
      <div className={`px-5 py-3.5 ${headerColor} border-b flex items-start gap-3`}>
        <span className={`shrink-0 mt-0.5 text-xs font-bold text-white ${badgeColor} px-2 py-0.5 rounded-md`}>
          #{index !== undefined ? index + 1 : ""}
        </span>
        <div>
          <h3 className="text-sm font-bold text-white">{playground.title}</h3>
          <p className="text-gray-300 text-sm mt-0.5 leading-relaxed">{playground.description}</p>
        </div>
      </div>

      {/* Editor */}
      <div className="p-4 bg-gray-900/10">
        <CodeEditor
          key={`playground-${index}`}
          initialCode={playground.starterCode}
          language={language}
          height="220px"
        />
        {playground.hint && (
          <div className="mt-3">
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-sm text-yellow-400/80 hover:text-yellow-300 flex items-center gap-1.5 transition-colors"
            >
              <span className="text-xs">{showHint ? "▼" : "▶"}</span>
              💡 {showHint ? "Ẩn gợi ý" : "Xem gợi ý"}
            </button>
            {showHint && (
              <div className="mt-2 p-3 bg-yellow-950/30 border border-yellow-800/40 rounded-lg text-sm text-yellow-200/90 leading-relaxed">
                {playground.hint}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
