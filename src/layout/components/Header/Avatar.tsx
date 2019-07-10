import React from 'react';
import { Menu, Dropdown, Icon, Avatar as AntdAvatar } from 'antd';
import { withRouter } from 'react-router-dom';


interface IAvatarProps {
  history: any;
}


class Avatar extends React.Component<IAvatarProps> {
  private menuList: React.ReactNode;

  private handleMenuClick: (arg: any) => void;

  constructor(props: IAvatarProps) {
    super(props)

    this.handleMenuClick = ({ key }) => {
      if (key === '3') {
        sessionStorage.removeItem('token');
        this.props.history.replace('/login')
        location.reload();
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
    console.log(this.props.history);
    return (
      <div>
        <Dropdown overlay={this.menuList}>
          <AntdAvatar style={{ backgroundColor: '#87d068', cursor: 'pointer' }} icon="user" />
        </Dropdown>
        <span>姓名</span>
      </div>

    )
  }
}

export default withRouter(Avatar as any);
