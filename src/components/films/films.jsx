import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';
import { WrapperColumnCenter, WrapperRowWrap } from '../../atoms/atoms.styled';
import FilmsListItem from '../films-list-item';
import ErrorMessage from '../error-message/error-message';

const Films = ({ films, onUpdateFilms }) => {
  const [nextPage, setNextPage] = useState(1);
  const [error, setError] = useState(false);

  const fetchData = () => {
    fetch(`https://api.themoviedb.org/3/movie/popular/?api_key=${process.env.REACT_APP_API_KEY}&page=${nextPage}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        setError(true);
        throw new Error('Something went wrong');
      })
      .then((res) => {
        const newFilms = res.results.map((item) => {
          item.liked = false;
          item.watched = false;
          item.toWatch = false;
          return item;
        });
        onUpdateFilms((prev) => [...prev, ...newFilms]);
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
        loader={<h4 key="loader">Loading...</h4>}
      >
        <WrapperRowWrap>
          {films.map((film) => (
            <FilmsListItem key={film.id} onUpdateFilms={onUpdateFilms} filmDetails={film} />
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

Films.propTypes = {
  films: PropTypes.arrayOf(PropTypes.object).isRequired,
  onUpdateFilms: PropTypes.func.isRequired,
};

export default Films;
