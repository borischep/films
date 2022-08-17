import Cookies from 'universal-cookie';
import { API_URL } from './links';

const cookies = new Cookies();

export const deleteCookie = (cname: string) => {
  cookies.remove(cname);
};

export const checkToken = async () => {
  return fetch(`${API_URL}/checkToken`, 
    { headers: { 'x-access-token': cookies.get('accessToken') } })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.error(err);
    });
};