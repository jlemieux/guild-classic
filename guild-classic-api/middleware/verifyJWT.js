const jwt = require('express-jwt');

function getTokenFromHeader(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;

  const [ prefix, token ] = authHeader.split(' ');
  if (prefix !== 'Bearer') return null;
  
  req.encodedJWT = token;
  return token;
}

// adds decoded token to `req.decodedJWT`
// so you can access it like `req.decodedJWT.sub`
// errors if token invalid or can't get from header
const verifyJWT = {
  required: jwt({
    secret: process.env.JWT_AUTH_SECRET,
    userProperty: 'decodedJWT',
    getToken: getTokenFromHeader,
    algorithms: ["HS256"]
  }),
  optional: jwt({
    secret: process.env.JWT_AUTH_SECRET,
    userProperty: 'decodedJWT',
    credentialsRequired: false,
    getToken: getTokenFromHeader,
    algorithms: ["HS256"]
  })
};

module.exports = verifyJWT;
