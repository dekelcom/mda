"use client";

import { CATEGORIES } from "@/lib/types";

export function CategoryFilter({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  function toggle(cat: string) {
    onChange(value.includes(cat) ? value.filter((c) => c !== cat) : [...value, cat]);
  }
  return (
    <div className="flex flex-wrap gap-1.5">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          className={`chip ${value.includes(cat) ? "bg-mda-ink text-white border-mda-ink" : "border-gray-200 text-gray-600"}`}
          onClick={() => toggle(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
