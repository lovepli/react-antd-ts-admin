import React from 'react'
import Icon from '@ant-design/icons'
import { tupleStr } from '@/utils/tuple'
import Basketball from '@/assets/icons/basketball.svg'
import Mine from '@/assets/icons/mine.svg'
import Article from './icons/article.svg'

const ICON_NAME_MAP = {
  basketball: Basketball,
  mine: Mine,
  article: Article
}

const iconNames = tupleStr('basketball', 'mine', 'article')

export type IconName = typeof iconNames[number]

interface IProps {
  className?: string
  style?: React.CSSProperties
  name: IconName
  size?: string | number
  color?: string
}

const SvgIcon: React.FC<IProps> = (props) => {
  const { className, style, name, size = 16, color } = props
  const iconStyle = {
    ...style,
    ...{
      fontSize: size,
      color
    }
  }
  return <Icon className={className} style={iconStyle} component={ICON_NAME_MAP[name]} />
}

export default SvgIcon
