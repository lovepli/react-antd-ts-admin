// 图表
import { lazy } from 'react'
import IRoute from '../IRoute'

const LineChart = lazy(() => import(/* webpackChunkName:"lineChart" */ '@/pages/chart/lineChart'))
const AreaChart = lazy(() => import(/* webpackChunkName:"areaChart" */ '@/pages/chart/areaChart'))
const PieChart = lazy(() => import(/* webpackChunkName:"pieChart" */ '@/pages/chart/pieChart'))
const PillarChart = lazy(
  () => import(/* webpackChunkName:"pillarChart" */ '@/pages/chart/pillarChart')
)
const RadarChart = lazy(
  () => import(/* webpackChunkName:"radarChart" */ '@/pages/chart/radarChart')
)

const route: IRoute = {
  name: 'chart',
  title: '图表',
  icon: 'chart',
  children: [
    {
      name: 'lineChart',
      title: '折线图',
      path: '/chart/lineChart',
      exact: true,
      component: LineChart
    },
    {
      name: 'areaChart',
      title: '面积图',
      path: '/chart/areaChart',
      exact: true,
      component: AreaChart
    },
    {
      name: 'pieChart',
      title: '饼状图',
      path: '/chart/pieChart',
      exact: true,
      component: PieChart
    },
    {
      name: 'pillarChart',
      title: '柱状图',
      path: '/chart/pillarChart',
      exact: true,
      component: PillarChart
    },
    {
      name: 'radarChart',
      title: '雷达图',
      path: '/chart/radarChart',
      exact: true,
      component: RadarChart
    }
  ]
}
export default route
