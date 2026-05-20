"use client";

import { useState } from "react";
import CodeEditor from "./CodeEditor";
import type { Exercise } from "@/data/typescript-lessons";

interface ExercisePanelProps {
  exercise: Exercise;
  exerciseNumber?: number;
  language: "typescript" | "java" | "javascript" | "nodejs";
}

export default function ExercisePanel({ exercise, exerciseNumber, language }: ExercisePanelProps) {
  const [showHint, setShowHint] = useState(false);
  const [tab, setTab] = useState<"exercise" | "solution">("exercise");

  const accentColor =
    language === "java"
      ? { ring: "border-orange-600/60", header: "bg-orange-950/20 border-orange-800/40", badge: "bg-orange-600", tab: "text-orange-300 border-orange-400 bg-orange-950/30" }
      : language === "javascript" || language === "nodejs"
      ? { ring: "border-green-600/60", header: "bg-green-950/20 border-green-800/40", badge: "bg-green-600", tab: "text-green-300 border-green-400 bg-green-950/30" }
      : { ring: "border-blue-600/60", header: "bg-blue-950/20 border-blue-800/40", badge: "bg-blue-600", tab: "text-blue-300 border-blue-400 bg-blue-950/30" };

  return (
    <div className={`mt-6 rounded-xl border ${accentColor.ring} overflow-hidden shadow-md`}>
      {/* Header */}
      <div className={`px-5 py-4 ${accentColor.header} border-b`}>
        <div className="flex items-start gap-3">
          {exerciseNumber !== undefined && (
            <span className={`shrink-0 w-7 h-7 rounded-full ${accentColor.badge} flex items-center justify-center text-xs font-bold text-white mt-0.5`}>
              {exerciseNumber}
            </span>
          )}
          <div>
            <h3 className="text-sm font-bold text-white leading-snug">{exercise.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed mt-1">{exercise.description}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700/80 bg-gray-900/40">
        <button
          onClick={() => setTab("exercise")}
          className={`px-5 py-2.5 text-sm font-medium transition-colors border-b-2 ${
            tab === "exercise"
              ? accentColor.tab
              : "text-gray-500 border-transparent hover:text-gray-300"
          }`}
        >
          ✏️ Bài làm
        </button>
        {exercise.solution && (
          <button
            onClick={() => setTab("solution")}
            className={`px-5 py-2.5 text-sm font-medium transition-colors border-b-2 ${
              tab === "solution"
                ? "text-green-300 border-green-400 bg-green-950/30"
                : "text-gray-500 border-transparent hover:text-gray-300"
            }`}
          >
            ✅ Lời giải
          </button>
        )}
      </div>

      <div className="p-4 bg-gray-900/20">
        {tab === "exercise" && (
          <div>
            <CodeEditor
              key={`ex-${exerciseNumber}`}
              initialCode={exercise.starterCode}
              language={language}
              height="250px"
            />
            <div className="mt-3">
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-sm text-yellow-400/80 hover:text-yellow-300 flex items-center gap-1.5 transition-colors"
              >
                <span className="text-xs">{showHint ? "▼" : "▶"}</span>
                💡 {showHint ? "Ẩn gợi ý" : "Xem gợi ý"}
              </button>
              {showHint && (
                <div className="mt-2 p-3.5 bg-yellow-950/30 border border-yellow-800/40 rounded-lg text-sm text-yellow-200/90 leading-relaxed">
                  {exercise.hint}
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "solution" && exercise.solution && (
          <div>
            <div className="mb-3 px-3.5 py-2.5 bg-green-950/30 border border-green-800/40 rounded-lg text-sm text-green-300/90 flex items-start gap-2">
              <span>💡</span>
              <span>Đây là một cách giải. Có thể có nhiều cách khác cũng đúng!</span>
            </div>
            <CodeEditor
              key={`sol-${exerciseNumber}`}
              initialCode={exercise.solution}
              language={language}
              height="250px"
            />
          </div>
        )}
      </div>
    </div>
  );
}
