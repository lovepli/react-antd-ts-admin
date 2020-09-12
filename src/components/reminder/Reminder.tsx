import React from 'react'
import ReactDOM from 'react-dom'
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
  LoadingOutlined
} from '@ant-design/icons'

import './style.less'

const iconType = {
  info: <ExclamationCircleOutlined />,
  success: <CheckCircleOutlined />,
  error: <CloseCircleOutlined />,
  warning: <WarningOutlined />,
  loading: <LoadingOutlined />
}

type ReminderType = 'info' | 'success' | 'error' | 'warning' | 'loading'
interface IConfig {
  // 提示类型
  type?: ReminderType
  // 消息内容
  message?: string | React.ReactNode
  // 多久之后自动关闭
  duration?: number
  // 是否自动关闭
  autoClose?: boolean
}

interface IProps {
  config: any
  onClose: () => void
}

// Remind组件
class Remind extends React.Component<IProps> {
  public render() {
    const { type, message } = this.props.config
    return (
      <div className={`reminder reminder--${type}`}>
        {iconType[type]}

        <div className="reminder__content">{message}</div>
        <span className="reminder__closeBtn" onClick={this.props.onClose}>
          ×
        </span>
      </div>
    )
  }
}

// 参数处理
const argManage = (config: string | IConfig) => {
  let options: string | IConfig = config || {}
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  return Object.assign(
    {
      type: 'info',
      message: '',
      duration: 3000,
      autoClose: true
    },
    options
  )
}

const reminder = (config: string | IConfig) => {
  const options = argManage(config)
  let timer: any = null
  const close = () => {
    document.body.removeChild(container)
    clearTimeout(timer)
  }

  const { duration, autoClose } = options
  if (autoClose) {
    timer = setTimeout(close, duration)
  }

  const container: HTMLDivElement = document.createElement('div')
  document.body.appendChild(container)

  const ref = ReactDOM.render(<Remind config={options} onClose={close} />, container)
  // 返回对组件的引用,
  // TODO 改为callback ref
  return ref
}

// 设置每种类型调用的别名
const TYPES: ReminderType[] = ['success', 'warning', 'info', 'error', 'loading']
TYPES.forEach((type: ReminderType) => {
  reminder[type] = (config: string | IConfig) => {
    const options = argManage(config)
    options.type = type
    reminder(options)
  }
})

export default reminder
