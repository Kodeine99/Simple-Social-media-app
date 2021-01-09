import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyArUsE627gGD-5Yw3DQPtlueWxFw-kurEw",
  authDomain: "react-social-media-app-c8015.firebaseapp.com",
  projectId: "react-social-media-app-c8015",
  storageBucket: "react-social-media-app-c8015.appspot.com",
  messagingSenderId: "808924759344",
  appId: "1:808924759344:web:33a45b481bb08632b0f4f5",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
