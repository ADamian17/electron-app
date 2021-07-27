import React from 'react';

import Navbar from '../components/Navbar/Navbar';

const BaseLayout = ({ children, ...rest }) => {
  return (
    <>
      <Navbar {...rest} />
      {children}
    </>
  )
}

export default BaseLayout;


const getComponentName = (Component) => {
  return Component.displayName || Component.name || 'Component'
}

export const withBaseLayout = (Component, config) => (props) => {

  const viewName = getComponentName(Component)

  return (
    <>
      <Navbar {...config} view={viewName} />
      <Component {...props} />
    </>

  )
};
