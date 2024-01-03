<!-- Navbar.vue -->
<template>
    <nav class="navbar">
      <router-link to="/">Home</router-link>
      <router-link to="/register" v-if="!authStore.token">Register</router-link>
      <router-link to="/login" v-if="!authStore.token">Login</router-link>
      <router-link to="/user-profile" v-if="authStore.token">User Profile</router-link>
      <button v-if="authStore.token" @click="logout">Logout</button>
    </nav>
</template>

<script setup>
import { useAuthStore } from '../stores/Auth.js';
import { useRouter } from 'vue-router'
const router = useRouter();
const authStore = useAuthStore();
const logout = () => {
    authStore.clearToken();
    router.push({ name: 'home' });
};
</script>

<style scoped>
.navbar {
  background-color: #333;
  padding: 15px;
  display: flex;
  justify-content: space-around;
  color: white;
}

.navbar a {
  text-decoration: none;
  color: white;
}
</style>
