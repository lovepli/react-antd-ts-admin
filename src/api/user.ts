// 登录
export const getUserList = (data: any) => $http({
  url: '/user/userList',
  method: 'post',
  data
});


export const getUserDetail = (data: any) => $http({
  url: '/user/userDetail',
  method: 'post',
  data
});
