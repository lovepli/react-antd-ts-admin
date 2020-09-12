import React from 'react'
import Icon from '@ant-design/icons'

import Basketball from '@/assets/icons/basketball.svg'
import Excel from '@/assets/icons/excel.svg'
import Ppt from '@/assets/icons/ppt.svg'
import Pdf from '@/assets/icons/pdf.svg'
import Word from '@/assets/icons/word.svg'
import Image from '@/assets/icons/image.svg'
import Mine from '@/assets/icons/mine.svg'

const iconClass: React.CSSProperties = {
  fontSize: '24px',
  marginRight: '10px',
  marginBottom: '10px'
}

const Svg: React.SFC = () => {
  return (
    <div className="icon">
      <div>
        <p>导入的图标就是一个React组件</p>
        <Basketball width="1.7em" height="1.7em" style={{ verticalAlign: '-0.17em' }} />
      </div>

      <div>
        <p>将导入的图标组件，传给antd.Icon</p>
        <Icon component={Basketball} style={iconClass} />
        <Icon component={Excel} style={iconClass} />
        <Icon component={Ppt} style={iconClass} />
        <Icon component={Pdf} style={iconClass} />
        <Icon component={Word} style={iconClass} />
        <Icon component={Image} style={iconClass} />
        <Icon component={Mine} style={iconClass} />
      </div>
    </div>
  )
}

export default Svg
