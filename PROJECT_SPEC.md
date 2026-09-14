# Flowcoat website product specification

`BUSINESS_BRIEF.md` is the original business/content brief. This document records current implementation decisions and newer approved details.

## Assumptions and approved details

- FLOWCOAT is the approved written name. The supplied logo establishes a red, charcoal and white palette; the website currently uses a responsive vector interpretation of the FC circle mark and “Powder Coating” lockup.
- Public phone: **0447 771 304**.
- Public factory address: **193–195 Power St, Glendenning NSW 2761**.
- Public email: **sale@flowcoat.com.au**.
- Public Instagram: **https://www.instagram.com/flow.coat/** (`@flow.coat`).
- The current production arrangement is operational. Any future purpose-designed facility or automation must continue to be described as planned until commissioned and approved.
- Supabase, Resend, analytics, CRM and a broader CMS remain unconfigured. The quote form saves locally and clearly does not submit until secure infrastructure exists.
- Secure customer quote uploads remain disabled until private storage, MIME validation, access control, retention and malware-scanning decisions are implemented.
- Customer/project logos appear only after explicit approval and addition to `public/assets/client-logos`.

## Sitemap and journeys

Public pages: Home; Services; Projects; Process; Contact; Request a Quote; Privacy; Terms; 404. Legacy and consolidated routes redirect to the nearest useful core page.

A protected `/media-studio` administration surface manages approved public project photography. It is excluded from indexing and must never be linked from public navigation.

Primary journey: understand category/location → assess services and process → view real work → prepare job information → request a quote. Secondary journeys support production customers comparing capability and one-off customers checking suitability.

## Component and content architecture

Server-rendered header/mobile menu, footer, page hero, service rows, process steps and FAQ disclosure. The multi-step quote form is a client component because it requires progress, validation and local draft state. Project galleries use a small client component so Media Studio photography can appear without a rebuild. Shared content lives in `lib/content.ts`; approved public contact/social details are centralised in `lib/business.ts`.

## Design tokens

Industrial palette: signal red/orange brand colour, charcoal, powder white, steel greys and semantic success/warning/error/info/focus colours. Tight radii, heavy editorial type, technical grids and line-based composition distinguish Flowcoat without imitating factory controls.

## Architecture decisions

1. Next.js App Router, strict TypeScript and Tailwind; server components by default.
2. Permanent approved project assets may live in `public/assets/projects`; approved client logos live in `public/assets/client-logos`.
3. Media Studio stores uploaded project media outside the repository. In development it defaults to `~/.flowcoat-media/projects`; in production `FLOWCOAT_MEDIA_DIR` must point to a persistent writable location.
4. The public gallery combines Media Studio files with bundled project assets, receives same-browser change notifications and polls every two seconds as a fallback.
5. Production Media Studio and upload/delete requests are protected by HTTP Basic Authentication using `FLOWCOAT_MEDIA_USERNAME` and `FLOWCOAT_MEDIA_PASSWORD`. If no production password is configured, the admin surface fails closed.
6. No database or auth platform is added yet; this narrow password gate protects only project-media administration and is not customer/account authentication.
7. No fake quote success: submit remains disabled and explains what must be configured.
8. Metadata uses an environment-driven canonical origin. Sitemap and robots are generated routes.

## Planned backend

The immediate backend priority is server-side quote submission that validates the existing form, rejects obvious spam/abuse, generates a reference and emails the full enquiry to `sale@flowcoat.com.au` using the customer's email as Reply-To. SMTP details are being obtained from the current mail host so secrets can stay server-side.

A database is optional for this first phase. Supabase can be added later for quote history, private file records, projects, services, FAQs and global business settings. If added, use RLS and private buckets. Add server validation, rate limiting, spam protection, safe filename handling and audit-friendly delivery status before enabling customer file transmission.

The current Media Studio is a deliberately narrow project-image manager, not the customer quote upload system. If the site moves to serverless hosting, the filesystem-backed media library must be replaced by persistent/object storage.

## Security and privacy

Quote data and drawings are confidential business records. Never expose SMTP passwords, service-role keys, store customer quote uploads in public project-media storage, or place sensitive details in analytics. Define retention/deletion, access control, backups, incident response and file scanning before enabling customer file uploads.

Media Studio accepts approved public project photography, limits type/count/size, sanitises generated filenames and protects all write/delete operations with the production password gate. The site must be served over HTTPS before the production Media Studio is used. Passwords belong only in server environment variables and must never be committed to GitHub.

## Phases and current status

1. **Foundation complete:** Flowcoat content, tokens, shell, homepage, metadata and asset drop zones.
2. **Core front end complete:** required pages, FAQ and locally saved quote journey.
3. **Project-media workflow complete:** Media Studio, persistent media directory support, live gallery refresh and production password protection.
4. **Public contact/social complete:** approved phone, sales email, Glendenning factory address and Instagram are published.
5. **Backend pending:** quote-email submission, optional customer uploads/database, analytics and CRM-ready workflow.
6. **Quality/deployment:** typecheck, lint, production build, browser screenshots, accessibility and device audit should be run on the deployment target.

## Known launch blockers

Secure quote submission; final approved project/client assets; legal review; analytics consent decision; final production build and manual accessibility/device testing. Customer file uploads can remain a post-launch feature if the quote form launches without attachments. The hosting environment must also provide HTTPS and persistent storage for Media Studio if production uploads are enabled.
