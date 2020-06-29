const attachUser = require('./attachUser');
const verifyJWT = require('./verifyJWT');
const verifyCookie = require('./verifyCookie');
const headers = require('./headers');
const thirdParty = require('./thirdParty');
const builtin = require('./builtin');

module.exports = {
  thirdParty,
  builtin,
  verifyJWT,
  verifyCookie,
  headers,
  authWithUser: [verifyJWT.required, attachUser]
};
