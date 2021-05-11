import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";
import firebase from "./Firebase.js";
import Navbar from "./Navbar.jsx";
import Home from "./Home.jsx";
import Account from "./Account.jsx";
import DrugInfo from "./DrugInfo.jsx";
import ScheduleInfo from "./ScheduleInfo.jsx";
import AddDosePage from "./AddDosePage.jsx";
import CreateSchedule from "./CreateSchedulePage.jsx";
import Settings from "./Settings.jsx";
import AuthPage from "./Authentication.jsx";
import StatisticsPage from "./StatisticsPage.jsx";
import LandingPage from "./LandingPage.jsx";
import "./App.css";

export const AppContext = React.createContext();

export default function App() {
  let [isAuthorized, setAuthorized] = useState(null);
  let [firebaseInitialized, setFirebaseInitialized] = useState(false);
  let [email, setEmail] = useState(null);
  useEffect(
    function () {
      if (isAuthorized) {
        setEmail(firebase.auth().currentUser.email);
      } else {
        setEmail(null);
      }
    },
    [isAuthorized]
  );
  firebase.auth().onAuthStateChanged(function (user) {
    // if (user) {
    //   setAuthorized(true);
    // } else {
    //   setAuthorized(false);
    // }
    setAuthorized((user ? true : false));
  });

  return (
    <AppContext.Provider value={[isAuthorized, email]}>
    <Router>
      {isAuthorized ? (
        <>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/account" component={Account} />
            <Route path="/drug_info/:id" component={DrugInfo} />
            <Route path="/schedule_info/:id" component={ScheduleInfo} />
            <Route path="/add_dose" component={AddDosePage} />
            <Route path="/create_schedule" component={CreateSchedule} />
            <Route path="/settings" component={Settings} />
            <Route path="/statistics_page" component={StatisticsPage} />
            <Route path="/about" component={LandingPage} />
          </Switch>
          <Navbar />
        </>
      ) : 
      <AuthPage/>}
        {/* Insert a loading sequence component here? and if firebase onAuthStateChanged runs 
        and is still false, only then show Login page / Landing page? */}
    </Router>
    </AppContext.Provider>
  );
}
