import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';
const { Sider, Content } = Layout;

import Logo from './components/Logo';
import Menu from './components/Menu';
import Header from './components/Header';
import Footer from './components/Footer';

import RouterView from '@/router'
import './Layout.less';

class BaseLayout extends Component {
  public state = {
    collapse: false,
  };

  public toggle = () => {
    this.setState({
      collapse: !this.state.collapse,
    });
  };

  public render() {
    // const authorized = sessionStorage.getItem('token') ? true : false;
    return (
      <Router>
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapse}>
            <Logo />
            <Menu />
          </Sider>

          <Layout>
            <Header collapse={this.state.collapse} toggle={this.toggle} />

            <Content>
              <div className="page">
                <RouterView/>
                {/* {RouterView(authorized)} */}
              </div>
            </Content>

            <Footer />
          </Layout>
        </Layout>
      </Router>
    );
  }
}


export default BaseLayout;
