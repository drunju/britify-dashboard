
import { initializeApp } from "firebase/app";
// Import getAuth from the standard modular path
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgMG3VObFDKFOB0jdi_vWy26F7i5g1JKA",
  authDomain: "britify-2ed96.firebaseapp.com",
  projectId: "britify-2ed96",
  storageBucket: "britify-2ed96.firebasestorage.app",
  messagingSenderId: "892235297125",
  appId: "1:892235297125:web:66dbf2bcc7dc712817718c"
};

// Initialize Firebase modularly
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
