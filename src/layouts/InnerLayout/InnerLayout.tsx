import React from 'react';
import { Redirect } from 'react-router-dom';
import { Layout, BackTop } from 'antd';
import Logo from './components/Logo';
import Menu from './components/Menu';
import Header from './components/Header';
import { InnerRouter } from '@/router';
import './style.less';

interface IState {
  collapse: boolean;
}

class InnerLayout extends React.Component<any, IState> {
  public readonly state: Readonly<IState> = {
    collapse: false,
  };

  public handleToggle = () => {
    this.setState({
      collapse: !this.state.collapse,
    });
  };


  public render() {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return <Redirect to='/account/login' />;
    } else {
      return (
        <Layout>
          <Layout.Sider trigger={null} collapsible collapsed={this.state.collapse}>
            <Logo />
            <Menu />
          </Layout.Sider>

          <Layout id="mainContent" className="main-content" >
            <Header collapse={this.state.collapse} onToggle={this.handleToggle} />
            <div className="page">
              <InnerRouter />
            </div>
            <BackTop target={() => document.getElementById('mainContent')!} style={{ right: '50px' }} />
          </Layout>
          <BackTop />
        </Layout>

      )
    }
  }
}


export default InnerLayout;
