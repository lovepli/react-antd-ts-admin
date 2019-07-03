import Mock from 'mockjs'

const login = Mock.mock({
  token: "@lower(@guid)",
})


const userInfo = Mock.mock({
  name: "@cname",
  gender: '@pick(["男", "女"])',
  avatar: "@image('100x100', '#aaa', 'avatar')",
  email: "@email",
  mobilePhone: /^1[345789]\d{9}$/,
  role: '@pick(["编辑","普通会员","高级会员","普通用户"])'
})

export default {
  login() {
    return {
      code: 200,
      data: login
    }
  },
  getUserInfo() {
    return {
      code: 200,
      data: userInfo
    }
  }
}
