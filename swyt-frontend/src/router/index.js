// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '../components/ProductList.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ProductList
  },
  // create product
  {
    path: '/create',
    name: 'Create',
    component: () => import('../components/CreateProduct.vue')
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
