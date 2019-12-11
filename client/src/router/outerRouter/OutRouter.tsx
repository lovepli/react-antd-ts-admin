import { lazy } from 'react'
import { RouteProps } from 'react-router-dom';


const Login = lazy(() => import( /* webpackChunkName:"login" */ '@/pages/account/login'));
const Register = lazy(() => import( /* webpackChunkName:"register" */ '@/pages/account/register'));


const routes: RouteProps[] = [{
  path: '/account/login',
  exact: true,
  component: Login
}, {
  path: '/account/register',
  exact: true,
  component: Register
}]




export default routes;
