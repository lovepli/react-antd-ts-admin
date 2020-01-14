// 获取用户列表
export interface IGetList {
  name?: string;
  pageNum?: number;
  pageSize?: number;
}


export interface IGetDetail {
  id: string;
}

class Service {

  // 获取用户列表
  public getList = (data: IGetList) => $http.post('/user/userList', { data })

  // 获取用户详情
  public getDetail = (data: IGetDetail) => $http.post('/user/userDetail', { data })
}

export default new Service();


