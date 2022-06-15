const state = {
  visible: null,
  status: false,
  title: null,
  headers: null,
  data: null,
};

const getters = {
  getVisible: () => state.visible,
  getStatus: () => state.status,
  getTitle: () => state.title,
  getHeaders: () => state.headers,
  getData: () => state.data,
};

const actions = {
  setVisible({ commit }, data) {
    commit('setVisible', data);
  },
  setStatus({ commit }, data) {
    commit('setStatus', data);
  },
  setHeadersDialog({ commit }, data) {
    commit('setHeadersDialog', data);
  },
  setDataDialog({ commit }, data) {
    commit('setDataDialog', data);
  },
};

const mutations = {
  setVisible(_, data) {
    state.visible = data;
  },
  setStatus(_, data) {
    state.status = data;
  },
  setDataDialog(_, data) {
    state.data = data;
    // console.log(state.headers);
    state.headers.forEach((el, index) => {
      switch (el.value) {
        case 'name': state.headers[index].field = data.name;
          break;
        case 'fio': state.headers[index].field = data.fio;
          break;
        case 'phone': state.headers[index].field = data.phone;
          break;
        case 'email': state.headers[index].field = data.email;
          break;
        case 'date': state.headers[index].field = data.date;
          break;
        case 'addres': state.headers[index].field = data.addres;
          break;
        case 'category': state.headers[index].field = data.category;
          break;
        case 'count': state.headers[index].field = data.count;
          break;
        case 'price': state.headers[index].field = data.price;
          break;
        case 'total': state.headers[index].field = data.total;
          break;
        default: state.headers[index].field = '';
      }
    });
    // console.log(state.headers);
  },
  setHeadersDialog(_, data) {
    if (data.title) {
      state.title = data.title;
    }
    if (data.headers) {
      state.headers = data.headers;
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
