import React from 'react';
import { Button, Icon, Form, Input, Radio, Select, Switch, Checkbox, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';



const createOption = (map: object) => {
  const options: { label: string, value: string }[] = [];
  for (const [key, value] of Object.entries(map)) {
    options.push({
      label: value,
      value: key
    })
  }
  return options;
}

const GENDER = {
  '0': '男',
  '1': '女'
}
const ROLE = {
  '0': '投标人工作人员',
  '1': '投标人审核人员',
  '2': '投标人财务人员'
}
const DEPARTMENT = {
  '0': '开发部',
  '1': '客服部',
  '2': '人事部'
}

const STATUS = {
  'true': '1',
  'false': '0',
}

const genderOptions = createOption(GENDER);
const roleOptions = createOption(ROLE);
const departmentOptions = createOption(DEPARTMENT);


interface IEditorFormProps extends FormComponentProps {
  editorKey: string;
  onCancle: () => void;
  updateFormData: (data: any) => void;
}

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
}

class EditorForm extends React.Component<IEditorFormProps> {
  public state = {
    confirmDirty: false,
    formData: {
      name: '',
      gender: '0',
      department: '',
      phone: '',
      password: '',
      checkPassword: '',
      status: false,
      role: ['0']
    }
  }

  public initialFormData = {
    name: '',
    gender: '0',
    department: '',
    phone: '',
    password: '',
    checkPassword: '',
    status: false,
    role: ['0']
  };

  public componentDidMount() {
    this.setFormData(this.props.editorKey)
  }

  public componentWillReceiveProps(nextProps) {
    this.setFormData(nextProps.editorKey)
  }

  public setFormData = (key: string) => {
    if (key) {
      this.setState({
        formData: {
          name: '钟峰',
          gender: '0',
          department: '0',
          phone: '1388888888',
          password: '123456',
          checkPassword: '123456',
          status: false,
          role: ['0']
        }
      })
    } else {
      this.setState({
        formData: { ...this.initialFormData }
      })
    }
  }

  // 密码校验
  public handleConfirmBlur = (e: any) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  public compareToFirstPassword = (rule: any, value: string, callback: any) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致!');
    } else {
      callback();
    }
  };

  public validateToNextPassword = (rule: any, value: string, callback: any) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  // 提交
  public handleSubmit = (e:any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        this.props.onCancle();
        if (this.props.editorKey) {
          message.success('修改成功')
        } else {
          message.success('新增成功')
        }
        values.status = STATUS[values.status.toString()]
        this.props.updateFormData({ ...values, key: this.props.editorKey })
      } else {
        message.warning('请按照正确格式填写信息！')
      }
    });
  }

  // 取消
  public handleCancle = () => {
    this.props.onCancle();
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    const formData = this.state.formData;
    return (
      <Form layout="horizontal" onSubmit={this.handleSubmit}  {...formItemLayout}>
        <Form.Item label="姓名">
          {getFieldDecorator('name', {
            initialValue: formData.name,
            rules: [{
              required: true,
              message: '请输入姓名!'
            }]
          })(<Input placeholder="请输入姓名" />)}
        </Form.Item>

        <Form.Item label="性别">
          {getFieldDecorator('gender', {
            initialValue: formData.gender,
            rules: [{
              required: true,
              message: '请选择性别!'
            }]
          })(
            <Radio.Group>
              {
                genderOptions.map(item => <Radio.Button key={item.value} value={item.value}>{item.label}</Radio.Button>)
              }
            </Radio.Group>
          )}
        </Form.Item>

        <Form.Item label="所属部门">
          {getFieldDecorator('department', {
            initialValue: formData.department,
            rules: [{
              required: true,
              message: '请选择所属部门!'
            }]
          })(
            <Select placeholder="请选择所属部门">
              {
                departmentOptions.map(item => <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>)
              }
            </Select>
          )}
        </Form.Item>

        <Form.Item label="手机号码" >
          {getFieldDecorator('phone', {
            initialValue: formData.phone,
            rules: [{
              required: true,
              message: '请输入手机号码!'
            }]
          })(<Input placeholder="请输入手机号码" />)}
        </Form.Item>

        <Form.Item label="登录密码" hasFeedback>
          {getFieldDecorator('password', {
            initialValue: formData.password,
            rules: [{
              required: true,
              message: '请输入密码!',
            }, {
              validator: this.validateToNextPassword,
            }]
          })(<Input.Password placeholder="请输入密码" />)}
        </Form.Item>

        <Form.Item label="确认密码" hasFeedback>
          {getFieldDecorator('checkpassword', {
            initialValue: formData.checkPassword,
            rules: [{
              required: true,
              message: '再次输入密码!',
            }, {
              validator: this.compareToFirstPassword,
            }]
          })(<Input.Password placeholder="请再次输入密码" onBlur={this.handleConfirmBlur} />)}
        </Form.Item>

        <Form.Item label="是否启用" >
          {getFieldDecorator('status', {
            valuePropName: 'checked',
            initialValue: formData.status,
            rules: [{
              required: true,
            }]
          })(
            <Switch
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="close" />}
            />
          )}
        </Form.Item>

        <Form.Item label="角色权限" >
          {getFieldDecorator('role', {
            initialValue: formData.role,
            rules: [{
              required: true,
              message: '请至少选择一个角色!'
            }]
          })(<Checkbox.Group options={roleOptions} />)}
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button type="primary" onClick={this.handleCancle}>取消</Button>
          <Button type="primary" htmlType="submit" style={{ marginLeft: "20px" }}>保存</Button>
        </Form.Item>
      </Form>

    );
  }
}

export default Form.create<IEditorFormProps>()(EditorForm);
