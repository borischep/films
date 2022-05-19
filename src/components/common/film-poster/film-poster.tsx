import React from 'react';
import { ReactComponent as LikedIcon } from 'assets/liked.svg';
import { ReactComponent as WatchIcon } from 'assets/watch.svg';
import { ReactComponent as WatchedIcon } from 'assets/watched.svg';
import { FilmPosterWrapper, FilmPosterImg } from './film-poster.styled';
import { IFilm } from 'interfaces/film.interface';
import { observer } from 'mobx-react';
import { useStore } from 'stores/root-store';


interface IProps {
  filmDetails: IFilm;
}

const FilmPoster = ({
  filmDetails,
}: IProps) => {
  const { filmStore } = useStore();

  const onLiked = () => {
    filmStore.setFilms([...filmStore.films.map((item: IFilm) => (item.id !== filmDetails.id
      ? item
      : { ...item, liked: !item.liked }))]);
    filmStore.updateUserFilm({ ...filmDetails, liked: !filmDetails.liked });
  };

  const onWatched = () => {
    filmStore.setFilms([...filmStore.films.map((item: IFilm) => (item.id !== filmDetails.id
      ? item
      : { ...item, watched: !item.watched }))]);
    filmStore.updateUserFilm({ ...filmDetails, watched: !filmDetails.watched });
  };

  const onToWatch = () => {
    filmStore.setFilms([...filmStore.films.map((item: IFilm) => (item.id !== filmDetails.id
      ? item
      : { ...item, toWatch: !item.toWatch }))]);
    filmStore.updateUserFilm({ ...filmDetails, toWatch: !filmDetails.toWatch });
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

export default observer(FilmPoster);