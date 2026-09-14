# FLOWCOAT production hosting handoff

This is the deployment handoff for the FLOWCOAT website at **flowcoat.com.au**.

## Source

- GitHub repository: `https://github.com/thomasdomegaj-eng/website-flow`
- Production branch: `main`
- Framework: Next.js 14 App Router
- Runtime: Node.js
- Styling: Tailwind CSS
- Recommended Node version: Node 20 LTS

Please deploy from GitHub rather than from a manually copied ZIP so future updates can be pulled/redeployed cleanly.

## Business details currently approved for the site

- Phone: **0447 771 304**
- Factory: **193–195 Power St, Glendenning NSW 2761**
- Public email: **not confirmed yet**

## Standard install/build/run

From a clean checkout:

```bash
npm install
npm run typecheck
npm run build
npm start
```

The app can sit behind Nginx, Apache, Caddy, a hosting-panel reverse proxy or another HTTPS reverse proxy. The public origin should be `https://flowcoat.com.au` (and optionally redirect `www.flowcoat.com.au` to the preferred canonical host).

A typical environment file/config should contain:

```dotenv
NEXT_PUBLIC_SITE_URL=https://flowcoat.com.au

FLOWCOAT_MEDIA_DIR=/absolute/persistent/path/flowcoat-media
FLOWCOAT_MEDIA_USERNAME=flowcoat
FLOWCOAT_MEDIA_PASSWORD=<LONG_RANDOM_SECRET_PASSWORD>
```

Do **not** commit the real password to GitHub. Generate a long random password and store it only in the hosting environment/secret manager.

## Media Studio / project photos

FLOWCOAT has a private project-image administration page at:

`https://flowcoat.com.au/media-studio`

It is protected by HTTP Basic Authentication in production. The default username is `flowcoat` unless `FLOWCOAT_MEDIA_USERNAME` is changed. The password comes only from `FLOWCOAT_MEDIA_PASSWORD`.

Important storage requirement: `FLOWCOAT_MEDIA_DIR` must point to a **persistent, writable directory outside the application/release directory**. Uploaded project photos are stored under:

`$FLOWCOAT_MEDIA_DIR/projects`

That directory must survive code deployments/restarts and should be backed up. The Node process needs read/write permission to it.

The public Home and Projects galleries read from that media directory and update almost immediately after an authorised upload. The image files themselves are intentionally public once published to the website; only the administration/upload/delete surface is private.

### Serverless warning

If the intended host uses an ephemeral/serverless filesystem (for example a platform where local files disappear on redeploy/restart), do not rely on filesystem Media Studio storage. Either host the Next.js app on a normal persistent Node server/VPS or move project media to persistent object storage first.

## HTTPS is required

Please issue/install a valid TLS certificate and force HTTPS before handing over Media Studio credentials. Basic Authentication must not be used over plain HTTP on the public internet.

Recommended redirects:

- HTTP → HTTPS
- non-canonical hostname → `https://flowcoat.com.au`

## Reverse proxy / upload considerations

Media Studio currently accepts JPG, JPEG, PNG, WebP and AVIF images, up to 20 MB per image and up to 25 selected files per upload. Configure the reverse proxy/request-body limit high enough for the intended upload workflow, otherwise the proxy may reject an upload before Next.js sees it.

## Current application status

Working now:

- public responsive website and main pages;
- Home and Projects galleries;
- protected Media Studio for project-image upload/delete;
- near-live gallery updates after Media Studio uploads;
- published phone number and factory address;
- SEO metadata and LocalBusiness structured data.

Not enabled yet:

- quote-form submission to the business;
- customer quote-file uploads;
- public email address;
- Supabase/CRM/Resend integrations.

The quote UI can be viewed, but it intentionally does not pretend to submit until the proper backend is configured.

## Production verification checklist

After deployment please verify:

1. `https://flowcoat.com.au` loads with no console/server errors.
2. `/services`, `/process`, `/projects`, `/contact` and `/quote` load.
3. Contact page shows the approved phone and Glendenning address.
4. `/media-studio` asks for credentials before displaying the admin interface.
5. Wrong Media Studio credentials are rejected.
6. Correct credentials allow an image upload.
7. The uploaded image appears on `/projects` and the Home page.
8. The uploaded image is still present after restarting/redeploying the app.
9. `npm run typecheck` and `npm run build` pass on the deployment source.
10. HTTPS and canonical-host redirects work.

## Updating later

For normal website updates, pull/redeploy `main` from the GitHub repository. Do not delete the persistent media directory during deployment. The media library is intentionally separate from the Git checkout so content survives code releases.

If you need any environment variable or hosting-specific change clarified, please send back the hosting platform/runtime details (for example VPS + Nginx, cPanel Node app, Plesk, Docker, Vercel, etc.) so the deployment instructions can be made exact for that environment.
