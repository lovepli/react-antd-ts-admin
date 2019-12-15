import React from 'react';
import { Modal, Form, Input, Radio, Checkbox, InputNumber, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import service from '../service';
import { CodeMap, createOptions } from '@/assets/CodeMap';


interface IEditProps extends FormComponentProps {
  title: string;
  editVisible: boolean;
  editKey: string;
  onClose: () => void;
}

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}


class Edit extends React.Component<IEditProps> {

  public state = {
    detail: {
      name: '',
      age: '',
      gender: '',
      role: [],
    }
  }

  public getDetail(id: string) {
    if (id) {
      service.getDetail({
        id
      }).then(res => {
        this.setState({
          detail: res.data.detail
        })
      })
    }
  }

  public componentWillReceiveProps = (nextProps) => {
    if (this.props.editKey !== nextProps.editKey) {
      this.getDetail(nextProps.editKey);
    }
  }



  public handleCancel = e => {
    this.props.onClose();
  };

  public handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {

        if (this.props.editKey) {
          $msg.success('修改成功')
        } else {
          $msg.success('新增成功')
        }
        this.props.onClose();
      } else {
        $msg.warning('请按照正确格式填写信息！')
      }
    });
  }

  public render() {
    // console.log(22)
    const { getFieldDecorator } = this.props.form;
    const detail = this.state.detail;
    return (
      <Modal
        title={`${this.props.editKey ? '修改' : '新增'}${this.props.title}`}
        width={600}
        visible={this.props.editVisible}
        onCancel={this.handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <Form layout="horizontal" colon labelAlign="left" {...formItemLayout} onSubmit={this.handleSubmit}>

          <Form.Item label="姓名">
            {getFieldDecorator('name', {
              initialValue: detail.name,
              rules: [{
                required: true,
                message: '请输入用户姓名!'
              }],
            })(
              <Input placeholder="请输入姓名" />
            )}
          </Form.Item>

          <Form.Item label="年龄">
            {getFieldDecorator('age', {
              initialValue: detail.age,
              rules: [{
                required: true,
                message: '请输入用户年龄!'
              }],
            })(
              <InputNumber placeholder="请输入年龄" min={1} max={150} />
            )}
          </Form.Item>

          <Form.Item label="性别">
            {getFieldDecorator('gender', {
              initialValue: detail.gender,
              rules: [{
                required: true,
                message: '请选择用户性别!'
              }],
            })(
              <Radio.Group >
                {
                  createOptions(CodeMap.gender).map(item => <Radio key={item.value} value={item.value}>{item.label}</Radio>)
                }
              </Radio.Group>
            )}
          </Form.Item>

          <Form.Item label="角色">
            {getFieldDecorator('role', {
              initialValue: detail.role,
              rules: [{
                required: true,
                message: '请至少选择一个用户角色!'
              }],
            })(<Checkbox.Group options={createOptions(CodeMap.role)} />)}
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8 }}>
            <Button type="primary" onClick={this.handleCancel}>取消</Button>
            <Button type="primary" htmlType="submit" style={{ marginLeft: "20px" }}>保存</Button>
          </Form.Item>

        </Form>
      </Modal >
    )
  }
}

export default Form.create<IEditProps>()(Edit);
