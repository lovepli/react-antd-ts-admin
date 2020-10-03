import React, { useEffect } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import PageLoading from '@/components/pageLoading'
import constantMng from '@/utils/constantMng'
import accountStore from '@/store/account'
import service from '@/service'

const OuterLayout = React.lazy(
  () => import(/* webpackChunkName:"outer-layout" */ '@/layouts/outerLayout')
)
const InnerLayout = React.lazy(
  () => import(/* webpackChunkName:"inner-layout" */ '@/layouts/innerLayout')
)

const App: React.FC = () => {
  // 获取一些全局状态
  useEffect(() => {
    accountStore.setPermission()
  }, [])

  // 初始化常量表
  useEffect(() => {
    const initTable = async () => {
      const res = await service.getConstant()
      constantMng.initGroup(res)
    }
    initTable()
  }, [])

  return (
    <Router>
      <React.Suspense fallback={<PageLoading />}>
        <Switch>
          {/* 这两个路由是父路由，不能设置严格匹配。
                当url导航到子路由时，需要先匹配到父路由，再匹配子路由。
                如果父路由是exact模式，那么url为“/account/login”时，这个url就无法匹配到路由“/account”，也就无法继续往下匹配路由“/account/login”。
             */}
          <Route path="/account" component={OuterLayout} />
          {/*
              由于没有设置exact，只要url中包含"/",就会与这个路由匹配成功，所以必须将它写在最后。
              如果写在最前面，比如url为“/account/login”时，也会匹配成功，
             */}
          <Route path="/" component={InnerLayout} />
        </Switch>
      </React.Suspense>
    </Router>
  )
}

export default App
