import Mock from 'mockjs'

import account from './module/account'
import baseTable from './module/baseTable'
import user from './module/user'

// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function () {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}

// 延时数据返回,模拟loading效果
Mock.setup({
  timeout: '300-800'
})

Mock.mock(/login/, 'post', account.login)
Mock.mock(/accountInfo/, 'get', account.getAccountInfo)

Mock.mock(/\/baseTable/, 'get', baseTable.getBaseTable)

Mock.mock(/\/user\/list/, 'post', user.getList)
Mock.mock(/\/user\/detail/, 'post', user.getDetail)
Mock.mock(/\/user\/delete/, 'post', user.remove)
