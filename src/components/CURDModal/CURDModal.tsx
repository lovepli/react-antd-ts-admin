import React from 'react';
import { Modal } from 'antd';


interface ICURDModalProps {
  visibleModal: boolean;
}


class UserDetail extends React.Component<ICURDModalProps> {
  public state = { visible: false };

  public showModal = () => {
    this.setState({
      visible: true,
    });
  };

  public handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  public handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  public render() {
    const {visibleModal} = this.props;
    return (
      <Modal
        title="Basic Modal"
        visible={visibleModal}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    )
  }

}

export default UserDetail