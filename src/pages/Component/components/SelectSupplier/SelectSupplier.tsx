import React from 'react';

import { Button } from 'antd';

import SelectSupplier from '@/components/SelectSupplier';


class SelectSupplierDemo extends React.Component {
  public state = {
    modalVisible: false
  };

  public handleClick = () => {
    this.setState({
      modalVisible: true,
    });
  };

  public hideModal = () => {
    this.setState({
      modalVisible: false,
    });
  }

  public render() {
    return (
      <div>
        <Button type="primary" onClick={this.handleClick}>Open Modal</Button>
        <SelectSupplier modalVisible={this.state.modalVisible} hideModal={this.hideModal} />
      </div>
    )
  }
}

export default SelectSupplierDemo;

