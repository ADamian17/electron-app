import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import { RecoilRoot } from 'recoil';
import RecoilLogger from 'recoil-logger';

import { Provider } from 'react-redux';
import store from './redux/store';

import App from './js/App';

import 'bootstrap/dist/css/bootstrap.min.css';

import './index.scss';

ReactDOM.render(
<<<<<<< HEAD
  <RecoilRoot>
    <RecoilLogger />
    <Router>
      <App />
    </Router>
  </RecoilRoot>,
=======
  <Provider store={store}>
    <RecoilRoot>
      <Router>
        <App />
      </Router>
    </RecoilRoot>
  </Provider>,
>>>>>>> faaee3010ebb6749eb9a63f8114f16cdc1498803
  document.getElementById('root')
);
