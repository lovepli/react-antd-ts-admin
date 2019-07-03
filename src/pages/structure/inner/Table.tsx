import { Divider, Table, Popconfirm } from 'antd';
import React from 'react';


interface ITableItem {
  key: string;
  name: string;
  phone: string;
  department: string;
  status: string;
}

interface ITableProps {
  tableData: ITableItem[],
  onEditor: (key: string) => void;
  onRemove: (key: string) => void;
}



class YGTable extends React.Component<ITableProps> {
  public rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
  };

  // 修改
  public handleEditor = (key: string) => {
    this.props.onEditor(key);
  }

  // 删除
  public handleRemove = (key: string) => {
    this.props.onRemove(key);
  }

  public render() {
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
    }, {
      title: '联系电话',
      dataIndex: 'phone',
    }, {
      title: '所属部门',
      dataIndex: 'department',
    }, {
      title: '状态',
      dataIndex: 'status',
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text: string, record: any) => (
        <span>
          <a href="javascript:;" onClick={this.handleEditor.bind(this, record.key)}>修改</a>
          <Divider type="vertical" />
          <Popconfirm
            title={`确认删除用户${record.name}?`}
            onConfirm={this.handleRemove.bind(this, record.key)}
            okText="确认"
            cancelText="取消"
          >
            <a href="javascript:;">删除</a>
          </Popconfirm>
        </span>
      ),
    }];
    return (
      <div style={{ backgroundColor: '#fff', marginTop: '20px' }}>
        <Table rowSelection={this.rowSelection} columns={columns} dataSource={this.props.tableData} pagination={false} />
      </div>
    )
  }
}

export default YGTable;
