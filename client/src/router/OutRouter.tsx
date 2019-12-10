import React, { Suspense, lazy } from 'react'
import { Switch, Route, RouteProps } from 'react-router-dom';
import PageLoading from '@/components/PageLoading';


const Login = lazy(() => import( /* webpackChunkName:"Login" */ '@/pages/Account/Login'));
const Register = lazy(() => import( /* webpackChunkName:"Register" */ '@/pages/Account/Register'));


const routes: RouteProps[] = [{
  path: '/account/login',
  exact: true,
  component: Login
}, {
  path: '/account/register',
  exact: true,
  component: Register
}]


const OuterRouter: React.SFC = () => (
  <Suspense fallback={<PageLoading />}>
    <Switch>
      {
        routes.map((route: RouteProps) => {
          const { path } = route;
          return <Route key={path + ''} {...route} />
        })
      }
    </Switch>
  </Suspense>
)


export default OuterRouter;
