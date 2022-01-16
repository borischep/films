/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, useLocation } from 'react-router-dom';

const ProtectedRoute = ({
  path, component: Component, updateFilms, films, userFilms, updateUserFilms, nextPage, setNextPage,
}) => {
  const location = useLocation();
  return localStorage.getItem('isAuthenticated') ? (
    <Route path={path} exact>
      <Component
        onUpdateFilms={updateFilms}
        films={films}
        userFilms={userFilms}
        onUpdateUserFilms={updateUserFilms}
        nextPage={nextPage}
        setNextPage={setNextPage}
      />
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
  updateFilms: PropTypes.func.isRequired,
  userFilms: PropTypes.arrayOf(PropTypes.object),
  updateUserFilms: PropTypes.func.isRequired,
  nextPage: PropTypes.number,
  setNextPage: PropTypes.func,
};

ProtectedRoute.defaultProps = {
  films: [],
  userFilms: [],
};

export default ProtectedRoute;
