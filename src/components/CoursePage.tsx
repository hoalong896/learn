import Link from "next/link";
import { CourseProgressBar, LessonDoneBadge } from "./CourseProgress";

type CourseColor = "blue" | "orange" | "green" | "purple" | "pink" | "teal" | "yellow" | "sky" | "red";

export interface CoursePageLesson {
  id: string;
  title: string;
  description: string;
  level: "Cơ bản" | "Trung cấp" | "Nâng cao";
  exercises: unknown[];
  videos?: unknown[];
  playgrounds?: unknown[];
}

interface CourseStat { icon: string; value: string | number; label: string; }

interface Props {
  color: CourseColor;
  icon: string;
  title: string;
  subtitle: string;
  course: string;
  lessons: CoursePageLesson[];
  extraStats?: CourseStat[];
}

const STYLE: Record<CourseColor, {
  heroGrad: string; heroBorder: string;
  iconGrad: string; accent: string;
  orb1: string; orb2: string;
  accentHover: string;
  hoverBorder: string; hoverBg: string;
  numBg: string; numText: string;
  titleHover: string; tagAccent: string;
  bar: string; accentBar: string;
  btnGrad: string;
}> = {
  blue:   { heroGrad:"from-blue-950 via-gray-950 to-gray-950",   heroBorder:"border-blue-800/40",   iconGrad:"from-blue-500 to-indigo-600",   accent:"text-blue-400",   accentHover:"hover:text-blue-300",   orb1:"bg-blue-600/15",   orb2:"bg-indigo-600/8", hoverBorder:"hover:border-blue-500/50",   hoverBg:"hover:bg-blue-950/25",   numBg:"group-hover:bg-blue-900/60",   numText:"group-hover:text-blue-300",   titleHover:"group-hover:text-blue-100",   tagAccent:"text-blue-400",   bar:"bg-blue-500",   accentBar:"bg-blue-500",   btnGrad:"from-blue-600 to-indigo-600" },
  orange: { heroGrad:"from-orange-950 via-gray-950 to-gray-950", heroBorder:"border-orange-800/40", iconGrad:"from-orange-500 to-amber-600",  accent:"text-orange-400", accentHover:"hover:text-orange-300", orb1:"bg-orange-600/15", orb2:"bg-amber-600/8",   hoverBorder:"hover:border-orange-500/50", hoverBg:"hover:bg-orange-950/25", numBg:"group-hover:bg-orange-900/60", numText:"group-hover:text-orange-300", titleHover:"group-hover:text-orange-100", tagAccent:"text-orange-400", bar:"bg-orange-500", accentBar:"bg-orange-500", btnGrad:"from-orange-600 to-amber-600" },
  green:  { heroGrad:"from-green-950 via-gray-950 to-gray-950",  heroBorder:"border-green-800/40",  iconGrad:"from-green-500 to-emerald-600", accent:"text-green-400",  accentHover:"hover:text-green-300",  orb1:"bg-green-600/15",  orb2:"bg-emerald-600/8",  hoverBorder:"hover:border-green-500/50",  hoverBg:"hover:bg-green-950/25",  numBg:"group-hover:bg-green-900/60",  numText:"group-hover:text-green-300",  titleHover:"group-hover:text-green-100",  tagAccent:"text-green-400",  bar:"bg-green-500",  accentBar:"bg-green-500",  btnGrad:"from-green-600 to-emerald-600" },
  purple: { heroGrad:"from-purple-950 via-gray-950 to-gray-950", heroBorder:"border-purple-800/40", iconGrad:"from-purple-500 to-violet-600", accent:"text-purple-400", accentHover:"hover:text-purple-300", orb1:"bg-purple-600/15", orb2:"bg-violet-600/8",  hoverBorder:"hover:border-purple-500/50", hoverBg:"hover:bg-purple-950/25", numBg:"group-hover:bg-purple-900/60", numText:"group-hover:text-purple-300", titleHover:"group-hover:text-purple-100", tagAccent:"text-purple-400", bar:"bg-purple-500", accentBar:"bg-purple-500", btnGrad:"from-purple-600 to-violet-600" },
  pink:   { heroGrad:"from-pink-950 via-gray-950 to-gray-950",   heroBorder:"border-pink-800/40",   iconGrad:"from-pink-500 to-rose-600",    accent:"text-pink-400",   accentHover:"hover:text-pink-300",   orb1:"bg-pink-600/15",   orb2:"bg-rose-600/8",     hoverBorder:"hover:border-pink-500/50",   hoverBg:"hover:bg-pink-950/25",   numBg:"group-hover:bg-pink-900/60",   numText:"group-hover:text-pink-300",   titleHover:"group-hover:text-pink-100",   tagAccent:"text-pink-400",   bar:"bg-pink-500",   accentBar:"bg-pink-500",   btnGrad:"from-pink-600 to-rose-600" },
  teal:   { heroGrad:"from-teal-950 via-gray-950 to-gray-950",     heroBorder:"border-teal-800/40",   iconGrad:"from-teal-500 to-cyan-600",     accent:"text-teal-400",   accentHover:"hover:text-teal-300",   orb1:"bg-teal-600/15",   orb2:"bg-cyan-600/8",      hoverBorder:"hover:border-teal-500/50",   hoverBg:"hover:bg-teal-950/25",   numBg:"group-hover:bg-teal-900/60",   numText:"group-hover:text-teal-300",   titleHover:"group-hover:text-teal-100",   tagAccent:"text-teal-400",   bar:"bg-teal-500",   accentBar:"bg-teal-500",   btnGrad:"from-teal-600 to-cyan-600" },
  yellow: { heroGrad:"from-yellow-950 via-gray-950 to-gray-950",   heroBorder:"border-yellow-800/40", iconGrad:"from-yellow-400 to-amber-500",  accent:"text-yellow-400", accentHover:"hover:text-yellow-300", orb1:"bg-yellow-600/15", orb2:"bg-amber-600/8",     hoverBorder:"hover:border-yellow-500/50", hoverBg:"hover:bg-yellow-950/25", numBg:"group-hover:bg-yellow-900/60", numText:"group-hover:text-yellow-300", titleHover:"group-hover:text-yellow-100", tagAccent:"text-yellow-400", bar:"bg-yellow-500", accentBar:"bg-yellow-500", btnGrad:"from-yellow-500 to-amber-500" },
  sky:    { heroGrad:"from-sky-950 via-gray-950 to-gray-950",       heroBorder:"border-sky-800/40",    iconGrad:"from-sky-500 to-cyan-500",      accent:"text-sky-400",    accentHover:"hover:text-sky-300",    orb1:"bg-sky-600/15",    orb2:"bg-cyan-600/8",      hoverBorder:"hover:border-sky-500/50",    hoverBg:"hover:bg-sky-950/25",    numBg:"group-hover:bg-sky-900/60",    numText:"group-hover:text-sky-300",    titleHover:"group-hover:text-sky-100",    tagAccent:"text-sky-400",    bar:"bg-sky-500",    accentBar:"bg-sky-500",    btnGrad:"from-sky-600 to-cyan-600" },
  red:    { heroGrad:"from-red-950 via-gray-950 to-gray-950",       heroBorder:"border-red-800/40",    iconGrad:"from-red-500 to-rose-600",      accent:"text-red-400",    accentHover:"hover:text-red-300",    orb1:"bg-red-600/15",    orb2:"bg-rose-600/8",      hoverBorder:"hover:border-red-500/50",    hoverBg:"hover:bg-red-950/25",    numBg:"group-hover:bg-red-900/60",    numText:"group-hover:text-red-300",    titleHover:"group-hover:text-red-100",    tagAccent:"text-red-400",    bar:"bg-red-500",    accentBar:"bg-red-500",    btnGrad:"from-red-600 to-rose-600" },
};

