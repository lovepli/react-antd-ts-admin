import React from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "antd";
import "./Menu.less";

interface INavLinkProps {
  path: string;
  icon: string;
  title: string;
}

const NavLink: React.SFC<INavLinkProps> = ({ path, icon, title }) => {
  return (
    <Link to={path}>
      <Icon type={icon} />
      <span>{title}</span>
    </Link>
  );
};

const SiderMenu: React.SFC = () => {
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
      <Menu.Item key="1">
        <NavLink path="/dashboard" icon="pie-chart" title="首页" />
      </Menu.Item>

      <Menu.Item key="2">
        <NavLink path="/icon" icon="pie-chart" title="图标" />
      </Menu.Item>

      <Menu.Item key="3">
        <NavLink path="/user" icon="user" title="用户管理" />
      </Menu.Item>

      <Menu.SubMenu
        key="10"
        title={
          <span>
            <Icon type="mail" />
            <span>文章管理</span>
          </span>
        }
      >
        <Menu.Item key="11">
          <NavLink path="/articleList" icon="pie-chart" title="文章列表" />
        </Menu.Item>

        <Menu.Item key="12">
          <NavLink path="/dashboard" icon="pie-chart" title="草稿箱" />
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.Item key="13">
        <NavLink path="/component" icon="pie-chart" title="组件" />
      </Menu.Item>

      <Menu.Item key="14">
        <NavLink path="/structure" icon="pie-chart" title="组织架构" />
      </Menu.Item>
    </Menu>
  );
};

export default SiderMenu;
