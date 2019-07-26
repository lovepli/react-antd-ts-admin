import React from 'react';

import { Tabs } from 'antd';
const { TabPane } = Tabs;

import Dropdown from './components/DorpDown';
import FileTable from './components/FileTable';
import SelectSupplier from './components/SelectSupplier';
import EditableTree from './components/EditableTree';


class Component extends React.Component {
  public render() {
    return (
      <Tabs
        defaultActiveKey="1"
        tabPosition="left"
        style={{ backgroundColor: '#fff', padding: '16px 0' }}
      >
        <TabPane tab="下拉菜单" key="1">
          <Dropdown />
        </TabPane>

        <TabPane tab="文件列表" key="2">
          <FileTable />
        </TabPane>

        <TabPane tab="选择供应商" key="3">
          <SelectSupplier />
        </TabPane>

        <TabPane tab="可编辑的树" key="4">
          <EditableTree />
        </TabPane>
      </Tabs>

    );
  }
}

export default Component;
