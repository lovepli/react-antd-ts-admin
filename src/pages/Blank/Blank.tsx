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
    // reminder('222')
    reminder({
      type: 'success',
      message: '123',

    })
  }


}

export default Blank;
