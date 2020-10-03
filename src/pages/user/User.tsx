import { Button, Input, Row, Col, Modal, Table } from 'antd'
import React from 'react'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { PagedTable, createColumnBuilder } from '@/components/table'
import SectionTitle from '@/components/sectionTitle'
import Edit from './components/Edit'
import { IState, defaultState, IItem } from './state'
import service from './service'
import './style.less'

class User extends React.Component<{}, IState> {
  public readonly state: Readonly<IState> = defaultState

  public componentDidMount() {
    this.getList()
  }

  public render() {
    return (
      <div className="curd-table">
        <Row justify="space-between">
          <Col>
            <SectionTitle name="用户列表" />
            <Button.Group>
              <Button type="primary" icon={<PlusOutlined />} onClick={this.handleEdit}>
                新增用户
              </Button>
              <Button danger={true} icon={<MinusOutlined />}>
                批量删除
              </Button>
            </Button.Group>
          </Col>
          <Col>
            <Input.Search
              placeholder="请输入查询关键词"
              onSearch={this.handleSearch}
              enterButton={true}
            />
          </Col>
        </Row>

        <PagedTable
          columns={this.getTableColumns()}
          dataSource={this.state.list}
          loading={this.state.tableLoading}
          total={this.state.total}
          onSelectedRows={this.handleSelectedRows}
          onPagination={this.handlePagination}
        />

        <Edit
          title="用户信息"
          editVisible={this.state.editVisible}
          editKey={this.state.editKey}
          onClose={this.handleClose}
        />
      </div>
    )
  }

  // 创建表格列
  private getTableColumns() {
    const builder = createColumnBuilder()
    builder.AddSortNum(this.state.query.pageNumber, this.state.query.pageSize, 80)
    builder.addText('姓名', 'name')
    builder.addText('年龄', 'age')
    builder.addCodeIdToName('性别', 'gender', 'gender')
    builder.addHandle(
      [
        {
          type: 'edit',
          handle: this.handleEdit
        },
        {
          type: 'delete',
          handle: this.handleDeleteSingle
        }
      ],
      140
    )

    const columns = builder.getColumns()
    return columns
  }

  // 获取表格数据
  private getList = async () => {
    this.setState({ tableLoading: true })
    const data = await service.getList(this.state.query)
    this.setState({
      list: data.list,
      total: data.total,
      tableLoading: false
    })
  }

  // 搜索
  private handleSearch = (keyword: string) => {
    this.setState(
      {
        query: { ...this.state.query, keyword }
      },
      this.getList
    )
  }

  // 翻页
  private handlePagination = (pageNumber: number, pageSize: number) => {
    this.setState(
      {
        query: {
          ...this.state.query,
          ...{ pageNumber, pageSize }
        }
      },
      this.getList
    )
  }

  // 新增或编辑
  private handleEdit = (record: any) => {
    console.log(record)
    this.setState({
      editVisible: true,
      editKey: record.id || ''
    })
  }

  // 单个删除
  private handleDeleteSingle = async (record: any) => {
    const { id, name } = record
    await service.handeDelete([id])
    $message.success(`成功删除用户“${name}”！`)
  }

  // 批量删除
  private handleDeleteBatch = () => {
    const selectedRows = this.state.selectedRows
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
  private handleSelectedRows = (selectedRows: any[]) => {
    this.setState({ selectedRows })
  }

  // 取消
  private handleClose = () => {
    this.setState({ editVisible: false })
  }
}
export default User
