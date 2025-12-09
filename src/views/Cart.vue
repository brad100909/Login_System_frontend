<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">🛒 我的購物車</h2>

    <!-- 如果購物車是空的 -->
    <div v-if="store.cart.length === 0" class="text-gray-500">
      購物車目前是空的
    </div>

    <!-- 購物車清單 -->
    <div v-else class="space-y-4">
      <div
        v-for="item in store.cart"
        :key="item.id"
        class="flex items-center justify-between bg-white p-4 rounded-lg shadow"
      >
        <div class="flex items-center gap-4">
          <img :src="item.image" alt="商品圖片" class="w-16 h-16 object-cover rounded" />
          <div>
            <h3 class="font-semibold">{{ item.name }}</h3>
            <p class="text-gray-600">特價: {{ item.discountedPrice }} 元</p>
          </div>
        </div>
        <button
          @click="store.removeFromCart(item.id)"
          class="text-red-500 font-semibold hover:text-red-700"
        >
          移除
        </button>
      </div>
    </div>

    <!-- 總金額 -->
    <div v-if="store.cart.length > 0" class="mt-6 text-right text-xl font-bold">
      總金額: {{ totalPrice }} 元
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useMenuStore } from "../stores/menuStore";

const store = useMenuStore();

// 計算購物車總金額
const totalPrice = computed(() =>
  store.cart.reduce((sum, item) => sum + item.discountedPrice, 0)
);
</script>
