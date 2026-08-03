import Link from "next/link";
import { getStats } from "@/lib/data";
import { CATEGORIES } from "@/lib/types";

export default function Home() {
  const stats = getStats();

  return (
    <div className="space-y-10">
      <section className="text-center py-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-red-50 text-mda-red px-4 py-1.5 text-sm font-semibold mb-4">
          ✚ מד״א · הכנה למבחן התיאוריה
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
          תרגול מבחן התיאוריה
          <br />
          לנהגי רכב חירום ואמבולנס
        </h1>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          {stats.total.toLocaleString("he-IL")} שאלות ותשובות ממאגר משרד התחבורה הרשמי,
          עם סינון לפי נושא וסיווג רישיון, תרגול חופשי ומבחן מדומה.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Link href="/practice" className="btn-primary">
            התחלת תרגול
          </Link>
          <Link href="/exam" className="btn-ghost">
            מבחן מדומה (30 שאלות)
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { k: "שאלות", v: stats.total },
          { k: "נושאים", v: CATEGORIES.length },
          { k: "עם תמונה", v: stats.withImage },
          { k: "סיווגי רישיון", v: Object.keys(stats.byLicense).length },
        ].map((s) => (
          <div key={s.k} className="card p-4 text-center">
            <div className="text-2xl font-extrabold text-mda-red">
              {s.v.toLocaleString("he-IL")}
            </div>
            <div className="text-sm text-gray-500">{s.k}</div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-lg font-bold mb-3">נושאי הלימוד</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/browse?cat=${encodeURIComponent(cat)}`}
              className="card p-4 flex items-center justify-between hover:border-mda-red transition"
            >
              <span className="font-semibold">{cat}</span>
              <span className="text-sm text-gray-500">
                {(stats.byCategory[cat] || 0).toLocaleString("he-IL")} שאלות
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
