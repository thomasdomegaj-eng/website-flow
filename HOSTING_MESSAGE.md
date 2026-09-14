# Ready-to-send message for the website hosting team

**Subject: FLOWCOAT website deployment – GitHub source and hosting handoff**

Hi,

The FLOWCOAT website is ready for production hosting on **flowcoat.com.au**.

The production source is here:

`https://github.com/thomasdomegaj-eng/website-flow`

Please deploy the **main** branch.

A complete deployment handoff is included in the repository here:

`https://github.com/thomasdomegaj-eng/website-flow/blob/main/HOSTING_HANDOFF.md`

The short version is:

- Next.js 14 / Node.js 20 LTS
- install: `npm install`
- production verification: `npm run verify`
- run: `npm start`
- public URL: `https://flowcoat.com.au`
- health check: `https://flowcoat.com.au/api/health`
- the private `/media-studio` page requires server-side credentials
- project-image uploads require a persistent writable directory outside the application release directory
- HTTPS should be forced before Media Studio credentials are used

Please set the production environment variables described in `HOSTING_HANDOFF.md`. In particular, the Media Studio password must be stored privately on the server and must not be committed to GitHub.

Current business details already published in the website are:

- Phone: 0447 771 304
- Email: sale@flowcoat.com.au
- Address: 193–195 Power St, Glendenning NSW 2761

The Request a Quote frontend is already built. We are separately obtaining SMTP details so the final backend can email submitted enquiries directly to `sale@flowcoat.com.au`. Once those mail details are confirmed, the SMTP secrets can be added as server environment variables without changing the basic hosting setup.

Could you please let us know what hosting stack you are using (for example cPanel/Plesk Node app, VPS + Nginx, Docker, managed Node hosting, etc.)? If there are any platform-specific requirements, we can prepare exact settings for your environment.

Once deployed, please work through the production verification checklist in `HOSTING_HANDOFF.md`, particularly the Media Studio persistence test.

Thanks.
