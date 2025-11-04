// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpqJ9_ERMtXUrS5yf8fUEKgf3H9CyxXhA",
  authDomain: "textspeeder.firebaseapp.com",
  projectId: "textspeeder",
  storageBucket: "textspeeder.appspot.com",
  messagingSenderId: "709996309097",
  appId: "1:709996309097:web:59b3f5c5e66ccaf26390f8"
};

// ✅ Initialize Firebase first
const app = initializeApp(firebaseConfig);

// ✅ Then initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

// ✅ Export everything you’ll need in other files
export { app, db, auth };
