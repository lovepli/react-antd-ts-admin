import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import './style.less';



interface IProps {

}


interface IState {
  visible: boolean;
  row: any;
}


class Blank extends React.Component<IProps, IState> {

  public state = {
    visible: false,
    row: {}
  }

  public render() {


    return (
      <div className="box" >
        <Scrollbars autoHeight={true}>
          <div style={{ width: 300, height: 200, whiteSpace: 'nowrap' }}>
            <p>在12月21日《环球时报》年会夜话一“预测2020年的世界”环节，与会学者围绕。</p>
            {/* <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p> */}
            <p>111</p>
            <p>222</p>
            <p>333</p>
          </div>
        </Scrollbars>

      </div >
    );
  }




}

export default Blank;
