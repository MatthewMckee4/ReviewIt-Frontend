// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCkI6hIjipeAEGFVtx4MszRTGM_nZMD3TE",
    authDomain: "reviewit-ff644.firebaseapp.com",
    projectId: "reviewit-ff644",
    storageBucket: "reviewit-ff644.appspot.com",
    messagingSenderId: "688707501490",
    appId: "1:688707501490:web:c9b8991fff16094b15b8ab",
    measurementId: "G-EERE0N1X2G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
