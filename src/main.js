import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Home from './components/Home.vue';
import Register from './components/Register.vue';
import Login from './components/Login.vue';
import Navbar from './components/Navbar.vue';
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
    component: UserProfile, // Add UserProfile component
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

// ตั้งค่า global property สำหรับ Axios
app.config.globalProperties.$axios = axios;
app.use(VueAxios, axios);

// ลงทะเบียน component Navbar
app.component('Navbar', Navbar);

// ใช้ Vue Router
app.use(router);

app.mount('#app');
