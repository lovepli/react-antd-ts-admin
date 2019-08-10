import React from "react";
import { Menu, Icon } from "antd";
import NavLink from './components/NavLink';
import { MenuConfig, IMenu } from '@/router/InnerRouter';



const getMenu = (menu: IMenu) => {
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
        {
          children.map((menu: IMenu) => getMenu(menu))
        }
      </Menu.SubMenu>
    )
  }
  return (
    <Menu.Item key={title}>
      <NavLink path={path!} icon={icon} title={title} />
    </Menu.Item>
  )
}

const SiderMenu: React.SFC = () => {
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']}>
      {
        MenuConfig.map(menu => getMenu(menu))
      }
    </Menu>
  );
};

export default SiderMenu;
