import React, { Dispatch, Suspense, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { LightTheme, DarkTheme } from 'theme.styled';
import Login from 'components/pages/login';
import ProtectedRoute from 'components/routes/protected-route';
import FilmPage from 'components/pages/film-page';
import Films from 'components/pages/films';
import 'global.css';
import Header from 'components/common/header';
import Profile from 'components/pages/profile';
import { IRootStore } from 'store';
import { connect, ConnectedProps } from 'react-redux';
import { SET_ERROR, SET_USER_FILMS } from 'actions/actionTypes';
import { IFilm } from 'interfaces/film.interface';
import { IUserAction } from 'interfaces/userAction.interface';
import { getUserFilms } from 'api/films';
import { ErrorBoundary } from 'react-error-boundary';
import { IError } from 'interfaces/error.interface';

interface IProps {
  errors: IError;
}

const mapStateToProps = (state: IRootStore) => {
  return {
    darkTheme: state.darkTheme,
    errors: state.error,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IUserAction>) => ({
  setUserFilms: (payload: IFilm[]) =>
    dispatch({ type: SET_USER_FILMS, payload }),
  setError: (payload: IError) =>
    dispatch({ type: SET_ERROR, payload }),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export type ComponentProps = ConnectedProps<typeof connector>;

const ErrorComponent = ({ errors }: IProps) => {
  useEffect(() => {
    if (errors.isError) {
      throw new Error(errors.text);
    }
  }, [errors]);

  return null;
};

const App = ({ darkTheme, errors, setError, setUserFilms }: ComponentProps) => {
  useEffect(() => {
    getUserFilms()
      .then((res) => {
        setUserFilms(res);
      });
  }, []);

  return (
    <ErrorBoundary
      FallbackComponent = {({ error, resetErrorBoundary }) => (
        <div role="alert">
          <p>Something went wrong:</p>
          <pre>{error.message}</pre>
          <button onClick={resetErrorBoundary}>Try again</button>
        </div>
      )}
      onReset={() => {
        setError({ isError: false, text: '' });
      }}
    >
      <ErrorComponent errors={errors} />
      <div className={darkTheme ? 'dark' : ''}>
        <ThemeProvider theme={darkTheme ? DarkTheme : LightTheme}>
          <Router>
            <Header />
            <Switch>
              <Route
                path="/"
                exact
                render={() => (
                  <Login />
                )}
              />
              <ProtectedRoute
                path="/profile"
                component={Profile}
              />
              <Route
                path="/films/:id"
                render={(props) => (
                  <FilmPage
                    {...props}
                  />
                )}
              />
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectedRoute
                  path="/films"
                  component={Films}
                />
              </Suspense>
            </Switch>
          </Router>
        </ThemeProvider>
      </div>
    </ErrorBoundary>
  );
};

export default connector(App);