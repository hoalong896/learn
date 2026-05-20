"use client";

import { useProgress } from "@/hooks/useProgress";

type CourseColor = "blue" | "orange" | "green" | "purple" | "pink" | "teal" | "yellow" | "sky" | "red";

interface CompleteButtonProps {
  course: string;
  lessonId: string;
  courseColor: CourseColor;
}

const BTN: Record<CourseColor, string> = {
  blue:   "from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-blue-500/25   border-blue-500/30",
  orange: "from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 shadow-orange-500/25 border-orange-500/30",
  green:  "from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 shadow-green-500/25  border-green-500/30",
  purple: "from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 shadow-purple-500/25 border-purple-500/30",
  pink:   "from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 shadow-pink-500/25   border-pink-500/30",
  teal:   "from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 shadow-teal-500/25   border-teal-500/30",
  yellow: "from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 shadow-yellow-500/25 border-yellow-500/30",
  sky:    "from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 shadow-sky-500/25       border-sky-500/30",
  red:    "from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-red-500/25       border-red-500/30",
};

export default function CompleteButton({ course, lessonId, courseColor }: CompleteButtonProps) {
  const { markComplete, isCompleted } = useProgress(course);
  const done = isCompleted(lessonId);

  if (done) {
    return (
      <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl border bg-green-900/20 border-green-600/30 text-green-300 text-sm font-medium shadow-lg shadow-green-500/10">
        <span className="w-5 h-5 rounded-full bg-green-500/25 border border-green-500/40 flex items-center justify-center text-xs font-bold">✓</span>
        <span>Đã hoàn thành bài này</span>
      </div>
    );
  }

  return (
    <button
      onClick={() => markComplete(lessonId)}
      className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl border text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-lg bg-gradient-to-r ${BTN[courseColor]}`}
    >
      <span className="text-base">🎯</span>
      <span>Đánh dấu hoàn thành</span>
    </button>
  );
}
