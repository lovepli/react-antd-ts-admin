import config from '@/config';
import IRoute from './IRoute';
import dashboardRoute from './modules/dashboard';
import blankRoute from './modules/blank';
import iconRoute from './modules/icon';
import chartRoute from './modules/chart';
import formRoute from './modules/form';
import userRoute from './modules/user';
import articleRoute from './modules/article';
import componentRoute from './modules/component';
import otherRoute from './modules/other';


const routeMap = [
  dashboardRoute,
  iconRoute,
  chartRoute,
  blankRoute,
  formRoute,
  userRoute,
  articleRoute,
  componentRoute,
  otherRoute
]


// 从路由权限表中获取到角色可访问的路由名称
const getRouteNames = (roles: string[]) => {
  const permission = config.permission;
  let routeNames: string[] = [];
  roles.forEach((role: string) => routeNames = [...new Set([...routeNames, ...permission[role]])]);
  return routeNames;
}

// 根据路由名称获取可访问的路由表
const filterRouteMap = (routeNames: string[], routeMap: IRoute[]) => {
  const acceptedRouteMap: IRoute[] = [];
  routeMap.forEach((route: IRoute) => {
    // 如果一级路由的名称存在路由权限表中，则它之下的所有子路由都可访问
    if (routeNames.includes(route.name)) {
      acceptedRouteMap.push(route)
    } else {
      // 如果一级路由的名称不在路由权限表中，再看它的哪些子路由名称在路由权限表中
      if (route.children) {
        route.children = filterRouteMap(routeNames, route.children);
        // 如果有子路由可访问，再添加。
        if (route.children.length > 0) {
          acceptedRouteMap.push(route)
        }
      }
    }
  })
  return acceptedRouteMap;
}


const initRoutes = (roles: string[]) => {
  const routeNames = getRouteNames(roles);
  return filterRouteMap(routeNames, routeMap);
}


export default initRoutes;
