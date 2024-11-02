<template>
  <div>
    <h2>Sign Up</h2>
    <form @submit.prevent="signUpWithEmail">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
    <p @click="toggleForm">Already have an account? Login</p>
  </div>
</template>

<script>
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async signUpWithEmail() {
      if (!this.email || !this.password) {
          alert('Please enter both email and password.');
          return;
      }

      try {
          const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
          const userId = userCredential.user.uid;

          // Save the user's email in Firestore
          await setDoc(doc(db, 'users', userId), {
              email: this.email
          });

          this.$router.push('/user'); // Redirect to user page after sign-up
      } catch (error) {
          console.error(error);
          if (error.code === 'auth/email-already-in-use') {
              alert('This email is already in use. Please choose another one.');
          } else {
              alert('Failed to sign up: ' + error.message);
          }
      }
    },

    toggleForm() {
      this.$emit('toggle');
    }
  }
};
</script>

<style>
/* Add your styles here */
</style>
