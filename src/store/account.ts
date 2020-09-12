import { observable, action } from 'mobx'

class AccountStore {
  @observable token: string = ''

  // 账号信息
  @observable accountInfo: any = {}

  @action
  public setToken(value: string) {
    this.token = value
  }

  @action
  public setAccountInfo(value: any) {
    this.accountInfo = value
  }
}

export default new AccountStore()
