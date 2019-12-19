import React from 'react';
import { Icon } from 'antd';
import './style.less';
import Avatar from './Avatar';

interface IHeaderProps {
  collapse: boolean;
  onTrigger: () => void
}

const HeaderBar: React.SFC<IHeaderProps> = (props) => {
  const { collapse, onTrigger } = props;
  return (
    <div className="header-bar">
      <Icon
        className="header-bar__trigger"
        type={collapse ? 'menu-unfold' : 'menu-fold'}
        onClick={onTrigger}
      />
      <div className="header-bar__menu">
        <Avatar />
      </div>
    </div>
  )
}



export default HeaderBar;
