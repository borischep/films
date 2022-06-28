import { configureStore } from '@reduxjs/toolkit';
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
}

const preloadedState = {
  films: [],
  userFilms: [],
  user: { username: '' },
  isLogged: false,
  page: 0,
  darkTheme: false, 
};

export const store = configureStore({
  reducer: reducer,
  preloadedState,
});