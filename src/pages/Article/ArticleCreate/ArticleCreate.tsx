import React from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';


class ArticleCreate extends React.Component {

  public state = {
    editorState: BraftEditor.createEditorState(null)
  }

  public render() {
    return (
      <BraftEditor
        value={this.state.editorState}
        onChange={this.handleChange} />
    )
  }

  private handleChange = (editorState: any) => {
    this.setState({
      editorState
    })
  }

}

export default ArticleCreate;
