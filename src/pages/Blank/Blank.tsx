import React from 'react';
import { Button } from 'antd';
import BaseComponent from '@/components/BaseComponent/BaseComponent';
import reminder from '@/components/Reminder/Reminder';


class Blank extends BaseComponent {



  public render() {

    return (
      <div>
        <Button onClick={this.handleRemind}>点击</Button>
      </div>
    )
  }

  private handleRemind = () => {
    const ref: any = reminder({
      type: 'loading',
      message: <div>防静\电管疾风剑豪</div>,
      autoClose: false

    })
    setTimeout(ref.props.onClose, 3000)

  }


}

export default Blank;
