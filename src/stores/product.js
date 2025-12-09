import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useProductStore = defineStore('product', () => {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)

  const currentPage = ref(1)
  const lastPage = ref(1)

  // 取得商品列表
  const fetchProducts = async (page = 1) => {
    loading.value = true
    error.value = null
    try {
      const res = await axios.get(`/products?page=${page}`)

      products.value = res.data.data.data   
      currentPage.value = res.data.data.current_page
      lastPage.value = res.data.data.last_page

    } catch (err) {
      error.value = '無法取得商品列表'
    } finally {
      loading.value = false
    }
  }

  return { products, loading, error, fetchProducts, currentPage, lastPage }
})
