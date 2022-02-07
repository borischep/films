import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { WrapperColumn } from '../../atoms/atoms.styled';
import FilmPoster from '../film-poster';
import {
  FilmTitle, FilmDescription, FilmInfo,
} from './film-page.styled';
import ErrorMessage from '../error-message/error-message';

const FilmPage = ({
  match: { params: { id } }, films, onUpdateFilms, userFilms, onUpdateUserFilms,
}) => {
  const [filmDetails, setFilmDetails] = useState({});

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    films.find((item) => item.id === +id)
      ? setFilmDetails(() => films.find((item) => item.id === +id))
      : fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`)
        .then((res) => res.json())
        .then((res) => {
          onUpdateFilms(() => {
            const filmMarks = userFilms.find((film) => film.id === id);
            return [...films, {
              ...res,
              liked: filmMarks ? filmMarks.liked : false,
              watched: filmMarks ? filmMarks.watched : false,
              toWatch: filmMarks ? filmMarks.toWatch : false,
            }];
          });
        });
  }, [films, filmDetails]);

  return filmDetails ? (
    <WrapperColumn alignSide="center">
      <FilmTitle>{filmDetails.original_title}</FilmTitle>
      <FilmInfo>
        <FilmPoster
          onUpdateFilms={onUpdateFilms}
          filmDetails={filmDetails}
          films={films}
          onUpdateUserFilms={onUpdateUserFilms}
        />
        <FilmDescription>{filmDetails.overview}</FilmDescription>
      </FilmInfo>
    </WrapperColumn>
  ) : (
    <WrapperColumn alignSide="center">
      <ErrorMessage />
    </WrapperColumn>
  );
};

FilmPage.propTypes = {
  films: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.object, PropTypes.bool, PropTypes.string, PropTypes.number, PropTypes.array,
  ])).isRequired,
  onUpdateFilms: PropTypes.func.isRequired,
  userFilms: PropTypes.arrayOf(PropTypes.object),
  onUpdateUserFilms: PropTypes.func.isRequired,
};

FilmPage.defaultProps = {
  films: [],
  userFilms: [],
};
export default FilmPage;
