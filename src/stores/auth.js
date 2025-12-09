import { defineStore } from "pinia";
import { ref } from "vue"; 
import axios from "axios";

export const useAuthStore = defineStore('auth', () => {
    const user = ref(JSON.parse(localStorage.getItem('user')) || null)
    const token = ref(localStorage.getItem('token')  || null)

    const setAuth = (newUser, newToken) => {
        user.value = newUser
        token.value = newToken
        localStorage.setItem('user', JSON.stringify(newUser))
        localStorage.setItem('token', newToken)

        // ✅ 登入成功自動帶 token
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    }

    const logout = () => {
        user.value = null
        token.value = null
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
    }

    return { user, token, setAuth, logout }
})
