import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How FLOWCOAT handles personal information submitted through its website and enquiries.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return <main id="main">
    <PageHero
      label="Privacy"
      title="Privacy Policy"
      intro="This policy explains how FLOWCOAT handles personal information provided through our website, enquiries and business communications."
    />
    <article className="wrap max-w-4xl space-y-10 py-14 text-[var(--muted)]">
      <p className="text-sm">Last updated: 14 September 2026</p>

      <section className="space-y-3">
        <h2 className="text-2xl font-black text-[var(--ink)]">1. Who we are</h2>
        <p>FLOWCOAT is a Sydney powder-coating business. You can contact us at <a className="font-bold text-[var(--ink)] underline" href={`mailto:${business.email}`}>{business.email}</a>, by phone on <a className="font-bold text-[var(--ink)] underline" href={`tel:${business.phoneHref}`}>{business.phoneDisplay}</a>, or at {business.addressDisplay}.</p>
        <p>We aim to handle personal information consistently with applicable Australian privacy laws, including the Privacy Act 1988 (Cth) and the Australian Privacy Principles where they apply to us.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-black text-[var(--ink)]">2. Information we may collect</h2>
        <p>Depending on how you deal with us, we may collect your name, business name, email address, phone number, job and quotation details, part descriptions, dimensions, material, quantity, colour or finish requirements, timing, correspondence and any other information you choose to provide.</p>
        <p>If secure customer file uploads are enabled in future, we may also collect photographs, drawings and related project files that you choose to submit.</p>
        <p>Our website and hosting providers may also generate ordinary technical records such as IP address, browser type, request logs, device information and security logs.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-black text-[var(--ink)]">3. How we collect information</h2>
        <p>We may collect information directly from you through website forms, email, telephone, social media, in-person discussions and other business communications. We may also receive information from another person involved in the same project or business relationship where it is reasonable for us to do so.</p>
        <p>The Request a Quote form may save an unfinished draft in your browser's local storage so you can continue it on the same device. A locally saved draft remains on that device unless and until it is submitted, cleared or removed by your browser settings.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-black text-[var(--ink)]">4. Why we use information</h2>
        <p>We may use personal information to respond to enquiries, assess and prepare quotations, communicate about jobs, provide powder-coating services, manage customer and supplier relationships, keep business records, operate and secure the website, prevent misuse, resolve disputes and comply with legal obligations.</p>
        <p>We will not use your contact details for unrelated direct marketing unless we have a lawful basis to do so. Where consent is required for commercial electronic messages, we will seek it and provide a way to opt out.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-black text-[var(--ink)]">5. Who we may disclose information to</h2>
        <p>We may disclose information where reasonably necessary to our website, hosting, email, IT, storage, security and professional service providers; to contractors or suppliers involved in a job where appropriate; to a person you authorise us to deal with; or where required or permitted by law.</p>
        <p>We do not sell personal information.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-black text-[var(--ink)]">6. Overseas service providers</h2>
        <p>Some technology or communications providers we use may process or store information outside Australia. The countries involved can change as providers and infrastructure change. Where applicable, we will take reasonable steps required by Australian privacy law before disclosing personal information overseas.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-black text-[var(--ink)]">7. Storage, security and retention</h2>
        <p>We take reasonable steps to protect personal information from misuse, interference, loss and unauthorised access, modification or disclosure. No internet transmission or storage system can be guaranteed to be completely secure.</p>
        <p>We keep personal information only for as long as reasonably necessary for the purpose for which it was collected, our business and record-keeping requirements, dispute management, or legal obligations. When information is no longer required, we may delete, destroy or de-identify it where appropriate.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-black text-[var(--ink)]">8. Website storage, cookies and analytics</h2>
        <p>The website may use local browser storage for features such as saving an unfinished quote draft. If analytics, advertising or additional cookies are introduced later, this policy and any required consent controls will be updated before those tools are relied on.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-black text-[var(--ink)]">9. Access and correction</h2>
        <p>You may contact us to request access to personal information we hold about you or to ask us to correct information you believe is inaccurate, out of date, incomplete, irrelevant or misleading. We may need to verify your identity before acting on a request and may refuse access where the law permits us to do so.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-black text-[var(--ink)]">10. Privacy questions and complaints</h2>
        <p>If you have a privacy question or complaint, email <a className="font-bold text-[var(--ink)] underline" href={`mailto:${business.email}`}>{business.email}</a> and provide enough information for us to investigate. We will consider the issue and respond within a reasonable period. If applicable privacy law gives you a further right to complain to a regulator, you may also exercise that right.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-black text-[var(--ink)]">11. Changes to this policy</h2>
        <p>We may update this policy when our services, website, providers or legal obligations change. The current version will be published on this page with its updated date.</p>
      </section>
    </article>
  </main>;
}
