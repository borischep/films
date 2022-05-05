import React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';

interface IProps {
  path: string;
  component: any,
}

const ProtectedRoute = ({
  path, component: Component,
}: IProps) => {
  const location = useLocation();
  return localStorage.getItem('isAuthenticated') ? (
    <Route path={path} exact>
      <Component />
    </Route>
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
