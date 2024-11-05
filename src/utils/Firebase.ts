import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
 apiKey: "AIzaSyAcdzlZMD01e-x9teKIWJD4Rj8IymOLbiA",
  authDomain: "socialapp-9b83f.firebaseapp.com",
  projectId: "socialapp-9b83f",
  storageBucket: "socialapp-9b83f.appspot.com",
  messagingSenderId: "635004374736",
  appId: "1:635004374736:web:b02daf40b9b19856f9d8d5",
  measurementId: "G-PS5QJC1GDC"
  /*apiKey: "AIzaSyC6AuHxMG7XuY8x4spyN_D8eR99l4rM8N0",
  authDomain: "asfg-10c62.firebaseapp.com",
  projectId: "asfg-10c62",
  storageBucket: "asfg-10c62.firebasestorage.app",
  messagingSenderId: "423203604787",
  appId: "1:423203604787:web:25af5d4433848402481646" */
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app , "gs://socialapp-9b83f.appspot.com");
