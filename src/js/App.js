import React from 'react';

// internal component
import BaseLayout from '../layout/base';
import Routes from '../config/routes';

const App = () => {
  return (
    <div className="content-wrapper">
      <BaseLayout>
        <Routes />
      </BaseLayout>
    </div>
  );
};

export default App;
