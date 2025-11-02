import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzRpaWkBmgoLh19bVeuSirq33biW7DUcU",
  authDomain: "fir-firstproject-b14ad.firebaseapp.com",
  projectId: "fir-firstproject-b14ad",
  storageBucket: "fir-firstproject-b14ad.firebasestorage.app",
  messagingSenderId: "677265872835",
  appId: "1:677265872835:web:5d6c337eddfc2f12650f76",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;