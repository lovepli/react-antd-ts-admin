// 首页
import { lazy } from 'react';
import IConfigProps from '../IConfigProps';
const Dashboard = lazy(() => import( /* webpackChunkName:"dashboard" */ '@/pages/dashboard'));


const config: IConfigProps = {
  name: 'Dashboard',
  title: '首页',
  icon: 'dashboard',
  path: '/dashboard',
  exact: true,
  component: Dashboard
}
export default config;
