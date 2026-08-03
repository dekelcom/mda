"use client";

export function QuestionImage({ src, alt }: { src: string; alt: string }) {
  // Route through the same-origin proxy to dodge http mixed-content.
  const proxied = `/api/img?u=${encodeURIComponent(src)}`;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={proxied}
      alt={alt}
      loading="lazy"
      className="w-full max-h-72 object-contain rounded-xl border border-gray-100 bg-gray-50"
    />
  );
}
