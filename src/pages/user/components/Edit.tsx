import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Radio, Checkbox, InputNumber, Button } from 'antd'
import service from '../service'
import codeTable from '@/utils/codeTable'

const genderList = codeTable.getTable('gender').list
const roleList: any = codeTable.formatTable('gender', 'value', 'label')

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}

interface IProps {
  title: string
  editVisible: boolean
  editKey: string
  onClose: () => void
}

const Edit: React.FC<IProps> = (props) => {
  const { title, editKey, editVisible, onClose } = props
  const [detail, setDetail] = useState({
    name: '',
    age: '',
    gender: '',
    role: []
  })

  // 获取用户详情
  useEffect(() => {
    if (!editKey) return
    service.getDetail(editKey).then((res) => setDetail(res))
  }, [editKey])

  const handleSubmit = (e: any) => {
    if (props.editKey) {
      $msg.success('修改成功')
    } else {
      $msg.success('新增成功')
    }
    onClose()
  }

  const handleFinishFailed = () => {
    $msg.warning('请按照正确格式填写信息！')
  }

  return (
    <Modal
      title={`${editKey ? '修改' : '新增'}${title}`}
      width={600}
      visible={editVisible}
      onCancel={onClose}
      footer={null}
      destroyOnClose={true}
    >
      <Form layout="horizontal" colon labelAlign="left" {...formItemLayout} onFinish={handleSubmit}>
        <Form.Item
          label="姓名"
          name="name"
          initialValue={detail.name}
          rules={[
            {
              required: true,
              message: '请输入用户姓名!'
            }
          ]}
        >
          <Input placeholder="请输入姓名" />
        </Form.Item>

        <Form.Item
          label="年龄"
          name="age"
          initialValue={detail.age}
          rules={[
            {
              required: true,
              message: '请输入用户年龄!'
            }
          ]}
        >
          <InputNumber placeholder="请输入年龄" min={1} max={150} />
        </Form.Item>

        <Form.Item
          label="性别"
          name="gender"
          initialValue={detail.gender}
          rules={[
            {
              required: true,
              message: '请选择用户性别!'
            }
          ]}
        >
          <Radio.Group>
            {genderList.map((item) => (
              <Radio key={item.id} value={item.id}>
                {item.name}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="角色"
          name="role"
          initialValue={detail.role}
          rules={[
            {
              required: true,
              message: '请至少选择一个用户角色!'
            }
          ]}
        >
          <Checkbox.Group options={roleList} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button type="primary" onClick={onClose}>
            取消
          </Button>
          <Button type="primary" htmlType="submit" style={{ marginLeft: '20px' }}>
            保存
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Edit
