import React from 'react';
import { Divider, Modal, Popconfirm } from 'antd';
import Table from './components/Table';
import Edit from './components/Edit';
import Header from './components/Header';
import { IState, defaultState } from './state';
import service from './service';
import './style.less';


class User extends React.Component<any, IState> {

  public state = defaultState

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
    // filters: [
    //   {
    //     text: genderMap['1'],
    //     value: genderMap['1'],
    //   },
    //   {
    //     text: genderMap['2'],
    //     value: genderMap['2'],
    //   },
    // ],
    filterMultiple: false,
    onFilter: (value: string, record: any) => record.gender.indexOf(value) === 0,
  }, {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
  }, {
    title: '注册时间',
    dataIndex: 'time',
    key: 'time',
    sorter: (a: any, b: any) => Date.parse(a.time) - Date.parse(b.time)
  }, {
    title: '操作',
    key: 'action',
    width: 200,
    render: (text: string, record: any) => (
      <span>
        <a onClick={() => this.handleEdit(record.key)}>修改</a>
        <Divider type="vertical" />
        <Popconfirm
          title={`确认删除用户${record.name}?`}
          onConfirm={() => this.handleDelete([record])}
          okText="确认"
          cancelText="取消"
        >
          <a>删除</a>
        </Popconfirm>
      </span>
    )
  }];

  public componentDidMount() {
    this.getList();
  }

  public componentDidUpdate(prevProps: any, prevState: IState) {
    this.getList();

  }

  public render() {
    return (
      <div className="curd-table">
        <Header
          onAdd={this.handleEdit}
          onDelete={this.handleDelete}
          onSearch={this.handleSearch}
        />
        <Table
          columns={this.columns}
          dataSource={this.state.list}
          total={this.state.total}
          tableLoading={this.state.tableLoading}
          onSelectedRows={(this.handleSelectedRows)}
          onPagination={this.handlePagination}
        />
        <Edit
          title="用户信息"
          editVisible={this.state.editVisible}
          editKey={this.state.editKey}
          onClose={this.handleClose}
        />
      </div>
    )
  }

  // 获取表格数据
  private getList = async () => {
    this.setState({ tableLoading: true });
    const response = await service.getList(this.state.query);
    const data = response.list.map((item: any) => ({
      ...item,
      key: item.id,
      gender: $tableMng.getNameById('gender', item.gender),
      role: item.role.map(item => $tableMng.getNameById('role', item)).join(',')
    }));

    this.setState({
      list: data,
      total: response.total,
      tableLoading: false
    })
  }

  // 搜索
  private handleSearch = (keyword: string) => {
    this.setState({ query: { ...this.state.query, keyword } });
  }

  // 翻页
  private handlePagination = (pageNumber: number, pageSize: number) => {
    this.setState({
      query: {
        ...this.state.query,
        ...{ pageNumber, pageSize }
      }
    });
  }


  // 新增或编辑
  private handleEdit = (id?: string) => {
    this.setState({
      editVisible: true,
      editKey: id || ''
    })
  }

  // 删除
  private handleDelete = (rows?: any[]) => {
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

  // 多选
  private handleSelectedRows = (selectedRows: any[]) => {
    this.setState({ selectedRows })
  }

  // 取消
  private handleClose = () => {
    this.setState({ editVisible: false })
  }

}
export default User;



