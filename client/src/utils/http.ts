import axios from 'axios';

import { paramsSerializer, objToParams } from '@/utils/core';

// 接口根路径
const BASE_URL = 'http://123.123.22.22.8080';


const $http = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
  // paramsSerializer(params = {}) {
  //   return paramsSerializer(params);
  // },
  // transformRequest: [(data = {}) => {
  //   return objToParams(data);
  // }]
});

// 请求拦截器
$http.interceptors.request.use(
  config => {
    // if (store.state.sysUser.token) {
    //   config.headers['X-Token'] = sessionStorage.getItem("token");
    //   // 让每个请求携带token--'X-Token'为自定义key
    // }
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

// 响应拦截器
$http.interceptors.response.use(
  res => {
    if (res.data.code === 200) {
      return res.data;
    } else {
      $msg.error(res.data.errorMsg)
      return Promise.reject(res);
    }
  },
  error => {
    $msg.error('网络异常,请稍后再试！')
    return Promise.reject(error);
  }
);

export default $http;
