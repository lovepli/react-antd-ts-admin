/**
 * 应用配置
 */

// 路由权限表
// 如果配置了一级路由，则它之下的所有子路由都可访问。
const permission = {
  admin: ['Dashboard', 'Icon', 'Chart', 'Article', 'Blank', 'Component', 'Form', 'Other', 'User'],
  guest: ['Dashboard', 'Chart'],
  editor: []
}

const CONFIG_BASE = {
  permission,
  // html的tite
  htmlTitle: 'Admin - {title}'
  // 请求配置
}

// 开发配置
const CONFIG_DEV = {
  domain: '/api'
}

// 测试配置
const CONFIG_TEST = {
  domain: '/api'
}

// 生产配置
const CONFIG_PRO = {
  domain: '/api'
}

const ENV_CONFIG_MAP = {
  development: CONFIG_DEV,
  test: CONFIG_TEST,
  production: CONFIG_PRO
}

export default { ...CONFIG_BASE, ...ENV_CONFIG_MAP[process.env.NODE_ENV!] }
