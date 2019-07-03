import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';


import Avatar from './Avatar';
import './Header.less';


interface IHeader {
  collapse: boolean;
  toggle: any
}



function Header(props: IHeader) {
  return (
    <div className="header">
      <Icon
        className="trigger"
        type={props.collapse ? 'menu-unfold' : 'menu-fold'}
        onClick={props.toggle}
      />
      <Avatar />
    </div>
  )
}

export default Header;
