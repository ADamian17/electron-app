import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

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
  console.log({ isVerify });

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

      <PrivateRoute path="/chat/:id" Component={Chat} />

      <Route path="/settings" component={Setting} />
    </Switch>
  );
};

export default Routes;
