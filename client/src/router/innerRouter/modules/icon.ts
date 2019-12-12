// 图标
import { lazy } from 'react';
import IRoute from '../IRoute';

const Icon = lazy(() => import( /* webpackChunkName:"icon" */ '@/pages/icon'));


const route: IRoute = {
  name: 'Icon',
  title: '图标',
  icon: 'smile',
  path: '/icon',
  exact: true,
  component: Icon
}

export default route;
