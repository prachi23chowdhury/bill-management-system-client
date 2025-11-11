// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlt4I12bdWUfUKTE8baK2M2zQy47JtlAM",
  authDomain: "bill-management-53f4a.firebaseapp.com",
  projectId: "bill-management-53f4a",
  storageBucket: "bill-management-53f4a.firebasestorage.app",
  messagingSenderId: "793783097099",
  appId: "1:793783097099:web:87d97762f8d55a962e340e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);