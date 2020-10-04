import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Layout, BackTop } from 'antd'
import InnerRouter, { IRoute, initRoutes } from '@/router/innerRouter'
import accountStore from '@/store/account'
import HeaderBar from './components/headerBar'
import SideBar from './components/sideBar'
import service from './service'
import './style.less'

const InnerLayout: React.FC = () => {
  const history = useHistory()
  // 是否折叠侧边菜单
  const [collapse, setCollapse] = useState(false)
  // 路由配置
  const [routeMap, setRouteMap] = useState<IRoute[]>([])

  useEffect(() => {
    const token = accountStore.token
    if (!token) {
      history.replace('/account/login')
    } else {
      service.getAccountInfo({ token }).then((res) => {
        accountStore.setAccountInfo(res)
        setRouteMap(initRoutes(res.permission))
      })
    }
  }, [])

  // 切换菜单折叠状态
  const triggerCollapse = () => {
    setCollapse((state) => !state)
  }

  return (
    <Layout className="inner-layout">
      <Layout.Sider
        className="inner-layout__sider"
        width={160}
        trigger={null}
        collapsible={true}
        collapsed={collapse}
      >
        <SideBar routeMap={routeMap} />
      </Layout.Sider>

      <Layout id="layoutMain" className="inner-layout__main">
        <HeaderBar collapse={collapse} onTrigger={triggerCollapse} />

        <div className="content">
          <InnerRouter routeMap={routeMap} />
        </div>

        <BackTop
          style={{ right: '50px' }}
          target={() => document.getElementById('layoutMain')!}
          visibilityHeight={600}
        />
      </Layout>
    </Layout>
  )
}

export default InnerLayout
