import firebase from "firebase";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCLPT6_DfuaDFbLOuVn8c1uv15pyq24-YQ",
    authDomain: "ppoppi.firebaseapp.com",
    databaseURL: "https://ppoppi.firebaseio.com",
    projectId: "ppoppi",
    storageBucket: "ppoppi.appspot.com",
    messagingSenderId: "593646853073",
    appId: "1:593646853073:web:21e86d2cf5b2bfb2db9ef0",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
export const firestore = firebase.firestore();
