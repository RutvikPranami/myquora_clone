import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBksf86_taV1OG0nPcJw5GQHskEZ_CQzJU",
  authDomain: "responsive-quora.firebaseapp.com",
  projectId: "responsive-quora",
  storageBucket: "responsive-quora.appspot.com",
  messagingSenderId: "936369824017",
  appId: "1:936369824017:web:e4aae1afc5ce49e2116cb0",
  measurementId: "G-MEDV4L6B3Q"
};


  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const db = firebaseApp.firestore();
  
  export { auth, provider };
  export default db;
