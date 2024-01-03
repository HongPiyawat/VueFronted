import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { defineRule, ErrorMessage, Field, Form } from 'vee-validate';
import { required, regex } from '@vee-validate/rules';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import Navbar from './components/Navbar.vue';
import router from './routers';

const app = createApp(App);

// ตั้งค่า global property สำหรับ Axios
app.config.globalProperties.$axios = axios;
app.use(VueAxios, axios);

// component Navbar
app.component('Navbar', Navbar);

// ใช้ VeeValidate components ที่นำเข้ามา
app.component('Field', Field);
app.component('Form', Form)
app.component('ErrorMessage', ErrorMessage)

defineRule('required', required);
defineRule('regex', regex);

// ใช้ Vue Router ที่ import มา
app.use(router);

app.use(createPinia());

app.mount('#app');