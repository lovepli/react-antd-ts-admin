import React from 'react';
import { Icon } from 'antd';
import './style.less';
import Avatar from './Avatar';

interface IHeaderProps {
  collapse: boolean;
  onToggle: () => void
}

const HeaderBar: React.SFC<IHeaderProps> = (props) => {
  const { collapse, onToggle } = props;
  return (
    <div className="header-bar">
      <Icon
        className="header-bar__trigger"
        type={collapse ? 'menu-unfold' : 'menu-fold'}
        onClick={onToggle}
      />
      <div className="header-bar__menu">
        <Avatar />
      </div>
    </div>
  )
}



export default HeaderBar;
