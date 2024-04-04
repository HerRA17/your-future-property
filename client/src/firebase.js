// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "future-estate-51846.firebaseapp.com",
  projectId: "future-estate-51846",
  storageBucket: "future-estate-51846.appspot.com",
  messagingSenderId: "137141965176",
  appId: "1:137141965176:web:0cf657a09fe351eff5388d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);