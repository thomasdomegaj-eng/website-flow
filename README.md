# FLOWCOAT website

Commercial powder-coating website built with Next.js App Router, strict TypeScript and Tailwind CSS. Business rules live in `BUSINESS_BRIEF.md`; implementation decisions and launch blockers live in `PROJECT_SPEC.md`.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Set `NEXT_PUBLIC_SITE_URL` to the production HTTPS origin.

## Local Media Studio

While running `npm run dev`, a second local interface is available at `http://localhost:3000/media-studio`.

It is deliberately development-only. It accepts JPG, PNG, WebP and AVIF project images, stores them outside the downloaded repository in `~/.flowcoat-media/projects` by default, and makes them available to the homepage and Projects gallery immediately. The public gallery listens for same-browser upload notifications and also polls every two seconds, so another open tab updates without rebuilding the site.

Set `FLOWCOAT_MEDIA_DIR` in `.env.local` if you want the local media library somewhere else. Deleting or replacing the downloaded website code does not delete the default local media library. Local Studio images are not committed to GitHub automatically.

## Adding permanent photos, logos and creative

Use the documented folders under `public/assets/`:

- `brand/` — supplied FLOWCOAT logo and brand assets
- `projects/` — approved production and finished-work photography committed with the website
- `client-logos/` — approved company logos for the homepage logo wall
- `creative/` — campaign imagery, poster frames and general creative

Bundled project photography is combined with the development Media Studio library while running locally. Raster client logos are still discovered from the repository. Read `public/assets/README.md` for naming, optimisation, privacy and permission rules. Customer quote attachments must **never** be placed in these public folders.

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Deployment

Import the GitHub repository into Vercel, select the Next.js preset, add `NEXT_PUBLIC_SITE_URL`, and deploy. A Node.js host can run `npm run build && npm start`. The local Media Studio upload/delete interface returns 404 in production.

## Important launch status

The FLOWCOAT mark is currently rendered as a responsive vector interpretation of the supplied logo. Quote drafts save in the customer’s browser, but submission and customer file upload are deliberately disabled until public contact details, Supabase private storage, validation, retention, spam controls and Resend are configured. The Media Studio is only for approved public project photography and is separate from future customer quote attachments. See `PROJECT_SPEC.md` for all blockers.
