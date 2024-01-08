<!-- UserProfile.vue -->
<template>
    <div>
        <h1>User Profile</h1>
        <div v-if="user">
            <p>Username: {{ user.username }}</p>
            <p>Name: {{ user.name }}</p>
            <p>Email: {{ user.email }}</p>
            <p>Roles: {{ user.roles.map(role => role.name).join(', ') }}</p>
            <!-- Add other user details as needed -->
        </div>
    </div>
</template>
  
<script setup>
    import { ref, onMounted } from 'vue';
    import { useAuthStore } from '../stores/Auth';
    import axios from 'axios';

    const authStore = useAuthStore();
    const getUserProfile = async () => {
        const token = authStore.token;
        if (token) {
            try {
                const response = await axios.get('http://localhost:8000/api/auth/user-profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                user.value = response.data.user;
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    };

    const user = ref(null);

    onMounted(() => {
        getUserProfile();
    });
</script>
  
  <style scoped>
  /* Add component styles here */
  </style>
  