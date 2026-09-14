# FLOWCOAT private-launch hosting handoff

Source of truth for deploying `https://flowcoat.com.au`.

## Application

- Repository: `https://github.com/thomasdomegaj-eng/website-flow`
- Branch: `main`
- Next.js 14 App Router
- Node.js 20 LTS
- Package manager: npm
- Windows Plesk startup file: `app.js`
- Health check: `GET /api/health`
- Quote endpoint: `POST /api/quote`
- Private content manager: `/media-studio`

Please deploy from GitHub rather than a copied ZIP.

## Windows Plesk setup

The application now includes a root-level `app.js` specifically so it can be started by Windows Plesk/iisnode. It starts the existing Next.js production build and listens on the `PORT` supplied by Plesk.

For the FLOWCOAT domain in Plesk please use:

- Node.js version: **20 LTS**
- Application Mode: **Production**
- Application Root: the folder containing `package.json` and `app.js`
- Document Root: the same folder as Application Root (required by Plesk for Windows Node.js apps)
- Application Startup File: **`app.js`**
- Package manager: npm

Then run:

```text
npm install
npm run verify
```

After `npm run verify` succeeds, restart the Node.js application in Plesk. `npm start` also starts the same `app.js` compatibility server when running outside the Plesk startup-file control.

### Windows Plesk secrets / environment values

Plesk's documented custom-environment-variable UI is Linux-only. For this Windows deployment, the simplest option is to create a private file named **`.env.production.local`** in the application root on the server.

That file is already excluded by the repository `.gitignore`, so it must stay server-only and must never be committed.

Use:

```dotenv
NEXT_PUBLIC_SITE_URL=https://flowcoat.com.au

FLOWCOAT_MEDIA_DIR=<PERSISTENT_WRITABLE_WINDOWS_PATH>
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

If the server administrator prefers to set these values at the IIS/iisnode or Windows service environment level instead, that is also fine. The important requirement is that they are available to `process.env` for the Node.js process and are not stored in GitHub or publicly served files.

`SMTP_SECURE=false` is intentional on port 2525: the application requires STARTTLS. For the initial private test, use the SMTP password already supplied by the email team. It can be rotated before public launch without any code change.

## General build/run alternative

On a normal Node host outside Plesk:

```bash
git clone https://github.com/thomasdomegaj-eng/website-flow.git
cd website-flow
npm install
npm run verify
npm start
```

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

`FLOWCOAT_MEDIA_DIR` must be a persistent writable directory outside any folder that is replaced during deployment. It must survive restarts/redeployments and should be backed up. The Windows account running the Node.js application needs read/write permission to it.

Media Studio manages approved public project photos and approved client/company logos. Customer quote attachments must not be placed there.

## HTTPS / IIS

Please install a valid TLS certificate, force HTTP to HTTPS, redirect the non-canonical hostname to `https://flowcoat.com.au`, and allow request bodies large enough for Media Studio uploads. The app accepts images up to 20 MB each and up to 25 files per batch.

Windows Plesk runs Node.js through IIS/iisnode. If startup fails, the relevant Node application logs are available in the Plesk/IIS iisnode logs; please send the exact error output back rather than changing application code blindly.

## Compatibility note

Plesk does not currently advertise native Next.js support. This repository therefore uses a standard Next.js custom Node server (`app.js`) as a Windows-Plesk compatibility layer. It keeps the existing Next.js pages, API routes, SMTP quote backend and Media Studio functionality intact, but this deployment path still needs to be proven on the actual server.

If the Windows Plesk/iisnode environment cannot run the custom server reliably, the fallback is a normal Node/Linux VPS or another host that supports running `next start`/Node applications directly. A static export is not suitable because FLOWCOAT needs server API routes, SMTP submission and Media Studio writes.

## Private-launch verification

Before handing the test deployment back, please verify:

1. `npm install` completes.
2. `npm run verify` succeeds.
3. Plesk starts `app.js` successfully in Production mode.
4. `GET /api/health` returns `ok: true`.
5. Main public pages load without errors.
6. `/media-studio` prompts for credentials and rejects incorrect credentials.
7. Correct Media Studio credentials allow a project image and client-logo upload.
8. Uploaded media survives a Node application restart.
9. One real quote submitted through the website arrives at `sale@flowcoat.com.au`.
10. The message is sent from `noreply@flowcoat.com.au`.
11. Reply addresses the customer's submitted email.
12. The `FC-...` reference on the success screen matches the email.
13. HTTPS and canonical-host redirects work.
14. Neither password exists in the Git checkout or page source.

## Future updates

```text
git pull origin main
npm install
npm run verify
```

Then restart the Node.js application in Plesk.

Never delete `FLOWCOAT_MEDIA_DIR` during deployment.

If anything differs from these assumptions, please send the exact Plesk/Node/iisnode error output and we can adjust the compatibility setup.
