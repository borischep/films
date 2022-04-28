import React from 'react';
import { Link } from 'react-router-dom';
import FilmPoster from 'components/common/film-poster';
import { FilmListItemWrapper, FilmTitle } from './films-list-item.styled';
import { IFilm } from 'interfaces/film.interface';

interface IProps {
  filmDetails: IFilm;
  films: IFilm[];
  onUpdateFilms: (f: IFilm[]) => void;
  onUpdateUserFilms: (f: IFilm) => void;
}

const FilmsListItem = ({
  filmDetails, films, onUpdateFilms, onUpdateUserFilms,
}: IProps) => (
  <FilmListItemWrapper>
    <FilmPoster
      onUpdateFilms={onUpdateFilms}
      filmDetails={filmDetails}
      films={films}
      onUpdateUserFilms={onUpdateUserFilms}
    />
    <Link to={`/films/${filmDetails.id}`} id={`${filmDetails.id}`}><FilmTitle>{filmDetails.title}</FilmTitle></Link>
  </FilmListItemWrapper>
);

export default FilmsListItem;
