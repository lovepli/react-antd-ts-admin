import React, { PureComponent } from 'react';
import E from 'wangeditor';
import defaultConfig from './config';
import './style.less';

interface IProps {
  value?: string;
  onChange?: (value: string) => void;
}


interface IState {
  value: string;
}



class Editor extends PureComponent<IProps, IState> {

  public static getDerivedStateFromProps(nextProps: IProps, prevState: IProps) {
    if ('value' in nextProps && nextProps.value !== prevState.value) {
      return { value: nextProps.value };
    }
    return null;
  }

  public editor: any;

  public editorDom: any;

  constructor(props: IProps) {
    super(props);
    const value = props.value || '';
    this.state = { value };
  }

  public componentDidMount() {
    this.initEditor();
  }

  public componentDidUpdate(prevProps: IProps, prevState: IProps) {
    // 由于要在自定义表单中使用，所以组件需要做成受控了，无法维护自己的state，会导致撤销/恢复按钮失效
    if ('value' in this.props && prevState.value !== this.state.value) {
      this.editor.txt.html(this.state.value || '');
    }
  }

  public render() {
    return (
      <div className="ms-editor" ref={this.setEditorDom} />
    );
  }

  // 关联编辑器挂载的DOM元素
  private setEditorDom = (node: HTMLDivElement) => {
    this.editorDom = node;
  }

  // 初始化编辑器
  private initEditor = () => {
    const editor = new E(this.editorDom);
    editor.customConfig = {
      ...defaultConfig,
      onchange: this.handleChange
    };
    editor.create();
    // 手动设置编辑器的内容
    editor.txt.html(this.props.value);
    this.editor = editor;
  }

  // 响应内容的改变,将编辑器的内容传递给父组件
  private handleChange = (changedValue: string) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };
}

export default Editor;




