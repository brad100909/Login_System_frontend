<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">商品管理</h1>
      <RouterLink to="/admin/products/create"
        class="bg-blue-600 text-white px-4 py-2 rounded shadow">
        ＋ 新增商品
      </RouterLink>
    </div>

    <table class="w-full bg-white shadow rounded">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-3 text-left">ID</th>
          <th class="p-3 text-left">名稱</th>
          <th class="p-3 text-left">庫存</th>
          <th class="p-3 text-left">價格</th>
          <th class="p-3 text-left">操作</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="p in products" :key="p.id" class="border-t">
          <td class="p-3">{{ p.id }}</td>
          <td class="p-3">{{ p.name }}</td>
          <td class="p-3">{{ p.stock }}</td>
          <td class="p-3">{{ p.price }}</td>
          <td class="p-3">
            <RouterLink :to="`/admin/products/${p.id}/edit`"
              class="text-blue-600 mr-3">編輯</RouterLink>

            <button @click="deleteProduct(p.id)"
              class="text-red-600">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 分頁按鈕 -->
    <div class="flex justify-center items-center gap-2 mt-6">
      <button
        class="px-3 py-1 rounded border disabled:opacity-50"
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
      >
        上一頁
      </button>

      <button
        v-for="page in pageNumbers"
        :key="page"
        @click="changePage(page)"
        class="px-3 py-1 rounded border"
        :class="page === currentPage ? 'bg-blue-600 text-white' : ''"
      >
        {{ page }}
      </button>

      <button
        class="px-3 py-1 rounded border disabled:opacity-50"
        :disabled="currentPage === lastPage"
        @click="changePage(currentPage + 1)"
      >
        下一頁
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const products = ref([]);
const currentPage = ref(1);
const lastPage = ref(1);

onMounted(() => {
  loadProducts(1);
});

function loadProducts(page = 1) {
  axios.get(`/admin/products?page=${page}`, {
    headers: {
      Authorization: `Bearer ${authStore.token}`
    }
  }).then(res => {
    products.value = res.data.data.data; // Laravel paginate: data.data
    currentPage.value = res.data.data.current_page;
    lastPage.value = res.data.data.last_page;
  }).catch(err => {
    console.error('抓取商品列表失敗', err);
  });
}

function deleteProduct(id) {
  if (!confirm('確定刪除?')) return;

  axios.delete(`/admin/products/${id}`, {
    headers: {
      Authorization: `Bearer ${authStore.token}`
    }
  }).then(() => {
    loadProducts(currentPage.value);
  }).catch(err => {
    console.error('刪除失敗', err);
  });
}

function changePage(page) {
  if (!page || page < 1 || page > lastPage.value) return;
  loadProducts(page);
}

// 計算要顯示的頁碼陣列（最多顯示 5 個按鈕）
const pageNumbers = computed(() => {
  const maxButtons = 5;
  let start = Math.max(currentPage.value - Math.floor(maxButtons / 2), 1);
  let end = start + maxButtons - 1;
  if (end > lastPage.value) {
    end = lastPage.value;
    start = Math.max(end - maxButtons + 1, 1);
  }
  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
});
</script>
