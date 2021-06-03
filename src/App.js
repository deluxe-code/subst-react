import React, { useState, useRef, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useHistory,
} from "react-router-dom";
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
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css";

export const AppContext = React.createContext();

export default function App() {
  let [isAuthorized, setAuthorized] = useState(null);
  let [email, setEmail] = useState(null);

  const history = useHistory();

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
    if (!user) {
      console.log("Time to reveal AuthPage");
    }
    setAuthorized(user ? true : false);
  });

  return (
    <AppContext.Provider value={[isAuthorized, email]}>
      <Router>
        <>
          <Route
            render={({ location }) => (
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  timeout={350}
                  classNames="fade"
                >
                  <Switch location={location}>
                    <Route path="/" exact component={Home} />
                    <Route path="/about" component={LandingPage} />
                    <Route path="/account" component={Account} />
                    <Route path="/drug_info/:id" component={DrugInfo} />
                    <Route path="/schedule_info/:id" component={ScheduleInfo} />
                    <Route path="/add_dose" component={AddDosePage} />
                    <Route path="/create_schedule" component={CreateSchedule} />
                    <Route path="/settings" component={Settings} />
                    <Route path="/statistics_page" component={StatisticsPage} />
                    <Route path="/login" component={AuthPage} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            )}
          />
          <Navbar />
        </>
        {/* <AuthPage/> */}

        {/* Insert a loading sequence component here? and if firebase onAuthStateChanged runs 
        and is still false, only then show Login page / Landing page? */}
      </Router>
    </AppContext.Provider>
  );
}
