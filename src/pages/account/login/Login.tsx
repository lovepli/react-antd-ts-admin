import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, Row, Col } from 'antd'
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons'
import accountStore from '@/store/account'
import { createCaptcha } from './util'
import service from './service'
import './style.less'

interface IProps {}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}

const Login: React.FC<IProps> = (props) => {
  let canvas: any
  const history = useHistory()
  const [captcha, setCaptcha] = useState('')

  useEffect(() => {
    getCaptcha()
  }, [])

  //  获取验证码
  const getCaptcha = () => {
    setCaptcha(createCaptcha(canvas))
  }

  // 提交
  const handleFinish = async (values) => {
    const data = await service.login(values)
    const token = data.token
    $http.setHeader({ Authorization: token })
    accountStore.setToken(token)
    history.replace('/dashboard')
  }

  const handleFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="login">
      <div className="login__title">后台管理系统</div>
      <Form
        layout="horizontal"
        colon={true}
        labelAlign="left"
        {...formItemLayout}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
      >
        <Form.Item
          label="账    号"
          name="username"
          validateTrigger="onBlur"
          initialValue="admin"
          rules={[{ required: true, message: '账号不能为空' }]}
        >
          <Input
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="请输入账号"
          />
        </Form.Item>

        <Form.Item
          label="密    码"
          name="password"
          validateTrigger="onBlur"
          initialValue="admin123456"
          rules={[
            {
              required: true,
              message: '密码不能为空！'
            },
            {
              pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
              message: '密码为6~20位，且需要包含数字和字母！'
            }
          ]}
        >
          <Input
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="请输入密码"
          />
        </Form.Item>

        <Form.Item
          label="验证码"
          name="verification"
          validateTrigger="onBlur"
          rules={[
            {
              required: true,
              message: '验证码不能为空！'
            },
            {
              pattern: new RegExp(captcha, 'i'),
              message: '验证码有误！'
            }
          ]}
        >
          <Row>
            <Col span={16}>
              <Input
                prefix={<SafetyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入验证码"
              />
            </Col>
            <Col span={8} style={{ height: '40px' }}>
              <canvas
                onClick={getCaptcha}
                width="80"
                height="40"
                style={{ cursor: 'pointer' }}
                ref={(el) => (canvas = el)}
              />
            </Col>
          </Row>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit" block={true}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
