import React, { useState } from 'react';
import { ReactComponent as LikedIcon } from 'assets/liked.svg';
import { ReactComponent as WatchIcon } from 'assets/watch.svg';
import { ReactComponent as WatchedIcon } from 'assets/watched.svg';
import { FilmPosterWrapper, FilmPosterImg } from './film-poster.styled';
import { IFilm } from 'interfaces/film.interface';
import { setUserFilm } from 'api/films';
import { IMAGE_URL } from 'api/links';

interface IProps {
  filmDetails: IFilm;
}

const FilmPoster = ({
  filmDetails,
}: IProps) => {
  const [film, setFilm] = useState<IFilm>(filmDetails);

  const onLiked = async () => {
    await setUserFilm({ ...film, liked: !film.liked })
      .then((res) => {
        setFilm(res);
      });
  };

  const onWatched = () => {
    setUserFilm({ ...film, watched: !film.watched })
      .then((res) => {
        setFilm(res);
      });
  };

  const onToWatch = () => {
    setUserFilm({ ...film, toWatch: !film.toWatch })
      .then((res) => {
        setFilm(res);
      });
  };

  return (
    <FilmPosterWrapper>
      <LikedIcon onClick={onLiked} className={`poster-icon ${film.liked ? 'active' : 'inactive'}`} />
      <WatchIcon
        onClick={onToWatch}
        className={`poster-icon ${film.toWatch ? 'active' : 'inactive'}`}
      />
      <WatchedIcon
        onClick={onWatched}
        className={`poster-icon ${film.watched ? 'active' : 'inactive'}`}
      />
      <FilmPosterImg className="poster" src={`${IMAGE_URL}${film.poster_path}`} />
    </FilmPosterWrapper>
  );
};

export default FilmPoster;
