const User = require('../models/User');
const errors = require('../errors');

// expects auth middleware to have been called first, to set the `req.decodedJWT`
const attachUser = async (req, res, next) => {
  if (!req.decodedJWT) return next(new errors.UnauthorizedError());

  const user = await User.findById(req.decodedJWT.sub);

  // token valid, but user doesn't exist
  if (!user) return next(new errors.UnauthorizedError());

  req.user = user;
  next();
};

module.exports = attachUser;
