<template>
    <div>
      <h2 style="text-align: center;">Register</h2>
      <Form @submit="register" :validation-schema="registerSchema">
        <table style="margin: auto;">
            <tr>
                <td>
                    <label for="username">Username:</label>
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
                    <label for="name">Name:</label>
                </td>
                <td>
                    <Field name="name" as="input" placeholder="ชื่อ นามสกุล"/>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <ErrorMessage name="name" class="error-message"/>
                </td>
            </tr>
            <tr>
                <td>
                    <label for="email">Email:</label>
                </td>
                <td>
                    <Field name="email" type="email" placeholder="อีเมล"/>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <ErrorMessage name="email" class="error-message"/>
                </td>
            </tr>
            <tr>
                <td>
                    <label for="password">Password:</label>
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
                <td>
                    <label for="confirmPassword">Confirm Password:</label>
                </td>
                <td>
                    <Field name="confirmpassword" type="password" placeholder="ยืนยันรหัสผ่าน"/>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <ErrorMessage name="confirmpassword" class="error-message"/>
                </td>
            </tr>
            <tr>
                <td colspan="2" style="text-align: center;"><button type="submit">Register</button></td>
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

    const router = useRouter()

    const registerSchema = Yup.object({
      username: Yup.string().required('กรุณากรอกชื่อผู้ใช้').matches(/^[a-zA-Z0-9]+$/, 'ชื่อผู้ใช้ควรประกอบด้วยตัวอักษร A-Z, a-z, และตัวเลขเท่านั้น').min(6,'ชื่อผู้ใช้ควรมีมากกว่า 6 ตัวขึ้นไป').max(24,'ชื่อผู้ใช้ควรมีน้อยกว่า 24 ตัว'),
      name: Yup.string().required('กรุณากรอกชื่อและนามสกุล').min(2,'ชื่อและนามสกุลควรมีมากกว่า 2 ตัวขึ้นไป').max(100,'ชื่อและนามสกุลควรมีน้อยกว่า 100 ตัว'),
      email: Yup.string().required('กรุณากรอกอีเมล').email('รูปแบบอีเมลไม่ถูกต้อง').max(100,'อีเมลควรมีรหัสน้อยกว่า 100 ตัว'),
      password: Yup.string().required('กรุณากรอกรหัสผ่าน').min(8, 'รหัสผ่านควรมีอย่างน้อย 8 ตัวขึ้นไป').matches(/^(?=.*[a-zA-Z0-9])(?=.*[@$!%*?&])[a-zA-Z0-9@$!%*?&]+$/,'รหัสผ่านควรมีตัวอักษรพิเศษอย่างน้อย 1 ตัว'),
      confirmpassword: Yup.string().required('กรุณากรอกรหัสผ่าน').oneOf([Yup.ref('password'), null], 'รหัสผ่านไม่ตรงกัน'),
    });

    const register = async ( value ) => {
        try {
            const response = await axios.post('http://localhost:8000/api/auth/register', {
                username: value.username,
                name: value.name,
                email: value.email,
                password: value.password,
                password_confirmation: value.confirmpassword,
            });

            if (response.data.success === '') {
                await Swal.fire({
                icon: 'success',
                title: 'สมัครสมาชิกสำเร็จ',
                text: response.data.message,
            });

            router.push({ name: 'home' });
            } else {
                await Swal.fire({
                icon: 'error',
                title: 'สมัครสมาชิกล้มเหลว',
                text: 'สมัครสมาชิกไม่สำเร็จ',
                });
            }
        } catch (error) {
            console.error('Error:', error);
            await Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาดในการสมัครสมาชิก',
            text: 'มีชื่อผู้ใช้ซ้ำ',
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
  