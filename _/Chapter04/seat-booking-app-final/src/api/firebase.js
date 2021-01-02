import firebase from 'firebase'
var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: "AIzaSyBkdkAcHdNpOEP_W9NnOxpQy4m1deMbG5A",
  authDomain: "seat-booking.firebaseapp.com",
  databaseURL: "https://seat-booking.firebaseio.com",
  projectId: "seat-booking",
  storageBucket: "seat-booking.appspot.com",
  messagingSenderId: "248063178706"

};
var fire = firebase.initializeApp(config);
export default fire;