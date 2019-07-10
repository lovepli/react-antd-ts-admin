import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Layout, BackTop } from 'antd';
const { Sider, Content } = Layout;

import Logo from './components/Logo';
import Menu from './components/Menu';
import Header from './components/Header';

import RouterView from '@/router'
import './Layout.less';

class BaseLayout extends React.Component {
  public state = {
    collapse: false,
  };

  public toggle = () => {
    this.setState({
      collapse: !this.state.collapse,
    });
  };

  public getScrollElementById = (id: string): HTMLElement | Window => {
    const elem = document.getElementById(id);
    return elem ? elem : window;
  }

  public render() {
    // const authorized = sessionStorage.getItem('token') ? true : false;
    return (
      <Router>
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapse}>
            <Logo />
            <Menu />
          </Sider>

          <Layout id="layoutRight" className="layout-right" >
            <Header collapse={this.state.collapse} toggle={this.toggle} />
            <div className="page">
              <RouterView />
              {/* {RouterView(authorized)} */}
            </div>
            <BackTop target={() => this.getScrollElementById('layoutRight')} style={{ right: '50px' }} />
          </Layout>
        </Layout>
        <BackTop />
      </Router>
    );
  }
}


export default BaseLayout;
