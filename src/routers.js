import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Register from './components/Register.vue';
import Login from './components/Login.vue';
import UserProfile from './components/UserProfile.vue';
import RoleManagement from './components/RoleManagement.vue';
import PermissionManagement from './components/PermissionManagement.vue';
import UserManagement from './components/UserManagement.vue';

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
  {
    path: '/roles',
    name: 'roles',
    component: RoleManagement,
  },
  {
    path: '/permissions',
    name: 'permissions',
    component: PermissionManagement,
  },
  {
    path: '/users',
    name: 'users',
    component: UserManagement,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
