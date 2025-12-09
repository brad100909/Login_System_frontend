<template>
  <Swiper
    :modules="[Navigation, Pagination, Autoplay]"
    :space-between="30"
    :slides-per-view="1"
    navigation
    pagination
    loop
    :autoplay="{ delay: 2000, disableOnInteraction: false }"
    class="swiper-demo"
  >
    <SwiperSlide v-for="(img, index) in images" :key="index">
      <div class="ratio-box">
        <img :src="img" alt="" class="slide-img">
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

// 匯入 Swiper 樣式
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import img1 from '../assets/b1.jpg'
import img2 from '../assets/b2.png'
import img3 from '../assets/b3.png'
import img4 from '../assets/b4.jpg'
import img5 from '../assets/b5.jpg'

const images = [img1, img2, img3, img4, img5]
</script>

<style scoped>
.swiper-demo {
  width: 600px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0,0,0,0.3);
}

/* 固定比例盒子 (16:9) */
.ratio-box {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 = 9/16 = 0.5625 */
  overflow: hidden;
  border-radius: 10px;
}

/* 圖片鋪滿比例盒子 */
.ratio-box img.slide-img {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* 填滿，可能裁切 */
  display: block;
}
</style>
