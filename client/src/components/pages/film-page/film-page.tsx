import React, { Dispatch, useEffect, useState } from 'react';
import { match } from 'react-router-dom';
import { WrapperColumn } from 'atoms/atoms.styled';
import FilmPoster from 'components/common/film-poster';
import ErrorMessage from 'components/common/error-message';
import {
  FilmTitle, FilmDescription, FilmInfo,
} from './film-page.styled';
import { IFilm } from 'interfaces/film.interface';
import { getFilmById } from 'api/films';
import { ADD_FILMS } from 'actions/actionTypes';
import { IUserAction } from 'interfaces/userAction.interface';
import { connect } from 'react-redux';
import { IRootStore } from 'store';

type TParams =  { id: string };

interface IProps {
  films: IFilm[];
  match: match<TParams>;
  addFilms: (f: IFilm[]) => void;
}

const mapStateToProps = (state: IRootStore) => {
  return {
    films: state.films,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IUserAction>) => ({
  addFilms: (payload: IFilm[]) =>
    dispatch({ type: ADD_FILMS, payload }),
});

const FilmPage = ({
  match: { params: { id } }, films, addFilms,
}: IProps) => {
  const [filmDetails, setFilmDetails] = useState<IFilm>();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    films.find((item) => item.id === +id)
      ? setFilmDetails(() => films.find((item) => item.id === +id))
      : getFilmById(+id)
        .then((res) => {
          addFilms([res]);
          setFilmDetails(res);
        });
  }, [films]);

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

export default connect(mapStateToProps, mapDispatchToProps)(FilmPage);