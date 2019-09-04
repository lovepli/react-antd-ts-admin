// 带钩子图标的选择框
//  value为数组时为多选

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

class HookSelect extends React.Component<IProps, IState>{

  // 组件的state通过这个生命周期钩子来控制
  public static getDerivedStateFromProps(nextProps: IProps, state: IState) {
    if (nextProps.value !== state.value) {
      return {
        value: nextProps.value,
      };
    }
    return null;
  }

  constructor(props: IProps) {
    super(props);
    const value = typeof props.value === 'undefined' ? props.defaultValue : props.value;
    this.state = { value }
  }


  public render() {
    const { options = [] } = this.props;
    return (
      <ul className="hook-select">
        {
          options.map((option: IOptions) => (
            <li
              key={option.value}
              className={this.state.value === option.value ? 'active-border' : ''}
              onClick={this.handleChange.bind(this, option.value)}
            >
              <div className="label">{option.label} </div>
              {this.addHook(option.value, this.state.value)}
            </li>
          ))
        }
      </ul>
    )
  }

  // 添加蓝色钩子图标
  private addHook = (currentValue: any, values: any) => {
    let hook: React.ReactNode = (
      <div className="hook-select__triangle">
        <span className="hook-select__hook">√</span>
      </div>
    );
    if (Array.isArray(values)) {
      if (!values.includes(currentValue)) {
        hook = null;
      }
    } else {
      if (currentValue !== values) {
        hook = null;
      }
    }
    return hook;
  }

  private triggerChange = (changedValue: any) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue)
    }
  };

  private handleChange = (value: any) => {
    // 如果某一项已经选择了，再次点击则取消选择
    if (Array.isArray(this.state.value)) {
      const stateValue = [...this.state.value];
      if (stateValue.includes(value)) {
        const index = stateValue.indexOf(value);
        stateValue.splice(index, 1);
        this.triggerChange(stateValue);
      } else {
        this.triggerChange([...stateValue, value]);
      }
    } else {
      if (this.state.value === value) {
        this.triggerChange('');
      } else {
        this.triggerChange(value);
      }
    }
  }
}

export default HookSelect;


