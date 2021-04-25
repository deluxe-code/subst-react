import React, { useState, useRef, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from "./Navbar.jsx"
import Home from "./Home.jsx"
import Signup from "./Signup.jsx"
import Login from "./Login.jsx"
<<<<<<< HEAD
import DrugInfo from "./DrugInfo.jsx"
import AddDosePage from "./AddDosePage.jsx"
import CreateSchedulePage from "./CreateSchedulePage.jsx"
=======
import firebase from "firebase";
>>>>>>> f89abbd5bfed5727f13da51d59c74f1c2747fb7e
// import Settings from "./Settings.jsx"
import "./App.css";


<<<<<<< HEAD
function App() {
  let vibe = "yes";
=======

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

>>>>>>> f89abbd5bfed5727f13da51d59c74f1c2747fb7e
  return (
    <Router>
    <Navbar />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/drug_info/:id" component={DrugInfo} />
      <Route path="/add_dose" component={AddDosePage} />
      <Route path="/create_schedule" component={CreateSchedulePage} />
    </Switch>
    </Router>

  );
}

