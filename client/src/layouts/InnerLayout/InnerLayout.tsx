import React, { Suspense } from 'react';
import { Redirect, Switch, Route, RouteProps } from 'react-router-dom';
import { Layout, BackTop } from 'antd';
import { routeConfig, IConfigProps } from '@/router/innerRouter';
import PageLoading from '@/components/PageLoading';
import HeaderBar from './components/headerBar';
import SideBar from './components/sideBar';
import './style.less';

interface IState {
  collapse: boolean;
}

class InnerLayout extends React.Component<any, IState> {
  public readonly state: Readonly<IState> = {
    collapse: false,
  };

  public render() {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return <Redirect to='/account/login' />;
    } else {
      return (
        <Layout>
          <Layout.Sider width={180} trigger={null} collapsible collapsed={this.state.collapse}>
            <SideBar />
          </Layout.Sider>

          <Layout id="mainContent" className="main-content" >
            <HeaderBar collapse={this.state.collapse} onToggle={this.handleToggle} />
            <div className="main-content__page">
              <Suspense fallback={<PageLoading />}>
                <Switch>
                  {
                    this.getRoutes(routeConfig).map((route: RouteProps) => {
                      const { path } = route;
                      return <Route key={path + ''} {...route} />
                    })
                  }
                </Switch>
              </Suspense>
            </div>
            <BackTop target={() => document.getElementById('mainContent')!} style={{ right: '50px' }} />
          </Layout>
          <BackTop />
        </Layout>

      )
    }
  }

  // 切换菜单折叠状态
  private handleToggle = () => {
    this.setState({
      collapse: !this.state.collapse,
    });
  };

  // 根据路由配置生成路由
  private getRoutes = (routeConfig: IConfigProps[]) => {
    const routes: RouteProps[] = [];
    const getRoute = (routeConfig: IConfigProps[]) => {
      routeConfig.forEach(config => {
        const { path, exact, component, children } = config;
        if (children) {
          getRoute(children);
        } else {
          routes.push({ path, exact, component });
        }
      })
    }
    getRoute(routeConfig);
    return routes;
  }

}


export default InnerLayout;
