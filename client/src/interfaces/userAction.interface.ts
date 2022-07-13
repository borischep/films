import { IFilm } from './film.interface';
import { IUser } from './user.interface';

export interface IUserAction {
  type: string;
  payload?: IUser | IFilm | IFilm[] | number | boolean | string | object;
}