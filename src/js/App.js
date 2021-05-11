import React from 'react';

import Routes from '../config/routes';

// internal component
import Navbar from '../components/Navbar/Navbar';

const App = () => {
  return (
    <div className="content-wrapper">
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
