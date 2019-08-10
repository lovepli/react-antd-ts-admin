import React, { Suspense, lazy, Children } from 'react'
import { Switch, Route, RouteProps } from 'react-router-dom';
import PageLoading from '@/components/PageLoading';


const Dashboard = lazy(() => import( /* webpackChunkName:"dashboard" */ '@/pages/Dashboard'));

const Icon = lazy(() => import( /* webpackChunkName:"icon" */ '@/pages/Icon'));

const LineChart = lazy(() => import( /* webpackChunkName:"lineChart" */ '@/pages/Chart/LineChart'));
const AreaChart = lazy(() => import( /* webpackChunkName:"areaChart" */ '@/pages/Chart/AreaChart'));
const PieChart = lazy(() => import( /* webpackChunkName:"pieChart" */ '@/pages/Chart/PieChart'));
const PillarChart = lazy(() => import( /* webpackChunkName:"pillarChart" */ '@/pages/Chart/PillarChart'));
const RadarChart = lazy(() => import( /* webpackChunkName:"radarChart" */ '@/pages/Chart/RadarChart'));

const ArticleList = lazy(() => import( /* webpackChunkName:"articleList" */ '@/pages/Article/ArticleList'));
const ArticleCreate = lazy(() => import( /* webpackChunkName:"articleCreate" */ '@/pages/Article/ArticleCreate'));
const ArticleDetail = lazy(() => import( /* webpackChunkName:"articleDetail" */ '@/pages/Article/ArticleDetail'));

const EditableTree = lazy(() => import( /* webpackChunkName:"editableTree" */ '@/pages/Component/EditableTree'));
const Mask = lazy(() => import( /* webpackChunkName:"mask" */ '@/pages/Component/Mask'));


const NotFound = lazy(() => import( /* webpackChunkName:"NotFound" */ '@/pages/Error/NotFound'));

const User = lazy(() => import( /* webpackChunkName:"User" */ '@/pages/User'));


const routeConfig: RouteProps[] = [{
  path: '/dashboard',
  exact: true,
  component: Dashboard
}, {
  path: '/icon',
  exact: true,
  component: Icon
}, {
  path: '/chart/lineChart',
  exact: true,
  component: LineChart
}, {
  path: '/chart/areaChart',
  exact: true,
  component: AreaChart
}, {
  path: '/chart/pieChart',
  exact: true,
  component: PieChart
}, {
  path: '/chart/pillarChart',
  exact: true,
  component: PillarChart
}, {
  path: '/chart/radarChart',
  exact: true,
  component: RadarChart
}, {
  path: '/articleList',
  exact: true,
  component: ArticleList
}, {
  path: '/ArticleCreate',
  exact: true,
  component: ArticleCreate
}, {
  path: '/articleDetail/:id',
  exact: true,
  component: ArticleDetail
}, {
  path: '/component/editableTree',
  exact: true,
  component: EditableTree
}, {
  path: '/component/mask',
  exact: true,
  component: Mask
}, {
  path: '/user',
  exact: true,
  component: User
}, {
  path: '*',
  exact: true,
  component: NotFound
}]


export interface IMenu {
  title: string;
  icon?: string;
  path?: string;
  children?: IMenu[];
}

export const MenuConfig: IMenu[] = [{
  title: '首页',
  icon: 'dashboard',
  path: '/dashboard'
}, {
  title: '图标',
  icon: 'smile',
  path: '/icon'
}, {
  title: '图表',
  icon: 'line-chart',
  children: [{
    title: '折线图',
    path: '/chart/lineChart'
  }, {
    title: '面积图',
    path: '/chart/areaChart'
  }, {
    title: '饼状图',
    path: '/chart/pieChart'
  }, {
    title: '柱状图',
    path: '/chart/pillarChart'
  }, {
    title: '雷达图',
    path: '/chart/radarChart'
  }]
}, {
  title: '用户管理',
  icon: 'user',
  path: '/user'
}, {
  title: '文章管理',
  icon: 'read',
  children: [{
    title: '文章列表',
    path: '/article/list'
  }, {
    title: '创建文章',
    path: '/article/create'
  }]
}, {
  title: '组件',
  icon: 'pie-chart',
  children: [{
    title: '可编辑树',
    path: '/component/editableTree'
  }, {
    title: '遮罩',
    path: '/component/mask'
  }]
}]

const InnerRouter: React.SFC = () => (
  <Suspense fallback={<PageLoading />}>
    <Switch>
      {
        routeConfig.map((route: RouteProps) => {
          const { path } = route;
          return <Route key={path + ''} {...route} />
        })
      }
    </Switch>
  </Suspense>
)


export default InnerRouter;
