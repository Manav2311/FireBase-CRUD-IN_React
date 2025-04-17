// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_KcHCSBcF1yiMp9DrilzuIiMG3nIcxm0",
  authDomain: "fir-94adf.firebaseapp.com",
  projectId: "fir-94adf",
  storageBucket: "fir-94adf.firebasestorage.app",
  messagingSenderId: "255602897434",
  appId: "1:255602897434:web:b1ad5e4a2d92ceb56717a3"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const getDb=getFirestore(app);
