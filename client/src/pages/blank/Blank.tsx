import React from 'react';
import Tinymce from '@/components/tinymce';
import './style.less';



interface IProps {

}


interface IState {
  value: string
}


class Pdf extends React.Component<IProps, IState> {

  public state = {
    value: ''
  }
  public componentDidMount() {
    setTimeout(() => {
      this.setState({
        value: 'erwrr'
      })
    }, 2003)
  }
  public render() {


    return (
      <div className="pdf">
        <p>blank</p>
        <Tinymce value={this.state.value} onChange={this.handleChange} />
      </div>
    );
  }

  private handleChange = (s) => {
    console.log(s);
  }


}

export default Pdf;
