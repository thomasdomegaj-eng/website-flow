# Flowcoat website product specification

`BUSINESS_BRIEF.md` is the business and content source of truth. This document records implementation decisions.

## Assumptions and unresolved decisions

- FLOWCOAT is the approved written name. The supplied logo establishes a red, charcoal and white palette; the website currently uses a responsive vector interpretation of the FC circle mark and “Powder Coating” lockup.
- Sydney is public; factory suburb, address, phone, email, hours, ABN and service radius remain TBD and are not fabricated.
- The current rented production arrangement is operational. The purpose-designed facility and automation are planned, not current.
- Supabase, Resend, analytics, CRM and CMS choices remain unconfigured. The quote form saves locally and clearly does not submit until secure infrastructure exists.
- Secure customer uploads are intentionally disabled until private storage, MIME validation, access control, retention and malware-scanning decisions are implemented.
- Customer/project logos appear only after explicit approval and addition to `public/assets/client-logos`.
- Development project photography can be managed through the local-only Media Studio; this is separate from customer quote attachments and production media storage.

## Sitemap and journeys

Home; Services; Projects; Process; Contact; Request a Quote; Privacy; Terms; 404. Legacy and consolidated routes redirect to the nearest useful core page. Development also exposes `/media-studio`, which is not available in production.

Primary journey: understand category/location → assess services and process → view real work → prepare job information → request a quote. Secondary journeys support production customers comparing capability, and one-off customers checking suitability.

## Component and content architecture

Server-rendered header/mobile menu, footer, page hero, service rows, process steps and FAQ disclosure. The multi-step quote form is a client component because it requires progress, validation and local draft state. Project galleries now use a small client component so locally uploaded development photography can appear without a rebuild. Shared content lives in `lib/content.ts`.

## Design tokens

Provisional industrial palette: signal red/orange brand colour, charcoal, powder white, steel greys and semantic success/warning/error/info/focus colours. Tight radii, heavy editorial type, technical grids and line-based composition distinguish Flowcoat without imitating factory controls.

## Architecture decisions

1. Next.js App Router, strict TypeScript and Tailwind; server components by default.
2. Permanent approved project assets may still live in `public/assets/projects`; approved client logos live in `public/assets/client-logos`.
3. A development-only Media Studio at `/media-studio` stores test project media outside the repository in `~/.flowcoat-media/projects` by default. The live gallery combines these files with bundled project assets, receives same-browser change notifications and polls every two seconds as a fallback.
4. No database or auth is added until Supabase configuration and ownership are confirmed.
5. No fake quote success: submit remains disabled and explains what must be configured.
6. Metadata uses an environment-driven canonical origin. Sitemap and robots are generated routes.

## Planned backend

Supabase tables should cover quote enquiries, private file records, projects, services, FAQs and global business settings. Use RLS and private buckets. Resend should send internal notifications and acknowledgements from a verified Flowcoat domain. Add Zod server validation, rate limiting, spam protection, safe filename handling and audit-friendly delivery status. Database migrations must precede production use.

The local Media Studio is not the planned production CMS or upload backend. A future production media workflow should move approved project files to managed storage and retain moderation, metadata, ordering and permissions.

## Security and privacy

Quote data and drawings are confidential business records. Never expose a service-role key, store customer uploads in `public/`, or place sensitive details in analytics. Define retention/deletion, signed URL expiry, role access, backups, incident response and file scanning before enabling transmission.

The Media Studio only accepts project photography during local development, limits type/count/size, sanitises generated filenames and disables write/delete routes in production. Because the dev server may be bound to `0.0.0.0`, anyone on the same trusted local network who can reach the development machine may be able to access the Studio while it is running.

## Phases and current status

1. **Foundation complete:** Flowcoat content, tokens, shell, homepage, metadata and asset drop zones.
2. **Core front end complete:** required pages, FAQ and locally saved quote journey.
3. **Local project-media workflow complete:** development Media Studio, persistent local media directory and live gallery refresh.
4. **Backend pending decisions:** Supabase, Resend, production CMS/media storage, analytics and CRM-ready workflow.
5. **Quality pending install/run:** typecheck, lint, build, browser screenshots, accessibility and device audit should be run on the current branch after dependencies are installed.

## Known launch blockers

Master logo asset/final brand treatment; public contact details; approved project/client assets; secure quote submission and customer uploads; production media/CMS decision; legal review; analytics consent decision; production build and manual accessibility/device testing.
