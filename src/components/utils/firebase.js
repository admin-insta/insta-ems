// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDQFYtyKq30enSJdpD9B8jUzN1el6tqy0",
  authDomain: "instaems-188b5.firebaseapp.com",
  projectId: "instaems-188b5",
  storageBucket: "instaems-188b5.firebasestorage.app",
  messagingSenderId: "1099282752819",
  appId: "1:1099282752819:web:c7cacc4092317a3d660a46",
  measurementId: "G-WFVY3G3G7S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();