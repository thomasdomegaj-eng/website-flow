import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

const links = [["Services","/services"],["Process","/process"],["Projects","/projects"],["Contact","/contact"]];
export function SiteHeader() {
  return <header className="sticky top-0 z-40 border-b border-black/15 bg-[var(--paper)]/95 backdrop-blur-sm">
    <div className="wrap flex min-h-20 items-center justify-between gap-5">
      <BrandLogo />
      <nav aria-label="Main navigation" className="hidden items-center gap-5 lg:flex">{links.map(([label,href])=><Link key={href} className="text-sm font-bold hover:text-[var(--brand-dark)]" href={href}>{label}</Link>)}<Link className="button !min-h-11 !px-4 !py-2 text-sm" href="/quote">Request a Quote <span aria-hidden>→</span></Link></nav>
      <details className="relative lg:hidden"><summary className="button !min-h-11 !px-4 !py-2">Menu <span aria-hidden>＋</span></summary><nav aria-label="Mobile navigation" className="absolute right-0 top-14 w-72 border border-[var(--line)] bg-white p-3 shadow-xl">{links.map(([label,href])=><Link key={href} className="block min-h-12 border-b border-[var(--line)] px-3 py-3 font-bold" href={href}>{label}</Link>)}<Link className="button mt-3 w-full" href="/quote">Request a Quote</Link></nav></details>
    </div>
  </header>;
}
