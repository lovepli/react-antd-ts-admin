import React from 'react'
import './style.less'



interface IState {
  count: number;
  name: string
}

class App extends React.PureComponent<any, IState> {
  public readonly state: Readonly<IState> = {
    name: 'wly'
  } as IState;

  public componentDidMount() {
    this.setState({
      count: 2
    })
  }

  public render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <p>{this.state.name}</p>
      </div>
    )
  }
}



export default App;
