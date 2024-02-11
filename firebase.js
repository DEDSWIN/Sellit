import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyDKau2gpYLG_LKL94p_Y5jRSrvfPJXxkOs",
    authDomain: "semester3-9dd44.firebaseapp.com",
    databaseURL: "https://semester3-9dd44-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "semester3-9dd44",
    storageBucket: "semester3-9dd44.appspot.com",
    messagingSenderId: "682634465362",
    appId: "1:682634465362:web:bacf0ee85531cb7b7e4f8b",
    measurementId: "G-HDXBR1TZJF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth, app };
