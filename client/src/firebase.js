// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMyqBQ8V2k31QDsAjG7pAHGio0qBuFe48",
  authDomain: "bulletinboard-4800b.firebaseapp.com",
  projectId: "bulletinboard-4800b",
  storageBucket: "bulletinboard-4800b.firebasestorage.app",
  messagingSenderId: "96942852364",
  appId: "1:96942852364:web:eaa8b41584133851f2a129",
  measurementId: "G-KN8MCWXN5B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
