import React from 'react';
import { Table } from 'antd';
import scrollTo from '@/utils/scrollTo';

interface IUserTableProps {
  columns: any[];
  dataSource: any[];
  total: number;
  tableLoading: boolean;
  onSelectedRows: (rows: any[]) => void;
  onPaginationChange: (pagination: any) => void;
}

class UserTable extends React.Component<IUserTableProps> {

  public rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      this.props.onSelectedRows(selectedRows);
    },
  }

  public handleChange = (pagination: any) => {
    this.props.onPaginationChange(pagination);
    scrollTo(document.getElementById('mainContent')!, 0);
  }

  public render() {
    const { tableLoading, columns, dataSource, total } = this.props;
    return (
      <Table
        bordered={true}
        size="small"
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
}
export default UserTable;
