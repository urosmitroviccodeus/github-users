import axios from 'axios';

export const fetchUserList = () => axios.get('https://api.github.com/users');

export const fetchUserDetails = (name, detail) =>
  axios.get(`https://api.github.com/users/${name}/${detail}`);
