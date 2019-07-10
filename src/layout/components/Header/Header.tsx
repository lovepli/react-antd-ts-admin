import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import './Header.less';
import Avatar from './Avatar';

interface IHeader {
  collapse: boolean;
  toggle: any
}



function Header(props: IHeader) {
  return (
    <div className="header">
      <Icon
        className="header-trigger"
        type={props.collapse ? 'menu-unfold' : 'menu-fold'}
        onClick={props.toggle}
      />
      <div className="header-menu">
        <Avatar />
      </div>
    </div>
  )
}

export default Header;
