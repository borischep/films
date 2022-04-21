import React, { Suspense, useState, useEffect } from 'react';
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

const App = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  const [films, setFilms] = useState<IFilm[]>();
  const [userFilms, setUserFilms] = useState<IFilm[]>();
  const [nextPage, setNextPage] = useState<number>(1);
  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    setUserFilms(JSON.parse(localStorage.getItem('userFilms')!) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem('userFilms', JSON.stringify(userFilms));
  }, [userFilms]);

  const onDarkThemeOn = (darkThemeIsOn: boolean) => {
    setDarkTheme(darkThemeIsOn);
  };

  const onUpdateUserFilms = (film: IFilm) => {
    if (!film.liked && !film.watched && !film.toWatch) {
      setUserFilms((prev) => prev ? [...prev.filter((item: IFilm) => item.id !== film.id)] : []);
    } else {
      setUserFilms((prev) => prev ? [...prev.filter((item: IFilm) => item.id !== film.id),
        {
          id: film.id, liked: film.liked, watched: film.watched, toWatch: film.toWatch,
        }] : []);
    }
  };

  const onUpdateFilms = (filmsList: IFilm[]) => {
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
              films={films!}
              updateFilms={onUpdateFilms}
              userFilms={userFilms!}
              updateUserFilms={onUpdateUserFilms}
              nextPage={nextPage}
              setNextPage={setNextPage}
            />
            <Route
              path="/films/:id"
              render={(props: any) => (
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
                films={films!}
                updateFilms={onUpdateFilms}
                userFilms={userFilms!}
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
