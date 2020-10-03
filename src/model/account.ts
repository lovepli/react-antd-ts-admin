// 用户信息
export interface IUserInfo {
  id?: number
  // 账号
  accountName?: string
  //名称, realname或者nickname
  username?: string
  // 昵称
  nickname?: string
  // 真实姓名
  realname?: string
  // 角色
  roles?: number[]
  // 性别
  gender?: number
  // 年龄
  age?: number
  // 头像
  avatar?: string
  // 邮箱
  email?: string
  // 手机号
  phone?: string
}

// 权限
export interface IPermission {
  id: number
  // 权限名称
  name: string
  // 描述
  description?: string
  // 提示信息
  reminder?: string
}
