import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import './Header.less';
import Avatar from './Avatar';

interface IHeaderProps {
  collapse: boolean;
  onToggle: () => void
}

const Header: React.SFC<IHeaderProps> = ({ collapse, onToggle }) => {
  return (
    <div className="header">
      <Icon
        className="header-trigger"
        type={collapse ? 'menu-unfold' : 'menu-fold'}
        onClick={onToggle}
      />
      <div className="header-menu">
        <Avatar />
      </div>
    </div>
  )
}



export default Header;
