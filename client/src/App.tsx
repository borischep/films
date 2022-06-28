import React, { Suspense } from 'react';
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

const mapStateToProps = (state: IRootStore) => {
  return {
    darkTheme: state.darkTheme,
  };
};

const connector = connect(mapStateToProps);

export type ComponentProps = ConnectedProps<typeof connector>;

const App = ({ darkTheme }: ComponentProps) => {
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
