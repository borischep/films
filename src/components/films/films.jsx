import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FilmListItem, FilmTitle, FilmPoster } from './films.styled';
import { WrapperColumnCenter, WrapperRowWrap } from '../../atoms/atoms.styled';

const Films = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular/?api_key=${process.env.REACT_APP_API_KEY}`)
      .then((res) => res.json())
      .then((res) => setFilms(res.results));
  }, []);

  const filmsList = films.map((film) => (
    <FilmListItem key={film.id}>
      <Link to={`/films/${film.id}`}><FilmPoster src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt="poster" /></Link>
      <Link to={`/films/${film.id}`}><FilmTitle>{film.title}</FilmTitle></Link>
    </FilmListItem>
  ));

  return (
    <WrapperColumnCenter>
      <WrapperRowWrap>
        {filmsList}
      </WrapperRowWrap>
    </WrapperColumnCenter>
  );
};

export default Films;
