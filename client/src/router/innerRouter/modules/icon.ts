// 图标
import { lazy } from 'react';
import IConfigProps from '../IConfigProps';

const Icon = lazy(() => import( /* webpackChunkName:"icon" */ '@/pages/icon'));


const config: IConfigProps = {
  name: 'Icon',
  title: '图标',
  icon: 'smile',
  path: '/icon',
  exact: true,
  component: Icon
}

export default config;
