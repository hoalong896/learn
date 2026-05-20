"use client";

import { useState } from "react";
import type { LangExercise } from "@/data/english-lessons";

interface Props {
  exercise: LangExercise;
  exerciseNumber: number;
  accentColor: "sky" | "red";
}

const ACCENT = {
  sky: { ring: "border-sky-600/60", header: "bg-sky-950/20 border-sky-800/40", badge: "bg-sky-600", tab: "text-sky-300 border-sky-400 bg-sky-950/30", btn: "bg-sky-600 hover:bg-sky-500" },
  red: { ring: "border-red-600/60", header: "bg-red-950/20 border-red-800/40", badge: "bg-red-600", tab: "text-red-300 border-red-400 bg-red-950/30", btn: "bg-red-600 hover:bg-red-500" },
};

const TYPE_LABEL: Record<string, string> = {
  translate: "Dịch",
  fill: "Điền vào chỗ trống",
  choice: "Trắc nghiệm",
  write: "Viết",
};

export default function LangExercisePanel({ exercise, exerciseNumber, accentColor }: Props) {
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState("");
  const [checked, setChecked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const s = ACCENT[accentColor];

  const isChoice = exercise.type === "choice";
  const userAnswer = isChoice ? selected : input.trim();
  const isCorrect = checked && userAnswer.toLowerCase() === exercise.answer.toLowerCase();
  const isWrong = checked && !isCorrect;

  function handleCheck() {
    if (!userAnswer) return;
    setChecked(true);
  }

  function handleRetry() {
    setChecked(false);
    setInput("");
    setSelected("");
    setShowHint(false);
  }

  return (
    <div className={`mt-5 rounded-xl border ${s.ring} overflow-hidden shadow-md`}>
      {/* Header */}
      <div className={`px-5 py-4 ${s.header} border-b`}>
        <div className="flex items-start gap-3">
          <span className={`shrink-0 w-7 h-7 rounded-full ${s.badge} flex items-center justify-center text-xs font-bold text-white mt-0.5`}>
            {exerciseNumber}
          </span>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-gray-500 font-medium">{TYPE_LABEL[exercise.type]}</span>
            </div>
            <p className="text-sm font-semibold text-white leading-snug">{exercise.question}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 bg-gray-900/20 space-y-3">
        {/* Result feedback */}
        {checked && (
          <div className={`flex items-start gap-2 px-4 py-3 rounded-lg text-sm font-medium border ${
            isCorrect
              ? "bg-green-950/40 border-green-700/50 text-green-300"
              : "bg-red-950/40 border-red-700/50 text-red-300"
          }`}>
            <span>{isCorrect ? "✅" : "❌"}</span>
            <div>
              {isCorrect ? "Chính xác!" : (
                <>Sai rồi. Đáp án đúng: <strong className="text-white">{exercise.answer}</strong></>
              )}
            </div>
          </div>
        )}

        {/* Choice options */}
        {isChoice && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {exercise.options?.map(opt => {
              const isSelected = selected === opt;
              const isRight = checked && opt.toLowerCase() === exercise.answer.toLowerCase();
              const isWrongSelected = checked && isSelected && !isRight;
              return (
                <button
                  key={opt}
                  disabled={checked}
                  onClick={() => { if (!checked) setSelected(opt); }}
                  className={`px-4 py-2.5 rounded-lg border text-sm text-left transition-all ${
                    isRight
                      ? "border-green-500 bg-green-900/30 text-green-200"
                      : isWrongSelected
                      ? "border-red-500 bg-red-900/30 text-red-200"
                      : isSelected
                      ? `${s.ring} bg-gray-800/60 text-white`
                      : "border-gray-700 bg-gray-800/40 text-gray-300 hover:border-gray-500 hover:bg-gray-700/40 disabled:hover:border-gray-700 disabled:hover:bg-gray-800/40"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {/* Text input */}
        {!isChoice && (
          <input
            type="text"
            value={input}
            onChange={e => { if (!checked) setInput(e.target.value); }}
            onKeyDown={e => { if (e.key === "Enter" && !checked) handleCheck(); }}
            disabled={checked}
            placeholder="Nhập câu trả lời của bạn..."
            className="w-full px-4 py-2.5 bg-gray-800/60 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 disabled:opacity-60"
          />
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {!checked ? (
            <button
              onClick={handleCheck}
              disabled={!userAnswer}
              className={`px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${s.btn} disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              Kiểm tra
            </button>
          ) : (
            <button
              onClick={handleRetry}
              className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-gray-700 hover:bg-gray-600 transition-all"
            >
              Thử lại
            </button>
          )}

          {exercise.hint && (
            <button
              onClick={() => setShowHint(v => !v)}
              className="text-sm text-yellow-400/80 hover:text-yellow-300 flex items-center gap-1.5 transition-colors"
            >
              <span className="text-xs">{showHint ? "▼" : "▶"}</span>
              💡 {showHint ? "Ẩn gợi ý" : "Gợi ý"}
            </button>
          )}
        </div>

        {showHint && exercise.hint && (
          <div className="px-4 py-3 bg-yellow-950/30 border border-yellow-800/40 rounded-lg text-sm text-yellow-200/90">
            {exercise.hint}
          </div>
        )}
      </div>
    </div>
  );
}
