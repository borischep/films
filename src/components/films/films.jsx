import React, { useState, useEffect } from 'react';
import { FilmListItem, FilmTitle, FilmPoster } from './films.styled';
import { WrapperColumnCenter, WrapperRowWrap, Text } from '../../atoms/atoms.styled';

const Films = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/popular/?api_key=9ecc13a99e487f98d6e3a8d253d778b7')
      .then((res) => res.json())
      .then((res) => setFilms(res.results));
  }, []);

  const filmsList = films.map((film) => (
    <FilmListItem key={film.id}>
      <FilmPoster src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt="poster" />
      <FilmTitle>{film.title}</FilmTitle>
    </FilmListItem>
  ));

  return (
    <WrapperColumnCenter>
      <Text>Films</Text>
      <WrapperRowWrap>
        {filmsList}
      </WrapperRowWrap>
    </WrapperColumnCenter>
  );
};

export default Films;
