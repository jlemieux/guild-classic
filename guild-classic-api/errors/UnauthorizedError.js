const ApplicationError = require('./ApplicationError');

class UnauthorizedError extends ApplicationError {
  constructor(msg) {
    super(msg || 'Unauthorized.', 401);
  }
}

module.exports = UnauthorizedError;
