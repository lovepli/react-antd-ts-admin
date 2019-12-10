const jwt = require('jsonwebtoken');
const models = require('../models');
const config = require('../config');

const User = models.User;


const registerValidator = (data) => {

}



const register = async ctx => {
  const body = ctx.request.body;
  const result = await User.find({
    username: body.username
  })
  if (result.length === 0) {
    if (body.password !== body.checkPassword) {
      ctx.body = {
        code: 400,
        msg: '两次输入的密码不一致',
      }
    } else {
      const newUser = new User({
        username: body.username,
        password: body.password,
        name: body.name,
        avatar: body.avatar,
        gender: body.gender
      })
      const userinfo = await newUser.save();
      ctx.body = {
        code: 200,
        msg: '注册成功',
        data: { userinfo }
      }
    }

  } else {
    ctx.body = {
      code: 400,
      msg: '用户已存在',
    }
  }
}

const login = async (ctx) => {
  const body = ctx.request.body;
  const result = await User.findOne({ username: body.username });
  if (result) {
    if (result.password === body.password) {
      const payload = {
        id: result._id,
        username: result.username
      }
      const token = jwt.sign(payload, config.jwtKey, { expiresIn: 60 * 60 * 24 });
      ctx.body = {
        code: 200,
        msg: '登录成功',
        data: {
          token_type: 'Bearer',
          access_token: token
        }
      }
    } else {
      ctx.body = {
        code: 400,
        msg: '用户名或密码错误'
      }
    }
  } else {
    ctx.body = {
      code: 400,
      msg: `用户${body.username}不存在`
    }
  }
}


const userinfo = async ctx => {
  const { password, ...userInfo } = ctx.state.user._doc;
  ctx.body = {
    code: 200,
    msg: '',
    data: { userInfo }
  };
}



module.exports = {
  register,
  login,
  userinfo
}