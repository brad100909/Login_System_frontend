import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginView.vue'
import RegisterPage from '../views/RegisterView.vue'
import { useAuthStore } from '../stores/auth.js'
// 如果你有其他頁面也可以 import

const routes = [
  {
    path: '/login',    // 訪問網址
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.token) {
    return next('/login')
  }

  next()
})

export default router
