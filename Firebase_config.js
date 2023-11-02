// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA32zf2e94ROuloLGAsGPHeq8ITlP-ODyg",
  authDomain: "fitness-b589c.firebaseapp.com",
  databaseURL: "https://fitness-b589c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fitness-b589c",
  storageBucket: "fitness-b589c.appspot.com",
  messagingSenderId: "729910594637",
  appId: "1:729910594637:web:d48ba3c6d25de0ae402004",
  measurementId: "G-1KTDJFG31Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default firebaseConfig