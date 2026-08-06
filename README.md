# FLOWCOAT website

Commercial powder-coating website built with Next.js App Router, strict TypeScript and Tailwind CSS. Business rules live in `BUSINESS_BRIEF.md`; implementation decisions and launch blockers live in `PROJECT_SPEC.md`.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Set `NEXT_PUBLIC_SITE_URL` to the production HTTPS origin.

## Adding photos, logos and creative

Use the documented folders under `public/assets/`:

- `brand/` — supplied FLOWCOAT logo and brand assets
- `projects/` — approved production and finished-work photography
- `client-logos/` — approved company logos for the homepage logo wall
- `creative/` — campaign imagery, poster frames and general creative

Project photography and raster client logos are discovered and laid out automatically at build time. Read `public/assets/README.md` for naming, optimisation, privacy and permission rules. Customer quote attachments must **never** be placed in these public folders.

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Deployment

Import the GitHub repository into Vercel, select the Next.js preset, add `NEXT_PUBLIC_SITE_URL`, and deploy. A Node.js host can run `npm run build && npm start`.

## Important launch status

The visual palette and text wordmark are provisional until the supplied logo is added and inspected. Quote drafts save in the customer’s browser, but submission and file upload are deliberately disabled until public contact details, Supabase private storage, validation, retention, spam controls and Resend are configured. See `PROJECT_SPEC.md` for all blockers.
