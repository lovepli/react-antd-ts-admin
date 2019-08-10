import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.less';
import logo from '@/assets/images/logo.png';

function Logo() {
  return (
    <div className="logo">
      <Link to="/dashboard">
        <img src={logo} alt="" />
        <span className="title">Admin</span>
      </Link>
    </div>
  )
}

export default Logo;
