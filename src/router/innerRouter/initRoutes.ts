import { IPermission } from '@/model/common'
import IRoute from './IRoute'
import dashboardRoute from './modules/dashboard'
import blankRoute from './modules/blank'
import chartRoute from './modules/chart'
import formRoute from './modules/form'
import userRoute from './modules/user'
import articleRoute from './modules/article'

const routeMap = [dashboardRoute, chartRoute, blankRoute, formRoute, userRoute, articleRoute]

// 根据路由名称获取可访问的路由表
const filterRouteMap = (routeNames: string[], routeMap: IRoute[]) => {
  const acceptedRouteMap: IRoute[] = []
  routeMap.forEach((route: IRoute) => {
    // 如果一级路由的名称存在路由权限表中，则它之下的所有子路由都可访问
    if (routeNames.includes(route.name)) {
      acceptedRouteMap.push(route)
    } else {
      // 如果一级路由的名称不在路由权限表中，再看它的哪些子路由名称在路由权限表中
      if (route.children) {
        route.children = filterRouteMap(routeNames, route.children)
        // 如果有子路由可访问，再添加。
        if (route.children.length > 0) {
          acceptedRouteMap.push(route)
        }
      }
    }
  })
  return acceptedRouteMap
}

// 获取可访问的路由表
const initRoutes = (permission: IPermission[]) => {
  const routeNames = permission.map((item) => item.name)
  return filterRouteMap(routeNames, routeMap)
}

export default initRoutes
