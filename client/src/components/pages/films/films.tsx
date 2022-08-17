import React, { Dispatch } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { WrapperColumn, WrapperRowWrap } from 'atoms/atoms.styled';
import FilmsListItem from 'components/common/films-list-item';
import ErrorMessage from 'components/common/error-message';
import { IFilm } from 'interfaces/film.interface';
import { getFilmsByPage } from 'api/films';
import { ADD_FILMS, SET_ERROR, SET_NEXT_PAGE } from 'actions/actionTypes';
import { IUserAction } from 'interfaces/userAction.interface';
import { connect } from 'react-redux';
import { IRootStore } from 'store';
import { ErrorBoundary } from 'react-error-boundary';
import { IError } from 'interfaces/error.interface';

interface IProps {
  films: IFilm[];
  page: number;
  errors: IError;
  isLogged: boolean;
  addFilms: (f: IFilm[]) => void;
  setError: (f: IError) => void;
  setNextPage: () => void;
}

const mapStateToProps = (state: IRootStore) => {
  return {
    page: state.page,
    films: state.films,
    errors: state.error,
    isLogged: state.isLogged,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IUserAction>) => ({
  addFilms: (payload: IFilm[]) =>
    dispatch({ type: ADD_FILMS, payload }),
  setNextPage: () =>
    dispatch({ type: SET_NEXT_PAGE }),
  setError: (payload: IError) =>
    dispatch({ type: SET_ERROR, payload }),
});

const Films = ({
  films, page, errors, isLogged, setError, addFilms, setNextPage,
}: IProps) => {
  const fetchData = async () => {
    await getFilmsByPage(page)
      .then((res) => {
        addFilms(res);
        setNextPage();
      })
      .catch(() => {
        setError({ isError: true, text: 'Error while films fetching' });
      });
  };

  const filmsList = errors.isError
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
    <ErrorBoundary
    FallbackComponent = {({ error, resetErrorBoundary }) => (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    )}
    onReset={() => {
      setError({ isError: false, text: '' });
    }}
  >
    <WrapperColumn alignSide="center">
      { 
        isLogged
          ? filmsList
          : null  
      }
    </WrapperColumn>
    </ErrorBoundary>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Films);