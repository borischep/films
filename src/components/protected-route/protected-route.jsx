import React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';

const ProtectedRoute = (props) => {
  const location = useLocation();

  return localStorage.getItem('isAuthenticated') ? (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Route {...props} exact />
  ) : (
    <Redirect
      to={{
        pathname: '/',
        state: { from: location },
      }}
    />
  );
};

export default ProtectedRoute;
