import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD4sxt5TFmjlAV4O291dqx74XzWa3nr-VA",
  authDomain: "foru-3392f.firebaseapp.com",
  databaseURL: "https://foru-3392f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "foru-3392f",
  storageBucket: "foru-3392f.appspot.com",
  messagingSenderId: "549223444073",
  appId: "1:549223444073:web:a60848f1ba5a528c643cf8"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);