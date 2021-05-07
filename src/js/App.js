import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

// internal component
import Home from '../views/Home';
import Navbar from '../components/Navbar/Navbar';

const App = () => {
  // ########## HOME VIEW START ############
  return (
    <div className="content-wrapper">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/settings">
            <h1>settings</h1>
          </Route>

          <Route path="/login">
            <h1>Login</h1>
          </Route>

          <Route path="/register">
            <h1>Register</h1>
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
