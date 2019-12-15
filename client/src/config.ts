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


const config = {
  permission,
  // html的tite
  htmlTitle: 'Admin - {title}',
  // 请求配置
}

export default config


