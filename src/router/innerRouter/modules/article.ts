import baseTable from '@/mock/baseTable'
// 文章管理
import { lazy } from 'react'
import IRoute from '../IRoute'

const ArticleList = lazy(() => import(/* webpackChunkName:"article-list" */ '@/pages/article/list'))

const ArticleEdit = lazy(() => import(/* webpackChunkName:"article-edit" */ '@/pages/article/edit'))

const route: IRoute = {
  name: 'article',
  title: '文章管理',
  path: '/article',
  icon: 'article',
  children: [
    {
      name: 'articleList',
      title: '文章列表',
      path: '/article/list',
      exact: true,
      component: ArticleList
    },
    {
      name: 'articleEdit',
      title: '编辑文章',
      path: '/article/edit',
      exact: true,
      component: ArticleEdit
    }
  ]
}
export default route
