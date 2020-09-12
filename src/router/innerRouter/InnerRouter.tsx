import React, { Suspense } from 'react'
import { Switch, Route, RouteProps } from 'react-router-dom'
import PageLoading from '@/components/pageLoading'
import IRoute from './IRoute'

interface IProps {
  routeMap: IRoute[]
}

const InnerRouter: React.FC<IProps> = ({ routeMap }) => {
  // 根据路由配置生成路由
  const getRoutes = (routeMap: IRoute[]) => {
    const routes: RouteProps[] = []
    const getRoute = (routeMap: IRoute[]) => {
      routeMap.forEach((config) => {
        const { path, exact, component, children } = config
        if (children) {
          getRoute(children)
        } else {
          routes.push({ path, exact, component })
        }
      })
    }
    getRoute(routeMap)
    return routes
  }

  return (
    <Suspense fallback={<PageLoading />}>
      <Switch>
        {getRoutes(routeMap).map((route: RouteProps) => (
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
}

export default InnerRouter
