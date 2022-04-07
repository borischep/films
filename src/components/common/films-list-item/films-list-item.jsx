import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FilmPoster from 'components/common/film-poster';
import { FilmListItemWrapper, FilmTitle } from './films-list-item.styled';

const FilmsListItem = ({
  filmDetails, films, onUpdateFilms, onUpdateUserFilms,
}) => (
  <FilmListItemWrapper>
    <FilmPoster
      onUpdateFilms={onUpdateFilms}
      filmDetails={filmDetails}
      films={films}
      onUpdateUserFilms={onUpdateUserFilms}
    />
    <Link to={`/films/${filmDetails.id}`} id={filmDetails.id}><FilmTitle>{filmDetails.title}</FilmTitle></Link>
  </FilmListItemWrapper>
);

FilmsListItem.propTypes = {
  films: PropTypes.arrayOf(PropTypes.object),
  filmDetails: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.object, PropTypes.bool, PropTypes.string, PropTypes.number, PropTypes.array,
  ])).isRequired,
  onUpdateFilms: PropTypes.func.isRequired,
  onUpdateUserFilms: PropTypes.func.isRequired,
};

FilmsListItem.defaultProps = {
  films: [],
};

export default FilmsListItem;
