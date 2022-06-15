const mutations = {
  setUsers(state, data) {
    state.users = data;
  },
  addUsers(state, data) {
    state.users.push(data);
  },
};

const actions = {
  setUsers({ commit }, data) {
    commit('setUsers', data);
  },
  addUsers({ commit }, data) {
    commit('addUsers', data);
  },
};

const getters = {
  getUsers: (state) => state.users,
};

const state = {
  users: null,
};

export default {
  state,
  mutations,
  getters,
  actions,
};
