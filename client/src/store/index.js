import Vue from 'vue';
import Vuex from 'vuex';

import dialog from './modules/dialog';
import products from './modules/products';
import users from './modules/users';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    dialog,
    products,
    users,
  },
});
