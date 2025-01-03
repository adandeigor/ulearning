// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdg5XHyHEpnDl8u7GRrM25MXEAzkUufiM",
  authDomain: "selft-tutor.firebaseapp.com",
  projectId: "selft-tutor",
  storageBucket: "selft-tutor.firebasestorage.app",
  messagingSenderId: "903322645491",
  appId: "1:903322645491:web:3d34acb83efe2b3470d886"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {app, db}