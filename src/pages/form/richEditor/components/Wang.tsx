import React from 'react';
import { Form, Button, Typography } from 'antd';
import Editor from '@/components/wangEditor';
import { FromTo } from 'moment';

const { Title } = Typography;

interface IProps {
  form: any;
}

interface IState {
  value: string;
}

class WangEditor extends React.Component<any, IState> {

  public readonly state: Readonly<IState> = {
    value: '',
  };

  public componentDidMount() {
    setTimeout(() => {
      this.setState({
        value: '<p>今天也要快乐啊！</p>'
      })
    }, 2000)
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <p><a href="https://github.com/wangfupeng1988/wangEditor" target="_blank">wangEditor</a></p>

        <Title level={4}>单独作为受控组件使用：</Title>
        <Editor value={this.state.value} onChange={this.handleChange} />
        <div> {this.state.value} </div>

        <Title level={4}>在表单中使用：</Title>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="文章内容" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
            {
              getFieldDecorator('content', {
                initialValue: '',
                rules: [{
                  required: true,
                  message: '请输入内容',
                }],
              })(<Editor />)
            }
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit">提交</Button>
          </Form.Item>
        </Form>

      </div>
    )
  }

  private handleChange = (value: string) => {
    this.setState({
      value
    });
  }


  private handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.form.resetFields()
        console.log(values);
        this.props.form.resetFields();
      }
    });
  }
}

export default Form.create<IProps>()(WangEditor);
