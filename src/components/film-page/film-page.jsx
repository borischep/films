import React, {useEffect, useState} from 'react';
import { WrapperColumnCenter } from '../../atoms/atoms.styled';
import {
  FilmTitle, FilmPoster, FilmDescription, FilmInfo 
} from './film-page.styled';

const FilmPage = (props) => {
  // eslint-disable-next-line react/prop-types
  const { id } = props.match.params;
  const [filmDetails, setFilmDetails] = useState({});

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=9ecc13a99e487f98d6e3a8d253d778b7`)
      .then((res) => res.json())
      .then((res) => setFilmDetails(res));
  }, []);

  return (
    <WrapperColumnCenter>
      <FilmTitle>{filmDetails.original_title}</FilmTitle>
      <FilmInfo>
        <FilmPoster src={`https://image.tmdb.org/t/p/w500${filmDetails.poster_path}`} alt="poster" />
        <FilmDescription>{filmDetails.overview}</FilmDescription>
      </FilmInfo>
    </WrapperColumnCenter>
  );
};

export default FilmPage;
