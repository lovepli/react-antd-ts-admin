import React from 'react';

import './Logo.less';

function Logo() {
  return (
    <div className="logo">
      <a href="#/home">
        <img src={require('@/assets/img/logo.png')} alt="" />
        <span className="title">Admin</span>
      </a>
    </div>
  )
}

export default Logo;
