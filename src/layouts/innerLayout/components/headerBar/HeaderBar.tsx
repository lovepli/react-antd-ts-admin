import React from 'react'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import Avatar from './components/Avatar'
import './style.less'

interface IHeaderProps {
  collapse: boolean
  onTrigger: () => void
}

const HeaderBar: React.FC<IHeaderProps> = (props) => {
  const { collapse, onTrigger } = props
  return (
    <div className="header-bar">
      {collapse ? (
        <MenuUnfoldOutlined className="header-bar__trigger" onClick={onTrigger} />
      ) : (
        <MenuFoldOutlined className="header-bar__trigger" onClick={onTrigger} />
      )}

      <div>
        <Avatar />
      </div>
    </div>
  )
}

export default HeaderBar
