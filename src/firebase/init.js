// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbqcEgrHO6udTeyxfYFUVs7o49z7Gu4m8",
  authDomain: "studio-d0f21.firebaseapp.com",
  projectId: "studio-d0f21",
  storageBucket: "studio-d0f21.firebasestorage.app",
  messagingSenderId: "516656057163",
  appId: "1:516656057163:web:fc77e5011e603edaedb6ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore Database
const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { db, auth };