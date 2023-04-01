import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0wF3g7ALXd8EE6Mm1qF2-RJR_9vmDbPY",
  authDomain: "formapp-6456d.firebaseapp.com",
  projectId: "formapp-6456d",
  storageBucket: "formapp-6456d.appspot.com",
  messagingSenderId: "61348404934",
  appId: "1:61348404934:web:8adb140c403f2edfaa81c7",
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
