<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <button @click="loginWithGoogle">Login with Google</button>
    <p @click="toggleForm">Doesn't have an account? Sign up</p>
  </div>
</template>

<script>
import { auth, provider } from '../firebaseConfig';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.$router.push(this.email === 'admin@example.com' ? '/admin' : '/user');
      } catch (error) {
        if (error.code === 'auth/user-not-found') {
          alert('Account does not exist. Please check your credentials or sign up.');
        } else {
          alert(error.message);
        }
        console.error(error);
      }
    },
    async loginWithGoogle() {
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        this.$router.push(user.email === 'admin@example.com' ? '/admin' : '/user');
      } catch (error) {
        alert(error.message);
        console.error(error);
      }
    },
    toggleForm() {
      this.$emit('toggle');
    }
  }
};
</script>
