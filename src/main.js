import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import axios from 'axios'

import { useAuthStore } from './stores/auth'

axios.defaults.baseURL = 'http://localhost:8877/api' // 設定你的後端 API 基本 URL
axios.defaults.headers.common['Content-Type'] = 'application/json'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')