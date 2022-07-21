import React, { Dispatch } from 'react';
import { ReactComponent as LikedIcon } from 'assets/liked.svg';
import { ReactComponent as WatchIcon } from 'assets/watch.svg';
import { ReactComponent as WatchedIcon } from 'assets/watched.svg';
import { FilmPosterWrapper, FilmPosterImg } from './film-poster.styled';
import { IFilm } from 'interfaces/film.interface';
import { setUserFilm } from 'api/films';
import { IMAGE_URL } from 'api/links';
import { UPDATE_USER_FILM, SET_FILM } from 'actions/actionTypes';
import { IUserAction } from 'interfaces/userAction.interface';
import { IRootStore } from 'store';
import { connect } from 'react-redux';

interface IProps {
  filmDetails: IFilm;
  setFilm: (f: IFilm) => void;
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
  setFilm: (payload: IFilm) =>
    dispatch({ type: SET_FILM, payload }),
});

const FilmPoster = ({
  filmDetails, setFilm, updateUserfilm,
}: IProps) => {
  const updateRating = async (value: IFilm) => {
    const fallback = filmDetails;
    setFilm(value);
    await setUserFilm(value)
      .then((res) => {
        setFilm(res);
        updateUserfilm(res);
      })
      .catch(() => {
        setFilm(fallback);
      });
  };

  const onLiked = () => {
    updateRating({ ...filmDetails, liked: !filmDetails.liked });
  };

  const onWatched = async () => {
    updateRating({ ...filmDetails, watched: !filmDetails.watched });
  };

  const onToWatch = async () => {
    updateRating({ ...filmDetails, toWatch: !filmDetails.toWatch });
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
      <FilmPosterImg className="poster" src={`${IMAGE_URL}${filmDetails.poster_path}`} />
    </FilmPosterWrapper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FilmPoster);