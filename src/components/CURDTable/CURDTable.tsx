import React from 'react';
import { Button, Input, Row, Col, Table } from 'antd';
import './CURDTable.less';


interface ICURDTableProps {
  columns: any[];
  dataSource: any[];
  total: number;
  tableLoading: boolean;
  onDetail: () => void;
  onDelete: (ids: string[]) => void;
  onSearch: (value: string) => void;
  onPaginationChange: (pagination: any) => void;
}


class SearchTable extends React.Component<ICURDTableProps> {

  public selectedRows: any[] = []

  public rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      this.selectedRows = selectedRows;
    },
  }

  public render() {
    const { tableLoading, columns, dataSource, onDetail, onDelete, onSearch, onPaginationChange, total } = this.props;
    return (
      <div className="search-table">

        <Row type="flex" justify="space-between">
          <Col>
            <Button.Group>
              <Button type="primary" icon="plus" onClick={onDetail}>新增</Button>
              <Button type="danger" icon="minus" onClick={() => onDelete(this.selectedRows)}>删除</Button>
            </Button.Group>
          </Col>
          <Col>
            <Input.Search placeholder="请输入查询关键字" onSearch={(value) => onSearch(value)} enterButton />
          </Col>
        </Row>

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
      </div>

    )
  }
}
export default SearchTable;
