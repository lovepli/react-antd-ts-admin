import React from 'react';
import { HashRouter as Router, Route, Switch} from 'react-router-dom';
import { Spin } from 'antd';

const Layout = React.lazy(() => import( /* webpackChunkName:"layout" */ '@/layout'));
const Login = React.lazy(() => import( /* webpackChunkName:"login" */ '@/pages/Login'))

const token = sessionStorage.getItem('token');

class App extends React.Component {
  public render() {
    return (
      <Router>
        <React.Suspense fallback={<Spin />}>
          <Switch>
            <Route path="/" render={() => token ? <Layout /> : <Login />} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </React.Suspense>
      </Router>
    )
  }
}


export default App;
