/* eslint-disable react/require-default-props */
import React, { FC } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { IFilm } from 'interfaces/film.interface';

interface IFCProps {
  userFilms: IFilm[];
  films: IFilm[];
  nextPage: number;
  setNextPage: (f: number) => void;
  onUpdateFilms: (f: any) => void;
  onUpdateUserFilms: (f: IFilm) => void;
}

interface IProps {
  path: string;
  component: FC<IFCProps>,
  films: IFilm[];
  userFilms: IFilm[];
  nextPage: number;
  setNextPage: (f: number) => void;
  updateFilms: (f: any) => void;
  updateUserFilms: (f: IFilm) => void;
}

const ProtectedRoute = ({
  path, component: Component, updateFilms, films, userFilms, updateUserFilms, nextPage, setNextPage,
}: IProps) => {
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

export default ProtectedRoute;
