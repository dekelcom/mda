"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuestions } from "@/components/useQuestions";
import { QuestionCard } from "@/components/QuestionCard";
import { LicenseFilter } from "@/components/LicenseFilter";
import { CategoryFilter } from "@/components/CategoryFilter";
import { filterQuestions } from "@/lib/quiz";

const PAGE = 20;

function BrowseInner() {
  const { data, error } = useQuestions();
  const params = useSearchParams();
  const [cats, setCats] = useState<string[]>([]);
  const [license, setLicense] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(PAGE);

  useEffect(() => {
    const cat = params.get("cat");
    if (cat) setCats([cat]);
  }, [params]);

  const results = useMemo(() => {
    if (!data) return [];
    return filterQuestions(data, { categories: cats, license, search });
  }, [data, cats, license, search]);

  useEffect(() => setLimit(PAGE), [cats, license, search]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!data) return <p className="text-gray-500">טוען מאגר…</p>;

  return (
    <div className="space-y-5">
      <div className="card p-4 space-y-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="חיפוש חופשי בשאלות ובתשובות…"
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:border-mda-red outline-none"
        />
        <CategoryFilter value={cats} onChange={setCats} />
        <LicenseFilter value={license} onChange={setLicense} />
        <div className="text-sm text-gray-500">
          {results.length.toLocaleString("he-IL")} תוצאות
        </div>
      </div>

      <div className="space-y-4">
        {results.slice(0, limit).map((q) => (
          <QuestionCard key={q.id} question={q} mode="reveal" />
        ))}
      </div>

      {limit < results.length && (
        <div className="text-center">
          <button className="btn-ghost" onClick={() => setLimit((l) => l + PAGE)}>
            טעינת עוד שאלות
          </button>
        </div>
      )}
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={<p className="text-gray-500">טוען…</p>}>
      <BrowseInner />
    </Suspense>
  );
}
