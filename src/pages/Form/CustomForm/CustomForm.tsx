import React from 'react';
import { Form, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import RadioHook from '@/components/RadioHook/RadioHook';

const options = [{
  label: '山东省',
  value: "2001"
}, {
  label: '广西省',
  value: "2002"
}]

interface IProps extends FormComponentProps { }

class Blank extends React.Component<IProps> {

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <p>展示自定义的RadioHook表单项的使用</p>

        <p>单独使用：</p>
        <RadioHook
          defaultValue={options[0].value}
          options={options}
          onChange={this.handleChange}
        />

        <p>在表单中使用：</p>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {
              getFieldDecorator('province', {
                initialValue: options[0].value
              })(<RadioHook options={options} />)
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
    console.log(value);
  }

  private handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  }
}

export default Form.create<IProps>()(Blank);
