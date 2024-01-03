import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Register from './components/Register.vue';
import Login from './components/Login.vue';
import UserProfile from './components/UserProfile.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/user-profile',
    name: 'user-profile',
    component: UserProfile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
