'use strict';

// Windows Plesk/iisnode needs a concrete startup file in the application root.
// The app itself still uses the normal Next.js production build in `.next`.
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const http = require('http');
const next = require('next');

const app = next({ dev: false });
const handle = app.getRequestHandler();
const listenTarget = process.env.PORT || 3000;

app
  .prepare()
  .then(() => {
    const server = http.createServer((request, response) => handle(request, response));

    server.listen(listenTarget, () => {
      console.log('FLOWCOAT Next.js server started.');
    });
  })
  .catch((error) => {
    console.error('FLOWCOAT server failed to start.', error);
    process.exit(1);
  });
