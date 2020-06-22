import jwt from 'jsonwebtoken';

export const tokenRefresh = email => {
  const newToken = jwt.sign(
    { exp: Math.floor(Date.now() / 1000) + 60 * 60, email },
    'a-very-secret-key'
  );
  localStorage.setItem('token', newToken);
};
