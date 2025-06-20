// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNQ2zXDnyhCrUizGqqYZmcSflA_2IGtlM",
  authDomain: "dukatech-26b9c.firebaseapp.com",
  projectId: "dukatech-26b9c",
  storageBucket: "dukatech-26b9c.firebasestorage.app",
  messagingSenderId: "962873306746",
  appId: "1:962873306746:web:5b7eb10b3ccc528d4755c3",
  measurementId: "G-SWP79NDJF9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);