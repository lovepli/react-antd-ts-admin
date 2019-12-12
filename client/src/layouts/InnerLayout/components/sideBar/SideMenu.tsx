// 侧边菜单

import React from 'react';
import { Menu, Icon } from 'antd';
import { routeConfig, IRoute } from '@/router/innerRouter';
import NavLink from './NavLink';



class SideMenu extends React.Component {

  public render() {
    return (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['Dashboard']}>
        {routeConfig.map(route => this.getMenuItem(route))}
      </Menu>
    )
  }

  // 根据路由配置生成菜单
  private getMenuItem = (route: IRoute) => {
    const { name, title, path, icon, children } = route;
    if (children) {
      return (
        <Menu.SubMenu
          key={name}
          title={
            <span>
              <Icon type={icon} />
              <span>{title}</span>
            </span>
          }
        >
          {children.map((route: IRoute) => this.getMenuItem(route))}
        </Menu.SubMenu>
      )
    }
    return (
      <Menu.Item key={name}>
        <NavLink path={path + ''} icon={icon} title={title} />
      </Menu.Item>
    )
  }
}

export default SideMenu;


