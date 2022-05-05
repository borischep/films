import React, { Dispatch } from 'react';
import { ReactComponent as LikedIcon } from 'assets/liked.svg';
import { ReactComponent as WatchIcon } from 'assets/watch.svg';
import { ReactComponent as WatchedIcon } from 'assets/watched.svg';
import { FilmPosterWrapper, FilmPosterImg } from './film-poster.styled';
import { IFilm } from 'interfaces/film.interface';
import { UPDATE_USER_FILM, SET_FILMS } from 'actions/actionTypes';
import { connect } from 'react-redux';
import { IRootStore } from 'store';
import { IUserAction } from 'interfaces/userAction.interface';

interface IProps {
  filmDetails: IFilm;
  films: IFilm[];
  setFilms: (f: IFilm[]) => void;
  updateUserfilm: (f: IFilm) => void;
}

const mapStateToProps = (state: IRootStore) => {
  return {
    films: state.films,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IUserAction>) => ({
  updateUserfilm: (payload: IFilm) =>
    dispatch({ type: UPDATE_USER_FILM, payload }),
  setFilms: (payload: IFilm[]) =>
    dispatch({ type: SET_FILMS, payload }),
});

const FilmPoster = ({
  filmDetails, films, setFilms, updateUserfilm,
}: IProps) => {
  const onLiked = () => {
    setFilms([...films.map((item) => (item.id !== filmDetails.id
      ? item
      : { ...item, liked: !item.liked }))]);
    updateUserfilm({ ...filmDetails, liked: !filmDetails.liked });
  };

  const onWatched = () => {
    setFilms([...films.map((item) => (item.id !== filmDetails.id
      ? item
      : { ...item, watched: !item.watched }))]);
    updateUserfilm({ ...filmDetails, watched: !filmDetails.watched });
  };

  const onToWatch = () => {
    setFilms([...films.map((item) => (item.id !== filmDetails.id
      ? item
      : { ...item, toWatch: !item.toWatch }))]);
    updateUserfilm({ ...filmDetails, toWatch: !filmDetails.toWatch });
  };

  return (
    <FilmPosterWrapper>
      <LikedIcon onClick={onLiked} className={`poster-icon ${filmDetails.liked ? 'active' : 'inactive'}`} />
      <WatchIcon
        onClick={onToWatch}
        className={`poster-icon ${filmDetails.toWatch ? 'active' : 'inactive'}`}
      />
      <WatchedIcon
        onClick={onWatched}
        className={`poster-icon ${filmDetails.watched ? 'active' : 'inactive'}`}
      />
      <FilmPosterImg className="poster" src={`https://image.tmdb.org/t/p/w500${filmDetails.poster_path}`} />
    </FilmPosterWrapper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FilmPoster);
