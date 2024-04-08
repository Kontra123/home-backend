const _secrets = require('./utils/secrets');
_secrets.setSecrets();

const Koa = require("koa");
const Router = require("koa-router");
const cors = require('@koa/cors');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const routes = require('./routes/routes');

const app = new Koa();
const router = new Router();

app.use(cors());

app.use(bodyParser({
  jsonLimit: '30mb'
}));

// Custom error handling middleware
app.use(async (ctx, next) => {
  try {
      await next(); // Always await the next middleware
  } catch (err) {
      ctx.status = err.statusCode || 500;
      ctx.body = { error: err.message };
  }
});


// Mongoose config
mongoose.Promise = require('bluebird');
const mongoUri = process.env.MONGOURI;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true 
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('Error connecting to Mongo', err);
    process.exit(1); 
});

router.use(routes.routes());
app.use(router.routes());



const PORT = process.env.PORT || 9001
const server = app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/", PORT, PORT);
});
    
module.exports = server


