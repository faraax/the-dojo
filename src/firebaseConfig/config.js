import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyAR_TI7voDgRgDKRLqkRSRLC-Ki0h5f_vE",
    authDomain: "thedojosite-dc838.firebaseapp.com",
    projectId: "thedojosite-dc838",
    storageBucket: "thedojosite-dc838.appspot.com",
    messagingSenderId: "718887674647",
    appId: "1:718887674647:web:e92e36bf78eee3e6becd52"
};

firebase.initializeApp(firebaseConfig);

const projectFirebase = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()
const timestamp = firebase.firestore.Timestamp

export { projectFirebase, projectAuth, timestamp, projectStorage }