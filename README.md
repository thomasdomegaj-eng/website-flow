# FLOWCOAT website

Commercial powder-coating website built with Next.js App Router, strict TypeScript and Tailwind CSS. Business rules live in `BUSINESS_BRIEF.md`; implementation decisions and launch blockers live in `PROJECT_SPEC.md`.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Set `NEXT_PUBLIC_SITE_URL` to the production HTTPS origin.

## Media Studio

The project gallery can be managed at `/media-studio`.

In local development, the Studio works without a password unless `FLOWCOAT_MEDIA_PASSWORD` is explicitly set. It accepts JPG, PNG, WebP and AVIF project images, stores them outside the downloaded repository in `~/.flowcoat-media/projects` by default, and makes them available to the homepage and Projects gallery immediately. The public gallery listens for same-browser upload notifications and also polls every two seconds, so another open tab updates without rebuilding the site.

In production, Media Studio is fail-closed: it is available only when both a persistent `FLOWCOAT_MEDIA_DIR` and a `FLOWCOAT_MEDIA_PASSWORD` are configured. The Studio itself and all upload/delete requests are protected by HTTP Basic Authentication. `FLOWCOAT_MEDIA_USERNAME` defaults to `flowcoat`.

Production media must use a persistent writable directory outside the application/deployment directory. Uploaded project images are public website content once uploaded, while the upload/delete administration surface remains password protected. Media Studio images are not committed to GitHub automatically.

## Adding permanent photos, logos and creative

Use the documented folders under `public/assets/`:

- `brand/` — supplied FLOWCOAT logo and brand assets
- `projects/` — approved production and finished-work photography committed with the website
- `client-logos/` — approved company logos for the homepage logo wall
- `creative/` — campaign imagery, poster frames and general creative

Bundled project photography is combined with the Media Studio library. Raster client logos are still discovered from the repository. Read `public/assets/README.md` for naming, optimisation, privacy and permission rules. Customer quote attachments must **never** be placed in these public project-media folders.

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

The FLOWCOAT mark is currently rendered as a responsive vector interpretation of the supplied logo. The approved public phone number and Glendenning factory address are now wired into the site; the public email is still to be confirmed. Quote drafts save in the customer’s browser, but quote submission and customer file upload remain deliberately disabled until Supabase/private storage, validation, retention, spam controls and Resend are configured. Media Studio is only for approved public project photography and is separate from future customer quote attachments. See `PROJECT_SPEC.md` for all remaining blockers.
