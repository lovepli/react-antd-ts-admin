// 侧边栏

import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { routeConfig } from '@/router/innerRouter';
import MenuItem from './MenuItem';
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
          {routeConfig.map(route => <MenuItem key={route.path + ''} title={route.title} icon={route.icon} path={route.path + ''} />)}
        </Menu>
      </div>
    )
  }




}

export default SiderBar;
