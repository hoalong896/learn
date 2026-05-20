"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { getSessionId } from "@/lib/session";

const LOCAL_KEY = "devlearn_user";

export interface UserProfile {
  username: string;
  avatar: string;
  bio: string;
}

const DEFAULT: UserProfile = { username: "", avatar: "🧑‍💻", bio: "" };

function loadLocal(): UserProfile {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const p = JSON.parse(localStorage.getItem(LOCAL_KEY) ?? "{}");
    return {
      username: p.username ?? "",
      avatar:   p.avatar   ?? "🧑‍💻",
      bio:      p.bio      ?? "",
    };
  } catch { return DEFAULT; }
}

function saveLocal(p: UserProfile) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(p));
}

async function fetchFromSupabase(): Promise<UserProfile | null> {
  const { data } = await supabase
    .from("users")
    .select("username, avatar, bio")
    .eq("session_id", getSessionId())
    .maybeSingle();
  if (!data) return null;
  return { username: data.username ?? "", avatar: data.avatar, bio: data.bio };
}

async function upsertToSupabase(profile: UserProfile) {
  await supabase.from("users").upsert(
    {
      session_id: getSessionId(),
      username:   profile.username || null,
      avatar:     profile.avatar,
      bio:        profile.bio,
    },
    { onConflict: "session_id" }
  );
}

export function useUser() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT);
  const [loaded,  setLoaded]  = useState(false);

  useEffect(() => {
    const local = loadLocal();
    setProfile(local);
    // Merge with Supabase (remote wins on username)
    fetchFromSupabase().then(remote => {
      if (remote) {
        const merged = { ...local, ...remote };
        setProfile(merged);
        saveLocal(merged);
      }
      setLoaded(true);
    }).catch(() => setLoaded(true));
  }, []);

  const saveProfile = useCallback(async (next: UserProfile) => {
    setProfile(next);
    saveLocal(next);
    await upsertToSupabase(next).catch(() => {});
  }, []);

  const hasProfile = profile.username.trim().length > 0;

  return { profile, saveProfile, hasProfile, loaded };
}
