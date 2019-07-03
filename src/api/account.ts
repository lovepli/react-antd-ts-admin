// 登录
export const login = (data: any) => $http({
  url: '/login',
  method: 'post',
  data
});
