import { initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const JSfirebaseConfig = {
  apiKey: "AIzaSyDv7_zyb4bThF_fbjIpxL_FIn_hX4vX2Is",
  authDomain: "just-search-21c47.firebaseapp.com",
  projectId: "just-search-21c47",
  storageBucket: "just-search-21c47.appspot.com",
  messagingSenderId: "968676221050",
  appId: "1:968676221050:web:7988a3a5dcea9ae96c5bc3",
  measurementId: "G-831B9JEVG8"
};

// Use a unique name for the app, e.g., 'JSApp'
const JSapp = initializeApp(JSfirebaseConfig, 'JSApp');

const JSauth = getAuth(JSapp);
const JSdb = getFirestore(JSapp);
const JSstorage = getStorage(JSapp);

export { JSapp, JSauth, JSdb, JSstorage };
