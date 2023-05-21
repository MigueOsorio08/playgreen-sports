import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from "firebase/database";


export const firebaseConfig = {
  apiKey: "AIzaSyCuPySqyE0-c7o9_gSPJa3y5hyNwbKnHhw",
  authDomain: "playgreen-sport.firebaseapp.com",
  projectId: "playgreen-sport",
  storageBucket: "playgreen-sport.appspot.com",
  messagingSenderId: "154826072335",
  appId: "1:154826072335:web:7dc1f93556c3128ae05e7a",
  measurementId: "G-VDLFD5F78Q",
  databaseURL : "https://playgreen-sport-default-rtdb.firebaseio.com/"
};

const firebaseApp = initializeApp(firebaseConfig);
export const database = getDatabase(firebaseApp);
export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp); 
export const databaseRef = ref(database);
export default firebaseApp;