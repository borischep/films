import { IFilm } from 'interfaces/film.interface';
import { makeAutoObservable } from 'mobx';
import { IRootStore } from './root-store';
 
export class FilmStore { 
  films: IFilm[] = [];

  userFilms: IFilm[] = [];

  page = 0;

  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }
 
  setFilms(films: IFilm[]) {
    this.films = films;
  }
 
  addFilms(films: IFilm[]) {
    this.films = [
      ...this.films.filter((item: IFilm) => (!films.find((film: IFilm) => film.id === item.id))),
      ...films.map((item: IFilm) => {
        const filmMarks = this.userFilms.find((film: IFilm) => film.id === item.id);
        item.liked = filmMarks ? filmMarks.liked : false;
        item.watched = filmMarks ? filmMarks.watched : false;
        item.toWatch = filmMarks ? filmMarks.toWatch : false;
        return item;
      }),
    ];
  }

  updateUserFilm(film: IFilm) {
    if (!film.liked && !film.watched && !film.toWatch) {
      this.userFilms = [...this.userFilms.filter((item: IFilm) => item.id !== film.id) ];
    } else {
      this.userFilms = [...this.userFilms.filter((item: IFilm) => item.id !== film.id), film ];
    }
  }

  setUserFilms(films: IFilm[]) {
    this.userFilms = films;
  }

  setPage(page: number) {
    this.page = page;
  }

  setNextPage() {
    this.page = this.page + 1;
  }

  clearStore() {
    this.films = [];
    this.userFilms = [];
    this.page = 0;
  }
}