import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import { RecoilRoot } from 'recoil';
import RecoilLogger from 'recoil-logger';

import App from './js/App';

import 'bootstrap/dist/css/bootstrap.min.css';

import './index.scss';

ReactDOM.render(
  <RecoilRoot>
    <RecoilLogger />
    <Router>
      <App />
    </Router>
  </RecoilRoot>,
  document.getElementById('root')
);
