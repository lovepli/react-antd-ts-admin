import React from 'react'
import OuterRouter from '@/router/outerRouter'
import './style.less'

const OuterLayout: React.FC = () => {
  return (
    <div className="outer-layout">
      <OuterRouter />
    </div>
  )
}

export default OuterLayout
