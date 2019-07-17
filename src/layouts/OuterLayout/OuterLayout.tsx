import React from 'react';
import { OuterRouter } from '@/router';
import './style.less';




class OuterLayout extends React.Component {
  public render() {
    return (
      <div className="outer-layout">
        <OuterRouter />
      </div>
    )
  }
}

export default OuterLayout;
