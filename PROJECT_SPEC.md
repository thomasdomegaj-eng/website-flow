# Flowcoat website product specification

`BUSINESS_BRIEF.md` is the original business/content brief. This document records current implementation decisions and newer approved details.

## Assumptions and approved details

- FLOWCOAT is the approved written name. The website uses the supplied master FLOWCOAT artwork from the provided PDF, rasterised for browser delivery without redrawing, tracing or recreating the artwork.
- Public phone: **0447 771 304**.
- Public factory address: **193–195 Power St, Glendenning NSW 2761**.
- Public email: **sale@flowcoat.com.au**.
- Public Instagram: **https://www.instagram.com/flow.coat/** (`@flow.coat`).
- Website-generated quote notifications send from **noreply@flowcoat.com.au** and deliver to **sale@flowcoat.com.au** when the server SMTP environment is configured.
- Secure customer quote-file uploads remain disabled until private storage, MIME validation, access control, retention and malware-scanning decisions are implemented.
- Customer/project logos appear only after explicit approval.

## Sitemap and journeys

Public pages: Home; Services; Projects; Process; Contact; Request a Quote; Privacy; Terms; 404. Legacy and consolidated routes redirect to the nearest useful core page.

A protected `/media-studio` administration surface manages approved public project photography and approved client/company logos. It is excluded from indexing and must never be linked from public navigation.

Primary journey: understand category/location → assess services and process → view real work → prepare job information → request a quote. Secondary journeys support production customers comparing capability and one-off customers checking suitability.

## Component and content architecture

Server-rendered header/mobile menu, footer, page hero, service rows, process steps and FAQ disclosure. The multi-step quote form is a client component because it requires progress, validation and local draft state. Project galleries and the client-logo wall use small client components so Media Studio content can appear without a rebuild. Shared content lives in `lib/content.ts`; approved public contact/social details are centralised in `lib/business.ts`.

## Architecture decisions

1. Next.js App Router, strict TypeScript and Tailwind; server components by default.
2. The supplied FLOWCOAT master artwork is stored as a browser-ready raster asset derived from the supplied PDF; it must not be redrawn or substituted with a recreated mark.
3. Media Studio stores uploaded project media and client logos outside the repository. In production `FLOWCOAT_MEDIA_DIR` must point to a persistent writable location.
4. Public project and client-logo galleries combine Media Studio files with bundled repository assets and update without a rebuild.
5. Production Media Studio and upload/delete requests are protected by HTTP Basic Authentication using `FLOWCOAT_MEDIA_USERNAME` and `FLOWCOAT_MEDIA_PASSWORD`. If no production password is configured, the admin surface fails closed.
6. Quote submission posts to `/api/quote`, validates required fields server-side, uses a honeypot and process-level rate limit, generates an `FC-...` reference, and sends the enquiry through the configured SMTP transport.
7. The quote email uses `noreply@flowcoat.com.au` as the website sender, `sale@flowcoat.com.au` as the notification recipient and the customer's supplied address as Reply-To.
8. Quote drafts remain in local browser storage until successful delivery; the site does not show success or clear the draft when delivery fails.
9. No customer database is required for the first release. Supabase/CRM can be added later for quote history, private file records and workflow automation.
10. Metadata uses an environment-driven canonical origin. Sitemap and robots are generated routes.

## Security and privacy

SMTP passwords, Media Studio passwords and future service-role keys belong only in server environment variables and must never be committed to GitHub or exposed through `NEXT_PUBLIC_` variables. Quote data is validated and length-limited before email delivery. Customer quote attachments must never be stored in the public Media Studio library.

The current in-memory quote rate limit is appropriate as a baseline for a single Node process/private launch. If the site later runs across multiple instances or sees meaningful abuse, replace it with shared rate limiting and add a stronger anti-bot control such as Cloudflare Turnstile.

## Phases and current status

1. **Foundation complete:** Flowcoat content, tokens, shell, homepage and metadata.
2. **Core front end complete:** required pages, FAQ and locally saved multi-step quote journey.
3. **Public-media workflow complete:** Media Studio, persistent media directory support, project photography/client-logo management and production password protection.
4. **Public contact/social complete:** approved phone, sales email, factory address and Instagram are published.
5. **Brand artwork complete:** supplied FLOWCOAT master artwork replaces the earlier recreated mark.
6. **Quote backend complete in code:** server validation, spam baseline, reference generation, SMTP notification, Reply-To behaviour and success/failure handling are implemented. Production activation requires the host to set the SMTP environment variables.
7. **Quality/deployment:** `npm run verify`, private-server deployment, live SMTP test, Media Studio persistence test, browser/device and accessibility checks remain.

## Remaining launch work

Configure the server environment; deploy privately; run `npm run verify`; perform a real quote submission to `sale@flowcoat.com.au`; confirm Reply-To; verify Media Studio login and persistence; confirm HTTPS/canonical redirects; add final approved project/client assets; and perform final device/accessibility checks. Customer file uploads, analytics, CRM and a quote database can remain post-launch additions.
