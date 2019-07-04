import React from 'react';
import { Button, Modal, Popconfirm } from 'antd';
import CURDTable from '@/components/CURDTable';
import CURDModal from '@/components/CURDModal';
import { getUserList } from '@/api/user';


class UserList extends React.Component {

  public state = {
    tableLoading: false,
    total: 0,
    tableData: [],
    visibleModal: false,
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
        text: '男',
        value: '男',
      },
      {
        text: '女',
        value: '女',
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
        <Button type="primary" onClick={() => this.handleDetail(record.key)}>修改</Button>
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
    this.getUserList();
  }

  public getUserList = () => {
    this.setState({
      tableLoading: true
    })
    getUserList(this.queryCondition).then((res) => {
      const data = res.data.userList.map((item: any) => ({
        key: item.id,
        name: item.name,
        age: item.age,
        gender: item.gender,
        role: item.role
      }))
      this.setState({
        tableLoading: false,
        tableData: data,
        total: res.data.userAmount,
      })
    })
  }

  public handleSearch = (value: string) => {
    this.queryCondition.name = value;
    this.getUserList()
  }

  public handleDetail = (id?: string) => {
    this.setState({
      visibleModal: true
    })
    if (id) {
      console.log(id)
    } else {
      console.log(id)
    }
  }

  public handleDelete = (rows: any[]) => {
    if (rows.length === 0) {
      $msg.warning('请选择要删除的用户');
      return;
    }
    const ids = rows.map(row => row.key);
    const names = rows.map(row => row.name).join('，');
    if (ids.length === 1) {
      $msg.success(`成功删除用户“${names}”！`)
      this.getUserList()
    } else {
      const { confirm } = Modal;
      confirm({
        title: '确认删除以下这些用户吗?',
        content: names,
        onOk: () => {
          $msg.success(`成功删除用户“${names}”！`)
          this.getUserList()
        }
      });
    }
  }

  public handlePaginationChange = (pagination: any) => {
    Object.assign(this.queryCondition, {
      pageNum: pagination.current,
      pageSize: pagination.pageSize
    })
    this.getUserList();
  }

  public render() {
    return (
      <React.Fragment>
        <CURDTable
          tableLoading={this.state.tableLoading}
          columns={this.columns}
          dataSource={this.state.tableData}
          onPaginationChange={this.handlePaginationChange}
          onSearch={this.handleSearch}
          onDetail={this.handleDetail}
          onDelete={this.handleDelete}
          total={this.state.total}
        />
        <CURDModal visibleModal={this.state.visibleModal} />
      </React.Fragment>
    )
  }
}
export default UserList;
