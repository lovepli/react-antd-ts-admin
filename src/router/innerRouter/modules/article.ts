// 文章管理
import { lazy } from 'react';
import IRoute from '../IRoute';


const ArticleList = lazy(() => import( /* webpackChunkName:"articleList" */ '@/pages/article/articleList'));
const ArticleCreate = lazy(() => import( /* webpackChunkName:"articleCreate" */ '@/pages/article/articleCreate'));


const route: IRoute = {
  name: 'Article',
  title: '文章管理',
  icon: 'read',
  children: [{
    name: 'ArticleList',
    title: '文章列表',
    path: '/article/articleList',
    exact: true,
    component: ArticleList
  }, {
    name: 'ArticleCreate',
    title: '创建文章',
    path: '/articleCreate',
    exact: true,
    component: ArticleCreate
  }]
}
export default route;
