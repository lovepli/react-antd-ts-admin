import Mock from 'mockjs'
import { getURLParams } from '@/utils/core';

const loginData = Mock.mock({
  token: '@lower(@guid)',
})


const userInfo = Mock.mock({
  name: '@cname',
  gender: '@pick(["男", "女"])',
  avatar: 'https://s2.ax1x.com/2019/08/02/edRc1P.jpg',
  email: '@email',
  mobilePhone: /^1[345789]\d{9}$/,
  roles: ['admin']
})


export default {
  login(config: any) {
    const { username } = JSON.parse(config.body);
    if (username === 'editor') {
      loginData.token = 'd02fd62b-cfdf-9efb-adfb-7fc1e85bf99c';
    } else if (username === 'guest') {
      loginData.token = 'ecfe1e6b-cba6-dfee-fdba-12015b7f2420';
    } else {
      loginData.token = '6f81bbab-5b7e-abfb-bd44-efd5aeee82cc';
    }
    return {
      code: 200,
      data: loginData
    }
  },
  logout() {
    return {
      code: 200,
      data: {}
    }
  },
  getUserInfo(config: any) {
    const { token } = getURLParams(config.url);
    if (token === 'd02fd62b-cfdf-9efb-adfb-7fc1e85bf99c') {
      userInfo.roles = ['editor'];
    } else if (token === 'ecfe1e6b-cba6-dfee-fdba-12015b7f2420') {
      userInfo.roles = ['guest'];
    } else {
      userInfo.roles = ['admin'];
    }
    return {
      code: 200,
      data: userInfo
    }
  }
}

