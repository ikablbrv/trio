import Vue from 'vue';
import VueRouter from 'vue-router';

import main from '../views/Main.vue';
import auth from '../views/Auth.vue';

import providers from '../views/Providers.vue';
import staff from '../views/Staff.vue';
import users from '../views/Users.vue';
import products from '../views/Products.vue';
import otchet from '../views/Otchet.vue';

import supply from '../views/Supply.vue';
import refaund from '../views/Refund.vue';
import purchase from '../views/Purchase.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'main-page',
    component: main,
    meta: { visible: true },
  },
  {
    path: '/auth',
    name: 'auth',
    component: auth,
  },
  {
    path: '/providers',
    name: 'providers',
    component: providers,
    meta: { visible: true },
  },
  {
    path: '/staff',
    name: 'staff',
    component: staff,
    meta: { visible: true },
  },
  {
    path: '/users',
    name: 'users',
    component: users,
    meta: { visible: true },
  },
  {
    path: '/products',
    name: 'products',
    component: products,
    meta: { visible: true },
  },
  {
    path: '/otchet',
    name: 'otchet',
    component: otchet,
    meta: { visible: true, tableHeader: false },
  },
  {
    path: '/supply',
    name: 'supply',
    component: supply,
    meta: { visible: true },
  },
  {
    path: '/refaund',
    name: 'refaund',
    component: refaund,
    meta: { visible: true },
  },
  {
    path: '/purchase',
    name: 'purchase',
    component: purchase,
    meta: { visible: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === 'auth' && localStorage.getItem('token')) next({ name: 'providers' });
  else next();
  if (to.name === 'main-page') next({ name: 'providers' });
  if (!localStorage.getItem('token')) next({ name: 'auth' });
  else next();
});

export default router;
