import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCcBqynJemwt5IU9uoaYvmYeyLLbj_K7QU",
  authDomain: "next-ecommerce-219f6.firebaseapp.com",
  projectId: "next-ecommerce-219f6",
  storageBucket: "next-ecommerce-219f6.appspot.com",
  messagingSenderId: "948698099456",
  appId: "1:948698099456:web:09f47aed9d549622c14de5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);


export { db, auth , app };