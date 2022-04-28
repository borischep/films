import React from 'react';
import { ReactComponent as LikedIcon } from 'assets/liked.svg';
import { ReactComponent as WatchIcon } from 'assets/watch.svg';
import { ReactComponent as WatchedIcon } from 'assets/watched.svg';
import { FilmPosterWrapper, FilmPosterImg } from './film-poster.styled';
import { IFilm } from 'interfaces/film.interface';

interface IProps {
  filmDetails: IFilm;
  films: IFilm[];
  onUpdateFilms: (f: IFilm[]) => void;
  onUpdateUserFilms: (f: IFilm) => void;
}

const FilmPoster = ({
  filmDetails, films, onUpdateFilms, onUpdateUserFilms,
}: IProps) => {
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

export default FilmPoster;
