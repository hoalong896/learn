"use client";

import { useState, useEffect } from "react";

const KEY = "devlearn_progress";

interface ProgressStore {
  completed:   Record<string, boolean>;
  lastVisited: Record<string, string>;
  completedAt: Record<string, string>;
  studyDates:  string[];
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

export function calcStreak(dates: string[]): number {
  if (!dates.length) return 0;
  const set = new Set(dates);
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 864e5).toISOString().split("T")[0];

  // Start from today, else yesterday (grace period)
  let start = set.has(today) ? today : set.has(yesterday) ? yesterday : null;
  if (!start) return 0;

  let streak = 0;
  let cur = new Date(start + "T12:00:00Z");
  while (true) {
    const iso = cur.toISOString().split("T")[0];
    if (!set.has(iso)) break;
    streak++;
    cur = new Date(cur.getTime() - 864e5);
  }
  return streak;
}

export function useAllProgress() {
  const [store, setStore] = useState<ProgressStore>({
    completed: {}, lastVisited: {}, completedAt: {}, studyDates: [],
  });

  useEffect(() => { setStore(load()); }, []);

  const getCount = (course: string, ids: string[]) =>
    ids.filter(id => store.completed[`${course}/${id}`]).length;

  const isDone = (course: string, id: string) =>
    !!store.completed[`${course}/${id}`];

  const lastVisited = (course: string) => store.lastVisited[course];

  const getCompletedAt = (course: string, id: string) =>
    store.completedAt[`${course}/${id}`] ?? null;

  const totalDone = Object.values(store.completed).filter(Boolean).length;

  const studyDates = store.studyDates;

  const streak = calcStreak(studyDates);

  const firstDate = studyDates.length
    ? studyDates.slice().sort()[0]
    : null;

  // avg lessons per active day
  const avgPerDay = studyDates.length > 0
    ? +(totalDone / studyDates.length).toFixed(1)
    : 0;

  // lessons completed per calendar day (for heat map)
  const completedByDate: Record<string, number> = {};
  Object.values(store.completedAt).forEach(dt => {
    if (dt) {
      const day = dt.split("T")[0];
      completedByDate[day] = (completedByDate[day] ?? 0) + 1;
    }
  });

  return {
    getCount, isDone, lastVisited, getCompletedAt,
    totalDone, studyDates, streak, firstDate, avgPerDay,
    completedByDate,
  };
}
