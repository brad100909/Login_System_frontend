<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">後台儀表板</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- 商品總數 -->
      <div class="p-6 bg-white shadow rounded">
        <h3 class="text-lg font-semibold">商品數量</h3>
        <p class="text-3xl font-bold mt-3">{{ productCount }}</p>
      </div>

      <!-- 今日訪客 -->
      <div class="p-6 bg-white shadow rounded">
        <h3 class="text-lg font-semibold">今日訪客</h3>
        <p class="text-3xl font-bold mt-3">{{ todayVisitors }}</p>
      </div>

      <!-- 總訂單數 -->
      <div class="p-6 bg-white shadow rounded">
        <h3 class="text-lg font-semibold">總訂單</h3>
        <p class="text-3xl font-bold mt-3">{{ totalOrders }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

// 動態數據
const productCount = ref(0);
const totalOrders = ref(0);
const todayVisitors = ref(123); // 暫時示範數字，可改成 API

// 取得商品總數
const fetchProductCount = async () => {
  try {
    const res = await axios.get('http://localhost:8877/api/admin/products', {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    });

    // Laravel 分頁回傳 total 屬性
    productCount.value = res.data.data.total || res.data.data.length;
  } catch (err) {
    console.error('抓取商品數量失敗', err);
  }
};

// 取得訂單總數（範例，如果你有訂單 API 再改成真實）
const fetchTotalOrders = async () => {
  try {
    // const res = await axios.get('http://localhost:8877/api/admin/orders', {
    //   headers: { Authorization: `Bearer ${authStore.token}` }
    // });
    // totalOrders.value = res.data.data.total;
    
    totalOrders.value = 0; // 暫時示範
  } catch (err) {
    console.error('抓取訂單數量失敗', err);
  }
};

onMounted(() => {
  fetchProductCount();
  fetchTotalOrders();
});
</script>
