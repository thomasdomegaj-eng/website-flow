# Ready-to-send reply for the website hosting team

**Subject: Re: FLOWCOAT website private test setup**

Hi,

Thanks for letting me know — no problem.

I've updated the website repo for the Windows Plesk setup and added a root-level **`app.js`** startup file specifically for Plesk/iisnode.

The repo is still:
`https://github.com/thomasdomegaj-eng/website-flow`

Please use the latest **main** branch.

For the Node.js app in Windows Plesk, could you please try:

- Node.js: **20 LTS**
- Application Mode: **Production**
- Application Root: the folder containing `package.json` and `app.js`
- Document Root: the same folder as the Application Root
- Application Startup File: **`app.js`**

Then run:

```text
npm install
npm run verify
```

and restart the Node.js application in Plesk.

I've also updated the hosting handoff with Windows-Plesk-specific instructions:
`https://github.com/thomasdomegaj-eng/website-flow/blob/main/HOSTING_HANDOFF.md`

For the private server values/secrets, because this is Windows Plesk, you can either set them at the IIS/Node process level or create a server-only **`.env.production.local`** file in the app root using the values in the handoff. That file is ignored by Git and shouldn't be committed.

Please use the SMTP password Shehpar already sent me for this private test, and keep it only on the server. The Media Studio password can also be set there.

Once it starts, could you please test `/api/health`, the Media Studio login/upload, and one quote submission through to `sale@flowcoat.com.au`.

If `app.js` still doesn't start properly under iisnode, just send me the exact Plesk/iisnode error or log output and I'll adjust it from there.

Thanks.
