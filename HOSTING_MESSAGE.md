# Ready-to-send message for the website hosting team

**Subject: FLOWCOAT website – private server launch and test setup**

Hi,

We are ready to do a private test deployment of the FLOWCOAT website on your servers before making it public.

Source:
`https://github.com/thomasdomegaj-eng/website-flow`

Please deploy the **main** branch using **Node.js 20 LTS**.

Full technical handoff:
`https://github.com/thomasdomegaj-eng/website-flow/blob/main/HOSTING_HANDOFF.md`

Basic deployment:

```bash
npm install
npm run verify
npm start
```

Please configure the server-side environment values in `HOSTING_HANDOFF.md`. The site now needs the Media Studio credentials plus the SMTP settings for `noreply@flowcoat.com.au`. Please use the SMTP password Shehpar already supplied to me in the email thread. Keep all passwords only in the hosting environment/secret manager — not in GitHub or public configuration files.

The Request a Quote form is wired so successful submissions are sent to `sale@flowcoat.com.au` from `noreply@flowcoat.com.au`, with the customer's email used as Reply-To. `/media-studio` is password protected and manages project photos/client logos using persistent writable storage.

For this first deployment, could you please keep the **entire website private while we test it**, preferably using temporary site-wide HTTP Basic Auth or the equivalent hosting-panel password protection. Please also prevent indexing on the private test deployment. Once it is running, send me the test URL and temporary access details securely.

Please work through the verification checklist in `HOSTING_HANDOFF.md`, especially:
- `npm run verify`
- `/api/health`
- Media Studio login/upload/persistence
- one real quote submission through to `sale@flowcoat.com.au`
- Reply-To going back to the customer's address
- HTTPS and redirects

If you can also tell me the hosting stack you are using (cPanel, Plesk, VPS/Nginx, Docker, etc.), that will help if any platform-specific configuration is needed.

Thanks.
