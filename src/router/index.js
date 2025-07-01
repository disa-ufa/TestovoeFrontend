// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Incomes from '../pages/Incomes.vue';
import Orders from '../pages/Orders.vue';
import Sales from '../pages/Sales.vue';
import Stocks from '../pages/Stocks.vue';

const routes = [
  { path: '/', redirect: '/incomes' },
  { path: '/incomes', component: Incomes },
  { path: '/orders', component: Orders },
  { path: '/sales', component: Sales },
  { path: '/stocks', component: Stocks }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
