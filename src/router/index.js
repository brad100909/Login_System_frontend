import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

// 前端頁面
import LoginPage from '../views/LoginView.vue'
import RegisterPage from '../views/RegisterView.vue'
import ProductDetail from '@/views/ProductDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/productlist',
    name: 'ProductList',
    component: () => import('@/views/ProductList.vue'),
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail
  },

  // 後台路由
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: { requiresAuth: true }, // ✅ 保護整個後台
    children: [
      { path: '', component: () => import('@/layouts/AdminDashboard.vue') },
      { path: 'products', component: () => import('@/layouts/AdminProducts.vue') },
      { path: 'products/create', component: () => import('@/layouts/ProductCreate.vue') },
      { path: 'products/:id/edit', component: () => import('@/layouts/ProductEdit.vue') },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局路由守衛
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  // 後台頁面需要登入
  if (to.meta.requiresAuth && !auth.token) {
    return next('/login')
  }

  // 如果已登入，去 /login 或 /register → 自動跳轉到 /admin
  if ((to.path === '/login' || to.path === '/register') && auth.token) {
    return next('/admin')
  }

  next()
})

export default router
