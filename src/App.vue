<!-- <template>
  <div>
    <RegisterForm />
    <LoginForm />
    <UserInfo />
  </div>
</template>

<script setup>
  import RegisterForm from './components/RegisterForm.vue'
  import LoginForm from './components/LoginForm.vue'
  import UserInfo from './components/UserInfo.vue'
</script> -->

<template>
  <div id="app">
    <router-view />   <!-- 這裡會顯示對應 LoginView -->
  </div>
</template>

<script setup>
</script>
