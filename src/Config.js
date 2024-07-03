import { getApp, getApps, initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCjDSTipQuhKTz2T2XAD7nV5gHT8Sm8ffk",
  authDomain: "aaonisaa3-c3750.firebaseapp.com",
  projectId: "aaonisaa3-c3750",
  storageBucket: "aaonisaa3-c3750.appspot.com",
  messagingSenderId: "636876092351",
  appId: "1:636876092351:web:7c502cfc51471dc8a9a70a"
};
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app);
  const realtimeDb = getDatabase(app);

  export { db, auth, storage, realtimeDb }


  // / Import the functions you need from the SDKs you need
  // import { initializeApp } from "firebase/app";
  // // TODO: Add SDKs for Firebase products that you want to use
  // // https://firebase.google.com/docs/web/setup#available-libraries
  
  // // Your web app's Firebase configuration
  // const firebaseConfig = {
  //   apiKey: "AIzaSyCjDSTipQuhKTz2T2XAD7nV5gHT8Sm8ffk",
  //   authDomain: "aaonisaa3-c3750.firebaseapp.com",
  //   projectId: "aaonisaa3-c3750",
  //   storageBucket: "aaonisaa3-c3750.appspot.com",
  //   messagingSenderId: "636876092351",
  //   appId: "1:636876092351:web:7c502cfc51471dc8a9a70a"
  // };
  
  // // Initialize Firebase
  // const app = initializeApp(firebaseConfig);