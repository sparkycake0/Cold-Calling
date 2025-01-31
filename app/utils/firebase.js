import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvEGRmFchmayDm-IPqTOmyoHzuLDbdG1o",
  authDomain: "cold-b9b30.firebaseapp.com",
  projectId: "cold-b9b30",
  storageBucket: "cold-b9b30.firebasestorage.app",
  messagingSenderId: "295337704798",
  appId: "1:295337704798:web:46ae292a30a019236ca3cf",
};

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const potentialRef = collection(firestore, "potential");
