/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ path, component }) => {
  const location = useLocation();

  return localStorage.getItem('isAuthenticated') ? (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Route path={path} component={component} exact />
  ) : (
    <Redirect
      to={{
        pathname: '/',
        state: { from: location },
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default ProtectedRoute;
