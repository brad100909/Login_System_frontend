<template>
  <div class="max-w-2xl mx-auto bg-white p-8 shadow rounded">
    <h1 class="text-2xl font-bold mb-6">編輯商品</h1>

    <form @submit.prevent="updateProduct">

      <div class="mb-4">
        <label class="block mb-1 font-medium">商品名稱</label>
        <input v-model="form.name" type="text" class="w-full border rounded p-2" required>
      </div>

      <div class="mb-4">
        <label class="block mb-1 font-medium">商品描述</label>
        <textarea v-model="form.description" class="w-full border rounded p-2" rows="3"></textarea>
      </div>

      <div class="mb-4">
        <label class="block mb-1 font-medium">價格（NT$）</label>
        <input v-model.number="form.price" type="number" class="w-full border rounded p-2" required min="0">
      </div>

      <div class="mb-4">
        <label class="block mb-1 font-medium">庫存</label>
        <input v-model.number="form.stock" type="number" class="w-full border rounded p-2" min="0" required>
      </div>

      <div class="mb-4">
        <label class="block mb-1 font-medium">商品圖片 URL</label>
        <input v-model="form.image_url" type="text" class="w-full border rounded p-2">
      </div>

      <div v-if="form.image_url" class="mb-4">
        <label class="block mb-1 font-medium">圖片預覽</label>
        <img :src="form.image_url" class="w-40 rounded shadow">
      </div>

      <button type="submit"
        class="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700">
        儲存修改
      </button>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import { reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const form = reactive({
  name: "",
  description: "",
  price: 0,
  stock: 0,
  image_url: ""
});

onMounted(() => {
  axios.get(`/api/admin/products/${id}`).then(res => {
    Object.assign(form, res.data.data);
  });
});

function updateProduct() {
  axios.put(`/api/admin/products/${id}`, form).then(() => {
    alert("修改成功");
    router.push("/admin/products");
  });
}
</script>
