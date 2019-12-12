import React from 'react';
import { Button, Avatar } from 'antd';
import Mask from '@/components/mask';

class MaskDemo extends React.Component {

  public state = {
    maskVisible: false,
    imgURL: 'https://s2.ax1x.com/2019/08/02/edRc1P.jpg'
  }

  public render() {
    return (
      <div>
        <div onClick={this.handleToggleMask}>
          <p>点击图片</p>
          <Avatar
            style={{ cursor: "pointer" }}
            size={80}
            src={this.state.imgURL}
          />
        </div>

        <Mask
          visible={this.state.maskVisible}
          onClose={this.handleToggleMask}
        >
          <img
            style={{ width: '500px' }}
            src={this.state.imgURL}
          />
        </Mask>
      </div>
    )
  }

  private handleToggleMask = () => {
    this.setState({
      maskVisible: !this.state.maskVisible
    })
  }

}

export default MaskDemo;
