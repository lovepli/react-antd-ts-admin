import React, { useState, useEffect, useRef } from 'react'

import { Button } from 'antd'
import './style.less'

interface IDemoProps {
  disabled: boolean
  onClick: () => void
}

const Blank: React.FC<IDemoProps> = (props) => {
  const { disabled, onClick } = props
  return (
    <Button type="primary" danger={true} disabled={disabled} onClick={onClick}>
      删除
    </Button>
  )
}

const WrapedButton = Blank

export default Blank
