"use client";

import { useEffect, useState } from "react";
import type { Question } from "@/lib/types";

let cache: Question[] | null = null;

export function useQuestions() {
  const [data, setData] = useState<Question[] | null>(cache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cache) return;
    fetch("/questions.json")
      .then((r) => r.json())
      .then((q: Question[]) => {
        cache = q;
        setData(q);
      })
      .catch(() => setError("שגיאה בטעינת מאגר השאלות"));
  }, []);

  return { data, error };
}
