import { observable, action } from 'mobx'
import { IPermission } from '@/model/account'
class AccountStore {
  // token
  @observable token: string = sessionStorage.getItem('token') || ''

  // 账号信息
  @observable accountInfo: any = {}

  // 权限
  @observable permission: IPermission[] = []

  @action
  public setToken(value: string) {
    this.token = value
    sessionStorage.setItem('token', value)
  }

  @action
  public setAccountInfo(value: any) {
    this.accountInfo = value
  }

  @action
  public setPermission() {
    this.permission = [
      {
        id: '1',
        name: 'deleteUser'
      },
      {
        id: '2',
        name: 'deleteArticle'
      }
    ]
  }
}

export default new AccountStore()
