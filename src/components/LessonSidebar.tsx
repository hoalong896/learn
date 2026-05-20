"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useProgress } from "@/hooks/useProgress";

type CourseColor = "blue" | "orange" | "green" | "purple" | "pink" | "teal" | "yellow" | "sky" | "red";

interface SidebarLesson {
  id: string;
  title: string;
  level: "Cơ bản" | "Trung cấp" | "Nâng cao";
  exercises: unknown[];
}

interface LessonSidebarProps {
  lessons: SidebarLesson[];
  coursePath: string;
  courseTitle: string;
  courseColor: CourseColor;
  courseIcon?: string;
}

const LEVEL_BADGE: Record<string, string> = {
  "Cơ bản":    "text-green-400  bg-green-900/25  border-green-800/40",
  "Trung cấp": "text-yellow-400 bg-yellow-900/25 border-yellow-800/40",
  "Nâng cao":  "text-red-400    bg-red-900/25    border-red-800/40",
};

const DEFAULT_ICON: Record<CourseColor, string> = {
  blue: "🔷", orange: "☕", green: "🟢", purple: "▲", pink: "🐈", teal: "🐳",
  yellow: "🌟", sky: "🌍", red: "🐉",
};

const STYLE: Record<CourseColor, {
  topLine: string;
  headerGrad: string; headerBorder: string;
  iconBg: string; iconGlow: string;
  active: string; activeBadge: string;
  completedBadge: string;
  bar: string; accent: string;
  hoverBg: string;
}> = {
  blue:   { topLine:"from-blue-500 via-indigo-500 to-blue-500",     headerGrad:"from-blue-950/90 to-gray-900",   headerBorder:"border-blue-800/50",   iconBg:"bg-blue-500/20 border-blue-500/30",     iconGlow:"shadow-blue-500/30",   active:"sidebar-active-blue",   activeBadge:"bg-blue-500 text-white shadow-blue-500/40",   completedBadge:"bg-green-800/50 text-green-300",   bar:"bg-blue-500",   accent:"text-blue-400 hover:text-blue-300",   hoverBg:"hover:bg-blue-900/10" },
  orange: { topLine:"from-orange-500 via-amber-500 to-orange-500",   headerGrad:"from-orange-950/90 to-gray-900", headerBorder:"border-orange-800/50", iconBg:"bg-orange-500/20 border-orange-500/30", iconGlow:"shadow-orange-500/30", active:"sidebar-active-orange", activeBadge:"bg-orange-500 text-white shadow-orange-500/40", completedBadge:"bg-green-800/50 text-green-300",   bar:"bg-orange-500", accent:"text-orange-400 hover:text-orange-300", hoverBg:"hover:bg-orange-900/10" },
  green:  { topLine:"from-green-500 via-emerald-500 to-green-500",   headerGrad:"from-green-950/90 to-gray-900",  headerBorder:"border-green-800/50",  iconBg:"bg-green-500/20 border-green-500/30",   iconGlow:"shadow-green-500/30",  active:"sidebar-active-green",  activeBadge:"bg-green-500 text-white shadow-green-500/40",  completedBadge:"bg-green-800/50 text-green-300",   bar:"bg-green-500",  accent:"text-green-400 hover:text-green-300",  hoverBg:"hover:bg-green-900/10" },
  purple: { topLine:"from-purple-500 via-violet-500 to-purple-500", headerGrad:"from-purple-950/90 to-gray-900", headerBorder:"border-purple-800/50", iconBg:"bg-purple-500/20 border-purple-500/30", iconGlow:"shadow-purple-500/30", active:"sidebar-active-purple", activeBadge:"bg-purple-500 text-white shadow-purple-500/40", completedBadge:"bg-green-800/50 text-green-300",   bar:"bg-purple-500", accent:"text-purple-400 hover:text-purple-300", hoverBg:"hover:bg-purple-900/10" },
  pink:   { topLine:"from-pink-500 via-rose-500 to-pink-500",         headerGrad:"from-pink-950/90 to-gray-900",   headerBorder:"border-pink-800/50",   iconBg:"bg-pink-500/20 border-pink-500/30",     iconGlow:"shadow-pink-500/30",   active:"sidebar-active-pink",   activeBadge:"bg-pink-500 text-white shadow-pink-500/40",   completedBadge:"bg-green-800/50 text-green-300",   bar:"bg-pink-500",   accent:"text-pink-400 hover:text-pink-300",   hoverBg:"hover:bg-pink-900/10" },
  teal:   { topLine:"from-teal-500 via-cyan-500 to-teal-500",           headerGrad:"from-teal-950/90 to-gray-900",     headerBorder:"border-teal-800/50",   iconBg:"bg-teal-500/20 border-teal-500/30",     iconGlow:"shadow-teal-500/30",   active:"sidebar-active-teal",   activeBadge:"bg-teal-500 text-white shadow-teal-500/40",   completedBadge:"bg-green-800/50 text-green-300",   bar:"bg-teal-500",   accent:"text-teal-400 hover:text-teal-300",   hoverBg:"hover:bg-teal-900/10" },
  yellow: { topLine:"from-yellow-400 via-amber-400 to-yellow-400",      headerGrad:"from-yellow-950/90 to-gray-900",   headerBorder:"border-yellow-800/50", iconBg:"bg-yellow-500/20 border-yellow-500/30", iconGlow:"shadow-yellow-500/30", active:"sidebar-active-yellow", activeBadge:"bg-yellow-500 text-gray-900 shadow-yellow-500/40", completedBadge:"bg-green-800/50 text-green-300", bar:"bg-yellow-500", accent:"text-yellow-400 hover:text-yellow-300", hoverBg:"hover:bg-yellow-900/10" },
  sky:    { topLine:"from-sky-400 via-cyan-400 to-sky-400",             headerGrad:"from-sky-950/90 to-gray-900",      headerBorder:"border-sky-800/50",    iconBg:"bg-sky-500/20 border-sky-500/30",       iconGlow:"shadow-sky-500/30",    active:"sidebar-active-sky",    activeBadge:"bg-sky-500 text-white shadow-sky-500/40",     completedBadge:"bg-green-800/50 text-green-300",   bar:"bg-sky-500",    accent:"text-sky-400 hover:text-sky-300",     hoverBg:"hover:bg-sky-900/10" },
  red:    { topLine:"from-red-500 via-rose-500 to-red-500",             headerGrad:"from-red-950/90 to-gray-900",      headerBorder:"border-red-800/50",    iconBg:"bg-red-500/20 border-red-500/30",       iconGlow:"shadow-red-500/30",    active:"sidebar-active-red",    activeBadge:"bg-red-500 text-white shadow-red-500/40",     completedBadge:"bg-green-800/50 text-green-300",   bar:"bg-red-500",    accent:"text-red-400 hover:text-red-300",     hoverBg:"hover:bg-red-900/10" },
};

