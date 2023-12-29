<template>
    <div>
      <h2 style="text-align: center;">Register</h2>
      <form @submit.prevent="register">
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
                    <label for="username">Name:</label>
                </td>
                <td>
                    <input type="text" v-model="name" required><br>
                </td>
            </tr>
            <tr>
                <td>
                    <label for="email">Email:</label>
                </td>
                <td>
                    <input type="email" v-model="email" required><br>
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
                <td>
                    <label for="confirmPassword">Confirm Password:</label>
                </td>
                <td>
                    <input type="password" v-model="confirmPassword" required><br>
                </td>
            </tr>
            <tr>
                <td colspan="2" style="text-align: center;"><button type="submit">Register</button></td>
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
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      };
    },
    methods: {
      async register() {
        // ตรวจสอบจำนวนการกรอกข้อมูล
        if (this.username.length < 6 || this.username.length > 24) {
          alert('Username ควรอยู่ระหว่าง 6 ถึง 24 ตัว');
          return;
        }
  
        // ตรวจสอบรหัสผ่านที่ยืนยัน
        if (this.password.length < 8) {
            alert('รหัสผ่านต้องมากกว่า 8 ตัว');
        } else {
        if (this.password !== this.confirmPassword) {
          alert('รหัสผ่านไม่ตรงกัน');
          return;
            }
        }
  
        try {
          const response = await this.$axios.post('http://localhost:8000/api/auth/register', {
            username: this.username,
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.confirmPassword,
            // ตัวแปรใหม่เพื่อเก็บข้อความแสดงผล
            message: '',
          });
  
        console.log(response.data); // โชว์ข้อมูลการสมัครสมาชิกใน console log

        // ตัวแปรใหม่เพื่อเก็บข้อความแสดงผล
        if (response.data.message) {
        this.message = response.data.message;
        }

        // เมื่อลงทะเบียนสำเร็จ, ให้เปลี่ยนหน้าไปยังหน้า Home
        this.$router.push({ name: 'home', query: { message: this.message } });
        } catch (error) {
          console.error('Error registering:', error); // Handle error
        }
      },
    },
  };
  </script>
  