import { resources, subjects, getResourcesForSubject, getResourcesForUnit } from '@/data/resources';
import type { UnifiedResource } from '@/context/DataContext';

const COMPLETED_KEY = 'ece-hub:completed';
const BOOKMARK_KEY = 'ece-hub:bookmarks';
const ACTIVITY_KEY = 'ece-hub:activity';
const STREAK_KEY = 'ece-hub:streak';

export interface ActivityEntry {
  resourceId: string;
  timestamp: number;
}

export interface StreakData {
  count: number;
  lastDate: string;
}

function safeParse<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function safeWrite<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string): number {
  const ms = Date.parse(b) - Date.parse(a);
  return Math.round(ms / 86_400_000);
}

/* ── Completed ── */

export function getCompletedResources(): string[] {
  return safeParse<string[]>(COMPLETED_KEY, []);
}

export function isResourceCompleted(resourceId: string): boolean {
  return getCompletedResources().includes(resourceId);
}

export function markResourceComplete(resourceId: string): void {
  const current = getCompletedResources();
  if (current.includes(resourceId)) return;
  safeWrite(COMPLETED_KEY, [...current, resourceId]);
  addActivity(resourceId);
  updateStreak();
}

export function markResourceIncomplete(resourceId: string): void {
  const current = getCompletedResources();
  safeWrite(
    COMPLETED_KEY,
    current.filter((id) => id !== resourceId)
  );
  removeActivity(resourceId);
}

export function toggleResource(resourceId: string): boolean {
  if (isResourceCompleted(resourceId)) {
    markResourceIncomplete(resourceId);
    return false;
  }
  markResourceComplete(resourceId);
  return true;
}

/* ── Bookmarks ── */

export function getBookmarks(): string[] {
  return safeParse<string[]>(BOOKMARK_KEY, []);
}

export function isBookmarked(resourceId: string): boolean {
  return getBookmarks().includes(resourceId);
}

export function addBookmark(resourceId: string): void {
  const current = getBookmarks();
  if (current.includes(resourceId)) return;
  safeWrite(BOOKMARK_KEY, [...current, resourceId]);
}

export function removeBookmark(resourceId: string): void {
  const current = getBookmarks();
  safeWrite(
    BOOKMARK_KEY,
    current.filter((id) => id !== resourceId)
  );
}

export function toggleBookmark(resourceId: string): boolean {
  if (isBookmarked(resourceId)) {
    removeBookmark(resourceId);
    return false;
  }
  addBookmark(resourceId);
  return true;
}

/* ── Activity ── */

export function getRecentActivity(limit = 10): ActivityEntry[] {
  return safeParse<ActivityEntry[]>(ACTIVITY_KEY, [])
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, limit);
}

function addActivity(resourceId: string): void {
  const current = safeParse<ActivityEntry[]>(ACTIVITY_KEY, []);
  const filtered = current.filter((a) => a.resourceId !== resourceId);
  filtered.push({ resourceId, timestamp: Date.now() });
  safeWrite(ACTIVITY_KEY, filtered);
}

function removeActivity(resourceId: string): void {
  const current = safeParse<ActivityEntry[]>(ACTIVITY_KEY, []);
  safeWrite(
    ACTIVITY_KEY,
    current.filter((a) => a.resourceId !== resourceId)
  );
}

/* ── Streak ── */

export function getStreak(): StreakData {
  return safeParse<StreakData>(STREAK_KEY, { count: 0, lastDate: '' });
}

function updateStreak(): void {
  const streak = getStreak();
  const today = todayStr();
  if (streak.lastDate === today) return;
  if (streak.lastDate && daysBetween(streak.lastDate, today) === 1) {
    safeWrite(STREAK_KEY, { count: streak.count + 1, lastDate: today });
  } else {
    safeWrite(STREAK_KEY, { count: 1, lastDate: today });
  }
}

/* ── Progress calculations ── */

