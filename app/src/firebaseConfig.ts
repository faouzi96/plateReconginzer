// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1FvY4uCDaeKmyvPCLsP86S6m3CUhyJKk",
  authDomain: "sdm-project-ff079.firebaseapp.com",
  projectId: "sdm-project-ff079",
  storageBucket: "sdm-project-ff079.appspot.com",
  messagingSenderId: "802863791908",
  appId: "1:802863791908:web:5749438574bb5091dd7db1",
  measurementId: "G-QVQ84DF3DX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);