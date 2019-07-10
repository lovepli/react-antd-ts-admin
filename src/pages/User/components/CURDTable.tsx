import React from 'react';
import { Table } from 'antd';

interface ICURDTableProps {
  columns: any[];
  dataSource: any[];
  total: number;
  tableLoading: boolean;
  onSelectedRows: (rows: any[]) => void;
  onPaginationChange: (pagination: any) => void;
}

class CURDTable extends React.Component<ICURDTableProps> {

  public rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      this.props.onSelectedRows(selectedRows);
    },
  }

  public render() {
    const { tableLoading, columns, dataSource, total, onPaginationChange } = this.props;
    return (
      <Table
        bordered={true}
        size="small"
        columns={columns}
        dataSource={dataSource}
        loading={tableLoading}
        rowSelection={this.rowSelection}
        onChange={onPaginationChange}
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
export default CURDTable;
