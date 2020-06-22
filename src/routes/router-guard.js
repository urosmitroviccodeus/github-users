import jwt from 'jsonwebtoken';
import { tokenRefresh } from '../utils/functions';

// eslint-disable-next-line no-unused-vars
export const checkToken = (to, from, next) => {
  const token = jwt.decode(localStorage.getItem('token'));
  const refreshToken = jwt.decode(localStorage.getItem('refresh-token'));

  if (token && token.exp > Math.floor(Date.now() / 1000)) {
    if (to.name === 'Login') {
      next({ name: 'UserList' });
    } else {
      next();
    }
  } else {
    if (
      token &&
      refreshToken &&
      refreshToken.exp > Math.floor(Date.now() / 1000)
    ) {
      tokenRefresh(token.email);
      if (to.name === 'Login') {
        next({ name: 'UserList' });
      } else {
        next();
      }
    } else {
      localStorage.clear();
      if (to.name !== 'Login') {
        next({ name: 'Login' });
      } else {
        next();
      }
    }
  }
};
