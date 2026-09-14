# FLOWCOAT production hosting handoff

This file is the source-of-truth deployment handoff for **https://flowcoat.com.au**.

## 60-second summary

- Repository: `https://github.com/thomasdomegaj-eng/website-flow`
- Production branch: `main`
- Framework: Next.js 14 App Router
- Runtime: Node.js 20 LTS (`.nvmrc` included)
- Package manager: npm
- Public domain: `https://flowcoat.com.au`
- Health check after launch: `https://flowcoat.com.au/api/health`
- Persistent writable project-media directory required for Media Studio uploads
- Media Studio is password-protected in production
- Quote submission email backend is being prepared; SMTP values can be supplied later as environment variables without changing hosting architecture

Please deploy from GitHub rather than from a copied ZIP so future updates can be pulled/redeployed cleanly.

## Business details

- Phone: **0447 771 304**
- Email: **sale@flowcoat.com.au**
- Factory: **193–195 Power St, Glendenning NSW 2761**

## Fastest clean deployment

```bash
git clone https://github.com/thomasdomegaj-eng/website-flow.git
cd website-flow
nvm use || nvm install 20
npm install
npm run verify
npm start
```

`npm run verify` runs the TypeScript check followed by the production Next.js build.

If the host does not use `nvm`, use Node.js 20 LTS directly.

The app may sit behind Nginx, Apache, Caddy, a hosting-panel reverse proxy, Docker ingress, or another HTTPS reverse proxy.

## Production environment variables

Minimum production configuration:

```dotenv
NEXT_PUBLIC_SITE_URL=https://flowcoat.com.au

FLOWCOAT_MEDIA_DIR=/absolute/persistent/path/flowcoat-media
FLOWCOAT_MEDIA_USERNAME=flowcoat
FLOWCOAT_MEDIA_PASSWORD=<LONG_RANDOM_SECRET_PASSWORD>

FLOWCOAT_NOTIFICATION_EMAIL=sale@flowcoat.com.au
```

Do not commit real passwords, SMTP passwords, API keys or other secrets to GitHub. Put them in the host's environment/secret manager.

### Quote-email variables — add when SMTP details are confirmed

The intended quote workflow is server-side submission -> validation/spam controls -> email to `sale@flowcoat.com.au`, with the customer's email used as Reply-To.

The exact variable names will be finalised with the SMTP implementation, but the host should be ready to provide/store:

```dotenv
SMTP_HOST=
SMTP_PORT=
SMTP_SECURE=
SMTP_USERNAME=
SMTP_PASSWORD=
FLOWCOAT_NOTIFICATION_EMAIL=sale@flowcoat.com.au
```

If the host prefers an email API service instead of SMTP, tell us before final quote-backend wiring and we can use that instead.

## Media Studio / project photos

Private administration page:

`https://flowcoat.com.au/media-studio`

In production it is protected by HTTP Basic Authentication. Username defaults to `flowcoat` unless `FLOWCOAT_MEDIA_USERNAME` is set. Password is supplied only through `FLOWCOAT_MEDIA_PASSWORD`.

`FLOWCOAT_MEDIA_DIR` must be a **persistent writable directory outside the release/application directory**. Images are stored under:

`$FLOWCOAT_MEDIA_DIR/projects`

Requirements:

- Node process has read/write access;
- directory survives deployments and restarts;
- directory is included in backups;
- deployments must never delete it.

The public Home and Projects galleries read from this library and update almost immediately after an authorised upload.

### Serverless warning

If the hosting platform uses an ephemeral filesystem, local Media Studio storage is not suitable. Either use a persistent Node/VPS filesystem or tell us so project media can be moved to object storage before production.

## HTTPS and reverse proxy

Please:

- issue/install a valid TLS certificate;
- force HTTP -> HTTPS;
- redirect the non-canonical hostname to the chosen canonical host;
- preserve the original host/protocol headers expected by Next.js;
- allow sufficiently large request bodies for Media Studio uploads.

Media Studio accepts JPG/JPEG, PNG, WebP and AVIF, up to 20 MB per image and up to 25 selected files per upload. The reverse-proxy body limit must therefore not be set too low.

For extra hardening, rate-limit repeated failed requests to `/media-studio` and non-GET requests to `/api/project-media` if practical.

## Process manager / uptime

Run the production process with the host's normal Node process manager (for example systemd, PM2, Plesk/cPanel Node application manager, Docker restart policy, etc.). It should automatically restart after machine reboot or process failure.

The production start command is:

```bash
npm start
```

By default Next.js listens on port 3000 unless the host supplies `PORT`.

## Health check

After starting the app, request:

`GET /api/health`

A healthy response returns JSON with `ok: true`. This endpoint exposes no secrets and can be used by the host's uptime/load-balancer checks.

## Current application status

Working now:

- responsive public website and main pages;
- Home and Projects galleries;
- password-protected Media Studio for project-image upload/delete;
- persistent project-media storage when configured correctly;
- near-live gallery updates;
- public phone, sales email and factory address;
- SEO metadata and LocalBusiness structured data;
- production health-check endpoint.

Not enabled yet:

- quote-form email submission backend;
- customer quote-file uploads;
- Supabase/CRM integrations.

The quote UI currently does not fake a successful submission. SMTP/email wiring will be added once mail-server details are supplied.

## Production verification checklist

Before launch please verify all of the following:

1. `npm run verify` succeeds on the production source.
2. `https://flowcoat.com.au/api/health` returns `ok: true`.
3. Home, Services, Process, Projects, Contact and Quote pages load without server errors.
4. Contact page shows 0447 771 304, sale@flowcoat.com.au and the Glendenning address.
5. `/media-studio` prompts for credentials.
6. Incorrect Media Studio credentials fail.
7. Correct credentials allow an image upload.
8. Uploaded image appears on Projects and Home.
9. Uploaded image survives an application restart/redeployment.
10. HTTPS and canonical-host redirects work.
11. Media Studio credentials are not present in the Git checkout.
12. Persistent media storage is included in backups.

When quote submission is enabled later, also test one real quote from the website through to `sale@flowcoat.com.au` and verify Reply-To points to the customer's email.

## Future updates

Normal release flow should be:

```bash
git pull origin main
npm install
npm run verify
# restart/reload the Node process using the host's process manager
```

Never delete `FLOWCOAT_MEDIA_DIR` during deployment.

## If anything is unclear

Please send back the exact hosting stack/platform (for example VPS + Nginx, cPanel Node app, Plesk, Docker, managed Node host, etc.) and we can provide exact platform-specific configuration instead of asking the hosting team to reverse-engineer anything.
