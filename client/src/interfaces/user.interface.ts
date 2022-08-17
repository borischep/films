export interface IUser {
  login: string;
  password: string;
  email: string;
  gender: string;
  genre: string;
  filmsAmount: number;
}

export interface ILoginData {
  login: string;
  password: string;
}