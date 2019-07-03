import React from 'react';

import { Tabs } from 'antd';
const { TabPane } = Tabs;

import Dropdown from './components/Dropdown';
import FileTable from './components/FileTable';
import SelectSupplier from './components/SelectSupplier';


class Component extends React.Component {
  public render() {
    return (
      <div>
        <Tabs defaultActiveKey="1" tabPosition="top">
          <TabPane tab="下拉菜单" key="1">
            <Dropdown />
          </TabPane>

          <TabPane tab="文件列表" key="2">
            <FileTable />
          </TabPane>

          <TabPane tab="选择供应商" key="3">
            <SelectSupplier />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Component;
