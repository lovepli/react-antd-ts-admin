import axios, { AxiosRequestConfig } from 'axios';

export class Http {

  private headers: any = {};


  private instance = axios.create({
    baseURL: 'http://xxx',
    headers: this.headers,
    timeout: 8000
  })


  constructor() {
    this.setReqInterceptors();
    this.setResnterceptors();
  }


  public setheader = (headers: any) => {
    this.headers = { ...this.headers, ...headers };
  };


  public get = (url: string, config?: AxiosRequestConfig): Promise<any> => this.instance({ ...config, ...{ url, method: 'get' } })

  public post = (url: string, config: AxiosRequestConfig): Promise<any> => this.instance({ ...config, ...{ url, method: 'post' } })

  public delete = (url: string, config: AxiosRequestConfig): Promise<any> => this.instance({ ...config, ...{ url, method: 'delete' } })



  // 请求拦截器
  private setReqInterceptors = () => {
    this.instance.interceptors.request.use(
      config => {
        return config;
      },
      err => {
        $msg.error('请求失败');
        return Promise.reject(err);
      })
  }

  // 响应拦截器
  private setResnterceptors = () => {
    this.instance.interceptors.response.use(
      res => {
        const { code, data, msg } = res.data;
        if (code === 200) {
          return data;
        } else {
          $msg.error(msg || '获取数据失败');
          return Promise.reject(res);
        }
      },
      err => {
        $msg.error('服务器响应失败')
        return Promise.reject(err);
      }
    );
  }

}



export default new Http();




