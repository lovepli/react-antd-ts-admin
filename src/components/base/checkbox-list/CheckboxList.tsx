// 带钩子图标的选择框
//  value为数组时为多选

import React from 'react'
import cs from 'classnames'
import { CheckOutlined } from '@ant-design/icons'
import './style.less'

interface IItem {
  id: number
  name: string
  disabled?: boolean
  [key: string]: any
}

interface IProps {
  // 选中项的id数组
  value: number[]
  // 选项列表
  list: IItem[]
  // 单选模式
  single: boolean
  // 列数
  column: number
  className: string
  style: React.CSSProperties
  // 是否禁用所有选项
  disabled: boolean
  onChange: (value: number[]) => void
  //自定义渲染
  renderLabel: (option: IItem) => JSX.Element
}

const CheckBoxList: React.FC<Partial<IProps>> = (props) => {
  const {
    list = [],
    value = [],
    single = false,
    column = 1,
    className,
    style,
    disabled = false,
    onChange
  } = props

  const handleChange = (item: IItem) => {
    const currentValue = item.id
    if (disabled || item.disabled) return
    if (value.includes(currentValue)) {
      triggerChange(value.filter((i) => i !== currentValue))
    } else {
      single ? triggerChange([currentValue]) : triggerChange([...value, currentValue])
    }
  }

  const triggerChange = (changedValue: number[]) => {
    onChange && onChange(changedValue)
  }

  return (
    <div
      className={cs('com-checkbox-list', className)}
      style={{
        ...style,
        gridTemplateColumns: `repeat(${column},1fr)`
      }}
    >
      {list.map((item) => (
        <div
          className={cs(
            'item',
            value.includes(item.id) ? 'checked' : '',
            disabled ? 'disabled' : item.disabled ? disabled : ''
          )}
          key={item.id}
          onClick={handleChange.bind(null, item)}
        >
          {props.renderLabel ? props.renderLabel(item) : item.name}
          {value.includes(item.id) && (
            <div className="triangle">
              <CheckOutlined className="hook" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default CheckBoxList