const LEVEL_BADGE: Record<string, string> = {
  "Cơ bản":    "bg-green-900/40 text-green-400 border-green-700/40",
  "Trung cấp": "bg-yellow-900/40 text-yellow-400 border-yellow-700/40",
  "Nâng cao":  "bg-red-900/40 text-red-400 border-red-700/40",
};

export default function CoursePage({ color, icon, title, subtitle, course, lessons, extraStats }: Props) {
  const s = STYLE[color];
  const totalExercises = lessons.reduce((acc, l) => acc + l.exercises.length, 0);
  const basic = lessons.filter(l => l.level === "Cơ bản").length;
  const mid   = lessons.filter(l => l.level === "Trung cấp").length;
  const adv   = lessons.filter(l => l.level === "Nâng cao").length;
  const firstId = lessons[0]?.id;

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* ── Hero ── */}
      <div className={`relative overflow-hidden bg-gradient-to-br ${s.heroGrad} border-b ${s.heroBorder}`}>
        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid opacity-60" />

        {/* Orbs */}
        <div className={`absolute -top-32 -right-32 w-[500px] h-[500px] ${s.orb1} rounded-full blur-[120px] pointer-events-none`} />
        <div className={`absolute -bottom-24 -left-24 w-96 h-96 ${s.orb2} rounded-full blur-[100px] pointer-events-none`} />

        <div className="relative max-w-4xl mx-auto px-6 pt-8 pb-12">
          <Link href="/" className={`inline-flex items-center gap-1.5 text-sm ${s.accent} ${s.accentHover} mb-7 transition-colors`}>
            ← Trang chủ
          </Link>

          <div className="flex items-start justify-between gap-6 mb-8">
            <div className="flex items-start gap-5">
              {/* Icon with glow ring */}
              <div className="relative shrink-0">
                <div className={`w-18 h-18 w-[72px] h-[72px] rounded-2xl bg-gradient-to-br ${s.iconGrad} flex items-center justify-center text-4xl shadow-2xl animate-float`}>
                  {icon}
                </div>
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${s.iconGrad} opacity-30 blur-xl -z-10`} />
              </div>
              <div>
                <p className={`text-xs font-bold ${s.accent} uppercase tracking-widest mb-1`}>Khóa học</p>
                <h1 className="text-4xl font-black text-white mb-1.5">{title}</h1>
                <p className={`${s.accent} text-sm font-medium`}>{subtitle}</p>
              </div>
            </div>
            {firstId && (
              <Link
                href={`/${course}/${firstId}`}
                className={`shrink-0 hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ${s.btnGrad} text-white text-sm font-bold transition-all hover:scale-105 hover:brightness-110 active:scale-95 shadow-lg`}
              >
                Bắt đầu học →
              </Link>
            )}
          </div>

          {/* Stat cards */}
          <div className="flex flex-wrap gap-3 mb-7">
            {[
              { icon: "📚", value: lessons.length, label: "Bài học" },
              { icon: "✏️", value: totalExercises, label: "Bài tập" },
              ...(extraStats ?? []).map(st => ({ icon: st.icon, value: st.value, label: st.label })),
              { icon: "🆓", value: "100%", label: "Miễn phí" },
            ].map(st => (
              <div key={st.label} className="glass-xl rounded-xl px-4 py-3 flex items-center gap-3">
                <span className="text-2xl">{st.icon}</span>
                <div>
                  <div className={`text-2xl font-black ${s.accent} leading-none`}>{st.value}</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">{st.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Level pills */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {basic > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-900/40 text-green-400 border border-green-700/30">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> {basic} Cơ bản
              </span>
            )}
            {mid > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-900/40 text-yellow-400 border border-yellow-700/30">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" /> {mid} Trung cấp
              </span>
            )}
            {adv > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-900/40 text-red-400 border border-red-700/30">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" /> {adv} Nâng cao
              </span>
            )}
          </div>

          <CourseProgressBar lessonIds={lessons.map(l => l.id)} course={course} courseColor={color} />
        </div>
      </div>

      {/* ── Lesson list ── */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex flex-col gap-2.5">
          {lessons.map((lesson, idx) => {
            const videoCount      = lesson.videos?.length ?? 0;
            const playgroundCount = lesson.playgrounds?.length ?? 0;
            return (
              <Link
                key={lesson.id}
                href={`/${course}/${lesson.id}`}
                className={`group relative flex items-center gap-4 p-5 rounded-2xl bg-gray-900/80 border border-gray-800/80 ${s.hoverBorder} ${s.hoverBg} transition-all duration-200 overflow-hidden`}
              >
                {/* Left accent bar */}
                <div className={`absolute left-0 inset-y-0 w-[3px] ${s.accentBar} opacity-0 group-hover:opacity-100 transition-opacity rounded-l-2xl`} />

                {/* Number */}
                <div className={`shrink-0 w-11 h-11 rounded-xl bg-gray-800/80 ${s.numBg} flex items-center justify-center font-bold tabular-nums text-sm text-gray-400 ${s.numText} transition-all duration-200 border border-gray-700/50 group-hover:border-transparent`}>
                  {String(idx + 1).padStart(2, "0")}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className={`font-semibold text-white ${s.titleHover} transition-colors`}>
                      {lesson.title}
                    </h3>
                    <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full border ${LEVEL_BADGE[lesson.level]}`}>
                      {lesson.level}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{lesson.description}</p>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-gray-600" />
                      {lesson.exercises.length} bài tập
                    </span>
                    {videoCount > 0 && <span className={`${s.tagAccent} font-medium`}>▶ {videoCount} video</span>}
                    {playgroundCount > 0 && <span>⬡ {playgroundCount} sandbox</span>}
                  </div>
                </div>

                {/* Right */}
                <div className="shrink-0 flex flex-col items-end gap-2">
                  <LessonDoneBadge lessonId={lesson.id} course={course} />
                  <span className={`${s.accent} opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-lg leading-none`}>→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
