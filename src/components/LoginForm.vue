<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h1 class="text-3xl font-bold text-center text-blue-600 mb-6">後台登入</h1>

      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label class="block mb-1">Email</label>
          <input 
            v-model="email" 
            type="email" 
            placeholder="請輸入 Email" 
            required 
            class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label class="block mb-1">密碼</label>
          <input 
            v-model="password" 
            type="password" 
            placeholder="請輸入密碼" 
            required 
            class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button 
          type="submit" 
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          登入
        </button>
      </form>

      <p v-if="error" class="mt-4 text-red-500 text-center">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref('');

const authStore = useAuthStore();
const router = useRouter();

const login = async () => {
  try {
    const response = await axios.post('http://localhost:8877/api/login', {
      email: email.value,
      password: password.value
    });

    // 更新 store
    authStore.setAuth(response.data.user, response.data.token);

    error.value = '';

    // 登入成功自動跳轉到後台首頁
    router.push('/admin');
  } catch (err) {
    error.value = '登入失敗，請檢查您的帳號密碼';
    authStore.logout();
  }
};
</script>
