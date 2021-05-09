import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

// internal component
import Home from '../views/Home';
import Navbar from '../components/Navbar/Navbar';
import Login from '../views/Login';
import Chat from '../views/Chat';
import Setting from '../views/Setting';
import Register from '../views/Register';

const App = () => {
  
  return (
    <div className="content-wrapper">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/chat/:id">
            <Chat />
          </Route>

          <Route path="/settings">
            <Setting />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
