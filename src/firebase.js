// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1vBtVQhh6WN193olUtZpDRyjoY2zHztw",
  authDomain: "signature-hardware-748a7.firebaseapp.com",
  databaseURL: "https://signature-hardware-748a7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "signature-hardware-748a7",
  storageBucket: "signature-hardware-748a7.appspot.com",
  messagingSenderId: "484315362887",
  appId: "1:484315362887:web:3dab9f6e332861acd4a362",
  measurementId: "G-17J31K0M5Q"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Storage = getStorage(app);
const database = getDatabase(app)

export {Storage,database};
