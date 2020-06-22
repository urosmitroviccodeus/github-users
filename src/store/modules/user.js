import { fetchUserList, fetchUserDetails } from '../../endpoints';
import types from '../mutation-types';

const state = () => ({
  loading: false,
  userList: [],
  userDetails: {}
});

const getters = {
  isLoading: state => state.loading,
  userList: state => state.userList,
  userDetails: state => state.userDetails
};

const mutations = {
  [types.SET_USER_LIST](state, { fetchedUserList }) {
    state.userList = fetchedUserList.slice(0, 20);
  },
  [types.SET_USER_DETAILS](state, details) {
    const [
      user,
      followers,
      following,
      starred,
      subscriptions,
      orgs,
      repos
    ] = details;

    state.userDetails.user = {
      name: user.login,
      avatar: user.avatar_url,
      url: user.html_url
    };
    state.userDetails.followers = followers.data.map(follower => ({
      name: follower.login,
      url: follower.html_url
    }));
    state.userDetails.following = following.data.map(followingItem => ({
      name: followingItem.login,
      url: followingItem.html_url
    }));
    state.userDetails.starred = starred.data.map(starredItem => ({
      name: starredItem.name,
      url: starredItem.html_url
    }));
    state.userDetails.subscriptions = subscriptions.data.map(subscription => ({
      name: subscription.name,
      url: subscription.html_url
    }));
    state.userDetails.orgs = orgs.data.map(org => ({
      name: org.login,
      url: org.html_url
    }));
    state.userDetails.repos = repos.data.map(repo => ({
      name: repo.name,
      url: repo.html_url
    }));
  }
};

const actions = {
  fetchUserList({ state, commit }) {
    state.loading = true;
    fetchUserList()
      .then(({ data }) => {
        console.log(data);
        commit(types.SET_USER_LIST, { fetchedUserList: data });
      })
      .finally(() => {
        state.loading = false;
      });
  },
  fetchUserDetails({ state, commit }, user) {
    state.loading = true;
    const { login } = user;

    return Promise.all([
      fetchUserDetails(login, 'followers'),
      fetchUserDetails(login, 'following'),
      fetchUserDetails(login, 'starred'),
      fetchUserDetails(login, 'subscriptions'),
      fetchUserDetails(login, 'orgs'),
      fetchUserDetails(login, 'repos')
    ])
      .then(response => {
        console.log(response);

        commit(types.SET_USER_DETAILS, [user, ...response]);
      })
      .finally(() => {
        state.loading = false;
      });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
