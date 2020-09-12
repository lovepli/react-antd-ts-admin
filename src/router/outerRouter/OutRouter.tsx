import React, { lazy, Suspense } from 'react'
import { Switch, Route, RouteProps } from 'react-router-dom'
import PageLoading from '@/components/pageLoading'

const Login = lazy(() => import(/* webpackChunkName:"login" */ '@/pages/account/login'))
const Register = lazy(() => import(/* webpackChunkName:"register" */ '@/pages/account/register'))

const routes: RouteProps[] = [
  {
    path: '/account/login',
    exact: true,
    component: Login
  },
  {
    path: '/account/register',
    exact: true,
    component: Register
  }
]

const OterRouter: React.FC = () => (
  <Suspense fallback={<PageLoading />}>
    <Switch>
      {routes.map((route: RouteProps) => (
        <Route
          key={route.path + ''}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  </Suspense>
)

export default OterRouter
