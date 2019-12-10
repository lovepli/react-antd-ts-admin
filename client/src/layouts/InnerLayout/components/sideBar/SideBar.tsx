// 侧边栏

import React from 'react';
import { Menu, Icon } from 'antd';
import NavLink from './NavLink';
import { Link } from 'react-router-dom';
import { MenuConfig, IMenu } from '@/router/InnerRouter';
import './style.less';
import logo from '@/assets/images/logo.png';


class SiderBar extends React.Component {
  public render() {
    return (
      <div className="side-bar">
        {/* logo */}
        <div className="side-bar__logo">
          <Link to="/dashboard">
            <img className="image" src={logo} alt="" />
            <span className="title">Admin</span>
          </Link>
        </div>

        {/* 侧边菜单 */}
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']}>
          {MenuConfig.map(menu => this.getMenu(menu))}
        </Menu>
      </div>
    )
  }

  // 生成菜单
  private getMenu = (menu: IMenu) => {
    const { title, path, icon, children } = menu;
    if (children) {
      return (
        <Menu.SubMenu
          key={title}
          title={
            <span>
              <Icon type={icon} />
              <span>{title}</span>
            </span>
          }
        >
          {children.map((menu: IMenu) => this.getMenu(menu))}
        </Menu.SubMenu>
      )
    }
    return (
      <Menu.Item key={title}>
        <NavLink path={path!} icon={icon} title={title} />
      </Menu.Item>
    )
  }
}

export default SiderBar;
