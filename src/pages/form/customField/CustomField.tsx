import React, { useState } from 'react'
import { Form, Button, Typography } from 'antd'
import HookSelect from '@/components/hookSelect'

const { Title } = Typography

const options = [
  {
    label: '山东省',
    value: '2001'
  },
  {
    label: '广西省',
    value: '2002'
  },
  {
    label: '江西省',
    value: '2003'
  }
]

const CustomField: React.FC = () => {
  const [province, setProvince] = useState<any>(['2001', '2002'])

  const handleChange = (value: any) => {
    setProvince(province)
  }

  const handleSubmit = (e: any) => {
    // this.props.form.resetFields()
  }

  return (
    <div>
      <p>展示自定义的HookSelect表单控件的使用</p>
      <p>可多选或单选，传入的value为数组是就是多选</p>

      <Title level={4}>单独作为受控组件使用：</Title>
      <HookSelect value={province} options={options} onChange={handleChange} />

      <Title level={4}>在表单中使用：</Title>

      <Form onFinish={handleSubmit}>
        <Form.Item
          label="选择地区"
          name="province"
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 22 }}
          initialValue="2001"
          rules={[
            {
              required: true,
              message: '请选择地区'
            }
          ]}
        >
          <HookSelect options={options} />
        </Form.Item>

        <Form.Item
          label="选择地区(多选)"
          name="provinceMultiple"
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 22 }}
          initialValue={['2001', '2002']}
          rules={[
            {
              required: true,
              message: '请选择地区'
            }
          ]}
        >
          <HookSelect options={options} />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CustomField
