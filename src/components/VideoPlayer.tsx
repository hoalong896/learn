"use client";

import { useState, useRef, useEffect } from "react";
import type { VideoItem } from "@/data/typescript-lessons";

interface VideoPlayerProps {
  videos: VideoItem[];
  courseColor?: "blue" | "orange" | "green" | "purple" | "pink";
}

function getSubtitlePath(videoFile: string, lang: "vi" | "en"): string {
  // e.g. "01. Intro/01. Welcome.mp4" → "01. Intro/01. Welcome_vi.srt"
  const withoutExt = videoFile.replace(/\.mp4$/i, "");
  return `${withoutExt}_${lang}.srt`;
}

export default function VideoPlayer({ videos, courseColor = "pink" }: VideoPlayerProps) {
  const [current, setCurrent] = useState(0);
  const [subtitle, setSubtitle] = useState<"vi" | "en" | "none">("vi");
  const [showList, setShowList] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const accentBg =
    courseColor === "blue"   ? "bg-blue-600"
    : courseColor === "orange" ? "bg-orange-600"
    : courseColor === "green"  ? "bg-green-600"
    : courseColor === "purple" ? "bg-purple-600"
    : "bg-pink-600";

  const accentText =
    courseColor === "blue"   ? "text-blue-400"
    : courseColor === "orange" ? "text-orange-400"
    : courseColor === "green"  ? "text-green-400"
    : courseColor === "purple" ? "text-purple-400"
    : "text-pink-400";

  const accentBorder =
    courseColor === "blue"   ? "border-blue-500"
    : courseColor === "orange" ? "border-orange-500"
    : courseColor === "green"  ? "border-green-500"
    : courseColor === "purple" ? "border-purple-500"
    : "border-pink-500";

  const video = videos[current];
  const videoSrc = `/api/video?f=${encodeURIComponent(video.file)}`;
  const subViSrc = `/api/subtitle?f=${encodeURIComponent(getSubtitlePath(video.file, "vi"))}`;
  const subEnSrc = `/api/subtitle?f=${encodeURIComponent(getSubtitlePath(video.file, "en"))}`;

  // Reload video when switching
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [current]);

  function goTo(index: number) {
    setCurrent(index);
  }

  function handleEnded() {
    if (current < videos.length - 1) {
      setCurrent(i => i + 1);
    }
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-700/60 bg-gray-900">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-800/80 border-b border-gray-700/60">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-bold ${accentText}`}>🎬 Video bài giảng</span>
          <span className="text-xs text-gray-500">{current + 1}/{videos.length}</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Subtitle selector */}
          <div className="flex items-center gap-1 bg-gray-700/60 rounded-lg p-0.5">
            {(["vi", "en", "none"] as const).map(lang => (
              <button
                key={lang}
                onClick={() => setSubtitle(lang)}
                className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                  subtitle === lang
                    ? `${accentBg} text-white`
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {lang === "vi" ? "🇻🇳 VI" : lang === "en" ? "🇬🇧 EN" : "Tắt"}
              </button>
            ))}
          </div>
          {/* Toggle playlist */}
          <button
            onClick={() => setShowList(v => !v)}
            className={`text-xs px-2 py-1.5 rounded-lg transition-colors ${
              showList ? `${accentBg} text-white` : "bg-gray-700/60 text-gray-400 hover:text-gray-200"
            }`}
          >
            ☰
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Video */}
        <div className="flex-1 min-w-0 bg-black">
          <video
            ref={videoRef}
            key={videoSrc}
            controls
            className="w-full aspect-video"
            onEnded={handleEnded}
            crossOrigin="anonymous"
          >
            <source src={videoSrc} type="video/mp4" />
            {subtitle !== "none" && (
              <track
                key={`${video.file}-${subtitle}`}
                kind="subtitles"
                label={subtitle === "vi" ? "Tiếng Việt" : "English"}
                srcLang={subtitle}
                src={subtitle === "vi" ? subViSrc : subEnSrc}
                default
              />
            )}
          </video>
          {/* Current title */}
          <div className="px-4 py-2.5 bg-gray-850 border-t border-gray-700/40">
            <p className={`text-sm font-medium ${accentText} truncate`}>{video.title}</p>
          </div>
        </div>

        {/* Playlist */}
        {showList && (
          <div className="w-72 shrink-0 border-l border-gray-700/60 overflow-y-auto max-h-[420px]">
            {videos.map((v, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-full text-left flex items-start gap-2.5 px-3 py-2.5 border-b border-gray-800/60 transition-colors ${
                  i === current
                    ? `bg-gray-800 border-l-2 ${accentBorder}`
                    : "hover:bg-gray-800/50 text-gray-400"
                }`}
              >
                <span className={`shrink-0 w-5 h-5 rounded-full text-[10px] flex items-center justify-center mt-0.5 font-bold ${
                  i === current ? `${accentBg} text-white` : "bg-gray-700 text-gray-400"
                }`}>
                  {i === current ? "▶" : i + 1}
                </span>
                <span className={`text-xs leading-relaxed ${i === current ? "text-white font-medium" : ""}`}>
                  {v.title}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
