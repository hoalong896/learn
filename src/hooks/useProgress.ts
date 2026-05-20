"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { getSessionId } from "@/lib/session";

const KEY = "devlearn_progress";

interface ProgressStore {
  completed:   Record<string, boolean>;
  lastVisited: Record<string, string>;
  completedAt: Record<string, string>;
  studyDates:  string[];
}

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

function load(): ProgressStore {
  if (typeof window === "undefined")
    return { completed: {}, lastVisited: {}, completedAt: {}, studyDates: [] };
  try {
    const p = JSON.parse(localStorage.getItem(KEY) ?? "{}");
    return {
      completed:   p.completed   ?? {},
      lastVisited: p.lastVisited ?? {},
      completedAt: p.completedAt ?? {},
      studyDates:  p.studyDates  ?? [],
    };
  } catch {
    return { completed: {}, lastVisited: {}, completedAt: {}, studyDates: [] };
  }
}

function save(store: ProgressStore) {
  localStorage.setItem(KEY, JSON.stringify(store));
}

function addToday(dates: string[]): string[] {
  const t = todayISO();
  return dates.includes(t) ? dates : [...dates, t];
}

// Fire-and-forget — never blocks the UI
async function syncComplete(course: string, lessonId: string, completedAt: string) {
  const session_id = getSessionId();
  await Promise.all([
    supabase.from("user_progress").upsert(
      { session_id, course, lesson_id: lessonId, completed: true, completed_at: completedAt },
      { onConflict: "session_id,course,lesson_id" }
    ),
    supabase.from("study_dates").upsert(
      { session_id, study_date: todayISO() },
      { onConflict: "session_id,study_date" }
    ),
  ]);
}

async function syncVisit(course: string, lessonId: string) {
  const session_id = getSessionId();
  await supabase.from("study_dates").upsert(
    { session_id, study_date: todayISO() },
    { onConflict: "session_id,study_date" }
  );
  await supabase.from("user_progress").upsert(
    { session_id, course, lesson_id: lessonId, last_visited_at: new Date().toISOString() },
    { onConflict: "session_id,course,lesson_id" }
  );
}

export function useProgress(course: string) {
  const [store, setStore] = useState<ProgressStore>({
    completed: {}, lastVisited: {}, completedAt: {}, studyDates: [],
  });

  useEffect(() => { setStore(load()); }, []);

  const markComplete = useCallback((lessonId: string) => {
    const now = new Date().toISOString();
    setStore(prev => {
      const key = `${course}/${lessonId}`;
      const next: ProgressStore = {
        ...prev,
        completed:   { ...prev.completed,   [key]: true },
        completedAt: { ...prev.completedAt, [key]: now },
        studyDates:  addToday(prev.studyDates),
      };
      save(next);
      return next;
    });
    // Sync to Supabase in background
    syncComplete(course, lessonId, now).catch(() => {});
  }, [course]);

  const markVisited = useCallback((lessonId: string) => {
    setStore(prev => {
      const next: ProgressStore = {
        ...prev,
        lastVisited: { ...prev.lastVisited, [course]: lessonId },
        studyDates:  addToday(prev.studyDates),
      };
      save(next);
      return next;
    });
    // Sync visit in background
    syncVisit(course, lessonId).catch(() => {});
  }, [course]);

  const isCompleted = useCallback(
    (lessonId: string) => !!store.completed[`${course}/${lessonId}`],
    [store, course]
  );

  const completedCount = useCallback(
    (lessonIds: string[]) => lessonIds.filter(id => store.completed[`${course}/${id}`]).length,
    [store, course]
  );

  return {
    markComplete, markVisited, isCompleted, completedCount,
    lastVisited: store.lastVisited[course],
  };
}
