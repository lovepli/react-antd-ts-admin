import { RouteComponentProps } from 'react-router-dom'
import { MessageApi } from 'antd/lib/message'
import { Http } from '@/utils/http'

declare global {
  export const $msg: MessageApi
  export const $http: Http
}
