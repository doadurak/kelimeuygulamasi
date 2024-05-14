import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAkAHfV2qvh9JT50Y6XzMUpDwY4zAD-QlU",
    authDomain: "kelimeuygulamasi-5fd3e.firebaseapp.com",
    projectId: "kelimeuygulamasi-5fd3e",
    storageBucket: "kelimeuygulamasi-5fd3e.appspot.com",
    messagingSenderId: "337110729804",
    appId: "1:337110729804:web:5892ff7a28688c221de0e9",
    measurementId: "G-LDYRM3WBX3"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);