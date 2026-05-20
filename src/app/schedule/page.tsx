"use client";

import Link from "next/link";
import { useAllProgress } from "@/hooks/useAllProgress";
import { typescriptLessons } from "@/data/typescript-lessons";
import { javaLessons } from "@/data/java-lessons";
import { nodejsLessons } from "@/data/nodejs-lessons";
import { nextjsLessons } from "@/data/nextjs-lessons";
import { nestjsLessons } from "@/data/nestjs-lessons";
import { dockerLessons } from "@/data/docker-lessons";

/* ─── Path config ───────────────────────────────────────────── */
const PATH = [
  {
    phase: 1, course: "typescript", icon: "🔷", name: "TypeScript",
    desc: "Typed JavaScript — nền tảng bắt buộc",
    detail: "Kiểu dữ liệu · Interface · Generics · Utility Types · Decorators",
    why: "Tất cả khóa sau đều dùng TypeScript — học trước để không bị mù",
    minPer: 45, hex: "#3b82f6",
    from: "from-blue-900/80", to: "to-indigo-900/80",
    border: "border-blue-700/50", accent: "text-blue-400",
    bar: "bg-blue-500", barBg: "bg-blue-900/30",
    btn: "from-blue-600 to-indigo-600", glow: "shadow-blue-500/30",
    badge: "bg-blue-900/50 text-blue-300 border-blue-700/40",
    dotFill: "bg-blue-500", dotActive: "border-blue-400",
    lessons: typescriptLessons,
  },
  {
    phase: 2, course: "nodejs", icon: "🟢", name: "Node.js",
    desc: "Server-side JS — runtime, HTTP & REST API",
    detail: "EventLoop · File System · Express · JWT · Middleware",
    why: "Cần nắm Node.js trước khi học NestJS và Next.js backend",
    minPer: 50, hex: "#22c55e",
    from: "from-green-900/80", to: "to-emerald-900/80",
    border: "border-green-700/50", accent: "text-green-400",
    bar: "bg-green-500", barBg: "bg-green-900/30",
    btn: "from-green-600 to-emerald-600", glow: "shadow-green-500/30",
    badge: "bg-green-900/50 text-green-300 border-green-700/40",
    dotFill: "bg-green-500", dotActive: "border-green-400",
    lessons: nodejsLessons,
  },
  {
    phase: 3, course: "nextjs", icon: "▲", name: "Next.js",
    desc: "Fullstack React — App Router, SSR, API Routes",
    detail: "Server Components · Data Fetching · Auth · Deployment",
    why: "Frontend + Backend trong một framework — mạnh nhất cho React",
    minPer: 60, hex: "#8b5cf6",
    from: "from-purple-900/80", to: "to-violet-900/80",
    border: "border-purple-700/50", accent: "text-purple-400",
    bar: "bg-purple-500", barBg: "bg-purple-900/30",
    btn: "from-purple-600 to-violet-600", glow: "shadow-purple-500/30",
    badge: "bg-purple-900/50 text-purple-300 border-purple-700/40",
    dotFill: "bg-purple-500", dotActive: "border-purple-400",
    lessons: nextjsLessons,
  },
  {
    phase: 4, course: "nestjs", icon: "🐈", name: "NestJS",
    desc: "Enterprise Backend — Auth, DB, Testing, Deploy",
    detail: "REST API · PostgreSQL · TypeORM · JWT · Unit Testing",
    why: "Framework chuyên nghiệp nhất cho Node.js backend production",
    minPer: 90, hex: "#ec4899",
    from: "from-pink-900/80", to: "to-rose-900/80",
    border: "border-pink-700/50", accent: "text-pink-400",
    bar: "bg-pink-500", barBg: "bg-pink-900/30",
    btn: "from-pink-600 to-rose-600", glow: "shadow-pink-500/30",
    badge: "bg-pink-900/50 text-pink-300 border-pink-700/40",
    dotFill: "bg-pink-500", dotActive: "border-pink-400",
    lessons: nestjsLessons,
  },
  {
    phase: 5, course: "docker", icon: "🐳", name: "Docker",
    desc: "Container hóa & deploy lên production",
    detail: "Dockerfile · Docker Compose · Volumes · Networks · CI/CD",
    why: "DevOps skill thiết yếu — không biết Docker là thiếu sót lớn",
    minPer: 45, hex: "#14b8a6",
    from: "from-teal-900/80", to: "to-cyan-900/80",
    border: "border-teal-700/50", accent: "text-teal-400",
    bar: "bg-teal-500", barBg: "bg-teal-900/30",
    btn: "from-teal-600 to-cyan-600", glow: "shadow-teal-500/30",
    badge: "bg-teal-900/50 text-teal-300 border-teal-700/40",
    dotFill: "bg-teal-500", dotActive: "border-teal-400",
    lessons: dockerLessons,
  },
  {
    phase: 6, course: "java", icon: "☕", name: "Java",
    desc: "OOP kinh điển — nền tảng hệ sinh thái Spring Boot",
    detail: "OOP · Collections · Stream API · Exception Handling",
    why: "Mở rộng sang Java/Spring Boot — rất phổ biến tại các công ty lớn",
    minPer: 55, hex: "#f97316",
    from: "from-orange-900/80", to: "to-amber-900/80",
    border: "border-orange-700/50", accent: "text-orange-400",
    bar: "bg-orange-500", barBg: "bg-orange-900/30",
    btn: "from-orange-600 to-amber-600", glow: "shadow-orange-500/30",
    badge: "bg-orange-900/50 text-orange-300 border-orange-700/40",
    dotFill: "bg-orange-500", dotActive: "border-orange-400",
    lessons: javaLessons,
  },
];

