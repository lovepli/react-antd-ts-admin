// Mask组件可以包含任意组件，形成遮罩效果。比如预览的时候使用。

import React from 'react';
import ReactDOM from 'react-dom';
import './style.less';

interface IProps {
  visible: boolean;
  onClose: () => void;
}


class Mask extends React.Component<IProps> {

  public container: HTMLDivElement = document.createElement('div')

  public componentDidMount() {
    document.body.appendChild(this.container);
  }

  public componentWillUnmount() {
    document.body.removeChild(this.container);
  }

  public render() {
    const { visible, children } = this.props;
    if (visible) {
      return ReactDOM.createPortal(
        <div
          className="mask"
          onClick={this.handleClick}
        >
          {
            children
          }
        </div>,
        this.container
      )
    } else {
      return null
    }
  }


  private handleClick = (event: any) => {
    if (event.target.classList.contains('mask')) {
      this.props.onClose();
    }
  }
}

export default Mask;
