export interface IFilm {
  title?: string;
  overview?: string;
  id: number;
  liked?: boolean;
  watched?: boolean;
  toWatch?: boolean;
  poster_path?: string;
}