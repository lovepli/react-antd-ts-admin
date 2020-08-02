import React, { useRef } from 'react'
import { Table } from 'antd'
import { ColumnProps } from 'antd/lib/table/interface'
import './style.less'

interface IItem {
  name: string
  age: number
}

const Blank: React.FC = () => {
  const data: IItem[] = [
    {
      name: 'www',
      age: 2
    }
  ]

  const columns: ColumnProps<IItem>[] = [
    {
      title: 'xxx',
      key: 'name',
      render(text: any, record, index: number) {
        return <div>{record.name}</div>
      }
    }
  ]

  return (
    <div className="blank">
      <Table dataSource={data} columns={columns} />
    </div>
  )
}

export default Blank
