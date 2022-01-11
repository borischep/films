import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FilmListItemWrapper, FilmTitle } from './films-list-item.styled';
import FilmPoster from '../film-poster';

const FilmsListItem = ({ filmDetails, onUpdateFilms }) => (
  <FilmListItemWrapper>
    <FilmPoster onUpdateFilms={onUpdateFilms} film={filmDetails} />
    <Link to={`/films/${filmDetails.id}`} id={filmDetails.id}><FilmTitle>{filmDetails.title}</FilmTitle></Link>
  </FilmListItemWrapper>
);

FilmsListItem.propTypes = {
  filmDetails: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.object, PropTypes.bool, PropTypes.string, PropTypes.number, PropTypes.array,
  ])).isRequired,
  onUpdateFilms: PropTypes.func.isRequired,
};

export default FilmsListItem;
