<template>
    <div>
      <h1>User Page</h1>
      <p>Email: {{ userEmail }}</p>
      
      <h2>Submit Your Answers</h2>
      <div v-for="question in questions" :key="question.id">
        <h3>{{ question.questionText }}</h3>
        <input v-model="answers[question.id]" placeholder="Your answer here" />
      </div>
      
      <button @click="submitAnswers">Submit Answers</button>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script>
  import { auth, db } from '../firebaseConfig';
  import { signOut } from 'firebase/auth';
  import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
  
  export default {
    data() {
      return {
        userEmail: '',
        questions: [],
        answers: {}
      };
    },
    methods: {
      async fetchUserEmail() {
        const user = auth.currentUser;
        if (user) {
          this.userEmail = user.email;
  
          // Save the user's email in Firestore
          await setDoc(doc(db, 'users', user.uid), {
            email: this.userEmail
          });
        }
      },
      
      async fetchQuestions() {
        try {
          const querySnapshot = await getDocs(collection(db, 'questions'));
          this.questions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
          console.error("Error fetching questions:", error);
        }
      },
  
      async submitAnswers() {
        const userId = auth.currentUser.uid;
        const userAnswersRef = collection(db, `users/${userId}/answers`);
  
        try {
          for (const questionId in this.answers) {
            await setDoc(doc(userAnswersRef, questionId), { answer: this.answers[questionId] });
          }
          alert('Answers submitted!');
        } catch (error) {
          console.error("Error submitting answers:", error);
        }
      },
  
      async logout() {
        try {
          await signOut(auth);
          this.$router.push('/');
        } catch (error) {
          console.error("Error logging out:", error);
        }
      }
    },
    mounted() {
      this.fetchUserEmail();
      this.fetchQuestions();
    }
  };
  </script>
  
  <style>
  /* Add styles as needed */
  </style>
  