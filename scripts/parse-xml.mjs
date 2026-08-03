// Parses the official Israeli MOT theory-exam RSS/XML question bank into clean JSON.
// Usage: node scripts/parse-xml.mjs <input.xml> <output.json>
import { readFileSync, writeFileSync } from 'node:fs';

const [, , inPath, outPath] = process.argv;
if (!inPath || !outPath) {
  console.error('Usage: node parse-xml.mjs <input.xml> <output.json>');
  process.exit(1);
}

const xml = readFileSync(inPath, 'utf8');

const decode = (s) =>
  s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
const out = [];
const seen = new Set();

for (const item of items) {
  const titleRaw = (item.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
  const category = decode((item.match(/<category>([\s\S]*?)<\/category>/) || [])[1] || '');
  const cdata = (item.match(/<!\[CDATA\[([\s\S]*?)\]\]>/) || [])[1] || '';

  // "1759. question text" -> id + question
  const m = titleRaw.match(/^\s*(\d+)\.\s*([\s\S]*)$/);
  if (!m) continue;
  const id = Number(m[1]);
  if (seen.has(id)) continue;
  seen.add(id);
  const question = decode(m[2]);

  // answer options: <li><span [id="correctAnswerNNNN"]>text</span></li>
  const lis = [...cdata.matchAll(/<li>\s*<span([^>]*)>([\s\S]*?)<\/span>\s*<\/li>/g)];
  const options = [];
  let correctIndex = -1;
  lis.forEach((li, idx) => {
    const attrs = li[1] || '';
    const text = decode(li[2].replace(/<[^>]+>/g, ''));
    const correct = /id\s*=\s*"correctAnswer\d+"/.test(attrs);
    if (correct) correctIndex = idx;
    options.push({ text, correct });
  });
  if (options.length < 2 || correctIndex === -1) continue;

  // image
  const img = (cdata.match(/<img[^>]+src="([^"]+)"/) || [])[1] || null;

  // license tokens «B» «C1» ... (В is Cyrillic in source -> normalise to Latin B)
  const licenses = [...cdata.matchAll(/«([^»]+)»/g)]
    .map((x) => x[1].trim().replace(/В/g, 'B'))
    .filter((v, i, a) => a.indexOf(v) === i);

  out.push({ id, category, question, options, correctIndex, image: img, licenses });
}

out.sort((a, b) => a.id - b.id);
writeFileSync(outPath, JSON.stringify(out, null, 0), 'utf8');
console.log(`Parsed ${out.length} questions -> ${outPath}`);
