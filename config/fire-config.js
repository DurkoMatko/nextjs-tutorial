// config/fire-config.js
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyD9kwaTRq7dfwJTg_IjcQuKsRgncWWx5uA",
  authDomain: "nextjs-firebase-tutorial-f4411.firebaseapp.com",
  projectId: "nextjs-firebase-tutorial-f4411",
  storageBucket: "nextjs-firebase-tutorial-f4411.appspot.com",
  messagingSenderId: "338202214746",
  appId: "1:338202214746:web:bcaffcee1e24e39507f363",
};
try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}
const fire = firebase;
export default fire;

//<script src="https://www.gstatic.com/firebasejs/8.5.0/firebase-app.js"></script>;
