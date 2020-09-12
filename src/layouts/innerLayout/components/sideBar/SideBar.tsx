// 侧边栏
import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars'
import { IRoute } from '@/router/innerRouter'
import NavLink from './NavLink'
import './style.less'
import logo from '@/assets/images/logo.png'

interface IProps {
  routeMap: IRoute[]
}

const renderThumb = (props: any) => {
  const { style, ...rest } = props

  const thumbStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255,255,255,.2)',
    borderRadius: '3px',
    cursor: 'pointer'
  }

  return <div style={{ ...style, ...thumbStyle }} {...rest} />
}

const SiderBar: React.FC<IProps> = ({ routeMap }) => {
  // 根据路由配置生成菜单
  const getMenuItem = (route: IRoute) => {
    const { name, title, path, icon, children } = route

    if (children) {
      return (
        <Menu.SubMenu
          key={name}
          title={
            <span>
              {/* <Icon type={icon} /> */}
              <span>{title}</span>
            </span>
          }
        >
          {children.map((route: IRoute) => getMenuItem(route))}
        </Menu.SubMenu>
      )
    }
    return (
      <Menu.Item key={name}>
        <NavLink path={path + ''} icon={icon} title={title} />
      </Menu.Item>
    )
  }

  return (
    <Scrollbars renderThumbHorizontal={renderThumb} renderThumbVertical={renderThumb}>
      <div className="side-bar">
        {/* logo */}
        <div className="side-bar__logo">
          <Link to="/dashboard">
            <img className="image" src={logo} alt="" />
            <span className="title">Admin</span>
          </Link>
        </div>

        {/* 侧边菜单 */}
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['Dashboard']}>
          {routeMap.map((route) => getMenuItem(route))}
        </Menu>
      </div>
    </Scrollbars>
  )
}

export default SiderBar
