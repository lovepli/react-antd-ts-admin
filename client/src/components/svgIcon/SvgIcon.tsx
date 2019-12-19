import React from 'react';
import { Icon } from 'antd';


interface ISvgIconProps {
  type: string | React.ComponentType;
  style?: React.CSSProperties;
  className?: string;
}

// 既可以使用antd已有的图标，也可以使用自定义的图标
const SvgIcon: React.SFC<ISvgIconProps> = (props) => {
  const { type, style, className } = props;
  if (typeof type === 'string') {
    return (
      <Icon type={type} style={style} className={className} />
    )
  } else {
    return (
      <Icon component={type} style={style} className={className} />
    )
  }
}

export default SvgIcon;


