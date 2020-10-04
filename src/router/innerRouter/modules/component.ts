// 组件
import { lazy } from 'react'
import IRoute from '../IRoute'

const EditableTree = lazy(
  () => import(/* webpackChunkName:"editableTree" */ '@/pages/component/editableTree')
)
const Mask = lazy(() => import(/* webpackChunkName:"mask" */ '@/pages/component/mask'))

const route: IRoute = {
  name: 'component',
  title: '组件',
  icon: 'component',
  children: [
    {
      name: 'editableTree',
      title: '可编辑树',
      path: '/component/editableTree',
      exact: true,
      component: EditableTree
    },
    {
      name: 'mask',
      title: '遮罩',
      path: '/component/mask',
      exact: true,
      component: Mask
    }
  ]
}
export default route
