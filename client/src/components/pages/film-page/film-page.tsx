import React, { useEffect, useState } from 'react';
import { match } from 'react-router-dom';
import { WrapperColumn } from 'atoms/atoms.styled';
import FilmPoster from 'components/common/film-poster';
import ErrorMessage from 'components/common/error-message';
import {
  FilmTitle, FilmDescription, FilmInfo,
} from './film-page.styled';
import { IFilm } from 'interfaces/film.interface';
import { getFilmById } from 'api/films';

type TParams =  { id: string };

interface IProps {
  match: match<TParams>;
}

const FilmPage = ({
  match: { params: { id } },
}: IProps) => {
  const [filmDetails, setFilmDetails] = useState<IFilm>();

  useEffect(() => {
    getFilmById(+id)
      .then((res) => {
        setFilmDetails(res);
      });
  }, []);

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

export default FilmPage;
