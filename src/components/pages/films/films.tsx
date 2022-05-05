import React, { useState, Dispatch } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { WrapperColumn, WrapperRowWrap } from 'atoms/atoms.styled';
import FilmsListItem from 'components/common/films-list-item';
import ErrorMessage from 'components/common/error-message';
import { IFilm } from 'interfaces/film.interface';
import { ADD_FILMS, SET_NEXT_PAGE } from 'actions/actionTypes';
import { connect } from 'react-redux';
import { IRootStore } from 'store';
import { IUserAction } from 'interfaces/userAction.interface';

interface IProps {
  films: IFilm[];
  page: number;
  addFilms: (f: IFilm[]) => void;
  setNextPage: () => void;
}

const mapStateToProps = (state: IRootStore) => {
  return {
    page: state.page,
    films: state.films,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IUserAction>) => ({
  addFilms: (payload: IFilm[]) =>
    dispatch({ type: ADD_FILMS, payload }),
  setNextPage: () =>
    dispatch({ type: SET_NEXT_PAGE }),
});

const Films = ({
  films, page, addFilms, setNextPage,
}: IProps) => {
  const [error, setError] = useState(false);
  const fetchData = () => {
    fetch(`https://api.themoviedb.org/3/movie/popular/?api_key=${process.env.REACT_APP_API_KEY}&page=${page + 1}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        setError(true);
        throw new Error('Something went wrong');
      })
      .then((res) => {
        addFilms(res.results);
        setNextPage();
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
        hasMore={page < 10}
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

export default connect(mapStateToProps, mapDispatchToProps)(Films);
