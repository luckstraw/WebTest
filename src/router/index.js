import { createRouter, createWebHistory } from 'vue-router';
import Auth from '@/components/Auth.vue';        // Updated path
import AdminPage from '@/views/AdminPage.vue'; // Updated path
import UserPage from '@/views/UserPage.vue';   // Updated path

const routes = [
  { path: '/', component: Auth },
  { path: '/admin', component: AdminPage },
  { path: '/user', component: UserPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
