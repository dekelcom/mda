import { NextRequest } from "next/server";

const ALLOWED_HOSTS = new Set(["tqpic.mot.gov.il"]);

export const runtime = "nodejs";
export const revalidate = 86400;

export async function GET(req: NextRequest) {
  const u = req.nextUrl.searchParams.get("u");
  if (!u) return new Response("missing url", { status: 400 });

  let target: URL;
  try {
    target = new URL(u);
  } catch {
    return new Response("bad url", { status: 400 });
  }
  if (!ALLOWED_HOSTS.has(target.hostname)) {
    return new Response("host not allowed", { status: 403 });
  }
  // Force http – the origin only serves plain http.
  target.protocol = "http:";

  try {
    const upstream = await fetch(target.toString(), {
      // Cache aggressively; these images never change.
      next: { revalidate: 86400 },
    });
    if (!upstream.ok) return new Response("upstream error", { status: 502 });
    const buf = await upstream.arrayBuffer();
    return new Response(buf, {
      status: 200,
      headers: {
        "Content-Type": upstream.headers.get("content-type") || "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("fetch failed", { status: 502 });
  }
}
