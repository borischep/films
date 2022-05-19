import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { WrapperColumn, WrapperRowWrap } from 'atoms/atoms.styled';
import FilmsListItem from 'components/common/films-list-item';
import ErrorMessage from 'components/common/error-message';
import { IFilm } from 'interfaces/film.interface';
import { observer } from 'mobx-react';
import { useStore } from 'stores/root-store';

const Films = () => {
  const [error, setError] = useState(false);
  const { filmStore } = useStore();

  const fetchData = () => {
    // eslint-disable-next-line max-len
    fetch(`https://api.themoviedb.org/3/movie/popular/?api_key=${process.env.REACT_APP_API_KEY}&page=${filmStore.page + 1}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        setError(true);
        throw new Error('Something went wrong');
      })
      .then((res) => {
        filmStore.addFilms(res.results);
        filmStore.setNextPage();
      })
      .catch(() => {
        setError(true);
      });
  };

  const filmsList = error
    ? <ErrorMessage />
    : (
      <InfiniteScroll
        pageStart={filmStore.page}
        loadMore={fetchData}
        hasMore={filmStore.page < 10}
        loader={<h4 key="loader">Loading...</h4>}
      >
        <WrapperRowWrap>
          {filmStore.films.map((film: IFilm) => (
            <FilmsListItem
              key={film.id + filmStore.page}
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

export default observer(Films);