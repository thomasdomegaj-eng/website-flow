import Link from "next/link";

export function BrandMark({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Flowcoat"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Match the supplied mark: charcoal circle with a true 50/50 red left half. */}
      <circle cx="50" cy="50" r="48" fill="var(--ink)" />
      <path d="M50 2a48 48 0 0 0 0 96Z" fill="var(--brand)" />

      {/* F placement follows the supplied artwork: high and left inside the circle. */}
      <path d="M24 8h34v13H41v8h15v13H41v18H24Z" fill="white" />

      {/* C placement follows the supplied artwork: lower, rounded and open on the right. */}
      <path
        d="M77 40c-4-2-8-3-13-3-15 0-25 12-25 29 0 18 11 31 27 31 5 0 9-1 13-3V76c-3 2-6 3-10 3-8 0-13-5-13-13 0-7 5-12 13-12 3 0 6 1 8 2Z"
        fill="white"
      />
    </svg>
  );
}

export function BrandLogo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href="/" aria-label="Flowcoat home" className="inline-flex items-center gap-3">
      <BrandMark className="h-11 w-11 shrink-0" />
      <span className="leading-none">
        <span
          className={`block text-xl font-black italic tracking-[-.055em] ${
            inverted ? "text-white" : "text-[var(--ink)]"
          }`}
        >
          <span className="text-[var(--brand)]">FLOW</span>COAT
        </span>
        <span
          className={`mt-1 block text-[.56rem] font-normal uppercase tracking-[.17em] ${
            inverted ? "text-white/70" : "text-[var(--ink)]"
          }`}
        >
          Powder Coating
        </span>
      </span>
    </Link>
  );
}
