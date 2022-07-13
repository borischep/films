export const API_URL: string = process.env.REACT_APP_API_URL || 'http://localhost:3005';
export const FILMS_URL = `${API_URL}/films`;
export const FILM_URL = `${FILMS_URL}/movies`;
export const USER_FILMS_URL = `${FILMS_URL}/userfilms`;
export const USERS_URL = `${API_URL}/users`;
export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';