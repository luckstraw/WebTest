<template>
  <div>
    <h1>Admin Page</h1>
    
    <h2>Current Questions</h2>
    <ul>
      <li v-for="question in questions" :key="question.id">
        {{ question.questionText }}
        <button @click="deleteQuestion(question.id)">Delete</button>
      </li>
    </ul>

    <input type="text" v-model="newQuestion" placeholder="Add a new question" />
    <button @click="addQuestion">Add Question</button>
    
    <h2>Users</h2>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.email }}
        <h3>Answers:</h3>
        <ul>
          <li v-for="(answer, questionId) in userAnswers[user.id]" :key="questionId">
            {{ answer.answer }}
          </li>
        </ul>
      </li>
    </ul>

    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { auth, db } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, deleteDoc, doc, query, where, getDoc } from 'firebase/firestore';

export default {
  data() {
    return {
      users: [],
      questions: [],
      userAnswers: {},
      newQuestion: ''
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        this.users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Fetched Users:", this.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    
    async fetchUserAnswers() {
      try {
        for (const user of this.users) {
          const answersSnapshot = await getDocs(collection(db, `users/${user.id}/answers`));
          this.userAnswers[user.id] = answersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          console.log(`Answers for ${user.email}:`, this.userAnswers[user.id]);
        }
      } catch (error) {
        console.error("Error fetching user answers:", error);
      }
    },

    async fetchQuestions() {
      try {
        const querySnapshot = await getDocs(collection(db, 'questions'));
        this.questions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Fetched Questions:", this.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    },

    async addQuestion() {
      if (this.newQuestion.trim() !== '') {
        try {
          await addDoc(collection(db, 'questions'), {
            questionText: this.newQuestion,
            timestamp: new Date()
          });
          this.newQuestion = ''; // Clear input field after adding
          this.clearUserAnswers(); // Clear user answers when adding a new question
          this.fetchQuestions(); // Refresh the questions list
        } catch (error) {
          console.error("Error adding question:", error);
        }
      }
    },

    async deleteQuestion(questionId) {
      try {
        await deleteDoc(doc(db, 'questions', questionId));
        this.clearUserAnswers(); // Clear user answers when deleting a question
        this.fetchQuestions(); // Refresh the questions list
      } catch (error) {
        console.error("Error deleting question:", error);
      }
    },

    async clearUserAnswers() {
      try {
        for (const user of this.users) {
          const answersSnapshot = await getDocs(collection(db, `users/${user.id}/answers`));
          for (const answerDoc of answersSnapshot.docs) {
            await deleteDoc(answerDoc.ref);
          }
        }
        console.log("User answers cleared.");
      } catch (error) {
        console.error("Error clearing user answers:", error);
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
    this.fetchUsers().then(() => {
      this.fetchUserAnswers();
    });
    this.fetchQuestions();
  }
};
</script>

<style>
/* Add styles as needed */
</style>
