const errors = require('../errors');
const jwt = require('jsonwebtoken');

const verifyCookie = async (req, res, next) => {
  const jwtInsideCookie = req.signedCookies[process.env.COOKIE_REFRESH_NAME];
  if (!jwtInsideCookie) return next(new errors.UnauthorizedError());

  const decodedRefreshJWT = jwt.verify(
    jwtInsideCookie,
    process.env.JWT_REFRESH_SECRET,
    { algorithms: ["HS256"] }
  );
  req.decodedRefreshJWT = decodedRefreshJWT;
  req.encodedRefreshJWT = jwtInsideCookie;
  next();
};

module.exports = verifyCookie;
