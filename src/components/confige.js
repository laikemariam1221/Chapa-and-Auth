import "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDdLjBIPuwug3poogOUlW1dWIForCbceOw",
  authDomain: "add-project-3e561.firebaseapp.com",
  databaseURL: "https://add-project-3e561-default-rtdb.firebaseio.com",
  projectId: "add-project-3e561",
  storageBucket: "add-project-3e561.appspot.com",
  messagingSenderId: "746441791015",
  appId: "1:746441791015:web:820ba8d6df69a17c186002",
  measurementId: "G-3V21270SBX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app}