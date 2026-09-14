# Ready-to-send message for the website hosting team

**Subject: FLOWCOAT website – private server launch and test setup**

Hi,

We are ready to do a private test deployment of the FLOWCOAT website on your servers before making it public.

Source:
`https://github.com/thomasdomegaj-eng/website-flow`

Please deploy the **main** branch using **Node.js 20 LTS**.

The full technical handoff is here:
`https://github.com/thomasdomegaj-eng/website-flow/blob/main/HOSTING_HANDOFF.md`

The basic deployment commands are:

```bash
npm install
npm run verify
npm start
```

Please configure the server-side environment values described in `HOSTING_HANDOFF.md`. In particular, the website now needs the Media Studio credentials and the SMTP settings for `noreply@flowcoat.com.au`. Please use the SMTP password Shehpar supplied to me in the email thread, and keep all passwords only in the hosting environment/secret manager — not in GitHub or public configuration files.

The Request a Quote form is now wired so successful submissions are sent to `sale@flowcoat.com.au` from `noreply@flowcoat.com.au`, with the customer's email used as Reply-To. The website also has a password-protected `/media-studio` page for project photos and client logos, which requires persistent writable storage.

For this first deployment, could you please keep it private/non-public while we test everything end-to-end, then let me know the test URL or when the domain is ready for testing.

Once it is running, please work through the verification checklist in `HOSTING_HANDOFF.md`, especially `npm run verify`, `/api/health`, Media Studio login/upload/persistence, one real quote submission through to `sale@flowcoat.com.au`, Reply-To going back to the customer's address, and HTTPS/redirects.

If you can also tell me the hosting stack you are using (cPanel, Plesk, VPS/Nginx, Docker, etc.), that will help if any platform-specific configuration is needed.

Thanks.
