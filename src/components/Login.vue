<template>
    <div>
      <h2 style="text-align: center;">เข้าสู่ระบบ</h2>
      <Form @submit="login" :validation-schema="loginSchema">
        <table style="margin: auto;">
          <tr>
            <td>
              <label for="username">ชื่อผู้ใช้:</label>
            </td>
            <td>
                <Field name="username" as="input" placeholder="ชื่อผู้ใช้"/>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
                <ErrorMessage name="username" class="error-message"/>
            </td>
          </tr>
          <tr>
            <td>
              <label for="password">รหัสผ่าน:</label>
            </td>
            <td>
                <Field name="password" type="password" placeholder="รหัสผ่าน"/>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
                <ErrorMessage name="password" class="error-message"/>
            </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center;">
              <button type="submit">เข้าสู่ระบบ</button>
            </td>
          </tr>
        </table>
      </Form>
    </div>
  </template>
  
  <script setup>
  import Swal from 'sweetalert2';
  import * as Yup from 'yup';
  import { Form , Field, ErrorMessage } from 'vee-validate';
  import axios from 'axios';
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '../stores/Auth.js';
  
  const authStore = useAuthStore();
  const loginSchema = Yup.object({
      username: Yup.string().required('กรุณากรอกชื่อผู้ใช้').min(6,'ชื่อผู้ใช้ควรมีรหัสมากกว่า 6 ตัวขึ้นไป'),
      password: Yup.string().required('กรุณากรอกรหัสผ่าน').min(8, 'รหัสผ่านควรมีอย่างน้อย 8 ตัวขึ้นไป'),
    });

    const router = useRouter()

    const login = async ( value ) => {
      try {

        const response = await axios.post('http://localhost:8000/api/auth/login', {
          username: value.username,
          password: value.password,
        });

        const token = response.data.access_token;
        authStore.setToken(token);

        if (response.data.success === '') {
          await Swal.fire({
            icon: 'success',
            title: 'เข้าสู่ระบบสำเร็จ',
            text: response.data.message,
          });

          router.push({ name: 'home' });
        } else {
          await Swal.fire({
            icon: 'error',
            title: 'เข้าสู่ระบบล้มเหลว',
            text: 'เข้าสู่ระบบไม่สำเร็จ',
          });
        }
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเข้าสู่ระบบ:', error);

        await Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ',
          text: 'กรุณาลองอีกครั้ง',
        });
      }
    };
  </script>
  
  <style scoped>
    .error-message {
        color: red;
        font-size: small;
    }

  </style>
  