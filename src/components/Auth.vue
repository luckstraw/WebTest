<template>
    <div>
      <component :is="isLogin ? 'Login' : 'Signup'" @toggle="toggleForm" />
    </div>
  </template>
  
  <script>
  import Login from './Login.vue';
  import Signup from './Signup.vue';
  
  export default {
    name:'Auth',
    components: {
      Login,
      Signup
    },
    data() {
      return {
        isLogin: true
      };
    },
    methods: {
      toggleForm() {
        this.isLogin = !this.isLogin;
      }
    }
  };
  </script>
  