const COLORS: Record<string, string> = {
  "חוקי התנועה": "bg-blue-50 text-blue-700 border-blue-200",
  תמרורים: "bg-amber-50 text-amber-700 border-amber-200",
  בטיחות: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "הכרת הרכב": "bg-violet-50 text-violet-700 border-violet-200",
};

export function CategoryBadge({ category }: { category: string }) {
  const cls = COLORS[category] || "bg-gray-50 text-gray-700 border-gray-200";
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${cls}`}>
      {category}
    </span>
  );
}
