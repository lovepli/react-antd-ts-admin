import { Table } from "antd";
import { TableSize } from "antd/lib/table";
import * as React from "react";
import scrollTo from "@/utils/scrollTo";
import { IColumnProps } from "./IColumnProps";

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

interface IProps {
  // 表格大小
  size?: TableSize;
  // 表格是否带边框
  borderd?: boolean;
  // 表格列定义
  columns: IColumnProps[];
  // 数据源
  dataSource: any[];
  // 加载中
  loading?: boolean;
  // 数据总数
  total?: number;
  // 初始化时默认的首页
  defaultPageIndex?: number;
  // 初始化时默认的表格大小
  defaultPageSize?: number;
  // 默认选中的行的key
  selectedRowKeys?: string[];
  // 翻页之后表格向上滚动到指定的位置
  scrollTo?: number;
  // 翻页或选择pageSize之后触发的方法
  onPagination: (pageNumber: number, pageSize: number) => void;
  // 多选之后触发的方法
  onSelectedRows?: (rows: any[]) => void;
  // 点击表格行
  onClickRow?: (record: any, index: number) => void;
}

interface IState {
  selectedRowKeys: string[];
}

export class PagedTable extends React.Component<IProps, IState> {
  public static defaultProps = {
    size: "default",
    defaultPageIndex: 1,
    defaultPageSize: 10,
  };

  public readonly state: Readonly<IState> = {
    selectedRowKeys: this.props.selectedRowKeys || [],
  };

  public render() {
    const getRowKey = (record: any) => record.id;
    return (
      <div>
         <Table columns={columns} dataSource={data} />
      {/*   <Table
          // size={this.props.size}
          // bordered={this.props.borderd}
          rowKey={getRowKey}
          columns={columns}
          dataSource={this.props.dataSource}
          // pagination={this.getPaginationOption()}
          // rowSelection={this.props.onSelectedRows ? this.getRowSelection() : undefined}
          // loading={this.props.loading}
          // onChange={this.handlePagination}
          // onRow={this.handleRow}
        /> */}
      </div>
    );
  }

  private getColumns = () => {
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
    return columns;
  };

  // 设置行属性
  private handleRow = (record: any, index: number) => {
    return {
      onClick: () => {
        if (this.props.onClickRow) {
          this.props.onClickRow(record, index);
        }
      },
    };
  };

  // 获取选择的行
  private getRowSelection = () => ({
    selectedRowKeys: this.state.selectedRowKeys,
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      this.setState({ selectedRowKeys });
      if (this.props.onSelectedRows) {
        this.props.onSelectedRows(selectedRows);
      }
    },
  });

  // 分页
  private getPaginationOption = () => ({
    total: this.props.total,
    defaultCurrent: this.props.defaultPageIndex,
    defaultPageSize: this.props.defaultPageSize,
    pageSizeOptions: ["10", "20", "30", "50", "100"],
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal: () => `共${this.props.total}条数据`,
  });

  // 换页
  private handlePagination = (pagination: any) => {
    this.props.onPagination(pagination.current, pagination.pageSize);
    // 翻页之后清空选择的row
    this.setState({
      selectedRowKeys: [],
    });
    const scroll = this.props.scrollTo;
    if (scroll || scroll === 0) {
      scrollTo(document.getElementsByClassName("ant-layout")[1], scroll, 500);
    }
  };
}
