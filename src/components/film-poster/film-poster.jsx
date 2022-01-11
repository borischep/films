import React from 'react';
import PropTypes from 'prop-types';
import { FilmPosterWrapper, FilmPosterImg } from './film-poster.styled';
import { ReactComponent as LikedIcon } from '../../assets/liked.svg';
import { ReactComponent as WatchIcon } from '../../assets/watch.svg';
import { ReactComponent as WatchedIcon } from '../../assets/watched.svg';
import './film-poster.css';

const FilmPoster = ({ film, onUpdateFilms }) => {
  const onLiked = () => {
    onUpdateFilms((prev) => prev.map((item) => (item.id === film.id
      ? { ...item, liked: !item.liked }
      : item)));
  };

  const onWatched = () => {
    onUpdateFilms((prev) => prev.map((item) => (item.id === film.id
      ? { ...item, watched: !item.watched }
      : item)));
  };

  const onToWatch = () => {
    onUpdateFilms((prev) => prev.map((item) => (item.id === film.id
      ? { ...item, toWatch: !item.toWatch }
      : item)));
  };

  return (
    <FilmPosterWrapper>
      <LikedIcon onClick={onLiked} className={`poster-icon ${film.liked ? 'active' : 'inactive'}`} alt="poster" />
      <WatchIcon onClick={onToWatch} className={`poster-icon ${film.toWatch ? 'active' : 'inactive'}`} alt="poster" />
      <WatchedIcon onClick={onWatched} className={`poster-icon ${film.watched ? 'active' : 'inactive'}`} alt="poster" />
      <FilmPosterImg className="poster" src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt="poster" />
    </FilmPosterWrapper>
  );
};

FilmPoster.propTypes = {
  film: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.object, PropTypes.bool, PropTypes.string, PropTypes.number, PropTypes.array,
  ])).isRequired,
  onUpdateFilms: PropTypes.func.isRequired,
};

export default FilmPoster;
