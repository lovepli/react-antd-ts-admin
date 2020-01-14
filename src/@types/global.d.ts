import { RouteComponentProps } from 'react-router-dom';
import { MessageApi } from 'antd/lib/message'
import { FormComponentProps } from 'antd/lib/form';
import { Http } from '@/utils/http';
import { TableMng } from '@/utils/tableMng';

declare global {
  export const $http: Http

  export const $msg: MessageApi

  export const $tableMng: TableMng

  export interface IPageProps extends FormComponentProps, RouteComponentProps {
    [key: string]: any
  }
}

