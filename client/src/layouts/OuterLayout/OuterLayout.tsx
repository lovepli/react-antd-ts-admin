import React, { Suspense } from 'react';
import { Switch, Route, RouteProps } from 'react-router-dom';
import PageLoading from '@/components/PageLoading';
import routes from '@/router/outerRouter/OutRouter';
import './style.less';




class OuterLayout extends React.Component {
  public render() {
    return (
      <div className="outer-layout">
        <Suspense fallback={<PageLoading />}>
          <Switch>
            {
              routes.map((route: RouteProps) => (
                <Route
                  key={route.path + ''}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              ))
            }
          </Switch>
        </Suspense>
      </div>
    )
  }
}

export default OuterLayout;
