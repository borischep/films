import { IFilm } from 'interfaces/film.interface';
import { FILMS_URL, FILM_URL, USER_FILMS_URL } from './links';

export const getFilms = async () => {
  return fetch(FILMS_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getFilmsByPage = async (page: number) => {
  return fetch(`${FILMS_URL}/pages/${page}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }

      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getFilmById = async (id: number) => {
  return fetch(`${FILM_URL}/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }

      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUserFilms = async () => {
  return fetch(USER_FILMS_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }

      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getLikedFilms = async () => {
  return fetch(`${USER_FILMS_URL}/liked`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }

      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getWatchedFilms = async () => {
  return fetch(`${USER_FILMS_URL}/watched`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }

      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getToWatchFilms = async () => {
  return fetch(`${USER_FILMS_URL}/toWatch`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }

      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const setUserFilm = async (film: IFilm) => {
  return fetch(USER_FILMS_URL, {
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify(film),
    headers: {
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
      console.log(err);
    });
};