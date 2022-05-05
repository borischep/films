import React, { Suspense, useEffect, Dispatch } from 'react';
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
import { IFilm } from 'interfaces/film.interface';
import { IRootStore } from 'store';
import { SET_USER_FILMS, SET_FILMS } from 'actions/actionTypes';
import { connect, ConnectedProps } from 'react-redux';
import { IUserAction } from 'interfaces/userAction.interface';

const mapStateToProps = (state: IRootStore) => {
  return {
    userFilms: state.userFilms,
    darkTheme: state.darkTheme,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IUserAction>) => ({
  setUserFilms: (payload: IFilm[]) =>
    dispatch({ type: SET_USER_FILMS, payload }),
  setFilms: (payload: IFilm[]) =>
    dispatch({ type: SET_FILMS, payload }),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export type ComponentProps = ConnectedProps<typeof connector>;

const App = ({ userFilms, darkTheme, setUserFilms }: ComponentProps) => {
  useEffect(() => {
    setUserFilms(JSON.parse(localStorage.getItem('userFilms')!) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem('userFilms', JSON.stringify(userFilms));
  }, [userFilms]);

  return (
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
  );
};

export default connector(App);
