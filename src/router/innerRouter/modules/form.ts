// 表单
import { lazy } from 'react'
import IRoute from '../IRoute'

const CustomField = lazy(
  () => import(/* webpackChunkName:"customField" */ '@/pages/form/customField')
)

const route: IRoute = {
  name: 'form',
  title: '表单',
  path: '/form',
  icon: 'form',
  children: [
    {
      name: 'customField',
      title: '自定义表单',
      path: '/form/customField',
      exact: true,
      component: CustomField
    }
  ]
}
export default route
