import React, { Suspense, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { LightTheme, DarkTheme } from './theme.styled';
import Login from './components/login';
import ProtectedRoute from './components/protected-route';
import FilmPage from './components/film-page';
import './global.css';
import Header from './components/header/header';
import Profile from './components/profile/profile';

const Films = React.lazy(() => import('./components/films'));

const App = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  const [films, setFilms] = useState([]);

  const onDarkThemeOn = (darkThemeIsOn) => {
    setDarkTheme(darkThemeIsOn);
  };

  const onUpdateFilms = (filmsList) => {
    setFilms(filmsList);
  };

  return (
    <div className={darkTheme ? 'dark' : ''}>
      <ThemeProvider theme={darkTheme ? DarkTheme : LightTheme}>
        <Router>
          <Header onDarkThemeOn={onDarkThemeOn} />
          <Switch>
            <Route path="/" exact component={Login} />
            <ProtectedRoute path="/profile" component={Profile} films={films} updateFilms={onUpdateFilms} />
            <Route path="/films/:id" component={FilmPage} films={films} onUpdateFilms={onUpdateFilms} />
            <Suspense fallback={<div>Loading...</div>}>
              <ProtectedRoute path="/films" component={Films} updateFilms={onUpdateFilms} films={films} />
            </Suspense>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
