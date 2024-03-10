// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVxULIZUPFuaNPIoNvgJgl-Y4mTi4W1pU", //import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "your-future-property.firebaseapp.com",
  projectId: "your-future-property",
  storageBucket: "your-future-property.appspot.com",
  messagingSenderId: "64253758867",
  appId: "1:64253758867:web:c101ecf59125fb0b872c66"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);