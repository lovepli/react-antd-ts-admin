import React from "react";
import { Button, Modal, message } from 'antd';
import { getList } from './service';
import "./style.less";

class Dashboard extends React.Component {

  public render() {
    return (
      <div style={{ backgroundColor: '#fff' }}>

        <Button onClick={this.handleDelete}>取消</Button>
      </div>
    );
  }

  private handleDelete() {
    Modal.confirm({
      title: '确认删除以下数据吗?',
      content: '23234',
      onOk: async () => {

        await getList({ id: '111' });
        this.setState({ selectedRows: [] });
        message.success(`成功删除数据！`);
      }
    });
  }
}



export default Dashboard;
