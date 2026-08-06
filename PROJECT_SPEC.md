# Flowcoat website product specification

`BUSINESS_BRIEF.md` is the business and content source of truth. This document records implementation decisions.

## Assumptions and unresolved decisions

- FLOWCOAT is the approved written name; no usable logo file has yet been added. The text wordmark and orange/charcoal palette are provisional until the supplied logo is inspected.
- Sydney is public; factory suburb, address, phone, email, hours, ABN and service radius remain TBD and are not fabricated.
- The current rented production arrangement is operational. The purpose-designed facility and automation are planned, not current.
- Supabase, Resend, analytics, CRM and CMS choices remain unconfigured. The quote form saves locally and clearly does not submit until secure infrastructure exists.
- Secure customer uploads are intentionally disabled until private storage, MIME validation, access control, retention and malware-scanning decisions are implemented.
- Customer/project logos appear only after explicit approval and addition to `public/assets/client-logos`.

## Sitemap and journeys

Home; Services; Capabilities; Projects; Process; About; Contact; Request a Quote; FAQ; Privacy; Terms; 404. Legacy `/work` and `/approach` routes redirect to Projects and Process.

Primary journey: understand category/location → assess services and process → view real work → prepare job information → request a quote. Secondary journeys support production customers comparing capability, and one-off customers checking suitability.

## Component and content architecture

Server-rendered header/mobile menu, footer, page hero, asset gallery, service rows, process steps and FAQ disclosure. The multi-step quote form is the only client component because it requires progress, validation and local draft state. Shared content lives in `lib/content.ts`.

## Design tokens

Provisional industrial palette: signal orange `#ff5a1f`, charcoal `#111311`, powder white `#f5f3ec`, steel greys and semantic success/warning/error/info/focus colours. Tight radii, heavy editorial type, technical grids and line-based composition distinguish Flowcoat without imitating factory controls.

## Architecture decisions

1. Next.js App Router, strict TypeScript and Tailwind; server components by default.
2. Asset galleries discover approved raster files in public drop zones at build time, allowing simple incremental updates without code edits.
3. No database or auth is added until Supabase configuration and ownership are confirmed.
4. No fake form success: submit remains disabled and explains what must be configured.
5. Metadata uses an environment-driven canonical origin. Sitemap and robots are generated routes.

## Planned backend

Supabase tables should cover quote enquiries, private file records, projects, services, FAQs and global business settings. Use RLS and private buckets. Resend should send internal notifications and acknowledgements from a verified Flowcoat domain. Add Zod server validation, rate limiting, spam protection, safe filename handling and audit-friendly delivery status. Database migrations must precede production use.

## Security and privacy

Quote data and drawings are confidential business records. Never expose a service-role key, store customer uploads in `public/`, or place sensitive details in analytics. Define retention/deletion, signed URL expiry, role access, backups, incident response and file scanning before enabling transmission.

## Phases and current status

1. **Foundation complete:** Flowcoat content, tokens, shell, homepage, metadata and asset drop zones.
2. **Core front end complete:** required pages, gallery discovery, FAQ and locally saved quote journey. Submission/upload integration remains visibly disabled.
3. **Backend pending decisions:** Supabase, Resend, CMS, storage, analytics and CRM-ready workflow.
4. **Quality pending install:** typecheck, lint, build, browser screenshots, accessibility and device audit after dependencies are available.

## Known launch blockers

Logo asset and final colours; public contact details; approved project/client assets; secure submission and uploads; legal review; analytics consent decision; production build and manual accessibility/device testing.
