<template>
  <div class="container mx-auto p-4">
    <!-- 返回列表按鈕 -->
    <button
      class="mb-6 px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
      @click="goBack"
    >
      ← 回商品列表
    </button>

    <div v-if="loading" class="text-gray-500 text-center py-10">商品資料讀取中...</div>
    <div v-else-if="error" class="text-red-500 text-center py-10">{{ error }}</div>

    <div v-else class="flex flex-col md:flex-row gap-6">
      <!-- 輪播圖片 -->
      <div class="md:w-1/2">
        <div class="relative w-full h-96 overflow-hidden rounded-2xl shadow">
          <img
            v-for="(img, idx) in product.images"
            :key="idx"
            :src="img"
            alt="商品圖片"
            class="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500"
            :class="{ 'opacity-0': idx !== currentImageIndex, 'opacity-100': idx === currentImageIndex }"
          />
        </div>
        <!-- 輪播控制 -->
        <div class="flex justify-center gap-2 mt-2">
          <span
            v-for="(img, idx) in product.images"
            :key="idx"
            class="w-3 h-3 rounded-full cursor-pointer"
            :class="idx === currentImageIndex ? 'bg-blue-600' : 'bg-gray-300'"
            @click="currentImageIndex = idx"
          ></span>
        </div>
      </div>

      <!-- 商品資訊 -->
      <div class="flex-1 flex flex-col justify-between p-4 md:p-6 bg-white rounded-2xl shadow">
        <div>
          <h1 class="text-4xl font-extrabold mb-4 text-gray-900">{{ product.name }}</h1>
          <p class="text-gray-700 text-lg leading-relaxed mb-6">{{ product.description }}</p>
        </div>

        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p class="text-green-600 font-bold text-3xl mb-1">NT$ {{ product.price }}</p>
            <p class="text-gray-500">庫存：{{ product.stock }}</p>
          </div>
          <button
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition"
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>

    <!-- 相似商品 -->
    <div class="mt-10">
      <h2 class="text-2xl font-bold mb-4">你可能也喜歡</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div
          v-for="item in similarProducts"
          :key="item.id"
          class="border rounded-lg p-3 shadow hover:shadow-lg cursor-pointer transition"
          @click="goToProduct(item.id)"
        >
          <img :src="item.image_url" alt="商品圖片" class="w-full h-40 object-cover rounded mb-2">
          <h3 class="text-lg font-semibold">{{ item.name }}</h3>
          <p class="text-green-600 font-bold">NT$ {{ item.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const product = ref({ images: [] })
const similarProducts = ref([])
const loading = ref(false)
const error = ref(null)
const currentImageIndex = ref(0)

const productId = route.params.id

// 載入商品資料
const fetchProduct = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await axios.get(`/products/${productId}`)
    product.value = res.data.data
    // 模擬多張圖片
    product.value.images = [
      product.value.image_url,
      'https://picsum.photos/400/300?random=101',
      'https://picsum.photos/400/300?random=102'
    ]
  } catch (err) {
    error.value = '無法取得商品資料'
  } finally {
    loading.value = false
  }
}

// 載入相似商品（隨機模擬）
const fetchSimilarProducts = async () => {
  try {
    const res = await axios.get('/products')
    similarProducts.value = res.data.data.data
      .filter(p => p.id !== Number(productId))
      .slice(0, 4)
  } catch (err) {
    console.log('無法取得相似商品')
  }
}

onMounted(() => {
  fetchProduct()
  fetchSimilarProducts()
})

const goBack = () => router.back()
const goToProduct = (id) => router.push(`/ProductList/${id}`)
</script>
