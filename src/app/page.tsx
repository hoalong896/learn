import Link from "next/link";
import { typescriptLessons } from "@/data/typescript-lessons";
import { javaLessons } from "@/data/java-lessons";
import { nodejsLessons } from "@/data/nodejs-lessons";
import { nextjsLessons } from "@/data/nextjs-lessons";
import { nestjsLessons } from "@/data/nestjs-lessons";
import { dockerLessons } from "@/data/docker-lessons";

const exCount = (lessons: { exercises: unknown[] }[]) =>
  lessons.reduce((s, l) => s + l.exercises.length, 0);

const COURSES = [
  {
    href: "/typescript", icon: "🔷", title: "TypeScript", subtitle: "JavaScript có kiểu dữ liệu",
    desc: "Từ kiểu cơ bản đến Generics, Decorators, Utility Types. Nền tảng cho mọi dự án JS hiện đại.",
    from: "from-blue-600", to: "to-indigo-600",
    bg: "from-blue-950/70 to-indigo-950/70",
    border: "border-blue-800/40",
    topAccent: "from-blue-500 to-indigo-500",
    text: "text-blue-400", dot: "bg-blue-500",
    tags: ["Types", "Interface", "Generics", "Decorators"],
    badge: "Frontend", badgeBg: "bg-blue-900/60 text-blue-300 border-blue-700/50",
    hoverGlow: "hover-glow-blue",
    hoverBorder: "hover:border-blue-500/50",
  },
  {
    href: "/java", icon: "☕", title: "Java", subtitle: "Write Once, Run Anywhere",
    desc: "OOP, Collections, Stream API, Exception Handling. Nền tảng cho Android & Enterprise Backend.",
    from: "from-orange-600", to: "to-amber-600",
    bg: "from-orange-950/70 to-amber-950/70",
    border: "border-orange-800/40",
    topAccent: "from-orange-500 to-amber-500",
    text: "text-orange-400", dot: "bg-orange-500",
    tags: ["OOP", "Collections", "Streams", "Spring"],
    badge: "Backend", badgeBg: "bg-orange-900/60 text-orange-300 border-orange-700/50",
    hoverGlow: "hover-glow-orange",
    hoverBorder: "hover:border-orange-500/50",
  },
  {
    href: "/nodejs", icon: "🟢", title: "Node.js", subtitle: "JavaScript phía server",
    desc: "EventLoop, File System, HTTP, Express, REST API, JWT. Xây dựng backend bằng JavaScript.",
    from: "from-green-600", to: "to-emerald-600",
    bg: "from-green-950/70 to-emerald-950/70",
    border: "border-green-800/40",
    topAccent: "from-green-500 to-emerald-500",
    text: "text-green-400", dot: "bg-green-500",
    tags: ["Express", "REST API", "JWT", "Async"],
    badge: "Backend", badgeBg: "bg-green-900/60 text-green-300 border-green-700/50",
    hoverGlow: "hover-glow-green",
    hoverBorder: "hover:border-green-500/50",
  },
  {
    href: "/nextjs", icon: "▲", title: "Next.js", subtitle: "React Fullstack Framework",
    desc: "App Router, Server Components, Data Fetching, API Routes, Auth. Framework mạnh nhất cho React.",
    from: "from-purple-600", to: "to-violet-600",
    bg: "from-purple-950/70 to-violet-950/70",
    border: "border-purple-800/40",
    topAccent: "from-purple-500 to-violet-500",
    text: "text-purple-400", dot: "bg-purple-500",
    tags: ["App Router", "SSR/SSG", "API Routes", "Auth"],
    badge: "Fullstack", badgeBg: "bg-purple-900/60 text-purple-300 border-purple-700/50",
    hoverGlow: "hover-glow-purple",
    hoverBorder: "hover:border-purple-500/50",
  },
  {
    href: "/nestjs", icon: "🐈", title: "NestJS", subtitle: "Node.js Enterprise Framework",
    desc: "REST API, PostgreSQL, JWT Auth, TypeORM, Unit Testing. Chuẩn production cho backend TypeScript.",
    from: "from-pink-600", to: "to-rose-600",
    bg: "from-pink-950/70 to-rose-950/70",
    border: "border-pink-800/40",
    topAccent: "from-pink-500 to-rose-500",
    text: "text-pink-400", dot: "bg-pink-500",
    tags: ["REST API", "TypeORM", "JWT", "Testing"],
    badge: "Backend", badgeBg: "bg-pink-900/60 text-pink-300 border-pink-700/50",
    hoverGlow: "hover-glow-pink",
    hoverBorder: "hover:border-pink-500/50",
    hasVideo: true,
  },
  {
    href: "/docker", icon: "🐳", title: "Docker", subtitle: "Container hóa ứng dụng",
    desc: "Dockerfile, Docker Compose, Volumes, Networks. Triển khai ứng dụng nhất quán từ dev đến production.",
    from: "from-teal-600", to: "to-cyan-600",
    bg: "from-teal-950/70 to-cyan-950/70",
    border: "border-teal-800/40",
    topAccent: "from-teal-500 to-cyan-500",
    text: "text-teal-400", dot: "bg-teal-500",
    tags: ["Dockerfile", "Compose", "Volumes", "CI/CD"],
    badge: "DevOps", badgeBg: "bg-teal-900/60 text-teal-300 border-teal-700/50",
    hoverGlow: "hover-glow-teal",
    hoverBorder: "hover:border-teal-500/50",
  },
];

