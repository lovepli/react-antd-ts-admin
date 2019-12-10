const Router = require('koa-router');
const controllers = require('../controllers');
const passport = require('koa-passport');

const router = new Router();


/**
 * @route POST account/register
 * @desc 注册
 * @access false
 */
router.post('/register', controllers.user.register);

/**
 * @route POST account/register
 * @desc 注册
 * @return token
 * @access false
 */
router.post('/login', controllers.user.login);

/**
 * @route GET account/userinfo
 * @desc 获取用户信息
 * @return 当前登录的用户的个人信息
 * @access true
 */
router.get('/userinfo', passport.authenticate('jwt', { session: false }), controllers.user.userinfo);




module.exports = router.routes();