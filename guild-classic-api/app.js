const express = require('express');

require('dotenv').config();
require('express-async-errors');
require('./db/db');

const errors = require('./errors');
const middleware = require('./middleware');
const apiRouter = require('./routes');
const isDevelopmentMode = process.env.NODE_ENV === 'development';

const app = express();

// middleware setup
app.use(middleware.headers);
app.use(middleware.thirdParty);
app.use(middleware.builtin);

// api top level router
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(async (req, res, next) => next(new errors.NotFoundError()));

// error handler
app.use(async (err, req, res, next) => {
  console.log(err.message);
  console.log(err.stack);

  // https://stackoverflow.com/a/33526438/2565883
  // passes to express built-in handler, to close out the connection
  if (res.headersSent) return next(err);

  if (err.name === 'UnauthorizedError') err = new errors.UnauthorizedError();

  // if still not my error
  const isMyCustomError = err instanceof errors.ApplicationError;
  if (!isMyCustomError) err = new errors.ApplicationError();

  res.status(err.status || 500).json({
    message: err.message,

    // https://stackoverflow.com/a/40560953/2565883
    // sets `stack` property if condition is true, otherwise omits it
    ...(isDevelopmentMode && {stack: err.stack})
  });
});

module.exports = app;
