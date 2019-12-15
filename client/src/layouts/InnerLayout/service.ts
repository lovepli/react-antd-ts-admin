export interface IGetUserInfoPayload {
  token: string;

}


class Service {

  public getUserInfo = (params: IGetUserInfoPayload) => $http.get('/userInfo', { params })

}

export default new Service();



