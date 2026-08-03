export default function AboutPage() {
  return (
    <div className="prose max-w-none space-y-4">
      <h1 className="text-2xl font-extrabold">אודות</h1>
      <p className="text-gray-700 leading-relaxed">
        אפליקציית תרגול למבחן התיאוריה בנהיגה, בנויה סביב מאגר השאלות והתשובות
        הרשמי של משרד התחבורה. האפליקציה נועדה לסייע לנהגי רכב חירום ואמבולנס
        במד״א להתכונן למבחן, אך מתאימה לכל לומד לקראת מבחן התיאוריה.
      </p>
      <div className="card p-4">
        <h2 className="font-bold mb-2">מקור הנתונים</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          המאגר מבוסס על קובץ ה־XML הרשמי של משרד התחבורה (מאגר השאלות למבחן
          נהיגה עיוני ממוחשב). התמונות נטענות ישירות משרתי משרד התחבורה דרך
          שרת ביניים (proxy) של האפליקציה.
        </p>
      </div>
      <div className="card p-4">
        <h2 className="font-bold mb-2">סיווגי רישיון</h2>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>1 – טרקטור</li>
          <li>A – אופנוע</li>
          <li>B – רכב פרטי</li>
          <li>C1 – רכב מסחרי עד 12 טון</li>
          <li>C – רכב משא כבד</li>
          <li>D – אוטובוס</li>
        </ul>
      </div>
      <p className="text-xs text-gray-400">
        כלי לימוד בלתי־רשמי. אינו מהווה תחליף למאגר הרשמי או להנחיות משרד התחבורה
        ומד״א. כל הזכויות על תוכן השאלות שמורות לבעליהן.
      </p>
    </div>
  );
}
