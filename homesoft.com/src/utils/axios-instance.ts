import axios from 'axios';
import Cookies from 'js-cookie';

const v1URL = process.env.API_BASE_URL + '/api/v1';
export const apiV1 = axios.create({
  baseURL: v1URL,
  headers: {
    Authorization: Cookies.get('token'),
  },
});

const createApiInstance = () => {
  return axios.create({
    baseURL: v1URL,
    headers: {
      Authorization: Cookies.get('token'),
    },
  });
};

export const getApiV1Instance = () => {
  return createApiInstance();
};
