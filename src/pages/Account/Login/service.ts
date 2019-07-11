import { ILoginData } from './Login';

// 登录
export const login = (data: ILoginData) => $http({
  url: '/login',
  method: 'post',
  data
});
