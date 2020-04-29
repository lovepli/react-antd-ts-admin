import React from "react";
import { Table } from "antd";


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

class Dashboard extends React.Component {
  public render() {
    return <Table columns={columns} dataSource={data} />;
  }
}

export default Dashboard;
