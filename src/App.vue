<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Register from './components/Register.vue';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Navbar from './components/Navbar.vue';
import RoleManagement from './components/RoleManagement.vue';
import PermissionManagement from './components/PermissionManagement.vue';

export default {
  components: {
    Register,
    Home,
    Login,
    Navbar,
    RoleManagement,
    PermissionManagement,
  },
};
</script>
