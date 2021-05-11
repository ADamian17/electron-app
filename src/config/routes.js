import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

/* recoil hook to access the atom */
import { useRecoilValue } from 'recoil';
import { verifedUser } from '../recoil/user/selector';

// internal component
import Home from '../views/Home';
import Welcome from '../views/Welcome';
import Chat from '../views/Chat';
import Setting from '../views/Setting';

const Routes = () => {
  const isVerify = useRecoilValue(verifedUser);

  const PrivateRoute = ({ Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          isVerify ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  };

  return (
    <Switch>
      <Route exact path="/">
        <Welcome />
      </Route>

      <Route path="/home">
        <Home />
      </Route>

      <Route path="/chat/:id">
        <Chat />
      </Route>

      <Route path="/settings">
        <Setting />
      </Route>
    </Switch>
  );
};

export default Routes;
