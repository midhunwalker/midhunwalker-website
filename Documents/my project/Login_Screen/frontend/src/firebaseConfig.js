
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyDfYJRJreZegNluHXnX1W5rCktScaklmfM",
  authDomain: "admin-login-project.firebaseapp.com",
  projectId: "admin-login-project",
  storageBucket: "admin-login-project.appspot.com",
  messagingSenderId: "123134074071",
  appId: "1:123134074071:web:a50ef2173ec7a662c2e492",
  measurementId: "G-CDKMKPWGDZ"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
