import React from 'react';
import Edit from './Edit'
import './style.less';



interface IProps {

}


interface IState {
  visible: boolean;
  row: any;
}


class Pdf extends React.Component<IProps, IState> {

  public state = {
    visible: false,
    row: {}
  }

  public componentDidMount() {
    console.log(3);
  }

  public componentWillUnmount() {
    console.log(4);
  }

  public render() {


    return (
      <div >
        <Edit />
      </div>
    );
  }




}

export default Pdf;
