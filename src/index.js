import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import App from './js/App';

import 'bootstrap/dist/css/bootstrap.min.css';

import './index.scss';

ReactDOM.render(
  <Provider store={store}>

    <Router>
      <App />
    </Router>

  </Provider>,
  document.getElementById('root'),
);
