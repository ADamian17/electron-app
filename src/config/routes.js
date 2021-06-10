import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useSelector } from 'react-redux';

// internal component
import Home from '../views/Home';
import Welcome from '../views/Welcome';
import Chat from '../views/Chat';
import NewChat from '../views/Chat/New';
import Setting from '../views/Setting';

const Routes = () => {
  const user = useSelector(({ auth }) => auth.user);

  const PrivateRoute = ({ Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          user ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  };

  return (
    <Switch>
      <Route exact path="/" component={Welcome} />

      <PrivateRoute path="/home" Component={Home} />

      <PrivateRoute path="/chat/create" component={NewChat} />

      <PrivateRoute path="/chat/:id" component={Chat} />

      <PrivateRoute path="/settings" component={Setting} />
    </Switch>
  );
};

export default Routes;
