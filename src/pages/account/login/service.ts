export interface ILoginPayload {
  username: string
  password: string
  captcha: string
}

class Service {
  // 登录
  // public login = (data: ILoginPayload): Promise<any> => $http.post('/login', { data, responseType: 'json' })

  public login = async (params: ILoginPayload) => {
    const response = await $http.post('/login', { params, responseType: 'json' })
    return {
      token: response.token
    }
  }
}

export default new Service()
