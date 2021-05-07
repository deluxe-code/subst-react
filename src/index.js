import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'firebase/firestore'

import firebase from 'firebase/app';
let firebaseConfig = {
  apiKey: "AIzaSyB0YksSwW1EB788GmuDuZpO2tTKJAezHpU",
  aauthDomain: "subst-app.firebaseapp.com",
  databaseURL: "https://subst-app.firebaseio.com",
  projectId: "subst-app",
  storageBucket: "subst-app.appspot.com",
  messagingSenderId: "172488889933",
  appId: "1:172488889933:web:9f9bee754b15f31a1c6e04",
  measurementId: "G-VGQR7410B4"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

db.collection("users").add({
  first: "Ada",
  last: "Lovelace",
  born: 1815
})
.then((docRef) => {
  console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
  console.error("Error adding document: ", error);
});


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);