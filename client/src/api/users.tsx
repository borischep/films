import { IUser } from 'interfaces/user.interface';
import { USERS_URL } from './links';

export const getUser = async () => {
  return fetch(`${USERS_URL}`)
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

export const setUser = async (user: IUser) => {
  return fetch(USERS_URL, {
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify(user),
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

export const deleteUser = async () => {
  return fetch(USERS_URL, {
    method: 'DELETE',
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