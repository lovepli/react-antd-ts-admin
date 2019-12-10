import React from 'react';
import Edit from '../components/Edit';

interface IProps { }

interface IState {
  editorState: any;
}


class ArticleCreate extends React.Component<IProps, IState> {


  public render() {

    return (
      <Edit detail={{}} />
    )
  }
}

export default ArticleCreate;
