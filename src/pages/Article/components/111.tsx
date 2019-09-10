import { Button, Col, Divider, Form, Icon, Input, message, Row, Switch, Upload } from 'antd';
import { FormComponentProps } from "antd/lib/form";
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css';
import moment from 'moment';
import React from 'react';




interface IProps extends FormComponentProps {
  detail: any;
  onSave: (detail: object) => void;
  onCancel: () => void;
}




let imageURL = '';
let videoURL = '';
let accessoryURL = '';

class Edit extends React.Component<IProps> {

  public state = {
    imageLoading: false,
    videoLoading: false,
    accessoryLoading: false
  }

  public componentDidMount() {
    this.props.form.setFieldsValue({
      content: BraftEditor.createEditorState(this.props.detail.content)
    })
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    const detail = this.props.detail;
    return (
      <div className="website-edit">

        <Divider />

        <Form onSubmit={this.handleSubmit} style={{ padding: '0px 100px' }}>



          <Form.Item label="具体内容">
            {getFieldDecorator('content', {
              validateTrigger: 'onBlur',
              rules: [{
                required: true,
                validator: (_, value, callback) => {
                  if (value.isEmpty()) {
                    callback('请输入正文内容')
                  } else {
                    callback()
                  }
                }
              }],
            })(
              <BraftEditor
                style={{ border: '1px solid #d9d9d9', borderRadius: '4px' }}
                placeholder="请输入正文内容"
              />
            )}
          </Form.Item>


          <div className="website-btns">

            <Button type="primary" size="large" style={{ width: '180px' }} htmlType="submit">保存</Button>
          </div>
        </Form>

      </div>

    )
  }

  // 提交表单
  private handleSubmit = (event: any) => {

    this.props.form.validateFields((error, values) => {
      if (!error) {
        Object.assign(values, {
          content: values.content.toHTML(),
          image: imageURL,
          video: videoURL,
          accessory: accessoryURL
        })
        this.props.onSave({ ...this.props.detail, ...values });
      } else {
        message.warning("请按照正确格式填写信息！");
      }
    })
  }
}

export default Form.create<IProps>()(Edit);
