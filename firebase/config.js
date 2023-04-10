import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCX7dxPhUay7UFVBl4uYOND-IRo0esBA8c",
  authDomain: "reactnativeproject-381916.firebaseapp.com",
  projectId: "reactnativeproject-381916",
  storageBucket: "reactnativeproject-381916.appspot.com",
  messagingSenderId: "1017899555293",
  appId: "1:1017899555293:web:0cb004fb2bce14ae8cbe34",
  measurementId: "G-EDEJ0P67EE",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
