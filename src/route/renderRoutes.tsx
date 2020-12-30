import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { RouteType } from '../route/index';

const RenderRoutes = (routes: Array<RouteType>) => (
  routes ? (
    <Switch>
      {
        routes.map((route, i) => {
          if (route.redirect) {
            return (
              <Redirect
                key={route.key || i}
                from={route.path}
                to={route.redirect}
                exact={route.exact}
                strict={route.strict}
              />
            );
          }
          return (
            <Route
              key={route.key || i}
              path={route.path}
              exact={route.exact}
              strict={route.strict}
              render={(props) => (
                <route.component {...props} routes={route.routes} />
              )}
            />
          );
        })
      }
    </Switch>
  ) : null
);

export default RenderRoutes;
