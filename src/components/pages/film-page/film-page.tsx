import React, { useEffect, useState } from 'react';
import { match } from 'react-router-dom';
import { WrapperColumn } from 'atoms/atoms.styled';
import FilmPoster from 'components/common/film-poster';
import ErrorMessage from 'components/common/error-message';
import {
  FilmTitle, FilmDescription, FilmInfo,
} from './film-page.styled';
import { IFilm } from 'interfaces/film.interface';

type TParams =  { id: string };

interface IProps {
  userFilms: IFilm[];
  films: IFilm[];
  onUpdateFilms: (f: any) => void;
  onUpdateUserFilms: (f: IFilm) => void;
  match: match<TParams>;
}

const FilmPage = ({
  match: { params: { id } }, films, onUpdateFilms, userFilms, onUpdateUserFilms,
}: IProps) => {
  const [filmDetails, setFilmDetails] = useState<IFilm>();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    films.find((item) => item.id === +id)
      ? setFilmDetails(() => films.find((item) => item.id === +id))
      : fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`)
        .then((res) => res.json())
        .then((res) => {
          onUpdateFilms(() => {
            const filmMarks = userFilms.find((film) => film.id === +id);
            return [...films, {
              ...res,
              liked: filmMarks ? filmMarks.liked : false,
              watched: filmMarks ? filmMarks.watched : false,
              toWatch: filmMarks ? filmMarks.toWatch : false,
            }];
          });
        });
  }, [films, filmDetails]);

  return filmDetails ? (
    <WrapperColumn alignSide="center">
      <FilmTitle>{filmDetails.title}</FilmTitle>
      <FilmInfo>
        <FilmPoster
          onUpdateFilms={onUpdateFilms}
          filmDetails={filmDetails}
          films={films}
          onUpdateUserFilms={onUpdateUserFilms}
        />
        <FilmDescription>{filmDetails.overview}</FilmDescription>
      </FilmInfo>
    </WrapperColumn>
  ) : (
    <WrapperColumn alignSide="center">
      <ErrorMessage />
    </WrapperColumn>
  );
};

export default FilmPage;
