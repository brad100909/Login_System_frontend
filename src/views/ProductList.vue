<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">商品列表</h1>
    
    <p v-if="productStore.loading">商品資料讀取中</p>
    <p v-if="productStore.error" class="text-red-500">{{ productStore.error }}</p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="product in productStore.products"
        :key="product.id"
        class="border rounded p-4 shadow cursor-pointer hover:shadow-lg transition"
        @click="goDetail(product.id)"
      >
        <img
          :src="product.image_url"
          alt="圖片加載失敗"
          class="w-full h-48 object-cover mb-2 rounded"
        />
        <h2 class="text-xl font-semibold">{{ product.name }}</h2>
        <p class="text-gray-600">{{ product.description }}</p>
        <p class="text-green-600 font-bold mt-2">NT$ {{ product.price }}</p>

        <!-- 🟢 付款按鈕 -->
        <button
          @click="pay(product.id, product.price)"
          class="bg-green-600 text-white px-4 py-2 rounded mt-3"
        >
          立即付款
        </button>
      </div>
    </div>

    <!-- 分頁按鈕 -->
    <div class="flex justify-center items-center gap-2 mt-6">
      <button
        class="px-3 py-1 rounded border disabled:opacity-50"
        :disabled="productStore.currentPage === 1"
        @click="changePage(productStore.currentPage - 1)"
      >
        上一頁
      </button>

      <button
        v-for="page in pageNumbers"
        :key="page"
        @click="changePage(page)"
        class="px-3 py-1 rounded border"
        :class="{
          'bg-blue-500 text-white': productStore.currentPage === page,
          'bg-white text-black': productStore.currentPage !== page
        }"
      >
        {{ page }}
      </button>

      <button
        class="px-3 py-1 rounded border disabled:opacity-50"
        :disabled="productStore.currentPage === productStore.lastPage"
        @click="changePage(productStore.currentPage + 1)"
      >
        下一頁
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import axios from 'axios'
import { useProductStore } from '@/stores/product'
import { useRouter } from 'vue-router'

const router = useRouter()
const productStore = useProductStore()

// 取得商品列表
onMounted(() => {
  productStore.fetchProducts(1)
})

// 分頁
const changePage = (page) => {
  if (!page || page < 1 || page > productStore.lastPage) return
  productStore.fetchProducts(page)
}

// 頁碼計算
const pageNumbers = computed(() => {
  const total = productStore.lastPage || 1
  const current = productStore.currentPage || 1
  const maxButtons = 5

  let start = Math.max(current - Math.floor(maxButtons / 2), 1)
  let end = start + maxButtons - 1

  if (end > total) {
    end = total
    start = Math.max(end - maxButtons + 1, 1)
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

// 跳商品詳情
const goDetail = (id) => {
  router.push(`/product/${id}`)
}



const pay = async (productId, amount) => {
    try {
        const res = await axios.post('/payment/checkout', { amount })
        // 直接用 document.write 跳轉到綠界付款頁
        document.write(res.data)
    } catch (err) {
        console.error('付款失敗：', err)
        alert('付款失敗，請查看 console')
    }
}
</script>
