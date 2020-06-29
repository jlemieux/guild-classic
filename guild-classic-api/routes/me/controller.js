const User = require('../../models/User');
const errors = require('../../errors');

module.exports.createUser = async (req, res, next) => {
  const user = new User(req.body);
  const authJSON = await user.toAuthJSON(res);
  res.status(201).json(authJSON);
}

module.exports.getUser = async (req, res, next) => {
  // send back current JWT. let refresh handle the new one
  res.json(req.user.toJSON(req.encodedJWT));
}

module.exports.updateUser = async (req, res, next) => {
  res.json({message: "Updated user!"});
}

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findByCredentials(email, password);
  const authJSON = await user.toAuthJSON(res);
  res.json(authJSON);
}

module.exports.logout = async (req, res, next) => {
  await req.user.deleteRefreshJWT(req.encodedRefreshJWT);
  res.json({message: "You are logged out!"});
}

module.exports.logoutAll = async (req, res, next) => {
  await req.user.deleteAllRefreshJWTs();
  res.json({message: "You are logged out of all devices!"});
}

module.exports.getRefreshedJWT = async (req, res, next) => {
  if (!req.decodedRefreshJWT) return next(new errors.UnauthorizedError());
  const user = await User.findById(req.decodedRefreshJWT.sub);
  if (!user) return next(new errors.UnauthorizedError());
  if (!user.hasThisRefreshJWT(req.encodedRefreshJWT)) return next(new errors.UnauthorizedError());
  await user.deleteRefreshJWT(req.encodedRefreshJWT);
  const authJSON = await user.toAuthJSON(res);
  res.json(authJSON);
}