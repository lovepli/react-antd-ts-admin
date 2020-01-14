// 表单
import { lazy } from 'react';
import IRoute from '../IRoute';


const CustomField = lazy(() => import( /* webpackChunkName:"customField" */ '@/pages/form/customField'));
const RichEditor = lazy(() => import( /* webpackChunkName:"richEditor" */ '@/pages/form/richEditor'));


const route: IRoute = {
  name: 'Form',
  title: '表单',
  icon: 'form',
  children: [{
    name: 'CustomField',
    title: '自定义表单控件',
    path: '/form/customField',
    exact: true,
    component: CustomField
  }, {
    name: 'RichEditor',
    title: '富文本编辑器',
    path: '/form/richEditor',
    exact: true,
    component: RichEditor
  }]
}
export default route;
