import React, { useRef } from 'react'
import { useCounter } from '@/hooks'
import './style.less'

const Blank: React.FC = () => {
  const [page, { inc: incPage }] = useCounter(0)

  const handleClick = () => {
    incPage()
  }

  return (
    <div className="blank">
      <div> {page}</div>
      <div onClick={handleClick}>rrrr</div>
    </div>
  )
}

export default Blank
