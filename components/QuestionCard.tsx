"use client";

import { useMemo, useState } from "react";
import type { Question } from "@/lib/types";
import { QuestionImage } from "./QuestionImage";
import { CategoryBadge } from "./CategoryBadge";

interface Props {
  question: Question;
  index?: number;
  total?: number;
  // "quiz": tap to answer with instant feedback. "reveal": hidden until user asks.
  mode?: "quiz" | "reveal";
  onAnswered?: (correct: boolean) => void;
}

export function QuestionCard({ question, index, total, mode = "quiz", onAnswered }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  // Randomise option order once per question instance.
  const order = useMemo(() => {
    const idx = question.options.map((_, i) => i);
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    return idx;
  }, [question.id]);

  const answered = selected !== null;

  function choose(optIndex: number) {
    if (answered) return;
    setSelected(optIndex);
    onAnswered?.(question.options[optIndex].correct);
  }

  return (
    <article className="card p-5 sm:p-6">
      <div className="flex items-center justify-between mb-3">
        <CategoryBadge category={question.category} />
        <span className="text-xs text-gray-400 font-medium">
          {index != null && total != null ? `שאלה ${index + 1} מתוך ${total}` : `#${question.id}`}
        </span>
      </div>

      <h2 className="text-lg sm:text-xl font-bold leading-relaxed mb-4">{question.question}</h2>

      {question.image && (
        <div className="mb-4">
          <QuestionImage src={question.image} alt={`שאלה ${question.id}`} />
        </div>
      )}

      <ul className="space-y-2">
        {order.map((optIndex, pos) => {
          const opt = question.options[optIndex];
          const isCorrect = opt.correct;
          const isChosen = selected === optIndex;
          const show = mode === "reveal" ? revealed : answered;

          let cls = "border-gray-200 hover:border-mda-red bg-white";
          if (show && isCorrect) cls = "border-emerald-400 bg-emerald-50";
          else if (show && isChosen && !isCorrect) cls = "border-red-400 bg-red-50";
          else if (mode === "reveal" && revealed) cls = "border-gray-200 bg-white opacity-70";

          return (
            <li key={optIndex}>
              <button
                type="button"
                disabled={mode === "quiz" && answered}
                onClick={() => mode === "quiz" && choose(optIndex)}
                className={`w-full text-right flex items-start gap-3 rounded-xl border px-4 py-3 transition ${cls}`}
              >
                <span className="mt-0.5 grid place-items-center w-6 h-6 shrink-0 rounded-full border border-current text-xs font-bold text-gray-400">
                  {["א", "ב", "ג", "ד"][pos] || pos + 1}
                </span>
                <span className="font-medium leading-relaxed">{opt.text}</span>
                {show && isCorrect && <span className="ms-auto text-emerald-600">✓</span>}
                {show && isChosen && !isCorrect && <span className="ms-auto text-red-500">✗</span>}
              </button>
            </li>
          );
        })}
      </ul>

      {mode === "reveal" && (
        <div className="mt-4">
          <button className="btn-ghost text-sm" onClick={() => setRevealed((v) => !v)}>
            {revealed ? "הסתר תשובה" : "הצג תשובה נכונה"}
          </button>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {question.licenses.map((l) => (
          <span key={l} className="chip border-gray-200 text-gray-500 text-xs py-0.5">
            {l}
          </span>
        ))}
      </div>
    </article>
  );
}
