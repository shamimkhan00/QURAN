// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRWrxyZm2OePcFTF_rSbwgxwfHcN6Jlyk",
  authDomain: "quran-c4bc3.firebaseapp.com",
  projectId: "quran-c4bc3",
  storageBucket: "quran-c4bc3.appspot.com",  // Fixed `.app` to `.appspot.com  storageBucket: "quran-c4bc3.appspot.com"`
  messagingSenderId: "550017202288",
  appId: "1:550017202288:web:c5bc163418cccf2e9d1cb5",
  measurementId: "G-VGHEVW8VK6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional: Only works in browser (not SSR)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Export Firebase services to use in other parts
export const auth = getAuth(app);
export const db = getFirestore(app);
export { app, analytics };
