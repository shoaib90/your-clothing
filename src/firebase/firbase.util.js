import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDwfV3ykjdiMhIbTgnoGeosD3x2JeSB0YY",
  authDomain: "your-clothing-db.firebaseapp.com",
  databaseURL: "https://your-clothing-db.firebaseio.com",
  projectId: "your-clothing-db",
  storageBucket: "your-clothing-db.appspot.com",
  messagingSenderId: "1052550190749",
  appId: "1:1052550190749:web:f498f2625c35429cd3e674",
  measurementId: "G-2D1NRZKMGE",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" }); //This means that we always want to have that google pop up
//every time we use authentication or sign in.

export const signInWithGoogle = () => auth.signInWithPopup(provider); //There are diff. pop up's available, but we just want the google one.

export default firebase; //In case if we want to use the whole library.
