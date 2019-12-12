import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './style.less';
import Aaa from './Aaa';
import Bbb from './Bbb';




interface IProps {

}


interface IState { }


class Pdf extends React.Component<IProps, IState> {



  public render() {


    return (
      <div className="pdf">
        <p>blank</p>
        <Switch>
          <Route path="/blank/aaa" exact={true} component={Aaa} />
          <Route path="/blank/bbb" exact={true} component={Bbb} />

        </Switch>
      </div>
    );
  }


}

export default Pdf;
