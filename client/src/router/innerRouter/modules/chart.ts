// 图表
import { lazy } from 'react';
import IConfigProps from '../IConfigProps';


const LineChart = lazy(() => import( /* webpackChunkName:"lineChart" */ '@/pages/chart/lineChart'));
const AreaChart = lazy(() => import( /* webpackChunkName:"areaChart" */ '@/pages/chart/areaChart'));
const PieChart = lazy(() => import( /* webpackChunkName:"pieChart" */ '@/pages/chart/pieChart'));
const PillarChart = lazy(() => import( /* webpackChunkName:"pillarChart" */ '@/pages/chart/pillarChart'));
const RadarChart = lazy(() => import( /* webpackChunkName:"radarChart" */ '@/pages/chart/radarChart'));

const config: IConfigProps = {
  name: 'Chart',
  title: '图标',
  icon: 'smile',
  path: '/chart',
  children: [{
    name: 'LineChart',
    title: '折线图',
    path: '/chart/lineChart',
    exact: true,
    component: LineChart
  }, {
    name: 'AreaChart',
    title: '面积图',
    path: '/chart/areaChart',
    exact: true,
    component: AreaChart
  }, {
    name: 'PieChart',
    title: '饼状图',
    path: '/chart/pieChart',
    exact: true,
    component: PieChart
  }, {
    name: 'PillarChart',
    title: '柱状图',
    path: '/chart/pillarChart',
    exact: true,
    component: PillarChart
  }, {
    name: 'RadarChart',
    title: '雷达图',
    path: '/chart/radarChart',
    exact: true,
    component: RadarChart
  }]
}
export default config;
