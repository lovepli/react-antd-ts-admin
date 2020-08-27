import React, { useEffect,useRef } from 'react'

import './style.less'

interface IItem {
  name: string
  age: number
}

const Blank: React.FC = () => {

  return (
    <div className="blank">

    </div>
  )
}

export default Blank
