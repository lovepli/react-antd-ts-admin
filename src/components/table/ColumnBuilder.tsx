// 用于创建表格列

import { Popconfirm, Divider } from 'antd'
import React from 'react'
import moment from 'moment'
import { IColumnProps } from './IColumnProps'
import constantMng, { GroupName } from '@/utils/constantMng'

enum HandleButtonType {
  'edit' = '编辑',
  'delete' = '删除',
  'view' = '查看'
}

interface IHandleButton<RecordType> {
  type: string
  handle: (record: RecordType) => void
}

class ColumnBuilder<RecordType> {
  private columnDefines: IColumnProps<RecordType>[] = []

  public getColumns = () => {
    return this.columnDefines
  }

  // 创建索引列
  public AddSortNum = (pageNumber: number, pageSize: number, width?: string | number) => {
    const col: IColumnProps<RecordType> = {
      dataIndex: 'index',
      title: '序号',
      width,
      render: (value: any, record: RecordType, index: number) =>
        (pageNumber - 1) * pageSize + index + 1
    }
    this.columnDefines.push(col)
  }

  //  创建文本列
  public addText(title: string, filed: string, width?: string | number, ellipsis?: boolean) {
    const column: IColumnProps<RecordType> = {
      dataIndex: filed,
      title,
      width,
      ellipsis
    }
    this.columnDefines.push(column)
  }

  // 创建数值列
  public addNumber(title: string, filed: string, width?: string | number) {
    const column: IColumnProps<RecordType> = {
      dataIndex: filed,
      title,
      width
    }
    this.columnDefines.push(column)
  }

  // 将布尔值映射为是/否
  public addBoolean = (
    title: string,
    filed: string,
    width?: any,
    trueValue = '是',
    falseValue = '否'
  ) => {
    const column: IColumnProps<RecordType> = {
      dataIndex: filed,
      title,
      width,
      render(value: boolean) {
        if (value === true) {
          return <span style={{ color: '#87d068' }}> {trueValue}</span>
        } else if (value === false) {
          return <span style={{ color: '#f50' }}> {falseValue}</span>
        } else {
          return ''
        }
      }
    }
    this.columnDefines.push(column)
  }

  // 创建格式化的日期列
  public addDate = (
    title: string,
    filed: string,
    format: string = 'YYYY-MM-DD',
    width?: string | number
  ) => {
    const column: IColumnProps<RecordType> = {
      dataIndex: filed,
      title,
      width,
      render: (value: any) => moment(value).format(format)
    }
    this.columnDefines.push(column)
  }

  // 将codeTable中的id转换为对应的名称
  public addCodeIdToName = (
    title: string,
    filed: string,
    codeTableName: GroupName,
    width?: string | number
  ) => {
    const column: IColumnProps<RecordType> = {
      dataIndex: filed,
      title,
      width,
      render: (value: number): React.ReactNode => constantMng.getNameById(codeTableName, value)
    }
    this.columnDefines.push(column)
  }

  // 将codeTable中的多个id转换为对应的名称
  public addConstantIdsToName = (
    title: string,
    filed: string,
    codeTableName: GroupName,
    width?: string | number
  ) => {
    const column: IColumnProps<RecordType> = {
      dataIndex: filed,
      title,
      width,
      render: (value: number[]): React.ReactNode =>
        value.map((item) => constantMng.getNameById(codeTableName, item)).toString()
    }
    this.columnDefines.push(column)
  }

  // 创建操作列
  public addHandle = (buttons: IHandleButton<RecordType>[], width?: string | number) => {
    const column: IColumnProps<RecordType> = {
      dataIndex: 'handle',
      title: '操作',
      width,
      render: (value: any, record: RecordType) => {
        const buttonLen = buttons.length
        return (
          <>
            {buttons.map((button, index) => (
              <span key={button.type}>
                {this.getHandleButton(button, record)}
                {index < buttonLen - 1 ? <Divider type="vertical" /> : null}
              </span>
            ))}
          </>
        )
      }
    }
    this.columnDefines.push(column)
  }

  // 自定义列
  public addCustomRender = (
    title: string,
    filed: string,
    render: (value: any, record: RecordType, index: number) => React.ReactNode,
    width?: string | number
  ) => {
    const column: IColumnProps<RecordType> = {
      dataIndex: filed,
      render,
      title,
      width
    }
    this.columnDefines.push(column)
  }

  private getHandleButton = (button: IHandleButton<RecordType>, record: RecordType) => {
    const { type, handle } = button
    const handleClick = () => handle(record)
    let handleButton: React.ReactNode
    switch (type) {
      case 'delete':
        handleButton = (
          <Popconfirm title="确定删除这条数据吗？" onConfirm={handleClick}>
            <a>{HandleButtonType[type]}</a>
          </Popconfirm>
        )
        break
      default:
        handleButton = <a onClick={handleClick}>{HandleButtonType[type]}</a>
    }
    return handleButton
  }
}

export const createColumnBuilder = () => new ColumnBuilder()
