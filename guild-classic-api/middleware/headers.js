const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const headers = [
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'none'"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'"],
      imgSrc: ["'self'"],
      styleSrc: ["'self'"],
      blockAllMixedContent: true,  // change to upgrade https, when have cert

      // not sure if these should all be 'none'. will update if causes problems
      formAction: ["'none'"],
      frameAncestors: ["'none'"],  // makes frameguard (X-Frame-Options) obsolete
      baseUri: ["'none'"]
    },
    browserSniff: false
  }),
  
  helmet.dnsPrefetchControl({ allow: false }),
  
  // TODO: helmet certificate headers
  
  helmet.hidePoweredBy(),
  
  // TODO: helmet HTTPS headers
  
  helmet.ieNoOpen(),
  
  helmet.noSniff(),
  
  helmet.permittedCrossDomainPolicies({ permittedPolicies: 'none' }),
  
  helmet.referrerPolicy({ policy: 'same-origin' }),
  
  // X-XSS-Protection header is deprecated

  // putting cors at end has helped with CSP and X-Powered-By headers.
  // seems to play nicer with helmet's headers if set after.
  cors({ origin: true, credentials: true }),

  cookieParser(process.env.COOKIE_REFRESH_SECRET)
];

module.exports = headers;
