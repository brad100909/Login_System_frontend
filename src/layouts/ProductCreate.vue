<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">新增商品</h1>

    <form @submit.prevent="submitProduct" class="space-y-4">
      <input v-model="form.name" placeholder="商品名稱" required class="border p-2 w-full rounded" />
      <textarea v-model="form.description" placeholder="商品描述" class="border p-2 w-full rounded"></textarea>
      <input v-model.number="form.price" type="number" placeholder="價格" required class="border p-2 w-full rounded" />
      <input v-model.number="form.stock" type="number" placeholder="庫存" required class="border p-2 w-full rounded" />
      <input v-model="form.image_url" placeholder="圖片 URL" class="border p-2 w-full rounded" />
      <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">新增</button>
    </form>

    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
    <p v-if="success" class="text-green-500 mt-2">新增成功！</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const form = ref({
  name: '',
  description: '',
  price: 0,
  stock: 0,
  image_url: ''
})

const error = ref('')
const success = ref(false)

const submitProduct = async () => {
  error.value = ''
  success.value = false

  try {
    const res = await axios.post(
      'http://localhost:8877/api/admin/products',
      form.value,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
      }
    )
    console.log(res.data)
    success.value = true
    // 可選：清空表單
    form.value = { name: '', description: '', price: 0, stock: 0, image_url: '' }
  } catch (err) {
    console.error(err.response || err)
    error.value = err.response?.data?.message || '新增商品失敗'
  }
}
</script>
