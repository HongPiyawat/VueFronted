<!-- UserProfile.vue -->
<template>
    <div>
      <h1>User Profile</h1>
      <div v-if="user">
        <p>Username: {{ user.username }}</p>
        <p>Name: {{ user.name }}</p>
        <p>Email: {{ user.email }}</p>
        <!-- Add other user details as needed -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: null,
      };
    },
    mounted() {
      this.fetchUserData();
    },
    methods: {
      fetchUserData() {
        const token = localStorage.getItem('token');
  
        if (token) {

          const apiUrl = 'http://localhost:8000/api/auth/user-profile';
  
          this.$axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(response => {
            this.user = response.data;
          })
          .catch(error => {
            console.error('Error fetching user data:', error);
          });
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add component styles here */
  </style>
  