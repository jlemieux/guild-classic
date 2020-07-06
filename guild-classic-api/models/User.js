const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ms = require('ms');
const errors = require('../errors');

const UserSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  tokens: [ String ]
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    // 10 salt rounds, auto generated
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new errors.UnauthorizedError('Invalid login credentials.');

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) throw new errors.UnauthorizedError('Invalid login credentials.');

  return user;
};

UserSchema.methods.deleteRefreshJWT = async function(tokenToRemove) {
  this.tokens = this.tokens.filter(token => token !== tokenToRemove);
  return this.save();
};

UserSchema.methods.deleteAllRefreshJWTs = async function() {
  this.tokens = [];
  return this.save();
};

UserSchema.methods.addNewRefreshCookie = async function(res) {
  // generate token to go inside cookie
  const refreshToken = this.generateJWT(process.env.JWT_REFRESH_AGE, process.env.JWT_REFRESH_SECRET);

  // put token inside cookie
  res.cookie(process.env.COOKIE_REFRESH_NAME, refreshToken,
    {
      domain: undefined,  // defaults to this domain
      httpOnly: true,
      maxAge: ms(process.env.COOKIE_REFRESH_AGE),
      secure: false, // TODO: switch when I have cert
      signed: true,
      sameSite: 'strict'
    }
  );

  // add token to db, for refreshing/multiple devices
  this.tokens.push(refreshToken);

  return this.save();
};

UserSchema.methods.hasThisRefreshJWT = function(refreshJWT) {
  return this.tokens.includes(refreshJWT);
};

UserSchema.methods.generateJWT = function(exp, secret) {
  return jwt.sign(
    { sub: this._id },
    secret,
    // exp in form of npm ms strings e.g. '20m', '1 day', etc.
    { expiresIn: exp }
  );
};

UserSchema.methods.toJSON = function(token) {
  return {
    email: this.email,
    token,
    devices: this.tokens.length
  };
};

UserSchema.methods.toAuthJSON = async function(res) {
  await this.addNewRefreshCookie(res);
  const token = this.generateJWT(process.env.JWT_AUTH_AGE, process.env.JWT_AUTH_SECRET);
  return this.toJSON(token);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
