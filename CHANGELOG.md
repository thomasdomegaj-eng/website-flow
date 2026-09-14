# Changelog

All notable changes are documented here.

## 2.3.0 — 2026-09-14

- Added production password protection for `/media-studio` and all project-media upload/delete requests.
- Production Media Studio now requires a persistent `FLOWCOAT_MEDIA_DIR`; if no password is configured, the admin surface fails closed.
- Added approved public phone number and Glendenning factory address across Contact, footer and LocalBusiness structured data.
- Added `HOSTING_HANDOFF.md` with production deployment, environment, HTTPS and persistent-media requirements for `flowcoat.com.au`.

## 2.2.0 — 2026-09-14

- Added a FLOWCOAT Media Studio at `/media-studio` for uploading and deleting project photography.
- Local test media persists outside downloaded website ZIPs in `~/.flowcoat-media/projects` by default.
- Project galleries now refresh live through same-browser notifications plus a two-second fallback poll, without rebuilding Next.js.
- Bundled `public/assets/projects` photography and Media Studio uploads are shown together.

## 2.1.1 — 2026-08-07

- Refined the FC circle mark to centre the split field and separate the F and C forms for clearer reproduction at navigation sizes.

## 2.1.0 — 2026-08-06

- Simplified the primary navigation and homepage content hierarchy.
- Added the FLOWCOAT circle mark and matching red, charcoal and white brand palette.
- Introduced “Industrial Finishes.” as the primary brand line across the hero, logo lockup, metadata and footer.

## 1.0.0 — 2026-08-06

- Established the Fieldwork draft brand and responsive design-token system.
- Added home, work, approach, about, contact, privacy and not-found experiences.
- Added accessible navigation, calls to action, metadata, sitemap and robots routes.
- Added project specification, contributor guidance, environment template and deployment instructions.

## 2.0.0 — 2026-08-06

- Replaced the fictional Fieldwork identity and content with the supplied FLOWCOAT business brief.
- Added dedicated Services, Capabilities, Projects, Process, Quote, FAQ and Terms experiences.
- Added an accessible locally saved multi-step quote journey with honest disabled submission and upload states pending secure integrations.
- Added automatic build-time project and approved-client-logo galleries plus documented brand, project, logo and creative drop zones.
- Added business brief, content guide, claims register, architecture decisions and explicit launch blockers.
- Reworked the responsive visual system into a provisional industrial FLOWCOAT direction pending inspection of the supplied logo.
