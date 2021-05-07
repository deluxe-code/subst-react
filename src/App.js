import React, { useState, useRef, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import firebase from "firebase";
import Navbar from "./Navbar.jsx"
import Home from "./Home.jsx"
import Signup from "./Signup.jsx"
import Login from "./Login.jsx"
import Account from "./Account.jsx"
import DrugInfo from "./DrugInfo.jsx"
import ScheduleInfo from "./ScheduleInfo.jsx"
import AddDosePage from "./AddDosePage.jsx"
import CreateSchedule from "./CreateSchedulePage.jsx"
import Settings from "./Settings.jsx"
import StatisticsPage from "./StatisticsPage.jsx"
import "./App.css";
window.navigator.vibrate(200); 



export default function App() {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      console.log(user.uid);
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
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/account" component={Account} />
      <Route path="/drug_info/:id" component={DrugInfo} />
      <Route path="/schedule_info/:id" component={ScheduleInfo} />
      <Route path="/add_dose" component={AddDosePage} />
      <Route path="/create_schedule" component={CreateSchedule} />
      <Route path="/settings" component={Settings} />
      <Route path="/statistics_page" component={StatisticsPage} />
    </Switch>
    <Navbar/>
    </Router>

  );
}

