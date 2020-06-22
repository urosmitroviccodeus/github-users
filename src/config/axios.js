import axios from 'axios';
import jwt from 'jsonwebtoken';
import { tokenRefresh } from '../utils/functions';

axios.interceptors.request.use(
  function(config) {
    const token = jwt.decode(localStorage.getItem('token'));
    const refreshToken = jwt.decode(localStorage.getItem('refresh-token'));

    if (token && token.exp > Math.floor(Date.now() / 1000)) {
      return config;
    } else {
      if (
        token &&
        refreshToken &&
        refreshToken.exp > Math.floor(Date.now() / 1000)
      ) {
        tokenRefresh(token.email);
        return config;
      } else {
        localStorage.clear();
        return config;
      }
    }
  },
  function(error) {
    console.log({ error });
    return Promise.reject(error);
  }
);
