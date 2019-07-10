import React from "react";
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { saveToken } from '@/store/account/action'
import { login } from './service';
import { createVerification } from './util';
import './style.less';


interface ILoginProps extends FormComponentProps, RouteComponentProps {
  saveToken: (token: string) => void;
  token: string;
}

interface ILoginState {
  varificationCode: string;
}

export interface ILoginData {
  username: string;
  password: string;
  varification: string;
}


class Login extends React.Component<ILoginProps, ILoginState> {

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
      varificationCode: createVerification(this.canvas),
    })
  }

  // 登录
  public handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.form.validateFields((error: any, values: ILoginData) => {
      if (!error) {
        login(values).then(res => {
          sessionStorage.setItem('token', res.data.token)
          this.props.history.replace('/');
          location.reload();
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
                  />
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
                  />
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
                  }, {
                    pattern: new RegExp(this.state.varificationCode, 'i'),
                    message: '验证码有误！'
                  }],
                })(
                  <Row>
                    <Col span={18}>
                      <Input
                        prefix={<Icon type="property-safety" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="请输入验证码"
                      />
                    </Col>
                    <Col span={6} style={{ height: '40px' }}>
                      <canvas onClick={this.createVerification} width="80" height="40" style={{ cursor: 'pointer' }} ref={el => this.canvas = el} />
                    </Col>
                  </Row>
                )
              }
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block={true}>登录</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}


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


const LognWrap = connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create<ILoginProps>()(Login))

export default withRouter(LognWrap);



