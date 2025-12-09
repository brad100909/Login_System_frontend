<template>
  <div class="flex min-h-screen bg-gray-100">
    
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-lg p-6 relative">
      <h2 class="text-xl font-bold mb-6">後台管理</h2>
      <nav class="space-y-3">
        <RouterLink to="/admin" class="block hover:text-blue-600">儀表板</RouterLink>
        <RouterLink to="/admin/products" class="block hover:text-blue-600">商品管理</RouterLink>
      </nav>

      <!-- 登出按鈕，固定在右上角 -->
      <button 
        @click="logout"
        class="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        登出
      </button>
    </aside>

    <!-- Content -->
    <main class="flex-1 p-8">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.js'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push('/login') // 登出後導向登入頁
}
</script>
