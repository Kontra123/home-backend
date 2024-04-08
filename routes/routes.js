const Router = require('@koa/router');
const resourcesRouter = require('./recources.routes');
const actionsRouter = require('./actions.routes');
const testRouter = require('./test.routes');

const router = new Router();
router.use(testRouter.routes());
router.use(resourcesRouter.routes());
router.use(actionsRouter.routes());

module.exports = router;