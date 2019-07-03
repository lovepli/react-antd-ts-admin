import { Button, message, Modal } from 'antd';
import * as React from "react";

import Filter from './inner/Filter';
import Table from './inner/Table';
import EditorForm from './inner/EditorForm';


const STATUS = {
  '0': '停用',
  '1': '启用'
}

const DEPARTMENT = {
  '0': '开发部',
  '1': '客服部',
  '2': '人事部'
}


interface ITableItem {
  key: string;
  name: string;
  phone: string;
  department: string;
  status: string;
}

interface IPageProps {

}

interface IPageState {
  tableData: ITableItem[],
  isModalVisible: boolean;
  editorKey: string
}

const tableData = [{
  key: '1',
  name: '钟峰1',
  phone: '13888888888',
  department: DEPARTMENT['0'],
  status: STATUS['1']
}, {
  key: '2',
  name: '钟峰2',
  phone: '13888888888',
  department: DEPARTMENT['0'],
  status: STATUS['1']
}, {
  key: '3',
  name: '钟峰3',
  phone: '13888888888',
  department: DEPARTMENT['2'],
  status: STATUS['1']
}, {
  key: '4',
  name: '钟峰4',
  phone: '13888888888',
  department: DEPARTMENT['1'],
  status: STATUS['0']
}, {
  key: '5',
  name: '钟峰5',
  phone: '13888888888',
  department: DEPARTMENT['0'],
  status: STATUS['1']
}, {
  key: '6',
  name: '钟峰6',
  phone: '13888888888',
  department: DEPARTMENT['0'],
  status: STATUS['0']
}]


class Page extends React.Component<IPageProps, IPageState> {

  public state = {
    tableData,
    isModalVisible: false,
    editorKey: ''
  }

  public filterData = (data: ITableItem[], key: string) => data.filter(item => item.status === key);

  // 根据账号启用/停用状态进行人员筛选
  public handleFilter = (value: string) => {
    switch (value) {
      case 'a':
        this.setState({
          tableData
        })
        break;
      case 'b':
        this.setState({
          tableData: this.filterData(tableData, STATUS['1'])
        })
        break;
      case 'c':
        this.setState({
          tableData: this.filterData(tableData, STATUS['0'])
        })
        break;
      default:
        this.setState({
          tableData
        })
    }
  }

  // 点击新增
  public handleAdd = () => {
    this.setState({
      isModalVisible: true,
      editorKey: ''
    })
  }

  // 点击修改
  public handleEditor = (key: string) => {
    this.setState({
      isModalVisible: true,
      editorKey: key
    })
  }

  // 点击删除
  public hanldeRemove = (key: string) => {
    const index = this.state.tableData.findIndex(item => item.key === key);
    const tableData = [...this.state.tableData];
    tableData.splice(index, 1)
    this.setState({
      tableData
    })
    message.success('删除成功');
  }

  // 新增或修改
  public updateFormData = (data: any) => {
    if (data.key) {
      const index = this.state.tableData.findIndex(item => item.key === data.key);
      const tableData = [...this.state.tableData];
      Object.assign(data, {
        department: DEPARTMENT[data.department],
        status: STATUS[data.status]
      })
      tableData[index] = data;
      this.setState({
        tableData
      })
    } else {
      this.setState({
        tableData: [...this.state.tableData, Object.assign(data, {
          department: DEPARTMENT[data.department],
          status: STATUS[data.status]
        })]
      })
    }
  }

  // 关闭模态窗
  public handleCancel = () => {
    this.setState({
      isModalVisible: false,
      editorKey: ''
    })
    // Modal.confirm({
    //   title: '提示',
    //   content: '信息未提交，确认关闭？',
    //   onOk: () => {

    //   },
    // });
  };
  public render() {
    return (
      <div>
        <Button type="primary" icon="plus" onClick={this.handleAdd}>新增人员</Button>
        <Filter onChange={this.handleFilter} />
        <Table tableData={this.state.tableData} onEditor={this.handleEditor} onRemove={this.hanldeRemove} />
        <Modal
          key={+new Date()}
          width="800px"
          title={this.state.editorKey ? '修改人员' : '新增人员'}
          visible={this.state.isModalVisible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <EditorForm editorKey={this.state.editorKey} onCancle={this.handleCancel} updateFormData={this.updateFormData} />
        </Modal>
      </div>
    )
  }
}

export default Page;
