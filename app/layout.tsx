import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "מד״א · תרגול מבחן תיאוריה",
  description:
    "אפליקציית תרגול למבחן התיאוריה בנהיגה, מבוססת מאגר השאלות הרשמי של משרד התחבורה — לנהגי רכב חירום ואמבולנס.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-gray-100">
          <div className="mx-auto max-w-5xl px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-extrabold text-lg">
              <span className="grid place-items-center w-9 h-9 rounded-xl bg-mda-red text-white">✚</span>
              <span>
                מד״א <span className="text-mda-red">תיאוריה</span>
              </span>
            </Link>
            <nav className="flex items-center gap-1 text-sm font-semibold">
              <Link className="px-3 py-2 rounded-lg hover:bg-gray-100" href="/practice">
                תרגול
              </Link>
              <Link className="px-3 py-2 rounded-lg hover:bg-gray-100" href="/exam">
                מבחן
              </Link>
              <Link className="px-3 py-2 rounded-lg hover:bg-gray-100" href="/browse">
                מאגר
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-8">{children}</main>
        <footer className="border-t border-gray-100 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-gray-500 flex flex-wrap gap-2 justify-between">
            <span>
              מבוסס על מאגר השאלות הרשמי של משרד התחבורה. כלי לימוד בלתי־רשמי.
            </span>
            <Link href="/about" className="hover:text-mda-red">
              אודות
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
