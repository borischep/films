import React, { Suspense, useEffect } from 'react';
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
import { observer } from 'mobx-react';
import { useStore } from 'stores/root-store';

const App = () => {
  const { filmStore, themeStore } = useStore();
  useEffect(() => {
    filmStore.setUserFilms(JSON.parse(localStorage.getItem('userFilms')!) || []);
  }, []);


  useEffect(() => {
    localStorage.setItem('userFilms', JSON.stringify(filmStore.userFilms));
  }, [filmStore.userFilms]);

  return (
    <div className={themeStore.darkTheme ? 'dark' : ''}>
      <ThemeProvider theme={themeStore.darkTheme ? DarkTheme : LightTheme}>
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

export default observer(App);
