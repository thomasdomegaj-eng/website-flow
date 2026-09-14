# FLOWCOAT website

Commercial powder-coating website built with Next.js App Router, strict TypeScript and Tailwind CSS. Business rules live in `BUSINESS_BRIEF.md`; implementation decisions and launch blockers live in `PROJECT_SPEC.md`.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Set `NEXT_PUBLIC_SITE_URL` to the production HTTPS origin.

## Quote submission

The Request a Quote form submits to the server-side `/api/quote` endpoint. The server validates the required fields, applies a honeypot and basic rate limiting, creates an `FC-...` reference, and sends the enquiry through the configured SMTP account to `sale@flowcoat.com.au`. The customer's email is set as Reply-To. SMTP credentials are server-only environment variables and must never be committed to GitHub.

If delivery fails, the form shows an error and keeps the customer's locally saved draft. The draft is cleared only after a successful send.

## Media Studio

Approved public project photography and approved client/company logos can be managed at `/media-studio`.

In local development, the Studio works without a password unless `FLOWCOAT_MEDIA_PASSWORD` is explicitly set. It accepts JPG, PNG, WebP and AVIF images, stores uploads outside the downloaded repository under `~/.flowcoat-media` by default, and makes them available to the relevant public galleries without rebuilding the site.

In production, Media Studio is fail-closed: it is available only when both a persistent `FLOWCOAT_MEDIA_DIR` and a `FLOWCOAT_MEDIA_PASSWORD` are configured. The Studio itself and all upload/delete requests are protected by HTTP Basic Authentication. `FLOWCOAT_MEDIA_USERNAME` defaults to `flowcoat`.

Production media must use a persistent writable directory outside the application/deployment directory. Uploaded project images and client logos are public website content once uploaded, while the upload/delete administration surface remains password protected. Media Studio uploads are not committed to GitHub automatically.

## Adding permanent photos, logos and creative

Use the documented folders under `public/assets/`:

- `brand/` — supplied FLOWCOAT logo and brand assets
- `projects/` — approved production and finished-work photography committed with the website
- `client-logos/` — approved company logos for the homepage logo wall
- `creative/` — campaign imagery, poster frames and general creative

The supplied FLOWCOAT master artwork is used from `public/assets/brand/flowcoat-master-logo.webp`. It was rasterised from the supplied PDF for browser delivery; the artwork itself was not redrawn, traced or recreated.

Bundled project photography and client logos are combined with the Media Studio libraries. Read `public/assets/README.md` for naming, optimisation, privacy and permission rules. Customer quote attachments must **never** be placed in these public media folders.

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Deployment

See `HOSTING_HANDOFF.md` for the production handoff for `flowcoat.com.au`.

The app requires a normal Node.js/Next.js runtime. A persistent-filesystem host can use Media Studio directly by setting `FLOWCOAT_MEDIA_DIR`. Serverless hosts with ephemeral filesystems need persistent/object storage before Media Studio uploads can be relied on across deployments.

## Important launch status

The supplied FLOWCOAT master artwork, public phone, sales email, factory address and Instagram are published. The quote-email backend is implemented and becomes active when the SMTP environment variables in `.env.example` are configured on the server. Media Studio is ready for production once persistent storage and its password are configured. Customer quote-file upload can remain a post-launch feature. See `PROJECT_SPEC.md` for remaining launch checks.
