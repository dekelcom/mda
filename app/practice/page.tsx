"use client";

import { useMemo, useState } from "react";
import { useQuestions } from "@/components/useQuestions";
import { QuestionCard } from "@/components/QuestionCard";
import { LicenseFilter } from "@/components/LicenseFilter";
import { CategoryFilter } from "@/components/CategoryFilter";
import { filterQuestions, shuffle } from "@/lib/quiz";

export default function PracticePage() {
  const { data, error } = useQuestions();
  const [license, setLicense] = useState<string | null>(null);
  const [cats, setCats] = useState<string[]>([]);
  const [pos, setPos] = useState(0);
  const [stats, setStats] = useState({ seen: 0, correct: 0 });
  const [nonce, setNonce] = useState(0);

  const pool = useMemo(() => {
    if (!data) return [];
    return shuffle(filterQuestions(data, { license, categories: cats }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, license, cats, nonce]);

  function reset() {
    setPos(0);
    setStats({ seen: 0, correct: 0 });
    setNonce((n) => n + 1);
  }

  if (error) return <p className="text-red-600">{error}</p>;
  if (!data) return <p className="text-gray-500">טוען מאגר…</p>;

  const q = pool[pos];

  return (
    <div className="space-y-5">
      <div className="card p-4 space-y-3">
        <div>
          <div className="text-xs font-semibold text-gray-500 mb-1.5">סיווג רישיון</div>
          <LicenseFilter
            value={license}
            onChange={(v) => {
              setLicense(v);
              reset();
            }}
          />
        </div>
        <div>
          <div className="text-xs font-semibold text-gray-500 mb-1.5">נושאים</div>
          <CategoryFilter
            value={cats}
            onChange={(v) => {
              setCats(v);
              reset();
            }}
          />
        </div>
        <div className="flex items-center justify-between text-sm pt-1">
          <span className="text-gray-500">
            {pool.length.toLocaleString("he-IL")} שאלות במאגר המסונן
          </span>
          <span className="font-semibold">
            נכונות: <span className="text-emerald-600">{stats.correct}</span> / {stats.seen}
          </span>
        </div>
      </div>

      {q ? (
        <>
          <QuestionCard
            key={`${q.id}-${nonce}`}
            question={q}
            index={pos}
            total={pool.length}
            mode="quiz"
            onAnswered={(correct) =>
              setStats((s) => ({ seen: s.seen + 1, correct: s.correct + (correct ? 1 : 0) }))
            }
          />
          <div className="flex justify-between">
            <button className="btn-ghost" onClick={reset}>
              איפוס
            </button>
            <button
              className="btn-primary"
              onClick={() => setPos((p) => (p + 1) % pool.length)}
            >
              השאלה הבאה ←
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-500">אין שאלות מתאימות לסינון שנבחר.</p>
      )}
    </div>
  );
}
