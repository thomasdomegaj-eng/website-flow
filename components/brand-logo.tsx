import Link from "next/link";

export function BrandMark({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" role="img" aria-label="Flowcoat">
      <path d="M50 2a48 48 0 0 0 0 96Z" fill="var(--brand)" />
      <path d="M50 2a48 48 0 0 1 0 96Z" fill="var(--ink)" />
      <g>
        <path d="M29 18h40v15H45v11h19v14H45v5H29Z" fill="white" />
        <path
          d="M84 57c-4-4-9-6-15-6-13 0-22 9-22 22s9 22 22 22c6 0 11-2 15-6"
          fill="none"
          stroke="white"
          strokeLinecap="butt"
          strokeWidth="16"
        />
      </g>
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
