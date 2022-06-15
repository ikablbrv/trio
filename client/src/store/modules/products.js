const mutations = {
  setCount(state, data) {
    state.count = data;
  },

  setCategory(state, data) {
    state.category = data;
  },

  setProducts(state, data) {
    state.products = data;
  },
};

const actions = {
  setProducts({ commit }, data) {
    commit('setProducts', data);
  },
  setCategory({ commit }, data) {
    commit('setCategory', data);
  },
  setCount({ commit }, data) {
    commit('setCount', data);
  },
};

const getters = {
  getProducts: (state) => state.products,
  getCategory: (state) => state.category,
  getCount: (state) => state.count,
};

const state = {
  products: null,
  category: null,
  count: null,

  edit: null,
  delete: null,
};

export default {
  state,
  mutations,
  getters,
  actions,
};
