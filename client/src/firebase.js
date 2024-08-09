import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDNlApnofiTdG9WMOvS3nQusaalUmuc01Y",
    authDomain: "merchtemp-c78ee.firebaseapp.com",
    projectId: "merchtemp-c78ee",
    storageBucket: "merchtemp-c78ee.appspot.com",
    messagingSenderId: "1561380305",
    appId: "1:1561380305:web:1edc6f9e3bf9d48e8f8cf0",
    measurementId: "G-61V658X0KX"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;