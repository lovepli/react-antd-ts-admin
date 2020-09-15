import React, { useState, useEffect, useRef } from 'react'
import Permission, { wrapPermission } from '@/components/business/permission'
import { Button } from 'antd'
import './style.less'

interface IDemoProps {
  disabled: boolean
  onClick: () => void
}

const Demo: React.FC<IDemoProps> = (props) => {
  const { disabled, onClick } = props
  return (
    <Button type="primary" danger={true} disabled={disabled} onClick={onClick}>
      删除
    </Button>
  )
}

const WrapedButton = wrapPermission(Demo)

// const Blank: React.FC = () => {
//   const [permissionId, setPermissionId] = useState<string>()

//   const handleClick = () => {
//     if (permissionId) {
//       setPermissionId(undefined)
//     } else {
//       setPermissionId('100')
//     }
//   }

//   return (
//     <div style={{ backgroundColor: '#fff', padding: '10px' }}>
//       <Button onClick={handleClick}>点击切换权限</Button>
//       <Permission permissionId={permissionId}>
//         <div>Permission组件传入的permissionId如果存在于用户权限表中，这部分内容才显示。</div>
//       </Permission>
//     </div>
//   )
// }

const Blank: React.FC = () => {
  const [permissionId, setPermissionId] = useState<string>()

  const handleChange = () => {
    if (permissionId) {
      setPermissionId(undefined)
    } else {
      setPermissionId('100')
    }
  }

  const handleDelete = () => {
    console.log('删除')
  }

  return (
    <div style={{ backgroundColor: '#fff', padding: '10px' }}>
      <Button onClick={handleChange}>点击切换权限</Button>
      <WrapedButton permissionId={permissionId} onClick={handleDelete} />
    </div>
  )
}

export default Blank
