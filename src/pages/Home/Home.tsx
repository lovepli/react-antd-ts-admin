import React from "react";

import './Home.less'



interface IProps {
  history: any
}

class Home extends React.Component<IProps>{




  public handleClick = () => {
    console.log(this.props.history)

  }
  public render() {
    return (
      <div>
        <p className="c">dddd</p>
        <button onClick={this.handleClick}>kkkk</button>
      </div>
    )
  }
}


export default Home;
