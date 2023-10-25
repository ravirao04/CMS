// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// const { async } = require("regenerator-runtime");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOiHdVnvvCqwBU-j5ka6CjRRSIzCZevvE",
    authDomain: "m-lyrics.firebaseapp.com",
    databaseURL: "https://m-lyrics.firebaseio.com",
    projectId: "m-lyrics",
    storageBucket: "m-lyrics.appspot.com",
    messagingSenderId: "849718775602",
    appId: "1:849718775602:web:88074ba66ce6597609112b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

async function getDB(){
    return db;
}
export { db,getDB }