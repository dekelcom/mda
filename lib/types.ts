export type LicenseCode = "1" | "A" | "B" | "C1" | "C" | "D";

export interface Option {
  text: string;
  correct: boolean;
}

export interface Question {
  id: number;
  category: string;
  question: string;
  options: Option[];
  correctIndex: number;
  image: string | null;
  licenses: string[];
}

export const CATEGORIES = [
  "חוקי התנועה",
  "תמרורים",
  "בטיחות",
  "הכרת הרכב",
] as const;

// Order matters for the UI filter row.
export const LICENSES: { code: LicenseCode; label: string }[] = [
  { code: "B", label: "B – רכב פרטי" },
  { code: "A", label: "A – אופנוע" },
  { code: "1", label: "1 – טרקטור" },
  { code: "C1", label: "C1 – משא עד 12 טון" },
  { code: "C", label: "C – משא כבד" },
  { code: "D", label: "D – אוטובוס" },
];
