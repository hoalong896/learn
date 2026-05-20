"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { UserAvatarButton, UserProfileModal } from "./UserProfile";

const courses = [
  { path: "/typescript", label: "TypeScript", icon: "🔷", color: "hover:text-blue-400 data-[active]:text-blue-400" },
  { path: "/java",       label: "Java",       icon: "☕", color: "hover:text-orange-400 data-[active]:text-orange-400" },
  { path: "/nodejs",     label: "Node.js",    icon: "🟢", color: "hover:text-green-400 data-[active]:text-green-400" },
  { path: "/nextjs",     label: "Next.js",    icon: "▲", color: "hover:text-purple-400 data-[active]:text-purple-400" },
  { path: "/nestjs",     label: "NestJS",     icon: "🐈", color: "hover:text-pink-400 data-[active]:text-pink-400" },
  { path: "/docker",     label: "Docker",     icon: "🐳", color: "hover:text-teal-400 data-[active]:text-teal-400" },
  { path: "/kids",       label: "Kids",       icon: "🧒", color: "hover:text-yellow-400 data-[active]:text-yellow-400" },
  { path: "/english",    label: "English",    icon: "🇬🇧", color: "hover:text-sky-400 data-[active]:text-sky-400" },
  { path: "/chinese",    label: "Chinese",    icon: "🇨🇳", color: "hover:text-red-400 data-[active]:text-red-400" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);

  // Don't show navbar inside lesson pages (they have a sidebar)
  const isLessonPage = courses.some(c => pathname.startsWith(c.path + "/"));
  if (isLessonPage) return null;

  return (
    <>
      <nav className="sticky top-0 z-40 bg-gray-950/90 backdrop-blur-md border-b border-gray-800/50 shadow-[0_1px_0_rgba(255,255,255,0.03)]">
        <div className="max-w-5xl mx-auto px-4 h-12 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-sm hover:text-gray-300 transition-colors shrink-0">
            <span className="text-base">🎓</span>
            <span>DevLearn</span>
          </Link>

          <div className="flex items-center gap-1">
            {courses.map(course => {
              const isActive = pathname === course.path || pathname.startsWith(course.path + "/");
              return (
                <Link
                  key={course.path}
                  href={course.path}
                  data-active={isActive ? "" : undefined}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? course.color.replace("hover:", "").replace(" data-[active]:text", " text")
                      : "text-gray-400 " + course.color.split(" ")[0]
                  } ${isActive ? "bg-gray-800/80" : "hover:bg-gray-800/50"}`}
                >
                  <span className="text-base leading-none">{course.icon}</span>
                  <span className="hidden sm:inline">{course.label}</span>
                </Link>
              );
            })}

            {/* Divider */}
            <div className="w-px h-5 bg-gray-700/60 mx-1" />

            {/* Schedule link */}
            <Link
              href="/schedule"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/schedule"
                  ? "text-cyan-400 bg-gray-800/80"
                  : "text-gray-400 hover:text-cyan-400 hover:bg-gray-800/50"
              }`}
            >
              <span className="text-base leading-none">🗺️</span>
              <span className="hidden md:inline">Lộ trình</span>
            </Link>

            {/* Divider */}
            <div className="w-px h-5 bg-gray-700/60 mx-1" />

            {/* User profile */}
            <UserAvatarButton onClick={() => setProfileOpen(true)} />
          </div>
        </div>
      </nav>

      <UserProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
}
