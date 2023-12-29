<!-- Navbar.vue -->
<template>
    <nav class="navbar">
        <router-link to="/">Home</router-link>
        <router-link to="/register" v-if="isUnAuthenticated">Register</router-link>
        <router-link to="/login" v-if="isUnAuthenticated">Login</router-link>
        <router-link to="/user-profile" v-if="isAuthenticated">User Profile</router-link>
        <button v-if="isAuthenticated" @click="logout">Logout</button>
    </nav>
</template>

<script>
export default {
    computed: {
        isAuthenticated() {
            const isAuthenticated = !!localStorage.getItem('token');
        return isAuthenticated;
        },
        isUnAuthenticated() {
            const isUnAuthenticated =! !!localStorage.getItem('token');
        return isUnAuthenticated;
        },
    },
    methods: {
        logout() {
            console.log('Before removal:', localStorage.getItem('token'));
            localStorage.removeItem('token');
            console.log('After removal:', localStorage.getItem('token'));
            this.$router.push({ name: 'login' });
        },
    },
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
