"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

interface CourseProgressProps {
  lessonIds: string[];
  course: string;
  courseColor: "blue" | "orange" | "green" | "purple" | "pink" | "teal" | "yellow" | "sky" | "red";
}

export function CourseProgressBar({ lessonIds, course, courseColor }: CourseProgressProps) {
  const { completedCount, lastVisited } = useProgress(course);
  const done = completedCount(lessonIds);
  const total = lessonIds.length;
  const percent = Math.round((done / total) * 100);

  const BAR: Record<string, string> = {
    blue: "bg-blue-500", orange: "bg-orange-500", green: "bg-green-500",
    teal: "bg-teal-500", pink: "bg-pink-500", purple: "bg-purple-500",
    yellow: "bg-yellow-500", sky: "bg-sky-500", red: "bg-red-500",
  };
  const TEXT: Record<string, string> = {
    blue: "text-blue-400", orange: "text-orange-400", green: "text-green-400",
    teal: "text-teal-400", pink: "text-pink-400", purple: "text-purple-400",
    yellow: "text-yellow-400", sky: "text-sky-400", red: "text-red-400",
  };

  const bar = BAR[courseColor] ?? "bg-purple-500";
  const text = TEXT[courseColor] ?? "text-purple-400";

  if (done === 0 && !lastVisited) return null;

  return (
    <div className="mt-4 p-3 bg-gray-900/60 rounded-xl border border-gray-700/60">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-400">Tiến độ của bạn</span>
        <span className={`text-xs font-bold ${text}`}>{done}/{total} bài ({percent}%)</span>
      </div>
      <div className="h-1.5 bg-gray-700/60 rounded-full overflow-hidden">
        <div className={`h-full ${bar} rounded-full transition-all duration-500`} style={{ width: `${percent}%` }} />
      </div>
      {lastVisited && done < total && (
        <Link
          href={`/${course}/${lastVisited}`}
          className={`mt-2 flex items-center gap-1.5 text-xs ${text} hover:opacity-80 transition-opacity`}
        >
          <span>▶</span>
          <span>Tiếp tục học</span>
        </Link>
      )}
      {done === total && (
        <div className="mt-2 text-xs text-green-400 flex items-center gap-1.5">
          <span>🎉</span>
          <span>Hoàn thành toàn bộ khóa học!</span>
        </div>
      )}
    </div>
  );
}

interface LessonDoneProps {
  lessonId: string;
  course: string;
}

export function LessonDoneBadge({ lessonId, course }: LessonDoneProps) {
  const { isCompleted } = useProgress(course);
  if (!isCompleted(lessonId)) return null;
  return (
    <span className="shrink-0 w-5 h-5 rounded-full bg-green-700/60 flex items-center justify-center text-green-300 text-[10px]">✓</span>
  );
}
