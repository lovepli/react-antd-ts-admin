import React from "react";
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import './Login.less';
import { login } from '@/api/account';
import { connect } from 'react-redux';
import { saveToken } from '@/store/account/action'

interface ILoginProps extends FormComponentProps {
  saveToken: (token: string) => void;
  token: string;
  history: any
}

interface ILoginState {
  varificationCode: string;
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


const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create<ILoginProps>()(Login))

export default App;



/**
 * 生成指定区间的随机整数
 * @param {Number} min 最小数
 * @param {Number} max 最大数
 * @return {Number}
 */
const randomNum = (min: number, max: number): number => Math.floor(Math.random() * (max - min) + min);

/*
  生成验证码
 */
const createVerification = (canvas: any): string => {
  const ctx = canvas.getContext('2d')
  const chars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  let verificationCode = ''
  ctx.clearRect(0, 0, 80, 39)
  for (let i = 0; i < 4; i++) {
    const char = chars[randomNum(0, 57)]
    verificationCode += char
    // 设置字体随机大小
    ctx.font = randomNum(20, 25) + 'px SimHei'
    ctx.fillStyle = '#D3D7F7'
    ctx.textBaseline = 'middle'
    ctx.shadowOffsetX = randomNum(-3, 3)
    ctx.shadowOffsetY = randomNum(-3, 3)
    ctx.shadowBlur = randomNum(-3, 3)
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
    const x = 80 / 5 * (i + 1)
    const y = 39 / 2
    const deg = randomNum(-25, 25)
    // 设置旋转角度和坐标原点
    ctx.translate(x, y)
    ctx.rotate(deg * Math.PI / 180)
    ctx.fillText(char, 0, 0)
    // 恢复旋转角度和坐标原点
    ctx.rotate(-deg * Math.PI / 180)
    ctx.translate(-x, -y)
  }
  return verificationCode;
}

