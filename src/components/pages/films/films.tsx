import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { WrapperColumn, WrapperRowWrap } from 'atoms/atoms.styled';
import FilmsListItem from 'components/common/films-list-item';
import ErrorMessage from 'components/common/error-message';
import { IFilm } from 'interfaces/film.interface';

interface IProps {
  userFilms: IFilm[];
  films: IFilm[];
  nextPage: number;
  onUpdateFilms: (f: IFilm[]) => void;
  onUpdateUserFilms: (f: IFilm) => void;
  setNextPage: (e: number) => void;
}

const Films: React.FC<IProps> = ({
  films = [], userFilms, nextPage, onUpdateUserFilms, onUpdateFilms, setNextPage,
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
        onUpdateFilms([...films.filter((item) => (!res.results.find((film: IFilm) => film.id === item.id))),
          ...res.results.map((item: IFilm) => {
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

export default Films;
