const _secrets = require('./utils/secrets');
_secrets.setSecrets();

const Koa = require("koa");
const Router = require("koa-router");
const cors = require('@koa/cors');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');


const _mainController = require('./controller/mainController');

const PORT = process.env.PORT || 3002
const app = new Koa();
const router = new Router();

app.use(cors());

app.use(bodyParser({
  jsonLimit: '30mb'
}));

router.get('/resources', _mainController.getResources);
router.get('/actions', _mainController.getActions);
router.post('/resource/create', _mainController.createResource);

// Mongoose config
mongoose.Promise = require('bluebird');
const mongoUri = process.env.MONGOURI;

mongoose.connect(mongoUri, { useNewUrlParser: true }).catch(err => {
    console.error('Error connecting to Mongo', err);
});

app.use(router.routes());
    
app.listen(PORT, function () {
  console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/", PORT, PORT);
});




