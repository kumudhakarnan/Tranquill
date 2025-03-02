import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAIWjHjKJ1mjz5Zv6ZVLHJxL7HckzJIFb4",
  authDomain: "tranquil-a28af.firebaseapp.com",
  projectId: "tranquil-a28af",
  storageBucket: "tranquil-a28af.appspot.com",
  messagingSenderId: "822396743477",
  appId: "1:822396743477:web:1ea96bb9f4aaa279b4a67c",
};

// Initialize Firebase only if it's not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Get Auth instance (No need for persistence in Firebase 11)
const auth = getAuth(app);

export default auth;
