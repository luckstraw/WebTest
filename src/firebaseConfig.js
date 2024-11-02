// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth'; // Import GoogleAuthProvider
import { getFirestore } from 'firebase/firestore'; // Import Firestore

const firebaseConfig = {
    apiKey: "AIzaSyD6eXMQpGsTwSB8NsgdnWgagxEbwOg3OLs",
    authDomain: "awesome-project-6fa29.firebaseapp.com",
    projectId: "awesome-project-6fa29",
    storageBucket: "awesome-project-6fa29.firebasestorage.app",
    messagingSenderId: "1053864783552",
    appId: "1:1053864783552:web:00f31aeac205435a424725"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider(); // Create a new instance of GoogleAuthProvider

// Initialize Firestore
const db = getFirestore(app); // Initialize Firestore

// Export auth, provider, and db for use in your application
export { auth, provider, db };
