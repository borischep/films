import React, { useEffect, useState, Dispatch } from 'react';
import { match } from 'react-router-dom';
import { WrapperColumn } from 'atoms/atoms.styled';
import FilmPoster from 'components/common/film-poster';
import ErrorMessage from 'components/common/error-message';
import {
  FilmTitle, FilmDescription, FilmInfo,
} from './film-page.styled';
import { IFilm } from 'interfaces/film.interface';
import { ADD_FILMS } from 'actions/actionTypes';
import { connect } from 'react-redux';
import { IRootStore } from 'store';
import { IUserAction } from 'interfaces/userAction.interface';

type TParams =  { id: string };

interface IProps {
  userFilms: IFilm[];
  films: IFilm[];
  match: match<TParams>;
  addFilms: (f: IFilm[]) => void;
}

const mapStateToProps = (state: IRootStore) => {
  return {
    userFilms: state.userFilms,
    films: state.films,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IUserAction>) => ({
  addFilms: (payload: IFilm[]) =>
    dispatch({ type: ADD_FILMS, payload }),
});

const FilmPage = ({
  match: { params: { id } }, films, userFilms, addFilms,
}: IProps) => {
  const [filmDetails, setFilmDetails] = useState<IFilm>();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    films.find((item) => item.id === +id)
      ? setFilmDetails(() => films.find((item) => item.id === +id))
      : fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`)
        .then((res) => res.json())
        .then((res) => {
          const filmMarks = userFilms.find((film) => film.id === +id);
          addFilms([{
            ...res,
            liked: filmMarks ? filmMarks.liked : false,
            watched: filmMarks ? filmMarks.watched : false,
            toWatch: filmMarks ? filmMarks.toWatch : false,
          }]);
        });
  }, [films, filmDetails]);

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
