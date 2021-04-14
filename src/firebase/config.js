import firebase from 'firebase/app'
// import * as firebase from 'firebase/app';
import 'firebase/storage'; // for storing files
import 'firebase/firestore'; //for DB
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBAIV3XgVAkW7aWNanDPVrNSaPR80vkpRQ",
    authDomain: "gallery-80609.firebaseapp.com",
    projectId: "gallery-80609",
    storageBucket: "gallery-80609.appspot.com",
    messagingSenderId: "656689979460",
    appId: "1:656689979460:web:f53b018b8ed273d6be5c11"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage()
const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export const auth = firebase.auth();


export {projectStorage, projectFirestore, timestamp}

export default firebase


