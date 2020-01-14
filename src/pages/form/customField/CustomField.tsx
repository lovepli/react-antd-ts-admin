import React from 'react';
import { Form, Button, Typography } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import HookSelect from '@/components/hookSelect';

const { Title } = Typography;

const options = [{
  label: '山东省',
  value: "2001"
}, {
  label: '广西省',
  value: "2002"
}, {
  label: '江西省',
  value: "2003"
}]

interface IProps extends FormComponentProps { }

interface IState {
  province: any
}

class CustomField extends React.Component<IProps, IState> {

  public state = {
    province: ['2001', '2002']
  }

  public render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <p>展示自定义的HookSelect表单控件的使用</p>
        <p>可多选或单选，传入的value为数组是就是多选</p>

        <Title level={4}>单独作为受控组件使用：</Title>
        <HookSelect
          value={this.state.province}
          options={options}
          onChange={this.handleChange}
        />

        <Title level={4}>在表单中使用：</Title>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="选择地区" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
            {
              getFieldDecorator('province', {
                initialValue: '2001',
                rules: [{
                  required: true,
                  message: '请选择地区',
                }],
              })(<HookSelect options={options} />)
            }
          </Form.Item>

          <Form.Item label="选择地区(多选)" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
            {
              getFieldDecorator('provinceMultiple', {
                initialValue: ['2001', '2002'],
                rules: [{
                  required: true,
                  message: '请选择地区',
                }],
              })(<HookSelect options={options} />)
            }
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }

  private handleChange = (value: any) => {
    this.setState({
      province: value
    })
  }

  private handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        this.props.form.resetFields();
      }
    });
  }
}

export default Form.create<IProps>()(CustomField);
