import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJS9cVXqdxjgt82KQ2zzvp8ZiMlFYMLo4",
  authDomain: "slackchatapp-a4bab.firebaseapp.com",
  projectId: "slackchatapp-a4bab",
  storageBucket: "slackchatapp-a4bab.appspot.com",
  messagingSenderId: "1038962217086",
  appId: "1:1038962217086:web:dc726ca5dc90774139082f",
  measurementId: "G-JMEP5CXK8T",
};

const app = initializeApp(firebaseConfig);
//
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const signWithEmailAndPassword = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);
export const createUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);
export default app;
