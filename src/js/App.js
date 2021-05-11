import React from 'react';

// internal component
import Routes from '../config/routes';
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
