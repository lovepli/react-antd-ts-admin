import React from "react";
import { Table } from "antd";

interface IData {
  key: string;
  supplierName: string;
  linkman: string;
  phone: string;
}

interface IProps {
  tableData: IData[];
  selectTable: (selectedRowKeys: string[]) => void;
}


class YGTable extends React.Component<IProps> {

  public render() {
    const columns = [{
      title: '名称',
      dataIndex: 'supplierName',
    }, {
      title: '联系人',
      dataIndex: 'linkman',
    }, {
      title: '电话',
      dataIndex: 'phone',
    },
    ];

    const rowSelection = {
      onChange: (selectedRowKeys: any) => {
        this.props.selectTable(selectedRowKeys);
      }
    };
    return (
      <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.tableData} pagination={false} size="middle" scroll={{ y: "300px" }} />
    )
  }
}
export default YGTable;
