import React from 'react'
import './style.less'

interface ILabelListProps {
  className?: string
  style?: React.CSSProperties
  // 标签宽度
  labelWidth?: string | number
  // 标签高度
  labelHeight?: string | number
  // 是否显示冒号
  colon?: boolean
}

const LabelList: React.FC<ILabelListProps> = (props) => {
  let {
    className,
    style,
    children,
    labelWidth = '5em',
    labelHeight = '2em',
    colon = true
  } = props
  labelWidth = typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth
  labelHeight =
    typeof labelHeight === 'number' ? `${labelHeight}px` : labelHeight
  return (
    <div className={className} style={style}>
      {React.Children.map(children, (child: any) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            labelWidth,
            labelHeight,
            colon
          } as any)
        } else {
          return null
        }
      })}
    </div>
  )
}

interface IItemProps {
  className?: string
  style?: React.CSSProperties
  // 标签文字内容
  label: string
}

const Item: React.FC<IItemProps> = (props) => {
  const { className, style, label, children } = props
  // 父元素传入的props
  const labelWidth = (props as any).labelWidth
  const labelHeight = (props as any).labelHeight
  const colon = (props as any).colon

  return (
    <div className={'label-item'}>
      <div
        className={'label'}
        style={{
          height: labelHeight
        }}
      >
        <div
          className={'text'}
          style={{
            width: labelWidth
          }}
        >
          {label}
        </div>
        <span> {colon && ':'}</span>
      </div>
      {children}
    </div>
  )
}

export type LabelListType = React.FC<ILabelListProps> & {
  Item: React.FC<IItemProps>
}

const Main: LabelListType = (LabelList as any) as LabelListType
Main.Item = Item

export default Main
