const Router = require('@koa/router');
const router = new Router({});

const _actionController = require('../controller/actionController');

router.get('/actions', _actionController.getAllActions);

module.exports = router;