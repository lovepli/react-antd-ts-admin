import { Button, Icon, Input, Row, Col } from "antd";
import React from "react";
import { PagedTable, createColumnBuilder } from "@/components/table";
import SectionTitle from "@/components/sectionTitle";
import Edit from "./components/Edit";
import { IState, defaultState } from "./state";
import service from "./service";
import "./style.less";

import { Table, Divider, Tag } from "antd";


const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
  },

];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,

  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,

  },
];
class User extends React.Component<{}, IState> {
  public readonly state: Readonly<IState> = defaultState;

  public componentDidMount() {
    this.getList();
  }

  public render() {
    return (
      <div className="curd-table">
        <Row type="flex" justify="space-between">
          <Col>
            <SectionTitle name="用户列表" />
            <Button.Group>
              <Button type="primary" icon="plus" onClick={this.handleEdit}>
                新增用户
              </Button>
              <Button type="danger" icon="minus">
                批量删除
              </Button>
            </Button.Group>
          </Col>
          <Col>
            <Input.Search placeholder="请输入查询关键词" onSearch={this.handleSearch} enterButton={true} />
          </Col>
        </Row>
        {/* <Table columns={columns} dataSource={data} /> */}
        <PagedTable
          columns={this.getTableColumns()}
          dataSource={this.state.list}
          loading={this.state.tableLoading}
          total={this.state.total}
          defaultPageIndex={defaultState.query.pageNumber}
          defaultPageSize={defaultState.query.pageSize}
          onSelectedRows={this.handleSelectedRows}
          onPagination={this.handlePagination}
        />

        <Edit
          title="用户信息"
          editVisible={this.state.editVisible}
          editKey={this.state.editKey}
          onClose={this.handleClose}
        />
      </div>
    );
  }

  // 创建表格列
  private getTableColumns() {
    const builder = createColumnBuilder();
    // builder.AddSortNum(this.state.query.pageNumber, this.state.query.pageSize, 60);
    builder.addText("姓名", "name");
    builder.addText("年龄", "age");
    // builder.addCodeIdToName("性别", "gender", "gender");
    // builder.addHandle(
    //   [
    //     {
    //       type: "edit",
    //       handle: this.handleEdit,
    //     },
    //     {
    //       type: "delete",
    //       handle: this.handleDelete,
    //     },
    //   ],
    //   140
    // );

    // const columns = builder.getColumns();
    const columns = [
      {
        title: "姓名",
        dataIndex: "name",
      },
      {
        title: "年龄",
        dataIndex: "age",
      },
    ];
    console.log(columns)
    return columns;
  }

  // 获取表格数据
  private getList = async () => {
    this.setState({ tableLoading: true });
    const data = await service.getList(this.state.query);
    this.setState({
      list: data.list,
      total: data.total,
      tableLoading: false,
    });
  };

  // 搜索
  private handleSearch = (keyword: string) => {
    this.setState(
      {
        query: { ...this.state.query, keyword },
      },
      this.getList
    );
  };

  // 翻页
  private handlePagination = (pageNumber: number, pageSize: number) => {
    this.setState(
      {
        query: {
          ...this.state.query,
          ...{ pageNumber, pageSize },
        },
      },
      this.getList
    );
  };

  // 新增或编辑
  private handleEdit = (e, id?: string) => {
    console.log(222);
    // this.setState({
    //   editVisible: true,
    //   editKey: id || "",
    // });
  };

  // 删除
  private handleDelete = (rows?: any[]) => {
    console.log(111);
    console.log(rows);
    // if (rows) {
    //   const ids = rows.map((row) => row.key);
    //   const names = rows.map((row) => row.name).join("，");
    //   $msg.success(`成功删除用户“${names}”！`);
    // } else {
    //   const selectedRows = this.state.selectedRows;
    //   if (selectedRows.length === 0) {
    //     $msg.warning("请选择要删除的用户");
    //     return;
    //   }
    //   const ids = selectedRows.map((row: any) => row.key);
    //   const names = selectedRows.map((row: any) => row.name).join("，");
    //   Modal.confirm({
    //     title: "确认删除以下用户吗?",
    //     content: names,
    //     onOk: () => {
    //       $msg.success(`成功删除用户“${names}”！`);
    //     },
    //   });
    // }
  };

  // 多选
  private handleSelectedRows = (selectedRows: any[]) => {
    this.setState({ selectedRows });
  };

  // 取消
  private handleClose = () => {
    this.setState({ editVisible: false });
  };
}
export default User;
