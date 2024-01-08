<template>
    <nav class="navbar">
        <router-link to="/">Home</router-link>
        <router-link v-if="!hasPermission('Visitor')" to="/register">Register</router-link>
        <router-link v-if="!hasPermission('Visitor')" to="/login">Login</router-link>
        <router-link v-if="hasPermission('Visitor')" to="/user-profile">User Profile</router-link>
        <router-link v-if="hasPermission('Admin') || hasPermission('Employee')" to="/users">Users</router-link>
        <router-link v-if="hasPermission('Admin')" to="/permissions">Permissions</router-link>
        <router-link v-if="hasPermission('Admin')" to="/roles">Roles</router-link>
        <button v-if="hasPermission('Visitor')" @click="logout">Logout</button>
    </nav>
</template>

<script setup>
import { useAuthStore } from '../stores/Auth.js';
import { useRouter } from 'vue-router';
import { usePermissionStore } from '../stores/Permission.js';

const router = useRouter();
const authStore = useAuthStore();
const permissionStore = usePermissionStore();

const hasPermission = (permission) => {
    // Check if the user has the specified permission
    const userPermissions = permissionStore.getDecryptedPermissions();
    return userPermissions && userPermissions.includes(permission);
};

const logout = () => {
    authStore.clearToken();
    permissionStore.clearPermissions();
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
