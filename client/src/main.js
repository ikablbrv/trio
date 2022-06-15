import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.use(Vuelidate);

Vue.config.productionTip = false;

Vue.prototype.$baseUrl = process.env.NODE_ENV === 'development'
  ? 'http://127.0.0.1:8888/'
  : 'http://трио.site:8888/';
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
