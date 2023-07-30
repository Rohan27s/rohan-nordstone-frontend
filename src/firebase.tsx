// firebase.ts
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyATurmvdmT4ea1t4cwBCoIkBT4Cr4qbj-w",
    authDomain: "testing-a8752.firebaseapp.com",
    projectId: "testing-a8752",
    storageBucket: "testing-a8752.appspot.com",
    messagingSenderId: "398423276496",
    appId: "1:398423276496:web:c485892c11105acf1bd7d5",
    measurementId: "G-5VTGNLS85W"
  };


  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  export const auth = firebase.auth();
  export const firestore = firebase.firestore()