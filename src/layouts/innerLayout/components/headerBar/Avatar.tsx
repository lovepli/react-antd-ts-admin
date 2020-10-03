import React from 'react'
import { useHistory } from 'react-router-dom'
import { Menu, Dropdown, Avatar } from 'antd'
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons'
import accountStore from '@/store/account'

const AvatarMenu: React.FC = () => {
  const history = useHistory()

  const handleMenuClick = ({ key }) => {
    switch (key) {
      case 'logout':
        accountStore.setToken('')
        history.replace('/account/login')
        break
    }
  }

  const getMenuList = () => (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="mine">
        <UserOutlined />
        个人中心
      </Menu.Item>
      <Menu.Item key="setting">
        <SettingOutlined />
        个人设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  )

  return (
    <div>
      <Dropdown overlay={getMenuList}>
        <Avatar style={{ backgroundColor: '#87d068', cursor: 'pointer' }} icon="user" />
      </Dropdown>
      <span>{accountStore.account.username}</span>
    </div>
  )
}

export default AvatarMenu
