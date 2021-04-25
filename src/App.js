import React, { useState, useRef, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from "./Navbar.jsx"
import Home from "./Home.jsx"
import Signup from "./Signup.jsx"
import Login from "./Login.jsx"
import firebase from "firebase";
// import Settings from "./Settings.jsx"
import "./App.css";



export default function App() {
  const firebaseApp = firebase.apps[0];

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {
        console.error(
          'User is not signed in!'
        );
      } else {
        console.log("User is signed in??");
      }
    });
  });

  return (
    <Router>
    <Navbar />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </Switch>
    </Router>

  );
}

