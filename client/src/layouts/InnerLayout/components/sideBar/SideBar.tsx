// 侧边栏

import React from 'react';
import { Link } from 'react-router-dom';
import SideMenu from './SideMenu';
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
        <SideMenu />
      </div>
    )
  }
}

export default SiderBar;
