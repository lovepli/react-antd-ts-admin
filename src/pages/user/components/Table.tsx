import React from 'react';
import { Table } from 'antd';
import scrollTo from '@/utils/scrollTo';

interface IUserTableProps {
  columns: any[];
  dataSource: any[];
  total: number;
  tableLoading: boolean;
  onSelectedRows: (rows: any[]) => void;
  onPagination: (pageNumber: number, pageSize: number) => void;
}

class UserTable extends React.Component<IUserTableProps> {

  public rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      this.props.onSelectedRows(selectedRows);
    },
  }

  public render() {
    const { tableLoading, columns, dataSource, total } = this.props;
    return (
      <Table
        bordered={true}
        size="middle"
        columns={columns}
        dataSource={dataSource}
        loading={tableLoading}
        rowSelection={this.rowSelection}
        onChange={this.handleChange}
        pagination={{
          total,
          defaultCurrent: 1,
          defaultPageSize: 10,
          pageSizeOptions: ['10', '20', '30', '50', '100'],
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total) => `共${total}条数据`,
        }}
      />
    )
  }

  private handleChange = (pagination: any) => {
    this.props.onPagination(pagination.current, pagination.pageSize);
    scrollTo(document.getElementById('layoutMain')!, 0);
  }

}
export default UserTable;
