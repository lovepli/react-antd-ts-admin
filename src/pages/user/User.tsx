import React, { useEffect, useState } from 'react'
import { Button, Divider, Input, Row, Col, Modal, Popconfirm, Table } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import constantMng from '@/utils/constantMng'
import Edit from './components/Edit'
import { IUser } from './model'
import service, { IParams } from './service'
import './style.less'

const { Column } = Table

const User = () => {
  // 查询参数
  const [params, setParams] = useState<IParams>({
    pageNumber: 1,
    pageSize: 10
  })
  // 表格当前页显示的数据
  const [list, setList] = useState<IUser[]>([])
  // 某项数据详情
  const [detail, setDetail] = useState<IUser>()
  // 数据总数
  const [total, setTotal] = useState(0)
  // 表格loading状态
  const [tableLoading, setTabelLoading] = useState(false)
  // 新增或编辑数据提交时的loading状态
  const [submitLoading, setSubmitLoading] = useState(false)
  // 编辑模态窗是否显示
  const [editVisible, setEditVisible] = useState(false)
  // 多选的表格行
  const [selectedRows, setSelectedRows] = useState<any[]>([])
  const [editKey, setEditKey] = useState<number>(0)

  useEffect(() => {
    // 获取表格数据
    const getList = async () => {
      setTabelLoading(true)
      const res = await service.getUserList(params)
      console.log(res)
      setTabelLoading(false)
      setList(res.list)
      setTotal(res.total)
    }
    getList()
  }, [params])

  // 搜索
  const handleSearch = (keyword: string) => {
    setParams((state) => ({ ...state, keyword }))
  }

  // 翻页
  const handlePagination = (pageNumber: number, pageSize: number) => {
    setParams((state) => ({ ...state, pageNumber, pageSize }))
  }

  // 新增或编辑
  const handleEdit = (record: any) => {
    console.log(record)
    setEditVisible(true)
    setEditKey(record.id || '')
  }

  // 单个删除
  const handleDeleteSingle = async (record: IUser) => {
    const { id, name } = record
    await service.deleteUser([id])
    $message.success(`成功删除用户“${name}”！`)
  }

  // 批量删除
  const handleDeleteBatch = () => {
    if (selectedRows.length === 0) {
      $message.warning('请选择要删除的用户')
      return
    }
    const ids = selectedRows.map((row: any) => row.key)
    const names = selectedRows.map((row: any) => row.name).join('，')
    Modal.confirm({
      title: '确认删除以下用户吗?',
      content: names,
      onOk: () => {
        $message.success(`成功删除用户“${names}”！`)
      }
    })
  }

  // 多选
  const handleSelectedRows = (selectedRows: any[]) => {
    setSelectedRows(selectedRows)
  }

  // 取消
  const handleClose = () => {
    setEditVisible(false)
  }

  return (
    <div className="page-user">
      <Row justify="space-between">
        <Col>
          <div className="section-title">
            <span className="section-title__tag" />
            <span className="section-title__name">用户列表</span>
          </div>

          <Button.Group>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleEdit}>
              新增用户
            </Button>
            <Button danger={true} icon={<MinusOutlined />}>
              批量删除
            </Button>
          </Button.Group>
        </Col>

        <Col>
          <Input.Search placeholder="请输入查询关键词" onSearch={handleSearch} enterButton={true} />
        </Col>
      </Row>

      <Table dataSource={list} rowKey="id" loading={tableLoading} pagination={{ total }}>
        <Column
          title="序号"
          dataIndex="number"
          width={80}
          render={(value: undefined, record: IUser, index: number) =>
            (params.pageNumber - 1) * params.pageSize + index + 1
          }
        />
        <Column title="姓名" dataIndex="name" />
        <Column title="年龄" dataIndex="age" />
        <Column
          title="性别"
          dataIndex="gender"
          render={(value: number, record: IUser, index: number) =>
            constantMng.getNameById('gender', value)
          }
        />
        <Column
          title="操作"
          dataIndex="operate"
          width={140}
          render={(value: undefined, record: IUser, index: number) => (
            <div>
              <Button type="link" size="small">
                编辑
              </Button>
              <Divider type="vertical" />
              <Popconfirm
                title="确定删除这条数据吗？"
                onConfirm={handleDeleteSingle.bind(null, record)}
              >
                <Button type="link" size="small" danger={true}>
                  删除
                </Button>
              </Popconfirm>
            </div>
          )}
        />
      </Table>

      <Edit visible={editVisible} editKey={editKey} onClose={handleClose} />
    </div>
  )
}

export default User
