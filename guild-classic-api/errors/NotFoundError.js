const ApplicationError = require('./ApplicationError');

class NotFoundError extends ApplicationError {
  constructor(msg) {
    super(msg || 'The resource you requested could not be found.', 404);
  }
}

module.exports = NotFoundError;
