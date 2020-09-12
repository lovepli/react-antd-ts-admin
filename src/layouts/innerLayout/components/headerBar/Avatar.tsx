import React from 'react'
import { withRouter } from 'react-router-dom'
import { Menu, Dropdown, Avatar } from 'antd'
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons'
import accountStore from '@/store/account'

class AvatarMenu extends React.Component<IPageProps, any> {
  constructor(props: IPageProps) {
    super(props)
    this.handleMenuClick = ({ key }) => {
      switch (key) {
        case '3':
          accountStore.setToken('')
          this.props.history.replace('/account/login')
          break
      }
    }
  }

  private handleMenuClick: (arg: any) => void

  public getMenuList = () => (
    <Menu onClick={this.handleMenuClick}>
      <Menu.Item key="1">
        <UserOutlined />
        个人中心
      </Menu.Item>
      <Menu.Item key="2">
        <SettingOutlined />
        个人设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  )
  public render() {
    return (
      <div>
        <Dropdown overlay={this.getMenuList}>
          <Avatar style={{ backgroundColor: '#87d068', cursor: 'pointer' }} icon="user" />
        </Dropdown>
        {/* <span>{store.getState().userInfo.name}</span> */}
      </div>
    )
  }
}

export default withRouter(AvatarMenu)
