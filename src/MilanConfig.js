// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";

const MilanfirebaseConfig = {
  apiKey: "AIzaSyBRHvQ-LJTYHrEnejR6dX4Do_WNCg-HLdE",
  authDomain: "milan-2f84b.firebaseapp.com",
  projectId: "milan-2f84b",
  storageBucket: "milan-2f84b.appspot.com",
  messagingSenderId: "243812374625",
  appId: "1:243812374625:web:b2e98c4cafda12bb59b220"
};

// Initialize Firebase
const milanApp = initializeApp(MilanfirebaseConfig, "milanApp");
const milanAuth = getAuth()
const milanDb = getFirestore(milanApp);
const milanStorage = getStorage(milanApp);

export { milanApp, milanAuth, milanDb, milanStorage }