const allData = [
  { lessons: typescriptLessons },
  { lessons: javaLessons },
  { lessons: nodejsLessons },
  { lessons: nextjsLessons },
  { lessons: nestjsLessons },
  { lessons: dockerLessons },
];

const PATH = [
  { step: "1", label: "TypeScript", sub: "Nền tảng JS",    color: "bg-blue-500/15 border border-blue-500/30",   icon: "🔷", glow: "group-hover:shadow-blue-500/30",   href: "/typescript" },
  { step: "2", label: "Node.js",    sub: "Backend JS",     color: "bg-green-500/15 border border-green-500/30",  icon: "🟢", glow: "group-hover:shadow-green-500/30",  href: "/nodejs" },
  { step: "3", label: "NestJS",     sub: "Enterprise API", color: "bg-pink-500/15 border border-pink-500/30",    icon: "🐈", glow: "group-hover:shadow-pink-500/30",   href: "/nestjs" },
  { step: "4", label: "Next.js",    sub: "Fullstack",      color: "bg-purple-500/15 border border-purple-500/30",icon: "▲",  glow: "group-hover:shadow-purple-500/30", href: "/nextjs" },
  { step: "5", label: "Docker",     sub: "Deploy",         color: "bg-teal-500/15 border border-teal-500/30",    icon: "🐳", glow: "group-hover:shadow-teal-500/30",   href: "/docker" },
];

