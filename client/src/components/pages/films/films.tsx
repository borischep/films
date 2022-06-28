import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { WrapperColumn, WrapperRowWrap } from 'atoms/atoms.styled';
import FilmsListItem from 'components/common/films-list-item';
import ErrorMessage from 'components/common/error-message';
import { IFilm } from 'interfaces/film.interface';
import { getFilmsByPage } from 'api/films';

const Films = () => {
  const [error, setError] = useState(false);
  const [films, setFilms] = useState<IFilm[]>([]);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    await getFilmsByPage(page)
      .then((res) => {
        setFilms((prev) => [...prev, ...res]);
        setPage((prev) => prev + 1);
      })
      .catch(() => {
        setError(true);
      });
  };

  const filmsList = error
    ? <ErrorMessage />
    : (
      <InfiniteScroll
        pageStart={page}
        loadMore={fetchData}
        hasMore={page < 5}
        loader={<h4 key="loader">Loading...</h4>}
      >
        <WrapperRowWrap>
          {films.map((film) => (
            <FilmsListItem
              key={film.id + page}
              filmDetails={film}
            />
          ))}
        </WrapperRowWrap>
      </InfiniteScroll>
    );

  return (
    <WrapperColumn alignSide="center">
      {filmsList}
    </WrapperColumn>
  );
};

export default Films;
