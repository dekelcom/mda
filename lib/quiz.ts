import type { Question } from "./types";

// Deterministic shuffle (Fisher–Yates) so answer order is randomised
// without importing anything; callers pass Math.random-derived seeds.
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function filterQuestions(
  all: Question[],
  opts: { categories?: string[]; license?: string | null; search?: string }
): Question[] {
  const { categories, license, search } = opts;
  const term = search?.trim();
  return all.filter((q) => {
    if (categories && categories.length && !categories.includes(q.category)) return false;
    if (license && !q.licenses.includes(license)) return false;
    if (term && !q.question.includes(term) && !q.options.some((o) => o.text.includes(term)))
      return false;
    return true;
  });
}

// The real Israeli theory test is 30 questions. We approximate the official
// distribution across the four topic areas.
export const EXAM_SIZE = 30;
export const EXAM_PASS = 26; // Official pass mark is category-weighted; 26/30 is the common threshold.

export function buildExam(all: Question[], license: string | null): Question[] {
  const pool = license ? all.filter((q) => q.licenses.includes(license)) : all;
  const mix: Record<string, number> = {
    "חוקי התנועה": 14,
    תמרורים: 7,
    בטיחות: 6,
    "הכרת הרכב": 3,
  };
  const picked: Question[] = [];
  for (const [cat, n] of Object.entries(mix)) {
    const inCat = shuffle(pool.filter((q) => q.category === cat));
    picked.push(...inCat.slice(0, n));
  }
  // Top up if any category was short.
  if (picked.length < EXAM_SIZE) {
    const ids = new Set(picked.map((q) => q.id));
    picked.push(...shuffle(pool.filter((q) => !ids.has(q.id))).slice(0, EXAM_SIZE - picked.length));
  }
  return shuffle(picked).slice(0, EXAM_SIZE);
}
