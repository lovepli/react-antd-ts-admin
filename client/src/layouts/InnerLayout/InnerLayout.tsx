import React from 'react';
import { Layout, BackTop } from 'antd';
import { connect } from 'react-redux';
import { saveUserInfo } from '@/store/account/action';
import InnerRouter, { IRoute, initRoutes } from '@/router/innerRouter';
import HeaderBar from './components/headerBar';
import SideBar from './components/sideBar';
import service from './service';
import './style.less';



interface IProps extends IPageProps {
  token: string;
  onSaveUserInfo: (roles: string[]) => void;
}
interface IState {
  collapse: boolean;
  routeMap: IRoute[];
}

class InnerLayout extends React.Component<IProps, IState> {
  public readonly state: Readonly<IState> = {
    collapse: false,
    routeMap: []
  };

  public async componentDidMount() {
    const token = this.props.token;
    if (!token) {
      this.props.history.replace('/account/login');
    } else {
      const userInfo = await service.getUserInfo({ token });
      this.props.onSaveUserInfo(userInfo);
      this.setState({ routeMap: initRoutes(userInfo.roles) });
    }
  }

  public render() {
    return (
      <Layout>
        <Layout.Sider width={180} trigger={null} collapsible collapsed={this.state.collapse}>
          <SideBar routeMap={this.state.routeMap} />
        </Layout.Sider>

        <Layout id="mainContent" className="main-content" >
          <HeaderBar collapse={this.state.collapse} onToggle={this.handleToggle} />

          <div className="main-content__page">
            <InnerRouter routeMap={this.state.routeMap} />
          </div>

          <BackTop target={() => document.getElementById('mainContent')!} style={{ right: '50px' }} />
        </Layout>
        <BackTop />
      </Layout>
    )
  }

  // 切换菜单折叠状态
  private handleToggle = () => {
    this.setState({ collapse: !this.state.collapse });
  }

}



const mapStateToProps = (state: any) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch: any) => ({
  onSaveUserInfo: (userInfo: any) => dispatch(saveUserInfo(userInfo))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InnerLayout)

