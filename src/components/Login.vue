<template>
    <div>
      <h2 style="text-align: center;">Login</h2>
      <form @submit.prevent="login">
        <p style="text-align: center;">{{ message }}</p>
        <table style="margin: auto;">
            <tr>
                <td>
                    <label for="username">Username:</label>
                </td>
                <td>
                    <input type="text" v-model="username" required><br>
                </td>
            </tr>
            <tr>
                <td>
                    <label for="password">Password:</label>
                </td>
                <td>
                    <input type="password" v-model="password" required><br>
                </td>
            </tr>
            <tr>
                <td colspan="2" style="text-align: center;"><button type="submit">Login</button></td>
            </tr>
        </table>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        message: '',
      };
    },
    methods: {
      async login() {
        try {
          const response = await this.$axios.post('http://localhost:8000/api/auth/login', {
            username: this.username,
            password: this.password,
          });
  
          const token = response.data.access_token;
          localStorage.setItem('token', token);

          console.log(response.data); 
  
          if (response.data.success == "") {
            console.log('Login successful');
            this.$router.push({ name: 'home', query: { message: response.data.message } });
          } else {
            console.log('Login failed:', 'เข้าสู่ระบบไม่สำเร็จ');
          }
        } catch (error) {
          console.error('Error logging in:', error);
          this.message = 'Error logging in. Please try again.';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styling for the login form here */
  </style>
  
  