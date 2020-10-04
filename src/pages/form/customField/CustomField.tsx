import React, { useState } from 'react'
import { Form, Button, Typography } from 'antd'
import CheckboxList from '@/components/base/checkbox-list'
const { Title } = Typography

const options = [
  {
    id: 2001,
    name: '山东省'
  },
  {
    id: 2002,
    name: '广西省'
  },
  {
    id: 2003,
    name: '江西省'
  }
]

const CustomField: React.FC = () => {
  const [province, setProvince] = useState<number[]>([2001, 2002])

  const handleChange = (value: number[]) => {
    setProvince(value)
  }

  const handleFinish = (values) => {
    console.log(values)
  }

  return (
    <div>
      <p>展示自定义的表单控件的使用</p>

      <Title level={5}>单独作为受控组件使用：</Title>
      <CheckboxList column={3} value={province} list={options} onChange={handleChange} />

      <Title level={5}>在表单中使用：</Title>
      <Form onFinish={handleFinish}>
        <Form.Item
          label="选择地区"
          name="province"
          initialValue={[2001]}
          rules={[
            {
              required: true,
              message: '请选择地区'
            }
          ]}
        >
          <CheckboxList column={3} single={true} list={options} />
        </Form.Item>

        <Form.Item
          label="选择地区(多选)"
          name="provinceMultiple"
          initialValue={[2001, 2002]}
          rules={[
            {
              required: true,
              message: '请选择地区'
            }
          ]}
        >
          <CheckboxList column={3} list={options} />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CustomField
