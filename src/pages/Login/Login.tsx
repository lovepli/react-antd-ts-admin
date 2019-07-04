import React from "react";
import { Form, Icon, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import './Login.less';
import { login } from '@/api/account';
import { connect } from 'react-redux';
import { saveToken } from '@/store/account/action'
import { createVerification } from '@/utils/utils';

interface ILoginProps extends FormComponentProps {
  saveToken: (token: string) => void;
  token: string;
  history: any
}


class Login extends React.Component<ILoginProps, any> {

  public canvas: any;

  public readonly state = {
    varificationCode: ''
  }

  public componentDidMount() {
    this.createVerification();
  }

  // 创建验证码
  public createVerification = () => {
    this.setState({
      varificationCode: createVerification(this.canvas)
    })
    console.log(this.state.varificationCode)
  }

  // 登录
  public handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    this.props.form.validateFields((error, values) => {
      if (!error) {
        login(values).then(res => {
          sessionStorage.setItem('token', res.data.token)
          location.replace('/')
        })
      }
    });
  };

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-wrap">
        <div className="login">
          <div className="login-title">后台管理系统</div>
          <Form labelAlign="left" onSubmit={this.handleSubmit}>
            <Form.Item>
              {
                getFieldDecorator('username', {
                  initialValue: 'admin',
                  rules: [{
                    required: true,
                    message: '账号不能为空'
                  }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="请输入账号"
                  />,
                )
              }
            </Form.Item>

            <Form.Item>
              {
                getFieldDecorator('password', {
                  initialValue: 'admin123456',
                  rules: [{
                    required: true,
                    message: '密码不能为空！'
                  }, {
                    pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
                    message: '密码为6~20位，且需要包含数字和字母！'
                  }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="请输入密码"
                  />,
                )
              }
            </Form.Item>

            <Form.Item>
              {
                getFieldDecorator('verification', {
                  initialValue: '',
                  rules: [{
                    required: true,
                    message: '验证码不能为空！'
                  }],
                })(
                  <Input
                    prefix={<Icon type="property-safety" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="请输入验证码"
                  />,
                )
              }
            </Form.Item>

            <canvas onClick={this.createVerification} width="80" height='39' ref={el => this.canvas = el} />
            <Form.Item>
              <Button type="primary" htmlType="submit" block={true}>登录</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

const WrappedLogin = Form.create<ILoginProps>()(Login);

function mapStateToProps(state) {
  return {
    token: state.token
  }
}
function mapDispatchToProps(dispatch) {
  return {
    saveToken: token => dispatch(saveToken(token)),
  }
}


const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedLogin)

export default App;
