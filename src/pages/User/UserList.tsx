import React from 'react';
import { Button, Modal, Popconfirm } from 'antd';
import CURDTable from './components/CURDTable';
import CURDEdit from './components/CURDEdit';
import CURDHeader from './components/CURDHeader';
import './style.less';

import { scroll } from '@/utils/utils';
import { getList } from './service';
import { TypeMap } from '@/assets/typeMap';
const genderMap = TypeMap.gender;
const roleMap = TypeMap.role;


class UserList extends React.Component {

  public state = {
    tableData: [],
    tableLoading: false,
    total: 0,
    selectedRows: [],
    editVisible: false,
    editKey: '',
    detail: {}
  }

  public queryCondition = {
    name: '',
    pageNum: 1,
    pageSize: 10,
  }

  public columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    sorter: (a: any, b: any) => a.age - b.age
  }, {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
    filters: [
      {
        text: genderMap['1'],
        value: genderMap['1'],
      },
      {
        text: genderMap['2'],
        value: genderMap['2'],
      },
    ],
    filterMultiple: false,
    onFilter: (value: string, record: any) => record.gender.indexOf(value) === 0,
  }, {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
  }, {
    title: '操作',
    key: 'action',
    width: 200,
    render: (text: string, record: any) => (
      <Button.Group>
        <Button type="primary" onClick={() => this.handleEdit(record.key)}>修改</Button>
        <Popconfirm
          title={`确认删除用户${record.name}?`}
          onConfirm={() => this.handleDelete([record])}
          okText="确认"
          cancelText="取消"
        >
          <Button type="danger">删除</Button>
        </Popconfirm>
      </Button.Group>
    ),
  }];

  public componentDidMount() {
    this.getList();
  }

  public getList = () => {
    this.setState({
      tableLoading: true
    })
    getList(this.queryCondition).then((res) => {
      const data = res.data.list.map((item: any) => ({
        ...item,
        key: item.id,
        gender: genderMap[item.gender],
        role: item.role.map(item => roleMap[item]).join(',')
      }));
      this.setState({
        tableLoading: false,
        tableData: data,
        total: res.data.total,
      })
    })
  }

  public handleSearch = (value: string) => {
    this.queryCondition.name = value;
    this.getList()
  }

  public handleEdit = (id?: string) => {
    this.setState({
      editVisible: true,
      editKey: id || ''
    })
  }

  public handleDelete = (rows?: any[]) => {
    if (rows) {
      const ids = rows.map(row => row.key);
      const names = rows.map(row => row.name).join('，');
      $msg.success(`成功删除用户“${names}”！`);
    } else {
      const selectedRows = this.state.selectedRows;
      if (selectedRows.length === 0) {
        $msg.warning('请选择要删除的用户');
        return;
      }
      const ids = selectedRows.map((row: any) => row.key);
      const names = selectedRows.map((row: any) => row.name).join('，');
      Modal.confirm({
        title: '确认删除以下用户吗?',
        content: names,
        onOk: () => {
          $msg.success(`成功删除用户“${names}”！`);
        }
      });
    }
  }

  public handleSelectedRows = (selectedRows: any[]) => {
    this.setState({
      selectedRows
    })
  }

  public handlePaginationChange = (pagination: any) => {
    Object.assign(this.queryCondition, {
      pageNum: pagination.current,
      pageSize: pagination.pageSize
    })
    this.getList();
    scroll(document.querySelector('.page'), 0, 15);
  }

  public handleClose = () => {
    this.setState({
      editVisible: false
    })
  }

  public render() {
    return (
      <div className="curd-table">
        <CURDHeader
          onAdd={this.handleEdit}
          onDelete={this.handleDelete}
          onSearch={this.handleSearch}
        />
        <CURDTable
          columns={this.columns}
          dataSource={this.state.tableData}
          total={this.state.total}
          tableLoading={this.state.tableLoading}
          onSelectedRows={(this.handleSelectedRows)}
          onPaginationChange={this.handlePaginationChange}
        />
        <CURDEdit
          title="用户信息"
          editVisible={this.state.editVisible}
          editKey={this.state.editKey}
          onClose={this.handleClose}
        />
      </div>
    )
  }
}
export default UserList;



