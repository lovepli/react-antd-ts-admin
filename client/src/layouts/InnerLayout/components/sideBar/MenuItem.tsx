import React from 'react';
import { Menu, Icon } from 'antd';
import { routeConfig, IConfigProps } from '@/router/innerRouter';
import NavLink from './NavLink';

interface IMenuItemProps {
  title: string;
  icon?: string;
  path?: string;
  hiddenInMenu?: boolean,
  children?: IMenuItemProps[];
}


class MenuItem extends React.Component<IMenuItemProps> {

  public render() {
    const { title, path, icon, children } = this.props;
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
          {children.map((menu: IMenuItemProps) => <MenuItem key={menu.path} {...menu}/>)}
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

export default MenuItem;
