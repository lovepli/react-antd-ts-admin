import React from "react";
import {
  ConfigProvider,
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Popconfirm,
  Table,
  Modal,
  Button,
  Select,
  Transfer,
  Radio,
} from 'antd';
import "./style.less";

class Dashboard extends React.Component {

  public render() {
    return (
      <div style={{ backgroundColor: '#fff' }}>
        <DatePicker />
      </div>
    );
  }

}



export default Dashboard;
