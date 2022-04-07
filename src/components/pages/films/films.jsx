import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';
import { WrapperColumn, WrapperRowWrap } from 'atoms/atoms.styled';
import FilmsListItem from 'components/common/films-list-item';
import ErrorMessage from 'components/common/error-message';

const Films = ({
  films, onUpdateFilms, userFilms, onUpdateUserFilms, nextPage, setNextPage,
}) => {
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
        onUpdateFilms([...films.filter((item) => (!res.results.find((film) => film.id === item.id))),
          ...res.results.map((item) => {
            const filmMarks = userFilms.find((film) => film.id === item.id);
            item.liked = filmMarks ? filmMarks.liked : false;
            item.watched = filmMarks ? filmMarks.watched : false;
            item.toWatch = filmMarks ? filmMarks.toWatch : false;
            return item;
          })]);
        setNextPage(nextPage + 1);
      })
      .catch(() => {
        setError(true);
      });
  };

  const filmsList = error
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
            <FilmsListItem
              key={film.id + nextPage}
              onUpdateFilms={onUpdateFilms}
              filmDetails={film}
              films={films}
              onUpdateUserFilms={onUpdateUserFilms}
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

Films.propTypes = {
  films: PropTypes.arrayOf(PropTypes.object),
  onUpdateFilms: PropTypes.func.isRequired,
  userFilms: PropTypes.arrayOf(PropTypes.object),
  onUpdateUserFilms: PropTypes.func.isRequired,
  nextPage: PropTypes.number.isRequired,
  setNextPage: PropTypes.func.isRequired,
};

Films.defaultProps = {
  films: [],
  userFilms: [],
};

export default Films;
