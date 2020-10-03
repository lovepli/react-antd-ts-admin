// 侧边栏
import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars'
import { IRoute } from '@/router/innerRouter'
import SvgIcon, { IconName } from '@/components/base/svg-icon'
import logo from '@/assets/images/logo.png'
import NavLink from './NavLink'
import './style.less'

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
              {icon ? <SvgIcon name={icon} /> : null}
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
        <div className="side-bar__logo">
          <Link to="/dashboard">
            <img className="image" src={logo} alt="" />
            <span className="title">Admin</span>
          </Link>
        </div>

        <Menu theme="dark" mode="inline" defaultSelectedKeys={['Dashboard']}>
          {routeMap.map((route) => getMenuItem(route))}
        </Menu>
      </div>
    </Scrollbars>
  )
}

export default SiderBar
