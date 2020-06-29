const middleware = require('../../middleware');

// router and controller
const meRouter = require('express').Router();
const meController = require('./controller');

// register sub-routes for '/me'
meRouter.route('/')
  .post(meController.createUser)
  .get([middleware.authWithUser, meController.getUser])
  .put([middleware.authWithUser, meController.updateUser]);

meRouter.route('/login')
  .post(meController.login);

meRouter.route('/logout')
  .patch([middleware.verifyCookie, middleware.authWithUser, meController.logout])
  .delete([middleware.verifyCookie, middleware.authWithUser, meController.logoutAll]);

meRouter.route('/refresh')
  .post([middleware.verifyCookie, meController.getRefreshedJWT]);

module.exports = meRouter;
