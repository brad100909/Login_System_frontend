<template>
    <h2>使用者資料</h2>
    <button @click="getUser">取得使用者資料</button>
    <pre>{{ user }}</pre>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

const user = ref(null);

async function getUser(params) {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8877/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        user.value = response.data;
    }
    catch (err) {
        alert('登入失敗或token取得失敗');
        console.error(err);
    }
}

</script>