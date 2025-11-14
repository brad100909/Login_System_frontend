<template>
  <div class="login_page">
    <h1>登入</h1>
    <form @submit.prevent="login">
      <input v-model="email" placeholder="Email" type="email" required />
      <input v-model="password" placeholder="密碼" type="password" required />
      <button type="submit">登入</button>
    </form>
  </div>

  <p v-if="error" style="color:red;">{{ error }}</p>
  <p v-if="authStore.user">歡迎回來，{{ authStore.user.name }}</p>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const email = ref('');
const password = ref('');
const error = ref('');

const authStore = useAuthStore();

const login = async () => {
  try {
    const response = await axios.post('http://localhost:8877/api/login', {
      email: email.value,
      password: password.value
    });

    // ✅ 使用 store 的 setAuth() 更新 user 和 token
    authStore.setAuth(response.data.user, response.data.token);

    error.value = '';
  } catch (err) {
    error.value = '登入失敗，請檢查您的帳號密碼';

    // ✅ 登入失敗也可以呼叫 store 的 logout() 清空狀態
    authStore.logout();
  }
};
</script>
