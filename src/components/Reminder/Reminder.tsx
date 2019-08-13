import React from 'react';
import { Icon } from 'antd';
import ReactDOM from 'react-dom';
import './style.less';


const iconType = {
  info: 'info-circle',
  success: 'check-circle',
  error: 'close-circle',
  warning: 'exclamation-circle',
  loading: 'loading',
};

type ReminderType = 'info' | 'success' | 'error' | 'warning' | 'loading';
interface IConfig {
  type?: ReminderType;
  message?: string;
  duration?: number;
}

interface IProps {
  config: any;
  onClose: () => void;
}

// Remind组件
class Remind extends React.Component<IProps> {

  public render() {
    const { type, message } = this.props.config;
    return (
      <div className={`reminder reminder--${type}`}>
        <Icon className="reminder__icon " type={iconType[type]} theme={type === 'loading' ? 'outlined' : 'filled'} />
        <span className="reminder__content">{message}</span>
        <span className="reminder__closeBtn" onClick={this.props.onClose}>×</span>
      </div>
    )
  }
}



// 参数处理
const argManage = (config: string | IConfig) => {
  let options: string | IConfig = config || {};
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  return Object.assign({
    type: 'info',
    message: '',
    duration: 3000
  }, options)
}


const reminder = (config: string | IConfig) => {
  const options = argManage(config);

  const close = () => {
    document.body.removeChild(container);
    clearTimeout(timer);
  }

  const { duration } = options;
  const timer = setTimeout(close, duration)

  const container: HTMLDivElement = document.createElement('div');
  document.body.appendChild(container);

  ReactDOM.render(<Remind config={options} onClose={close} />, container)
}


// 设置每种类型调用的别名
const TYPES: ReminderType[] = ['success', 'warning', 'info', 'error', 'loading'];
TYPES.forEach((type: ReminderType) => {
  reminder[type] = (config: string | IConfig) => {
    const options = argManage(config);
    options.type = type;
    reminder(options);
  }
})


export default reminder;