export default function LessonSidebar({ lessons, coursePath, courseTitle, courseColor, courseIcon }: LessonSidebarProps) {
  const pathname = usePathname();
  const { markVisited, isCompleted, completedCount } = useProgress(coursePath);

  const totalExercises = lessons.reduce((s, l) => s + l.exercises.length, 0);
  const done    = completedCount(lessons.map(l => l.id));
  const percent = Math.round((done / lessons.length) * 100);

  useEffect(() => {
    const current = lessons.find(l => pathname === `/${coursePath}/${l.id}`);
    if (current) markVisited(current.id);
  }, [pathname, lessons, coursePath, markVisited]);

  const s    = STYLE[courseColor];
  const icon = courseIcon ?? DEFAULT_ICON[courseColor];

  return (
    <aside className="w-72 min-h-screen bg-gray-900 border-r border-gray-800/70 flex flex-col shrink-0">

      {/* Header */}
      <div className={`relative bg-gradient-to-b ${s.headerGrad} border-b ${s.headerBorder}`}>
        {/* Colored top accent line */}
        <div className={`absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r ${s.topLine}`} />

        <div className="px-4 pt-5 pb-4">
          <Link href={`/${coursePath}`} className="flex items-center gap-3 hover:opacity-85 transition-opacity group mb-4">
            <div className={`w-10 h-10 rounded-xl ${s.iconBg} flex items-center justify-center text-xl shrink-0 border shadow-lg ${s.iconGlow}`}>
              {icon}
            </div>
            <div>
              <div className="text-[9px] text-gray-500 uppercase tracking-[0.15em] font-semibold">Khóa học</div>
              <div className="text-sm font-black text-white group-hover:text-gray-100 leading-tight">{courseTitle}</div>
            </div>
          </Link>

          {/* Mini stats */}
          <div className="flex gap-2 text-xs text-gray-500 mb-4">
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/4 border border-white/6">
              <span className="text-gray-400">📚</span> {lessons.length} bài
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/4 border border-white/6">
              <span className="text-gray-400">✏️</span> {totalExercises} bài tập
            </div>
          </div>

          {/* Progress */}
          <div>
            <div className="flex justify-between text-[11px] mb-2">
              <span className="text-gray-500 font-medium">Tiến độ</span>
              <span className={`font-bold ${percent === 100 ? "text-green-400" : "text-white"}`}>
                {done}/{lessons.length}
                <span className="text-gray-500 font-normal ml-1">({percent}%)</span>
              </span>
            </div>
            <div className="relative h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div className={`h-full ${s.bar} rounded-full transition-all duration-700`} style={{ width: `${percent}%` }} />
              {percent > 5 && percent < 100 && (
                <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-white/10 to-transparent" />
              )}
            </div>
            {percent === 100 && (
              <div className="mt-2 text-[11px] text-green-400 flex items-center gap-1.5 font-medium">
                <span className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center text-[10px]">✓</span>
                Hoàn thành xuất sắc!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lesson list */}
      <nav className="flex-1 overflow-y-auto py-2">
        {lessons.map((lesson, index) => {
          const href      = `/${coursePath}/${lesson.id}`;
          const isActive  = pathname === href;
          const completed = isCompleted(lesson.id);

          return (
            <Link
              key={lesson.id}
              href={href}
              className={`block px-3 py-2.5 transition-all duration-150 ${
                isActive
                  ? s.active
                  : `text-gray-400 ${s.hoverBg} hover:text-gray-200`
              }`}
            >
              <div className="flex items-start gap-2.5">
                {/* Number/status badge */}
                <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5 transition-all ${
                  isActive    ? `${s.activeBadge} shadow-md`
                  : completed ? `${s.completedBadge}`
                  : "bg-gray-800/80 text-gray-600 border border-gray-700/50"
                }`}>
                  {completed && !isActive ? "✓" : index + 1}
                </span>

                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium truncate leading-snug ${
                    isActive ? "text-white" : completed ? "text-gray-300" : ""
                  }`}>
                    {lesson.title}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${LEVEL_BADGE[lesson.level]}`}>
                      {lesson.level}
                    </span>
                    {lesson.exercises.length > 0 && (
                      <span className="text-[10px] text-gray-600">
                        {lesson.exercises.length} bài tập
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-800/60 space-y-1.5 bg-gray-900/50">
        <Link href={`/${coursePath}`} className={`flex items-center gap-1.5 text-xs transition-colors ${s.accent}`}>
          ← Danh sách bài học
        </Link>
        <Link href="/" className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-400 transition-colors">
          ⌂ Trang chủ
        </Link>
      </div>
    </aside>
  );
}
