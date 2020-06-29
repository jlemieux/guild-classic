// top level router
const apiRouter = require('express').Router();

// register children under '/api'
apiRouter.use('/me', require('./me'));

// export top level
module.exports = apiRouter;
