import React, { Dispatch, Suspense, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from 'styled-components';
import { LightTheme, DarkTheme } from 'theme.styled';
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
import NewEditUser from 'components/pages/newEditUser';
import Login from 'components/pages/login';

interface IProps {
  errors: IError;
}

const mapStateToProps = (state: IRootStore) => {
  return {
    darkTheme: state.darkTheme,
    isLogged: state.isLogged,
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

const App = ({ darkTheme, isLogged, errors, setError, setUserFilms }: ComponentProps) => {
  useEffect(() => {
    if (isLogged) {
      getUserFilms()
        .then((res) => {
          setUserFilms(res);
        });
    }
  }, [isLogged]);

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
          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}>
            <Router>
              <Header />
              <Switch>
                <Route exact path="/" render={() => (
                  <Redirect to="/films" />
                )}/>
                <Route
                  path="/login"
                  render={() => (
                    <Login />
                  )}
                />
                <Route
                  path="/registration"
                  render={() => (
                    <NewEditUser />
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
          </GoogleOAuthProvider>
        </ThemeProvider>
      </div>
    </ErrorBoundary>
  );
};

export default connector(App);
