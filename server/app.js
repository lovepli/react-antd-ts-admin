const Koa = require('koa');
const mongoose = require('mongoose');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');
const routes = require('./routes');
const config = require('./config');


const app = new Koa();
const router = new Router();

require('./utils/passport')(passport);

app.use(bodyParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method === 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }
})



mongoose.connect(config.dbUrl + '/' + config.dbName, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
  console.log(`连接到数据库${config.dbName}`);
})



router.use('/news', routes.news);
router.use('/user', routes.user);

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 5000;
app.listen(port, err => {
  if (err) throw err;
  console.log(`server started on ${port}`);
})



