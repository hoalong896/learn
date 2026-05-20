"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { UserAvatarButton, UserProfileModal } from "./UserProfile";

const DEV_COURSES = [
  { path: "/typescript", label: "TypeScript", icon: "🔷", accent: "text-blue-400",   dot: "bg-blue-500",   desc: "JavaScript + kiểu" },
  { path: "/java",       label: "Java",       icon: "☕",  accent: "text-orange-400", dot: "bg-orange-500", desc: "OOP & Enterprise" },
  { path: "/nodejs",     label: "Node.js",    icon: "🟢", accent: "text-green-400",  dot: "bg-green-500",  desc: "Backend JS" },
  { path: "/nextjs",     label: "Next.js",    icon: "▲",  accent: "text-purple-400", dot: "bg-purple-500", desc: "React Fullstack" },
  { path: "/nestjs",     label: "NestJS",     icon: "🐈", accent: "text-pink-400",   dot: "bg-pink-500",   desc: "Enterprise API" },
  { path: "/docker",     label: "Docker",     icon: "🐳", accent: "text-teal-400",   dot: "bg-teal-500",   desc: "Container & DevOps" },
];

const EXTRA_COURSES = [
  { path: "/kids",    label: "Kids Code",     icon: "🧒", accent: "text-yellow-400", dot: "bg-yellow-500", desc: "Lập trình cho trẻ" },
  { path: "/english", label: "English",       icon: "🇬🇧", accent: "text-sky-400",    dot: "bg-sky-500",    desc: "Tiếng Anh giao tiếp" },
  { path: "/chinese", label: "Chinese",       icon: "🇨🇳", accent: "text-red-400",    dot: "bg-red-500",    desc: "Tiếng Trung HSK" },
];

const ALL_COURSES = [...DEV_COURSES, ...EXTRA_COURSES];

export default function Navbar() {
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const isLessonPage = ALL_COURSES.some(c => pathname.startsWith(c.path + "/"));
  const activeCourse = ALL_COURSES.find(c => pathname === c.path || pathname.startsWith(c.path + "/"));

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  if (isLessonPage) return null;

  return (
    <>
      <nav className="sticky top-0 z-40 bg-gray-950/80 backdrop-blur-2xl border-b border-white/[0.05] shadow-[0_1px_40px_rgba(0,0,0,0.5)]">
        {/* Ultra-thin gradient top line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[15px] shadow-lg shadow-indigo-600/30 transition-all group-hover:shadow-indigo-500/50 group-hover:scale-105">
                🎓
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 blur-md opacity-0 group-hover:opacity-40 transition-opacity -z-10" />
            </div>
            <div>
              <span className="font-black text-white text-[15px] tracking-tight">DevLearn</span>
            </div>
          </Link>

          {/* ── Right side ── */}
          <div className="flex items-center gap-1.5">

            {/* Courses dropdown */}
            <div className="relative" ref={dropRef}>
              <button
                onClick={() => setDropOpen(v => !v)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeCourse
                    ? "text-white bg-white/10 shadow-inner"
                    : "text-gray-300 hover:text-white hover:bg-white/8"
                }`}
              >
                {activeCourse ? (
                  <>
                    <span className="text-base leading-none">{activeCourse.icon}</span>
                    <span className={activeCourse.accent}>{activeCourse.label}</span>
                  </>
                ) : (
                  <span>Khóa học</span>
                )}
                <svg
                  className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24"
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Dropdown panel */}
              {dropOpen && (
                <div className="absolute top-[calc(100%+8px)] right-0 w-[460px] origin-top-right">
                  {/* Arrow tip */}
                  <div className="absolute -top-[5px] right-[52px] w-[10px] h-[10px] rotate-45 bg-gray-900 border-l border-t border-gray-700/60 z-10" />

                  <div className="bg-gray-900/96 backdrop-blur-2xl border border-gray-700/50 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden">
                    {/* Dev section */}
                    <div className="p-3 pb-2">
                      <div className="flex items-center gap-2 px-2 mb-2">
                        <div className="h-px flex-1 bg-gray-800" />
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.18em]">💻 Lập trình</span>
                        <div className="h-px flex-1 bg-gray-800" />
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        {DEV_COURSES.map(c => {
                          const isActive = pathname === c.path || pathname.startsWith(c.path + "/");
                          return (
                            <Link
                              key={c.path}
                              href={c.path}
                              onClick={() => setDropOpen(false)}
                              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all group/item ${
                                isActive
                                  ? `bg-white/8 ${c.accent}`
                                  : "text-gray-300 hover:bg-white/6 hover:text-white"
                              }`}
                            >
                              <span className="text-[17px] leading-none shrink-0">{c.icon}</span>
                              <div className="min-w-0">
                                <div className={`text-[13px] font-semibold leading-tight ${isActive ? "" : "group-hover/item:text-white"}`}>
                                  {c.label}
                                </div>
                                <div className="text-[10px] text-gray-600 leading-none mt-0.5 truncate">{c.desc}</div>
                              </div>
                              {isActive && <div className={`ml-auto w-1.5 h-1.5 rounded-full ${c.dot} shrink-0`} />}
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="mx-3 border-t border-gray-800/80" />

                    {/* Extra section */}
                    <div className="p-3 pt-2">
                      <div className="flex items-center gap-2 px-2 mb-2">
                        <div className="h-px flex-1 bg-gray-800" />
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.18em]">🌍 Ngôn ngữ & Kỹ năng</span>
                        <div className="h-px flex-1 bg-gray-800" />
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        {EXTRA_COURSES.map(c => {
                          const isActive = pathname === c.path || pathname.startsWith(c.path + "/");
                          return (
                            <Link
                              key={c.path}
                              href={c.path}
                              onClick={() => setDropOpen(false)}
                              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all group/item ${
                                isActive
                                  ? `bg-white/8 ${c.accent}`
                                  : "text-gray-300 hover:bg-white/6 hover:text-white"
                              }`}
                            >
                              <span className="text-[17px] leading-none shrink-0">{c.icon}</span>
                              <div className="min-w-0">
                                <div className={`text-[13px] font-semibold leading-tight ${isActive ? "" : "group-hover/item:text-white"}`}>
                                  {c.label}
                                </div>
                                <div className="text-[10px] text-gray-600 leading-none mt-0.5 truncate">{c.desc}</div>
                              </div>
                              {isActive && <div className={`ml-auto w-1.5 h-1.5 rounded-full ${c.dot} shrink-0`} />}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* AI Chat */}
            <Link
              href="/chat"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                pathname === "/chat"
                  ? "text-indigo-400 bg-white/8"
                  : "text-gray-400 hover:text-white hover:bg-white/8"
              }`}
            >
              <span className="text-base leading-none">🤖</span>
              <span className="hidden sm:inline">AI Chat</span>
            </Link>

            {/* Lộ trình */}
            <Link
              href="/schedule"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                pathname === "/schedule"
                  ? "text-cyan-400 bg-white/8"
                  : "text-gray-400 hover:text-white hover:bg-white/8"
              }`}
            >
              <span className="text-base leading-none">🗺️</span>
              <span className="hidden sm:inline">Lộ trình</span>
            </Link>

            {/* Divider */}
            <div className="w-px h-5 bg-white/10 mx-0.5" />

            {/* User */}
            <UserAvatarButton onClick={() => setProfileOpen(true)} />
          </div>
        </div>
      </nav>

      <UserProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
}
