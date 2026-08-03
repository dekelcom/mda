import "server-only";
import questions from "@/data/questions.json";
import type { Question } from "./types";

// Server-side accessor used for stats and SSR. The client fetches
// /questions.json directly (static asset) for interactive modes.
export function getAllQuestions(): Question[] {
  return questions as Question[];
}

export function getStats() {
  const all = getAllQuestions();
  const byCategory: Record<string, number> = {};
  const byLicense: Record<string, number> = {};
  for (const q of all) {
    byCategory[q.category] = (byCategory[q.category] || 0) + 1;
    for (const l of q.licenses) byLicense[l] = (byLicense[l] || 0) + 1;
  }
  return {
    total: all.length,
    withImage: all.filter((q) => q.image).length,
    byCategory,
    byLicense,
  };
}
