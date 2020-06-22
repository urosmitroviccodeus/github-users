import Login from '../pages/Login';
import Layout from '../pages/Layout';
import UserList from '../pages/UserList';
import UserDetails from '../pages/UserDetails';

import { checkToken } from './router-guard';

export default [
  {
    path: '/',
    name: 'Login',
    component: Login,
    beforeEnter: checkToken
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: '',
        name: 'UserList',
        component: UserList,
        beforeEnter: checkToken
      },
      {
        path: 'details',
        name: 'UserDetails',
        component: UserDetails,
        beforeEnter: checkToken
      }
    ]
  }
];
