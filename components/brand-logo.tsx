import Link from "next/link";

export function BrandMark({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" role="img" aria-label="Flowcoat">
      <circle cx="50" cy="50" r="48" fill="var(--ink)" />
      <path d="M50 2a48 48 0 0 0 0 96Z" fill="var(--brand)" />
      <path d="M27 20h40v15H43v11h19v15H43v19H27Z" fill="white" />
      <path d="M72 45c-19 0-30 11-30 29 0 16 11 25 27 25 7 0 13-2 18-5V76c-4 4-8 6-13 6-8 0-13-4-13-10 0-7 5-11 13-11 5 0 9 2 13 5V49c-4-3-9-4-15-4Z" fill="white" />
    </svg>
  );
}

export function BrandLogo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href="/" aria-label="Flowcoat home" className="inline-flex items-center gap-3">
      <BrandMark className="h-11 w-11 shrink-0" />
      <span className="leading-none">
        <span className={`block text-xl font-black italic tracking-[-.06em] ${inverted ? "text-white" : "text-[var(--ink)]"}`}>
          <span className="text-[var(--brand)]">FLOW</span>COAT
        </span>
        <span className={`mt-1 block text-[.56rem] font-bold uppercase tracking-[.28em] ${inverted ? "text-white/60" : "text-[var(--muted)]"}`}>Industrial Finishes.</span>
      </span>
    </Link>
  );
}
