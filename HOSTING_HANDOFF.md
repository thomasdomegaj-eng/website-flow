# FLOWCOAT private-launch hosting handoff

Source of truth for deploying `https://flowcoat.com.au`.

## Application

- Repository: `https://github.com/thomasdomegaj-eng/website-flow`
- Branch: `main`
- Next.js 14 App Router
- Node.js 20 LTS
- Package manager: npm
- Health check: `GET /api/health`
- Quote endpoint: `POST /api/quote`
- Private content manager: `/media-studio`

Please deploy from GitHub rather than a copied ZIP.

## Build and run

```bash
git clone https://github.com/thomasdomegaj-eng/website-flow.git
cd website-flow
nvm use || nvm install 20
npm install
npm run verify
npm start
```

If `nvm` is not used, run Node.js 20 LTS directly. Keep the Node process alive with the platform's normal process manager.

## Required server environment

```dotenv
NEXT_PUBLIC_SITE_URL=https://flowcoat.com.au

FLOWCOAT_MEDIA_DIR=/absolute/persistent/path/flowcoat-media
FLOWCOAT_MEDIA_USERNAME=flowcoat
FLOWCOAT_MEDIA_PASSWORD=<PRIVATE_MEDIA_STUDIO_PASSWORD>

SMTP_HOST=mail-au.smtp2go.com
SMTP_PORT=2525
SMTP_SECURE=false
SMTP_USERNAME=noreply@flowcoat.com.au
SMTP_PASSWORD=<PRIVATE_SMTP_PASSWORD>
FLOWCOAT_FROM_EMAIL=noreply@flowcoat.com.au
FLOWCOAT_NOTIFICATION_EMAIL=sale@flowcoat.com.au
```

`SMTP_SECURE=false` is intentional on port 2525: the app requires STARTTLS. Store both passwords only in the hosting environment/secret manager. Never commit them to GitHub and never expose them through `NEXT_PUBLIC_` variables.

For the initial private test, use the SMTP password already supplied by the email team. It can be rotated before public launch without any code change.

## Quote workflow

When the SMTP environment is configured, the Request a Quote form:

- validates required fields server-side;
- applies a honeypot and basic rate limiting;
- creates an `FC-...` reference;
- sends from `noreply@flowcoat.com.au` to `sale@flowcoat.com.au`;
- sets the customer's supplied email as Reply-To;
- shows success only after delivery succeeds;
- clears the local browser draft only after success.

If delivery fails, the customer sees an error and the draft remains on their device.

## Media Studio

Private URL: `https://flowcoat.com.au/media-studio`

Production access is HTTP Basic Auth using `FLOWCOAT_MEDIA_USERNAME` and `FLOWCOAT_MEDIA_PASSWORD`.

`FLOWCOAT_MEDIA_DIR` must be a persistent writable directory outside the deployment/release directory. It must survive restarts and redeployments and should be backed up. The Node process needs read/write access.

Media Studio manages approved public project photos and approved client/company logos. Customer quote attachments must not be placed there.

## HTTPS / reverse proxy

Please install a valid TLS certificate, force HTTP to HTTPS, redirect the non-canonical hostname to `https://flowcoat.com.au`, preserve forwarded host/protocol headers, and allow request bodies large enough for Media Studio uploads. The app accepts images up to 20 MB each and up to 25 files per batch.

## Private-launch verification

Before handing the test deployment back, please verify:

1. `npm install` completes.
2. `npm run verify` succeeds.
3. `GET /api/health` returns `ok: true`.
4. Main public pages load without errors.
5. `/media-studio` prompts for credentials and rejects incorrect credentials.
6. Correct Media Studio credentials allow a project image and client-logo upload.
7. Uploaded media survives an application restart.
8. One real quote submitted through the website arrives at `sale@flowcoat.com.au`.
9. The message is sent from `noreply@flowcoat.com.au`.
10. Reply addresses the customer's submitted email.
11. The `FC-...` reference on the success screen matches the email.
12. HTTPS and canonical-host redirects work.
13. Neither password exists in the Git checkout or page source.

## Future updates

```bash
git pull origin main
npm install
npm run verify
# restart/reload the Node process using the host's process manager
```

Never delete `FLOWCOAT_MEDIA_DIR` during deployment.

If anything differs from these assumptions, please send the exact hosting stack (cPanel/Plesk Node app, VPS + Nginx, Docker, managed Node host, etc.) and any relevant error output so platform-specific settings can be provided.
