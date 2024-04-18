import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDf54qlpB9j4GvPBZXWyVKsLpV17gzxLNk",
  authDomain: "chatting-a1f8b.firebaseapp.com",
  projectId: "chatting-a1f8b",
  storageBucket: "chatting-a1f8b.appspot.com",
  messagingSenderId: "796616317361",
  appId: "1:796616317361:web:7d8cd6094f0ceea9a34590"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore() 


