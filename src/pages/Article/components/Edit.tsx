import React from 'react';
import { Form, Input, Select, Row, Col } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import { CodeMap, createOptions } from '@/assets/CodeMap';
import './style.less';

interface IProps extends FormComponentProps {
  detail: any;
}

interface IState {
  editorState: any;
}

class ArticleCreate extends React.Component<IProps, IState> {

  public readonly state: Readonly<IState> = {
    editorState: BraftEditor.createEditorState(null)
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    const detail = this.props.detail;
    return (
      <div className="article-editor">
        <Form>
          <Row>
            <Col span={12}>
              <Form.Item label="标题">
                {
                  getFieldDecorator('title', {
                    initialValue: detail.title,
                    rules: [{
                      required: true,
                      message: '请输入文章标题!'
                    }],
                  })(
                    <Input placeholder="请输入文章标题" />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="类型">
                {
                  getFieldDecorator('type', {
                    initialValue: detail.type,
                    rules: [{
                      required: true,
                      message: '请选择文章类型!'
                    }],
                  })(
                    <Select placeholder="请选择文章类型" >
                      {
                        createOptions(CodeMap.articleType).map(item => <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>)
                      }
                    </Select>
                  )
                }
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="描述">
            {
              getFieldDecorator('description', {
                initialValue: detail.description,
                rules: [{
                  required: true,
                  message: '请输入文章简要描述!'
                }],
              })(
                <Input.TextArea placeholder="请输入文章简要描述" />
              )
            }
          </Form.Item>

          <Form.Item label="内容" required>
            <div className="editor">
              <BraftEditor
                value={this.state.editorState}
                onChange={this.handleChange} />
            </div>
          </Form.Item>
        </Form>
      </div>

    )
  }

  private handleChange = (editorState: any) => {
    this.setState({
      editorState
    })
    const htmlContent = this.state.editorState.toHTML()
    console.log(htmlContent)
  }

}

export default Form.create<IProps>()(ArticleCreate);
