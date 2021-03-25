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

// We are making an Api request, and that's an asynchronous thing.
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return ;

    // Getting the user from userAuth which will tell whether there is a user object or not.
    const userRef = firestore.doc(`user/${userAuth.uid}`);
    
    // Getting the snapshot object reference, it's just use to verify whether data(User) is present or not,and
    // if it is not present then we will create the user data.
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch  (error) {
          console.log("error creating the user", error.message);
      }

    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" }); //This means that we always want to have that google pop up
//every time we use authentication or sign in.

export const signInWithGoogle = () => auth.signInWithPopup(provider); //There are diff. pop up's available, but we just want the google one.

export default firebase; //In case if we want to use the whole library.

//All this code is related to configuring, in this case authentication on the app.


