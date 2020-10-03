import { observable, action } from 'mobx'
import { IUserInfo, IPermission } from '@/model/account'
class AccountStore {
  // 账户信息
  @observable account: IUserInfo = {}

  // token
  @observable token: string = sessionStorage.getItem('token') || ''

  // 权限
  @observable permissionList: IPermission[] = []

  @action
  public setToken(value: string) {
    this.token = value
    sessionStorage.setItem('token', value)
  }

  @action
  public setAccount(value: any) {
    this.account = value
  }

  @action
  public setPermission() {
    this.permissionList = [
      {
        id: 1,
        name: 'deleteUser'
      },
      {
        id: 2,
        name: 'deleteArticle'
      }
    ]
  }
}

export default new AccountStore()
