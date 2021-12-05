import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { FilmListItem, FilmTitle, FilmPoster } from './films.styled';
import { WrapperColumnCenter, WrapperRowWrap } from '../../atoms/atoms.styled';
import ErrorMessage from '../error-message/error-message';

const Films = () => {
  const [films, setFilms] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [error, setError] = useState(false);
  const fetchData = () => {
    fetch(`https://api.themoviedb.org/3/movie/popular/?api_key=${process.env.REACT_APP_API_KEY}&page=${nextPage}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Something went wrong');
      })
      .then((res) => {
        setFilms((prev) => [...prev, ...res.results]);
        setNextPage((page) => page + 1);
      })
      .catch(() => {
        setError(true);
      });
  };

  const filmsList = error || !films
    ? <ErrorMessage />
    : (
      <InfiniteScroll
        pageStart={nextPage}
        loadMore={fetchData}
        hasMore={nextPage < 10}
        loader={<h4>Loading...</h4>}
      >
        <WrapperRowWrap>
          {films.map((film) => (
            <FilmListItem key={film.id}>
              <Link to={`/films/${film.id}`}><FilmPoster src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt="poster" /></Link>
              <Link to={`/films/${film.id}`}><FilmTitle>{film.title}</FilmTitle></Link>
            </FilmListItem>
          ))}
        </WrapperRowWrap>
      </InfiniteScroll>
    );

  return (
    <WrapperColumnCenter>
      {filmsList}
    </WrapperColumnCenter>
  );
};

export default Films;
