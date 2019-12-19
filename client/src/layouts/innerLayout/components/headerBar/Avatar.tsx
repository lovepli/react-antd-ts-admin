import React from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Dropdown, Icon, Avatar } from 'antd';
import store from '@/store';
import { removeToken } from '@/store/account/action';



class AvatarMenu extends React.Component<IPageProps, any> {
  private menuList: React.ReactNode;

  private handleMenuClick: (arg: any) => void;

  constructor(props: IPageProps) {
    super(props)
    this.handleMenuClick = ({ key }) => {
      switch (key) {
        case '3':
          store.dispatch(removeToken());
          this.props.history.replace('/account/login')
          break;
      }
    };

    this.menuList = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">
          <Icon type="user" /> 个人中心
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="setting" /> 个人设置
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
          <Icon type="logout" />退出登录
        </Menu.Item>
      </Menu>
    )
  }

  public render() {
    return (
      <div>
        <Dropdown overlay={this.menuList}>
          <Avatar style={{ backgroundColor: '#87d068', cursor: 'pointer' }} icon="user" />
        </Dropdown>
        <span>{store.getState().userInfo.name}</span>
      </div>
    )
  }
}

export default withRouter(AvatarMenu);
