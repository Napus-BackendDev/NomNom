// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBi6FpmHlJxvs38bG9x6BIz-1l2Gw2BZng",
  authDomain: "nomnom-cad49.firebaseapp.com",
  projectId: "nomnom-cad49",
  storageBucket: "nomnom-cad49.firebasestorage.app",
  messagingSenderId: "1000393895432",
  appId: "1:1000393895432:web:638afa03dc956ec39b2bbd",
  measurementId: "G-4MNH1YY0X6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);