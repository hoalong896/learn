"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { useAllProgress } from "@/hooks/useAllProgress";

const AVATARS = [
  "🧑‍💻","👨‍💻","👩‍💻","🧑‍🎓","👨‍🎓","👩‍🎓","🦊","🐼","🐨","🦁","🐯","🐸",
  "🤖","👾","🎮","🚀","⚡","🔥","💎","🌟","🎯","🧠","💡","🦄",
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export function UserProfileModal({ open, onClose }: Props) {
  const { profile, saveProfile } = useUser();
  const { totalDone, streak } = useAllProgress();
  const [username, setUsername] = useState(profile.username);
  const [avatar,   setAvatar]   = useState(profile.avatar);
  const [bio,      setBio]      = useState(profile.bio);
  const [saving,   setSaving]   = useState(false);
  const [saved,    setSaved]    = useState(false);

  useEffect(() => {
    if (open) {
      setUsername(profile.username);
      setAvatar(profile.avatar);
      setBio(profile.bio);
      setSaved(false);
    }
  }, [open, profile]);

  if (!open) return null;

  async function handleSave() {
    const name = username.trim();
    if (!name) return;
    setSaving(true);
    await saveProfile({ username: name, avatar, bio: bio.trim() });
    setSaving(false);
    setSaved(true);
    setTimeout(onClose, 800);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full max-w-md bg-gray-900 border border-gray-700/60 rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Top accent */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

        <div className="px-6 py-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-black text-white">Hồ sơ của bạn</h2>
            <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center text-gray-500 hover:text-white hover:bg-gray-800 transition-all">✕</button>
          </div>

          {/* Current stats */}
          <div className="flex gap-3 mb-5">
            <div className="flex-1 bg-gray-800/60 rounded-xl p-3 text-center border border-gray-700/40">
              <div className="text-xl font-black text-blue-400">{totalDone}</div>
              <div className="text-[10px] text-gray-500 mt-0.5">bài hoàn thành</div>
            </div>
            <div className="flex-1 bg-gray-800/60 rounded-xl p-3 text-center border border-gray-700/40">
              <div className="text-xl font-black text-orange-400">{streak}</div>
              <div className="text-[10px] text-gray-500 mt-0.5">ngày streak 🔥</div>
            </div>
          </div>

          {/* Avatar picker */}
          <div className="mb-4">
            <label className="text-xs text-gray-400 font-medium mb-2 block">Chọn avatar</label>
            <div className="grid grid-cols-8 gap-1.5">
              {AVATARS.map(em => (
                <button
                  key={em}
                  onClick={() => setAvatar(em)}
                  className={`w-9 h-9 rounded-xl text-xl flex items-center justify-center transition-all hover:scale-110 ${
                    avatar === em
                      ? "bg-blue-600/40 border-2 border-blue-500 scale-110 shadow-lg shadow-blue-500/30"
                      : "bg-gray-800/60 border border-gray-700/40 hover:bg-gray-700/60"
                  }`}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>

          {/* Username */}
          <div className="mb-3">
            <label className="text-xs text-gray-400 font-medium mb-1.5 block">
              Tên hiển thị <span className="text-red-400">*</span>
            </label>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSave()}
              maxLength={30}
              placeholder="Nhập tên của bạn..."
              className="w-full bg-gray-800/80 border border-gray-700/60 focus:border-blue-500/70 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none placeholder-gray-600 transition-colors"
            />
          </div>

          {/* Bio */}
          <div className="mb-5">
            <label className="text-xs text-gray-400 font-medium mb-1.5 block">Giới thiệu bản thân</label>
            <input
              value={bio}
              onChange={e => setBio(e.target.value)}
              maxLength={80}
              placeholder="VD: Dev yêu thích TypeScript..."
              className="w-full bg-gray-800/80 border border-gray-700/60 focus:border-blue-500/70 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none placeholder-gray-600 transition-colors"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={!username.trim() || saving}
            className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all ${
              saved
                ? "bg-green-600 text-white"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/25 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            {saved ? "✓ Đã lưu!" : saving ? "Đang lưu..." : "Lưu hồ sơ"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Compact button for navbar
export function UserAvatarButton({ onClick }: { onClick: () => void }) {
  const { profile, hasProfile, loaded } = useUser();
  if (!loaded) return null;

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all hover:bg-gray-800/50 ${
        hasProfile ? "text-white" : "text-gray-500 hover:text-gray-300"
      }`}
      title={hasProfile ? profile.username : "Thiết lập hồ sơ"}
    >
      <span className="text-base leading-none">{profile.avatar}</span>
      {hasProfile && (
        <span className="hidden lg:inline text-sm font-medium max-w-[100px] truncate">{profile.username}</span>
      )}
      {!hasProfile && (
        <span className="hidden lg:inline text-xs text-gray-500">Đặt tên</span>
      )}
    </button>
  );
}
