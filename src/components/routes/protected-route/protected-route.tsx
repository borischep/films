import React from 'react';
import { Redirect, Route, useLocation, RouteProps } from 'react-router-dom';

interface IProps {
  path: string;
  component: RouteProps['component'],
}

const ProtectedRoute = ({
  path, component: Component,
}: IProps) => {
  const location = useLocation();
  return localStorage.getItem('isAuthenticated') ? (
    <Route path={path} exact component={Component} />
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