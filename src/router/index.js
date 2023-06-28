import { createRouter, createWebHistory } from 'vue-router';
import FormView from '../views/FormView.vue';
import ListView from '../views/ListView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'form',
      component: FormView,
    },
    {
      path: '/list',
      name: 'list',
      component: ListView,
    },
  ],
});

export default router;
