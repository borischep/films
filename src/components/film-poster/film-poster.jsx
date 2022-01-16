import React from 'react';
import PropTypes from 'prop-types';
import { FilmPosterWrapper, FilmPosterImg } from './film-poster.styled';
import { ReactComponent as LikedIcon } from '../../assets/liked.svg';
import { ReactComponent as WatchIcon } from '../../assets/watch.svg';
import { ReactComponent as WatchedIcon } from '../../assets/watched.svg';

const FilmPoster = ({
  filmDetails, films, onUpdateFilms, onUpdateUserFilms,
}) => {
  const onLiked = () => {
    onUpdateFilms([...films.map((item) => (item.id !== filmDetails.id
      ? item
      : { ...item, liked: !item.liked }))]);
    onUpdateUserFilms({ ...filmDetails, liked: !filmDetails.liked });
  };

  const onWatched = () => {
    onUpdateFilms([...films.map((item) => (item.id !== filmDetails.id
      ? item
      : { ...item, watched: !item.watched }))]);
    onUpdateUserFilms({ ...filmDetails, watched: !filmDetails.watched });
  };

  const onToWatch = () => {
    onUpdateFilms([...films.map((item) => (item.id !== filmDetails.id
      ? item
      : { ...item, toWatch: !item.toWatch }))]);
    onUpdateUserFilms({ ...filmDetails, toWatch: !filmDetails.toWatch });
  };

  return (
    <FilmPosterWrapper>
      <LikedIcon onClick={onLiked} className={`poster-icon ${filmDetails.liked ? 'active' : 'inactive'}`} alt="img" />
      <WatchIcon
        onClick={onToWatch}
        className={`poster-icon ${filmDetails.toWatch ? 'active' : 'inactive'}`}
        alt="img"
      />
      <WatchedIcon
        onClick={onWatched}
        className={`poster-icon ${filmDetails.watched ? 'active' : 'inactive'}`}
        alt="img"
      />
      <FilmPosterImg className="poster" src={`https://image.tmdb.org/t/p/w500${filmDetails.poster_path}`} alt="img" />
    </FilmPosterWrapper>
  );
};

FilmPoster.propTypes = {
  films: PropTypes.arrayOf(PropTypes.object),
  filmDetails: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.object, PropTypes.bool, PropTypes.string, PropTypes.number, PropTypes.array,
  ])).isRequired,
  onUpdateFilms: PropTypes.func.isRequired,
  onUpdateUserFilms: PropTypes.func.isRequired,
};

FilmPoster.defaultProps = {
  films: [],
};

export default FilmPoster;
