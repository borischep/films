import Cookies from 'universal-cookie';
import { IFilm } from 'interfaces/film.interface';
import { FILMS_URL, FILM_URL, USER_FILMS_URL } from './links';

const cookies = new Cookies();

export const getFilms = async () => {
  return fetch(FILMS_URL, 
    { headers: { 'x-access-token': cookies.get('accessToken') } })
    .then((response) => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }
      return response.json();
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getFilmsByPage = async (page: number) => {
  return fetch(`${FILMS_URL}/pages/${page}`, 
    { headers: { 'x-access-token': cookies.get('accessToken') } })
    .then((response) => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }

      return response.json();
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getFilmById = async (id: number) => {
  return fetch(`${FILM_URL}/${id}`, 
    { headers: { 'x-access-token': cookies.get('accessToken') } })
    .then((response) => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }

      return response.json();
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getUserFilms = async () => {
  return fetch(USER_FILMS_URL, 
    { headers: { 'x-access-token': cookies.get('accessToken') } })
    .then((response) => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }

      return response.json();
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getLikedFilms = async () => {
  return fetch(`${USER_FILMS_URL}/liked`, 
    { headers: { 'x-access-token': cookies.get('accessToken') } })
    .then((response) => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }

      return response.json();
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getWatchedFilms = async () => {
  return fetch(`${USER_FILMS_URL}/watched`, 
    { headers: { 'x-access-token': cookies.get('accessToken') } })
    .then((response) => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }

      return response.json();
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getToWatchFilms = async () => {
  return fetch(`${USER_FILMS_URL}/toWatch`, 
    { headers: { 'x-access-token': cookies.get('accessToken') } })
    .then((response) => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }

      return response.json();
    })
    .catch((err) => {
      console.error(err);
    });
};

export const setUserFilm = async (film: IFilm) => {
  return fetch(USER_FILMS_URL, {
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify(film),
    headers: {
      'x-access-token': cookies.get('accessToken'),
      'Access-Control-Allow-Headers': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }

      return response.json();
    })
    .catch((err) => {
      console.error(err);
    });
};