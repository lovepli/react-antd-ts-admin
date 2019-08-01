import React from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "antd";
import "./Menu.less";

interface INavLinkProps {
  path: string;
  icon?: string;
  title: string;
}

const NavLink: React.SFC<INavLinkProps> = ({ path, icon, title }) => {
  return (
    <Link to={path}>
      {icon ? <Icon type={icon} /> : ""}
      <span>{title}</span>
    </Link>
  );
};
const SiderMenu: React.SFC = () => {
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']}>
      <Menu.Item key="dashboard">
        <NavLink path="/dashboard" icon="dashboard" title="首页" />
      </Menu.Item>

      <Menu.Item key="icon">
        <NavLink path="/icon" icon="smile" title="图标" />
      </Menu.Item>

      <Menu.SubMenu
        key="chart"
        title={
          <span>
            <Icon type="line-chart" />
            <span>图表</span>
          </span>
        }
      >
        <Menu.Item key="lineChart">
          <NavLink path="/chart/lineChart" title="折线图" />
        </Menu.Item>
        <Menu.Item key="areaChart">
          <NavLink path="/chart/areaChart" title="面积图" />
        </Menu.Item>
        <Menu.Item key="pieChart">
          <NavLink path="/chart/pieChart" title="饼状图" />
        </Menu.Item>
        <Menu.Item key="pillarChart">
          <NavLink path="/chart/pillarChart" title="柱状图" />
        </Menu.Item>
        <Menu.Item key="radarChart">
          <NavLink path="/chart/radarChart" title="雷达图" />
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.Item key="user">
        <NavLink path="/user" icon="user" title="用户管理" />
      </Menu.Item>

      <Menu.SubMenu
        key="article"
        title={
          <span>
            <Icon type="mail" />
            <span>文章管理</span>
          </span>
        }
      >
        <Menu.Item key="articleList">
          <NavLink path="/articleList" title="文章列表" />
        </Menu.Item>

        <Menu.Item key="articleCreate">
          <NavLink path="/articleCreate" title="创建文章" />
        </Menu.Item>

        <Menu.Item key="articleDraft">
          <NavLink path="/articleDraft" title="草稿箱" />
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.Item key="component">
        <NavLink path="/component" icon="pie-chart" title="组件" />
      </Menu.Item>

      <Menu.Item key="structure">
        <NavLink path="/structure" icon="pie-chart" title="组织架构" />
      </Menu.Item>
    </Menu>
  );
};

export default SiderMenu;
