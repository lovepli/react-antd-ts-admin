import React from 'react';
import { Link } from "react-router-dom";
import { Icon } from "antd";


interface IProps {
  path: string;
  icon?: string;
  title: string;
}

const NavLink: React.SFC<IProps> = ({ path, icon, title }) => {
  return (
    <Link to={path}>
      {icon ? <Icon type={icon} /> : ""}
      <span>{title}</span>
    </Link>
  );
};

export default NavLink;
