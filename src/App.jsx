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
import Header from './components/header';
import Profile from './components/profile';

const Films = React.lazy(() => import('./components/films'));

const App = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  const [films, setFilms] = useState([]);
  const [userFilms, setUserFilms] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setUserFilms(JSON.parse(localStorage.getItem('userFilms')) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem('userFilms', JSON.stringify(userFilms));
  }, [userFilms]);

  const onDarkThemeOn = (darkThemeIsOn) => {
    setDarkTheme(darkThemeIsOn);
  };

  const onUpdateUserFilms = (film) => {
    if (!film.liked && !film.watched && !film.toWatch) {
      setUserFilms((prev) => [...prev.filter((item) => item.id !== film.id)]);
    } else {
      setUserFilms((prev) => [...prev.filter((item) => item.id !== film.id),
        {
          id: film.id, liked: film.liked, watched: film.watched, toWatch: film.toWatch,
        }]);
    }
  };

  const onUpdateFilms = (filmsList) => {
    setFilms(filmsList);
  };

  return (
    <div className={darkTheme ? 'dark' : ''}>
      <ThemeProvider theme={darkTheme ? DarkTheme : LightTheme}>
        <Router>
          <Header isLogged={isLogged} setIsLogged={setIsLogged} onDarkThemeOn={onDarkThemeOn} />
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <Login setIsLogged={setIsLogged} />
              )}
            />
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
