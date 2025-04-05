// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDK6w649PwzQwKbiFszfqEvW6uEBOXRlXA",
  authDomain: "vite-contact-app-64034.firebaseapp.com",
  projectId: "vite-contact-app-64034",
  storageBucket: "vite-contact-app-64034.firebasestorage.app",
  messagingSenderId: "140731112849",
  appId: "1:140731112849:web:e505d0708e353324f0ce30"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)