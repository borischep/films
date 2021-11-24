import React, { useEffect, useState } from 'react';
import { WrapperColumnCenter } from '../../atoms/atoms.styled';
import {
  FilmTitle, FilmPoster, FilmDescription, FilmInfo,
} from './film-page.styled';

const FilmPage = (props) => {
  // eslint-disable-next-line react/prop-types
  const { match: { params: { id } } } = props;
  const [filmDetails, setFilmDetails] = useState({});

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`)
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
