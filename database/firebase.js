import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyAagEOidd-0WHWVynxl73ir3oT2Hd13TAg",
    authDomain: "crudpf.firebaseapp.com",
    projectId: "crudpf",
    storageBucket: "crudpf.appspot.com",
    messagingSenderId: "871570461334",
    appId: "1:871570461334:web:ca4d5b8d4c2d8dcee868b7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db
};