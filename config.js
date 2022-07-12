const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyD9V88CLLkz67IB_mRlaTyFNuMe85MuQ14",
  authDomain: "tutorial-e06c1.firebaseapp.com",
  databaseURL: "https://angular-firestore-3ed06-default-rtdb.firebaseio.com",
  projectId: "angular-firestore-3ed06",
  storageBucket: "angular-firestore-3ed06.appspot.com",
  messagingSenderId: "691602437416",
  appId: "1:691602437416:web:23350b0c3bee10a2108c1d"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection("Users");
module.exports = User;