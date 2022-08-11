import Cookies from 'universal-cookie';
import { IUser, ILoginData } from 'interfaces/user.interface';
import { USERS_URL } from './links';

const cookies = new Cookies();

export const getAllUsers = async () => {
  return fetch(`${USERS_URL}/getAll`, 
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

export const getUser = async () => {
  return fetch(`${USERS_URL}/getUser`,
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

export const registerUser = async (user: IUser) => {
  return fetch(`${USERS_URL}/register`, {
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

      const res = response.json();
      
      res.then((data) => cookies.set('accessToken', data.user.accessToken));

      return res;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const editUser = async (user: IUser) => {
  return fetch(`${USERS_URL}/edit`, {
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify(user),
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

export const login = async (credentials: ILoginData) => {
  return fetch(`${USERS_URL}/login`, {
    credentials: 'include',
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }
      const res = response.json();
      res.then((data) => {
        cookies.set('accessToken', data.user.accessToken);
      });

      return res;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const deleteUser = async () => {
  return fetch(`${USERS_URL}/delete`, {
    method: 'DELETE',
    headers: { 'x-access-token': cookies.get('accessToken') },
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