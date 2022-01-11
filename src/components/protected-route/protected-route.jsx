/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, useLocation } from 'react-router-dom';

const ProtectedRoute = ({
  path, component: Component, updateFilms, films,
}) => {
  const location = useLocation();
  return localStorage.getItem('isAuthenticated') ? (
    <Route path={path} exact>
      <Component onUpdateFilms={updateFilms} films={films} />
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

ProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
  films: PropTypes.arrayOf(PropTypes.object),
  updateFilms: PropTypes.func,
};

ProtectedRoute.defaultProps = {
  films: [],
};

export default ProtectedRoute;
