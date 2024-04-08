const _resourceController = require('../controller/resourceController');
const validateBody = require('../middleware/validation');
const resourceSchema = require('../schemas/resourceSchema');
const resourceUpdateSchema = require('../schemas/resourceUpdateSchema');
const Router = require('@koa/router');
const router = new Router({
    prefix: '/resource'
});


router.get('/resources', _resourceController.getAllResources);
router.get('/:id', _resourceController.getResource);
router.post('/create', validateBody(resourceSchema), _resourceController.createResource);
router.put('/update/:id', validateBody(resourceUpdateSchema), _resourceController.updateResource);
router.delete('/delete/:id', _resourceController.deleteResource);

module.exports = router;