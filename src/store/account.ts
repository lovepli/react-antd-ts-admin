import { observable, action } from 'mobx'
import { IUserInfo } from '@/model/common'
class AccountStore {
  // token
  @observable token: string = sessionStorage.getItem('token') || ''
  // 账户信息
  @observable accountInfo: IUserInfo = { roles: [], permission: [] }

  @action
  public setToken(value: string) {
    this.token = value
    sessionStorage.setItem('token', value)
  }

  @action
  public setAccountInfo(value: IUserInfo) {
    this.accountInfo = value
  }
}

export default new AccountStore()
