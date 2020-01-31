import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCEfsErry8eIjsxj0-X87KQx4i9gtRajIQ",
    authDomain: "where-am-i-e7e73.firebaseapp.com",
    databaseURL: "https://where-am-i-e7e73.firebaseio.com",
    projectId: "where-am-i-e7e73",
    storageBucket: "where-am-i-e7e73.appspot.com",
    messagingSenderId: "1001217801581",
    appId: "1:1001217801581:web:e40e6e807e83501120ee64"
  };

firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;