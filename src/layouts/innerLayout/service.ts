export interface IGetUserInfoPayload {
  token: string
}

class Service {
  public getUserInfo = (params: IGetUserInfoPayload) => $request.get('/userInfo', { params })
}

export default new Service()