const TOTAL       = PATH.reduce((s, p) => s + p.lessons.length, 0);
const TOTAL_HOURS = Math.round(PATH.reduce((s, p) => s + p.lessons.length * p.minPer, 0) / 60);

/* ─── Helpers ───────────────────────────────────────────────── */
const VN_DAYS   = ["Chủ nhật","Thứ hai","Thứ ba","Thứ tư","Thứ năm","Thứ sáu","Thứ bảy"];
const VN_MONTHS = ["tháng 1","tháng 2","tháng 3","tháng 4","tháng 5","tháng 6",
                   "tháng 7","tháng 8","tháng 9","tháng 10","tháng 11","tháng 12"];

function fmtDate(d: Date)       { return `${VN_DAYS[d.getDay()]}, ${d.getDate()} ${VN_MONTHS[d.getMonth()]} ${d.getFullYear()}`; }
function fmtDateShort(iso: string) { const d = new Date(iso + "T12:00:00"); return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`; }
function fmtDateMed(d: Date)    { return `${d.getDate()} ${VN_MONTHS[d.getMonth()]}`; }

function getLast28Days() {
  const today = new Date().toISOString().split("T")[0];
  return Array.from({ length: 28 }, (_, i) => {
    const d   = new Date(Date.now() - (27 - i) * 864e5);
    const iso = d.toISOString().split("T")[0];
    return { iso, day: d.getDate(), month: d.getMonth(), isToday: iso === today };
  });
}

/* Mini circular progress ring */
function MiniRing({ pct, hex, size = 56 }: { pct: number; hex: string; size?: number }) {
  const r    = (size - 7) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#1f2937" strokeWidth="5" />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={hex} strokeWidth="5"
        strokeDasharray={circ} strokeDashoffset={circ * (1 - pct / 100)}
        strokeLinecap="round" className="transition-all duration-700" />
    </svg>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function SchedulePage() {
  const { getCount, isDone, lastVisited, totalDone, studyDates, streak,
          firstDate, avgPerDay, completedByDate } = useAllProgress();

  const today      = new Date();
  const todayISO   = today.toISOString().split("T")[0];
  const studySet   = new Set(studyDates);
  const totalPct   = Math.round((totalDone / TOTAL) * 100);

  const daysSinceStart = firstDate
    ? Math.floor((Date.now() - new Date(firstDate + "T12:00:00").getTime()) / 864e5) + 1
    : 0;

  // Estimated finish (global)
  const remaining  = TOTAL - totalDone;
  const estDays    = avgPerDay > 0 ? Math.ceil(remaining / avgPerDay) : null;
  const estFinish  = estDays != null
    ? fmtDateShort(new Date(Date.now() + estDays * 864e5).toISOString().split("T")[0])
    : null;
  const estWeeks   = estDays != null ? Math.ceil(estDays / 7) : null;

  // Find active phase + today's lesson
  let todayPhase = PATH[0];
  let todayLessonId: string | undefined;
  for (const p of PATH) {
    const ids  = p.lessons.map(l => l.id);
    const next = ids.find(id => !isDone(p.course, id));
    if (next) {
      todayPhase    = p;
      const last    = lastVisited(p.course);
      todayLessonId = (last && !isDone(p.course, last)) ? last : next;
      break;
    }
  }
  const todayLesson  = todayPhase.lessons.find(l => l.id === todayLessonId) ?? todayPhase.lessons[0];
  const todayLessonIdx = todayPhase.lessons.findIndex(l => l.id === todayLesson.id) + 1;
  const allDone      = totalDone >= TOTAL;

  // Next upcoming lesson (after today's)
  const todayIds    = todayPhase.lessons.map(l => l.id);
  const nextIdx     = todayIds.indexOf(todayLesson.id) + 1;
  const nextLesson  = nextIdx < todayIds.length ? todayPhase.lessons[nextIdx] : null;

  // Calendar
  const calDays = getLast28Days();

  // Heat map intensity
  function heatClass(iso: string) {
    const cnt     = completedByDate[iso] ?? 0;
    const isToday = iso === todayISO;
    if (isToday) {
      return cnt > 0
        ? "bg-blue-500 text-white ring-2 ring-blue-300/60 ring-offset-1 ring-offset-gray-950"
        : "bg-gray-800 text-white ring-2 ring-gray-600/60 ring-offset-1 ring-offset-gray-950";
    }
    if (cnt === 0) return "bg-gray-800/40 text-gray-700";
    if (cnt === 1) return "bg-blue-800/60 text-blue-300";
    if (cnt === 2) return "bg-blue-600/75 text-blue-100";
    return "bg-blue-500 text-white";
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* ══════════════════ HERO ══════════════════ */}
      <div className="relative overflow-hidden border-b border-gray-800/60">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/60 to-gray-950" />
        <div className="absolute inset-0 dot-grid opacity-40" />
        {/* Orbs */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-600/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -top-10 right-0 w-80 h-80 bg-purple-600/6 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 pt-7 pb-10">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 mb-6 transition-colors">
            ← Trang chủ
          </Link>

          <div className="flex items-start justify-between gap-8 flex-wrap">
            {/* Left */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-4xl leading-none">🗺️</span>
                <div>
                  <h1 className="text-3xl font-black text-white leading-tight">
                    Lộ trình học <span className="shimmer-text">Fullstack</span>
                  </h1>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-7 ml-[52px]">
                {fmtDate(today)}
                {daysSinceStart > 0 && <span className="ml-2 text-gray-600">· Ngày thứ <span className="text-gray-400 font-semibold">{daysSinceStart}</span></span>}
              </p>

              {/* Stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  {
                    icon: "📅", value: daysSinceStart > 0 ? `Ngày ${daysSinceStart}` : "Ngày đầu",
                    label: firstDate ? `Bắt đầu ${fmtDateShort(firstDate)}` : "Chưa bắt đầu",
                    accent: "text-blue-400", bg: "from-blue-500/8",
                  },
                  {
                    icon: streak > 2 ? "🔥" : streak > 0 ? "✨" : "💤",
                    value: `${streak} ngày`,
                    label: "Chuỗi liên tiếp",
                    accent: streak > 0 ? "text-orange-400" : "text-gray-500",
                    bg: streak > 0 ? "from-orange-500/8" : "from-gray-500/5",
                  },
                  {
                    icon: "📚", value: `${studyDates.length} ngày`,
                    label: "Tổng ngày học",
                    accent: "text-green-400", bg: "from-green-500/8",
                  },
                  {
                    icon: "🏁", value: estFinish ?? "—",
                    label: estWeeks ? `~${estWeeks} tuần nữa` : "Bắt đầu để tính",
                    accent: estFinish ? "text-purple-400" : "text-gray-600",
                    bg: estFinish ? "from-purple-500/8" : "from-gray-500/5",
                  },
                ].map(st => (
                  <div key={st.label} className={`glass-xl rounded-xl px-3.5 py-3 bg-gradient-to-b ${st.bg} to-transparent`}>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-lg leading-none">{st.icon}</span>
                      <span className={`text-base font-black ${st.accent} leading-none`}>{st.value}</span>
                    </div>
                    <div className="text-[10px] text-gray-600 ml-7">{st.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — big progress ring */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div className="relative w-28 h-28">
                <svg className="w-28 h-28 -rotate-90" viewBox="0 0 112 112">
                  <circle cx="56" cy="56" r="46" fill="none" stroke="#1f2937" strokeWidth="8" />
                  {/* Gradient ring */}
                  <defs>
                    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                  <circle cx="56" cy="56" r="46" fill="none" stroke="url(#ringGrad)" strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 46}`}
                    strokeDashoffset={`${2 * Math.PI * 46 * (1 - totalPct / 100)}`}
                    strokeLinecap="round" className="transition-all duration-1000" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-white">{totalPct}%</span>
                  <span className="text-[10px] text-gray-500">hoàn thành</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-white">{totalDone}<span className="text-gray-600">/{TOTAL}</span> bài</div>
                <div className="text-[11px] text-gray-600">~{TOTAL_HOURS}h tổng khóa học</div>
                {avgPerDay > 0 && <div className="text-[11px] text-blue-400 font-medium mt-0.5">{avgPerDay} bài/ngày tb</div>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-10">

        {/* ══════════════════ TODAY CARD ══════════════════ */}
        {!allDone ? (
          <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${todayPhase.from} ${todayPhase.to} border ${todayPhase.border}`}>
            {/* Dot grid */}
            <div className="absolute inset-0 dot-grid opacity-30" />
            {/* Glow orb */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/4 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none blur-2xl" />

            <div className="relative p-5">
              {/* Top badges */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-white/15 text-white">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                  </span>
                  Hôm nay — {VN_DAYS[today.getDay()]}
                </span>
                <span className={`text-xs px-3 py-1 rounded-full border ${todayPhase.badge}`}>
                  {todayPhase.icon} Giai đoạn {todayPhase.phase} · {todayPhase.name}
                </span>
                {studySet.has(todayISO) && (
                  <span className="text-xs px-3 py-1 rounded-full bg-green-900/50 text-green-300 border border-green-700/40">
                    ✓ Đã học hôm nay
                  </span>
                )}
              </div>

              <div className="flex items-start justify-between gap-5 flex-wrap">
                <div className="flex-1 min-w-0">
                  {/* Lesson info */}
                  <h2 className="text-xl font-black text-white mb-1 leading-tight">{todayLesson.title}</h2>
                  <p className="text-white/60 text-sm mb-3 line-clamp-2">{todayLesson.description}</p>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-3 text-xs text-white/50">
                    <span className="flex items-center gap-1"><span>⏱</span> ~{todayPhase.minPer} phút</span>
                    <span className="flex items-center gap-1"><span>✏️</span> {todayLesson.exercises.length} bài tập</span>
                    <span className="flex items-center gap-1 text-white/70">
                      <span>📍</span> Bài {todayLessonIdx}/{todayPhase.lessons.length} · Giai đoạn {todayPhase.phase}
                    </span>
                  </div>

                  {/* Phase progress bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-[10px] text-white/40 mb-1">
                      <span>Tiến độ giai đoạn {todayPhase.phase}</span>
                      <span>{getCount(todayPhase.course, todayIds)}/{todayIds.length}</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden w-48">
                      <div className="h-full bg-white/50 rounded-full transition-all duration-700"
                        style={{ width: `${Math.round(getCount(todayPhase.course, todayIds) / todayIds.length * 100)}%` }} />
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <Link href={`/${todayPhase.course}/${todayLesson.id}`}
                    className={`px-6 py-3 rounded-xl bg-gradient-to-r ${todayPhase.btn} text-white font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-xl ${todayPhase.glow} shadow-lg`}>
                    {studySet.has(todayISO) ? "Tiếp tục →" : "Học ngay →"}
                  </Link>
                  {nextLesson && (
                    <div className="text-[11px] text-white/40 text-right">
                      Tiếp theo: <span className="text-white/60">{nextLesson.title}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-900/40 to-emerald-900/40 border border-green-700/50 p-8 text-center">
            <div className="text-6xl mb-3">🎉</div>
            <div className="text-2xl font-black text-white mb-2">Xuất sắc! Hoàn thành tất cả khóa học!</div>
            <p className="text-green-300/70 text-sm">Bạn đã hoàn thành lộ trình Fullstack Developer. Hãy tiếp tục build projects!</p>
          </div>
        )}

        {/* ══════════════════ ACTIVITY CALENDAR ══════════════════ */}
        <div>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <h2 className="text-base font-black text-white flex items-center gap-2">
                <span>📆</span> Hoạt động học tập
              </h2>
              <p className="text-xs text-gray-600 mt-0.5">28 ngày gần nhất · mỗi ô = số bài hoàn thành</p>
            </div>
            {streak > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-900/30 border border-orange-700/40 text-sm font-bold text-orange-300">
                🔥 {streak} ngày liên tiếp
              </div>
            )}
          </div>

          <div className="glass-xl rounded-2xl p-5">
            {/* Week day headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {["T2","T3","T4","T5","T6","T7","CN"].map(d => (
                <div key={d} className="text-center text-[10px] text-gray-600 font-semibold tracking-wider">{d}</div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-2">
              {calDays.map(({ iso, day, isToday, month }) => {
                const cnt = completedByDate[iso] ?? 0;
                return (
                  <div key={iso} title={`${iso}${cnt ? ` · ${cnt} bài` : ""}`}
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center text-[11px] font-medium transition-all cursor-default select-none ${heatClass(iso)}`}
                  >
                    <span>{day}</span>
                    {cnt > 0 && <span className="text-[8px] opacity-70 leading-none">{cnt}</span>}
                  </div>
                );
              })}
            </div>

            {/* Legend + stats */}
            <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
              <div className="flex items-center gap-3 text-[10px] text-gray-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-gray-800/40 inline-block" /> Không học
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-blue-800/60 inline-block" /> 1 bài
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-blue-600/75 inline-block" /> 2 bài
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-blue-500 inline-block" /> 3+ bài
                </span>
              </div>
              <div className="text-[11px] text-gray-500">
                {studyDates.length > 0 ? (
                  <>Học <span className="text-white font-semibold">{studyDates.length}</span> ngày · Trung bình <span className="text-blue-400 font-semibold">{avgPerDay}</span> bài/ngày</>
                ) : "Chưa có dữ liệu"}
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════ PHASE ROADMAP ══════════════════ */}
        <div>
          <div className="mb-5">
            <h2 className="text-base font-black text-white flex items-center gap-2">
              <span>📍</span> Lộ trình 6 giai đoạn
            </h2>
            <p className="text-xs text-gray-600 mt-0.5">
              {totalDone}/{TOTAL} bài · ~{TOTAL_HOURS}h tổng
              {estDays != null && ` · hoàn thành trong ~${estWeeks} tuần nữa`}
            </p>
          </div>

          <div className="relative">
            {/* Timeline vertical line */}
            <div className="absolute left-[27px] top-8 bottom-8 w-px bg-gradient-to-b from-blue-500/40 via-gray-700/40 to-gray-800/20 hidden sm:block" />

            <div className="space-y-4">
              {PATH.map(p => {
                const ids      = p.lessons.map(l => l.id);
                const done     = getCount(p.course, ids);
                const pct      = Math.round((done / ids.length) * 100);
                const nextId   = ids.find(id => !isDone(p.course, id));
                const last     = lastVisited(p.course);
                const status   = done === ids.length ? "done" : done > 0 ? "active" : "pending";
                const targetId = status === "active" && last && !isDone(p.course, last) ? last : (nextId ?? ids[0]);
                const totalMin = p.lessons.length * p.minPer;
                const hrs      = `${Math.floor(totalMin / 60)}h${totalMin % 60 > 0 ? `${totalMin % 60}m` : ""}`;

                // Est. completion for this phase
                const phaseRemaining = ids.length - done;
                const phaseEstDays   = status === "active" && avgPerDay > 0 ? Math.ceil(phaseRemaining / avgPerDay) : null;
                const phaseEstFinish = phaseEstDays != null ? fmtDateMed(new Date(Date.now() + phaseEstDays * 864e5)) : null;

                // Lesson dots (max 10)
                const MAX_DOTS = 10;
                const dotIds   = ids.slice(0, MAX_DOTS);
                const extra    = ids.length - MAX_DOTS;

                return (
                  <div key={p.course} className="relative sm:pl-16">
                    {/* Timeline dot */}
                    <div className={`absolute left-4 top-6 w-7 h-7 rounded-full border-2 z-10 items-center justify-center text-xs font-black hidden sm:flex transition-all ${
                      status === "done"
                        ? "bg-green-500 border-green-400 text-white shadow-lg shadow-green-500/30"
                        : status === "active"
                        ? `bg-gradient-to-br ${p.from} ${p.to} border-transparent text-white shadow-lg ${p.glow}`
                        : "bg-gray-800 border-gray-700 text-gray-500"
                    }`}>
                      {status === "done" ? "✓" : p.phase}
                    </div>

                    {/* Card */}
                    <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      status === "active"
                        ? `bg-gradient-to-br ${p.from} ${p.to} ${p.border}`
                        : status === "done"
                        ? "bg-green-950/10 border-green-800/25"
                        : "bg-gray-900/50 border-gray-800/50"
                    }`}>
                      <div className="p-4 pb-3">
                        {/* Top row */}
                        <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl leading-none">{p.icon}</span>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-black text-white text-base">{p.name}</span>
                                {status === "active" && (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 text-white font-semibold flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Đang học
                                  </span>
                                )}
                                {status === "done" && (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-800/50 text-green-300 border border-green-700/30 font-semibold">✓ Hoàn thành</span>
                                )}
                                {status === "pending" && p.phase === 6 && (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-800 text-gray-500">Tùy chọn</span>
                                )}
                              </div>
                              <div className={`text-xs mt-0.5 ${status === "active" ? "text-white/60" : "text-gray-500"}`}>{p.desc}</div>
                            </div>
                          </div>

                          {/* Right: mini ring + CTA */}
                          <div className="flex items-center gap-3 shrink-0">
                            <div className="relative">
                              <MiniRing pct={pct} hex={status === "done" ? "#22c55e" : p.hex} size={52} />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className={`text-[11px] font-black ${status === "done" ? "text-green-400" : status === "active" ? "text-white" : "text-gray-500"}`}>
                                  {pct}%
                                </span>
                              </div>
                            </div>
                            {status === "pending" && p.phase < 6 ? null : (
                              <Link href={`/${p.course}/${targetId}`}
                                className={`px-3.5 py-2 rounded-xl text-white text-xs font-bold transition-all hover:scale-105 ${
                                  status === "done"
                                    ? "bg-green-700/50 hover:bg-green-700/70 border border-green-600/30"
                                    : status === "active"
                                    ? `bg-gradient-to-r ${p.btn} shadow-lg ${p.glow}`
                                    : "bg-gray-700/50 hover:bg-gray-700/70 border border-gray-600/30"
                                }`}>
                                {status === "done" ? "Ôn lại" : status === "active" ? "Tiếp tục →" : "Bắt đầu →"}
                              </Link>
                            )}
                          </div>
                        </div>

                        {/* Why */}
                        <div className={`text-[11px] flex items-start gap-1.5 mb-3 ${status === "active" ? "text-white/50" : "text-gray-600"}`}>
                          <span>💡</span>
                          <span className="italic">{p.why}</span>
                        </div>

                        {/* Lesson dots */}
                        <div className="flex items-center gap-1.5 flex-wrap mb-3">
                          {dotIds.map((id, i) => {
                            const completed = isDone(p.course, id);
                            const isCurrent = !completed && nextId === id && status === "active";
                            return (
                              <div key={id} title={p.lessons[i]?.title}
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold border transition-all ${
                                  completed
                                    ? `${p.dotFill} border-transparent text-white`
                                    : isCurrent
                                    ? `border-2 ${p.dotActive} text-white/70 bg-white/5 animate-pulse`
                                    : "bg-gray-800/60 border-gray-700/50 text-gray-600"
                                }`}>
                                {completed ? "✓" : i + 1}
                              </div>
                            );
                          })}
                          {extra > 0 && (
                            <div className="w-6 h-6 rounded-full bg-gray-800/40 border border-gray-700/40 flex items-center justify-center text-[8px] text-gray-600">
                              +{extra}
                            </div>
                          )}
                          <span className={`text-[10px] ml-1 ${status === "active" ? "text-white/40" : "text-gray-600"}`}>
                            {done}/{ids.length}
                          </span>
                        </div>

                        {/* Progress bar */}
                        <div className="h-1.5 bg-black/20 rounded-full overflow-hidden mb-2">
                          <div className={`h-full ${status === "done" ? "bg-green-500" : p.bar} rounded-full transition-all duration-700`}
                            style={{ width: `${pct}%` }} />
                        </div>

                        {/* Footer meta */}
                        <div className={`flex items-center justify-between text-[10px] ${status === "active" ? "text-white/40" : "text-gray-600"}`}>
                          <span>{ids.length} bài · ~{hrs} · ~{p.minPer} phút/bài</span>
                          {phaseEstFinish && status === "active" && (
                            <span className={`${p.accent} font-medium`}>Dự kiến xong: {phaseEstFinish}</span>
                          )}
                          {status === "done" && <span className="text-green-400 font-semibold">✅ Đã xong!</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ══════════════════ WEEKLY PLAN ══════════════════ */}
        <div>
          <h2 className="text-base font-black text-white mb-1 flex items-center gap-2">
            <span>🗓️</span> Lịch học gợi ý trong tuần
          </h2>
          <p className="text-xs text-gray-600 mb-4">
            4 buổi học · 1 buổi ôn · 1 ngày tự do · 1 ngày nghỉ
            {estWeeks != null && ` · Hoàn thành trong ~${estWeeks} tuần`}
          </p>

          <div className="grid grid-cols-7 gap-2">
            {([
              { d: "T2", type: "study",   label: "Học mới",  icon: "📖" },
              { d: "T3", type: "study",   label: "Học mới",  icon: "📖" },
              { d: "T4", type: "review",  label: "Ôn tập",   icon: "📝" },
              { d: "T5", type: "study",   label: "Học mới",  icon: "📖" },
              { d: "T6", type: "study",   label: "Học mới",  icon: "📖" },
              { d: "T7", type: "project", label: "Tự do",    icon: "🎮" },
              { d: "CN", type: "rest",    label: "Nghỉ ngơi",icon: "😴" },
            ] as const).map(({ d, type, label, icon }) => {
              const style = {
                study:   { bg: "bg-blue-900/30   border-blue-800/40",   text: "text-blue-300",   ring: "ring-blue-400/50" },
                review:  { bg: "bg-yellow-900/30 border-yellow-800/40", text: "text-yellow-300", ring: "ring-yellow-400/50" },
                project: { bg: "bg-purple-900/30 border-purple-800/40", text: "text-purple-300", ring: "ring-purple-400/50" },
                rest:    { bg: "bg-gray-800/30   border-gray-700/40",   text: "text-gray-500",   ring: "ring-gray-500/40" },
              }[type];

              const todayDayVN = [6, 0, 1, 2, 3, 4, 5][today.getDay()]; // Sun=6, Mon=0 ...
              const thisDayVN  = ["T2","T3","T4","T5","T6","T7","CN"].indexOf(d);
              const isToday    = todayDayVN === thisDayVN;

              return (
                <div key={d}
                  className={`rounded-xl border p-2.5 flex flex-col items-center gap-2 ${style.bg} ${isToday ? `ring-2 ${style.ring}` : ""} transition-all`}>
                  <span className={`text-[11px] font-black tracking-wider ${isToday ? "text-white" : "text-gray-500"}`}>{d}</span>
                  <span className="text-2xl leading-none">{icon}</span>
                  <span className={`text-[10px] text-center leading-tight font-semibold ${style.text}`}>{label}</span>
                  {isToday && type !== "rest" && (
                    <span className="text-[9px] text-white/50 text-center leading-tight">
                      {todayPhase.icon} G{todayPhase.phase}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ══════════════════ TIPS ══════════════════ */}
        <div className="glass-xl rounded-2xl p-6 border border-white/6">
          <h2 className="text-sm font-black text-white mb-5 flex items-center gap-2">
            <span>💡</span> Bí kíp học lập trình hiệu quả
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { tip: "Học cùng một giờ mỗi ngày — não sẽ tự động tập trung hơn khi đến giờ đó" },
              { tip: "Tự gõ lại code thay vì copy-paste — motor memory quan trọng hơn visual memory" },
              { tip: "Gặp bug, debug ít nhất 15 phút trước khi hỏi AI — đây là lúc học nhiều nhất" },
              { tip: "Sau mỗi bài, đóng tab lại và tự giải thích concept bằng lời của mình (Feynman technique)" },
              { tip: "Cuối mỗi giai đoạn, build 1 mini project để apply — không build = không nhớ" },
              { tip: "Streak > Intensity — 20 phút mỗi ngày tốt hơn nhiều so với 4 giờ vào cuối tuần" },
            ].map(({ tip }, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white ${
                  ["from-blue-600 to-indigo-600","from-green-600 to-emerald-600","from-purple-600 to-violet-600",
                   "from-pink-600 to-rose-600","from-teal-600 to-cyan-600","from-orange-600 to-amber-600"][i]
                } bg-gradient-to-br`}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
