const common = require("./utils/common")
const _secrets = require('./utils/secrets');
_secrets.setSecrets();

const Koa = require("koa");
const Router = require("koa-router");
const cors = require('@koa/cors');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');


const _resourceController = require('./controller/resourceController');
const _actionController = require('./controller/actionController');

const app = new Koa();
const router = new Router();

app.use(cors());

app.use(bodyParser({
  jsonLimit: '30mb'
}));
//
router.get('/echo', (ctx) => ctx.body = common.createResponse('Hello World'));

router.get('/resource/:id', _resourceController.getResource);
router.get('/resources', _resourceController.getAllResources);
router.post('/resource/create', _resourceController.createResource);
router.put('/resource/update/:id', _resourceController.updateResource);
router.delete('/resource/delete/:id', _resourceController.deleteResource);

router.get('/actions', _actionController.getAllActions);
//
// Mongoose config
mongoose.Promise = require('bluebird');
const mongoUri = process.env.MONGOURI;

mongoose.connect(mongoUri, { useNewUrlParser: true }).catch(err => {
    console.error('Error connecting to Mongo', err);
});

app.use(router.routes());

const PORT = process.env.PORT || 9001
const server = app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/", PORT, PORT);
});
    
module.exports = server


