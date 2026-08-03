"use client";

import { useMemo, useState } from "react";
import { useQuestions } from "@/components/useQuestions";
import { LicenseFilter } from "@/components/LicenseFilter";
import { CategoryBadge } from "@/components/CategoryBadge";
import { QuestionImage } from "@/components/QuestionImage";
import { buildExam, EXAM_PASS, EXAM_SIZE } from "@/lib/quiz";
import type { Question } from "@/lib/types";

type Phase = "setup" | "running" | "done";

export default function ExamPage() {
  const { data, error } = useQuestions();
  const [license, setLicense] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("setup");
  const [exam, setExam] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [pos, setPos] = useState(0);

  function start() {
    if (!data) return;
    setExam(buildExam(data, license));
    setAnswers({});
    setPos(0);
    setPhase("running");
  }

  const score = useMemo(() => {
    let correct = 0;
    for (const q of exam) {
      if (answers[q.id] != null && q.options[answers[q.id]].correct) correct++;
    }
    return correct;
  }, [exam, answers]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!data) return <p className="text-gray-500">טוען מאגר…</p>;

  if (phase === "setup") {
    return (
      <div className="card p-6 space-y-5 max-w-xl mx-auto">
        <h1 className="text-2xl font-extrabold">מבחן מדומה</h1>
        <p className="text-gray-600">
          {EXAM_SIZE} שאלות במתכונת מבחן התיאוריה. ציון עובר: {EXAM_PASS} תשובות נכונות ומעלה.
        </p>
        <div>
          <div className="text-xs font-semibold text-gray-500 mb-1.5">סיווג רישיון</div>
          <LicenseFilter value={license} onChange={setLicense} />
        </div>
        <button className="btn-primary w-full" onClick={start}>
          התחלת המבחן
        </button>
      </div>
    );
  }

  if (phase === "done") {
    const passed = score >= EXAM_PASS;
    return (
      <div className="space-y-5">
        <div className={`card p-6 text-center ${passed ? "border-emerald-200" : "border-red-200"}`}>
          <div className={`text-5xl font-extrabold ${passed ? "text-emerald-600" : "text-mda-red"}`}>
            {score}/{EXAM_SIZE}
          </div>
          <p className="mt-2 text-lg font-bold">{passed ? "עברת! 🎉" : "לא עברת הפעם"}</p>
          <p className="text-gray-500 text-sm">ציון עובר: {EXAM_PASS}</p>
          <button className="btn-primary mt-4" onClick={() => setPhase("setup")}>
            מבחן חדש
          </button>
        </div>
        <h2 className="font-bold">סקירת תשובות</h2>
        {exam.map((q, i) => {
          const chosen = answers[q.id];
          const ok = chosen != null && q.options[chosen].correct;
          return (
            <div key={q.id} className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <CategoryBadge category={q.category} />
                <span className={ok ? "text-emerald-600" : "text-red-500"}>{ok ? "✓" : "✗"}</span>
              </div>
              <p className="font-semibold mb-2">
                {i + 1}. {q.question}
              </p>
              {q.image && (
                <div className="mb-2">
                  <QuestionImage src={q.image} alt={`שאלה ${q.id}`} />
                </div>
              )}
              <ul className="space-y-1 text-sm">
                {q.options.map((o, idx) => (
                  <li
                    key={idx}
                    className={`rounded-lg px-3 py-1.5 ${
                      o.correct
                        ? "bg-emerald-50 text-emerald-800"
                        : idx === chosen
                        ? "bg-red-50 text-red-700"
                        : "text-gray-600"
                    }`}
                  >
                    {o.text}
                    {o.correct && " ✓"}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    );
  }

  // running
  const q = exam[pos];
  const chosen = answers[q.id];
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-sm font-semibold">
        <span>
          שאלה {pos + 1} / {EXAM_SIZE}
        </span>
        <span className="text-gray-500">נענו: {Object.keys(answers).length}</span>
      </div>
      <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full bg-mda-red transition-all"
          style={{ width: `${((pos + 1) / EXAM_SIZE) * 100}%` }}
        />
      </div>

      <article className="card p-5 sm:p-6">
        <div className="mb-3">
          <CategoryBadge category={q.category} />
        </div>
        <h2 className="text-lg sm:text-xl font-bold leading-relaxed mb-4">{q.question}</h2>
        {q.image && (
          <div className="mb-4">
            <QuestionImage src={q.image} alt={`שאלה ${q.id}`} />
          </div>
        )}
        <ul className="space-y-2">
          {q.options.map((o, idx) => (
            <li key={idx}>
              <button
                onClick={() => setAnswers((a) => ({ ...a, [q.id]: idx }))}
                className={`w-full text-right rounded-xl border px-4 py-3 transition font-medium ${
                  chosen === idx
                    ? "border-mda-red bg-red-50"
                    : "border-gray-200 hover:border-mda-red"
                }`}
              >
                {o.text}
              </button>
            </li>
          ))}
        </ul>
      </article>

      <div className="flex justify-between">
        <button
          className="btn-ghost"
          disabled={pos === 0}
          onClick={() => setPos((p) => Math.max(0, p - 1))}
        >
          → הקודמת
        </button>
        {pos < EXAM_SIZE - 1 ? (
          <button className="btn-primary" onClick={() => setPos((p) => p + 1)}>
            הבאה ←
          </button>
        ) : (
          <button className="btn-primary" onClick={() => setPhase("done")}>
            סיום ובדיקה
          </button>
        )}
      </div>
    </div>
  );
}
