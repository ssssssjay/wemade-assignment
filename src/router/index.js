import { createRouter, createWebHistory } from 'vue-router';
import SplashView from '@/views/SplashView.vue';
import DrawView from '@/views/DrawView.vue';
import ClosingView from '@/views/ClosingView.vue';

const routes = [
  {
    path: '/',
    name: 'Splash',
    component: SplashView,
  },
  {
    path: '/draw',
    name: 'Draw',
    component: DrawView,
  },
  {
    path: '/closing',
    name: 'Closing',
    component: ClosingView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
