
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeZaX0ytrNoKc6HpwhclZu-OAV2fDnBuw",
  authDomain: "my-to-do-123.firebaseapp.com",
  projectId: "my-to-do-123",
  storageBucket: "my-to-do-123.appspot.com",
  messagingSenderId: "420462492415",
  appId: "1:420462492415:web:a6aefb7179154da5fcaaca",
  measurementId: "G-PB8SV72XSZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const  auth = getAuth(app);
const  firestore = getFirestore(app);
const  storage = getStorage(app);

export {analytics,auth,firestore,storage}