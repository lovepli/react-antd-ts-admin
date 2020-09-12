import React from 'react'
import { Layout, BackTop } from 'antd'
import InnerRouter, { IRoute, initRoutes } from '@/router/innerRouter'
import accountStore from '@/store/account'
import HeaderBar from './components/headerBar'
import SideBar from './components/sideBar'
import service from './service'
import './style.less'

interface IProps extends IPageProps {}
interface IState {
  collapse: boolean
  routeMap: IRoute[]
}

class InnerLayout extends React.Component<IProps, IState> {
  public readonly state: Readonly<IState> = {
    collapse: false,
    routeMap: []
  }

  public async componentDidMount() {
    const token = accountStore.token
    if (!token) {
      this.props.history.replace('/account/login')
    } else {
      const userInfo = await service.getUserInfo({ token })
      accountStore.setAccountInfo(userInfo)
      this.setState({ routeMap: initRoutes(userInfo.roles) })
    }
  }

  public render() {
    return (
      <Layout className="inner-layout">
        <Layout.Sider
          className="inner-layout__sider"
          width={180}
          trigger={null}
          collapsible
          collapsed={this.state.collapse}
        >
          <SideBar routeMap={this.state.routeMap} />
        </Layout.Sider>

        <Layout id="layoutMain" className="inner-layout__main">
          <HeaderBar collapse={this.state.collapse} onTrigger={this.handleTrigger} />

          <div className="content">
            <InnerRouter routeMap={this.state.routeMap} />
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

  // 切换菜单折叠状态
  private handleTrigger = () => {
    this.setState({ collapse: !this.state.collapse })
  }
}

export default InnerLayout
