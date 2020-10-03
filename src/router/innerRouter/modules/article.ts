import baseTable from '@/mock/baseTable'
// 文章管理
import { lazy } from 'react'
import IRoute from '../IRoute'

const ArticleList = lazy(() => import(/* webpackChunkName:"article-list" */ '@/pages/article/list'))

const ArticleEdit = lazy(() => import(/* webpackChunkName:"article-edit" */ '@/pages/article/edit'))

const route: IRoute = {
  name: 'Article',
  title: '文章管理',
  icon: 'article',
  children: [
    {
      name: 'ArticleList',
      title: '文章列表',
      path: '/article/list',
      exact: true,
      component: ArticleList
    },
    {
      name: 'ArticleEdit',
      title: '编辑文章',
      path: '/article/edit',
      exact: true,
      component: ArticleEdit
    }
  ]
}
export default route