export default function HomePage() {
  const totalLessons   = allData.reduce((s, d) => s + d.lessons.length, 0);
  const totalExercises = allData.reduce((s, d) => s + exCount(d.lessons as any), 0);
  const totalVideos    = nestjsLessons.reduce((s, l) => s + (l.videos?.length ?? 0), 0);

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Layered background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(99,102,241,0.22),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_75%_60%,rgba(139,92,246,0.1),transparent)]" />

        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid opacity-100" />

        {/* Animated orbs */}
        <div className="absolute top-[-5%] left-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none animate-float" />
        <div className="absolute top-[15%] right-[8%] w-[380px] h-[380px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" style={{ animationDelay: "1.5s" }} />
        <div className="absolute bottom-[-5%] left-[35%] w-[450px] h-[320px] bg-teal-600/8 rounded-full blur-[110px] pointer-events-none animate-float" style={{ animationDelay: "3s" }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 font-medium mb-8 animate-fade-up shadow-inner">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            Miễn phí · Chạy code ngay trên trình duyệt · AI trợ lý 24/7
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6 animate-fade-up" style={{ animationDelay: "80ms" }}>
            Học lập trình{" "}
            <span className="shimmer-text">Fullstack</span>
            <br />
            <span className="text-gray-500 font-extrabold text-4xl sm:text-5xl md:text-6xl">từ đầu đến cuối</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: "140ms" }}>
            <span className="text-blue-400 font-medium">TypeScript</span> ·{" "}
            <span className="text-orange-400 font-medium">Java</span> ·{" "}
            <span className="text-green-400 font-medium">Node.js</span> ·{" "}
            <span className="text-pink-400 font-medium">NestJS</span> ·{" "}
            <span className="text-purple-400 font-medium">Next.js</span> ·{" "}
            <span className="text-teal-400 font-medium">Docker</span>
            {" — "}bài giảng tiếng Việt, AI trợ lý trong mỗi bài học
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-14 animate-fade-up stagger" style={{ animationDelay: "200ms" }}>
            {[
              { href: "/typescript", label: "TypeScript", icon: "🔷", grad: "from-blue-600 to-indigo-600",   shadow: "hover:shadow-blue-500/40" },
              { href: "/nodejs",     label: "Node.js",    icon: "🟢", grad: "from-green-600 to-emerald-600",  shadow: "hover:shadow-green-500/40" },
              { href: "/nestjs",     label: "NestJS",     icon: "🐈", grad: "from-pink-600 to-rose-600",      shadow: "hover:shadow-pink-500/40" },
              { href: "/nextjs",     label: "Next.js",    icon: "▲",  grad: "from-purple-600 to-violet-600",  shadow: "hover:shadow-purple-500/40" },
              { href: "/docker",     label: "Docker",     icon: "🐳", grad: "from-teal-600 to-cyan-600",      shadow: "hover:shadow-teal-500/40" },
              { href: "/java",       label: "Java",       icon: "☕", grad: "from-orange-600 to-amber-600",   shadow: "hover:shadow-orange-500/40" },
            ].map(c => (
              <Link key={c.href} href={c.href}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ${c.grad} font-semibold text-sm transition-all hover:scale-105 hover:brightness-110 shadow-lg ${c.shadow} hover:shadow-xl animate-fade-up`}
              >
                <span>{c.icon}</span>{c.label}
              </Link>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "260ms" }}>
            {[
              { n: `${totalLessons}`, label: "Bài học", icon: "📚", accent: "text-blue-400", bg: "from-blue-500/10" },
              { n: `${totalExercises}+`, label: "Bài tập", icon: "✏️", accent: "text-purple-400", bg: "from-purple-500/10" },
              { n: `${totalVideos}+`, label: "Video vietsub", icon: "🎬", accent: "text-pink-400", bg: "from-pink-500/10" },
              { n: "100%", label: "Miễn phí", icon: "🎁", accent: "text-green-400", bg: "from-green-500/10" },
            ].map(s => (
              <div key={s.label} className={`glass rounded-2xl p-4 text-center bg-gradient-to-b ${s.bg} to-transparent`}>
                <div className={`text-xl mb-1 ${s.accent}`}>{s.icon}</div>
                <div className={`text-2xl font-black ${s.accent}`}>{s.n}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-700 animate-float">
          <span className="text-xs tracking-wider uppercase text-[10px]">cuộn xuống</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Learning Path ── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-[0.2em]">Lộ trình</span>
          <h2 className="text-3xl font-black text-white mt-2 mb-3">Con đường Fullstack</h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">Học theo thứ tự này để xây dựng nền tảng vững chắc từ frontend đến deploy</p>
        </div>

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-center gap-0">
          {/* Connecting gradient line */}
          <div className="hidden sm:block absolute top-8 left-[12%] right-[12%] h-px bg-gradient-to-r from-blue-500/40 via-purple-500/30 to-teal-500/40" />

          {PATH.map((step, i) => (
            <Link key={step.href} href={step.href}
              className="relative flex flex-row sm:flex-col items-center sm:items-center gap-4 sm:gap-3 flex-1 group px-2 py-3 sm:py-0">
              {/* Step icon circle */}
              <div className={`relative w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center text-3xl shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1.5 group-hover:shadow-xl ${step.glow} shrink-0 z-10`}>
                {step.icon}
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gray-950 border border-gray-700 flex items-center justify-center text-[10px] font-black text-white leading-none">
                  {step.step}
                </span>
              </div>
              <div className="sm:text-center">
                <div className="font-bold text-white text-sm group-hover:text-gray-100 transition-colors">{step.label}</div>
                <div className="text-xs text-gray-600 group-hover:text-gray-500 transition-colors">{step.sub}</div>
              </div>
              {i < PATH.length - 1 && (
                <svg className="hidden sm:block absolute -right-3 top-7 w-6 h-6 text-gray-700 group-hover:text-gray-500 transition-colors" fill="none" viewBox="0 0 24 24">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/>
                </svg>
              )}
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link href="/schedule"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border-white/10 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/8 transition-all hover:scale-105">
            <span>🗺️</span> Xem lộ trình chi tiết →
          </Link>
        </div>
      </section>

      {/* ── Courses ── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-[0.2em]">Khóa học</span>
          <h2 className="text-3xl font-black text-white mt-2 mb-3">Chọn khóa học của bạn</h2>
          <p className="text-gray-500 text-sm">Mỗi khóa từ cơ bản đến nâng cao — bài tập thực hành, sandbox tự do, AI trợ lý</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {COURSES.map((course, i) => {
            const data = allData[i];
            const lessons   = data.lessons.length;
            const exercises = exCount(data.lessons as any);
            const videos    = data.lessons.reduce((s: number, l: any) => s + (l.videos?.length ?? 0), 0);

            return (
              <Link
                key={course.href}
                href={course.href}
                className={`group relative flex flex-col rounded-2xl bg-gradient-to-br ${course.bg} border ${course.border} ${course.hoverBorder} p-5 transition-all duration-300 hover:-translate-y-2 ${course.hoverGlow} overflow-hidden`}
              >
                {/* Gradient top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${course.topAccent} opacity-70 group-hover:opacity-100 transition-opacity`} />

                {/* Glow overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${course.from} ${course.to} opacity-0 group-hover:opacity-[0.04] transition-opacity rounded-2xl`} />

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.from} ${course.to} flex items-center justify-center text-2xl shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                    {course.icon}
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${course.badgeBg}`}>
                      {course.badge}
                    </span>
                    {course.hasVideo && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-pink-900/50 text-pink-300 border border-pink-700/40">
                        🎬 Video
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-black text-xl text-white mb-0.5">{course.title}</h3>
                <p className={`text-xs font-semibold ${course.text} mb-3`}>{course.subtitle}</p>
                <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1">{course.desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {course.tags.map(t => (
                    <span key={t} className={`text-[11px] px-2 py-0.5 rounded-md bg-white/5 ${course.text} border border-white/8`}>{t}</span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4 pt-3 border-t border-white/6">
                  <span className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${course.dot}`} />
                    {lessons} bài
                  </span>
                  <span>{exercises} bài tập</span>
                  {videos > 0 && <span className="text-pink-400 font-medium">▶ {videos} video</span>}
                </div>

                {/* CTA */}
                <div className={`flex items-center justify-between text-sm font-bold ${course.text} group-hover:gap-2 transition-all`}>
                  <span>Bắt đầu học</span>
                  <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="border-t border-gray-800/50 bg-gradient-to-b from-gray-900/40 to-transparent">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-[0.2em]">Tính năng</span>
            <h2 className="text-3xl font-black text-white mt-2 mb-2">Tại sao chọn DevLearn?</h2>
            <p className="text-gray-500 text-sm">Được xây dựng dành riêng cho lập trình viên Việt Nam</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: "⚡", title: "Chạy code ngay",
                desc: "Monaco Editor tích hợp — không cần cài đặt, viết và chạy ngay trên web.",
                iconBg: "bg-gradient-to-br from-yellow-500/20 to-orange-500/10 border border-yellow-500/20",
                border: "border-yellow-800/20 hover:border-yellow-600/30",
                color: "text-yellow-400",
              },
              {
                icon: "🤖", title: "AI trợ lý 24/7",
                desc: "Chat với AI trong từng bài học — hỏi về code, khái niệm, lỗi bất cứ lúc nào.",
                iconBg: "bg-gradient-to-br from-blue-500/20 to-indigo-500/10 border border-blue-500/20",
                border: "border-blue-800/20 hover:border-blue-600/30",
                color: "text-blue-400",
              },
              {
                icon: "📊", title: "Theo dõi tiến độ",
                desc: "Lưu trạng thái học, streak liên tiếp, lịch hoạt động và thống kê chi tiết.",
                iconBg: "bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/20",
                border: "border-green-800/20 hover:border-green-600/30",
                color: "text-green-400",
              },
              {
                icon: "🎬", title: "Video vietsub",
                desc: "Khóa NestJS có video bài giảng với phụ đề tiếng Việt / tiếng Anh chuyển đổi linh hoạt.",
                iconBg: "bg-gradient-to-br from-pink-500/20 to-rose-500/10 border border-pink-500/20",
                border: "border-pink-800/20 hover:border-pink-600/30",
                color: "text-pink-400",
              },
            ].map(f => (
              <div key={f.title} className={`glass rounded-2xl p-5 border ${f.border} hover:-translate-y-1 transition-all duration-200`}>
                <div className={`w-12 h-12 rounded-2xl mb-4 flex items-center justify-center text-2xl ${f.iconBg}`}>
                  {f.icon}
                </div>
                <h3 className={`font-bold text-white text-sm mb-2`}>{f.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative border-t border-gray-800/40">
        {/* Gradient top line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-600/40 to-transparent" />
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-lg shadow-lg">
                🎓
              </div>
              <div>
                <div className="font-black text-white text-sm">DevLearn</div>
                <div className="text-xs text-gray-600">Học lập trình Fullstack miễn phí</div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-gray-600">
              {COURSES.map(c => (
                <Link key={c.href} href={c.href}
                  className={`hover:${c.text} transition-colors flex items-center gap-1.5`}>
                  <span>{c.icon}</span>{c.title}
                </Link>
              ))}
            </div>
            <div className="flex flex-col items-end gap-1">
              <p className="text-xs text-gray-600">
                Code · <span className="text-gray-500">Piston API</span> · AI · <span className="text-gray-500">Groq</span>
              </p>
              <Link href="/schedule" className="text-xs text-gray-600 hover:text-cyan-400 transition-colors flex items-center gap-1">
                <span>🗺️</span> Lộ trình học
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
