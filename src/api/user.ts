// 获取用户列表
interface IGetList {
  name?: string;
  pageNum?: number;
  pageSize?: number;
}
export const getList = (data: IGetList) => $http({
  url: '/user/userList',
  method: 'post',
  data
});

// 获取用户详情
interface IGetDetail {
  id: string;
}
export const getDetail = (data: IGetDetail) => $http({
  url: '/user/userDetail',
  method: 'post',
  data
});
