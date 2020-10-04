// 其他功能
import { lazy } from 'react'
import IRoute from '../IRoute'

const Pdf = lazy(() => import(/* webpackChunkName:"pdf" */ '@/pages/other/pdf'))

const route: IRoute = {
  name: 'other',
  title: '其他功能',
  path: 'other',
  icon: 'other',
  children: [
    {
      name: 'pdf',
      title: 'pdf预览',
      path: '/other/pdf',
      exact: true,
      component: Pdf
    }
  ]
}
export default route
