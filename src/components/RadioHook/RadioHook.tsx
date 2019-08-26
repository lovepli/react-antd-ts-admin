// 带钩子图标的单选框

import React from 'react';
import './style.less';


interface IOptions {
  label: string | React.ReactNode;
  value: any;
}

interface IProps {
  defaultValue?: any,
  value?: any;
  options?: IOptions[];
  onChange?: (value: any) => void;
}

interface IState {
  value: any;
}



class RadioHook extends React.Component<IProps, IState>{


  constructor(props: IProps) {
    super(props);
    const value = typeof props.value === 'undefined' ? props.defaultValue : props.value;
    this.state = { value }
  }

  public render() {
    const { options = [] } = this.props;
    return (
      <ul className="radio-hook">
        {
          options.map((option: IOptions) => (
            <li
              key={option.value}
              className={this.state.value === option.value ? 'active-border' : ''}
              onClick={this.handleChange.bind(this, option.value)}
            >
              <div className="label">{option.label} </div>
              {
                this.state.value === option.value
                  ? (
                    <div className="radio-hook__triangle">
                      <span className="radio-hook__hook">√</span>
                    </div>
                  )
                  : null
              }
            </li>
          ))
        }
      </ul>
    )
  }

  private handleChange = (value: any) => {
    this.setState({
      value
    })
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }
}

export default RadioHook;

