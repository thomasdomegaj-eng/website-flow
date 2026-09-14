import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Flowcoat about powder coating for metal parts in Sydney.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <main id="main">
      <PageHero
        label="Contact"
        title="Start with the job details."
        intro="Call or email Flowcoat directly, or send the job details needed for a proper review and quotation."
      />
      <section className="wrap grid gap-8 py-16 md:grid-cols-2">
        <article className="bg-[var(--brand)] p-8">
          <p className="eyebrow">Best for pricing</p>
          <h2 className="mt-5 text-3xl font-black">Request a Quote</h2>
          <p className="mt-4 max-w-md leading-relaxed">Share the part description, dimensions, material, quantity, condition, finish and timing so the work can be reviewed properly.</p>
          <Link href="/quote" className="button mt-7">Start your request →</Link>
        </article>
        <article className="border border-[var(--line)] bg-white p-8">
          <p className="eyebrow text-[var(--muted)]">Direct contact</p>
          <h2 className="mt-5 text-3xl font-black">FLOWCOAT</h2>
          <dl className="mt-6 space-y-5">
            <div>
              <dt className="text-xs font-bold uppercase tracking-[.18em] text-[var(--muted)]">Phone</dt>
              <dd className="mt-1 text-xl font-bold"><a href={`tel:${business.phoneHref}`} className="underline decoration-[var(--brand)] decoration-2 underline-offset-4">{business.phoneDisplay}</a></dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-[.18em] text-[var(--muted)]">Email</dt>
              <dd className="mt-1 text-lg font-semibold"><a href={`mailto:${business.email}`} className="underline decoration-[var(--brand)] decoration-2 underline-offset-4">{business.email}</a></dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-[.18em] text-[var(--muted)]">Factory</dt>
              <dd className="mt-1 text-lg font-semibold"><address className="not-italic">{business.addressDisplay}</address></dd>
            </div>
          </dl>
        </article>
      </section>
    </main>
  );
}