export interface ProgressInfo {
  completed: number;
  total: number;
  percent: number;
  hasResources: boolean;
}

function calcProgress(completed: number, total: number): ProgressInfo {
  if (total === 0) {
    return { completed: 0, total: 0, percent: 0, hasResources: false };
  }
  return {
    completed,
    total,
    percent: Math.round((completed / total) * 100),
    hasResources: true,
  };
}

export function getSubjectProgress(subjectSlug: string): ProgressInfo {
  const subjectResources = getResourcesForSubject(subjectSlug);
  const completedSet = new Set(getCompletedResources());
  const completed = subjectResources.filter((r) => completedSet.has(r.id)).length;
  return calcProgress(completed, subjectResources.length);
}

export function getSubjectProgressFromResources(subjectSlug: string, allResources: UnifiedResource[]): ProgressInfo {
  const subjectResources = allResources.filter((r) => r.subjectSlug === subjectSlug);
  const completedSet = new Set(getCompletedResources());
  const completed = subjectResources.filter((r) => completedSet.has(r.id)).length;
  return calcProgress(completed, subjectResources.length);
}

export function getUnitProgress(subjectSlug: string, unitId: string): ProgressInfo {
  const unitResources = getResourcesForUnit(subjectSlug, unitId);
  const completedSet = new Set(getCompletedResources());
  const completed = unitResources.filter((r) => completedSet.has(r.id)).length;
  return calcProgress(completed, unitResources.length);
}

export function getUnitProgressFromResources(subjectSlug: string, unitId: string, allResources: UnifiedResource[]): ProgressInfo {
  const unitResources = allResources.filter((r) => r.subjectSlug === subjectSlug && r.unitId === unitId);
  const completedSet = new Set(getCompletedResources());
  const completed = unitResources.filter((r) => completedSet.has(r.id)).length;
  return calcProgress(completed, unitResources.length);
}

export function getOverallProgress(): ProgressInfo {
  const completedSet = new Set(getCompletedResources());
  const completed = resources.filter((r) => completedSet.has(r.id)).length;
  return calcProgress(completed, resources.length);
}

export function getOverallProgressFromResources(allResources: UnifiedResource[]): ProgressInfo {
  const completedSet = new Set(getCompletedResources());
  const completed = allResources.filter((r) => completedSet.has(r.id)).length;
  return calcProgress(completed, allResources.length);
}

export function getSubjectsStarted(): { started: number; total: number } {
  const completedSet = new Set(getCompletedResources());
  const started = subjects.filter((subject) =>
    getResourcesForSubject(subject.slug).some((r) => completedSet.has(r.id))
  ).length;
  return { started, total: subjects.length };
}

export function getSubjectsStartedFromResources(allResources: UnifiedResource[]): { started: number; total: number } {
  const completedSet = new Set(getCompletedResources());
  const subjectSlugs = new Set(allResources.map((r) => r.subjectSlug));
  const started = subjects.filter((subject) =>
    allResources.some((r) => r.subjectSlug === subject.slug && completedSet.has(r.id))
  ).length;
  const total = subjects.length + [...subjectSlugs].filter((s) => !subjects.find((sub) => sub.slug === s)).length;
  return { started, total };
}

/* ── Continue Learning ── */

export function getContinueLearning(limit = 5): string[] {
  const completedSet = new Set(getCompletedResources());
  return getBookmarks().filter((id) => !completedSet.has(id)).slice(0, limit);
}

/* ── Motivation ── */

export function getMotivationMessage(percent: number): string {
  if (percent === 0) return "Let's get started 🚀";
  if (percent < 25) return 'Good start. Keep going!';
  if (percent < 50) return "You're building momentum.";
  if (percent < 75) return "You're halfway there!";
  if (percent < 100) return 'Almost there! 🔥';
  return 'Semester complete! 🎉';
}

/* ── Time formatting ── */

export function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
}
