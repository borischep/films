import React, { Suspense, useState, useEffect } from 'react';
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
  const [userFilms, setUserFilms] = useState([]);
  const [nextPage, setNextPage] = useState(1);

  useEffect(() => {
    setUserFilms(JSON.parse(localStorage.getItem('userFilms')));
    setFilms(userFilms);
  }, []);

  const onDarkThemeOn = (darkThemeIsOn) => {
    setDarkTheme(darkThemeIsOn);
  };

  const onUpdateUserFilms = async (film) => {
    if (!film.liked && !film.watched && !film.toWatch) {
      await setUserFilms((prev) => [...prev.filter((item) => item.id !== film.id)]);
    } else {
      await setUserFilms((prev) => [...prev.filter((item) => item.id !== film.id), film]);
    }
    localStorage.setItem('userFilms', JSON.stringify(userFilms));
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
            <ProtectedRoute
              path="/profile"
              component={Profile}
              films={films}
              updateFilms={onUpdateFilms}
              userFilms={userFilms}
              updateUserFilms={onUpdateUserFilms}
            />
            <Route
              path="/films/:id"
              render={(props) => (
                <FilmPage
                  films={films}
                  userFilms={userFilms}
                  onUpdateUserFilms={onUpdateUserFilms}
                  onUpdateFilms={onUpdateFilms}
                  {...props}
                />
              )}
            />
            <Suspense fallback={<div>Loading...</div>}>
              <ProtectedRoute
                path="/films"
                component={Films}
                films={films}
                updateFilms={onUpdateFilms}
                userFilms={userFilms}
                updateUserFilms={onUpdateUserFilms}
                nextPage={nextPage}
                setNextPage={setNextPage}
              />
            </Suspense>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
