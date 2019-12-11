/**
 * 应用配置
 */

// 路由权限表
// 如果配置了一级路由，则它之下的所有子路由都可访问。
const permission = {
  admin: ['Icon', 'Chart', 'Form', 'Table', 'Excel', 'Tab', 'AMap', 'Error', 'Permission', 'User', 'Article', 'Pdf', 'Office', 'Other', '404'],
  guest: ['Icon', 'Chart', 'Form', 'Table', 'Excel', 'Tab', 'AMap', 'Error', 'Other', '404'],
  editor: ['Article', 'Error', 'Other', '404']
}


const config = {
  // html的tite
  htmlTitle: 'Admin - {title}',

  // 请求配置
}

export default config


