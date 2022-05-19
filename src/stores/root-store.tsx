import { createContext, useContext } from 'react';
import { IFilm } from 'interfaces/film.interface';
import { FilmStore } from './film-store';
import { UserStore } from './user-store';
import { ThemeStore } from './theme-store';
import { IUser } from 'interfaces/user.interface';

export interface IRootStore {
  filmStore: {
    films: IFilm[],
    userFilms: IFilm[],
    page: number,
  },
  userStore: {
    user: IUser,
    isLogged: boolean
  },
  themeStore: {
    darkTheme: boolean,
  },
}

export class RootStore {

  filmStore: FilmStore;

  userStore: UserStore;

  themeStore: ThemeStore;

  constructor() {
    this.filmStore = new FilmStore(this);
    this.userStore = new UserStore(this);
    this.themeStore = new ThemeStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());

export const useStore = () => useContext(RootStoreContext);