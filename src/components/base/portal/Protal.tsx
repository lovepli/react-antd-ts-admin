import React from 'react'
import ReactDOM from 'react-dom'

interface IProps {
    container?: HTMLElement
}

const Protal: React.FC<IProps> = (props) => {
    const { container = document.body, children } = props
    return ReactDOM.createPortal(children, container)
}

export default Protal
