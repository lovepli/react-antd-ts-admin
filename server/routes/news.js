const Router = require('koa-router');
const controllers = require('../controllers');

const router = new Router();



router.get('/list', controllers.news.getList);
router.get('/detail', controllers.news.getDetail);
router.post('/edit', controllers.news.edit);



module.exports = router.routes();