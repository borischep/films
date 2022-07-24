import { configureStore } from '@reduxjs/toolkit';
import { IError } from 'interfaces/error.interface';
import { IFilm } from 'interfaces/film.interface';
import { IUser } from 'interfaces/user.interface';
import { reducer } from 'reducers/reducer';

export interface IRootStore {
  films: IFilm[],
  userFilms: IFilm[],
  user: IUser,
  page: number,
  isLogged: boolean,
  darkTheme: boolean,
  error: IError,
}

export const userInitialState = {
  login: '',
  password: '',
  email: '',
  gender: '',
  genre: '',
  filmsAmount: 0,
};

const preloadedState = {
  films: [],
  userFilms: [],
  user: userInitialState,
  isLogged: false,
  page: 1,
  darkTheme: false,
  error: { status: 'OK', text: '' },
};

export const store = configureStore({
  reducer: reducer,
  preloadedState,
});