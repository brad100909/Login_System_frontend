<template>
  <div>
    <h2>註冊</h2>
    <input v-model="name" placeholder="名稱" />
    <input v-model="email" placeholder="Email" />
    <input v-model="password" placeholder="密碼" type="password" />
    <button @click="register">註冊</button>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')

async function register() {
  try {
    const res = await axios.post('/register', {
      name: name.value,
      email: email.value,
      password: password.value,
    })
    alert('註冊成功！')
    console.log(res.data)
  } catch (err) {
    alert('註冊失敗')
    console.error(err)
  }
}
</script>
