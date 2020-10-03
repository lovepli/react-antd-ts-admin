import React from 'react'
import { Link } from 'react-router-dom'
import SvgIcon, { IconName } from '@/components/base/svg-icon'

interface IProps {
  path: string
  icon?: IconName
  title: string
}

const NavLink: React.FC<IProps> = ({ path, icon, title }) => {
  return (
    <Link to={path}>
      {icon ? <SvgIcon name={icon} /> : null}
      <span>{title}</span>
    </Link>
  )
}

export default NavLink
