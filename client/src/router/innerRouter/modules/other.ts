// 其他功能
import { lazy } from 'react';
import IRoute from '../IRoute';


const Pdf = lazy(() => import( /* webpackChunkName:"pdf" */ '@/pages/other/pdf'));


const route: IRoute = {
  name: 'Other',
  title: '其他功能',
  icon: 'ellipsis',
  children: [{
    name: 'Pdf',
    title: 'pdf预览',
    path: '/other/pdf',
    exact: true,
    component: Pdf
  }]
}
export default route;
