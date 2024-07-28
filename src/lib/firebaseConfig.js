// lib/firebaseConfig.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCn3ziKkXWLYDBaCKXEoYgeeVJ9Qc406fY",
  authDomain: "seo-snap-dd5b9.firebaseapp.com",
  projectId: "seo-snap-dd5b9",
  storageBucket: "seo-snap-dd5b9.appspot.com",
  messagingSenderId: "697785846317",
  appId: "1:697785846317:web:2c01f5650e5baebbf0c6a4",
  measurementId: "G-9NW2X30X14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log('Firebase app initialized:', app);

// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
console.log('Firebase auth initialized:', auth);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
console.log('Firebase Firestore initialized:', db);

// Initialize Firebase Analytics
// let analytics;
// if (typeof window !== 'undefined') {
//   isSupported().then((supported) => {
//     if (supported) {
//       analytics = getAnalytics(app);
//     }
//   });
// }

export { auth, db };