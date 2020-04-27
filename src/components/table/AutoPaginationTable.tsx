import { Table } from "antd";
import { TableEventListeners, TableSize } from "antd/lib/table";
import * as React from "react";
import scrollTo from "@/utils/scrollTo";

interface IProps {
  size?: TableSize;
  borderd?: boolean;
  showHeader?: boolean;
  columns: any[];
  dataSource: any[];
  loading?: boolean;
  isPagination?: boolean;
  isSelectRows?: boolean;
  selectedRowKeys?: string[];
  scrollTo?: number;
  scroll?: object;
  onSelectedRows?: (rows: any[]) => void;
  onRow?: (record: any, index: number) => TableEventListeners;
}

interface IState {
  selectedRowKeys: string[];
}

export class AutoPaginationTable extends React.Component<IProps, IState> {
  public static defaultProps = {
    isPagination: false,
    isSelectRows: false,
  };

  public readonly state: Readonly<IState> = {
    selectedRowKeys: this.props.selectedRowKeys ? this.props.selectedRowKeys : [],
  };

  public componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.selectedRowKeys) {
      this.setState({
        selectedRowKeys: nextProps.selectedRowKeys,
      });
    }
  }

  public render() {
    return (
      <Table
        size={this.props.size ? this.props.size : "default"}
        bordered={this.props.borderd}
        rowKey={getRowKey}
        columns={this.props.columns}
        dataSource={this.props.dataSource}
        pagination={this.props.isPagination ? this.getPaginationOption() : false}
        loading={this.props.loading}
        rowSelection={this.props.isSelectRows ? this.getRowSelection() : undefined}
        onChange={this.handlePaginationChange}
        showHeader={this.props.showHeader}
        onRow={this.props.onRow}
        scroll={this.props.scroll}
      />
    );
  }

  private getRowSelection = () => ({
    selectedRowKeys: this.state.selectedRowKeys,
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      this.setState({ selectedRowKeys });
      if (this.props.onSelectedRows) {
        this.props.onSelectedRows(selectedRows);
      }
    },
  });

  private getPaginationOption = () => ({
    size: "small",
    total: this.props.dataSource.length,
    defaultCurrent: 1,
    defaultPageSize: 10,
    pageSizeOptions: ["10", "20", "30", "50", "100"],
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal: () => `共${this.props.dataSource.length}条数据`,
  });

  private handlePaginationChange = (pagination: any) => {
    const scroll = this.props.scrollTo;
    if (scroll || scroll === 0) {
      scrollTo(document.getElementsByClassName("ant-layout")[1], scroll, 500);
    }
  };
}

const getRowKey = (record: any) => record.id;
