"use client";

import { LICENSES } from "@/lib/types";

export function LicenseFilter({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (v: string | null) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      <button
        className={`chip ${value === null ? "bg-mda-red text-white border-mda-red" : "border-gray-200 text-gray-600"}`}
        onClick={() => onChange(null)}
      >
        כל הסיווגים
      </button>
      {LICENSES.map((l) => (
        <button
          key={l.code}
          title={l.label}
          className={`chip ${value === l.code ? "bg-mda-red text-white border-mda-red" : "border-gray-200 text-gray-600"}`}
          onClick={() => onChange(l.code)}
        >
          {l.code}
        </button>
      ))}
    </div>
  );
}
