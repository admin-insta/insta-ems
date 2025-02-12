//Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6B0I3rOvc6-MuAi2tZSnaDXtt8GYeeZw",
  authDomain: "instaems-d750f.firebaseapp.com",
  projectId: "instaems-d750f",
  storageBucket: "instaems-d750f.firebasestorage.app",
  messagingSenderId: "789084855521",
  appId: "1:789084855521:web:3b059392234499a764eba0",
  measurementId: "G-RLNFPBQRE9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);