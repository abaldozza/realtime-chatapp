import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAZHvy48oHucKN76K09N0vy2dKqlmFB2P0",
    authDomain: "realtime-chatapp-26760.firebaseapp.com",
    projectId: "realtime-chatapp-26760",
    storageBucket: "realtime-chatapp-26760.firebasestorage.app",
    messagingSenderId: "573468378037",
    appId: "1:573468378037:web:c093a118d53452c055cffc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);