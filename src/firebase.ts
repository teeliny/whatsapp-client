import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCotxHmxcV6ydjxMbkjZ9FskQZG85erLtE",
  authDomain: "whatsapp-mern-280c3.firebaseapp.com",
  projectId: "whatsapp-mern-280c3",
  storageBucket: "whatsapp-mern-280c3.appspot.com",
  messagingSenderId: "669258120984",
  appId: "1:669258120984:web:d07f9f6b36509c27c5686d"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
