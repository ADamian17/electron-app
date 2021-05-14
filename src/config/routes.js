import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

/* recoil hook to access the atom */
import { useRecoilValue } from 'recoil';
import { verifedUser } from '../recoil/user/selector';

// internal component
import Home from '../views/Home';
import Welcome from '../views/Welcome';
import Chat from '../views/Chat';
import NewChat from '../views/Chat/New';
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
      <Route exact path="/" component={Welcome} />

      <PrivateRoute path="/home" Component={Home} />

      <PrivateRoute path="/chat/create" Component={NewChat} />

      <PrivateRoute path="/chat/:id" Component={Chat} />

      <PrivateRoute path="/settings" Component={Setting} />
    </Switch>
  );
};

export default Routes;
