import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import axios from 'axios'

// 建立 app
const app = createApp(App)

// 啟動 Plug-ins
const pinia = createPinia()
app.use(pinia)
app.use(router)

// 這裡才能用 useAuthStore（因為 Pinia 已啟動）
import { useAuthStore } from './stores/auth'
const auth = useAuthStore()

// ====== Axios 全域設定 ======
axios.defaults.baseURL = 'http://localhost:8877/api'
axios.defaults.headers.common['Content-Type'] = 'application/json'

// ====== Request 攔截器：自動帶 token ======
axios.interceptors.request.use((config) => {
    if (auth.token) {
        config.headers.Authorization = `Bearer ${auth.token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

// ====== Response 攔截器（optional，可用來判斷 token 過期） ======
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            auth.logout()
            router.push('/login')
        }
        return Promise.reject(error)
    }
)

// 掛載 App
app.mount('#app')
