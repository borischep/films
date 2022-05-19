import React, { useEffect, useState } from 'react';
import { match } from 'react-router-dom';
import { WrapperColumn } from 'atoms/atoms.styled';
import FilmPoster from 'components/common/film-poster';
import ErrorMessage from 'components/common/error-message';
import {
  FilmTitle, FilmDescription, FilmInfo,
} from './film-page.styled';
import { IFilm } from 'interfaces/film.interface';
import { observer } from 'mobx-react';
import { useStore } from 'stores/root-store';

type TParams =  { id: string };

interface IProps {
  match: match<TParams>;
}

const FilmPage = ({
  match: { params: { id } },
}: IProps) => {
  const [filmDetails, setFilmDetails] = useState<IFilm>();
  const { filmStore } = useStore();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    filmStore.films.find((item: IFilm) => item.id === +id)
      ? setFilmDetails(() => filmStore.films.find((item: IFilm) => item.id === +id))
      : fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`)
        .then((res) => res.json())
        .then((res) => {
          const filmMarks = filmStore.userFilms.find((film: IFilm) => film.id === +id);
          filmStore.addFilms([{
            ...res,
            liked: filmMarks ? filmMarks.liked : false,
            watched: filmMarks ? filmMarks.watched : false,
            toWatch: filmMarks ? filmMarks.toWatch : false,
          }]);
        });
  }, [filmStore.films, filmDetails]);

  return filmDetails ? (
    <WrapperColumn alignSide="center">
      <FilmTitle>{filmDetails.title}</FilmTitle>
      <FilmInfo>
        <FilmPoster
          filmDetails={filmDetails}
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

export default observer(FilmPage);