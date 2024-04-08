const Router = require('@koa/router');
const router = new Router({});
const common = require("../utils/common")

router.get('/echo', (ctx) => ctx.body = common.createResponse('Hello World'));

module.exports = router;
